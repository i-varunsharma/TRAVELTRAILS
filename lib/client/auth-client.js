'use client';

// The session cookie is httpOnly (JavaScript can't read it, only the
// server can), so the browser has to ask the server who's logged in
// instead of checking a cookie directly.

// Returns the logged-in user's { id, name, email, role }, or null.
export async function fetchCurrentUser() {
  const res = await fetch('/api/auth/me');
  const data = await res.json();
  return data.user;
}

export async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' });
}
