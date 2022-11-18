import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom"
import "../styles/navBar.css"

export function NavBar() {

  const logout = () => {
    sessionStorage.removeItem("loggedIn");
  }

  return (
    <header id="main-header">
      <AppBar className="main-navbar">
        <Toolbar>
          <img id="navbar-logo" alt="" className="navbarLogo"src="/logo392_91.png"/>
          <Link id="main-link" className="nav-link" to="/main">Create an environment</Link>
          <Link id="envs-link" className="nav-link" to="/myEnvironments">My environments</Link>
          <Link id="logout-link" className="nav-link" to="/" onClick={logout}>Log out</Link>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default NavBar;