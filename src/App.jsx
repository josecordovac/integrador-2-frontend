import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home.jsx";
import Usuarios from "./pages/Usuarios";
import Proyectos from "./pages/Proyectos";
import UsuarioNuevo from "./pages/Nuevo/UsuarioNuevo";
import ProyectosNuevo from "./pages/Nuevo/ProyectosNuevo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/usuarios/:nuevo" element={<UsuarioNuevo />} />
          <Route path="/proyectos/:nuevo" element={<ProyectosNuevo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
