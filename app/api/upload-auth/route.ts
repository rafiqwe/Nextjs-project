// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    try {
        const authenticationParametars = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
        })
    
        return Response.json({ authenticationParametars, publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY })
    } catch (error) {
        console.error("Error generating upload authentication parameters:", error)
        return Response.json({ error: "Failed to generate upload authentication parameters" }, { status: 500 })
    }
}