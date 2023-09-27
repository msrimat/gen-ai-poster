"use client";

import React, { FormEvent, useEffect, useState } from "react";
import "./FormContent.css"; // Import your custom CSS styles for the component
import { collection, onSnapshot } from "firebase/firestore";
import db from "../db/db";
import { FormEventHandler } from "react";
import axios from "axios";
import { set } from "firebase/database";

const FormContent: React.FC = () => {
  const [posterName, setPosterName] = useState("");
  const [imgs, setImgs] = useState<{ createdAt: any; imgUrl: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const TOKEN = "fc8df018-1c32-4b46-b250-4606bbc9b289";
  const endpoint = "https://api.thenextleg.io/v2";

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    let poster = (event.currentTarget[0] as HTMLInputElement).value;
    setPosterName(poster);
    async () => {
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      };
      setLoading(true);
      try {
        let r = (await axios.post(
          endpoint,
          {
            cmd: "imagine",
            msg: poster,
          },
          { headers: headers }
        )) as any;
        console.log(r.data);
        setResponse(JSON.stringify(r.data));
      } catch (e) {
        console.log(e);
        setError(e as any);
      }
      setLoading(false);
    };
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

  return (
    <form onSubmit={handleSubmit} className="main-content-container">
      <h1 className="main-content-title">Generate a Poster</h1>
      <div className="input-container">
        <input
          id="name"
          type="text"
          className="form-control"
          autoComplete="off"
          placeholder="Enter text here"
        />
      </div>
      <div className="button-container">
        <button type="submit" className="btn btn-primary">
          {loading ? "Loading..." : "Generate"}
        </button>
      </div>
      <pre>Response Message: {response}</pre>
      <div>
        <h1 className="text-3xl pt-8">These are your posters!</h1>
        <div className="grid grid-cols-3 gap-4">
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
    </form>
  );
};

export default FormContent;
