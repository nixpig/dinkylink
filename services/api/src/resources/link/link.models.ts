import { Schema, model } from "mongoose";

export interface LinkData {
  targetUrl: string;
  shortCode: string;
  active: boolean;
  clicks: number;
}

export interface LinkError {
  status: number;
  message?: string;
}

export const linkSchema = new Schema<LinkData>(
  {
    targetUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

linkSchema.index({ shortCode: 1 }, { unique: true });

export const Link = model<LinkData>("Link", linkSchema);
