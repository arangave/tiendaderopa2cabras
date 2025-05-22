import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/utils/token';
import { sendResetPasswordEmail } from '@/utils/mailer';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({
        error: 'No existe ninguna cuenta con ese correo electrónico.',
      }, { status: 404 });
    }

    const token = generateToken({ id: user.id });
    const expiryDate = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: expiryDate,
      },
    });

    await sendResetPasswordEmail(email, user.firstName, token);

    return NextResponse.json({
      message: '✅ Te hemos enviado un correo para recuperar tu contraseña.',
    });
  } catch (error) {
    console.error("Error forgot-password:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
