import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from "axios";
import { Nav } from 'react-bootstrap';
import { FaTools, FaWarehouse, FaUser} from 'react-icons/fa'; // Asegúrate de instalar react-icons

const Sidebar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      name: 'Soporte Técnico',
      icon: <FaTools />,
      options: [
        { name: 'Gestionar Equipos', path: '/gestionar-equipos' },
        { name: 'Generar Diagnósticos', path: '/generar-diagnosticos' },
        { name: 'Revisar Diagnósticos', path: '/revisar-diagnosticos' },
      ],
    },
    {
      name: 'Almacén',
      icon: <FaWarehouse />,
      options: [
        { name: 'Gestionar Almacén', path: '/gestionar-almacen' },
      ],
    },
    {
      name: 'Administrador',
      icon: <FaUser/>,
      options: [
        { name: 'Gestionar Usuarios', path: '/gestionar-usuarios' },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar sesión",
        cancelButtonText: "Cancelar"
      });
      if (result.isConfirmed) {
        await Axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true });
        navigate('/login');
      }
    } catch (error) {
      // Manejo de errores
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/auth', { withCredentials: true });
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  if (isAuthenticated) {
    return (
      <div className={`d-flex flex-column vh-100 bg-light ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        <button className="btn btn-primary m-2" onClick={toggleCollapse}>
          {collapsed ? '>' : '<'}
        </button>
        <Nav className="flex-column">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Nav.Link onClick={() => toggleMenu(index)} className="d-flex align-items-center">
                {item.icon}
                {!collapsed && <span className="ms-2">{item.name}</span>}
              </Nav.Link>
              {openMenu === index && !collapsed && (
                <Nav className="flex-column ms-3">
                  {item.options.map((option, idx) => (
                    <Nav.Link key={idx} className="text-muted" onClick={() => navigate(option.path)}>
                      {option.name}
                    </Nav.Link>
                  ))}
                </Nav>
              )}
            </div>
          ))}
        </Nav>
        <button className="btn btn-danger m-2" onClick={handleLogout}>
          <i className="fa-solid fa-power-off"></i> Cerrar Sesión
        </button>
      </div>
    );
  } else {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Sidebar;