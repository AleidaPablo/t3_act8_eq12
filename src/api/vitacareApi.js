const BASE_URL = "https://dummyjson.com";
export async function loginService(username, password) {
  const respuesta = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.trim(),
      password,
    }),
  });
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(datos.message || "Usuario o contraseña incorrectos.");
  }
  return datos;
}
export async function fetchPacientesService() {
  const res = await fetch(`${BASE_URL}/users?limit=100`);
  if (!res.ok) {
    throw new Error("No se pudieron obtener los datos de los pacientes.");
  }
  const data = await res.json();
  const usuariosBase = data.users.slice(0, 70);
  return usuariosBase.map((u, index) => {
    const esPendiente = index >= 50;
    return {
      id: `P-00${u.id}`,
      rawId: u.id,
      nombre: `${u.firstName} ${u.lastName}`,
      correo: u.email,
      iniciales: `${u.firstName[0]}${u.lastName[0]}`,
      edad: u.age,
      sexo: u.gender === "female" ? "F" : "M",
      telefono: `951 ${200 + index * 3} ${10 + (index % 80)} ${12 + (index % 70)}`,
      ultimaVisita: `${10 + (index % 15)} oct 2026`,
      estado: esPendiente ? "Pendiente" : "Activo",
      colorClass:
        index % 4 === 0
          ? "verde"
          : index % 4 === 1
          ? "azul"
          : index % 4 === 2
          ? "turquesa"
          : "morado",
    };
  });
}