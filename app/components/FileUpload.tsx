"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";

interface FileUploadProps {
    onSuccess: (res: any) => void;
    onProgress?: (progress: number)=> void;
    fileType?: "image" | "video";
}

// FileUpload component demonstrates file uploading using ImageKit's Next.js SDK.
const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null); 

    const fileInputRef = useRef<HTMLInputElement>(null);

    const abortController = new AbortController();

    const validationFileType = (file: File) => {
        if (fileType === "video") {
            if(!file.type.startsWith('video/')){
                setError("Please select a valid video file.");
                return false;
            }
            if (file.size > 100 * 1024 * 1024) { // 100MB limit for videos
                setError("Video size should be less than 100MB.");
                return false;
            }
        }
    }

    const handleFileChange = async (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file || !validationFileType(file)) return;
        setError(null);
        setUploading(true);

        try {
            const res = await axios.get('/api/auth/imagekit-auth')
            const auth = res.data
            const { expire, token,signature} = auth.singature;
            const uploadResponse = await upload({
                // Authentication parameters
                fileName: file.name, 
                file,
                expire,
                token,
                signature,
                publicKey : process.env.NEXT_PUBLIC_URL_IMAGEKIT_ENDPOINT!,
                onProgress: (event) => {
                    if(event.lengthComputable && onProgress){
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent))
                    }
                }
            });

            onSuccess(uploadResponse);
        } catch (error) {
            console.log("Upload error:", error);
            setError("Upload failed. Please try again.");
        }finally{
            setUploading(false);
        }
    }
 
    return (
        <>
            <input type="file"
            accept={fileType === 'video' ? 'video/*' : 'image/*'}
            onChange={handleFileChange}
            />
           { error && <p className="text-red-500 mt-2">{error}</p> }
        </>
    );
};

export default FileUpload;