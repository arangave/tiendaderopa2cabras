import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/token';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  try {
    const payload = verifyToken(token);
    const { id } = payload as jwt.JwtPayload;
    const userId = id as number;

    // Marcar usuario como verificado
    await prisma.user.update({
      where: { id: userId },
      data: { verified: true },
    });

    // Redirigir al login (usando base URL configurable)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/registro`);
  } catch (err) {
    console.error('Invalid or expired token', err);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }
}
