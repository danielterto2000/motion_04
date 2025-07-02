
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      userType?: string
      image?: string | null
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    userType?: string
    image?: string | null
  }

  interface JWT {
    userId?: string
    userType?: string
    rememberMe?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    userType?: string
    rememberMe?: boolean
  }
}
