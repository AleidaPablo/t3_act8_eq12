import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar({ vista, usuario }) {
  return (
    <header className="navbar">
      <div className="breadcrumb">
        <span>Clinica</span>
        <span className="separador">&gt;</span>
        <span className="actual">
          {vista === "pacientes" ? "Pacientes" : "Panel principal"}
        </span>
      </div>
      <div className="navbar-derecha">
        <div className="busqueda-box">
          <Search size={16} className="icono-busqueda" />
          <input
            type="text"
            placeholder="Buscar en VITACARE... ⌘ K"
            readOnly/>
        </div>
        <button className="boton-notificacion" aria-label="Notificaciones">
          <Bell size={18} />
          <span className="punto-notificacion"></span>
        </button>
        <div className="perfil-usuario">
          <img
            src={usuario.image}
            alt={usuario.firstName}
            className="avatar-navbar"/>
          <span className="nombre-usuario">
            Dra. {usuario.firstName} {usuario.lastName}
          </span>
          <ChevronDown size={16} className="flecha-perfil" />
        </div>
      </div>
    </header>
  );
}