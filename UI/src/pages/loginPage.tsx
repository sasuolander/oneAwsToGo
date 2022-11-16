import "../styles/loginPage.css"
import LoginForm from "../components/loginForm"

export default function LoginPage() {
    return (
            <div id="login-page" className="loginPage">
                <img id="login-logo" alt="" className="loginLogo" src="logo392_91.png"></img>
                <LoginForm/>
            </div>
    );
}