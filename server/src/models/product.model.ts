import { Schema, model, models, Document, Types } from "mongoose";

export interface IProduct extends Document {
   store: Types.ObjectId;
   name: string;
   category: string;
   price: number;
   quantity: number;
}

const productSchema = new Schema<IProduct>(
   {
      store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
      name: { type: String, required: true, trim: true },
      category: { type: String, required: true, trim: true },
      price: { type: Number, required: true, min: 0 },
      quantity: { type: Number, default: 0, min: 0 },
   },
   { timestamps: true },
);

productSchema.index({ store: 1, name: 1 }, { unique: true });
productSchema.index({ store: 1, category: 1 });

export const Product = models.Product || model<IProduct>("Product", productSchema);
