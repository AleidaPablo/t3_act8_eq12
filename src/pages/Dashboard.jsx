import { Calendar, ChevronDown, Users } from "lucide-react";

export default function Dashboard({ usuario, totalPacientes }) {
  return (
    <>
      <div className="dashboard-encabezado">
        <h1>Buen día, Dra. {usuario.firstName}</h1>
        <div className="selector-fecha">
          <Calendar size={16} />
          <span>Martes, 20 de octubre 2026</span>
          <ChevronDown size={14} />
        </div>
      </div>

      <div className="tarjetas-grid">
        <div className="tarjeta-metrica">
          <div className="tarjeta-info">
            <span className="tarjeta-titulo">Pacientes registrados</span>
            <span className="tarjeta-numero">{totalPacientes || 70}</span>
          </div>
          <div className="tarjeta-icono">
            <Users size={20} />
          </div>
        </div>

        <div className="tarjeta-metrica destacada">
          <div className="tarjeta-info">
            <span className="tarjeta-titulo">Citas hoy</span>
            <span className="tarjeta-numero">4</span>
          </div>
          <div className="tarjeta-icono">
            <Calendar size={20} />
          </div>
        </div>
      </div>

      <section className="citas-seccion">
        <h2>Próximas citas del día</h2>
        <div className="tabla-contenedor">
          <table className="tabla-citas">
            <thead>
              <tr>
                <th>HORA</th>
                <th>PACIENTE / CONSULTA</th>
                <th>MOTIVO DE CITA</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="hora">10:30</td>
                <td>
                  <div className="paciente-celda">
                    <span className="avatar-iniciales verde">LH</span>
                    <span className="nombre-paciente">Lucía Hernández</span>
                  </div>
                </td>
                <td className="profesional">Revisión médica</td>
                <td>
                  <span className="badge activo">Confirmada</span>
                </td>
              </tr>
              <tr>
                <td className="hora">11:00</td>
                <td>
                  <div className="paciente-celda">
                    <span className="avatar-iniciales azul">CM</span>
                    <span className="nombre-paciente">Carlos Mendoza</span>
                  </div>
                </td>
                <td className="profesional">Control de enfermedad crónica</td>
                <td>
                  <span className="badge activo">Confirmada</span>
                </td>
              </tr>
              <tr>
                <td className="hora">11:30</td>
                <td>
                  <div className="paciente-celda">
                    <span className="avatar-iniciales turquesa">SR</span>
                    <span className="nombre-paciente">Sofía Ramírez</span>
                  </div>
                </td>
                <td className="profesional">Seguimiento post-hospitalario</td>
                <td>
                  <span className="badge pendiente">Pendiente</span>
                </td>
              </tr>
              <tr>
                <td className="hora">11:30</td>
                <td>
                  <div className="paciente-celda">
                    <span className="avatar-iniciales turquesa">EP</span>
                    <span className="nombre-paciente">Elesvan Pablo</span>
                  </div>
                </td>
                <td className="profesional">Revisión médica</td>
                <td>
                  <span className="badge pendiente">Pendiente</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}