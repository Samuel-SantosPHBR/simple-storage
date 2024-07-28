import { getConstants } from "@/constants";

type PayloadLogin = {
  email: string;
  password: string;
};

export const loginService = async (payload: PayloadLogin) => {
  const { url } = getConstants();
  const response = await fetch(`${url}/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.message) throw new Error(data.message);

  return data;
};
