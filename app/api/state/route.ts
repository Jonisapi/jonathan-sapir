import { NextResponse } from 'next/server';
import { getSharedState } from '../../lib/supabaseServer';

export async function GET() {
  try {
    return NextResponse.json(await getSharedState());
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load state.' }, { status: 500 });
  }
}
