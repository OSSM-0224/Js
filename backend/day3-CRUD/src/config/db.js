let mongoose = require ( "mongoose");

let connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/kodex");
        console.log("mongodb connected")
    } catch (error) {
        console.log("Error in the connecting MONGODB",error);
        
    }
}

module.exports = connectDb;