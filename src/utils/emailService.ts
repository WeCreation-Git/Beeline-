const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1M-fVj_z9RMA1EGXtVRABA2BSbUOYuQeGv9e43Pw-SNlYVWtSy0PIlICmhxH7paui/exec';

export const sendEmail = (emailData: {
  to: string[];
  subject: string;
  html: string;
}) => {
  const script = document.createElement('script');
  const callbackName = 'emailCallback' + Date.now();
  
  (window as any)[callbackName] = () => {
    document.head.removeChild(script);
    delete (window as any)[callbackName];
  };
  
  const params = new URLSearchParams({
    callback: callbackName,
    to: emailData.to.join(','),
    subject: emailData.subject,
    html: emailData.html
  });
  
  script.src = `${GOOGLE_SCRIPT_URL}?${params}`;
  document.head.appendChild(script);
};