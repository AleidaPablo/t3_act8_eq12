import { X } from "lucide-react";

export default function HistorialModal({ paciente, onClose }) {
  if (!paciente) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card modal-historial-amplio">
        <div className="modal-historial-header">
          <div>
            <h3>Historial clínico</h3>
            <p className="subtitulo-modal">
              Expediente No: <b>Exp-{paciente.rawId + 1000}</b>
            </p>
          </div>
          <button className="btn-cerrar-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="ficha-tarjeta">
          <div className="ficha-grid">
            <div className="ficha-item">
              <span className="ficha-label">Nombre completo</span>
              <span className="ficha-valor valor-destacado">
                {paciente.nombre}
              </span>
            </div>

            <div className="ficha-item">
              <span className="ficha-label">Sexo</span>
              <span className="ficha-valor">
                {paciente.sexo === "F" ? "Femenino" : "Masculino"}
              </span>
            </div>

            <div className="ficha-item">
              <span className="ficha-label">Edad</span>
              <span className="ficha-valor">{paciente.edad} años</span>
            </div>

            <div className="ficha-item">
              <span className="ficha-label">Fecha de nacimiento</span>
              <span className="ficha-valor">
                15 de marzo de {2026 - paciente.edad}
              </span>
            </div>

            <div className="ficha-item span-2">
              <span className="ficha-label">Domicilio</span>
              <span className="ficha-valor">
                Av. Hidalgo Num. 123, Col. Centro
              </span>
            </div>

            <div className="ficha-item">
              <span className="ficha-label">Estado civil</span>
              <span className="ficha-valor">Soltero(a)</span>
            </div>

            <div className="ficha-item">
              <span className="ficha-label">Ocupación</span>
              <span className="ficha-valor">Trabajador(a)</span>
            </div>

            <div className="ficha-item">
              <span className="ficha-label">Teléfono de contacto</span>
              <span className="ficha-valor">{paciente.telefono}</span>
            </div>

            <div className="ficha-item item-medico">
              <span className="ficha-label">Tipo de sangre</span>
              <span className="ficha-valor badge-sangre">B+</span>
            </div>

            <div className="ficha-item span-2 item-medico">
              <span className="ficha-label">Contacto de emergencia</span>
              <span className="ficha-valor">Beatriz Pablo (951 219 12 34)</span>
            </div>

            <div className="ficha-item">
              <span className="ficha-label">Seguro médico</span>
              <span className="ficha-valor">IMSS</span>
            </div>

            <div className="ficha-item">
              <span className="ficha-label">NSS</span>
              <span className="ficha-valor">4589230192</span>
            </div>
          </div>
        </div>

        <div className="modal-acciones">
          <button className="btn-cancelar" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}