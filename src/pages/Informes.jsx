import React, { useState } from "react";
import Header from "../components/Header/Header";
import Filtrar from "../components/Filtrar/Filtrar";

const Informes = () => {
  return (
    <>
      <Header />
      <iframe
        title="Programate_PowerBI - Informe 1"
        width="80%"
        height="600"
        src="https://app.powerbi.com/view?r=eyJrIjoiMGVhOWNmZDAtZmVjZC00MTU3LTgwOWYtN2M0YTI0NDEyNjU0IiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </>
  );
};

export default Informes;
