import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import InputComponent from "../../components/form/input/InputComponent";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CheckIcon from "@material-ui/icons/Check";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SelectComponent from "../../components/form/select/SelectComponent";
import { handleInputChanges } from "../../helpers/functions";
import { RequestUtil } from "../../util/RequestUtil";
import { useEffect } from "react";
import { DataNewProject, ProyectTable, TableProyectosProps } from "../../interfaces/projectNew";
import { Select } from "../../interfaces/select";
import { MessageUtil } from "../../util/Swal";

const ProyectosNuevo = () => {
  const [data, setData] = useState<DataNewProject>({
    id_proyecto: 0,
    id_estado: 0,
    id_cliente: 0,
    id_tipo: 0,
    nombre: "",
    codigo_gestion: 0,
    fecha_inicio: "",
    fecha_fin: "",
    horas_planificadas: 0,
    horas: 0,
    monto: 0,
    id_empleado: 0,
    id_rol: 0,
  });
  const [proyectTable, setProyectTable] = useState<ProyectTable[]>([]);
  const [empleado, setEmpleado] = useState("");
  
  const [listClients, setListClients] = useState<Select[] | []>([]);
  const [listEmployees, setListEmployees] = useState<Select[] | []>([]);
  const [listState, setListState] = useState<Select[] | []>([]);
  const [listRol, setListRol] = useState<Select[] | []>([]);
  const [listProyectType, setListProyectType] = useState<Select[] | []>([]);

  const [rol, setRol] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getClients = () => {
    RequestUtil.postData({
      url: "get-data",
      queryId: 1,   
      fnOk({dataList}) {
        setListClients(dataList);
      }
    });
  }

  const getEmployees = () => {
    RequestUtil.postData({
      url: "get-data",
      queryId: 2,   
      fnOk({dataList}) {
        setListEmployees(dataList);
      }
    });
  }

  const getStates = () => {
    RequestUtil.postData({
      url: "get-data",
      queryId: 3,   
      fnOk({dataList}) {
        setListState(dataList);
      }
    });
  }

  const getRol = () => {
    RequestUtil.postData({
      url: "get-data",
      queryId: 4,   
      fnOk({dataList}) {
        setListRol(dataList);
      }
    });
  }

  const getProjectType = () => {
    RequestUtil.postData({
      url: "get-data",
      queryId: 5,   
      fnOk({dataList}) {
        setListProyectType(dataList);
      }
    });
  }

  const saveProyect = () => {
    console.log({ ...data, proyectoDetalle: proyectTable });

    RequestUtil.postData({
      url: "save-data",
      queryId: 6,
      params: { ...data, proyectoDetalle: proyectTable },
      fnOk(resp) {
        console.log(resp)
        MessageUtil('success', 'Datos guardados con exito!', 'se agrego un nuevo proyecto.');
      }
    })
  };

  const getProjectById = (id: string | undefined) => {
    console.log("id");
    console.log(JSON.stringify({ id_proyecto: id }));
    
    RequestUtil.postData({
      url: "save-data",
      queryId: 8,
      params: { id_proyecto: id },
      fnOk({dataObject}) {
        console.log(dataObject)
        setProyectTable(dataObject?.PROJECT_DETAIL);
        setData({
          ...dataObject?.PROJECT, 
          horas: 0,
          id_empleado: 0,
          id_rol: 0,
        });
      }
    })
  };

  useEffect(() => {
    getClients();
    getEmployees();
    getStates();
    getRol();
    getProjectType();

    if (id !== 'new') 
      getProjectById(id)
    
  }, []);

  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper
            style={{ width: "95%", margin: "auto", marginTop: "20px" }}
          >
            <React.Fragment>
              <Box style={{ width: "95%", margin: "auto" }}>
                <Typography
                  style={{ marginBottom: "15px" }}
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                  className={"title-header"}
                >
                  Datos del Proyecto de Ingreso
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
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
                      type="number"
                      label="Codigo Gestion"
                      name="codigo_gestion"
                      value={(data.codigo_gestion).toString()}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2} >
                    <InputComponent
                      type="date"
                      label="Fecha Inicio:"
                      name="fecha_inicio"
                      value={data.fecha_inicio}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2} >
                    <InputComponent
                      type="date"
                      label="Fecha Fin:"
                      name="fecha_fin"
                      value={data.fecha_fin}
                      onChange={(e) => handleInputChanges(e, data, setData)}
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
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <InputComponent
                      type="number"
                      label="Horas planificadas"
                      name="horas_planificadas"
                      value={(data.horas_planificadas)?.toString()}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <InputComponent
                      type="number"
                      label="Monto"
                      name="monto"
                      value={(data.monto)?.toString()}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper
            style={{ width: "95%", margin: "auto", marginTop: "20px" }}
          >
            <React.Fragment>
              <Box style={{ width: "95%", margin: "auto" }}>
                <Typography
                  style={{ marginBottom: "15px" }}
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                  className={"title-header"}
                >
                  Asignacion de Personal
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={5} sm={5} md={3} lg={3} xl={3}>
                    <SelectComponent
                      label="Seleccione un Personal"
                      list={listEmployees}
                      name="id_empleado"
                      value={data.id_empleado}
                      onChange={(e) =>
                        handleInputChanges(
                          e,
                          data,
                          setData,
                          setEmpleado,
                          listEmployees
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={5} sm={5} md={3} lg={3} xl={3}>
                    <SelectComponent
                      label="Rol"
                      list={listRol}
                      name="id_rol"
                      value={data.id_rol}
                      onChange={(e) =>
                        handleInputChanges(e, data, setData, setRol, listRol)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <InputComponent
                      type="number"
                      label="Horas"
                      name="horas"
                      value={(data.horas)?.toString()}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper
            style={{ width: "95%", margin: "auto", marginTop: "20px" }}
          >
            <React.Fragment>
              <Box style={{ width: "95%", margin: "auto" }}>
                <Typography
                  style={{ marginBottom: "15px" }}
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                  className={"title-header"}
                >
                  Datos del Cliente
                </Typography>
                <Grid container spacing={2} >
                  <Grid item xs={5} sm={5} md={3} lg={3} xl={3}>
                    <SelectComponent
                      label="Seleccione un cliente"
                      list={listClients}
                      name="id_cliente"
                      value={data.id_cliente}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableProyectos
            data={data}
            proyectTable={proyectTable}
            setProyectTable={setProyectTable}
            empleado={empleado}
            rol={rol}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            style={{
              width: "270px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <Button
              variant="contained"
              startIcon={<ArrowBackIosIcon />}
              style={{ marginBottom: "15px" }}
              onClick={() => navigate("/proyectos")}
            >
              ATRAS
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              style={{ marginBottom: "15px", backgroundColor: "#004E9E" }}
              onClick={saveProyect}
            >
              PROCESAR
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const TableProyectos = ({
  data,
  proyectTable,
  setProyectTable,
  empleado,
  rol,
}: TableProyectosProps) => {
  
  const addProduct = () => {
    let warn = "";

    if(data.id_empleado === 0) warn = "personal";
    if(data.id_rol === 0) warn = "rol";
    if(data.horas === 0) warn = "hora";
    if(warn !== "") return MessageUtil('warning', `Añade un(a) ${warn}`, "");

    const exist = proyectTable.find(element => element.id_empleado === data.id_empleado);

    console.log(exist);

    if (exist) return MessageUtil('error', `Personal ya a sido agregado!`, "");

    setProyectTable([
      ...proyectTable,
      {
        id_proyecto_detalle: 0,
        id_empleado: data.id_empleado,
        id_rol: data.id_rol,
        horas: data.horas,
        empleado,
        rol,
      },
    ]);
    
  };

  const deleteRow = (index: number) => {
    const list = proyectTable.filter((proyecto, i) => index !== i);
    setProyectTable(list);
  };

  const HeaderTableProducto = [
    { name: "N°" },
    { name: "EMPLEADO" },
    { name: "ROL" },
    { name: "HORAS PROGRAMDAS" },
    { name: "ACCIÓN" },
  ];

  return (
    <Paper
      style={{ width: "95%", margin: "auto", marginTop: "20px" }}
    >
      <React.Fragment>
        <Box style={{ width: "95%", margin: "auto" }}>
          <Typography
            style={{ marginBottom: "15px" }}
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            className={"title-header"}
          >
            Tabla de proyectos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid item xs={4} sm={4} md={4} lg={4} xl={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    style={{ marginBottom: "15px", backgroundColor: "#004E9E" }}
                    onClick={addProduct}
                  >
                    AÑADIR
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box style={{ width: "95%", margin: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      {HeaderTableProducto?.map((head) => (
                        <TableCell
                          align="center"
                          key={head.name}
                          style={{
                            color: "white",
                            backgroundColor: "#004E9E",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {head.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {proyectTable?.length > 0 ? (
                      proyectTable?.map((row, i) => (
                        <TableRow key={row?.id_empleado}>
                          <TableCell align="center">{`0${i + 1}`}</TableCell>
                          <TableCell align="center">{`${row?.empleado}`}</TableCell>
                          <TableCell align="center">{`${row?.rol}`}</TableCell>
                          <TableCell align="center">{`${row?.horas}`}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() => deleteRow(i)}
                            >
                              <DeleteIcon color="error"/>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
      <Box style={{ width: "100%", height: "30px" }}></Box>
    </Paper>
  );
};

export default ProyectosNuevo;
