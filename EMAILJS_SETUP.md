# EmailJS Setup Guide for Automatic Admin Notifications

## How It Works

When a user submits the Join form, their information is **automatically sent** to the admin email (`nnm23cc020@nmamit.in`) **without any manual steps**. This is powered by EmailJS, a free service that handles email sending from the frontend.

## Setup Instructions

### Step 1: Create an EmailJS Account

1. Go to https://www.emailjs.com (Free tier available)
2. Sign up with your email address
3. Verify your email

### Step 2: Add Your Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail** (or your email provider)
4. Connect your email account
5. Follow the prompts and approve access

### Step 3: Create an Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template with the following variables:

**Template Name:** `volunteer_submission` (or any name you prefer)

**Subject:**
```
New Join Us Submission from She Can Foundation
```

**Email Body (HTML):**
```html
<h2>New Volunteer Submission</h2>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>College:</strong> {{college}}</p>
<p><strong>Interest:</strong> {{interest}}</p>
<p><strong>Preferred Mode:</strong> {{mode}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
<hr>
<p><small>Submitted at: {{submission_time}}</small></p>
```

4. Save the template
5. Note the **Template ID** (shown in the template settings)

### Step 4: Get Your Credentials

1. In EmailJS dashboard, go to **Account** (top right)
2. Copy your **Public Key** (labeled as "Public Key")
3. Copy your **Service ID** from Email Services
4. Copy your **Template ID** from Email Templates

### Step 5: Configure Environment Variables

1. Open `.env.local` in the project root
2. Fill in your credentials:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Save the file
4. Restart the development server or rebuild the project

### Step 6: Test It

1. Go to the Join Us page
2. Fill out the form
3. Click **Submit**
4. Check your admin email (`nnm23cc020@nmamit.in`) for the submission

## What the User Sees

- User fills out Join form → Clicks **Submit**
- "Sending..." message appears
- ✓ "Thank you! Your information has been sent to our admin"
- Form clears and resets

## What the Admin Receives

Admin email (`nnm23cc020@nmamit.in`) receives an email with:
- Full name
- Email address
- College/University
- Interest (Volunteer/Mentor/Workshop)
- Preferred mode (Online/Offline/Hybrid)
- Optional message

## Troubleshooting

### "EmailJS not configured" error

Make sure your `.env.local` file has the three variables set correctly:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

### Emails not being received

1. Check spam/junk folder
2. Verify the email service is connected in EmailJS dashboard
3. Check the template is published
4. Test sending manually from EmailJS dashboard first

### Free Tier Limits

- EmailJS free tier allows 200 emails/month
- For production, you may need to upgrade

---

## Summary

✅ **Frontend-only solution** - No backend needed  
✅ **Automatic sending** - No manual email drafts  
✅ **User-friendly** - Simple submit button  
✅ **Admin gets data** - All form info in email  
✅ **Free to start** - EmailJS free tier available
