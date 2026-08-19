-- ==========================================
-- OpenRemix Analytics Tables
-- ==========================================
-- Execute this SQL in Supabase SQL Editor
-- ==========================================

-- 1. Analytics Event Table (事件追踪)
CREATE TABLE IF NOT EXISTS "seedance21pro"."analytics_event" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT,
  "session_id" TEXT NOT NULL,
  "event_name" TEXT NOT NULL,
  "event_category" TEXT NOT NULL,
  "event_data" TEXT NOT NULL DEFAULT '{}',
  "page" TEXT,
  "referrer" TEXT,
  "user_agent" TEXT,
  "ip" TEXT,
  "country" TEXT,
  "city" TEXT,
  "device_type" TEXT,
  "browser" TEXT,
  "os" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "idx_analytics_event_name" ON "seedance21pro"."analytics_event"("event_name");
CREATE INDEX IF NOT EXISTS "idx_analytics_event_category" ON "seedance21pro"."analytics_event"("event_category");
CREATE INDEX IF NOT EXISTS "idx_analytics_user" ON "seedance21pro"."analytics_event"("user_id");
CREATE INDEX IF NOT EXISTS "idx_analytics_session" ON "seedance21pro"."analytics_event"("session_id");
CREATE INDEX IF NOT EXISTS "idx_analytics_created" ON "seedance21pro"."analytics_event"("created_at");
CREATE INDEX IF NOT EXISTS "idx_analytics_country" ON "seedance21pro"."analytics_event"("country");

-- 2. Analytics Session Table (会话追踪)
CREATE TABLE IF NOT EXISTS "seedance21pro"."analytics_session" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT,
  "landing_page" TEXT,
  "referrer_domain" TEXT,
  "referrer_url" TEXT,
  "utm_source" TEXT,
  "utm_medium" TEXT,
  "utm_campaign" TEXT,
  "utm_term" TEXT,
  "utm_content" TEXT,
  "country" TEXT,
  "city" TEXT,
  "device_type" TEXT,
  "browser" TEXT,
  "os" TEXT,
  "screen_resolution" TEXT,
  "language" TEXT,
  "timezone" TEXT,
  "ip" TEXT,
  "page_view_count" INTEGER NOT NULL DEFAULT 0,
  "event_count" INTEGER NOT NULL DEFAULT 0,
  "duration" INTEGER DEFAULT 0,
  "bounced" BOOLEAN NOT NULL DEFAULT FALSE,
  "converted" BOOLEAN NOT NULL DEFAULT FALSE,
  "started_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "ended_at" TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "idx_analytics_session_user" ON "seedance21pro"."analytics_session"("user_id");
CREATE INDEX IF NOT EXISTS "idx_analytics_session_started" ON "seedance21pro"."analytics_session"("started_at");
CREATE INDEX IF NOT EXISTS "idx_analytics_session_referrer" ON "seedance21pro"."analytics_session"("referrer_domain");
CREATE INDEX IF NOT EXISTS "idx_analytics_session_utm_source" ON "seedance21pro"."analytics_session"("utm_source");
CREATE INDEX IF NOT EXISTS "idx_analytics_session_country" ON "seedance21pro"."analytics_session"("country");
CREATE INDEX IF NOT EXISTS "idx_analytics_session_bounced" ON "seedance21pro"."analytics_session"("bounced");
CREATE INDEX IF NOT EXISTS "idx_analytics_session_converted" ON "seedance21pro"."analytics_session"("converted");

-- 3. Analytics Page View Table (页面浏览)
CREATE TABLE IF NOT EXISTS "seedance21pro"."analytics_page_view" (
  "id" TEXT PRIMARY KEY,
  "session_id" TEXT NOT NULL,
  "user_id" TEXT,
  "page" TEXT NOT NULL,
  "title" TEXT,
  "referrer" TEXT,
  "duration" INTEGER DEFAULT 0,
  "scroll_depth" INTEGER DEFAULT 0,
  "exit_page" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "idx_analytics_pageview_session" ON "seedance21pro"."analytics_page_view"("session_id");
CREATE INDEX IF NOT EXISTS "idx_analytics_pageview_user" ON "seedance21pro"."analytics_page_view"("user_id");
CREATE INDEX IF NOT EXISTS "idx_analytics_pageview_page" ON "seedance21pro"."analytics_page_view"("page");
CREATE INDEX IF NOT EXISTS "idx_analytics_pageview_created" ON "seedance21pro"."analytics_page_view"("created_at");

-- ==========================================
-- 执行完成后，表应该已创建成功
-- 可以运行以下查询验证：
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'seedance21pro'
-- AND table_name LIKE 'analytics_%';
-- ==========================================
