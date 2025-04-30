import { NextResponse } from 'next/server';
import { getAuthenticatedUser, withAuth } from '@/lib/authUtils';

export const GET = withAuth(async (request) => {
  try {
    // Get user from the request
    const user = await getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
    
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user data', error: error.message },
      { status: 500 }
    );
  }
}); 