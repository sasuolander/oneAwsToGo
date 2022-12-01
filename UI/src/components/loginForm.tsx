import "../styles/loginForm.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';
import LoginService from "../service/loginService"
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from "@mui/material";
import { useState} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const loginService = new LoginService();

function LoginForm() {
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userName = (event.currentTarget[0] as HTMLInputElement).value
        const password = (event.currentTarget[2] as HTMLInputElement).value
        loginService.sendCredentials(userName, password)
            .then(() => {
                sessionStorage.setItem("loggedIn", "true");
                navigate("/main");
            })
            .catch(response => {
                setAlertMessage(response.response.data)
                setAlertOpen(true);
            });

    }

    const alertClose= () => {
        setAlertOpen(false);
        setAlertMessage("");
    }

    const alertAction = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={alertClose}>
        <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Card variant="outlined" id="login-card" className="loginCard">
            <CardContent>
            <h3>Login</h3>
            <div id="login-div" className="loginDiv">
            <form id="login-form" className="loginForm" onSubmit={handleSubmit}>
                <div className="form-div">
                    <TextField id="username-field" label="Username" variant="outlined" helperText="Enter your username" required></TextField>
                </div>
                <div className="form-div">
                    <TextField id="password-field" label="Password" variant="outlined" helperText="Enter your password" required type="password"></TextField>
                </div>
                <div className="form-div">
                    <Button type="submit" id="login-submit" variant="contained">Login</Button>
                </div>
            </form>
            <Snackbar id="alert" open={alertOpen} autoHideDuration={10000} anchorOrigin={{vertical: "top", horizontal: "center"}}
            onClose={alertClose} action={alertAction}>
                <MuiAlert severity="error" onClose={alertClose}>{alertMessage}</MuiAlert>
            </Snackbar>
            </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm;