import jwt from 'jsonwebtoken';

// JWT secret key - should be in environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Verify and decode JWT token
 * @param {string} token - The JWT token to verify
 * @returns {object|null} - Decoded token payload or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return null;
  }
}

/**
 * Generate a JWT token
 * @param {object} payload - Data to encode in the token
 * @param {string} expiresIn - Token expiration time
 * @returns {string} - The generated JWT token
 */
export function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Get authenticated user from request
 * @param {Request} request - Next.js request object
 * @returns {object|null} - User data or null if not authenticated
 */
export async function getAuthUser(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    return decoded;
  } catch (error) {
    console.error('Auth error:', error.message);
    return null;
  }
} 