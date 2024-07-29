"use client";

import { getConstants } from "@/constants";
import { makeLinkRedirect } from "@/helper/makeLinkRedirect";
import { truncateString } from "@/helper/truncateString";
import { getAllFilesService } from "@/services/getAllFilesService";
import { uploadFiles } from "@/services/uploadFiles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleChange = async (event) => {
    const files = event.target.files;
    setFiles([...files]);

    const response = await uploadFiles(files[0]);

    setUploadedFiles((uploadedFiles) => [...uploadedFiles, response]);

    setFiles([]);
  };

  useEffect(() => {
    const token = localStorage.getItem(getConstants().LOCAL_STORAGE_TOKEN);
    if (!token) {
      router.push("/login");
    }
  });

  useEffect(() => {
    getAllFilesService()
      .then((response) => {
        setUploadedFiles([...response]);
      })
      .catch((error) => router.push("/login"));
  }, []);

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

        {uploadedFiles.map((file) => (
          <div
            key={file.fileName}
            onClick={() =>
              window.open(makeLinkRedirect(file.fileName), "_blank")
            }
            className="w-1/6 h-2/6 border-2 cursor-pointer border-lime-500 text-lime-500 flex justify-center items-center mx-2 text-sm"
          >
            <p className="bg-transparent text-center ">
              {truncateString(file.fileName?.split("------")[1])}
            </p>
          </div>
        ))}

        <div className="w-1/6 h-2/6 border-dashed border-2 border-sky-500 text-sky-600 flex justify-center items-center mx-2 cursor-pointer hover:bg-sky-500 hover:text-slate-100">
          <label>
            <p className="bg-transparent text-center ">
              Clique aqui para fazer o upload do seu arquivo
            </p>
            <input
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
