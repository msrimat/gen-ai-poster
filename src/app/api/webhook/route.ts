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
  const {
    imageUrl = "https://www.katdootje.nl/wp-content/uploads/kartierr_Maincoon_cat_very_clear_eyes_ultra_realistic_in_a_gian_1a6833b6-35d2-43bf-9cc0-6bc4d1898999.png",
  } = request.body as any;
  await addDoc(collection(db, "imgs"), {
    imgUrl: imageUrl,
    createdAt: new Date().toISOString(), //not all clients will have the same time
  });
  return new Response("Hello der");
}
