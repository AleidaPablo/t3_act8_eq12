import { useState } from "react";

// --- MÓDULO DE MÉDICOS ---
export function Medicos() {
  const [medicos, setMedicos] = useState([
    { id: 1, nombre: "Dr. Alejandro Gómez", especialidad: "Cardiología", turno: "Matutino" },
    { id: 2, nombre: "Dra. Beatriz Silva", especialidad: "Pediatría", turno: "Vespertino" },
  ]);

  const agregarMedico = () => {
    const nuevo = { id: Date.now(), nombre: "Dr. Nuevo Ingreso", especialidad: "General", turno: "Matutino" };
    setMedicos([...medicos, nuevo]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Gestión de Médicos</h2>
        <button onClick={agregarMedico} style={{ background: "#0E7490", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
          + Agregar Médico
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
    </div>
  );
}

// --- MÓDULO DE CITAS ---
export function Citas() {
  const [citas, setCitas] = useState([
    { id: 1, paciente: "Lucía Hernández", fecha: "2026-10-25", hora: "10:00", estado: "Confirmada" },
    { id: 2, paciente: "Carlos Mendoza", fecha: "2026-10-26", hora: "11:30", estado: "Pendiente" },
  ]);

  const agregarCita = () => {
    const nueva = { id: Date.now(), paciente: "Nuevo Paciente", fecha: "2026-10-27", hora: "09:00", estado: "Pendiente" };
    setCitas([...citas, nueva]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Agenda de Citas</h2>
        <button onClick={agregarCita} style={{ background: "#0E7490", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
          + Nueva Cita
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
                <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "12px", background: c.estado === "Confirmada" ? "#D1FAE5" : "#FEF3C7", color: c.estado === "Confirmada" ? "#065F46" : "#92400E" }}>
                  {c.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- MÓDULO DE REPORTES ---
export function Reportes() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Reportes y Estadísticas</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1, background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h3 style={{ color: "#6B7280", fontSize: "14px", marginBottom: "10px" }}>Ingresos del Mes</h3>
          <p style={{ fontSize: "36px", fontWeight: "bold", color: "#0E7490" }}>$ 45,200.00</p>
        </div>
        <div style={{ flex: 1, background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h3 style={{ color: "#6B7280", fontSize: "14px", marginBottom: "10px" }}>Total de Pacientes</h3>
          <p style={{ fontSize: "36px", fontWeight: "bold", color: "#14B8A6" }}>1,248</p>
        </div>
      </div>
    </div>
  );
}

// --- MÓDULO DE EXPEDIENTES CLÍNICOS ---
export function Expedientes() {
  const [expedientes] = useState([
    { id: "EXP-001", paciente: "Lucía Hernández", fecha: "2026-10-20", diagnostico: "Hipertensión leve", medico: "Dr. Alejandro Gómez" },
    { id: "EXP-002", paciente: "Carlos Mendoza", fecha: "2026-10-21", diagnostico: "Control de diabetes", medico: "Dra. Beatriz Silva" },
  ]);

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
            <th style={{ padding: "15px" }}>Médico Tratante</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((e) => (
            <tr key={e.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
              <td style={{ padding: "15px", fontWeight: "bold", color: "#0E7490" }}>{e.id}</td>
              <td style={{ padding: "15px" }}>{e.paciente}</td>
              <td style={{ padding: "15px" }}>{e.fecha}</td>
              <td style={{ padding: "15px" }}>{e.diagnostico}</td>
              <td style={{ padding: "15px" }}>{e.medico}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- MÓDULO DE CONSULTAS ---
export function Consultas() {
  const [consultas] = useState([
    { id: 1, paciente: "Sofía Ramírez", motivo: "Dolor de cabeza", hora: "09:00", estado: "En curso" },
    { id: 2, paciente: "Elesvan Pablo", motivo: "Revisión general", hora: "10:30", estado: "Terminada" },
  ]);

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
          </tr>
        </thead>
        <tbody>
          {consultas.map((c) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
              <td style={{ padding: "15px", fontWeight: "bold" }}>{c.paciente}</td>
              <td style={{ padding: "15px" }}>{c.motivo}</td>
              <td style={{ padding: "15px" }}>{c.hora}</td>
              <td style={{ padding: "15px" }}>
                <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "12px", background: c.estado === "En curso" ? "#DBEAFE" : "#F1F5F9", color: c.estado === "En curso" ? "#1E40AF" : "#475569" }}>
                  {c.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}