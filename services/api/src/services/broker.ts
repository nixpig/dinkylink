import { createClient } from "redis";
import { BROKER_CONNECTION_STRING } from "../environment";

export const broker = createClient({
  url: BROKER_CONNECTION_STRING,
});

export enum Channel {
  TOTAL_LINKS = "total_links",
  RECENTLY_ADDED = "recently_added",
  RECENTLY_CLICKED = "recently_clicked",
  TOTAL_CLICKS = "total_clicks",
  TOP_10 = "top_10",
}

export const publishTotalLinks = async (count: number) => {
  console.log(`📤️ [broker] publishing total links: ${count}`);
  broker.publish(Channel.TOTAL_LINKS, count.toString());
};

export const publishRecentlyAdded = async (link) => {
  console.log(
    `📤️ [broker] publishing recently added link: ${JSON.stringify(link)}`
  );
  broker.publish(Channel.RECENTLY_ADDED, JSON.stringify(link));
};

export const publishRecentlyClicked = async (link) => {
  console.log(
    `📤️ [broker] publishing recently clicked link: ${JSON.stringify(link)}`
  );
  broker.publish(Channel.RECENTLY_CLICKED, JSON.stringify(link));
};

export const publishTotalClicks = async (count: number) => {
  console.log(`📤️ [broker] publishing total clicks: ${count}`);
  broker.publish(Channel.TOTAL_CLICKS, `${count}`);
};

export const publishTop10 = async (links) => {
  console.log(`📤️ [broker] publishing top 10 links: ${JSON.stringify(links)}`);
  broker.publish(Channel.TOP_10, JSON.stringify(links));
};

// const sub = broker.subscribe(Channel.TOTAL_LINKS, (error, channel) => {
//   if (error) {
//     throw new Error(`Failed to subscribe to channel ${Channel.TOTAL_LINKS}`);
//   }
//
//   console.log(`Subscribed to channel ${channel}`);
// });
//
// broker.on("message", (channel, message) => {
//   console.log("this needs to go in the ws app...", channel, message);
// });
