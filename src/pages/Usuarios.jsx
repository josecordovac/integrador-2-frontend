import React from 'react';
import Header from '../components/Header/Header';
import Filtrar from '../components/Filtrar/Filtrar';

const Usuarios = () => {
  const headTable = [  
    { name: 'N°'},
    { name: 'N° FACTURA'},
    { name: 'FECHA EMISIÓN'},
    { name: 'PROVEEDOR'},
    { name: 'TOTAL'},
    { name: 'ESTADO'},
  ];

  const ruta = "/usuarios/new";

  return (
    <>
      <Header/>
      <Filtrar headTable={headTable} ruta={ruta} tableName={"Lista de usuarios"}/>
    </>
  )
}

export default Usuarios