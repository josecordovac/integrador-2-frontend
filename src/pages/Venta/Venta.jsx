import React from 'react'
import Filtrar from '../../components/Filtrar/Filtrar'
import Header from '../../components/Header/Header'

const Venta = () => {
  const headTable = [  
    { name: 'N°'},
    { name: 'N° BOLETA'},
    { name: 'FECHA EMISIÓN'},
    { name: 'CLIENTE'},
    { name: 'TOTAL'},
    { name: 'ESTADO'},
  ];

  const ruta = "/venta/:nuevo"

  return (
    <>
      <Header title="VENTA"/>
      <Filtrar headTable={headTable} ruta={ruta} table={'venta'} disable={false}/>
    </>
  )
}

export default Venta