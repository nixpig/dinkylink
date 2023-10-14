import { Request, Response } from "express";
export declare const visit: (req: Request<{
    shortCode: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
