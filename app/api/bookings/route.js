import connectDB from '@/lib/server/mongodb';
import Booking from '@/models/Booking';
import { getSessionUser } from '@/lib/server/getSessionUser';

export async function POST(request) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return Response.json({ success: false, message: 'You must be logged in to book a trek' }, { status: 401 });
    }

    await connectDB();

    const { stateName, trekName, date, people, contactName, whatsapp } = await request.json();

    if (!stateName || !trekName || !date || !people || !contactName || !whatsapp) {
      return Response.json({ success: false, message: 'All fields required' });
    }

    if (Number(people) <= 0) {
      return Response.json({ success: false, message: 'Number of people must be greater than 0' });
    }

    await Booking.create({
      userId: sessionUser.id,
      userName: sessionUser.name,
      userEmail: sessionUser.email,
      stateName,
      trekName,
      date,
      people: Number(people),
      contactName: contactName.trim(),
      whatsapp: whatsapp.trim()
    });

    return Response.json({ success: true, message: 'Booking submitted' });

  } catch (error) {
    console.error('Booking error:', error);
    return Response.json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
