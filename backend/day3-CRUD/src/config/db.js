let mongoose = require ( "mongoose");

let connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://oysm:oysm0000@cluster1.nbc9xwm.mongodb.net/");
        console.log("mongodb connected")
    } catch (error) {
        console.log("Error in the connecting MONGODB",error);
        
    }
}

module.exports = connectDb;