import { Schema, model, models, Document, Types } from "mongoose";

interface ISaleItem {
   product: Types.ObjectId;
   quantity: number;
   unitPrice: number;
}

export interface ISale extends Document {
   store: Types.ObjectId;
   customer?: Types.ObjectId;
   items: ISaleItem[];
   totalAmount: number;
   soldBy: Types.ObjectId;
}

const saleItemSchema = new Schema<ISaleItem>({
   product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
   quantity: { type: Number, min: 1, required: true },
   unitPrice: { type: Number, min: 0, required: true },
});

const saleSchema = new Schema<ISale>(
   {
      store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
      customer: { type: Schema.Types.ObjectId, ref: "Customer" },
      items: { type: [saleItemSchema], required: true },
      totalAmount: { type: Number, min: 0 },
      soldBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
   },
   { timestamps: true },
);

saleSchema.pre("validate", function (next) {
   this.totalAmount = this.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
   next();
});

saleSchema.index({ store: 1, createdAt: -1 });

export const Sale = models.Sale || model<ISale>("Sale", saleSchema);
