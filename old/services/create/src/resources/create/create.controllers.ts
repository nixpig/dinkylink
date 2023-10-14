import crypto from "crypto";
import { Request, Response } from "express";

import { Create, CreateData, CreateError } from "./create.models";

export const createOne = async (
  req: Request<{ targetUrl: string }>,
  res: Response<CreateData | CreateError>
) => {
  let targetUrl: URL;

  try {
    targetUrl = new URL(req.body?.targetUrl);
  } catch (error) {
    console.error(
      `[create] failed to parse provided URL: ${JSON.stringify(
        targetUrl,
        null,
        2
      )}`
    );
    return res.status(500).send({
      message: `${error.input} does not appear to be a valid URL. Please check and try again.`,
    });
  }

  const generateUniqueShortCode = async () => {
    const shortCode = crypto.randomBytes(3).toString("hex").slice(0, 5);
    const duplicates = await Create.find({ shortCode: shortCode }).exec();

    if (duplicates.length > 0) {
      await generateUniqueShortCode();
    } else {
      return shortCode;
    }
  };

  const shortCode = await generateUniqueShortCode();

  try {
    const link = await Create.create<CreateData>({
      targetUrl: targetUrl.href,
      shortCode: shortCode,
      active: true,
    });

    return res.status(201).send(link);
  } catch (error: any) {
    return res.status(500).send({ message: `${error?.message}` });
  }
};
