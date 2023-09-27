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
import { addDoc, collection } from "firebase/firestore";

export default async function POST(req: any, res: any) {
  try {
    const { imageUrl } = req.body as any;
    console.log(req.body);

    if (!imageUrl) {
      throw new Error("imageUrl is missing from the request body");
    }

    await addDoc(collection(db, "imgs"), {
      imgUrl: imageUrl,
      createdAt: new Date(), // serverTimestamp() -> Not all clients will have the same time
    });

    res.status(200).json({ message: "Image added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
