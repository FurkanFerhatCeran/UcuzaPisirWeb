import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip authentication for login and register routes
  if (pathname === '/api/auth/login' || pathname === '/api/auth/register') {
    return NextResponse.next();
  }
  
  // Check for API routes that need authentication
  if (pathname.startsWith('/api/')) {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const decodedToken = verifyToken(token);
    
    if (!decodedToken) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  }
  
  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
}; 