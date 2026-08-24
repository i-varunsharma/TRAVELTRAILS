import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

// Server-side helper for API routes: reads the "token" cookie and returns
// the logged-in user's { id, name, email, role }, or null if not logged in.
export async function getSessionUser() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
