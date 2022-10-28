import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import InputComponent from '../../components/form/input/InputComponent';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import productos from '../../helpers/BD';
import SelectComponent from '../../components/form/select/SelectComponent';

const VentaNuevo = () => {
  const [data, setData] = useState({
    N_FACTURA: '',
    FECHA_EMISION: '',
    PROVEEDOR: '',
    RUC: '',
    PRODUCTO: ''
  });
  const [productsTable, setProductsTable] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [pro, setPro] = useState([]);

  const handleInputChanges = ({target}) => {
    setData({...data, [target.name]: (target.type == 'checkbox' || target.type == 'radio') ? target.checked : target.value});
  }

  const save = () => {
    let registroVentas = localStorage.getItem("ventas")
    let registroProductos = localStorage.getItem("productos")
    let ventas = JSON.parse(registroVentas);
    let productosLocal = JSON.parse(registroProductos);

    const productsActualizados = productosLocal.map(product => {
      let stock = 0;
      productsTable.map(productTable => {
        if (product.ID_PRODUCTO === productTable.ID_PRODUCTO) {
            stock = product.STOCK - productTable.CANTIDAD
          } 
      })
      return{
        ...product,
        STOCK: stock || product?.STOCK
      }
    })

    ventas.push({
      CODIGO_CABECERA: Math.round(Math.random() * 100),
      N_BOLETA: data.N_BOLETA,
      FECHA_EMISION: data.FECHA_EMISION,
      CLIENTE: data.CLIENTE,
      N_DOCUMENTO: data.N_DOCUMENTO,
      TOTAL: total,
      ESTADO: 'PROCESADO'
    });

    localStorage.setItem("ventas", JSON.stringify(ventas));
    localStorage.setItem("productos", JSON.stringify(productsActualizados));
    navigate(`/venta`);
  }

  useEffect(() => {
    const newPro = productos.map(product => {
      return {
        value: product.ID_PRODUCTO,
        label: product.NOMBRE_PRODUCTO
      }
    })

    setPro(newPro)
  }, [])
  
  return (
    <>
      <Header />
      <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Paper sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, display: 'flex', flexDirection: 'column' }} style={{ width: '95%', margin: 'auto', marginTop: '20px' }} >
            <React.Fragment>
              <Box style={{ width: '95%', margin: 'auto' }} >
                <Typography style={{ marginBottom: '15px' }} component="h2" variant="h6" color="primary" gutterBottom className={"title-header"}>Datos del Documento de Ingreso</Typography>   
                <Grid container spacing={2} sx={{ paddingRight: 2 }}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} xxl={4}>
                    <InputComponent label="N° Boleta" name="N_BOLETA" value={data?.N_BOLETA} onChange={handleInputChanges}/>
                  </Grid>  
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={2} xxl={2}>
                    <InputComponent type="date" label="Fecha Emision:" name="FECHA_EMISION" value={data?.FECHA_EMISION} onChange={handleInputChanges}/>
                  </Grid>  
                </Grid>
              </Box>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Paper sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, display: 'flex', flexDirection: 'column' }} style={{ width: '95%', margin: 'auto', marginTop: '20px' }} >
            <React.Fragment>
              <Box style={{ width: '95%', margin: 'auto' }} >
                <Typography style={{ marginBottom: '15px' }} component="h2" variant="h6" color="primary" gutterBottom className={"title-header"}>Datos del Cliente</Typography>   
                <Grid container spacing={2} sx={{ paddingRight: 2 }}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={3} xxl={3}>
                    <InputComponent label="Cliente" name="CLIENTE" value={data?.CLIENTE} onChange={handleInputChanges}/>
                  </Grid>  
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={3} xxl={3}>
                    <InputComponent label="N° Documento" name="N_DOCUMENTO" value={data?.N_DOCUMENTO} onChange={handleInputChanges}/>
                  </Grid>  
                </Grid>
              </Box>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
          <TableProductos
            data={data}
            setData={setData}
            productsTable={productsTable}
            setProductsTable={setProductsTable}
            total={total}
            setTotal={setTotal}
            productos={pro}
            productosBd={productos}
            handleInputChanges={handleInputChanges}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
          <Box style={{ width: '270px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto' }}>
            <Link to='/venta'>
              <Button
                variant="contained"
                color="white"
                startIcon={<ArrowBackIosIcon />}
                style={{ marginBottom:"15px" }}
              >
                ATRAS
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              style={{ marginBottom:"15px", backgroundColor: '#004E9E' }}
              onClick={save}
            >
              PROCESAR
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

