import "../styles/loginPage.css"
import LoginForm from "../components/loginForm"

export default function LoginPage() {
    return (
            <div id="login-page" className="loginPage">
                <h3 className="login-title">One AWS to go, please!</h3>
                <LoginForm/>
            </div>
    );
}