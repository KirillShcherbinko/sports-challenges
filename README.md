# Sports Challenge Platform

Full-stack веб-платформа для создания, прохождения и отслеживания спортивных челленджей.

## Tech Stack

| Категория | Технологии |
|-----------|------------|
| **Фреймворк** | Next.js 16.2.1 (App Router, Server Actions, React Compiler) |
| **Язык** | TypeScript |
| **UI** | Mantine v9.2.1 |
| **Формы** | React Hook Form + Zod |
| **База данных** | PostgreSQL |
| **ORM** | Prisma 7.8.0 |
| **Auth / Storage** | Supabase |
| **Линтинг** | BiomeJS |
| **Тестирование** | Vitest 4.1.9 + fast-check 4.8.0 |
| **Контейнеризация** | Docker |

## Архитектура

Feature-Sliced Design: `app` → `views` → `widgets` → `features` → `entities` → `shared`.

## Установка и локальный запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/KirillShcherbinko/sports-challenges
cd sports-challenges
```

### 2. Зависимости

```bash
npm install
```

### 3. Переменные окружения

Актуальный набор переменных:

```env
# Local development (supabase start)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
PORT=3000
HOSTNAME=0.0.0.0
```

> ⚠️ `NEXT_PUBLIC_SUPABASE_URL` и порты зависят от окружения:
> - **Локально** (`supabase start`): `127.0.0.1:54321` / БД `127.0.0.1:54322`
> - **Production** (hosted Supabase): ваш проект `.supabase.co`

Ключи получите в [Supabase Dashboard](https://supabase.com/dashboard).

Локальный Supabase:

```bash
npx supabase start     # поднимет PostgreSQL + GoTrue + Storage
npm run dev            # http://localhost:3000
```

### 3. База данных

```bash
npx prisma generate
npx prisma db push
```

## Docker

**Development:**

```bash
docker compose up --build
```

Для локального Supabase параллельно выполните `npx supabase start`.

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск собранного |
| `npm test` | Запуск тестов |
| `npm run test:watch` | Тесты в watch-режиме |
| `npm run test:coverage` | Тесты + покрытие |
| `npm run test:coverage:save` | Тесты + сохранение отчёта в `coverage/report.txt` |
| `npm run lint` | Проверка BiomeJS |
| `npm run format` | Форматирование BiomeJS |

## Тестирование

175 тестов в 26 файлах:

| Группа | Описание | Тестов |
|--------|----------|-------|
| A — Foundations | `isOlderThan24Hours`, `retry`, `idSchema` | 17 |
| B — Labels | Маппинги label/value для enum'ов | 23 |
| C — Schemas | Zod-схемы auth, profile, challenge, daily-task, comment | 57 |
| D — Mappers | Мапперы сущностей | 42 |
| E — Business Logic | Персонализация, route-guards | 16 |
| F — Config | Консистентность конфигов, роуты | 14 |
| G — Server Actions | Авторизация (Prisma mock) | 6 |

```bash
npm test
```

### Покрытие

```bash
npm run test:coverage:save
```

Результат — `coverage/report.txt` (трекается в git).

## Fuzzing

Инфраструктура в `fuzz_tests/`:

- `scenarios.json` — 13 сценариев
- `ffuzz-all.ps1` — ffuf (55 команд)
- `zap-scan.ps1` — OWASP ZAP активный скан
- `wordlists/` — 11 файлов payload'ов

Результаты: fuzzing/production — 0 matches (все SQLi/XSS блокируются UUID-валидацией). ZAP — 0 High, Medium = CSP (Next.js).

## Безопасность

- UUID-валидация всех ID в роутах → `notFound()`
- Server actions защищены `assertChallengeOwner` / `assertCommentOwner`
- CSP-заголовки, X-Frame-Options, X-Content-Type-Options
- Route guards для авторизованных/гостевых маршрутов

## Окружения

- `review` — основная ветка разработки
- `main` — стабильная (через PR)
- Preview на Vercel при push в `review`
- Production на Vercel при merge в `main`
