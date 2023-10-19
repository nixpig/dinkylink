import { Schema, model } from "mongoose";
import { publishLinkCreated } from "../services/bus";

export interface CreateData {
  targetUrl: string;
  shortCode: string;
  active: boolean;
}

export interface CreateError {
  message?: string;
}

export const createSchema = new Schema<CreateData>(
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
  },
  { timestamps: true }
);

createSchema.post("save", async (res) => {
  publishLinkCreated(res);
});

export const CreateModel = model<CreateData>("Create", createSchema, "links");
