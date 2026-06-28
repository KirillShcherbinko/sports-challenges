param(
    [string]$TARGET_URL = "http://localhost:3000",
    [string]$ZAP_HOST = "localhost",
    [int]$ZAP_PORT = 8080,
    [string]$ZAP_API_KEY = "",
    [string]$RESULTS_DIR = "$PSScriptRoot\results",
    [string]$AUTH_COOKIE = "",
    [string]$USERNAME = "",
    [string]$PASSWORD = ""
)

$ZAP_BASE = "http://${ZAP_HOST}:${ZAP_PORT}"
$apiKeyParam = if ($ZAP_API_KEY) { "?apikey=$ZAP_API_KEY" } else { "" }

New-Item -ItemType Directory -Path $RESULTS_DIR -Force | Out-Null

function Invoke-ZapApi($endpoint, $method = "GET", $body = $null) {
    $url = "$ZAP_BASE/JSON/$endpoint$apiKeyParam"
    try {
        if ($method -eq "GET") {
            return Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 120
        } else {
            return Invoke-RestMethod -Uri $url -Method Post -ContentType "application/x-www-form-urlencoded" -Body $body -TimeoutSec 120
        }
    } catch {
        Write-Host "  [WARN] ZAP API error ($url): $_" -ForegroundColor Yellow
        return $null
    }
}

function Wait-ZapScan($scanId, $type, $label) {
    do {
        Start-Sleep -Seconds 5
        $status = Invoke-ZapApi "$type/view/status/?scanId=$scanId"
        $pct = if ($status) { $status.status } else { 0 }
        Write-Host "  [..] $label : ${pct}%" -NoNewline -ForegroundColor DarkGray
        Write-Host "`r" -NoNewline
    } while ($pct -ne 100)
    Write-Host "  [OK] $label : 100%" -ForegroundColor Green
}

Write-Host "===== OWASP ZAP -- Sports-Challenges Scan =====" -ForegroundColor Cyan
Write-Host "Target: $TARGET_URL" -ForegroundColor Cyan
Write-Host ""

# 1. Check ZAP availability
Write-Host "=== 1. Check ZAP connection ===" -ForegroundColor Cyan
$version = Invoke-ZapApi "core/view/version"
if (-not $version) {
    Write-Host "[ERROR] ZAP not available at $ZAP_BASE" -ForegroundColor Red
    Write-Host ""
    Write-Host "Start ZAP in daemon mode:" -ForegroundColor Yellow
    Write-Host "  cd 'C:\Program Files\ZAP\Zed Attack Proxy'" -ForegroundColor Gray
    Write-Host "  .\zap.bat -daemon -host 127.0.0.1 -port 8080 -config api.disablekey=true" -ForegroundColor Gray
    exit 1
}
Write-Host "  [OK] ZAP $($version.version) available" -ForegroundColor Green

# 2. New session
Write-Host "=== 2. New session ===" -ForegroundColor Cyan
Invoke-ZapApi "core/action/newSession/?name=sports-challenges&overwrite=true" -method "POST"
Write-Host "  [OK] Session created" -ForegroundColor Green

# 3. Authentication setup
if ($AUTH_COOKIE) {
    Write-Host "=== 3. Auth setup (cookie) ===" -ForegroundColor Cyan
    Invoke-ZapApi "httpSessions/action/createEmptySession/?site=$TARGET_URL" -method "POST"
    Invoke-ZapApi "httpSessions/action/setSessionTokenValue/?site=$TARGET_URL&sessionToken=sb-localhost-auth-token&tokenValue=$AUTH_COOKIE" -method "POST"
    Invoke-ZapApi "httpSessions/action/activeSession/?site=$TARGET_URL" -method "POST"
    Write-Host "  [OK] Auth cookie set" -ForegroundColor Green
} elseif ($USERNAME -and $PASSWORD) {
    Write-Host "=== 3. Auth setup (form-based) ===" -ForegroundColor Cyan
    $loginData = "email=$USERNAME&password=$PASSWORD"
    Invoke-ZapApi "authentication/action/setAuthenticationMethod/?authMethod=formBasedAuth&authMethodConfig=loginUrl=$TARGET_URL/sign-in&loginRequestData=$([System.Web.HttpUtility]::UrlEncode($loginData))" -method "POST"
    Write-Host "  [OK] Form-based auth configured" -ForegroundColor Green
} else {
    Write-Host "=== 3. Auth -- skipped ===" -ForegroundColor Yellow
}

