"use client";

import React, { FormEvent, useEffect, useState } from "react";
import "./FormContent.css"; // Import your custom CSS styles for the component
import { collection, onSnapshot } from "firebase/firestore";
import db from "../db/db";
import { FormEventHandler } from "react";
import axios from "axios";

const FormContent: React.FC = () => {
  const [posterName, setPosterName] = useState("");
  const [imgs, setImgs] = useState<{ createdAt: any; imgUrl: string }[]>([]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    let poster = (event.currentTarget[0] as HTMLInputElement).value;
    setPosterName(poster);
    async () => {
      let r = (await axios.post("../api/webhook", { poster })) as any;
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={async () => {
            let r = (await axios.post("../api/webhook", { name })) as any;
            console.log(r.data);
          }}
        >
          Submit
        </button>
      </div>
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
