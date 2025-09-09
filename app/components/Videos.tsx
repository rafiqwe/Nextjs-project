import React from "react";
import Image from "next/image";
import muhammadrabbi from "@/public/muhammadrabbi.png";

import { Video } from '@imagekit/next';
interface VideosProps {
    width?: number;
    height?: number;
    src?: string;
    title:string;
    createBy: string;
}
const Videos = ({ width, height, src, title, createBy }: VideosProps) => {
  return (
    <div className="mt-10">
      <div className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer  ">
        <div className="relative w-full ">
           <Video
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
            src={ src ||"/video.mp4"}
            controls
            width={width || 500}
            height={height || 500}
            />
        </div>

        {/* Details */}
        <div className="pl-5">
          <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
            {title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            by {createBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Videos;
