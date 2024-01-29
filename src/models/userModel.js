import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },  

});

// Create the User model
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
