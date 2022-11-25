import React from "react";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import { Projects } from '../../interfaces/project';
import { FiltrarProps, TbRegistroProps } from '../../interfaces/filtrar';

const Filtrar = ({ headTable, newRoute, route, tableName, fields, resultListTable, functionSearchTable, clearData, pagination }: FiltrarProps<Projects>) => {
  const navigator = useNavigate();

  const onChangePage = (ev: any, page: any) => {
    functionSearchTable(pagination.rowsPerPage, page);
  }

  const onChangeRow = (ev: any) => {
    functionSearchTable(ev?.target?.value, 0);
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                  Filtros de Búsqueda
                </Typography>
                {fields}
              </Box>
              <br />
              <Box
                style={{
                  width: "350px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: "auto",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<DeleteSweepIcon />}
                  style={{ marginBottom: "15px" }}
                  onClick={clearData}
                >
                  BORRAR SELECCIÓN
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FilterListIcon />}
                  style={{ marginBottom: "15px", backgroundColor: "#004E9E" }}
                  onClick={() => functionSearchTable(pagination.rowsPerPage, pagination.page)}
                >
                  FILTRAR
                </Button>
              </Box>
            </React.Fragment>
          </Paper>
          <br />
          <Paper
            style={{
              width: "95%",
              margin: "auto",
              marginTop: "20px",
              minHeight: "200px",
            }}
          >
            <React.Fragment>
              <Box style={{ width: "95%", margin: "auto" }}>
                <TableRegistro
                  headTable={headTable}
                  newRoute={newRoute}
                  route={route}
                  navigator={navigator}
                  tableName={tableName}
                  resultListTable={resultListTable}
                  pagination={pagination}
                  onChangePage={onChangePage}
                  onChangeRow={onChangeRow}
                />
              </Box>
            </React.Fragment>
            <Box style={{ width: "100%", height: "30px" }}></Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const TableRegistro = ({ headTable, newRoute, route, navigator, tableName, resultListTable, pagination, onChangePage, onChangeRow }: TbRegistroProps< Projects>) => {

  const handleChangePage = (event: any, newPage: any): void => {
    if(onChangePage){
      onChangePage(event, newPage);
    }
  };

  const handleChangeRowsPerPage = (event: any): void => {
    if(onChangeRow){
      onChangeRow(event);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        style={{ marginBottom: "15px" }}
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        className={"title-header"}
      >
        {tableName}
      </Typography>
      <Box
        style={{
          width: "100%",
          margin: "auto",
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          style={{ backgroundColor: "#004E9E" }}
          onClick={() => navigator(newRoute)}
        >
          NUEVO
        </Button>
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table style={{ minWidth: "100%" }} size="medium">
          <TableHead className={"header-table"}>
            <TableRow>
              {headTable?.map((head) => (
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
            {resultListTable?.length > 0 ? (
              resultListTable.map((row, i) => (
                <TableRow
                  key={row?.id_proyecto}
                >
                  <TableCell align="center">{`0${i + 1}`}</TableCell>
                  <TableCell align="center">{row.nombre_proyecto}</TableCell>
                  <TableCell align="center">{row.codigo_gestion}</TableCell>
                  <TableCell align="center">{row.cliente}</TableCell>
                  <TableCell align="center">{row.fecha_inicio}</TableCell>
                  <TableCell align="center">{row.fecha_fin}</TableCell>
                  <TableCell align="center">{row.horas_planificadas}</TableCell>
                  <TableCell align="center">{row.estado}</TableCell>
                  <TableCell align="center">
                    <IconButton
                    >
                      <EditIcon onClick={() => navigator(route + row.id_proyecto)} color="action"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headTable?.length + 1}
                  align="center"
                >
                  No hay datos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {(pagination.total || 0) > 0 && (
        <TablePagination  
          component="div"        
          count={pagination.total || 0}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default Filtrar;
