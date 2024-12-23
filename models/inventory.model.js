import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    inventoryType: { type: String, required: true },
    inventoryName: { type: String, required: true },
    brandName: { type: String, required: false },
    stockLevel: { type: String, required: true },
    unit: { type: String, required: false },
    centerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
}, { timestamps: true });

export const Inventory = mongoose.model("Inventory", inventorySchema);