const TableProductos = ({ data, setData, productsTable, setProductsTable, total, setTotal, productos, productosBd, handleInputChanges }) => {

  const handleInputTableChange = (e, index) => {
    let totalRow = 0;
    setTotal(0);
    const list = [...productsTable];
    const { name, value } = e?.target;
    if (name == 'CANTIDAD' || name == 'PRECIO') {
      list[index][name] = value
    }

    let igvRow = (list[index]['CANTIDAD'] * list[index]['PRECIO']) * 0.18;
    let precioTotal = list[index]['CANTIDAD'] * list[index]['PRECIO'];
    list[index]['IGV'] = igvRow;
    list[index]['PRECIO_TOTAL'] = precioTotal;

    list.forEach( t => {
      totalRow += t.PRECIO_TOTAL
    })
    setTotal(totalRow);
    setProductsTable(list)
  };

  const addProduct = () => {    
    if (data?.PRODUCTO != 0) {
      let existProduct = productsTable?.find((product) => product?.ID_PRODUCTO == data?.PRODUCTO);
      if (!existProduct) {
        const productSelected = productosBd?.find(x => x.ID_PRODUCTO == data?.PRODUCTO);
        setProductsTable([
          ...productsTable,
          {
            ID_PRODUCTO: productSelected?.ID_PRODUCTO,
            NOMBRE_PRODUCTO: productSelected?.NOMBRE_PRODUCTO,
            CANTIDAD: 0,
            PRECIO: 0,
            IGV: 0,
            PRECIO_TOTAL: 0
          }
        ])
        setData({...data, PRODUCTO: ''})
      } else {
        alert("El artículo ya se encuentra seleccionado."); 
      }
    } else {
      alert("No ha seleccionado un artículo."); 
    }
  }

  const deleteRow = (row) => {
    let totalRow = 0;
    setTotal(0);
    const list = productsTable.filter((product) => product?.ID_PRODUCTO !== row?.ID_PRODUCTO)

    list.map( t => {
      totalRow += t.PRECIO_TOTAL
    })
    setTotal(totalRow);
    setProductsTable(list);
  }


const HeaderTableProducto = [
  { name: "N°" },
  { name: "NOMBRE DE PRODUCTO" },
  { name: "CANTIDAD" },
  { name: "PRECIO" },
  { name: "IGV" },
  { name: "PRECIO TOTAL" },
  { name: "ACCIÓN" }
]

return (
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginTop: "10px"}} style={{ width: '95%', margin: 'auto', marginTop: '20px' }} >
    <React.Fragment>
      <Box style={{ width: '95%', margin: 'auto' }} >
        <Typography style={{ marginBottom: '15px' }} component="h2" variant="h6" color="primary" gutterBottom className={"title-header"}>Carga de productos</Typography>   
        <Grid container spacing={2} sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Box style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
              <Grid item xs={5} sm={5} md={5} lg={4} xl={3} xxl={3}>
                <SelectComponent label="Ingrese un producto" list={productos} name="PRODUCTO" value={data?.PRODUCTO || 0} onChange={handleInputChanges} />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={3} xxl={3} style={{ marginLeft:"15px" }} >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  style={{ marginBottom:"15px", backgroundColor: '#004E9E' }}
                  onClick={addProduct}
                >
                  AÑADIR
                </Button>
              </Grid>
            </Box>                 
          </Grid>              
        </Grid>
      </Box>
      <Box style={{ width: '95%', margin: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <TableContainer component={Paper} style={{marginTop: "20px"}}>
              <Table size="small" >
                <TableHead >
                  <TableRow>
                    {
                      HeaderTableProducto?.map( head => ( <TableCell align="center" key={head.name} style={{ color: 'white', backgroundColor: '#004E9E', whiteSpace: 'nowrap' }}>{head.name}</TableCell> ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productsTable?.length > 0 ? ( productsTable?.map((row, i) => (
                  <TableRow key={row?.ID_PRODUCTO}>
                    <TableCell align="center">{`0${i + 1}`}</TableCell>
                    <TableCell align="center">{`${row?.NOMBRE_PRODUCTO}`}</TableCell>
                    <TableCell align="center">
                      <div style={{ width: '110px', height: 'max-content', margin: 'auto' }}>
                        <InputComponent
                          type="number"
                          min="0"
                          name="CANTIDAD"
                          onChange={(e) => handleInputTableChange(e, i)}
                          value={`${ row?.CANTIDAD }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div style={{ width: '110px', height: 'max-content', margin: 'auto' }}>
                        <InputComponent
                          type="number"
                          min="0"
                          name="PRECIO"
                          onChange={(e) => handleInputTableChange(e, i)}
                          value={`${ row?.PRECIO }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center" >{row?.IGV.toFixed(3)}</TableCell>
                    <TableCell align="center" >{`${(row?.PRECIO_TOTAL.toFixed(3))}`}</TableCell>
                    <TableCell align="center" >
                      <IconButton color="secondary" onClick={() => deleteRow(row)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  ))) : (
                    <>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        {productsTable?.length > 0 ? (
        <Box my={6}>
          <Box style={{width: "95%", margin: "auto", marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
            <Grid item xs={12} sm={6} md={4} lg={1} xl={1} xxl={2}>
              <InputComponent label="Total" name="TOTAL" value={total?.toFixed(3)} disabled={true}/>
            </Grid>  
          </Box>
        </Box>
        ) : (
          <></>
        )}
      </Grid>
    </React.Fragment>
    <Box style={{ width: '100%', height: '30px' }}></Box>
  </Paper>
);
};

export default VentaNuevo