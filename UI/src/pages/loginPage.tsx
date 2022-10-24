import "../styles/loginPage.css"
import LoginForm from "../components/loginForm"

export default function LoginPage() {
    return (
            <div id="login-page" className="loginPage">
                <h2>Login</h2>
                <LoginForm/>
            </div>
    );
}