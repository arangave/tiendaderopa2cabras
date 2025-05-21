import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// ✅ Confirmación de registro
export async function sendVerificationEmail(to: string, name: string, token: string) {
  const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}`;

  const mailOptions = {
    from: `"2CabrasConTraje 🐐" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Confirma tu cuenta y únete a un mundo con cuernos',
    html: `
      <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #ffffff; border-radius: 16px; border: 1px solid #e0e0e0;">
        <div style="text-align: center;">
          <img src="${baseUrl}/images/Logo_pasteles_1.png" alt="Logo" width="65" style="margin-bottom: 20px;" />
          <h2 style="color: #333333;">¡Hola ${name}!</h2>
          <p style="color: #444; font-size: 16px;">
            Gracias por registrarte. Para activar tu cuenta, haz clic en el siguiente enlace:
          </p>
          <a href="${verifyUrl}" target="_blank" style="display: inline-block; margin-top: 20px; background: linear-gradient(to right, #67b2c1, #ff8eaa, #f6bd6b); color: #fff; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold;">
            Confirmar cuenta
          </a>
        </div>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #777; text-align: center;">
          Si no solicitaste esta cuenta, puedes <a href="${baseUrl}/unsubscribe?email=${encodeURIComponent(to)}" style="color: #67b2c1;">darte de baja aquí</a>.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// ✅ Recuperación de contraseña
export async function sendResetPasswordEmail(to: string, name: string, token: string) {
  const resetUrl = `${baseUrl}/recuperar/${token}`;

  const mailOptions = {
    from: `"2CabrasConTraje 🐐" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Restablecer contraseña de tu cuenta con cuernos',
    html: `
      <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #ffffff; border-radius: 16px; border: 1px solid #e0e0e0;">
        <div style="text-align: center;">
          <img src="${baseUrl}/images/Logo_pasteles_1.png" alt="Logo" width="65" style="margin-bottom: 20px;" />
          <h2 style="color: #333333;">Hola ${name},</h2>
          <p style="color: #444; font-size: 16px;">
            Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente botón para continuar:
          </p>
          <a href="${resetUrl}" target="_blank" style="display: inline-block; margin-top: 20px; background: linear-gradient(to right, #67b2c1, #ff8eaa, #f6bd6b); color: #fff; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold;">
            Restablecer contraseña
          </a>
          <p style="color: #888; font-size: 14px; margin-top: 20px;">
            Si tú no solicitaste este cambio, puedes ignorar este mensaje. Tu contraseña seguirá siendo la misma.
          </p>
        </div>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #777; text-align: center;">
          2CabrasConTraje – Moda para romper la norma 🐐
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
