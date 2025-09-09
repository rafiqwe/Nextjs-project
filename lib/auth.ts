import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./db";
import User from "@/Models/user";
import bcrypt from "bcryptjs";

export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text"
                },
                password:{
                    label: "password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                // Add your own logic here to find the user
                
                if(!credentials?.email || !credentials?.password){
                     throw new Error( "Missing email or password")
                }
                try {

                    await dbConnect();
                    const user = await User.findOne({email: credentials.email})
                    if (!user) {
                        throw new Error("User not found")
                    }
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password)

                    if (!isValidPassword) {
                        throw new Error("Invalid password")
                    }

                    return { id: user._id, name: user.name, email: user.email }

                } catch (error) {
                    throw new Error("Error authorizing user")
                }
            }
        })
    ],
    callbacks: {
        async jwt({token,user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session, token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        },
    },
    pages:{
        signIn: "/signin",
        error: "/signin"
    },
    session:{
        strategy: "jwt",
        maxAge: 30*24*60*60 // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET
}
