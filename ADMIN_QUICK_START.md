# Admin Interface - Quick Start

## Access

**URL:** `http://localhost:3000/admin` (or `yourdomain.com/admin`)

**Password:** Set in `.env.local` as `ADMIN_PASSWORD`

## Default Credentials

If `ADMIN_PASSWORD` is not set:
- Default password: `admin123`
- ⚠️ **CHANGE THIS IMMEDIATELY** before deploying!

## Quick Setup

1. Add to `.env.local`:
```env
ADMIN_PASSWORD=your_secure_password_here
```

2. Restart your dev server:
```bash
npm run dev
```

3. Navigate to `/admin` and login

## Pages

- `/admin` - Login page
- `/admin/dashboard` - View all posts
- `/admin/posts/new` - Create new post
- `/admin/posts/[slug]/edit` - Edit existing post

## Features

✅ Create, edit, delete blog posts
✅ Publish/unpublish posts
✅ Draft workflow
✅ Auto-slug generation
✅ Category and tag management
✅ HTML content editor
✅ Featured image management
✅ Real-time preview
✅ Post statistics dashboard

## For Production

Before deploying, consider:
1. Use a strong password (letters + numbers + symbols)
2. Implement HTTPS
3. Add rate limiting
4. Consider JWT authentication
5. Add session management
6. Restrict admin routes at network level

---

**Full documentation:** See `BLOG_SETUP.md`
