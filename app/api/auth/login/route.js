import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyPassword } from '@/lib/password';
import { createSessionResponse } from '@/lib/jwt';

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ success: false, message: 'Email and password required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !verifyPassword(password, user.password)) {
      return Response.json({ success: false, message: 'Incorrect email or password' });
    }

    return createSessionResponse(
      {
        success: true,
        message: 'Login successful',
        user: { id: user._id, name: user.name, email: user.email },
      },
      user
    );

  } catch (error) {
    console.error('Login error details:', error);
    return Response.json({ 
      success: false, 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}