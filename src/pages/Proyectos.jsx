import React, { useState } from "react";
import Filtrar from "../components/Filtrar/Filtrar";
import Header from "../components/Header/Header";
import Grid from "@material-ui/core/Grid";
import { handleInputChanges } from "../helpers/functions";
import InputComponent from "../components/form/input/InputComponent";
import SelectComponent from "../components/form/select/SelectComponent";
const Proyectos = () => {
  const headTable = [
    { name: "N°" },
    { name: "NOMBRE DE PROYECTO" },
    { name: "COD. GESTION" },
    { name: "CLIENTE" },
    { name: "FECHA INICIO" },
    { name: "FECHA FIN" },
    { name: "HORAS PLANIFICADAS" },
    { name: "ESTADO" },
  ];

  const ruta = "/proyectos/new";

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

  const fields = (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} xxl={4}>
        <InputComponent
          label="Nombre"
          name="nombre"
          value={data.nombre}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={4}>
        <InputComponent
          label="Codigo Gestion"
          name="codigo_gestion"
          value={data.codigo_gestion}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={2}>
        <InputComponent
          type="date"
          label="Fecha Inicio:"
          name="fecha_inicio"
          value={data.fecha_inicio}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={2}>
        <InputComponent
          type="date"
          label="Fecha Fin:"
          name="fecha_fin"
          value={data.fecha_fin}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
      <Grid item xs={5} sm={5} md={5} lg={2} xl={2} xxl={3}>
        <SelectComponent
          label="Tipo de proyecto"
          list={[]}
          name="id_tipo"
          value={data.id_tipo}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
      <Grid item xs={5} sm={5} md={5} lg={2} xl={2} xxl={3}>
        <SelectComponent
          label="Estado del proyecto"
          list={[]}
          name="id_estado"
          value={data.id_estado}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
    </Grid>
  );

  return (
    <>
      <Header />
      <Filtrar
        headTable={headTable}
        ruta={ruta}
        tableName={"Lista de proyectos"}
        data={data}
        setData={setData}
        fields={fields}
      />
    </>
  );
};

export default Proyectos;
