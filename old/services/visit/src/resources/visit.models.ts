import { Schema, model } from "mongoose";

export interface VisitData {
  targetUrl: string;
  shortCode: string;
  active: boolean;
}

export interface VisitError {
  message: string;
}

export const visitSchema = new Schema<VisitData>(
  {
    targetUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Visit = model<VisitData>("Visit", visitSchema);
