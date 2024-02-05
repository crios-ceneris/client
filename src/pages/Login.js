import React, {useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import App from "../App.js";
import './Login.css';



export default function Login() {

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [LoginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();


    const login = () => {
        Axios.post("http://localhost:3001/login", {
            nombre: nombre,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].nombre);
                setRole(response.data[0].role);
                if (role === "admin") {
                    navigate("/admin");
                }else{
                    navigate("/main");
                }
            }
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].nombre);
            }
        });
    }, []);


    return <div className={App}>
        <div className="App">
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Usuario"
                       onChange={(e) => {
                           setNombre(e.target.value);
                       }}
                />
                <input type="password" placeholder="Contraseña"
                       onChange={(e) => {
                           setPassword(e.target.value);
                       }}
                />
                <button onClick={login}>Ingresar</button>
            </div>

            <h1>{LoginStatus}</h1>
        </div>
    </div>
}


