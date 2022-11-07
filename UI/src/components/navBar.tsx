import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Link} from "react-router-dom"
import "../styles/navBar.css"

export function NavBar() {

  const logout = () => {
    sessionStorage.removeItem("loggedIn");
  }
    return (
      <header id="main-header">
        <AppBar className="main-navbar">  
        <Toolbar>
          <Link id="main-link" className="nav-link" to="/main">Create an environment</Link>
          <Link id="dummy-link"className="nav-link" to="dummy">An empty page</Link>
          <Link id="logout-link" className="nav-link" to="/" onClick={logout}>Log out</Link>
        </Toolbar>
        </AppBar>
      </header>
    );
}

export default NavBar;