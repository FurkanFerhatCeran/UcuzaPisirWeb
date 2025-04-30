import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/authUtils';

// Protected API route that requires authentication
export const GET = withAuth(async (request) => {
  // Get user ID from header set by middleware
  const userId = request.headers.get('x-user-id');
  const userEmail = request.headers.get('x-user-email');
  
  // Current datetime
  const now = new Date();
  
  return NextResponse.json({
    success: true,
    message: 'This is a protected API route',
    data: {
      userId,
      userEmail,
      timestamp: now.toISOString(),
      info: 'This route is protected by JWT authentication middleware'
    }
  });
}); 