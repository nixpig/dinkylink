import { Schema, model } from "mongoose";
import {
  publishTotalLinks,
  publishRecentlyAdded,
  publishTop10,
  publishTotalClicks,
  publishRecentlyClicked,
} from "../../services/broker";

export interface LinkData {
  targetUrl: string;
  shortCode: string;
  active: boolean;
  clicks: number;
}

export interface LinkError {
  status: number;
  message?: string;
}

export const linkSchema = new Schema<LinkData>(
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
    clicks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

linkSchema.index({ shortCode: 1 }, { unique: true });

linkSchema.post("findOneAndUpdate", async function () {
  const query = this.getQuery();
  const update = this.getUpdate();

  // @ts-ignore
  if (update?.$inc.clicks > 0) {
    // 1. fetch top 10 and publish to 'top_10' channel
    try {
      // TODO: move this to controllers
      const links = await Link.find({}).sort({ clicks: -1 }).limit(10).exec();
      publishTop10(links);
    } catch (error: any) {
      console.error(`Failed to publish top 10 links: ${error?.message}`);
    }

    // 2. fetch link object and publish to 'recently_clicked' channel
    try {
      // TODO: move this to controllers
      const link = await Link.findOne({ shortCode: query?.shortCode }).exec();
      publishRecentlyClicked(link);
    } catch (error: any) {
      console.error(
        `Failed to publish recently clicked link: ${error?.message}`
      );
    }

    // 3. aggregate total clicks for all links and publish to 'total_clicks' channel
    try {
      // TODO: move this to controllers
      const totalClicks = await Link.aggregate([
        { $match: {} },
        { $group: { _id: null, total: { $sum: "$clicks" } } },
      ]);
      // @ts-ignore
      publishTotalClicks(totalClicks[0].total ?? 0);
    } catch (error: any) {
      console.error(`Failed to publish total clicks: ${error?.message}`);
    }
  }
});

linkSchema.post("save", async function (doc) {
  // 1. aggregate total number of links and publish to 'total_links' channel
  try {
    const count = await Link.count();
    publishTotalLinks(count);
  } catch (error: any) {
    console.error(`Failed to publish total links: ${error?.message}`);
  }

  // 2. publish to 'recently_added' channel
  publishRecentlyAdded(doc);
});

export const Link = model<LinkData>("Link", linkSchema);
