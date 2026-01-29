import { Resend } from 'resend';
import config from '../config.js';

const resendClient = new Resend(config.RESEND_API_KEY);
const sender = {
    email: config.EMAIL_FROM,
    name: config.EMAIL_FROM_NAME,
}
export { resendClient, sender };