import React from 'react'
import { useNavigate } from 'react-router-dom';
import './header.scss'
import logo from '../../assets/img/programate.svg'
import CancelIcon from '@material-ui/icons/Cancel';

const Header = () => {
  const navigator = useNavigate();

  return (
    <header className='header__container'>
      <div className='header__container_logo'>
        <img src={logo} alt="logo" onClick={() => navigator('/home')} />
      </div>
      <div className='header__container_menu'>
        {/* <div onClick={() => navigator('/usuarios')}>
          Usuarios
        </div> */}
        <div onClick={() => navigator('/proyectos')}>
          Proyectos
        </div>
        {/* <div onClick={() => navigator('/proyectos')}>
          Proyectos y Mantenimientos
        </div> */}
      </div>
    </header>
  )
}

export default Header