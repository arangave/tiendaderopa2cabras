import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const SITE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  if (!email) {
    return NextResponse.redirect(`${SITE_URL}/inicio?unsubscribed=0`);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.newsletter) {
    await prisma.user.update({
      where: { email },
      data: { newsletter: false },
    });
    return NextResponse.redirect(`${SITE_URL}/inicio?unsubscribed=1`);
  }

  const sub = await prisma.subscriber.findUnique({ where: { email } });
  if (sub) {
    await prisma.subscriber.delete({ where: { email } });
    return NextResponse.redirect(`${SITE_URL}/inicio?unsubscribed=1`);
  }

  return NextResponse.redirect(`${SITE_URL}/inicio?unsubscribed=0`);
}
