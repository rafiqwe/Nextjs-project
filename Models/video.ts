import mongoose, {Mongoose, Schema, model, models} from "mongoose";
import bcrypt from 'bcryptjs'

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
} as const 

export interface IVideo {
    title: string;
    description: string;
    user: mongoose.Types.ObjectId;
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    videoUrl: string;
    thumbnailUrl: string;
    controller?: boolean;
    tranformations?: {
        height: number;
        width: number;
        quality?:number; 
    }
}

const videoSchema = new Schema<IVideo>({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    videoUrl:{
        type: String,
        required: true,
    },
    thumbnailUrl:{
        type: String,
        required: true,
    },
    controller: {
        type: Boolean,
        default: true,
    },
    tranformations: {
        height: {
            type: Number,
            default: VIDEO_DIMENSIONS.height,
        },
        width: {
            type: Number,
            default: VIDEO_DIMENSIONS.width,
        },
        quality: {
            type: Number,
            min: 1,
            max: 100,   
        }
    }

},
{
    timestamps: true
}
)

const Video = models?.Video || model<IVideo>('Video', videoSchema);

export default Video;