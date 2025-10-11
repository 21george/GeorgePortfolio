import mongoose from "mongoose";

const connectionString = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL environment variable is not defined");
        }
        
        if (mongoose.connections[0].readyState) {
            console.log("Already connected to MongoDB");
            return;
        }
        
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        throw error; // Re-throw to handle in the API route
    }
}

export default connectionString