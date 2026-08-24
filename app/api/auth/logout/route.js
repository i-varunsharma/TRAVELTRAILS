import { NextResponse } from 'next/server';

// Logging out means deleting the session cookie server-side — it's httpOnly,
// so client-side JavaScript has no way to clear it itself.
export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('token');
  return response;
}
