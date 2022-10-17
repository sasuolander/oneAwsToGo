import NavBar from '../components/navBar';
import { Outlet } from 'react-router';

function MainOutlet() {
  return (
    <>
    <NavBar />
    <Outlet />
  </>
  )
}

export default MainOutlet;