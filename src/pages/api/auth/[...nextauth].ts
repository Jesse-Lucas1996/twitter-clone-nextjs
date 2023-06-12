import { randomUUID, randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

interface CustomSession extends Session {
  accessToken?: string;
}

const googleClientId = process.env.GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET!;

if (!googleClientId || !googleClientSecret) {
  throw new Error('Google client ID or client secret is missing.');
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  session: {
    strategy: 'jwt',
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      const customSession: CustomSession = session;
      customSession.accessToken = token.accessToken as string;
      token.accessToken as string;
      return customSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

const NextAuthHandler =  NextAuth(authOptions);

export default NextAuthHandler;
