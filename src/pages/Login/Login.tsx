import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import user from '../../assets/img/icon.jpg'
import logo from '../../assets/img/programate.svg'
import { Link } from 'react-router-dom'
import { RequestUtil } from '../../util/RequestUtil'
import { handleInputChanges } from '../../helpers/functions';
import { MessageUtil } from '../../util/Swal'

interface login {
  correo: string;
  contrasenia: string;
}

const Login = () => {
  const [data, setData] = useState<login>({
    correo: '',
    contrasenia: '',
  });
  const navigate = useNavigate();

  const login = () => {
    RequestUtil.postData({
      url: "save-data",
      params: { ...data },
      queryId: 10,   
      fnOk({message}) {
        if (message === '') return MessageUtil('error', `Usuario o contraseña incorrecto`, "");
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
              onChange={(e) => handleInputChanges(e, data, setData)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="contrasenia">Contraseña</label>
            <input 
              type="password" 
              className="inp pwd" 
              id="contrasenia" 
              name="contrasenia" 
              placeholder="Ingrese su contraseña" 
              onChange={(e) => handleInputChanges(e, data, setData)}
            />
          </div>
          <div className="form-link">
            <a href="#">Olvidé mi contraseña</a>
          </div>
          <button name="login" className="btn enviar" onClick={login}>Ingresar</button>
        </article>
      </section>
    </section>
  )
}

export default Login