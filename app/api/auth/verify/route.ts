import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/token';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/registro?verified=0`);
  }

  try {
    const payload = verifyToken(token);
    const { id } = payload as jwt.JwtPayload;

    await prisma.user.update({
      where: { id: id as number },
      data: { verified: true },
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/registro?verified=1`);
  } catch (err) {
    console.error('Token inválido o expirado:', err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/registro?verified=0`);
  }
}
