// Importing from these specific paths (rather than the top-level "jose"
// package) keeps out unrelated encryption code that Next.js otherwise warns
// isn't supported in the Edge Runtime middleware.js runs in.
import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';
import { NextResponse } from 'next/server';

// jose (not jsonwebtoken) because it works in both Node.js API routes and
// the Edge runtime that middleware.js runs in.
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const SESSION_COOKIE = 'token';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Creates a signed token that proves who a user is, valid for 7 days.
export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

// Checks a token's signature and expiry. Returns the payload if valid, or
// null if the token is missing, expired, or tampered with.
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

// Builds a JSON response that also logs the user in, by attaching a signed
// session token as an httpOnly cookie (JS on the page can't read or forge
// it, only the server can). Used by both the login and signup routes so
// there's a single place that decides how sessions get created.
export async function createSessionResponse(body, user) {
  const token = await signToken({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json(body);
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
