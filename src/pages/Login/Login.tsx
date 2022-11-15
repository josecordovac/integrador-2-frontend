import React, { useEffect } from 'react'
import './login.scss'
import user from '../../assets/img/icon.jpg'
import logo from '../../assets/img/programate.svg'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <section  className='login-container'>
      <img className='logo-programate' src={logo} alt="logo" />
      <section className='form-container'>
        <article className="logo">
          <img src={user} alt="User" />
        </article>
        <article>
          <div className="form-item">
            <label htmlFor="dni">Correo</label>
            <input type="tel" className="inp dni" id="correo" name="correo" placeholder="@example.com"/>
          </div>
          <div className="form-item">
            <label htmlFor="password">Contraseña</label>
            <input type="password" className="inp pwd" id="password" name="password" placeholder="Ingrese su contraseña"/>
          </div>
          <div className="form-link">
            <a href="#">Olvidé mi contraseña</a>
          </div>
          <Link to="/home">
            <button type="submit" name="login" className="btn enviar">Ingresar</button>
          </Link>
        </article>
      </section>
    </section>
  )
}

export default Login