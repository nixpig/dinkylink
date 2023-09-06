import crypto from "crypto";
import { Request, Response } from "express";

import { UI_HOST } from "../../environment";

import { Link, LinkData, LinkError } from "./link.models";

import { client } from "../../services/cache";

export const baseRedirect = async (
  req: Request,
  res: Response<LinkData[] | LinkError>
) => {
  try {
    res.set("location", `https://${UI_HOST}/`);
    return res.status(301).send();
  } catch (error: any) {
    return res.status(500).send({ status: 500, message: error?.message });
  }
};

export const shortRedirect = async (
  req: Request,
  res: Response<LinkData | LinkError>
) => {
  const shortCode = req.params?.shortCode;
  if (!shortCode) {
    return res
      .status(500)
      .send({ status: 500, message: `Invalid shortcode: ${shortCode}` });
  }

  try {
    const cachedResult = await client.get(shortCode);

    if (cachedResult) {
      console.log(`📝 [api] record fetched from cache`);
      res.set("location", cachedResult);
      return res.status(301).send();
    }

    const redirect = await Link.findOne(
      { shortCode: shortCode },
      { targetUrl: 1 }
    ).exec();

    console.log(`🗄️ [api] record fetched from database`);

    if (redirect.targetUrl) {
      /* TODO: Capture click and save to DB/pub to stream */
      client.set(shortCode, redirect.targetUrl);

      res.set("location", redirect.targetUrl);
      return res.status(301).send();
    } else {
      return res.status(500).send({ status: 500, message: "Link not found" });
    }
  } catch (error: any) {
    return res.status(500).send({ status: 500, message: `${error?.message}` });
  }
};

export const createOne = async (
  req: Request,
  res: Response<LinkData | LinkError>
) => {
  // 1. Validate target URL
  let targetUrl: URL;

  try {
    targetUrl = new URL(req.body?.targetUrl);
  } catch (error) {
    console.error(
      `Failed to parse provided URL: ${JSON.stringify(targetUrl, null, 2)}`
    );
    return res.status(500).send({
      status: 500,
      message: `${error.input} does not appear to be a valid URL. Please check and try again.`,
    });
  }
  // 2a. Generate a shortcode
  const generateUniqueShortCode = async () => {
    const shortCode = crypto.randomBytes(3).toString("hex").slice(0, 5);
    const duplicates = await Link.find({ shortCode: shortCode }).exec();

    // 2b. Verify shortcode is not a dupe
    if (duplicates.length > 0) {
      await generateUniqueShortCode();
    } else {
      return shortCode;
    }
  };

  const shortCode = await generateUniqueShortCode();

  // 3. Post to database
  try {
    const link = await Link.create<LinkData>({
      targetUrl: targetUrl.href,
      shortCode: shortCode,
      active: true,
      clicks: 0,
    });

    // 4. Cache result
    await client.set(shortCode, targetUrl.href);

    // 5. Return complete object
    return res.status(201).send(link);
  } catch (error: any) {
    return res.status(500).send({ status: 500, message: `${error?.message}` });
  }
};
