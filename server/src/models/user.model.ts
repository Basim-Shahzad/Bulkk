import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Username is Required'],
      trim: true,
      minLength: 2,
      maxLength: 50,
   },
   email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
      match: [/\S+@\S+\.\S+/, 'Please Enter a valid Email']
   },
   password: {
      type: String,
      required: [true, 'Password is Required'],
      minLength: 8,
   }
}, { timestamps: true });


const User = models.User || model("User", userSchema);
export default User;