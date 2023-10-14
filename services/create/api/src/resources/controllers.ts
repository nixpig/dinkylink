import { Request, Response } from "express";

import { generateUniqueShortCode } from "../utils";
import { CreateModel, CreateData, CreateError } from "./models";

export const createOne = async (
  req: Request<{ targetUrl: string }>,
  res: Response<CreateData | CreateError>
) => {
  let targetUrl: URL;
  let shortCode: string;

  try {
    targetUrl = new URL(req.body?.targetUrl);
  } catch (e) {
    console.error(
      `[create] failed to parse provided URL: ${JSON.stringify(targetUrl)}`
    );

    return res.status(500).send({
      message: `${e.input} does not appear to be a valid URL.`,
    });
  }

  let duplicates: CreateData[];
  do {
    shortCode = await generateUniqueShortCode();

    duplicates = await CreateModel.find({ shortCode }).exec();
  } while (duplicates.length > 0);

  try {
    const link = await CreateModel.create<CreateData>({
      targetUrl: targetUrl.href,
      active: true,
      shortCode,
    });

    return res.status(201).send(link);
  } catch (e) {
    return res.status(500).send(e);
  }
};
