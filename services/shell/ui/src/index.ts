import { v4 as uuidv4 } from "uuid";

const CREATE_UI_PUBLIC_HOST = process.env.CREATE_UI_PUBLIC_HOST;
const VIEW_UI_PUBLIC_HOST = process.env.VIEW_UI_PUBLIC_HOST;

const uuid = uuidv4().slice(0, 8);

(
  document.getElementById("create-frame") as HTMLIFrameElement
).src = `https://${CREATE_UI_PUBLIC_HOST}?uuid=${uuid}`;

(
  document.getElementById("view-frame") as HTMLIFrameElement
).src = `https://${VIEW_UI_PUBLIC_HOST}?uuid=${uuid}`;
console.log(`[shell] uuid is: ${uuid}`);
