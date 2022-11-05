import React, { useState } from "react";
import Header from "../components/Header/Header";
import Filtrar from "../components/Filtrar/Filtrar";

const Usuarios = () => {
  const headTable = [
    { name: "Código" },
    { name: "Nombre" },
    { name: "Apellido Paterno" },
    { name: "Apellido Materno" },
    { name: "Fecha Ingreso" },
    { name: "Estado" },
  ];

  const ruta = "/usuarios/new";

  const [data, setData] = useState({
    id_estado: 0,
    id_cliente: 0,
    id_tipo: 0,
    nombre: "",
    codigo_gestion: "",
    fecha_inicio: "",
    fecha_fin: "",
    horas_planificadas: "",
  });

  return (
    <>
      <Header />
      <Filtrar
        headTable={headTable}
        ruta={ruta}
        tableName={"Lista de usuarios"}
        data={data}
        setData={setData}
      />
    </>
  );
};

export default Usuarios;
