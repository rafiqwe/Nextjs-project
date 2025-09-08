import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!

if(!MONGODB_URL){
    throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {connection: null, promise: null }
}

async function dbConnect(){
    if(cached.connection){
        return cached.connection
    }

    if(!cached.promise){
        const opts={
            bufferCommands: true,
            maxPoolSize: 10
        }
        mongoose
        .connect(MONGODB_URL, opts)
        .then(()=> mongoose.connection)
    }

    try {
        cached.connection = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw new Error("Failed to connect to MongoDB")
    }
}

export default dbConnect;