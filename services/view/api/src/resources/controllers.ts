import { Request, Response } from "express";
import { cache } from "../services/cache";

export const view = async (
  req: Request<{ shortCode: string }>,
  res: Response
) => {
  try {
    const shortCode = req.params.shortCode;

    console.log(`[view] got shortCode from URL: ${shortCode}`);

    const targetUrl = await cache.get(shortCode);

    if (!targetUrl) {
      console.log("[view] no targetUrl retrieved from cache");
      res.set("location", "https://dinkylink.xyz");
    } else {
      console.log(`[view] setting redirect location: ${targetUrl}`);
      res.set("location", targetUrl);
    }

    console.log(`[view] initiating redirect to ${targetUrl}`);
    return res.status(302).send();
  } catch (e) {
    console.error(`[view] error viewing link redirection: ${e.message}`);
  }
};
