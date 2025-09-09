import dbConnect from "@/lib/db";
import User from "@/Models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const {email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json({message: "Email and password are required"}, {status: 400})
        }
        await dbConnect();
        const exsitingUser = await User.findOne({email});
        if(exsitingUser){
            return NextResponse.json({message: "User already exsits"}, {status: 400})
        }
        console.log('password:', password);
        
        const newUser = await User.create({
            email,
            password
        })
        console.log("newUser:", newUser);
        
        return NextResponse.json(
            {
                message: "User created successfully",
                user: newUser
            }, 
            {
                status: 201
            }
        )
    }
    catch(error){
        console.log("register error", error)
        return NextResponse.json(
            {error: "Failed to register user"},
            {status: 400}
        )
    }
}



