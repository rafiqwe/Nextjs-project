import mongoose, {Mongoose, Schema, model, models} from "mongoose";
import bcrypt from 'bcryptjs'


export interface Iuser {
    email: string;
    password:string;
    _id: mongoose.Types.ObjectId;
    cheatedAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<Iuser>({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
},
{
    timestamps: true,
}
)

userSchema.pre('save', async function(next){
    if(this.password && this.isModified('password')){
        console.log("hashing password before saving to db", this)
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = models?.User || model<Iuser>('User', userSchema)

export default User