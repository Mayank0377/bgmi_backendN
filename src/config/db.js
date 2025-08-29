import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`\n!! MONGO DB CONNECTED !! DB HOST : ${connectionInstance.connection.host}`)
    }catch (error) {
        console.error("Failed to connect", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDb;