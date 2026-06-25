Отчёт о добавленных виджетах
1. profile-stats
Файлы: src/widgets/profile-stats/
Отображает:
Карточка
Челленджей пройдено
Завершено
Создано
Достижения
Страница: /profile (профиль текущего пользователя) и страница любого пользователя (по username)
Использование: <ProfileStats /> или <ProfileStats profileUsername="username" />
2. creator-profile-stats
Файлы: src/widgets/creator-profile-stats/
Отображает:
Карточка
Челленджей
Подписчиков
Сред. завершение
Достижения
Страница: /creators/[username]
Использование: <CreatorProfileStats username="username" />
3. challenge-progress-stats
Файлы: src/widgets/challenge-progress-stats/
Отображает:
Карточка
Дней завершено
Дней пропущено
Текущая серия
Процент выполнения
Страница: /challenges/[challengeId]/progress и /my-challenges/[userChallengeId]
Использование: <ChallengeProgressStats challengeId="id" />
Добавленные DTO
- TProfileAnalyticsDto — src/entities/profile/model/dtos.ts:27 — challengesCompleted, completedTasks, createdChallenges, achievementsCount
- TCreatorAnalyticsDto — src/entities/profile/model/dtos.ts:34 — challengesCount, avgCompletionRate, achievementsCount
- TChallengeProgressDto — src/entities/profile-challenge/model/dtos.ts:23 — daysCompleted, daysMissed, currentStreak, completionPercentage
Добавленные методы в репозитории
- profileRepository.getProfileAnalytics(profileId) — src/entities/profile/model/repository.ts:62
- profileRepository.getCreatorAnalytics(username) — src/entities/profile/model/repository.ts:82
- profileChallengeRepository.getChallengeProgress(challengeId, profileId) — src/entities/profile-challenge/model/repository.ts:79
