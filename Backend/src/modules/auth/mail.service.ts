import nodemailer from 'nodemailer';
import { env } from '../../config/env';
import { logger } from '../../config/logger';

export class MailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    const isSmtpConfigured = !!(env.SMTP_USER && env.SMTP_PASS);

    if (isSmtpConfigured) {
      try {
        this.transporter = nodemailer.createTransport({
          host: env.SMTP_HOST,
          port: env.SMTP_PORT,
          secure: env.SMTP_SECURE,
          auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          },
        });
        logger.info('📧 MailService: SMTP Transporter initialized successfully');
      } catch (error: any) {
        logger.error('📧 MailService: Failed to initialize SMTP Transporter. Mailer will fallback to console logging.', {
          error: error.message,
        });
      }
    } else {
      logger.info('📧 MailService: SMTP credentials not set. Mailer will print emails to console.');
    }
  }

  async sendResetPasswordEmail(to: string, name: string, resetLink: string): Promise<void> {
    const subject = 'Reset Your PSA Workforce Insights Password';
    const textContent = `Hi ${name},\n\nWe received a request to reset your password for the PSA Workforce Insights CMS. You can reset your password using the following link:\n\n${resetLink}\n\nThis link is valid for 1 hour. If you did not request this, please ignore this email.\n\nRegards,\nPSA Digital Team`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Password</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #fbfaf7;
            color: #2d2b27;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 500px;
            margin: 40px auto;
            background-color: #ffffff;
            border: 1px solid #d8d4cc;
            padding: 32px;
          }
          .logo {
            font-family: Courier, monospace;
            font-size: 11px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #8b867d;
            margin-bottom: 24px;
            border-bottom: 1px solid #efece6;
            padding-bottom: 12px;
          }
          h2 {
            font-size: 18px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 16px;
            color: #2d2b27;
          }
          p {
            font-size: 13px;
            line-height: 1.6;
            margin-bottom: 24px;
            color: #57534c;
          }
          .btn-container {
            margin-bottom: 28px;
          }
          .btn {
            display: inline-block;
            background-color: #2d2b27;
            color: #ffffff !important;
            text-decoration: none;
            padding: 10px 20px;
            font-family: Courier, monospace;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: bold;
          }
          .btn:hover {
            background-color: #3b3833;
          }
          .footer {
            font-family: Courier, monospace;
            font-size: 9px;
            color: #8b867d;
            border-top: 1px solid #efece6;
            padding-top: 16px;
            margin-top: 32px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            PSA Workforce Insights / Access Gateway
          </div>
          <h2>Password Reset Request</h2>
          <p>Hi ${name},</p>
          <p>We received a request to reset your password for the PSA Workforce Insights CMS. Click the button below to choose a new password:</p>
          <div class="btn-container">
            <a href="${resetLink}" class="btn" target="_blank">Reset Password</a>
          </div>
          <p>This password reset link is only valid for 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
          <div class="footer">
            SECURE SYSTEM &bull; &copy; 2026 PSA DIGITAL
          </div>
        </div>
      </body>
      </html>
    `;

    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from: `"PSA Digital" <${env.SMTP_FROM}>`,
          to,
          subject,
          text: textContent,
          html: htmlContent,
        });
        logger.info(`📧 Reset password email dispatched successfully to: ${to}`);
        return;
      } catch (error: any) {
        logger.error(`📧 SMTP sending failed. Falling back to terminal output:`, { error: error.message });
      }
    }

    // Fallback logging in console
    const devLogBox = `
=========================================
📧 [DEVELOPMENT MAIL LOG]
To: ${to}
Subject: ${subject}
Reset Link: ${resetLink}
=========================================
`;
    console.log(devLogBox);
    logger.info(`📧 Password reset link printed to console for ${to}`);
  }
}

export const mailService = new MailService();
