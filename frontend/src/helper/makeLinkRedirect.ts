import { getConstants } from "@/constants";

export const makeLinkRedirect = (fileName: string) => {
  const { url } = getConstants();

  return `${url}/static/${fileName}`;
};
