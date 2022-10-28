import React from 'react'
import Filtrar from '../../components/Filtrar/Filtrar'
import Header from '../../components/Header/Header'

const Productos = () => {
  const headTable = [  
    { name: 'N°'},
    { name: 'NOMBRE PRODUCTO'},
    { name: 'STOCK'},
    { name: 'ESTADO'}
  ];

  return (
    <>
      <Header title={'Productos'} />
      <Filtrar headTable={headTable} ruta="-" table={'producto'} disable={true}/>
    </>
  )
}

export default Productos