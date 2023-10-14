import mongoose from "mongoose";
export declare const database: {
    connect: () => Promise<typeof mongoose>;
    disconnect: () => Promise<void>;
};
