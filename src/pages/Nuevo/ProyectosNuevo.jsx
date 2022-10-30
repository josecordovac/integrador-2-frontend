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
import SelectComponent from "../../components/form/select/SelectComponent";
import { handleInputChanges } from "../../helpers/functions";

const ProyectosNuevo = () => {
  const [data, setData] = useState({
    id_proyecto: 0,
    id_estado: 0,
    id_cliente: 0,
    id_tipo: 0,
    nombre: "",
    codigo_gestion: "",
    fecha_inicio: "",
    fecha_fin: "",
    horas_planificadas: "",
    horas: "",
    monto: "",
    id_empleado: 0,
    id_rol: 0,
  });
  const [proyectTable, setProyectTable] = useState([]);
  const [empleado, setEmpleado] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  const tipoProyectos = [
    {
      value: 1,
      label: "tipo 1",
    },
    {
      value: 2,
      label: "tipo 2",
    },
    {
      value: 3,
      label: "tipo 3",
    },
  ];

  const estados = [
    {
      value: 1,
      label: "Proceso",
    },
    {
      value: 2,
      label: "Anulado",
    },
    {
      value: 3,
      label: "Concluido",
    },
  ];

  const clientes = [
    {
      value: 1,
      label: "Mario Torres",
    },
    {
      value: 2,
      label: "Jesus Yslao",
    },
  ];

  const empleados = [
    {
      value: 1,
      label: "Kevin Torres",
    },
    {
      value: 2,
      label: "Juan Carlos",
    },
  ];

  const roles = [
    {
      value: 1,
      label: "Frontend",
    },
    {
      value: 2,
      label: "Backend",
    },
    {
      value: 3,
      label: "fullStack",
    },
    {
      value: 4,
      label: "QA",
    },
  ];

  const saveProyect = () => {
    // let objSend = new Object(...data);

    console.log({ ...data, proyecto: proyectTable });
    let valor = JSON.stringify({ ...data, proyecto: proyectTable });
    console.log(valor);

    fetch("http://localhost:3000/proyects", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: valor,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Paper
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 2,
              display: "flex",
              flexDirection: "column",
            }}
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
                <Grid container spacing={2} sx={{ paddingRight: 2 }}>
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
                      list={tipoProyectos}
                      name="id_tipo"
                      value={data.id_tipo}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                  <Grid item xs={5} sm={5} md={5} lg={2} xl={2} xxl={3}>
                    <SelectComponent
                      label="Estado del proyecto"
                      list={estados}
                      name="id_estado"
                      value={data.id_estado}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={4}>
                    <InputComponent
                      label="Horas planificadas"
                      name="horas_planificadas"
                      value={data.horas_planificadas}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={4}>
                    <InputComponent
                      type="number"
                      label="Monto"
                      name="monto"
                      value={data.monto}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Paper
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 2,
              display: "flex",
              flexDirection: "column",
            }}
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
                <Grid container spacing={2} sx={{ paddingRight: 2 }}>
                  <Grid item xs={5} sm={5} md={3} lg={3} xl={3} xxl={3}>
                    <SelectComponent
                      label="Seleccione un Personal"
                      list={empleados}
                      name="id_empleado"
                      value={data.id_empleado}
                      onChange={(e) =>
                        handleInputChanges(
                          e,
                          data,
                          setData,
                          setEmpleado,
                          empleados
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={5} sm={5} md={3} lg={3} xl={3} xxl={3}>
                    <SelectComponent
                      label="Rol"
                      list={roles}
                      name="id_rol"
                      value={data.id_rol}
                      onChange={(e) =>
                        handleInputChanges(e, data, setData, setRol, roles)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={4}>
                    <InputComponent
                      type="number"
                      label="Horas"
                      name="horas"
                      value={data.horas}
                      onChange={(e) => handleInputChanges(e, data, setData)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Paper
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 2,
              display: "flex",
              flexDirection: "column",
            }}
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
                <Grid container spacing={2} sx={{ paddingRight: 2 }}>
                  <Grid item xs={5} sm={5} md={3} lg={3} xl={3} xxl={3}>
                    <SelectComponent
                      label="Seleccione un cliente"
                      list={clientes}
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <TableProyectos
            data={data}
            proyectTable={proyectTable}
            setProyectTable={setProyectTable}
            empleado={empleado}
            rol={rol}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
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
              color="white"
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
}) => {
  const addProduct = () => {
    const exist = proyectTable.find(
      (element) => element.id_empleado == data.id_empleado
    );

    console.log(exist);

    if (!exist) {
      setProyectTable([
        ...proyectTable,
        {
          id_empleado: data.id_empleado,
          id_tipo: data.id_tipo,
          id_rol: data.id_rol,
          horas: data.horas,
          empleado,
          rol,
        },
      ]);
    } else {
      alert("El Personal ya a sido agregado!");
    }
  };

  const deleteRow = (index) => {
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
      sx={{ p: 2, display: "flex", flexDirection: "column", marginTop: "10px" }}
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
          <Grid container spacing={2} sx={{ paddingLeft: 2, paddingRight: 2 }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid item xs={4} sm={4} md={4} lg={4} xl={3} xxl={3}>
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table size="small">
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
                              color="red"
                              onClick={() => deleteRow(i)}
                            >
                              <DeleteIcon />
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
