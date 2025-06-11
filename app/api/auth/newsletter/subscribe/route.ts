import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      if (user.newsletter) {
        return NextResponse.json({ message: "Ya estás suscrito a la newsletter." });
      }
      await prisma.user.update({
        where: { email },
        data: { newsletter: true },
      });
      await sendWelcomeEmail(email);
      return NextResponse.json({ message: "¡Te has suscrito correctamente!" });
    }

    const sub = await prisma.subscriber.findUnique({ where: { email } });
    if (sub) {
      return NextResponse.json({ message: "Ya estás suscrito a la newsletter." });
    }

    await prisma.subscriber.create({ data: { email } });
    await sendWelcomeEmail(email);

    return NextResponse.json({ message: "¡Te has suscrito correctamente!" });
  } catch (error) {
    console.error("Error en subscribe:", error);
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}

async function sendWelcomeEmail(email: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const urlUnsubscribe = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`;


    await transporter.sendMail({
      from: `"2CabrasConTraje" <${process.env.SMTP_USER}>`,
      replyTo: process.env.SMTP_USER,
      to: email,
      subject: "¡Bienvenido a la newsletter de 2CabrasConTraje! 🐐",
      html: `
        <h2>¡Hola!</h2>
        <p>Gracias por unirte a nuestra newsletter. 🐐</p>
        <p>Recibirás novedades, promos y mucho más. Si algún día no quieres seguir, puedes <a href="${urlUnsubscribe}">darte de baja aquí</a>.</p>
        <p>¡Bienvenido/a al rebaño más exclusivo!</p>
        <p style="color:#aaa;font-size:12px">Si no te has suscrito tú, ignora este email.</p>
      `,
    });
  } catch (error) {
    console.error("Error enviando el correo de bienvenida:", error);
    throw error;
  }
}
