import { Schema, model } from "mongoose";
import { publishLinkCreated } from "../../services/broker";
import { cache } from "../../services/cache";

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

createSchema.post("save", async function (doc) {
  cache.set(doc.shortCode, doc.targetUrl);

  publishLinkCreated(doc);
});

export const Create = model<CreateData>("Create", createSchema);
