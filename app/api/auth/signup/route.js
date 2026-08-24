import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/password';
import { createSessionResponse } from '@/lib/jwt';

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json({ success: false, message: 'All fields required' });
    }

    if (password.length < 6) {
      return Response.json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return Response.json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashPassword(password),
    });

    return createSessionResponse(
      {
        success: true,
        message: 'User created successfully',
        user: { id: user._id, name: user.name, email: user.email },
      },
      user
    );

  } catch (error) {
    console.error('Signup error details:', error);
    return Response.json({ 
      success: false, 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}