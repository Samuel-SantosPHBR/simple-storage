"use client";
import { loginService } from "@/services/loginService";
import { getConstants } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setError(false);

      const response = await loginService({ email, password });

      localStorage.setItem(getConstants().LOCAL_STORAGE_TOKEN, response.token);

      router.push("/");
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirecionar se já estiver logado
    const token = localStorage.getItem(getConstants().LOCAL_STORAGE_TOKEN);
    if (token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (!error) return;

    const timeId = setTimeout(() => {
      setError(false);
    }, 4000);

    return () => clearTimeout(timeId);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex">
      {/* Lado esquerdo - Ilustração */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">📁</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple Storage</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              O jeito mais simples de armazenar e compartilhar seus arquivos na nuvem
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
              <span className="text-gray-700">Upload rápido e seguro</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">✓</span>
              </div>
              <span className="text-gray-700">Acesso de qualquer lugar</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">✓</span>
              </div>
              <span className="text-gray-700">100% gratuito</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Header mobile */}
          <div className="text-center mb-8 lg:hidden">
            <div className="text-6xl mb-4">📁</div>
            <h1 className="text-3xl font-bold text-gray-800">Simple Storage</h1>
            <p className="text-gray-600 mt-2">Faça login para continuar</p>
          </div>

          {/* Header desktop */}
          <div className="hidden lg:block text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h1>
            <p className="text-gray-600">Faça login para acessar seus arquivos</p>
          </div>

          {/* Card do formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="text-red-500 text-xl mr-3">⚠️</div>
                    <p className="text-red-700 text-sm">
                      Email ou senha incorretos. Tente novamente.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="seu@email.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            {/* Link para registro */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Não tem uma conta?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="text-amber-600 hover:text-amber-700 font-semibold underline transition-colors duration-200"
                  disabled={loading}
                >
                  Criar conta gratuita
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
