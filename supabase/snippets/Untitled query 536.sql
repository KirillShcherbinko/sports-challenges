-- Запуск в одной транзакции для гарантии целостности
BEGIN;

-- 1. Пользователи (profiles)
INSERT INTO public.profiles (id, username, avatar_url, fitness_level, preferences, bio, streak_count, total_completed_tasks, created_at, updated_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'alex_runner', 'https://example.com/avatars/1.jpg', 'intermediate', '{"preferred_time": "morning", "goals": ["weight_loss"]}'::jsonb, 'Люблю бег и утренние пробежки.', 15, 45, NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'maria_fit', 'https://example.com/avatars/2.jpg', 'beginner', '{"preferred_time": "evening", "goals": ["flexibility"]}'::jsonb, 'Начинаю свой путь в фитнесе. Йога и растяжка.', 3, 8, NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'ivan_strength', 'https://example.com/avatars/3.jpg', 'advanced', '{"preferred_time": "afternoon", "goals": ["muscle_gain"]}'::jsonb, 'Тренируюсь 5 лет. Силовые и кроссфит.', 22, 120, NOW(), NOW());

-- 2. Достижения (achievements)
INSERT INTO public.achievements (id, title, description, icon_url, created_at)
VALUES
  ('44444444-4444-4444-4444-444444444444', 'Первый шаг', 'Завершите свое первое задание в любом челлендже', 'https://example.com/icons/first_step.svg', NOW()),
  ('55555555-5555-5555-5555-555555555555', 'Неделя активности', 'Не пропустите ни одного дня в течение 7 дней', 'https://example.com/icons/week_streak.svg', NOW()),
  ('66666666-6666-6666-6666-666666666666', 'Мастер дисциплины', 'Завершите 3 челленджа подряд', 'https://example.com/icons/master.svg', NOW());

-- 3. Челленджи (challenges)
INSERT INTO public.challenges (id, creator_id, title, description, cover_image_url, category, difficulty, duration_days, is_published, likes_count, participants_count, created_at, updated_at)
VALUES
  ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', '30 дней бега', 'Ежедневные пробежки для выносливости', 'https://example.com/covers/run.jpg', 'cardio', 'medium', 30, true, 12, 8, NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', '33333333-3333-3333-3333-333333333333', 'Силовая база', 'Базовые упражнения с собственным весом', 'https://example.com/covers/strength.jpg', 'strength', 'easy', 14, true, 25, 15, NOW(), NOW()),
  ('99999999-9999-9999-9999-999999999999', '22222222-2222-2222-2222-222222222222', 'Йога для начинающих', 'Мягкая растяжка и базовые асаны', 'https://example.com/covers/yoga.jpg', 'flexibility', 'easy', 21, true, 8, 5, NOW(), NOW());

-- 4. Ежедневные задания (daily_tasks)
-- Используем только валидные hex-символы: 0-9, a-f
INSERT INTO public.daily_tasks (id, challenge_id, day_number, title, description, exercise_type, target_value, created_at, updated_at)
VALUES
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '77777777-7777-7777-7777-777777777777', 1, 'Легкая пробежка', 'Бег в спокойном темпе 15 минут', 'running', 15, NOW(), NOW()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '77777777-7777-7777-7777-777777777777', 2, 'Интервалы', '5 мин разминка, 4x2 мин быстро, 5 мин заминка', 'running', 20, NOW(), NOW()),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', '88888888-8888-8888-8888-888888888888', 1, 'Отжимания и приседания', '3 подхода по 10 отжиманий, 3 подхода по 15 приседаний', 'strength', 3, NOW(), NOW()),
  ('dddddddd-dddd-4ddd-8ddd-dddddddddddd', '88888888-8888-8888-8888-888888888888', 2, 'Планка и выпады', 'Планка 3x30 сек, выпады 3x12 на ногу', 'strength', 3, NOW(), NOW()),
  ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', '99999999-9999-9999-9999-999999999999', 1, 'Приветствие солнцу', 'Классическая последовательность асан', 'yoga', 5, NOW(), NOW());

