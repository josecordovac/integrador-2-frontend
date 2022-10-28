import React from 'react'
import Header from '../components/Header/Header'
import Filtrar from '../components/Filtrar/Filtrar';

const IngresoMedicamento = () => {
  
  const headTable = [  
    { name: 'N°'},
    { name: 'N° FACTURA'},
    { name: 'FECHA EMISIÓN'},
    { name: 'PROVEEDOR'},
    { name: 'TOTAL'},
    { name: 'ESTADO'},
  ];

  const ruta = "/ingreso-medicamento/:nuevo"

  return (
    <>
      <Header title="INGRESO DE MEDICAMENTO" />
      <Filtrar headTable={headTable} ruta={ruta} table={'compra'} disable={false} />
    </>
  )
}

export default IngresoMedicamento