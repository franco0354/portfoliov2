import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  
  // Redirect from vercel.app to custom domain
  if (hostname?.includes('vercel.app')) {
    const url = request.nextUrl.clone();
    url.host = 'francogregorio.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
