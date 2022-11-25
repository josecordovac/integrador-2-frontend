import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.scss'
import logo from '../../assets/img/programate.svg'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Header = () => {
  const [nameUser, setNameUser] = useState<string | null>('')
  const navigator = useNavigate();

  const closeLogin = () => {
    localStorage.clear();
    navigator('/');
  };

  useEffect(() => {
    setNameUser(localStorage.getItem('user'));
  }, []);

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
      <div className='header__container__user'>
        <h3>{nameUser}</h3>
        <div className='header__container__user__icon'>
          <ExitToAppIcon style={{color: 'white'}} onClick={closeLogin} />
        </div>
      </div>
    </header>
  )
}

export default Header