"use client";

import React, {
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import "./FormContent.css"; // Import your custom CSS styles for the component
import { collection, onSnapshot } from "firebase/firestore";
import db from "../db/db";
import { FormEventHandler } from "react";
import axios from "axios";
import { set } from "firebase/database";
import { addDoc } from "firebase/firestore";
import LoadingBar from "react-top-loading-bar";

const FormContent: React.FC = () => {
  const [posterName, setPosterName] = useState("");
  const [imgs, setImgs] = useState<{ createdAt: any; imgUrl: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [barProgress, setBarProgress] = useState(0);

  interface ImageResponse {
    progress: number | "incomplete";
    progressImageUrl?: string;
  }

  const endpoint = "https://api.thenextleg.io/v2";
  const TOKEN = "4f5debac-f51c-4205-8eb0-33d68819916f";
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    onSnapshot(collection(db, "imgs"), (snapshot) => {
      let dbImgs: { createdAt: any; imgUrl: string }[] = snapshot.docs.map(
        (doc) => doc.data()
      ) as any;
      setImgs(dbImgs);
      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
  }, []);

  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  let fetchToCompletion = async (
    messageId: string,
    retryCount: number,
    maxRetry: number = 20
  ) => {
    const { data } = await axios.get(`${endpoint}/message/${messageId}`, {
      headers: headers,
    });

    if (data.progress === 100) {
      return data;
    }

    if (data.progress === "incomplete") {
      throw new Error("Image generation failed");
    }

    if (retryCount > maxRetry) {
      throw new Error("Max retries exceeded");
    }

    await sleep(5000);
    return fetchToCompletion(messageId, retryCount + 1);
  };

  const generateImage = async () => {
    try {
      const { data: imageResponseData } = await axios.post(
        `${endpoint}/imagine`,
        { msg: posterName },
        { headers: headers }
      );
      console.log("IMAGE GENERATION MESSAGE DATA:", imageResponseData);

      const completedImageData = await fetchToCompletion(
        imageResponseData.messageId,
        0
      );

      console.log("COMPLETED IMAGE DATA:", completedImageData);
      let imageUrl = completedImageData.response.imageUrls[0];
      await addDoc(collection(db, "imgs"), {
        imgUrl: imageUrl,
        createdAt: new Date().toISOString(), //not all clients will have the same time
      });
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="main-content-container">
      <h1 className="main-content-title p-8">Generate a Poster</h1>
      <div className="input-container">
        <input
          id="name"
          type="text"
          className="form-control"
          autoComplete="off"
          placeholder="Enter text here"
          value={posterName}
          onChange={(e) => setPosterName(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setBarProgress(10);
            setLoading(true);

            const intervalId = setInterval(() => {
              setBarProgress((prevProgress) => {
                const newProgress =
                  prevProgress === 95 ? 95 : prevProgress + 0.25;
                return newProgress;
              });
            }, 100);
            setTimeout(() => {
              clearInterval(intervalId);
            }, 38000);

            generateImage().then(() => {
              setLoading(false);
              setBarProgress(100);
            });
          }}
        >
          {loading ? "Loading..." : "Generate"}
        </button>
      </div>
      <LoadingBar progress={barProgress} />
      <div>
        <div className="grid grid-cols-3 gap-4 p-8">
          {imgs.map((img) => (
            <img
              src={img.imgUrl}
              className="w-full"
              key={img.imgUrl}
              alt="nothing"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormContent;
