import React from 'react';
import Filtrar from '../components/Filtrar/Filtrar';
import Header from '../components/Header/Header';

const Proyectos = () => {
  const headTable = [  
    { name: 'N°'},
    { name: 'N° FACTURA'},
    { name: 'FECHA EMISIÓN'},
    { name: 'PROVEEDOR'},
    { name: 'TOTAL'},
    { name: 'ESTADO'},
  ];

  const ruta = "/proyectos/new"
  
  return (
    <>
      <Header/>
      <Filtrar headTable={headTable} ruta={ruta} tableName={"Lista de proyectos"}/>
    </>
  )
}

export default Proyectos