# 4. Access the target
Write-Host "=== 4. Access target ===" -ForegroundColor Cyan
Invoke-ZapApi "core/action/accessUrl/" -method "POST" -body "url=$TARGET_URL"
Write-Host "  [OK] Target accessed" -ForegroundColor Green

# 5. Spider
Write-Host "=== 5. Spider ===" -ForegroundColor Cyan
$spiderResult = Invoke-ZapApi "spider/action/scan/" -method "POST" -body "url=$TARGET_URL&maxChildren=5&recurse=true"
if ($spiderResult -and $spiderResult.scan) {
    Wait-ZapScan $spiderResult.scan "spider" "Spider"
} else {
    Write-Host "  [WARN] Spider didn't start" -ForegroundColor Yellow
}

# 6. AJAX Spider
Write-Host "=== 6. AJAX Spider ===" -ForegroundColor Cyan
$ajaxResult = Invoke-ZapApi "ajaxSpider/action/scan/" -method "POST" -body "url=$TARGET_URL"
if ($ajaxResult -and $ajaxResult."$TARGET_URL") {
    do {
        Start-Sleep -Seconds 3
        $status = Invoke-ZapApi "ajaxSpider/view/status"
    } while ($status -and $status.status -ne "stopped")
    Write-Host "  [OK] AJAX Spider done" -ForegroundColor Green
} else {
    Write-Host "  [WARN] AJAX Spider didn't start" -ForegroundColor Yellow
}

# 7. Active Scan
Write-Host "=== 7. Active Scan ===" -ForegroundColor Cyan
$scanResult = Invoke-ZapApi "ascan/action/scan/" -method "POST" -body "url=$TARGET_URL&recurse=true"
if ($scanResult -and $scanResult.scan) {
    Wait-ZapScan $scanResult.scan "ascan" "Active Scan"
} else {
    Write-Host "  [WARN] Active Scan didn't start" -ForegroundColor Yellow
}

# 8. Export report
Write-Host "=== 8. Export report ===" -ForegroundColor Cyan

$htmlReport = Invoke-RestMethod -Uri "$ZAP_BASE/OTHER/core/other/htmlreport/$apiKeyParam" -Method Get -TimeoutSec 120 -ErrorAction SilentlyContinue
if ($htmlReport) {
    $htmlPath = "$RESULTS_DIR\zap-report.html"
    $htmlReport | Out-File -FilePath $htmlPath -Encoding utf8
    Write-Host "  [OK] HTML report: $htmlPath" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Could not fetch HTML report" -ForegroundColor Yellow
}

$alerts = Invoke-ZapApi "core/view/alerts/?baseurl=$TARGET_URL"
$riskCount = @{ High = 0; Medium = 0; Low = 0; Informational = 0 }
if ($alerts -and $alerts.alerts) {
    foreach ($alert in $alerts.alerts) { $riskCount[$alert.risk]++ }
}

$report = @{
    tool     = "OWASP ZAP"
    target   = $TARGET_URL
    date     = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    auth     = if ($AUTH_COOKIE) { "yes" } elseif ($USERNAME) { "form" } else { "no" }
    htmlReport = "zap-report.html"
    summary  = @{
        totalAlerts   = if ($alerts -and $alerts.alerts) { $alerts.alerts.Count } else { 0 }
        high          = $riskCount.High
        medium        = $riskCount.Medium
        low           = $riskCount.Low
        informational = $riskCount.Informational
    }
    alerts   = if ($alerts -and $alerts.alerts) { $alerts.alerts } else { @() }
}

$reportPath = "$RESULTS_DIR\zap-results.json"
$report | ConvertTo-Json -Depth 10 | Out-File -FilePath $reportPath -Encoding utf8

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Green
Write-Host "Alerts: $($riskCount.High)H / $($riskCount.Medium)M / $($riskCount.Low)L / $($riskCount.Informational)I" -ForegroundColor Cyan
Write-Host "Report: $reportPath" -ForegroundColor Green
if ($htmlReport) { Write-Host "HTML:   $htmlPath" -ForegroundColor Green }
Write-Host "Restore with: git checkout -- fuzz_tests/results" -ForegroundColor Gray

