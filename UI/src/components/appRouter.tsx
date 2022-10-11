import {Routes, Route} from "react-router-dom"
import NavBar from "../components/navBar"
import DummyPage1 from '../pages/dummyPage1';
import DummyPage2 from '../pages/dummyPage2';

export function AppRouter() {
    return (
      <>
        <NavBar/>
        <Routes>
          <Route path="/" element={<DummyPage1/>}></Route>
          <Route path="/dummy" element={<DummyPage2/>}></Route>
        </Routes>
      </>  
    );
}

export default AppRouter;