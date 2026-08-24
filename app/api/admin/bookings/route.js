import connectDB from '@/lib/server/mongodb';
import Booking from '@/models/Booking';
import { getSessionUser } from '@/lib/server/getSessionUser';

export async function GET() {
  const sessionUser = await getSessionUser();
  if (sessionUser?.role !== 'admin') {
    return Response.json({ success: false, message: 'Admins only' }, { status: 403 });
  }

  await connectDB();
  const bookings = await Booking.find().sort({ createdAt: -1 });

  return Response.json({ success: true, bookings });
}
