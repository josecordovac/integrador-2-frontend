import React, { useState, useEffect } from "react";
import Filtrar from "../components/Filtrar/Filtrar";
import Header from "../components/Header/Header";
import Grid from "@material-ui/core/Grid";
import { handleInputChanges } from "../helpers/functions";
import InputComponent from "../components/form/input/InputComponent";
import SelectComponent from "../components/form/select/SelectComponent";
import { HeadTable } from "../interfaces/headTable";
import { RequestUtil } from "../util/RequestUtil";
import { Select } from "../interfaces/select";
import { FilterProject, Projects } from "../interfaces/project";

const Proyectos = () => {
  const [listProyect, setListProyect] = useState<Projects[] | []>([]);
  const [listProyectType, setListProyectType] = useState<Select[] | []>([]);
  const [listState, setListState] = useState<Select[] | []>([]);
  const [listClients, setListClients] = useState<Select[] | []>([]);
  const [data, setData] = useState<FilterProject>({
    id_estado: 0,
    id_cliente: 0,
    id_tipo: 0,
    nombre: "",
    codigo_gestion: "",
  });
  const [ pagination, setPagination ] = useState( { rowsPerPage: 10, page: 0, total: 0 } );

  const getProjectType = () => {
    RequestUtil.postData({
      url: "get-data",
      queryId: 5,   
      fnOk({dataList}) {
        setListProyectType(dataList);
      }
    });
  };

  const getStates = () => {
    RequestUtil.postData({
      url: "get-data",
      queryId: 3,   
      fnOk({dataList}) {
        setListState(dataList);
      }
    });
  };

  const getClients = () => {
    RequestUtil.postData({
      url: "get-data",
      queryId: 1,   
      fnOk({dataList}) {
        setListClients(dataList);
      }
    });
  };

  const listProjects = (rowsPerPage: number, page: number) => {
    console.log(data);
    RequestUtil.postData({
      url: "save-data",
      queryId: 7,   
      params: {
        ...data,
        StartRow: rowsPerPage,
        EndRow: page,
      },
      fnOk(resp) {
        setListProyect(resp.dataList);
        setPagination({total: resp.total, page, rowsPerPage});      
      }
    });
  };

  const clearData = () => {
    setData({
      id_estado: 0,
      id_cliente: 0,
      id_tipo: 0,
      nombre: "",
      codigo_gestion: "",
    })
  };

  const headTable: HeadTable[] = [
    { name: "N°" },
    { name: "NOMBRE DE PROYECTO" },
    { name: "COD. GESTION" },
    { name: "CLIENTE" },
    { name: "FECHA INICIO" },
    { name: "FECHA FIN" },
    { name: "HORAS PLANIFICADAS" },
    { name: "ESTADO" },
    { name: "ACCION" },
  ];

  const newRoute: string = "/proyectos/new";
  const route: string = "/proyectos/";

  const fields:JSX.Element =  
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <InputComponent
          label="Nombre"
          name="nombre"
          value={data.nombre}
          onChange={(e) => handleInputChanges(e, data, setData)}
          type="text"
        /> 
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <InputComponent
        label="Codigo Gestion"
        name="codigo_gestion"
        value={data.codigo_gestion}
        onChange={(e) => handleInputChanges(e, data, setData)}
        type="text"
      />
      </Grid>
      <Grid item xs={5} sm={5} md={5} lg={2} xl={2}>
        <SelectComponent
          label="Tipo de proyecto"
          list={listProyectType}
          name="id_tipo"
          value={data.id_tipo}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
      <Grid item xs={5} sm={5} md={5} lg={2} xl={2}>
        <SelectComponent
          label="Estado del proyecto"
          list={listState}
          name="id_estado"
          value={data.id_estado}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
      <Grid item xs={5} sm={5} md={3} lg={2} xl={2}>
        <SelectComponent
          label="Seleccione un cliente"
          list={listClients}
          name="id_cliente"
          value={data.id_cliente}
          onChange={(e) => handleInputChanges(e, data, setData)}
        />
      </Grid>
    </Grid>

  useEffect(() => {
    getProjectType();
    getStates();
    getClients();
    listProjects(pagination.rowsPerPage, pagination.page);
  }, []);

  return (
    <>
      <Header />
      <Filtrar
        headTable={headTable}
        newRoute={newRoute}
        route={route}
        tableName={"Lista de proyectos"}
        fields={fields}
        resultListTable={listProyect}
        functionSearchTable={listProjects}
        clearData={clearData}
        pagination={pagination}
      />
    </>
  );
};

export default Proyectos;
