"use client";

import { truncateString } from "@/helper/truncateString";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    const files = event.target.files;
    setFiles([...files]);
  };

  return (
    <main className="flex h-screen flex-col">
      <div className="bg-amber-600 w-full h-12"></div>
      <div className="bg-slate-200 h-full p-6 flex flex-wrap justify-around">
        {files.map((file) => (
          <div
            key={file.name}
            className="w-1/6 h-2/6 border-2 border-gray-500 text-sky-600 flex justify-center items-center mx-2 cursor-wait text-sm"
          >
            <p className="bg-transparent text-center ">
              {truncateString(file.name)}
            </p>
          </div>
        ))}

        <div className="w-1/6 h-2/6 border-dashed border-2 border-sky-500 text-sky-600 flex justify-center items-center mx-2 cursor-pointer hover:bg-sky-500 hover:text-slate-100">
          <label>
            <p className="bg-transparent text-center ">
              Clique aqui para fazer o upload do seu arquivo
            </p>
            <input
              multiple
              type="file"
              name="file"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </main>
  );
}
