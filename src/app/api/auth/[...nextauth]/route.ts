import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { sendRequest } from "@/utils/api";
import { url } from "inspector";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.NO_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            // Persist the OAuth access_token to the token right after signin
            if (trigger === "signIn") {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: "http://localhost:8000/api/v1/auth/social-media",
                    method: "POST",
                    body: {
                        type: "GITHUB",
                        username: user.email,
                    },
                });
                if (res.data) {
                    token = res.data;
                    return token;
                }
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.user = token.user;

                return session;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
