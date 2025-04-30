import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Bu rotalar kimlik doğrulama gerektirmez (public routes)
const publicPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/example-db' // Veritabanı test rotası
];

export function middleware(request) {
  try {
    const { pathname } = request.nextUrl;
    
    // Sadece API rotalarına middleware uygula
    if (!pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    
    // Public API rotalarına izin ver
    if (publicPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.next();
    }
    
    // Authorization header'dan token al
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
    
    // Token yoksa veya Bearer token formatında değilse
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Kimlik doğrulama gerekli',
          error: 'Geçerli bir token bulunamadı'
        }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Token'ı ayıkla
    const token = authHeader.split(' ')[1];
    
    // Token doğrula
    const decodedToken = verifyToken(token);
    
    // Token geçersiz veya süresi dolmuşsa
    if (!decodedToken) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Geçersiz veya süresi dolmuş token',
          error: 'Token doğrulanamadı'
        }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // İsteğe kullanıcı bilgilerini ekle
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decodedToken.userId);
    if (decodedToken.email) {
      requestHeaders.set('x-user-email', decodedToken.email);
    }
    
    // Değiştirilmiş isteği döndür
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  } catch (error) {
    console.error('Middleware hatası:', error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Kimlik doğrulama sırasında bir hata oluştu',
        error: error.message
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Middleware'in hangi rotalara uygulanacağını yapılandır
export const config = {
  matcher: [
    '/api/:path*' // Tüm API rotalarına uygula
  ]
}; 