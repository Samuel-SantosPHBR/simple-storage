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
  const [isUploading, setIsUploading] = useState(false);
  const [userName, setUserName] = useState("");

  const handleChange = async (event) => {
    try {
      setIsUploading(true);
      const files = event.target.files;
      if (!files || files.length === 0) return;
      
      setFiles([...files]);
      
      const response = await uploadFiles(files[0]);
      
      setUploadedFiles((uploadedFiles) => [...uploadedFiles, response]);
      
      setFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
      router.push("/login");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(getConstants().LOCAL_STORAGE_TOKEN);
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem(getConstants().LOCAL_STORAGE_TOKEN);
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem(getConstants().LOCAL_STORAGE_TOKEN);
    if (!token) {
      router.push("/login");
      return;
    }
    
    getAllFilesService()
      .then((response) => {
        setUploadedFiles([...response]);
      })
      .catch((error) => {
        console.error("Failed to load files:", error);
        router.push("/login");
      });
  }, [router]);

  return (
    <main className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-amber-600 w-full h-16 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl text-white">📁 Simple Storage</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">Bem-vindo!</span>
          <button
            onClick={handleLogout}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Meus Arquivos</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {/* Upload em progresso */}
            {files.map((file) => (
              <div
                key={file.name}
                className="bg-white border-2 border-blue-300 rounded-lg p-4 flex flex-col items-center justify-center h-40 shadow-sm animate-pulse"
              >
                <div className="text-blue-500 text-3xl mb-2">⏳</div>
                <p className="text-sm text-center text-gray-600 mb-2">
                  {truncateString(file.name, 20)}
                </p>
                <p className="text-xs text-blue-500">Carregando...</p>
              </div>
            ))}

            {/* Arquivos carregados */}
            {uploadedFiles.map((file) => (
              <div
                key={file.fileName}
                onClick={() =>
                  window.open(makeLinkRedirect(file.fileName), "_blank")
                }
                className="bg-white border-2 border-green-300 hover:border-green-400 rounded-lg p-4 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="text-green-500 text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">📄</div>
                <p className="text-sm text-center text-gray-700 font-medium">
                  {truncateString(file.fileName?.split("_")[2] || file.fileName, 20)}
                </p>
                <p className="text-xs text-green-600 mt-1">Clique para abrir</p>
              </div>
            ))}

            {/* Área de upload */}
            <div className="bg-white border-2 border-dashed border-amber-400 hover:border-amber-500 rounded-lg p-4 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:bg-amber-50 group">
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                {isUploading ? (
                  <>
                    <div className="text-amber-500 text-3xl mb-2 animate-spin">⚙️</div>
                    <p className="text-sm text-center text-amber-600 font-medium">
                      Enviando arquivo...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-amber-500 text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">📤</div>
                    <p className="text-sm text-center text-gray-600 font-medium mb-1">
                      Adicionar arquivo
                    </p>
                    <p className="text-xs text-center text-gray-500">
                      Clique para selecionar
                    </p>
                  </>
                )}
                <input
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={handleChange}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>
          
          {uploadedFiles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl text-gray-300 mb-4">📁</div>
              <p className="text-xl text-gray-500 mb-2">Nenhum arquivo encontrado</p>
              <p className="text-gray-400">Comece fazendo upload do seu primeiro arquivo!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
