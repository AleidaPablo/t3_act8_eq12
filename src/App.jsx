import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import HistorialModal from "./components/HistorialModal";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import { fetchPacientesService } from "./api/vitacareApi";
import "./App.css";

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
  const [limite] = useState(Number(getUrlParam("limit", 10)));
  const [busqueda, setBusqueda] = useState(getUrlParam("search", ""));
  const [filtroTab, setFiltroTab] = useState("todos");

  const [pacienteHistorial, setPacienteHistorial] = useState(null);

  const actualizarURL = (nuevaPag, nuevoLim, nuevaBusq) => {
    const params = new URLSearchParams();
    params.set("page", nuevaPag);
    params.set("limit", nuevoLim);
    if (nuevaBusq) params.set("search", nuevaBusq);
    window.history.pushState({}, "", `?${params.toString()}`);
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
      if (filtroTab === "pendientes") return p.estado === "Pendiente";
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
  }, [todosLosPacientes, filtroTab, busqueda, pagina, limite]);

  const listaFiltradaBase = todosLosPacientes.filter((p) => {
    if (filtroTab === "pendientes") return p.estado === "Pendiente";
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

  if (!usuario) {
    return <Login onLoginExitoso={(datos) => setUsuario(datos)} />;
  }

  return (
    <div className="sistema-contenedor">
      <Sidebar
        vista={vista}
        setVista={setVista}
        onCerrarSesion={handleCerrarSesion} />

      <div className="principal-wrapper">
        <Navbar vista={vista} usuario={usuario} />

        <main className="dashboard-contenido">
          {vista === "pacientes" ? (
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
              onVerHistorial={(paciente) => setPacienteHistorial(paciente)}/>
          ) : (
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
  );
}

export default App;