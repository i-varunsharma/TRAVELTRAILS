import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import crypto from 'crypto';

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

    return Response.json({
      success: true,
      message: 'User created successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return Response.json({ success: false, message: 'Something went wrong. Please try again.' });
  }
}