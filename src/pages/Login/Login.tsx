import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import user from '../../assets/img/icon.jpg'
import logo from '../../assets/img/programate.svg'
import { RequestUtil } from '../../util/RequestUtil'
import { handleInputChanges } from '../../helpers/functions';
import { MessageUtil } from '../../util/Swal'

interface login {
  contrasenia: string;
  correo: string;
}

const Login = () => {
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  
  const [data, setData] = useState<login>({
    contrasenia: '',
    correo: ''
  });
  const navigate = useNavigate();

  const login = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateEmail(data.correo)) {
      setEmailError("Email is not valid");
      return;
    } else {
      setEmailError("");
      console.log("Email is valid");
      console.log({...data});
    }

    RequestUtil.postData({
      url: "save-data",
      params: { ...data },
      queryId: 10,   
      fnOk({dataList, message}) {
        if (message === '') return MessageUtil('error', `Usuario o contraseña incorrecto`, "");
        let name = dataList[0].nombre
        let lastname = dataList[0].apellidos
        localStorage.setItem('user', name);
        localStorage.setItem('apellidos', lastname);
        navigate('home');
      }
    });
  };


  return (
    <section  className='login-container'>
      <img className='logo-programate' src={logo} alt="logo" />
      <section className='form-container'>
        <article className="logo">
          <img src={user} alt="User" />
        </article>
        <article>
          <div className="form-item">
            <label htmlFor="correo">Correo</label>
            <input 
              type="email" 
              className="inp dni" 
              id="correo" 
              name="correo" 
              placeholder="@example.com" 
              onChange={event => setData({ ...data, correo: event.target.value })}
            />
            <span style={{ color: "red" }}>{emailError}</span>
          </div>
          <div className="form-item">
            <label htmlFor="contrasenia">Contraseña</label>
            <input 
              type="password" 
              className="inp pwd" 
              id="contrasenia" 
              name="contrasenia" 
              placeholder="Ingrese su contraseña" 
              onChange={event => setData({ ...data, contrasenia: event.target.value })}
            />
          </div>
          <button name="login" className="btn enviar" onClick={login}>Ingresar</button>
        </article>
      </section>
    </section>
  )
}

export default Login