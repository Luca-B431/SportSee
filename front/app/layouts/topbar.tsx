import { NavLink } from "react-router";

export default function Topbar() {
  return (
    <>
      {/* Horizontal Layout */}
      <div className="flex justify-between bg-[#020203] text-white px-6 py-4 shadow-sm">
        <img className="h-[60px]" src="/logo.png" alt="Logo SportSee" />
        <nav className="flex flex-row justify-between items-center w-full px-[90px] ml-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-bold px-4 py-2 ${
                isActive ? "text-[#c10909]" : "text-white"
              }`
            }
          >
            Accueil
          </NavLink>
          <NavLink to="/" className="text-lg font-bold px-4 py-2 text-white">
            Profil
          </NavLink>
          <NavLink to="/" className="text-lg font-bold px-4 py-2 text-white">
            Réglage
          </NavLink>
          <NavLink to="/" className="text-lg font-bold px-4 py-2 text-white">
            Communauté
          </NavLink>
        </nav>
      </div>
      <div className="grid grid-rows-1 grid-cols-2"></div>
    </>
  );
}
