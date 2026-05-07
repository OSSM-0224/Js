let mongoose = require ( "mongoose");


let connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected")
    } catch (error) {
        console.log("Error in the connecting MONGODB",error);
        
    }
}

module.exports = connectDb;