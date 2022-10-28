import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home.jsx";
import Usuarios from "./pages/Usuarios";
import Proyectos from "./pages/Proyectos";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/usuarios" element={<Usuarios/>}/>
          <Route path="/proyectos" element={<Proyectos/>}/>
          {/* <Route path="/venta/:nuevo" element={<VentaNuevo/>}/>
          <Route path="/productos" element={<Productos/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
