import connectDB from '@/lib/server/mongodb';
import ContactMessage from '@/models/ContactMessage';

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ success: false, message: 'All fields required' });
    }

    await ContactMessage.create({ name: name.trim(), email: email.toLowerCase().trim(), message: message.trim() });

    return Response.json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
