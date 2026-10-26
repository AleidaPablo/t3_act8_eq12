import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom"; 
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import HistorialModal from "./components/HistorialModal";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import "./App.css";
import { Medicos, Citas, Reportes, Expedientes, Consultas } from "./pages/ModulosExtras";

import { 
  fetchPacientesService, 
  agregarPacienteService, 
  editarPacienteService, 
  eliminarPacienteService 
} from "./api/vitacareApi";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("panel");

  const [todosLosPacientes, setTodosLosPacientes] = useState([]);
  const [pacientesPaginados, setPacientesPaginados] = useState([]);
  const [cargandoTabla, setCargandoTabla] = useState(false);
  const [errorTabla, setErrorTabla] = useState(null);
  
  const getUrlParam = (param, defaultValue) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || defaultValue;
  };

  const [pagina, setPagina] = useState(Number(getUrlParam("page", 1)));
  const [limite, setLimite] = useState(Number(getUrlParam("limit", 10)));
  const [busqueda, setBusqueda] = useState(getUrlParam("search", ""));
  const [filtroTab, setFiltroTab] = useState("todos");
  const [filtroSexo, setFiltroSexo] = useState("todos");

  const [pacienteHistorial, setPacienteHistorial] = useState(null);
  
  const [expedientesGlobales, setExpedientesGlobales] = useState([
    { id: "EXP-001", paciente: "Lucía Hernández", fecha: "2026-10-20", diagnostico: "Hipertensión leve", medico: "Dr. Alejandro Gómez", sangre: "O+", alergias: "Penicilina", notas: "Paciente estable, continuar con tratamiento." },
    { id: "EXP-002", paciente: "Carlos Mendoza", fecha: "2026-10-21", diagnostico: "Control de diabetes", medico: "Dra. Beatriz Silva", sangre: "A-", alergias: "Ninguna", notas: "Ajustar dosis de insulina." },
  ]);

  const actualizarURL = (nuevaPag, nuevoLim, nuevaBusq) => {
    const params = new URLSearchParams();
    params.set("page", nuevaPag);
    params.set("limit", nuevoLim);
    if (nuevaBusq) params.set("search", nuevaBusq);
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  const cargarPacientes = async () => {
    setCargandoTabla(true);
    setErrorTabla(null);
    try {
      const pacientesData = await fetchPacientesService();
      setTodosLosPacientes(pacientesData);
    } catch (err) {
      setErrorTabla(err.message);
    } finally {
      setCargandoTabla(false);
    }
  };

  useEffect(() => {
    if (usuario && todosLosPacientes.length === 0) {
      cargarPacientes();
    }
  }, [usuario]);

  useEffect(() => {
    if (todosLosPacientes.length === 0) return;

    let filtrados = todosLosPacientes.filter((p) => {
      if (filtroTab === "pendientes" && p.estado !== "Pendiente") return false;
      if (filtroSexo !== "todos" && p.sexo !== filtroSexo) return false;
      return true;
    });

    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase().trim();
      filtrados = filtrados.filter(
        (p) =>
          p.nombre.toLowerCase().includes(termino) ||
          p.correo.toLowerCase().includes(termino) ||
          p.id.toLowerCase().includes(termino)
      );
    }

    const inicio = (pagina - 1) * limite;
    const fin = inicio + limite;
    setPacientesPaginados(filtrados.slice(inicio, fin));

    actualizarURL(pagina, limite, busqueda);
  }, [todosLosPacientes, filtroTab, filtroSexo, busqueda, pagina, limite]);

  const listaFiltradaBase = todosLosPacientes.filter((p) => {
    if (filtroTab === "pendientes" && p.estado !== "Pendiente") return false;
    if (filtroSexo !== "todos" && p.sexo !== filtroSexo) return false;
    if (busqueda.trim()) {
      const t = busqueda.toLowerCase().trim();
      return (
        p.nombre.toLowerCase().includes(t) ||
        p.correo.toLowerCase().includes(t) ||
        p.id.toLowerCase().includes(t)
      );
    }
    return true;
  });

  const totalPaginas = Math.ceil(listaFiltradaBase.length / limite) || 1;

  function handleCerrarSesion() {
    setUsuario(null);
  }

  const handleAgregarPaciente = async (nuevoPaciente) => {
    try {
      const pacienteCreado = await agregarPacienteService({
        firstName: nuevoPaciente.firstName,
        lastName: nuevoPaciente.lastName || "Sin Apellido",
        age: nuevoPaciente.age
      });
      
      const nuevoPacienteAdaptado = {
        id: `P-00${pacienteCreado.id}`,
        rawId: pacienteCreado.id,
        nombre: `${pacienteCreado.firstName} ${pacienteCreado.lastName || ""}`,
        correo: "nuevo@clinica.com",
        iniciales: `${pacienteCreado.firstName[0]}${pacienteCreado.lastName ? pacienteCreado.lastName[0] : "N"}`,
        edad: pacienteCreado.age,
        sexo: "M",
        telefono: "951 000 00 00",
        ultimaVisita: "Hoy",
        estado: "Activo",
        colorClass: "verde",
      };
      
      setTodosLosPacientes([nuevoPacienteAdaptado, ...todosLosPacientes]);
    } catch (err) {
      alert("Hubo un problema al conectar con la API.");
    }
  };

  const handleEditarPaciente = async (rawId) => {
    if (!window.confirm("¿Estás seguro de editar este paciente?")) return;
    const nuevoNombre = prompt("Ingresa el nuevo nombre del paciente:");
    if (!nuevoNombre) return;

    try {
      await editarPacienteService(rawId, { firstName: nuevoNombre });
      setTodosLosPacientes(
        todosLosPacientes.map(p => 
          p.rawId === rawId ? { ...p, nombre: nuevoNombre } : p
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEliminarPaciente = async (rawId) => {
    if (!window.confirm("¿Estás seguro de eliminar este paciente?")) return;
    try {
      await eliminarPacienteService(rawId);
      setTodosLosPacientes(todosLosPacientes.filter(p => p.rawId !== rawId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (!usuario) {
    return (
      <BrowserRouter>
        <Login onLoginExitoso={(datos) => setUsuario(datos)} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="sistema-contenedor">
        <Sidebar
          vista={vista}
          setVista={setVista}
          onCerrarSesion={handleCerrarSesion} />

        <div className="principal-wrapper">
          
          {/* LE PASAMOS SETVISTA Y SETBUSQUEDA AL NAVBAR */}
          <Navbar 
            vista={vista} 
            usuario={usuario} 
            setVista={setVista} 
            setBusquedaGlobal={(texto) => {
              setBusqueda(texto);
              setPagina(1);
            }} 
          />

          <main className="dashboard-contenido">
            
            {vista === "pacientes" && (
              <Pacientes
                todosLosPacientes={todosLosPacientes}
                pacientesPaginados={pacientesPaginados}
                filtroTab={filtroTab}
                setFiltroTab={setFiltroTab}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                pagina={pagina}
                setPagina={setPagina}
                totalPaginas={totalPaginas}
                cargandoTabla={cargandoTabla}
                errorTabla={errorTabla}
                onVerHistorial={(paciente) => setPacienteHistorial(paciente)}
                limite={limite}
                setLimite={setLimite}
                onAgregar={handleAgregarPaciente}
                onEditar={handleEditarPaciente}
                onEliminar={handleEliminarPaciente}
                filtroSexo={filtroSexo}
                setFiltroSexo={setFiltroSexo}
              />
            )}

            {vista === "medicos" && <Medicos />}
            {vista === "citas" && <Citas setExpedientes={setExpedientesGlobales} />}
            {vista === "reportes" && <Reportes />}
            {vista === "expedientes" && <Expedientes expedientes={expedientesGlobales} setExpedientes={setExpedientesGlobales} />}
            {vista === "consultas" && <Consultas />}

            {!["pacientes", "medicos", "citas", "reportes", "expedientes", "consultas"].includes(vista) && (
              <Dashboard
                usuario={usuario}
                totalPacientes={todosLosPacientes.length}/>
            )}

          </main>

          <HistorialModal
            paciente={pacienteHistorial}
            onClose={() => setPacienteHistorial(null)}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;