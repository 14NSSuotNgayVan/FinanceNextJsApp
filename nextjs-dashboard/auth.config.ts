import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard'));
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
        },
    },
    providers: [],
} satisfies NextAuthConfig;