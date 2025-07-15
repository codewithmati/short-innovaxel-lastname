import mongoose from "mongoose";

const ShortUrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  accessCount: { type: Number, default: 0 },
}, { timestamps: true });

export const ShortUrl = mongoose.models.ShortUrl || mongoose.model("ShortUrl", ShortUrlSchema);