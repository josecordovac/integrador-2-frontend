import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import InputComponent from '../../components/form/input/InputComponent';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Filtrar = ({ headTable, ruta, disable, tableName}) => {
  const [data, setData] = useState([])
  const navigator = useNavigate();

  return (
    <>
      <Grid container spacing={3} >  
        <Grid item xs={12}>
          {!disable &&
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{ width: '95%', margin: 'auto', marginTop: '20px' }}>
            <React.Fragment>                                      
              <Box style={{ width: '95%', margin: 'auto' }}>
                <Typography style={{ marginBottom: '15px' }} component="h2" variant="h6" color="primary" gutterBottom className={"title-header"}>Filtros de Búsqueda</Typography>                                                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={2}>
                    <InputComponent label="Numeración" name="numeracion" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={2}>
                    <InputComponent label="Estado" name="estado" />
                  </Grid>  
                </Grid>
              </Box>
              <br/>  
              <Box style={{ width: '350px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto' }}>
                <Button
                  variant="contained"
                  color="white"
                  startIcon={<DeleteSweepIcon />}
                  style={{ marginBottom:"15px" }}
                >
                  BORRAR SELECCIÓN
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FilterListIcon />}
                  style={{ marginBottom:"15px", backgroundColor: '#004E9E' }}
                >
                  FILTRAR
                </Button>
              </Box>
            </React.Fragment>
          </Paper>}
          <br/>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{ width: '95%', margin: 'auto', marginTop: '20px', minHeight: '200px' }} >
            <React.Fragment>
              <Box style={{ width: '95%', margin: 'auto' }}>
                <TableRegistro 
                  headTable={headTable}
                  ruta={ruta}
                  data={data}
                  disable={disable}
                  navigator={navigator}
                  tableName={tableName}
                />
              </Box>
            </React.Fragment>
            <Box style={{ width: '100%', height: '30px' }}></Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

const TableRegistro = ({ headTable, ruta, data, disable, navigator, tableName }) => {

  return (
    <Box sx={{ width: '100%' }}>  
      <Typography style={{ marginBottom: '15px' }} component="h2" variant="h6" color="primary" gutterBottom className={"title-header"}>{tableName}</Typography>                                                
      {!disable &&
      <Box style={{width: "100%", margin: "auto", marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          style={{ backgroundColor: '#004E9E' }}
          onClick={() => navigator(ruta)}
        >
          NUEVO
        </Button>
      </Box>}
      <br/>  
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '100%' }} size="small">
          <TableHead className={"header-table"}>
            <TableRow>
              {
                headTable?.map( head => ( <TableCell align="center" key={head.name} style={{ color: 'white', backgroundColor: '#004E9E', whiteSpace: 'nowrap' }} >{head.name}</TableCell> ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
          {(data?.length > 0) ? data.map((row,i) => (
            <TableRow key={row?.CODIGO_CABECERA} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell align="center">{`0${i + 1}`}</TableCell>                  
              <TableCell align="center">{row?.N_FACTURA || row?.N_BOLETA || row?.NOMBRE_PRODUCTO}</TableCell>                  
              <TableCell align="center">{row?.FECHA_EMISION || row?.STOCK}</TableCell>              
              {disable && 
              <TableCell align="center">
                {(row?.STOCK < 100) && 
                <Box style={{ width: '20px', height: '20px', backgroundColor: 'red', margin: 'auto', borderRadius: '50%' }}></Box>}
                {row?.STOCK >= 100 && row?.STOCK <= 200 &&
                <Box style={{ width: '20px', height: '20px', backgroundColor: 'yellow', margin: 'auto', borderRadius: '50%' }}></Box>}
                {row?.STOCK > 200 &&
                <Box style={{ width: '20px', height: '20px', backgroundColor: 'green', margin: 'auto', borderRadius: '50%' }}></Box>}
              </TableCell>}              
              {!disable && <TableCell align="center">{row?.PROVEEDOR || row?.CLIENTE}</TableCell>}                          
              {!disable && <TableCell align="center">{`S/${row?.TOTAL?.toFixed(3)}`}</TableCell> }             
              {!disable && <TableCell align="center">{row?.ESTADO}</TableCell>}
            </TableRow>
          )) : (
            <TableRow>
              <TableCell
                p={10}
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
    </Box>
  );
}

export default Filtrar