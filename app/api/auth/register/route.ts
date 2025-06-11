import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/utils/mailer';
import { generateToken } from '@/utils/token';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      firstName,
      lastName1,
      lastName2,
      password,
    }: {
      email: string;
      firstName: string;
      lastName1: string;
      lastName2: string;
      password: string;
    } = body;

    if (!email || !firstName || !lastName1 || !lastName2 || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName1,
        lastName2,
      },
    });

    const token = generateToken({ id: newUser.id });

    await sendVerificationEmail(email, firstName, token);

    return NextResponse.json({
      message: 'Usuario registrado correctamente. Por favor, revisa tu bandeja de entrada para confirmar tu cuenta.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
