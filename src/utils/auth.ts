import type { APIRoute } from 'astro';

export interface AuthUser {
  id: string;
  email: string;
}

export async function verifyAuth(request: Request): Promise<AuthUser | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const identityUrl = import.meta.env.NETLIFY_IDENTITY_URL || `https://${import.meta.env.SITE_URL}/.netlify/identity`;
    const response = await fetch(`${identityUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    const user = await response.json();
    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
}

export function withAuth(handler: APIRoute): APIRoute {
  return async (context) => {
    const user = await verifyAuth(context.request);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized - Please log in' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    (context as any).locals = { ...(context as any).locals, user };
    return handler(context);
  };
}

export async function getCurrentUser() {
  return null; // extend later
}
