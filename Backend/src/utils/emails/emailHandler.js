import { resendClient, sender } from '../resendEmail.js';
import { createWelcomeEmailTemplate } from './emailTemplates.js';

export const sendWelcomeEmail = async ( email, fullName, cliendURL ) => {
    const { data, err } = await resendClient.emails.send({
        from: sender.email,
        to: email,
        subject: "Welcome to Sodhify!",
        html: createWelcomeEmailTemplate(fullName, cliendURL)
    });
    if (err) {
        console.error("Error sending welcome email:", err);
        throw new Error("Failed to send welcome email");
    }
    console.log("Welcome email sent successfully:", data);
};