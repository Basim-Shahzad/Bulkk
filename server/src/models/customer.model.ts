import { Schema, model, models, Document, Types } from "mongoose";

export interface ICustomer extends Document {
   store: Types.ObjectId;
   name: string;
   phone?: string;
   email?: string;
}

const customerSchema = new Schema<ICustomer>(
   {
      store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
      name: { type: String, required: true, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, lowercase: true, trim: true },
   },
   { timestamps: true },
);

customerSchema.index({ store: 1, email: 1 }, { unique: true, sparse: true });

export const Customer = models.Customer || model<ICustomer>("Customer", customerSchema);
