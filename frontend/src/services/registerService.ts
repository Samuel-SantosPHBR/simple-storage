import { getConstants } from "@/constants";

type PayloadRegister = {
  name: string;
  email: string;
  password: string;
};

export const registerService = async (payload: PayloadRegister) => {
  const { url } = getConstants();
  const response = await fetch(`${url}/user/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const status = await response.status;

  if (status !== 201) throw new Error("Status Unknow");
};
