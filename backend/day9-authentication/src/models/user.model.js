const { default: mongoose } = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    mobile: {
      type: String,
      minlength: 10,
      maxlength: 10,
      required: [true, "Mobile is required"],
    },
  },
  {timestamps:true},
);
let UserModel = mongoose.model('users', userSchema);

module.exports = UserModel
