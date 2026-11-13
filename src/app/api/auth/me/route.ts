import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('vanta_session');
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    const session = JSON.parse(sessionCookie.value);
    return NextResponse.json({
      authenticated: true,
      user: session.user,
      guilds: session.guilds || [],
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
