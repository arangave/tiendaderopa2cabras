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

export async function sendVerificationEmail(to: string, name: string) {
  const loginUrl = `https://2cabrascontraje.com/registro`; // ⚠️ Usa la URL real de tu login

  const mailOptions = {
    from: `"2CabrasConTraje 🐐" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Confirma tu cuenta y únete al rebaño 🐐',
html: `
  <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #ffffff; border-radius: 16px; border: 1px solid #e0e0e0;">
    <div style="text-align: center;">
      <img src="https://2cabrascontraje.com/images/Logo_pasteles_1.png" alt="Logo" width="65" style="margin-bottom: 20px;" />
      <h2 style="color: #333333;">¡Bienvenido/a, ${name}!</h2>
      <p style="color: #444; font-size: 16px;">
        Tu cuenta ha sido creada. ¡Estás a un solo clic de explorar tus artículos favoritos!
      </p>
      <a href="${loginUrl}" target="_blank" style="display: inline-block; margin-top: 20px; background: linear-gradient(to right, #67b2c1, #ff8eaa, #f6bd6b); color: #fff; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold;">
        Ir a Mi Cuenta
      </a>
    </div>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #777; text-align: center;">
      Si no creaste esta cuenta, puedes <a href="https://2cabrascontraje.com/unsubscribe?email=${encodeURIComponent(to)}" style="color: #67b2c1;">darte de baja aquí</a>.
    </p>
  </div>
`,
  };

  await transporter.sendMail(mailOptions);
}
