import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Desconectado com sucesso' });
  response.cookies.delete('vanta_session');
  return response;
}
