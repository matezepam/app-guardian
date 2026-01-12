import { useState } from "react";
import { api } from "../../utils/api"; 
import { motion } from "framer-motion";

export default function AvatarUploader({ currentAvatar, onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentAvatar || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen");
      return;
    }
    if (selected.size > 2 * 1024 * 1024) {
      setError("El archivo debe ser menor a 2MB");
      return;
    }

    setError("");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const res = await api.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let data;
      try {
        data = await res.json(); 
      } catch (err) {
        console.error("No se pudo parsear JSON del backend:", err);
        setError("Error en el servidor al subir la imagen");
        return;
      }

      if (res.ok) {
        onUpload(data.avatarUrl); 
      } else {
        setError(data?.message || "Error al subir la imagen");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/50 p-4 rounded-2xl shadow-md max-w-sm mx-auto">
      <h3 className="text-md font-semibold mb-4 text-white">Cambiar Avatar</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="flex flex-col items-center gap-4">
        {preview && (
          <motion.img
            src={preview}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-emerald-400 hover:file:bg-slate-600"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`w-full py-2 rounded-full text-white font-bold transition ${
            file && !loading
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {loading ? "Subiendo..." : "Subir Avatar"}
        </button>
      </div>
    </div>
  );
}
