# Blog Database Setup Guide

This portfolio has a fully functional blog system with MongoDB integration and an admin interface. Follow these steps to set it up.

## 📋 Prerequisites

- MongoDB Atlas account (free tier available)
- Node.js installed

## 🔐 Admin Interface

Your portfolio now includes a private admin interface at `/admin` where you can:
- View all blog posts (published and drafts)
- Create new blog posts
- Edit existing posts
- Delete posts
- Publish/unpublish posts

**Access:** Navigate to `http://localhost:3000/admin` (or your domain/admin)

## 🚀 Setup Instructions

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (select the free tier)
4. Wait for the cluster to be created (takes ~3-5 minutes)

### Step 2: Setup Database Access

1. In MongoDB Atlas, click on "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these securely!)
4. Set permissions to "Read and write to any database"
5. Click "Add User"

### Step 3: Setup Network Access

1. Click on "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add your specific IP)
4. Click "Confirm"

### Step 4: Get Connection String

1. Click on "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)

### Step 5: Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Add your MongoDB connection string and admin password:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/portfolio?retryWrites=true&w=majority
ADMIN_PASSWORD=your_secure_admin_password_here
```

**Important:** 
- Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your actual MongoDB values!
- Replace `your_secure_admin_password_here` with a strong password for admin access
- Never commit this file to Git (it's already in .gitignore)

### Step 6: Seed the Database

Run the seeding script to populate your database with initial blog posts:

```bash
npm run seed
```

Or manually run:

```bash
node scripts/seedBlog.ts
```

If you encounter issues, try:

```bash
npx tsx scripts/seedBlog.ts
```

### Step 7: Verify Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/blog`
3. You should see the blog posts displayed!

## 🎛️ Using the Admin Interface

### Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Enter your admin password (the one you set in `.env.local` as `ADMIN_PASSWORD`)
3. You'll be redirected to the dashboard

### Admin Dashboard

The dashboard shows:
- **Total Posts** - All blog posts
- **Published** - Live posts visible to visitors
- **Drafts** - Unpublished posts only visible to you

You can filter posts by:
- All Posts
- Published Only
- Drafts Only

### Creating a New Post

1. Click **"New Post"** button in the dashboard
2. Fill in the form:
   - **Title**: Your blog post title (slug is auto-generated)
   - **Slug**: URL-friendly version (e.g., `my-awesome-post`)
   - **Excerpt**: Short description shown in post listings
   - **Content**: HTML content of your post
   - **Category**: Post category (e.g., Development, Design)
   - **Tags**: Comma-separated tags (e.g., React, Next.js, TypeScript)
   - **Featured Image URL**: Path to image (e.g., `/blog/my-image.jpg`)
   - **Read Time**: Estimated read time (e.g., `5 min read`)
   - **Publish**: Toggle to publish immediately or save as draft
3. Click **"Create Post"**

### Editing a Post

1. In the dashboard, click the **pencil icon** (✏️) on any post
2. Update the fields you want to change
3. Click **"Update Post"**
4. Click **"Preview"** to see how it looks before publishing

### Deleting a Post

1. In the dashboard, click the **trash icon** (🗑️) on the post
2. Confirm the deletion

### Publishing/Unpublishing

- Toggle the **"Published"** switch when creating or editing
- Published posts appear on your blog
- Drafts are hidden from visitors but visible in admin

### Content Formatting

The content field accepts HTML. Here are some examples:

```html
<h2>Main Heading</h2>
<p>Your paragraph text here.</p>

<h3>Subheading</h3>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>

<p>Text with <strong>bold</strong> and <em>italic</em>.</p>

<blockquote>A quote or callout</blockquote>

<code>inline code</code>

<pre><code>Code block here</code></pre>
```

## 📝 Managing Blog Posts

### Via API

You can manage blog posts using the API endpoints:

**Get all posts:**
```
GET /api/blog
GET /api/blog?category=Development
GET /api/blog?limit=5
```

**Get single post:**
```
GET /api/blog/[slug]
```

**Create post:**
```
POST /api/blog
Content-Type: application/json

{
  "slug": "my-new-post",
  "title": "My New Blog Post",
  "excerpt": "A brief description...",
  "content": "<h2>Content here...</h2>",
  "image": "/blog/image.jpg",
  "category": "Development",
  "tags": ["React", "Next.js"],
  "readTime": "5 min read",
  "published": true
}
```

**Update post:**
```
PUT /api/blog/[slug]
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "<p>Updated content...</p>"
}
```

**Delete post:**
```
DELETE /api/blog/[slug]
```

### Using MongoDB Compass (GUI)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Navigate to your database and `blogposts` collection
4. You can view, edit, and delete posts directly

### Using MongoDB Atlas Web Interface

1. Go to your cluster in MongoDB Atlas
2. Click "Browse Collections"
3. Select your database and `blogposts` collection
4. Use the interface to manage posts

## 🎨 Adding Blog Images

1. Place your blog images in the `public/blog/` directory
2. Reference them in your blog posts as: `/blog/your-image.jpg`

## 🔒 Security Notes

- **Never commit `.env.local`** to version control
- **Use a strong admin password** - Mix of letters, numbers, and special characters
- **Change default password** - If you used a simple password for testing, change it before deploying
- Keep your MongoDB credentials secure
- In production, restrict Network Access to specific IPs
- For production apps, consider implementing:
  - JWT-based authentication instead of password-only
  - Session management
  - Rate limiting on admin routes
  - HTTPS only access

## 🐛 Troubleshooting

**"MONGODB_URI is not defined"**
- Make sure `.env.local` exists in your project root
- Restart your development server after creating `.env.local`

**"Cannot connect to MongoDB"**
- Verify your connection string is correct
- Check Network Access settings in MongoDB Atlas
- Ensure your IP address is whitelisted

**"No posts showing"**
- Run the seeding script: `npm run seed`
- Check MongoDB Atlas to verify posts were created
- Check browser console for errors

**"Can't login to admin"**
- Verify `ADMIN_PASSWORD` is set in `.env.local`
- Restart your development server after adding the password
- Check browser console for network errors
- Default password (if not set) is `admin123` - change this immediately!

## 📚 Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## ✨ Features

- ✅ Full CRUD operations
- ✅ **Password-protected admin interface**
- ✅ **Visual blog post editor**
- ✅ **Draft/Publish workflow**
- ✅ Category filtering
- ✅ Tag system
- ✅ SEO-friendly slugs
- ✅ Rich text content support (HTML)
- ✅ Related posts
- ✅ Social sharing
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Auto-slug generation

---

**Need help?** Create an issue or reach out!
