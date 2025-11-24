# Contact Management System

## ✅ What's Been Added

Your portfolio now has a complete contact management system that:
- Saves all contact form submissions to MongoDB database
- Sends emails via FormSubmit (existing functionality)
- Displays all contacts in the admin dashboard
- Allows you to track and manage contact status

## 📍 Access

**Admin Contacts Page:** `http://localhost:3000/admin/contacts`

## 🎯 Features

### Contact Form (Public)
- Users fill out the contact form on your portfolio
- Submissions are:
  1. **Saved to database** with status "new"
  2. **Sent to your email** via FormSubmit
- Real-time success/error messages
- Loading state during submission

### Admin Dashboard

#### Contacts Page (`/admin/contacts`)

**Statistics Dashboard:**
- Total contacts
- New messages
- Replied messages
- Archived messages

**Inbox View:**
- List of all contact messages
- Filter by status (All, New, Read, Replied, Archived)
- Visual badges showing status
- "New" indicator for unread messages
- Click-to-view details

**Message Details:**
- Full message content
- Sender information (name, email)
- Date and time received
- Quick email link to reply
- Status management

**Status Management:**
- **New** - Just received (default)
- **Read** - You've viewed it (auto-set when opened)
- **Replied** - You've responded
- **Archived** - Closed/completed

#### Actions:
- Mark as read/replied/archived
- Delete messages
- Email sender directly (mailto link)

## 🗄️ Database Structure

### Contact Model
```typescript
{
  name: string          // Sender's name
  email: string         // Sender's email
  subject: string       // Message subject
  message: string       // Full message content
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: Date      // Auto-generated
  updatedAt: Date      // Auto-updated
}
```

## 📊 API Endpoints

**Get all contacts:**
```
GET /api/contacts
GET /api/contacts?status=new
```

**Get single contact:**
```
GET /api/contacts/[id]
```

**Create contact (from form):**
```
POST /api/contacts
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss...",
  "status": "new"
}
```

**Update contact status:**
```
PUT /api/contacts/[id]
{
  "status": "replied"
}
```

**Delete contact:**
```
DELETE /api/contacts/[id]
```

## 🚀 How to Use

### For You (Admin)

1. **Access Contacts:**
   - Go to `/admin`
   - Login with your password
   - Click "Contacts" in the header
   - Or go directly to `/admin/contacts`

2. **View Messages:**
   - See all messages in the inbox
   - Click any message to view details
   - Messages auto-mark as "read" when opened

3. **Respond to Messages:**
   - Click the email link to open your email client
   - Or manually email the sender
   - Update status to "replied" when done

4. **Organize:**
   - Archive old/completed conversations
   - Delete spam or irrelevant messages
   - Filter by status to focus on what needs attention

### For Visitors (Public)

1. Scroll to Contact section on portfolio
2. Fill out the form
3. Click "Send Message"
4. See success confirmation
5. You'll receive it in:
   - Your email inbox
   - Admin dashboard contacts

## 📁 Files Created

- `models/Contact.ts` - Database model
- `app/api/contacts/route.ts` - API endpoints (GET all, POST create)
- `app/api/contacts/[id]/route.ts` - Single contact endpoints (GET, PUT, DELETE)
- `app/admin/contacts/page.tsx` - Admin contacts management page
- `app/components/Contact.tsx` - Updated with database integration

## ⚙️ Setup

The contact system uses the same MongoDB database as your blog. No additional setup needed if you've already configured MongoDB for the blog!

Just make sure your `.env.local` has:
```env
MONGODB_URI=your_mongodb_connection_string
```

## 🎨 Design

The contacts page matches your portfolio's aesthetic:
- Glassmorphism panels
- Status badges with color coding
- Responsive inbox/detail layout
- Smooth animations
- Modern, clean interface

## 🔔 Notifications

Currently, you receive notifications via:
- **Email:** FormSubmit sends to your Gmail
- **Dashboard:** See new contacts count and "New" badges

For real-time notifications, consider adding:
- Browser push notifications
- Email digest summary
- WhatsApp/SMS integration (future enhancement)

## 📈 Analytics

Track your contact metrics:
- Total messages received
- Response rate
- Average response time (manual tracking)
- Popular inquiry subjects (by reviewing messages)

## ✨ Benefits

1. **Never Lose a Message** - Everything saved in database
2. **Professional Management** - Track conversation status
3. **Easy Organization** - Filter and archive
4. **Quick Access** - Email links for fast replies
5. **Historical Record** - All contacts permanently saved

---

**Need help?** All contacts are in your admin dashboard at `/admin/contacts`!
