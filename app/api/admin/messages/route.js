import connectDB from '@/lib/server/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { getSessionUser } from '@/lib/server/getSessionUser';

export async function GET() {
  const sessionUser = await getSessionUser();
  if (sessionUser?.role !== 'admin') {
    return Response.json({ success: false, message: 'Admins only' }, { status: 403 });
  }

  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 });

  return Response.json({ success: true, messages });
}
