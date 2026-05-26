let userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim : true,
    },
    email:{
        type : String,
        trim: true,
        unique : [true, "email should be unique"],
        require: [true, "email is required"],
    }
})