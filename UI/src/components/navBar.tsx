import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom"
import { useState } from 'react';
import "../styles/navBar.css"

export function NavBar() {

  const [currentPath, setPath] = useState(window.location.pathname);

  const logout = () => {
    sessionStorage.removeItem("loggedIn");
  }

  const handleNavigation = (whereTo: String) => {
    if (currentPath === whereTo) {
      window.location.reload();
    }
    setPath(String(whereTo));
  }

  const handleLinkColor = (path: String) => {
    if (currentPath === path) {
      return "cornflowerblue";
    } else {
      return "white";
    }
  }

  return (
    <header id="main-header">
      <AppBar className="main-navbar">
        <Toolbar>
          <img id="navbar-logo" alt="" className="navbarLogo"src="/logo392_91.png"/>
          <Link id="main-link" style={{color: handleLinkColor("/main")}} onClick={() => handleNavigation("/main")} className="nav-link" to="/main">Create an environment</Link>
          <Link id="envs-link" style={{color: handleLinkColor("/myEnvironments")}} onClick={() => handleNavigation("/myEnvironments")} className="nav-link" to="/myEnvironments">My environments</Link>
          <Link id="logout-link" className="nav-link" to="/" onClick={logout}>Log out</Link>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default NavBar;