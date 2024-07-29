import { getConstants } from "@/constants";

export const getAllFilesService = async () => {
  const { url } = getConstants();

  const token = localStorage.getItem(getConstants().LOCAL_STORAGE_TOKEN);

  const response = await fetch(`${url}/files`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.message) throw new Error(data.message);

  return data.files;
};
