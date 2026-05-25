import { NextResponse } from 'next/server';
import { isAdminRequest } from '../../../lib/adminAuth';
import { deleteSharedPrediction, updateSharedPrediction } from '../../../lib/supabaseServer';
import { Prediction } from '../../../lib/types';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    const { id } = await context.params;
    const changes = await request.json() as Partial<Omit<Prediction, 'id' | 'submittedAt'>>;
    const prediction = await updateSharedPrediction(id, changes);
    return NextResponse.json({ prediction });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update prediction.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    if (!isAdminRequest(_request)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    const { id } = await context.params;
    await deleteSharedPrediction(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to delete prediction.' }, { status: 500 });
  }
}
