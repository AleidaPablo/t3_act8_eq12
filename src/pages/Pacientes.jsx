import { useState } from "react";
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
  limite,
  setLimite,
  onAgregar,
  onEditar,
  onEliminar
}) {
  // Estados para el formulario de nuevo paciente
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaEdad, setNuevaEdad] = useState("");

  const handleGuardar = () => {
    if (!nuevoNombre.trim()) return alert("Escribe un nombre");
    onAgregar({ 
      firstName: nuevoNombre, 
      lastName: "", 
      age: Number(nuevaEdad) || 30 
    });
    setMostrarFormulario(false);
    setNuevoNombre("");
    setNuevaEdad("");
  };

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

        {/* BARRA DE BÚSQUEDA Y BOTÓN AGREGAR */}
        <div className="tabla-busqueda-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
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
          
          <button 
            onClick={() => setMostrarFormulario(true)}
            style={{ background: '#0E7490', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Nuevo Paciente
          </button>
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
                  <th>ACCIONES</th>
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
                    <td style={{ display: 'flex', gap: '5px' }}>
                      <button
                        className="boton-historial"
                        onClick={() => onVerHistorial(p)} 
                        title="Ver historial">
                        <FileClock size={16} />
                      </button>
                      
                      <button 
                        onClick={() => onEditar(p.rawId)}
                        style={{ background: '#E0F2FE', color: '#0E7490', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                        Editar
                      </button>
                      
                      <button 
                        onClick={() => onEliminar(p.rawId)}
                        style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINACIÓN CON SELECTOR DE LÍMITE */}
            <div className="paginacion-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <div>
                <label style={{ marginRight: '8px' }}>Mostrar: </label>
                <select 
                  value={limite} 
                  onChange={(e) => {
                    setLimite(Number(e.target.value));
                    setPagina(1);
                  }}
                  style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </select>
                <span style={{ marginLeft: '8px' }}>registros</span>
              </div>

              <div className="paginacion-botones">
                <button
                  disabled={pagina <= 1}
                  onClick={() => setPagina(pagina - 1)}>
                  Anterior
                </button>
                <span> Página {pagina} de {totalPaginas} </span>
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

      {/* VENTANA EMERGENTE PARA AGREGAR PACIENTE */}
      {mostrarFormulario && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px' }}>Agregar Nuevo Paciente</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
              <input 
                type="text" 
                value={nuevoNombre} 
                onChange={(e) => setNuevoNombre(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Ej. Juan"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Edad:</label>
              <input 
                type="number" 
                value={nuevaEdad} 
                onChange={(e) => setNuevaEdad(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Ej. 35"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setMostrarFormulario(false)} style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={handleGuardar} style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: '#14B8A6', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                Guardar Paciente
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}