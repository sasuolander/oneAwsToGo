import NavBar from '../components/navBar';
import { Outlet, Navigate } from 'react-router';

function MainOutlet() {

  return (
    sessionStorage.getItem("loggedIn") === "true" ? <><NavBar/><Outlet/></> : <Navigate to="/" />
  )
}

export default MainOutlet;