import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import crypto from 'crypto';

export async function POST(request) {
  try {
    console.log('Login API called');
    await connectDB();
    console.log('DB connected for login');
    
    const { email, password } = await request.json();
    console.log('Login attempt for:', email);

    if (!email || !password) {
      return Response.json({ success: false, message: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return Response.json({ success: false, message: 'User not found' });
    }

    console.log('User found, checking password');
    
    // Check if password is hashed (contains :) or plain text
    let isValidPassword = false;
    
    if (user.password.includes(':')) {
      // Hashed password
      const [salt, hash] = user.password.split(':');
      const candidateHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      isValidPassword = hash === candidateHash;
    } else {
      // Plain text password (for old users)
      isValidPassword = user.password === password;
    }
    
    if (!isValidPassword) {
      return Response.json({ success: false, message: 'Wrong password' });
    }

    console.log('Login successful');
    return Response.json({
      success: true,
      message: 'Login successful',
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }
    });

  } catch (error) {
    console.error('Login error details:', error);
    return Response.json({ 
      success: false, 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}