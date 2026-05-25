import { NextResponse } from 'next/server';
import { isAdminRequest } from '../../lib/adminAuth';
import { saveSharedAdmin } from '../../lib/supabaseServer';
import { AdminState } from '../../lib/types';

export async function PUT(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    const admin = await request.json() as AdminState;
    return NextResponse.json({ admin: await saveSharedAdmin(admin) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save admin state.' }, { status: 500 });
  }
}
