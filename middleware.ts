
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth(
  function middleware(req: NextRequest) {
    // Capturar informações para logs de segurança
    const ip = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'
    
    // Adicionar headers para uso nas APIs
    const response = NextResponse.next()
    response.headers.set('x-client-ip', ip)
    response.headers.set('x-user-agent', userAgent)
    
    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acesso a páginas de autenticação
        if (req.nextUrl.pathname.startsWith('/auth/')) {
          return true
        }
        
        // Protect admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.userType === 'ADMIN'
        }
        
        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/auth/:path*',
    '/api/auth/:path*'
  ]
}
