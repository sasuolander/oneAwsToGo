import { Routes, Route } from "react-router-dom"
import MainPage from '../pages/mainPage';
import EnvsPage from '../pages/myEnvsPage';
import LoginPage from '../pages/loginPage';
import MainOutlet from "../components/mainOutlet";
import LoginOutlet from "../components/loginOutlet";

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route element={<LoginOutlet />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<MainOutlet />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/myEnvironments" element={<EnvsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;

