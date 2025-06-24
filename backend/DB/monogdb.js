import mongoose from 'mongoose';

export const connectDB = async () =>{

    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        const instance = await mongoose.connect(MONGODB_URI);

        console.log('mongodb connected successfully ');
    } catch (error) {
        console.log(error);
    }
}