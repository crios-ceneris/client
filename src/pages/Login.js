import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import App from "../App.js";
import './Login.css';

export default function Login() {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            nombre: nombre,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                const user = response.data; // Acceder directamente al objeto
                setLoginStatus(user.nombre);
                if (user.rol.toLowerCase() === "admin") { // Acceder a la propiedad 'rol'
                    navigate("/admin");
                } else if(user.rol.toLowerCase() === "supervisor") {
                    navigate("/supervisor");

                }else if (user.rol.toLowerCase() === "tecnico") {
                    navigate("/tecnico");
                }else {
                    navigate("/general");
                }
            }
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn) { // Si es un boolean, no necesita comparación
                setLoginStatus(response.data.user.nombre); // Acceder a la propiedad 'nombre'
            }
        });
    }, []);

    return (
        <div className={App}>
            <div className="App">
                <div className="login">
                    <h1>Login</h1>
                    <input type="text" placeholder="Usuario" onChange={(e) => setNombre(e.target.value)} />
                    <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={login}>Ingresar</button>
                </div>
                <h1>{loginStatus}</h1>
            </div>
        </div>
    );
}