-- 5. Участие в челленджах (profile_challenges)
INSERT INTO public.profile_challenges (id, profile_id, challenge_id, status, started_at, completed_at, current_day, last_activity_at, created_at, updated_at)
VALUES
  ('ffffffff-ffff-4fff-8fff-ffffffffffff', '22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'active', NOW() - INTERVAL '2 days', NULL, 2, NOW() - INTERVAL '1 day', NOW(), NOW()),
  ('00000000-0000-4000-8000-000000000000', '11111111-1111-1111-1111-111111111111', '88888888-8888-8888-8888-888888888888', 'active', NOW() - INTERVAL '5 days', NULL, 3, NOW() - INTERVAL '1 day', NOW(), NOW()),
  ('10000000-0000-4000-8000-000000000000', '33333333-3333-3333-3333-333333333333', '99999999-9999-9999-9999-999999999999', 'completed', NOW() - INTERVAL '25 days', NOW() - INTERVAL '4 days', 21, NOW() - INTERVAL '4 days', NOW(), NOW());

-- 6. Выполнения заданий (task_completions)
INSERT INTO public.task_completions (id, profile_challenge_id, daily_task_id, is_completed, completed_at, created_at)
VALUES
  ('20000000-0000-4000-8000-000000000000', 'ffffffff-ffff-4fff-8fff-ffffffffffff', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', true, NOW() - INTERVAL '2 days', NOW()),
  ('30000000-0000-4000-8000-000000000000', 'ffffffff-ffff-4fff-8fff-ffffffffffff', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', false, NULL, NOW()),
  ('40000000-0000-4000-8000-000000000000', '00000000-0000-4000-8000-000000000000', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', true, NOW() - INTERVAL '5 days', NOW()),
  ('50000000-0000-4000-8000-000000000000', '00000000-0000-4000-8000-000000000000', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', true, NOW() - INTERVAL '3 days', NOW());

-- 7. Лайки (challenge_likes)
INSERT INTO public.challenge_likes (id, profile_id, challenge_id, created_at)
VALUES
  ('60000000-0000-4000-8000-000000000000', '22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', NOW()),
  ('70000000-0000-4000-8000-000000000000', '33333333-3333-3333-3333-333333333333', '88888888-8888-8888-8888-888888888888', NOW()),
  ('80000000-0000-4000-8000-000000000000', '11111111-1111-1111-1111-111111111111', '88888888-8888-8888-8888-888888888888', NOW());

-- 8. Комментарии (challenge_comments)
INSERT INTO public.challenge_comments (id, challenge_id, profile_id, parent_comment_id, content, created_at, updated_at)
VALUES
  ('90000000-0000-4000-8000-000000000000', '77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', NULL, 'Отличный челлендж для начинающих! Вчера попробовал.', NOW(), NOW()),
  ('a0000000-0000-4000-8000-000000000000', '88888888-8888-8888-8888-888888888888', '33333333-3333-3333-3333-333333333333', NULL, 'Добавил в избранное, начну на следующей неделе.', NOW(), NOW()),
  ('b0000000-0000-4000-8000-000000000000', '77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', '90000000-0000-4000-8000-000000000000', 'Согласен, главное не переусердствовать с темпом.', NOW(), NOW());

-- 9. Полученные достижения (profile_achievements)
INSERT INTO public.profile_achievements (id, profile_id, achievement_id, earned_at)
VALUES
  ('c0000000-0000-4000-8000-000000000000', '22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', NOW() - INTERVAL '2 days'),
  ('d0000000-0000-4000-8000-000000000000', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', NOW() - INTERVAL '5 days'),
  ('e0000000-0000-4000-8000-000000000000', '11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', NOW() - INTERVAL '1 day');

COMMIT;