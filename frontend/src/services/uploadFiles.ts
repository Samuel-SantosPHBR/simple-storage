import { getConstants } from "@/constants";

export const uploadFiles = async (files: any[]) => {
  if (!files.length) throw Error("Files not Found");

  const { url } = getConstants();

  const formData = new FormData();

  const response = await fetch(`${url}/file/upload`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: formData,
  });

  const data = await response.json();

  if (data.message) throw new Error(data.message);

  return data;
};
