import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendResetPasswordEmail } from '@/utils/mailer';
import { generateToken } from '@/utils/token';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Falta el correo' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Este correo no está registrado' }, { status: 404 });
    }

    const token = generateToken({ id: user.id });

    await sendResetPasswordEmail(email, user.firstName, token);

    return NextResponse.json({
      message: 'Se ha enviado un email con instrucciones para restablecer tu contraseña',
    });
  } catch (error) {
    console.error('Error al solicitar recuperación:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
