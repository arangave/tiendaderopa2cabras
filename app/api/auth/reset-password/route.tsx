import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/utils/token';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const payload = verifyToken(token) as { id: number } | null;

    if (!payload?.id) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: payload.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
