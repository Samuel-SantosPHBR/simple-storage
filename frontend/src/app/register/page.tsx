"use client";
import Image from "next/image";
import loginSvg from "../../../public/login.svg";
import { getConstants } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { registerService } from "@/services/registerService";

export default function Register() {
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleRegister = async (event) => {
    try {
      event.preventDefault();

      await registerService({ name, email, password });

      router.push("/login");
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
        <div className="w-full flex justify-center items-center h-1/5 mb-2">
          <h1 className="font-bold text-3xl text-amber-500">Crie uma conta </h1>
        </div>
        <form
          className="flex justify-center items-center h-2/5 flex-col space-y-6"
          onSubmit={handleRegister}
        >
          {error && (
            <p className="w-full text-red-500">
              {" "}
              Ocorreu um erro tente novamente mais tarde
            </p>
          )}

          <div className="w-3/4">
            <label htmlFor="name" className="w-full">
              Nome:{" "}
            </label>
            <input
              value={name}
              id="name"
              className="w-full rounded-md pl-1"
              type="text"
              name="name"
              placeholder="Marcos"
              onChange={({ target }) => setName(target.value)}
            />
          </div>

          <div className="w-3/4">
            <label htmlFor="email" className="w-full">
              Email:{" "}
            </label>
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
            <label htmlFor="password" className="w-full">
              Senha:{" "}
            </label>
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
