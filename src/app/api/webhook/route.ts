// {
//     "createdAt": "2023-04-04T13:07:01.927Z",
//     "buttons": [
//         "U1",
//         "U2",
//         "U3",
//         "U4",
//         "🔄",
//         "V1",
//         "V2",
//         "V3",
//         "V4"
//     ],
//     "type": "imagine",
//     "imageUrl": "your-image-url",
//     "imageUrls": ["U1-image-url", "U2-image-url", "U3-image-url", "U4-image-url"],
//     "buttonMessageId": "OtfxNzfMIKBPVE1aP4u4",
//     "originatingMessageId": "your-message-id",
//     "content": "your-original-prompt",
//     "ref": "",
//     "responseAt": "2023-04-04T13:06:01.927Z"
// }

import db from "@/app/db/db";
import { addDoc, collection, doc, Firestore } from "firebase/firestore";

export async function POST(request: Request) {
  console.log("HIT");
  const { imageUrl } = request.body as any;
  await addDoc(collection(db, "imgs"), {
    imgUrl: imageUrl,
    createdAt: new Date().toISOString(), //not all clients will have the same time
  });
  return new Response("Hello der");
}
