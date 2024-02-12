import React, { useState, useEffect} from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Lógica para validar autenticación y rol
  useEffect( () =>{
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/auth', { 
          withCredentials: true 
        })
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true)
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.log('el error es: '+error)
        navigate('/login')
      }
    }
    fetchData()
  }, [navigate])

  if (isAuthenticated) {
    return (
      <div>
          <h2>Admin</h2>
          <p>Contenido de la página protegida.</p>
      </div>
    )
  } else {
    return <div>Cargando...</div>
  }
}

export default Admin
