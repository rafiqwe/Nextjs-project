import { Session } from './../../../node_modules/next-auth/core/types.d';
import dbConnect from "@/lib/db";
import Video, { IVideo } from "@/Models/video";
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    try {
        await dbConnect();
        const videos = await Video.find().sort({createdAt: -1});

        if(!videos || videos.length === 0){
            return NextResponse.json({message: "No videos found"}, {status: 404})
        }
        return NextResponse.json({videos}, {status: 200})
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}

export async function POST(request: NextRequest){
    try {
        const session = await getServerSession() as Session;
        if(!session) return NextResponse.json({message: 'Unauthorized'}, {status: 401})
        dbConnect();
        // const {title, description, videoUrl, thumbnailUrl} = await request.json();

        const body: IVideo = await request.json();
        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
            return NextResponse.json({message: "All fields are required"}, {status: 400})
        }

        const videoData = {
            ...body,
            controller: body?.controller ?? true,
            tranformations:{
                height: 1920,
                width: 1080,
                quality: body?.tranformations?.quality ?? 100,
            }
        }
        const newVideo = await Video.create({
            ...videoData,
            user: session.user.id
        })
        return NextResponse.json({message: "Video uploaded successfully", video: newVideo}, {status: 201})
    } catch (error) {
        
    }
}