import React, { useState, useContext } from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/auth';

function MenuBar() { //function based
  const {user, logout} = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'login' : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menubar = user ? (
    <Menu pointing secondary size ="massive" color = "teal">
    <Menu.Item
      name={user.username}
      active={activeItem === `${user.username}`}
      onClick = {handleItemClick}
      as = {Link}
      to = "/home"
    />
    <Menu.Item
      name= '3D Model'
      active={activeItem === '3D Model'}
      onClick = {handleItemClick}
      as = {Link}
      to = "/forge"
    />
    <Menu.Item
      name= 'Charts'
      active={activeItem === 'Charts'}
      onClick = {handleItemClick}
      as = {Link}
      to = "/charts"
    />
    <Menu.Menu position='right'>
    <Menu.Item
      name='logout'
      onClick = {logout}
    />
    </Menu.Menu>
  </Menu>
  ) : (
    <Menu pointing secondary size ="massive" color = "teal">
    <Menu.Item
      name='home'
      active={activeItem === 'home'}
      onClick={handleItemClick}
      as = {Link}
      to = "/home"
    />
    <Menu.Menu position='right'>
    <Menu.Item
      name='login'
      active={activeItem === 'login'}
      onClick={handleItemClick}
      as = {Link}
      to = "/login"
    />
    <Menu.Item
      name='register'
      active={activeItem === 'register'}
      onClick={handleItemClick}
      as = {Link}
      to = "/register"
    />
    </Menu.Menu>
  </Menu>

  )
    return menubar;
  }

export default MenuBar;