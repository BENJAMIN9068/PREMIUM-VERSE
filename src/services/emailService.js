import emailjs from '@emailjs/browser';

// EmailJS Configuration
// TODO: Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_YOUR_SERVICE_ID'; // Example: service_x9d8s7f
const EMAILJS_TEMPLATE_ID = 'template_YOUR_TEMPLATE_ID'; // Example: template_k4j3h2g
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Example: user_9d8s7f6g5h4j3k2l

// Initialize EmailJS
export const initEmailService = () => {
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch (error) {
        console.error('EmailJS Initialization Error:', error);
    }
};

/**
 * Send Welcome Email to new user
 * @param {Object} user - User object containing name and email
 */
export const sendWelcomeEmail = async (user) => {
    if (!user || !user.email) return;

    try {
        const templateParams = {
            to_name: user.name || 'User',
            to_email: user.email,
            message: `Welcome to Premium Verse! We are thrilled to have you on board. Explore our premium digital products now.`,
            // Add other parameters that match your EmailJS template variables
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );

        console.log('Welcome Email Sent Successfully:', response.status, response.text);
        return response;
    } catch (error) {
        console.error('Failed to send Welcome Email:', error);
        // Don't throw error to prevent blocking the signup flow
        return null;
    }
};

export default {
    sendWelcomeEmail,
    initEmailService
};
