import {Routes, Route} from "react-router-dom"
import MainPage from '../pages/mainPage';
import DummyPage from '../pages/dummyPage';
import LoginPage from '../pages/loginPage';
import MainOutlet from "../components/mainOutlet";
import LoginOutlet from "../components/loginOutlet";

export function AppRouter() {
    return (
      <>
        <Routes>
          <Route element={<LoginOutlet/>}>
            <Route path="/" element={<LoginPage/>}/>
          </Route>
          <Route element={<MainOutlet/>}>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/dummy" element={<DummyPage/>}/>
          </Route>
        </Routes>
      </>  
    );
}

export default AppRouter;

