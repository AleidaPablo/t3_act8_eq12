import { Search, FileClock } from "lucide-react";

export default function Pacientes({
  todosLosPacientes,
  pacientesPaginados,
  filtroTab,
  setFiltroTab,
  busqueda,
  setBusqueda,
  pagina,
  setPagina,
  totalPaginas,
  cargandoTabla,
  errorTabla,
  onVerHistorial,
}) {
  const totalPendientes = todosLosPacientes.filter(
    (p) => p.estado === "Pendiente"
  ).length;

  return (
    <div className="pacientes-modulo">
      <div className="dashboard-encabezado">
        <h1>Gestión de pacientes</h1>
      </div>

      <div className="pacientes-card">
        <div className="tabs-header">
          <button
            className={`tab-item ${filtroTab === "todos" ? "activo" : ""}`}
            onClick={() => {
              setFiltroTab("todos");
              setPagina(1);
            }} >
            Todos los pacientes{" "}
            <span className="badge-count">{todosLosPacientes.length}</span>
          </button>
          <button
            className={`tab-item ${filtroTab === "pendientes" ? "activo" : ""}`}
            onClick={() => {
              setFiltroTab("pendientes");
              setPagina(1);
            }}>
            Pendientes <span className="badge-count">{totalPendientes}</span>
          </button>
        </div>

        <div className="tabla-busqueda-bar">
          <div className="busqueda-paciente-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar por nombre, correo o ID..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPagina(1);
              }} />
          </div>
        </div>

        {cargandoTabla && (
          <div className="estado-cargando">Cargando lista de pacientes...</div>
        )}
        {errorTabla && <div className="mensaje-error">{errorTabla}</div>}
        {!cargandoTabla && !errorTabla && (
          <div className="tabla-contenedor">
            <table className="tabla-citas">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PACIENTE ⬇</th>
                  <th>EDAD</th>
                  <th>SEXO</th>
                  <th>TELÉFONO</th>
                  <th>ÚLTIMA VISITA</th>
                  <th>ESTADO</th>
                  <th>HISTORIAL</th>
                </tr>
              </thead>
              <tbody>
                {pacientesPaginados.map((p) => (
                  <tr key={p.id}>
                    <td className="id-texto">{p.id}</td>
                    <td>
                      <div className="paciente-celda">
                        <span className={`avatar-iniciales ${p.colorClass}`}>
                          {p.iniciales}
                        </span>
                        <div className="paciente-info-texto">
                          <span className="nombre-paciente">{p.nombre}</span>
                          <span className="correo-paciente">{p.correo}</span>
                        </div>
                      </div>
                    </td>
                    <td>{p.edad}</td>
                    <td>{p.sexo}</td>
                    <td>{p.telefono}</td>
                    <td>{p.ultimaVisita}</td>
                    <td>
                      <span
                        className={`badge ${
                          p.estado === "Activo" ? "activo" : "pendiente"
                        }`} >
                        {p.estado}
                      </span>
                    </td>
                    <td>
                      <button
                        className="boton-historial"
                        onClick={() => onVerHistorial(p)} >
                        <FileClock size={16} />
                        <span>Ver historial</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paginacion-bar" style={{ justifyContent: "flex-end" }}>
              <div className="paginacion-botones">
                <button
                  disabled={pagina <= 1}
                  onClick={() => setPagina(pagina - 1)}>
                  Anterior
                </button>
                <span>
                  Página {pagina} de {totalPaginas}
                </span>
                <button
                  disabled={pagina >= totalPaginas}
                  onClick={() => setPagina(pagina + 1)} >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}