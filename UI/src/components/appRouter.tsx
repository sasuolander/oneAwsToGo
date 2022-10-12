import {Routes, Route} from "react-router-dom"
import NavBar from "../components/navBar"
import MainPage from '../pages/mainPage';
import DummyPage from '../pages/dummyPage';

export function AppRouter() {
    return (
      <>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/dummy" element={<DummyPage/>}></Route>
        </Routes>
      </>  
    );
}

export default AppRouter;