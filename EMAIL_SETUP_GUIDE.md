# Email Form Setup Guide

Your website already has a contact form implemented! Here's how to make it work with your email:

## Option 1: EmailJS (Recommended - Free & Easy)

EmailJS works with ANY email provider, including your own domain email with MX records.

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for free (200 emails/month, no credit card needed)

### Step 2: Add Your Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (if using Gmail)
   - **Outlook** (if using Outlook/Hotmail)
   - **Custom SMTP** (for your own domain email with MX records)
4. For custom domain email:
   - Choose "Other (SMTP)"
   - Enter your SMTP settings:
     - SMTP Server: (your email provider's SMTP server)
     - Port: 587 (or 465 for SSL)
     - Username: your full email address
     - Password: your email password
5. Copy the **Service ID** (looks like `service_xxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up the template:

**Subject:**
```
Νέο Demo Request από {{from_name}}
```

**Content:**
```
Όνομα: {{from_name}}
Email: {{from_email}}
Φορέας/Ιδιότητα: {{organization_type}}
Επωνυμία: {{company_name}}
Περιγραφή: {{message}}
Αρχείο/Σύνδεσμος: {{attachment}}

---
Αυτό το email στάλθηκε από το contact form της SimasiaAI.
```

**Settings:**
- **To Email:** contact@simasiaai.gr
- **From Name:** SimasiaAI Website
- **Reply To:** {{reply_to}}

4. Copy the **Template ID** (looks like `template_xxxxx`)

### Step 4: Get Public Key
1. Go to **Account** > **General**
2. Copy your **Public Key**

### Step 5: Configure Environment Variables
1. Create a `.env` file in your project root (same folder as package.json)
2. Add these lines:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace with your actual values from EmailJS

### Step 6: Restart Development Server
After creating the `.env` file, restart your development server:

```bash
npm start
```

## ✅ COMPLETED UPDATES

I've already updated your code with the new email address:

1. **Contact form** now sends to: `contact@simasiaai.gr`
2. **Footer contact** updated to: `contact@simasiaai.gr`  
3. **Error messages** updated with new email address

## Final Steps for You:

1. **Create `.env` file** in your project root (copy from `.env.template`)
2. **Set up EmailJS account** following steps 1-4 above
3. **Add your EmailJS credentials** to the `.env` file
4. **Restart the development server**
5. **Test the contact form**

## Testing the Form:

1. Go to any page with the contact form (Home, Book Demo, etc.)
2. Fill out and submit the form
3. Check your `contact@simasiaai.gr` inbox
4. You should receive the form submission

## Troubleshooting:

- Make sure your `.env` file is in the project root (same level as `package.json`)
- Restart the development server after creating/updating `.env`
- Check browser console for any errors
- Verify EmailJS service is properly configured

The form is now ready to work with your email! 🎉
