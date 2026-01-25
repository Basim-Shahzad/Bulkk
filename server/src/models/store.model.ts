import { Schema, model, models, Document, Types } from "mongoose";

export interface IStore extends Document {
   name: string;
   email: string;
   phone?: string;
   currency: string;
   isActive: boolean;
   owner: Types.ObjectId;
}

const storeSchema = new Schema<IStore>(
   {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String },
      currency: { type: String, default: "USD", uppercase: true },
      isActive: { type: Boolean, default: true },
      owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
   },
   { timestamps: true },
);

storeSchema.index({ owner: 1 });
storeSchema.index({ email: 1 }, { unique: true });

export const Store = models.Store || model<IStore>("Store", storeSchema);
