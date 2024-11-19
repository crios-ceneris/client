import React, { useState, useEffect}  from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Axios from "axios"
import CompRoutes from './CompRoutes.js'
import { Navbar, Nav, Accordion, Container } from 'react-bootstrap'
import whiteLogo from '../images/cen_white-wp.webp'

function NavbarComponent() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
  const handleLogout = async () => {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar sesión",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.post('http://localhost:3001/api/logout',{}, { 
            withCredentials: true 
          })
          navigate('/login')
        }
      })  
    } catch (error) {
      
    }
  }
  const handleClick = (path) => {
    navigate(path)
  }

  // Valida si el usuario esta logeado
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
        navigate('/login')
      }
    }
    fetchData()
  }, [navigate])

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed)
  }
  
  if(isAuthenticated){
    return (
      <div className='container m-0' style={{maxWidth: 'none'}}>
        <div className='row'>
          <div className='col-2 bg-dark p-3'>
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <img className='logo' src={whiteLogo} width="80%" height="auto" alt='Logo' />
            </div>
            <div className='d-flex flex-column'>
              <div className="">
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item bg-dark text-white' 
                      data-bs-toggle="collapse" 
                      href='#collapseSoporte' 
                      role='button'>Soporte Técnico</li>
                    <ul className='list-group-flush collapse' id='collapseSoporte'>
                      <li 
                        className='list-group-item bg-dark text-white' 
                        role='button'
                        onClick={() => handleClick('/gestionar-equipos')}
                      >Gestionar Equipos</li>
                      <li 
                        className='list-group-item bg-dark text-white'
                        role='button'
                        onClick={() => handleClick('/generar-diagnosticos')}
                      >Generar Diagnósticos</li>
                      <li 
                        className='list-group-item bg-dark text-white'
                        role='button'
                        onClick={() => handleClick('/revisar-diagnosticos')}
                      >Revisar Diagnósticos</li>
                    </ul>
                  <li className='list-group-item bg-dark text-white' 
                      data-bs-toggle="collapse" 
                      href='#collapseAlmacen' 
                      role='button'>Almacén</li>
                    <ul className='list-group-flush collapse' id='collapseAlmacen'>
                      <li 
                        className='list-group-item bg-dark text-white'
                        role='button'
                        onClick={() => handleClick('/gestionar-almacen')}
                      >Gestionar Almacén</li>
                    </ul>
                  <li className='list-group-item bg-dark text-white' 
                      data-bs-toggle="collapse" 
                      href='#collapseAdmin' 
                      role='button'>Administrador</li>
                    <ul className='list-group-flush collapse' id='collapseAdmin'>
                      <li
                        className='list-group-item bg-dark text-white'
                        role='button'
                        onClick={() => handleClick('/gestionar-usuarios')}
                      >Gestionar Usuarios</li>
                    </ul>
                </ul>
              </div>
            </div>
            <div className='list-group list-group-flush mt-5'>
              <button className="btn btn-danger" type="button" onClick={handleLogout}>
                <i className="fa-solid fa-power-off"></i>
              </button>
            </div>
          </div>
          <div className='col p-3'>
            <CompRoutes />
          </div>     
        </div>
      </div>
    )
  } else {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
}

export default NavbarComponent