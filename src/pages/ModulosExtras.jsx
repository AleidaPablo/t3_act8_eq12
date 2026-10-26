import { useState } from "react";
import { Plus, FileText, User, CheckCircle, Clock } from "lucide-react";


export function Medicos() {
  const [medicos, setMedicos] = useState([
    { id: 1, nombre: "Dr. Alejandro Gómez", especialidad: "Cardiología", turno: "Matutino" },
    { id: 2, nombre: "Dra. Beatriz Silva", especialidad: "Pediatría", turno: "Vespertino" },
  ]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [turno, setTurno] = useState("Matutino");

  const handleGuardar = () => {
    if (!nombre.trim() || !especialidad.trim()) return alert("Llena todos los campos");
    setMedicos([...medicos, { id: Date.now(), nombre, especialidad, turno }]);
    setNombre(""); setEspecialidad(""); setTurno("Matutino"); setMostrarFormulario(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Gestión de Médicos</h2>
        <button onClick={() => setMostrarFormulario(true)} style={{ background: "#0E7490", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
          <Plus size={18} /> Agregar Médico
        </button>
      </div>
      <table style={{ width: "100%", background: "white", borderRadius: "8px", borderCollapse: "collapse", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#F1F5F9", textAlign: "left" }}>
          <tr>
            <th style={{ padding: "15px" }}>ID</th>
            <th style={{ padding: "15px" }}>Nombre</th>
            <th style={{ padding: "15px" }}>Especialidad</th>
            <th style={{ padding: "15px" }}>Turno</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((m) => (
            <tr key={m.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
              <td style={{ padding: "15px" }}>{m.id}</td>
              <td style={{ padding: "15px", fontWeight: "bold" }}>{m.nombre}</td>
              <td style={{ padding: "15px" }}>{m.especialidad}</td>
              <td style={{ padding: "15px" }}>{m.turno}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarFormulario && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '400px' }}>
            <h3 style={{ marginBottom: '20px' }}>Agregar Nuevo Médico</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Nombre completo:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Especialidad:</label>
              <input type="text" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Turno:</label>
              <select value={turno} onChange={(e) => setTurno(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setMostrarFormulario(false)} style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleGuardar} style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: '#14B8A6', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export function Citas({ setExpedientes }) {
  const [citas, setCitas] = useState([
    { id: 1, paciente: "Lucía Hernández", fecha: "2026-10-25", hora: "10:00", estado: "Confirmada" },
    { id: 2, paciente: "Carlos Mendoza", fecha: "2026-10-26", hora: "11:30", estado: "Pendiente" },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [paciente, setPaciente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const handleGuardar = () => {
    if (!paciente.trim() || !fecha.trim()) return alert("Llena los campos obligatorios");
    
    
    const nuevaCita = { id: Date.now(), paciente, fecha, hora: hora || "09:00", estado: "Pendiente" };
    setCitas([...citas, nuevaCita]);

    if (setExpedientes) {
      const nuevoExpediente = {
        id: `EXP-00${Math.floor(Math.random() * 100) + 3}`, // ID aleatorio
        paciente: paciente,
        fecha: fecha,
        diagnostico: "Por evaluar",
        medico: "Por asignar",
        sangre: "Desconocido",
        alergias: "Ninguna",
        notas: "Cita agendada recientemente."
      };
      setExpedientes(prev => [nuevoExpediente, ...prev]);
    }

    setPaciente(""); setFecha(""); setHora(""); setMostrarFormulario(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Agenda de Citas</h2>
        <button onClick={() => setMostrarFormulario(true)} style={{ background: "#0E7490", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
          <Plus size={18} /> Nueva Cita
        </button>
      </div>
      <table style={{ width: "100%", background: "white", borderRadius: "8px", borderCollapse: "collapse", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#F1F5F9", textAlign: "left" }}>
          <tr>
            <th style={{ padding: "15px" }}>Paciente</th>
            <th style={{ padding: "15px" }}>Fecha</th>
            <th style={{ padding: "15px" }}>Hora</th>
            <th style={{ padding: "15px" }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((c) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
              <td style={{ padding: "15px", fontWeight: "bold" }}>{c.paciente}</td>
              <td style={{ padding: "15px" }}>{c.fecha}</td>
              <td style={{ padding: "15px" }}>{c.hora}</td>
              <td style={{ padding: "15px" }}>
                <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", background: c.estado === "Confirmada" ? "#D1FAE5" : "#FEF3C7", color: c.estado === "Confirmada" ? "#065F46" : "#92400E" }}>{c.estado}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {mostrarFormulario && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '400px' }}>
            <h3 style={{ marginBottom: '20px' }}>Agendar Nueva Cita</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Paciente:</label>
              <input type="text" value={paciente} onChange={(e) => setPaciente(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Ej. Ana López" />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Fecha:</label>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Hora:</label>
              <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setMostrarFormulario(false)} style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleGuardar} style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: '#14B8A6', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Guardar Cita</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export function Expedientes({ expedientes, setExpedientes }) {
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);
  const [editando, setEditando] = useState(false);
  const [nuevasNotas, setNuevasNotas] = useState("");

  const abrirModal = (exp) => {
    setExpedienteSeleccionado(exp);
    setNuevasNotas(exp.notas);
    setEditando(false);
  };

  const guardarCambios = () => {
    setExpedientes(expedientes.map(e => 
      e.id === expedienteSeleccionado.id ? { ...e, notas: nuevasNotas } : e
    ));
    setEditando(false);
    setExpedienteSeleccionado({ ...expedienteSeleccionado, notas: nuevasNotas });
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Expedientes Clínicos</h2>
      </div>
      <table style={{ width: "100%", background: "white", borderRadius: "8px", borderCollapse: "collapse", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#F1F5F9", textAlign: "left" }}>
          <tr>
            <th style={{ padding: "15px" }}>No. Expediente</th>
            <th style={{ padding: "15px" }}>Paciente</th>
            <th style={{ padding: "15px" }}>Fecha</th>
            <th style={{ padding: "15px" }}>Diagnóstico</th>
            <th style={{ padding: "15px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((e) => (
            <tr key={e.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
              <td style={{ padding: "15px", fontWeight: "bold", color: "#0E7490" }}>{e.id}</td>
              <td style={{ padding: "15px" }}>{e.paciente}</td>
              <td style={{ padding: "15px" }}>{e.fecha}</td>
              <td style={{ padding: "15px" }}>{e.diagnostico}</td>
              <td style={{ padding: "15px", display: 'flex', gap: '5px' }}>
                <button onClick={() => abrirModal(e)} style={{ background: '#E0F2FE', color: '#0E7490', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FileText size={14} /> Ver Detalles
                </button>
                <button onClick={() => { if(window.confirm("¿Eliminar expediente?")) setExpedientes(expedientes.filter(ex => ex.id !== e.id)) }} style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL DE DETALLES DE EXPEDIENTE */}
      {expedienteSeleccionado && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '500px' }}>
            <h3 style={{ marginBottom: '20px', color: '#0E7490' }}>Detalles del Expediente {expedienteSeleccionado.id}</h3>
            
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Paciente:</span>
              <span>{expedienteSeleccionado.paciente}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Médico Tratante:</span>
              <span>{expedienteSeleccionado.medico}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Tipo de Sangre:</span>
              <span style={{ color: '#EF4444', fontWeight: 'bold' }}>{expedienteSeleccionado.sangre}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Alergias:</span>
              <span>{expedienteSeleccionado.alergias}</span>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Notas Médicas:</span>
                {!editando && <button onClick={() => setEditando(true)} style={{ background: 'none', border: 'none', color: '#0E7490', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}>Editar Notas</button>}
              </div>
              
              {editando ? (
                <div>
                  <textarea 
                    value={nuevasNotas} 
                    onChange={(e) => setNuevasNotas(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #0E7490', minHeight: '80px', fontFamily: 'inherit' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => setEditando(false)} style={{ padding: '5px 10px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
                    <button onClick={guardarCambios} style={{ padding: '5px 10px', border: 'none', background: '#14B8A6', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Guardar</button>
                  </div>
                </div>
              ) : (
                <p style={{ background: '#F8FAFC', padding: '10px', borderRadius: '6px', color: '#475569' }}>{expedienteSeleccionado.notas}</p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setExpedienteSeleccionado(null)} style={{ padding: '8px 20px', border: 'none', borderRadius: '6px', background: '#0E7490', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. MÓDULO DE CONSULTAS
// ==========================================
export function Consultas() {
  const [consultas, setConsultas] = useState([
    { id: 1, paciente: "Sofía Ramírez", motivo: "Dolor de cabeza", hora: "09:00", estado: "En curso" },
    { id: 2, paciente: "Elesvan Pablo", motivo: "Revisión general", hora: "10:30", estado: "Pendiente" },
  ]);

  const cambiarEstado = (id) => {
    setConsultas(consultas.map(c => {
      if (c.id === id) {
        return { ...c, estado: c.estado === "Pendiente" ? "En curso" : "Terminada" };
      }
      return c;
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Consultas del Día</h2>
      </div>
      <table style={{ width: "100%", background: "white", borderRadius: "8px", borderCollapse: "collapse", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#F1F5F9", textAlign: "left" }}>
          <tr>
            <th style={{ padding: "15px" }}>Paciente</th>
            <th style={{ padding: "15px" }}>Motivo</th>
            <th style={{ padding: "15px" }}>Hora</th>
            <th style={{ padding: "15px" }}>Estado</th>
            <th style={{ padding: "15px" }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((c) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
              <td style={{ padding: "15px", fontWeight: "bold" }}>{c.paciente}</td>
              <td style={{ padding: "15px" }}>{c.motivo}</td>
              <td style={{ padding: "15px" }}>{c.hora}</td>
              <td style={{ padding: "15px" }}>
                <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", 
                  background: c.estado === "Terminada" ? "#D1FAE5" : c.estado === "En curso" ? "#DBEAFE" : "#FEF3C7", 
                  color: c.estado === "Terminada" ? "#065F46" : c.estado === "En curso" ? "#1E40AF" : "#92400E" }}>
                  {c.estado}
                </span>
              </td>
              <td style={{ padding: "15px" }}>
                {c.estado !== "Terminada" && (
                  <button onClick={() => cambiarEstado(c.id)} style={{ background: '#F1F5F9', color: '#0E7490', border: '1px solid #0E7490', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    {c.estado === "Pendiente" ? "Iniciar Consulta" : "Finalizar Consulta"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 5. MÓDULO DE REPORTES
// ==========================================
export function Reportes() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Reportes y Estadísticas</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ background: "#E0F2FE", padding: "15px", borderRadius: "50%" }}><User size={24} color="#0E7490" /></div>
          <div>
            <h3 style={{ color: "#6B7280", fontSize: "14px", marginBottom: "5px" }}>Total Pacientes</h3>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#1F2937", margin: 0 }}>70</p>
          </div>
        </div>

        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ background: "#D1FAE5", padding: "15px", borderRadius: "50%" }}><CheckCircle size={24} color="#065F46" /></div>
          <div>
            <h3 style={{ color: "#6B7280", fontSize: "14px", marginBottom: "5px" }}>Citas Completadas</h3>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#1F2937", margin: 0 }}>12</p>
          </div>
        </div>

        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ background: "#FEF3C7", padding: "15px", borderRadius: "50%" }}><Clock size={24} color="#92400E" /></div>
          <div>
            <h3 style={{ color: "#6B7280", fontSize: "14px", marginBottom: "5px" }}>Citas Pendientes</h3>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#1F2937", margin: 0 }}>4</p>
          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "30px", borderRadius: "12px", marginTop: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "20px", color: "#1F2937" }}>Ingresos del Mes</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", height: "200px" }}>
          <div style={{ flex: 1, background: "#E0F2FE", height: "40%", borderRadius: "6px 6px 0 0", position: "relative" }}><span style={{ position: "absolute", bottom: "-25px", width: "100%", textAlign: "center", fontSize: "12px", color: "#6B7280" }}>Ene</span></div>
          <div style={{ flex: 1, background: "#E0F2FE", height: "60%", borderRadius: "6px 6px 0 0", position: "relative" }}><span style={{ position: "absolute", bottom: "-25px", width: "100%", textAlign: "center", fontSize: "12px", color: "#6B7280" }}>Feb</span></div>
          <div style={{ flex: 1, background: "#E0F2FE", height: "80%", borderRadius: "6px 6px 0 0", position: "relative" }}><span style={{ position: "absolute", bottom: "-25px", width: "100%", textAlign: "center", fontSize: "12px", color: "#6B7280" }}>Mar</span></div>
          <div style={{ flex: 1, background: "#14B8A6", height: "100%", borderRadius: "6px 6px 0 0", position: "relative" }}><span style={{ position: "absolute", bottom: "-25px", width: "100%", textAlign: "center", fontSize: "12px", color: "#6B7280", fontWeight: "bold" }}>Abr</span></div>
        </div>
      </div>
    </div>
  );
}