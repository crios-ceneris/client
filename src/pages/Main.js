import React, {useEffect, useState} from 'react';
import axios from "axios";
import Axios from "axios";

export default function Main() {
    const [role, setRole] = useState("");


    useEffect(() => {

        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setRole(response.data.user[0].role);
            }
        });
    }, []);

    return(
        <div>
            <h1>Admin</h1>
        </div>

    );
}
