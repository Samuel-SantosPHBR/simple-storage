"use client";
import Image from "next/image";
import loginSvg from "../../../public/login.svg";
import { loginService } from "@/services/loginService";
import { getConstants } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      const response = await loginService({ email, password });

      localStorage.setItem(getConstants().LOCAL_STORAGE_TOKEN, response.token);

      router.push("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (!error) return;

    const timeId = setTimeout(() => {
      setError(false);
    }, 4000);

    return () => clearTimeout(timeId);
  }, [error]);

  return (
    <main className="flex h-screen">
      <div className="w-3/5 flex items-center">
        <Image src={loginSvg} alt={"Login Image"} />
      </div>
      <div className="w-2/5 bg-slate-100 flex justify-center items-center flex-col">
        <div className="w-full flex justify-center items-center h-1/5 mb-4">
          <h1 className="font-bold text-3xl text-amber-500">Simple Storage </h1>
        </div>
        <form
          className="flex justify-center items-center h-1/5 flex-col space-y-6"
          onSubmit={handleLogin}
        >
          {error && (
            <p className="w-full text-red-500">
              {" "}
              Ocorreu um erro tente novamente mais tarde
            </p>
          )}
          <div className="w-3/4">
            <label className="w-full">Email: </label>
            <input
              value={email}
              id="email"
              className="w-full rounded-md pl-1"
              type="email"
              name="email"
              placeholder="teste@teste.com"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>

          <div className="w-3/4">
            <label className="w-full">Senha: </label>
            <input
              id="password"
              className="w-full rounded-md pl-1"
              type="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <div className="w-3/4">
            <button
              className="bg-amber-500 w-full rounded-md font-semibold h-7"
              type="submit"
            >
              {" "}
              Entrar{" "}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
