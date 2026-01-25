import { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   role: "admin" | "staff";
   store: Types.ObjectId;
   isActive: boolean;
}

const userSchema = new Schema<IUser>(
   {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      password: { type: String, required: true, select: false },
      role: { type: String, enum: ["admin", "staff"], default: "staff" },
      store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
      isActive: { type: Boolean, default: true },
   },
   { timestamps: true },
);

userSchema.index({ email: 1, store: 1 }, { unique: true });

export const User = models.User || model<IUser>("User", userSchema);
