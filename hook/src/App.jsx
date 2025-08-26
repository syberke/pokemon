import { useState } from "react";
import FormulirPendaftaran from "./components/FormulirPendaftaran";
import AplikasiCuaca from "./components/AplikasiCuaca";

export default function App() {
  const [page, setPage] = useState("form"); // default: form

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Latihan React Hooks</h1>

      {/* Tombol switch */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setPage("form")}
          className={`px-4 py-2 rounded ${
            page === "form" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Formulir
        </button>
        <button
          onClick={() => setPage("cuaca")}
          className={`px-4 py-2 rounded ${
            page === "cuaca" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Aplikasi Cuaca
        </button>
      </div>

      {/* Konten sesuai tombol */}
      {page === "form" && <FormulirPendaftaran />}
      {page === "cuaca" && <AplikasiCuaca />}
    </div>
  );
}
