import { NextResponse } from 'next/server';
import { createSharedPrediction, getSharedState } from '../../lib/supabaseServer';
import { Prediction } from '../../lib/types';

export async function POST(request: Request) {
  try {
    const prediction = await request.json() as Omit<Prediction, 'id' | 'submittedAt'>;
    const { admin, predictions } = await getSharedState();

    if (admin.locked) {
      return NextResponse.json({ ok: false, message: 'Predictions are currently locked.' }, { status: 409 });
    }
    if (predictions.some((item) => item.email.toLowerCase() === prediction.email.toLowerCase())) {
      return NextResponse.json({ ok: false, message: 'Only one entry per work email is allowed.' }, { status: 409 });
    }
    if (predictions.some((item) => item.winner === prediction.winner)) {
      return NextResponse.json({ ok: false, message: `${prediction.winner} has already been chosen. Please pick another team.` }, { status: 409 });
    }

    const created = await createSharedPrediction(prediction);
    return NextResponse.json({ ok: true, message: 'Prediction submitted!', prediction: created });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : 'Unable to submit prediction.' }, { status: 500 });
  }
}
