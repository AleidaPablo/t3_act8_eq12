import { useState } from "react";
import { 
  Plus, 
  FileText, 
  User, 
  CheckCircle, 
  Clock, 
  Stethoscope, 
  Calendar, 
  Trash2, 
  Eye, 
  Edit3, 
  TrendingUp, 
  X, 
  Sun, 
  Moon, 
  AlertCircle, 
  Droplet, 
  Activity 
} from "lucide-react";

const mainFont = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function Medicos() {
  const [medicos, setMedicos] = useState([
    { id: "P-001", nombre: "Dr. Alejandro Gómez", especialidad: "Cardiología", turno: "Matutino" },
    { id: "P-002", nombre: "Dra. Beatriz Silva", especialidad: "Pediatría", turno: "Vespertino" },
  ]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [turno, setTurno] = useState("Matutino");

  const handleGuardar = () => {
    if (!nombre.trim() || !especialidad.trim()) return alert("Por favor llena todos los campos");
    setMedicos([...medicos, { id: `P-00${medicos.length + 1}`, nombre, especialidad, turno }]);
    setNombre(""); setEspecialidad(""); setTurno("Matutino"); setMostrarFormulario(false);
  };

  return (
    <div style={{ padding: "24px", fontFamily: mainFont, color: "#1E293B" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#0F172A", display: "flex", alignItems: "center", gap: "10px" }}>
            <Stethoscope size={26} color="#0E7490" /> Gestión de Médicos
          </h2>
          <p style={{ margin: "4px 0 0 0", color: "#64748B", fontSize: "14px" }}>Personal médico y sus horarios</p>
        </div>
        <button onClick={() => setMostrarFormulario(true)} style={{ background: "#0E7490", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 2px 4px rgba(14, 116, 144, 0.2)" }}>
          <Plus size={18} /> Agregar Médico
        </button>
      </div>

      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", border: "1px solid #E2E8F0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <tr>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>ID</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Médico</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Especialidad</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Turno</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((m) => (
              <tr key={m.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "14px 16px", fontWeight: "600", color: "#64748B" }}>{m.id}</td>
                <td style={{ padding: "14px 16px", fontWeight: "600", color: "#0F172A" }}>{m.nombre}</td>
                <td style={{ padding: "14px 16px", color: "#334155" }}>
                  <span style={{ background: "#F1F5F9", color: "#475569", padding: "4px 10px", borderRadius: "6px", fontSize: "13px" }}>
                    {m.especialidad}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: m.turno === "Matutino" ? "#FEF3C7" : "#E0F2FE", color: m.turno === "Matutino" ? "#92400E" : "#0369A1", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                    {m.turno === "Matutino" ? <Sun size={14} /> : <Moon size={14} />}
                    {m.turno}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.45)', backdropFilter: "blur(3px)", display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '28px', borderRadius: '16px', width: '420px', boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0F172A" }}>Agregar Nuevo Médico</h3>
              <button onClick={() => setMostrarFormulario(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={20} /></button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: "13px", fontWeight: "600", color: "#475569" }}>Nombre completo</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: "none", boxSizing: "border-box" }} placeholder="Ej. Dr. Roberto Carlos" />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: "13px", fontWeight: "600", color: "#475569" }}>Especialidad</label>
              <input type="text" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: "none", boxSizing: "border-box" }} placeholder="Ej. Neurología" />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: "13px", fontWeight: "600", color: "#475569" }}>Turno</label>
              <select value={turno} onChange={(e) => setTurno(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: "none", boxSizing: "border-box" }}>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setMostrarFormulario(false)} style={{ padding: '10px 16px', border: '1px solid #CBD5E1', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: "600", color: "#475569" }}>Cancelar</button>
              <button onClick={handleGuardar} style={{ padding: '10px 16px', border: 'none', borderRadius: '8px', background: '#0E7490', color: 'white', cursor: 'pointer', fontWeight: '600' }}>Guardar Médico</button>
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
    if (!paciente.trim() || !fecha.trim()) return alert("Por favor llena los campos obligatorios");

    const nuevaCita = { id: Date.now(), paciente, fecha, hora: hora || "09:00", estado: "Pendiente" };
    setCitas([...citas, nuevaCita]);

    if (setExpedientes) {
      const nuevoExpediente = {
        id: `EXP-00${Math.floor(Math.random() * 100) + 3}`,
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
    <div style={{ padding: "24px", fontFamily: mainFont, color: "#1E293B" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#0F172A", display: "flex", alignItems: "center", gap: "10px" }}>
            <Calendar size={26} color="#0E7490" /> Agenda de Citas
          </h2>
          <p style={{ margin: "4px 0 0 0", color: "#64748B", fontSize: "14px" }}>Agenda de nuevas citas médicas</p>
        </div>
        <button onClick={() => setMostrarFormulario(true)} style={{ background: "#0E7490", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 2px 4px rgba(14, 116, 144, 0.2)" }}>
          <Plus size={18} /> Nueva Cita
        </button>
      </div>

      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", border: "1px solid #E2E8F0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <tr>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Paciente</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Fecha</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Hora</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "14px 16px", fontWeight: "600", color: "#0F172A" }}>{c.paciente}</td>
                <td style={{ padding: "14px 16px", color: "#475569" }}>{c.fecha}</td>
                <td style={{ padding: "14px 16px", color: "#475569" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={14} color="#64748B" /> {c.hora}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: c.estado === "Confirmada" ? "#D1FAE5" : "#FEF3C7", color: c.estado === "Confirmada" ? "#065F46" : "#92400E" }}>
                    {c.estado === "Confirmada" ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {c.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.45)', backdropFilter: "blur(3px)", display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '28px', borderRadius: '16px', width: '420px', boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0F172A" }}>Agendar Nueva Cita</h3>
              <button onClick={() => setMostrarFormulario(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={20} /></button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: "13px", fontWeight: "600", color: "#475569" }}>Nombre del Paciente</label>
              <input type="text" value={paciente} onChange={(e) => setPaciente(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: "none", boxSizing: "border-box" }} placeholder="Ej. Ana López" />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: "13px", fontWeight: "600", color: "#475569" }}>Fecha</label>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: "13px", fontWeight: "600", color: "#475569" }}>Hora</label>
              <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setMostrarFormulario(false)} style={{ padding: '10px 16px', border: '1px solid #CBD5E1', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: "600", color: "#475569" }}>Cancelar</button>
              <button onClick={handleGuardar} style={{ padding: '10px 16px', border: 'none', borderRadius: '8px', background: '#0E7490', color: 'white', cursor: 'pointer', fontWeight: '600' }}>Guardar Cita</button>
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
    <div style={{ padding: "24px", fontFamily: mainFont, color: "#1E293B" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#0F172A", display: "flex", alignItems: "center", gap: "10px" }}>
          <FileText size={26} color="#0E7490" /> Expedientes Clínicos
        </h2>
        <p style={{ margin: "4px 0 0 0", color: "#64748B", fontSize: "14px" }}>Historial clínico de los pacientes registrados</p>
      </div>

      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", border: "1px solid #E2E8F0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <tr>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>No. Expediente</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Paciente</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Fecha</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Diagnóstico</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600", textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expedientes.map((e) => (
              <tr key={e.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "14px 16px", fontWeight: "700", color: "#0E7490" }}>{e.id}</td>
                <td style={{ padding: "14px 16px", fontWeight: "600", color: "#0F172A" }}>{e.paciente}</td>
                <td style={{ padding: "14px 16px", color: "#64748B" }}>{e.fecha}</td>
                <td style={{ padding: "14px 16px", color: "#334155" }}>{e.diagnostico}</td>
                <td style={{ padding: "14px 16px", textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "8px" }}>
                    <button onClick={() => abrirModal(e)} style={{ background: '#F0F9FF', color: '#0369A1', border: '1px solid #BAE6FD', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: "13px" }}>
                      <Eye size={15} /> Detalle
                    </button>
                    <button onClick={() => { if(window.confirm("¿Deseas borrar este expediente?")) setExpedientes(expedientes.filter(ex => ex.id !== e.id)) }} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: "13px" }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {expedienteSeleccionado && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.45)', backdropFilter: "blur(3px)", display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '28px', borderRadius: '16px', width: '520px', boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: '#0E7490', fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                <FileText size={20} /> Expediente: {expedienteSeleccionado.id}
              </h3>
              <button onClick={() => setExpedienteSeleccionado(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={20} /></button>
            </div>

            <div style={{ background: "#F8FAFC", borderRadius: "10px", padding: "16px", marginBottom: "20px", border: "1px solid #E2E8F0" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: "1px solid #E2E8F0" }}>
                <span style={{ color: '#64748B', fontSize: "13px" }}>Paciente:</span>
                <span style={{ fontWeight: '700', color: "#0F172A" }}>{expedienteSeleccionado.paciente}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: "1px solid #E2E8F0" }}>
                <span style={{ color: '#64748B', fontSize: "13px" }}>Médico Tratante:</span>
                <span style={{ fontWeight: '600', color: "#334155" }}>{expedienteSeleccionado.medico}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: "1px solid #E2E8F0" }}>
                <span style={{ color: '#64748B', fontSize: "13px" }}>Tipo de Sangre:</span>
                <span style={{ color: '#DC2626', fontWeight: '700', display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <Droplet size={14} /> {expedienteSeleccionado.sangre}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
                <span style={{ color: '#64748B', fontSize: "13px" }}>Alergias:</span>
                <span style={{ color: '#D97706', fontWeight: '600', display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <AlertCircle size={14} /> {expedienteSeleccionado.alergias}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", marginBottom: '8px' }}>
                <span style={{ fontWeight: '600', color: '#334155', fontSize: "14px" }}>Notas Médicas:</span>
                {!editando && (
                  <button onClick={() => setEditando(true)} style={{ background: 'none', border: 'none', color: '#0E7490', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: "flex", alignItems: "center", gap: "4px" }}>
                    <Edit3 size={14} /> Editar
                  </button>
                )}
              </div>

              {editando ? (
                <div>
                  <textarea 
                    value={nuevasNotas} 
                    onChange={(e) => setNuevasNotas(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #0E7490', minHeight: '90px', fontFamily: 'inherit', fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                    <button onClick={() => setEditando(false)} style={{ padding: '6px 12px', border: '1px solid #CBD5E1', background: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: "13px" }}>Cancelar</button>
                    <button onClick={guardarCambios} style={{ padding: '6px 14px', border: 'none', background: '#0E7490', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: "13px" }}>Guardar</button>
                  </div>
                </div>
              ) : (
                <p style={{ background: '#FFF', padding: '12px', borderRadius: '8px', color: '#475569', margin: 0, fontSize: "14px", border: "1px solid #E2E8F0", lineHeight: "1.5" }}>
                  {expedienteSeleccionado.notas}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setExpedienteSeleccionado(null)} style={{ padding: '8px 20px', border: 'none', borderRadius: '8px', background: '#64748B', color: 'white', cursor: 'pointer', fontWeight: '600' }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


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
    <div style={{ padding: "24px", fontFamily: mainFont, color: "#1E293B" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#0F172A", display: "flex", alignItems: "center", gap: "10px" }}>
          <Activity size={26} color="#0E7490" /> Consultas del Día
        </h2>
        <p style={{ margin: "4px 0 0 0", color: "#64748B", fontSize: "14px" }}>Consultas</p>
      </div>

      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", border: "1px solid #E2E8F0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <tr>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Paciente</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Motivo</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Hora</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600" }}>Estado</th>
              <th style={{ padding: "14px 16px", color: "#475569", fontWeight: "600", textAlign: "right" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "14px 16px", fontWeight: "600", color: "#0F172A" }}>{c.paciente}</td>
                <td style={{ padding: "14px 16px", color: "#334155" }}>{c.motivo}</td>
                <td style={{ padding: "14px 16px", color: "#64748B" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={14} /> {c.hora}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ 
                    padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                    background: c.estado === "Terminada" ? "#D1FAE5" : c.estado === "En curso" ? "#DBEAFE" : "#FEF3C7", 
                    color: c.estado === "Terminada" ? "#065F46" : c.estado === "En curso" ? "#1E40AF" : "#92400E" 
                  }}>
                    {c.estado}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", textAlign: "right" }}>
                  {c.estado !== "Terminada" && (
                    <button onClick={() => cambiarEstado(c.id)} style={{ background: '#F8FAFC', color: '#0E7490', border: '1px solid #0E7490', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                      {c.estado === "Pendiente" ? "Iniciar Consulta" : "Finalizar Consulta"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export function Reportes() {
  return (
    <div style={{ padding: "24px", fontFamily: mainFont, color: "#1E293B" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#0F172A", display: "flex", alignItems: "center", gap: "10px" }}>
          <TrendingUp size={26} color="#0E7490" /> Reportes y Estadísticas
        </h2>
        <p style={{ margin: "4px 0 0 0", color: "#64748B", fontSize: "14px" }}></p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "#E0F2FE", padding: "14px", borderRadius: "12px" }}><User size={24} color="#0E7490" /></div>
          <div>
            <h3 style={{ color: "#64748B", fontSize: "13px", fontWeight: "600", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Pacientes</h3>
            <p style={{ fontSize: "28px", fontWeight: "700", color: "#0F172A", margin: 0 }}>70</p>
          </div>
        </div>

        <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "#D1FAE5", padding: "14px", borderRadius: "12px" }}><CheckCircle size={24} color="#059669" /></div>
          <div>
            <h3 style={{ color: "#64748B", fontSize: "13px", fontWeight: "600", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Citas Completadas</h3>
            <p style={{ fontSize: "28px", fontWeight: "700", color: "#0F172A", margin: 0 }}>12</p>
          </div>
        </div>

        <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "#FEF3C7", padding: "14px", borderRadius: "12px" }}><Clock size={24} color="#D97706" /></div>
          <div>
            <h3 style={{ color: "#64748B", fontSize: "13px", fontWeight: "600", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Citas Pendientes</h3>
            <p style={{ fontSize: "28px", fontWeight: "700", color: "#0F172A", margin: 0 }}>4</p>
          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
        <h3 style={{ margin: "0 0 20px 0", color: "#0F172A", fontSize: "16px", fontWeight: "700" }}>Ingresos del Mes</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", height: "180px", paddingTop: "20px" }}>
          <div style={{ flex: 1, background: "#BAE6FD", height: "40%", borderRadius: "8px 8px 0 0", position: "relative" }}>
            <span style={{ position: "absolute", bottom: "-25px", width: "100%", textAlign: "center", fontSize: "13px", color: "#64748B", fontWeight: "500" }}>Ene</span>
          </div>
          <div style={{ flex: 1, background: "#BAE6FD", height: "60%", borderRadius: "8px 8px 0 0", position: "relative" }}>
            <span style={{ position: "absolute", bottom: "-25px", width: "100%", textAlign: "center", fontSize: "13px", color: "#64748B", fontWeight: "500" }}>Feb</span>
          </div>
          <div style={{ flex: 1, background: "#BAE6FD", height: "80%", borderRadius: "8px 8px 0 0", position: "relative" }}>
            <span style={{ position: "absolute", bottom: "-25px", width: "100%", textAlign: "center", fontSize: "13px", color: "#64748B", fontWeight: "500" }}>Mar</span>
          </div>
          <div style={{ flex: 1, background: "#0E7490", height: "100%", borderRadius: "8px 8px 0 0", position: "relative" }}>
            <span style={{ position: "absolute", bottom: "-25px", width: "100%", textAlign: "center", fontSize: "13px", color: "#0E7490", fontWeight: "700" }}>Abr</span>
          </div>
        </div>
      </div>
    </div>
  );
}