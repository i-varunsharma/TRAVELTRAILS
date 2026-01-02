import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import crypto from 'crypto';

export async function POST(request) {
  try {
    console.log('Signup API called');
    await connectDB();
    console.log('DB connected');
    
    const { name, email, password } = await request.json();
    console.log('Request data:', { name, email, passwordLength: password?.length });

    if (!name || !email || !password) {
      return Response.json({ success: false, message: 'All fields required' });
    }

    if (password.length < 6) {
      return Response.json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return Response.json({ success: false, message: 'User already exists with this email' });
    }

    // Hash password using crypto
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const hashedPassword = `${salt}:${hash}`;

    // Create user with hashed password
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashedPassword
    });

    console.log('User created successfully');
    return Response.json({
      success: true,
      message: 'User created successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Signup error details:', error);
    return Response.json({ 
      success: false, 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}