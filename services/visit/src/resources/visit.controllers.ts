import { Request, Response } from "express";

import { UI_HOST, VISIT_PORT } from "../environment";
import { Visit, VisitData, VisitError } from "./visit.models";
import { cache } from "../cache";

export const visit = async (
  req: Request<{ shortCode: string }>,
  res: Response
) => {
  try {
    const shortCode = req.params.shortCode;

    let targetUrl: string;

    const cachedResult = await cache.get(shortCode);

    if (cachedResult) {
      targetUrl = cachedResult;
    } else {
      const queriedResult = await Visit.findOne(
        { shortCode },
        { targetUrl: 1 }
      ).exec();

      targetUrl = queriedResult?.targetUrl;
    }

    if (targetUrl) {
      setTimeout(async () => {
        const cached = await cache.exists(shortCode);

        if (cached !== 1) {
          cache.set(shortCode, targetUrl);
        }
      });

      res.set("location", targetUrl);
      return res.status(302).send();
    } else {
      return res.set(404).send({ message: "Not Found" });
    }
  } catch (error: any) {
    return res.status(500).send({ message: error?.message });
  }
};
