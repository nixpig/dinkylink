import { Request, Response } from "express";
import { CreateData, CreateError } from "./models";
export declare const createOne: (req: Request<{
    targetUrl: string;
}>, res: Response<CreateData | CreateError>) => Promise<Response<CreateData | CreateError, Record<string, any>>>;
