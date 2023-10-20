import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4().slice(0, 8);
(
  document.getElementById("create-frame") as HTMLIFrameElement
).src = `http://create.localhost?uuid=${uuid}`;

(
  document.getElementById("view-frame") as HTMLIFrameElement
).src = `http://view.localhost?uuid=${uuid}`;
console.log(`[shell] uuid is: ${uuid}`);
