import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Link } from 'react-router-dom';
import { FcCloseUpMode } from 'react-icons/fc';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../Button';
import { IconContext } from 'react-icons/lib';
import Yarn from '../../pages/Yarn';
import Home from '../Home';
import Profile from '../Profile';

import AuthService from '../../services/auth.service';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <FcCloseUpMode className='navbar-icon' />
              Sable
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to={'/'} className='nav-links'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/yarn'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <Yarn />
                  Yarn
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/message'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Message
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/chat'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Chat
                </Link>
              </li>

              {currentUser && (
                <li className='nav-item'>
                  <Link to={'/user'} className='nav-links'>
                    User
                  </Link>
                </li>
              )}

              {currentUser ? (
                <div className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link to={'/profile'} className='nav-links'>
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <a href='/login' className='nav-links' onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link to={'/login'} className='nav-links'>
                      Login
                    </Link>
                  </li>
                </div>
              )}

              <li className='nav-btn'>
                {button ? (
                  <Link to={'/register'} className='btn-link'>
                    <Button buttonStyle='btn--outline'>Sign Up</Button>
                  </Link>
                ) : (
                  <Link
                    to='/register'
                    className='btn-link'
                    onClick={closeMobileMenu}
                  >
                    <Button className='btn--outline' buttonSize='btn--mobile'>
                      Sign Up
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};
export default Navbar;

//need to replace   with the correct logo.
