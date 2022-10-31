import "../styles/loginForm.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';

interface IEventSubmit extends React.FormEvent<HTMLFormElement> {
}

function LoginForm() {
    const navigate = useNavigate();

    //TODO: Authentication etc.
    const handleSubmit = (event: IEventSubmit) => {
        navigate("/main");
    }
    return (
        <Card variant="outlined" id="login-card" className="loginCard">
            <CardContent>
            <h3>Login</h3>
            <div id="login-div" className="loginDiv">
            <form id="login-form" className="loginForm" onSubmit={handleSubmit}>
                <div className="form-div">
                    <TextField id="username-field" label="Username" variant="outlined" helperText="Enter your username"></TextField>
                </div>
                <div className="form-div">
                    <TextField id="password-field" label="Password" variant="outlined" helperText="Enter your password"></TextField>
                </div>
                <div className="form-div">
                    <Button type="submit" id="login-submit" variant="contained">Login</Button>
                </div>
            </form>
            </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm;