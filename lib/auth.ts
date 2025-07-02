
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('E-mail e senha são obrigatórios')
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase()
            }
          })

          if (!user || !user.password) {
            throw new Error('Usuário não encontrado')
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error('Senha incorreta')
          }

          // Log da tentativa de login bem-sucedida
          await prisma.loginAttempt.create({
            data: {
              email: credentials.email.toLowerCase(),
              success: true,
              ipAddress: '', // Implementar captura de IP se necessário
              userAgent: '', // Implementar captura de User Agent se necessário
            }
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            userType: user.userType,
          }
        } catch (error) {
          // Log da tentativa de login falhada
          await prisma.loginAttempt.create({
            data: {
              email: credentials.email.toLowerCase(),
              success: false,
              ipAddress: '', // Implementar captura de IP se necessário
              userAgent: '', // Implementar captura de User Agent se necessário
            }
          })

          throw error
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userType = user.userType
        token.userId = user.id
      }
      
      // Estender sessão se "lembrar-me" estiver ativo
      if (account?.provider === 'credentials') {
        token.rememberMe = true
      }
      
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string || token.sub || ''
        session.user.userType = token.userType as string || ''
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Permitir login para todos os provedores configurados
      return true
    },
    async redirect({ url, baseUrl }) {
      // Redirecionar para dashboard após login bem-sucedido
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return '/dashboard'
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Log de eventos de login
      console.log(`User ${user.email} signed in with ${account?.provider}`)
    },
    async signOut({ session, token }) {
      // Log de eventos de logout
      console.log(`User signed out`)
    }
  },
  debug: process.env.NODE_ENV === 'development',
}
