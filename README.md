# VITACARE - Sistema de Gestión de citas

Sistema web para la administración de una clinica. Desarrollado con React y Vite como una SPA.

---

## Integrantes del Equipo
* **Evelin Aleida Pablo Delgado** 
* **Zeferino**

---

## API Utilizada 
Para la carga inicial, gestión y simulación de la base de datos de los pacientes, utilizamos:
* **API:** [DummyJSON Users API](https://dummyjson.com/users)
* **Endpoint:** `https://dummyjson.com/users?limit=100`
* **Implementación:** Las llamadas a la API se centralizaron en la capa de servicio `src/api/vitacareApi.js`, procesando los datos para formatear nombres completos, géneros, números de teléfono con LADA mexicana (`951`) y asignación dinámica de estados (*Activo* / *Pendiente*).

---

## Proyecto Desplegado (VPS)
El proyecto se encuentra compilado en estático y servido mediante un servidor web **Nginx** sobre un entorno **Ubuntu Linux VPS**.

* **Link de acceso al sistema:** [http://TU_IP_O_DOMINIO_DEL_VPS](http://TU_IP_O_DOMINIO_DEL_VPS)

---

## Tecnologías y Librerías
* **Frontend:** React + Vite
* **Iconografía:** `lucide-react`
* **Servidor Web:** Nginx (VPS Ubuntu Linux)
* **Control de Versiones:** Git / GitHub



---

