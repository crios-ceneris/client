import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GenerarDiagnosticos() {
  const [diagnosticsData, setDiagnosticsData] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/diagnostico'); // Reemplaza con la URL de tu backend
        const data = await response.json();
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        setDiagnosticsData(data);
      } catch (error) {
        console.error(error);
        // Mostrar un mensaje de error al usuario
      }
    };

    fetchData();
  }, []);

  return (
      <div className='p-2'>
        {/* Título de la tabla */}
        <div className='d-grid gap-2'>
          <div className='p-1 bg-primary rounded-2 text-center text-white fw-medium'>Generar Diagnósticos</div>
        </div>

        {/* Tabla con datos */}
        <div className='mt-4'>
          <div className="input-group w-25 mb-4">
            <span className="input-group-text bg-success text-white">Responsable</span>
            <input type="text" className="form-control bg-light fw-medium" disabled readOnly/> <td>{username}</td>
          </div>
          <div className='table-responsive'>
            <table className='table text-center'>
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Equipo</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Serie</th>
                <th scope="col">Fecha de Recepción</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Responsable</th>
                <th scope="col">Fecha Límite</th>
                <th scope="col">Estado</th>
                <th scope="col">Opciones</th>
                <th scope="col">Observaciones</th>
              </tr>
              </thead>
              <tbody>
              {diagnosticsData.map((diagnostic, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{diagnostic.Cliente}</td>
                    <td>{diagnostic.equipo}</td>
                    <td>{diagnostic.Marca}</td>
                    <td>{diagnostic.Modelo}</td>
                    <td>{diagnostic.Serie}</td>
                    <td>{diagnostic.fecharecepcion}</td>
                    <td>{diagnostic.Prioridad}</td>
                    <td>{diagnostic.Responsable}</td>
                    <td>{diagnostic.fechalimite}</td>
                    <td>{diagnostic.estadorevision}</td>
                    <td>
                      {/* Agregar botones para editar, eliminar y ver detalles del diagnóstico */}
                      <button className="btn btn-sm btn-primary"><i className="fa-solid fa-file-pen"></i></button>
                      <button className="btn btn-sm btn-danger"><i className="fa-solid fa-trash"></i></button>
                      <button className="btn btn-sm btn-info"><i className="fa-solid fa-circle-info"></i></button>
                    </td>
                    <td>{diagnostic.Observaciones}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default GenerarDiagnosticos;
