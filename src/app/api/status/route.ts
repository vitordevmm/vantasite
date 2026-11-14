import { NextResponse } from 'next/server';
import { getBotStatus } from '@/lib/status';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = await getBotStatus();

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Telemetria do bot indisponível no Firestore',
          data: null,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: status,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro interno ao consultar telemetria',
        data: null,
      },
      { status: 500 }
    );
  }
}
