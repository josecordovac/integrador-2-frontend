import React from 'react'
import { useNavigate } from 'react-router-dom';
import './header.scss'
import logo from '../../assets/img/programate.svg'
import CancelIcon from '@material-ui/icons/Cancel';

const Header = ({ title }) => {
  const navigator = useNavigate();

  return (
    <header className='header__container'>
      <div className='header__container_logo'>
        <img src={logo} alt="logo" onClick={() => navigator('/home')} />
      </div>
      <div className='header__container_menu'>
        <div onClick={() => navigator('/usuarios')}>
          Usuarios
        </div>
        <div onClick={() => navigator('/proyectos')}>
          Proyectos
        </div>
        <div onClick={() => navigator('/informes')}>
          Informes
        </div>
      </div>
      <div className='header__container_user'>
        <h2>Usuario</h2>
        <CancelIcon style={{ marginLeft: "2px", display: "inline-block", color: "black"}} onClick={() => navigator('/')}/>
      </div>
    </header>
  )
}

export default Header