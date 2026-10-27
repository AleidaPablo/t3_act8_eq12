import {
  Stethoscope,
  LayoutDashboard,
  Users,
  UserRound,
  Calendar,
  FileText,
  Activity,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({ vista, setVista, onCerrarSesion }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icono">
          <Stethoscope size={22} />
        </span>
        <span className="sidebar-logo-texto">VITACARE</span>
      </div>

      <div className="sidebar-seccion">
        <span className="sidebar-titulo-seccion"></span>
        <nav className="sidebar-menu">
          <button
            className={`sidebar-item ${vista === "panel" ? "activo" : ""}`}
            onClick={() => setVista("panel")} >
            <LayoutDashboard size={18} />
            <span>Panel principal</span>
          </button>
          <button
            className={`sidebar-item ${vista === "pacientes" ? "activo" : ""}`}
            onClick={() => setVista("pacientes")}>
            <Users size={18} />
            <span>Pacientes</span>
          </button>
          <button
            className={`sidebar-item ${vista === "medicos" ? "activo" : ""}`}
            onClick={() => setVista("medicos")}>
            <UserRound size={18} />
            <span>Médicos</span>
          </button>
          <button
            className={`sidebar-item ${vista === "citas" ? "activo" : ""}`}
            onClick={() => setVista("citas")}>
            <Calendar size={18} />
            <span>Citas médicas</span>
          </button>
          <button
            className={`sidebar-item ${vista === "expedientes" ? "activo" : ""}`}
            onClick={() => setVista("expedientes")}>
            <FileText size={18} />
            <span>Expedientes clínicos</span>
          </button>
          <button
            className={`sidebar-item ${vista === "consultas" ? "activo" : ""}`}
            onClick={() => setVista("consultas")}>
            <Activity size={18} />
            <span>Consultas</span>
          </button>
          <button
            className={`sidebar-item ${vista === "reportes" ? "activo" : ""}`}
            onClick={() => setVista("reportes")}>
            <BarChart3 size={18} />
            <span>Reportes</span>
          </button>
        </nav>
      </div>
      <div className="sidebar-footer">
        <button className="sidebar-item">
          <Settings size={18} />
          <span>Configuración</span>
        </button>
        <button className="sidebar-item logout" onClick={onCerrarSesion}>
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}