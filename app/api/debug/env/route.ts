import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const rawUrl = process.env.SUPABASE_URL?.trim() ?? '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? '';
  let parsedHost = '';
  let urlLooksValid = false;

  try {
    const parsedUrl = new URL(rawUrl);
    parsedHost = parsedUrl.hostname;
    urlLooksValid = parsedUrl.protocol === 'https:' && parsedUrl.hostname.endsWith('.supabase.co');
  } catch {
    parsedHost = 'invalid-url';
  }

  return NextResponse.json({
    hasSupabaseUrl: Boolean(rawUrl),
    supabaseHost: parsedHost,
    supabaseUrlLooksValid: urlLooksValid,
    hasServiceRoleKey: Boolean(serviceKey),
    serviceRoleKeyLength: serviceKey.length,
    adminPasscodeConfigured: Boolean(process.env.ADMIN_PASSCODE)
  });
}
