import { getSessionUser } from '@/lib/server/getSessionUser';

// "Who am I?" — the client calls this to find out if there's a logged-in
// user, since the session cookie is httpOnly and can't be read directly
// from the browser's JavaScript.
export async function GET() {
  const user = await getSessionUser();
  return Response.json({ user });
}
