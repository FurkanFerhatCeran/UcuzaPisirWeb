import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import connectDB from '@/lib/db';

/**
 * Gets the authenticated user from the request
 * This assumes the middleware has already verified the token
 * and set the user ID in the headers
 * 
 * @param {Request} request - Next.js request object
 * @param {boolean} includePassword - Whether to include hashed password in the response
 * @returns {Promise<object>} - The user object or null
 */
export async function getAuthenticatedUser(request, includePassword = false) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return null;
    }
    
    await connectDB();
    
    // Select fields based on whether password should be included
    const selectFields = includePassword ? '' : '-hashedPassword';
    
    const user = await User.findById(userId).select(selectFields);
    return user;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    return null;
  }
}

/**
 * Middleware function for route handlers to require authentication
 * @param {Function} handler - The route handler function
 * @returns {Function} - Wrapped handler function with auth check
 */
export function withAuth(handler) {
  return async function(request, ...args) {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return handler(request, ...args);
  };
} 