
## Overview

Add: (1) Google sign-in for admins + regular users, (2) admin-only editable content across the whole site, (3) a "Community Wall" of admin-posted call recaps with photo, caption, likes, comments and social share, (4) a read-only submissions viewer pulled live from the Google Sheet.

This needs Lovable Cloud (database + auth + storage). I'll enable it in the first step.

## Step 1 — Enable Lovable Cloud & Google sign-in

- Enable Lovable Cloud.
- Enable Email/Password + Google auth. Any signed-up user becomes a normal "user" (name shows on comments). Admins are users whose email is in a `user_roles` table with role `admin`.
- Seed one admin: **suunil428@gmail.com** (I'll grant admin on first sign-in via a trigger that checks the email).

## Step 2 — Database

Tables (all with RLS + grants):

- `profiles` — id (→ auth.users), display_name, avatar_url. Auto-created on signup.
- `user_roles` — (user_id, role) with `app_role` enum (`admin`, `user`) + `has_role()` security-definer function.
- `site_content` — key (text PK), value (jsonb). One row per editable block (e.g. `home.hero.title`, `about.founder.bio`, `contact.email`, …). Public SELECT; admin-only write.
- `site_images` — key (text PK), storage_path, alt. Public SELECT; admin-only write. Storage bucket `site-assets` (public).
- `posts` — id, author_id (admin), title, caption, image_path, created_at. Public SELECT; admin-only write. Storage bucket `post-images` (public).
- `post_likes` — (post_id, fingerprint) unique. Anonymous likes keyed by a browser-generated UUID stored in localStorage (prevents trivial double-likes without requiring login). Public insert/select.
- `post_comments` — id, post_id, author_name, author_id (nullable), body, created_at. Public insert/select; admin can delete.

## Step 3 — Content-driven site

Introduce a `useContent(key, fallback)` hook that reads `site_content` (cached via TanStack Query) and falls back to current i18n strings while loading. Wrap all currently hardcoded text/photo spots on Home, About, How It Works, For Representatives, Get Involved, Contact, and footer/header so admins can edit them. i18n stays: each content row stores `{ en, ne }`.

## Step 4 — Admin panel `/admin` (gated by `hasRole('admin')`)

Tabs:

1. **Submissions** — live pull from Google Sheet (`Request a Call`, `Volunteer`, `MP Partnership`), latest 50 each, read-only table.
2. **Content editor** — grouped by page; edit EN + NE text side by side, upload/replace images.
3. **Posts** — create/edit/delete community posts (photo upload, caption, title).
4. **Comments** — moderate/delete comments.

Non-admins hitting `/admin` are redirected to `/auth`.

## Step 5 — Community Wall

- New route `/wall` + a preview strip on the home page ("Recent Conversations") linking to it. Header nav gets a "Wall" link.
- Each post card: photo, caption, like button (optimistic, anon fingerprint), comment thread (guest name + message, or auto-uses signed-in profile name), and Share buttons (Facebook, X/Twitter, WhatsApp, copy-link).

## Step 6 — User accounts

- `/auth` route with Email/Password + "Continue with Google". After signup, profile row auto-created; users can set display name at `/account`.
- Header shows Sign in / avatar menu (Account, Sign out; Admin link if role=admin).
- Signed-in users' names auto-fill on comments and forms.

## Step 7 — Wire up & verify

- Add all i18n strings for new UI (EN + NE).
- Verify build, run through: sign in as admin, edit a hero string, upload a post, like + comment from a fresh browser, confirm submissions tab loads sheet rows.

## Technical notes

- Auth: Supabase (Lovable Cloud) with `_authenticated` gate for `/admin` and `/account`. Google provider enabled in Cloud auth settings — I'll open that panel; you approve.
- Sheet reads: new `listSubmissions` server fn using the existing `google_sheets` connector via `values:batchGet` for the three tabs.
- Storage: two public buckets (`site-assets`, `post-images`); admin-only write policies.
- Roles: strictly in `user_roles` (never on profile) with `has_role()` security-definer to avoid RLS recursion.
- Share buttons use plain URLs (no SDKs) so no extra keys needed.

Scope note: "everything editable" covers all visible text and images on the six existing pages + header/footer. Structural things (adding/removing pages, changing navigation, changing color palette) stay in code — tell me if you want any of those admin-editable too.
