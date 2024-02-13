import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Dave"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "nextauth"
                }
            },
            async authorize(credentials) {
                console.log("autorizando")
                console.log(credentials)
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "Dave", password: "nextauth" }
                // return user
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    console.log("autorizadisimo")
                    return user
                } else {
                    console.log("cago")
                    return null
                }
            }
        })
    ], 
    pages: {
        signIn: '/auth',
        error: '/auth/error',
    },
    jwt: {
        // secret: process.env.JWT_SECRET_SEED, // deprecated
    },
    session: {
    maxAge: 2592000,//30d
    strategy: 'jwt',
    updateAge: 86400//cada dia
    }    
}

export default NextAuth(options)