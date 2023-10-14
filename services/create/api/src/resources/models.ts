import { Schema, model } from "mongoose";

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

createSchema.post("save", async () => {
  // TODO: Set in cache
  // TODO: Publish to event channel
});

export const CreateModel = model<CreateData>("Create", createSchema);
