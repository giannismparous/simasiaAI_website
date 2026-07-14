import emailjs from '@emailjs/browser';

let initialized = false;

const getConfig = () => {
  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';
  return { serviceID, templateID, publicKey };
};

export const isEmailJsConfigured = () => {
  const { serviceID, templateID, publicKey } = getConfig();
  if (!serviceID || !templateID || !publicKey) return false;
  if (serviceID === 'your_service_id') return false;
  if (templateID === 'your_template_id') return false;
  if (publicKey === 'your_public_key') return false;
  return true;
};

const ensureInit = (publicKey) => {
  if (!initialized) {
    emailjs.init(publicKey);
    initialized = true;
  }
};

/**
 * Sends a contact / demo request through EmailJS.
 * Uses the same template params as the production main branch form.
 */
export const sendContactEmail = async ({
  fromName,
  fromEmail,
  organizationType = 'N/A',
  companyName = 'N/A',
  message = 'N/A',
  attachment = 'N/A',
}) => {
  const { serviceID, templateID, publicKey } = getConfig();

  if (!isEmailJsConfigured()) {
    const err = new Error('EmailJS configuration is missing. Please check your environment variables.');
    err.code = 'CONFIG_MISSING';
    throw err;
  }

  ensureInit(publicKey);

  const templateParams = {
    from_name: fromName,
    from_email: fromEmail,
    organization_type: organizationType,
    company_name: companyName || 'N/A',
    message: message || 'N/A',
    attachment: attachment || 'N/A',
    to_email: 'contact@simasiaai.gr',
    reply_to: fromEmail,
  };

  let retries = 2;
  let lastError = null;

  while (retries >= 0) {
    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      return;
    } catch (error) {
      lastError = error;
      const text = `${error?.text || ''} ${error?.message || ''}`;
      if (retries > 0 && text.includes('fetch')) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        retries -= 1;
      } else {
        throw error;
      }
    }
  }

  throw lastError;
};

export const mapEmailJsError = (error, fallbackMessage) => {
  const text = `${error?.text || ''} ${error?.message || ''}`;
  if (error?.code === 'CONFIG_MISSING') {
    return 'Email configuration error. Please contact support.';
  }
  if (text.includes('fetch') || text.includes('Failed to fetch')) {
    return 'Network error. Please check your internet connection and try again.';
  }
  if (text.includes('Public Key')) {
    return 'Email configuration error. Please contact support.';
  }
  return fallbackMessage;
};
