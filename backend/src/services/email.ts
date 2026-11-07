import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailInput): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html: html ?? text,
  });
}

type SendOTPEmailInput = {
  to: string;
  otp: string;
  purpose: "signup" | "password_reset";
};

export async function sendOTPEmail({
  to,
  otp,
  purpose,
}: SendOTPEmailInput): Promise<void> {
  const isSignup = purpose === "signup";

  const subject = isSignup
    ? "Verify your Oga account"
    : "Reset your Oga account password";

  const title = isSignup ? "Verify your email" : "Reset your password";

  const leadText = isSignup
    ? "Thank you for joining Oga. To finalize creating your account, please verify your email address using the one-time security code below:"
    : "We received a request to change your account password. Please apply the following single-use verification code to proceed:";

  const text = [
    title,
    "",
    leadText,
    "",
    `Your verification code: ${otp}`,
    "",
    "This code will expire in 10 minutes. For security protection, do not share this code with anyone.",
    "",
    "The Oga Team",
  ].join("\n");

  const currentYear = new Date().getFullYear();

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F4F7F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#172B22;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F4F7F5;">
      <tr>
        <td align="center" style="padding:48px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:460px;background-color:#FFFFFF;border-radius:16px;box-shadow:0 4px 12px rgba(23,43,34,0.03);overflow:hidden;">
            
            
            <tr>
              <td style="padding:32px 32px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="center" valign="middle" width="36" height="36" style="width:36px;height:36px;background-color:#02794B;border-radius:8px;color:#FFFFFF;font-size:18px;font-weight:bold;line-height:36px;font-family:sans-serif;">
                      O
                    </td>
                    <td style="padding-left:12px;font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#172B22;">
                      Oga<span style="color:#02794B;">.com</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Structural Divider -->
            <tr>
              <td style="height:3px;background-color:#02794B;font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <!-- Core Content Container -->
            <tr>
              <td style="padding:32px 32px 40px;">
                <h1 style="margin:0 0 16px;color:#172B22;font-size:22px;line-height:1.3;font-weight:700;letter-spacing:-0.3px;">
                  ${title}
                </h1>
                
                <p style="margin:0 0 24px;color:#4A5751;font-size:14px;line-height:1.6;font-weight:400;">
                  ${leadText}
                </p>

                <!-- Secure One-Time Display Module -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F1F8F4;border:1px solid #DCEFE3;border-radius:12px;">
                  <tr>
                    <td align="center" style="padding:24px 16px;">
                      <p style="margin:0;color:#02794B;font-family:Consolas,Monaco,'Courier New',monospace;font-size:32px;font-weight:700;letter-spacing:8px;line-height:1.2;padding-left:8px;">
                        ${otp}
                      </p>
                      <p style="margin:8px 0 0;color:#68766F;font-size:12px;font-weight:500;letter-spacing:0.2px;">
                        Valid for 10 minutes
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0;color:#68766F;font-size:13px;line-height:1.5;">
                  <strong>Security notice:</strong> If you did not make this request, please disregard this transmission securely. Do not forward or expose this passcode to anyone.
                </p>
              </td>
            </tr>

            <!-- Footer Compliance Segment -->
            <tr>
              <td style="padding:20px 32px;background-color:#F9FBF9;border-top:1px solid #EDF1EE;">
                <p style="margin:0;color:#89958E;font-size:12px;line-height:1.4;">
                  &copy; ${currentYear} Oga.com. All systems protected.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;

  await sendEmail({ to, subject, text, html });
}
