import React, {useState} from "react";
import Header from "../components/Header/Header";

interface Data {
  dni?: number;
  nombre?: string,
  apellido?: string,
  horas_planificadas?: number;
}

interface Arr {
  value: number;
  label: string
}

const Home2 = () => {
  const [data, setData] = useState<Data>({
    dni: 0,
    nombre: "",
    apellido: "",
    horas_planificadas: 0,
  });
  const [value, setValue] = useState("");

  const arreglo: Arr[] = [
    {value: 1, label: "Hola mundo"},
    {value: 2, label: "Banki"}
  ]
  
const handleInputChanges = (
  {target}: React.ChangeEvent<HTMLInputElement>, 
  dataF: Data, 
  setDataF: React.Dispatch<React.SetStateAction<Data>>, 
  setValue: React.Dispatch<React.SetStateAction<string>>,
  arr: Arr[]
  ): void => {
 
  setDataF({
    ...dataF,
    [target.name]:
      target.type == "checkbox" || target.type == "radio"
        ? target.checked
        : target.value,
  });
  
  if (arr) {
    const label = arr.find((x) => x.value === Number(target.value))!.label
    
    setValue(label);
  }
};

  return (
    <>
      <Header />
      <h1>{value}</h1>
      <section style={{ width: "100%", height: "100vh" }}>
        <div style={{ width: "250px", height: "49px" }}>
          <input type="text" placeholder="Nombre" name="nombre" onChange={(e) => handleInputChanges(e, data, setData, setValue, arreglo)} value={data.nombre}/>
        </div>
        <div style={{ width: "250px", height: "49px" }}>
          <input type="text" placeholder="Apellido" name="apellido" onChange={(e) => handleInputChanges(e, data, setData, setValue, arreglo)} value={data.apellido}/>
        </div>
        <div style={{ width: "250px", height: "49px" }}>
          <input type="number" placeholder="Dni" name="dni" onChange={(e) => handleInputChanges(e, data, setData, setValue, arreglo)} value={data.dni}/>
        </div>
        <div style={{ width: "250px", height: "49px" }}>
          <input type="number" placeholder="Horas planificadas" name="horas_planificadas" onChange={(e) => handleInputChanges(e, data, setData, setValue, arreglo)} value={data.horas_planificadas}/>
        </div>
      </section>
    </>
  );
};

export default Home2;
