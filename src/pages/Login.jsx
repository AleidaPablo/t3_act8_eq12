import { useState } from "react";
import { Mail, LockKeyhole, Eye, EyeOff, ArrowRight, Stethoscope } from "lucide-react";
import { loginService } from "../api/vitacareApi";

export default function Login({ onLoginExitoso }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMensaje("");

    if (!username.trim() || !password.trim()) {
      setErrorMensaje("Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    setCargando(true);

    try {
      const datosUsuario = await loginService(username, password);
      onLoginExitoso(datosUsuario);
    } catch (err) {
      setErrorMensaje(err.message || "Ocurrió un error al intentar conectar.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="login">
      <section className="login-imagen">
        <div className="logo">
          <span className="logo-icono">
            <Stethoscope size={27} />
          </span>
          <span>VITACARE</span>
        </div>

        <div className="texto-imagen">
          <h2>Tu salud es nuestra prioridad.</h2>
          <p>Tu clínica desde un solo lugar.</p>
        </div>
      </section>

      <section className="login-formulario">
        <div className="formulario-contenido">
          <h1>Bienvenida de nuevo</h1>
          <p className="subtitulo">Tu clínica en un solo lugar.</p>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="username">Correo electrónico o usuario</label>
            <div className="campo">
              <Mail size={19} />
              <input
                id="username"
                type="text"
                placeholder="correo@ejemplo.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  />
            </div>
            <label htmlFor="password">Contraseña</label>
            <div className="campo">
              <LockKeyhole size={19} />
              <input
                id="password"
                type={mostrarPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  />
              <button
                type="button"
                className="ver-password"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                aria-label="Mostrar u ocultar contraseña" >
                {mostrarPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
            {errorMensaje && (
              <p className="mensaje-error" role="alert">
                {errorMensaje}
              </p>
            )}
            <button type="submit" className="boton-login" disabled={cargando}>
              {cargando ? "Iniciando sesión..." : "Entrar al sistema"}
              {!cargando && <ArrowRight size={19} />}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}