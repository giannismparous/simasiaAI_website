# EmailJS Setup Instructions

## Free Email Service Setup (200 emails/month free)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (no credit card required)
3. Free tier includes 200 emails per month

### Step 2: Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your email provider)
4. Connect your Gmail account (simasia.ai@gmail.com)
5. Copy the **Service ID** (e.g., `service_xxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

**Subject:**
```
Νέο Demo Request από {{from_name}}
```

**Content:**
```
Όνομα: {{from_name}}
Email: {{from_email}}
Email Απάντησης: {{reply_to}}
Φορέας/Ιδιότητα: {{organization_type}}
Επωνυμία: {{company_name}}
Περιγραφή: {{message}}
Αρχείο/Σύνδεσμος: {{attachment}}

---
Αυτό το email στάλθηκε από το contact form της SimasiaAI.
```

4. **To Email:** simasia.ai@gmail.com
5. **From Name:** SimasiaAI Website
6. **Reply To:** {{reply_to}}
7. Copy the **Template ID** (e.g., `template_xxxxx`)

### Step 4: Get Public Key
1. Go to **Account** > **General**
2. Copy your **Public Key** (under API Keys)

### Step 5: Configure Environment Variables
1. Create a `.env` file in the root directory (same level as package.json)
2. Add these lines:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the values with your actual IDs from EmailJS
4. **Important:** The `.env` file is already in `.gitignore` so it won't be committed

### Step 6: Restart Development Server
After creating the `.env` file:
```bash
npm start
```

## Testing
1. Fill out the contact form on the website
2. Submit the form
3. You should receive an email at simasia.ai@gmail.com
4. The form will show a success message

## Notes
- Free tier: 200 emails/month
- If you need more, EmailJS has paid plans starting at $15/month
- All emails will be sent to simasia.ai@gmail.com
- The reply-to will be set to the client's email so you can reply directly

