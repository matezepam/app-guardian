import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Info, AtSign } from "lucide-react";
import AvatarUploader from "./AvatarUploader";
import { api } from "../../utils/api";

export default function Profile() {
  const { user, login } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [pronouns, setPronouns] = useState(user?.pronouns || "");
  const [twitter, setTwitter] = useState(user?.socials?.twitter || "");
  const [instagram, setInstagram] = useState(user?.socials?.instagram || "");
  const [linkedin, setLinkedin] = useState(user?.socials?.linkedin || "");

  useEffect(() => {
    setAvatar(user?.avatar || "");
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setBio(user?.bio || "");
    setPronouns(user?.pronouns || "");
    setTwitter(user?.socials?.twitter || "");
    setInstagram(user?.socials?.instagram || "");
    setLinkedin(user?.socials?.linkedin || "");
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    const formatLink = (link, prefix) => {
      if (!link) return "";
      if (link.startsWith("http")) return link;
      return prefix + link.replace(/^@/, "");
    };

    const updatedUser = {
      avatar: avatar || user.avatar,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      bio: bio || user.bio,
      pronouns: pronouns || user.pronouns,
      socials: {
        twitter: formatLink(twitter, "https://twitter.com/"),
        instagram: formatLink(instagram, "https://instagram.com/"),
        linkedin: formatLink(linkedin, "https://linkedin.com/in/"),
      },
    };

    try {
      const data = await api.put("/users/profile", updatedUser);
      login(data, localStorage.getItem("token"));
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      alert("Hubo un error al actualizar el perfil");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row gap-8"
        >
          <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/3">
            <div className="relative md:translate-x-24">
              <img
                src={avatar || "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-emerald-500/20 object-cover"
              />
            </div>

            <AvatarUploader
              currentAvatar={avatar}
              onUpload={(url) => setAvatar(url)}
            />
          </div>

          <div className="flex-1 w-full md:w-2/3 space-y-6">
            <div className="flex flex-col gap-3 bg-slate-800/40 p-4 rounded-xl">
              <h2 className="text-white font-semibold text-lg">Información Personal</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="flex-1 bg-slate-900/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="flex-1 bg-slate-900/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <input
                type="text"
                placeholder="Pronombres (ej. él/ella/elle)"
                value={pronouns}
                onChange={e => setPronouns(e.target.value)}
                className="w-full bg-slate-900/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="flex flex-col gap-3 bg-slate-800/40 p-4 rounded-xl">
              <h2 className="text-white font-semibold text-lg">Cuenta</h2>
              <p className="text-slate-400">Usuario: {user.username}</p>
              <p className="text-slate-400 flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                {user.email}
              </p>
            </div>

            <div className="flex flex-col gap-2 bg-slate-800/40 p-4 rounded-xl">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Info className="text-emerald-400 h-5 w-5" />
                Biografía
              </h2>
              <textarea
                placeholder="Escribe algo sobre ti..."
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full bg-slate-800/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <input
                  type="text"
                  placeholder="País"
                  value={user.country || ""}
                  className="w-full bg-slate-800/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  readOnly
                />
              </div>

              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl">
                <Phone className="h-5 w-5 text-emerald-400" />
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={user.phone || ""}
                  className="w-full bg-slate-800/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-slate-800/40 p-4 rounded-xl">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <AtSign className="text-emerald-400 h-5 w-5" />
                Redes Sociales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <input
                  type="text"
                  placeholder="Twitter"
                  value={twitter}
                  onChange={e => setTwitter(e.target.value)}
                  className="w-full bg-slate-800/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  type="text"
                  placeholder="Instagram"
                  value={instagram}
                  onChange={e => setInstagram(e.target.value)}
                  className="w-full bg-slate-800/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={linkedin}
                  onChange={e => setLinkedin(e.target.value)}
                  className="w-full bg-slate-800/50 p-2 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition text-white font-semibold"
            >
              Guardar Cambios
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
