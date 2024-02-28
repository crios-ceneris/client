import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function GenerarDiagnosticos() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
              <th scope="col">Diagnóstico</th>
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
                  <td><button className="btn btn-sm btn-primary" type='button' onClick={handleShow}><i className="fa-solid fa-plus"></i></button></td>
                  <td>
                    {/* Agregar botones para editar, eliminar y ver detalles del diagnóstico */}
                    <button className="btn btn-sm btn-info"><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className="btn btn-sm btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                  <td>{diagnostic.Observaciones}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
          show={show} 
          size='lg'
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          >
          <Modal.Header closeButton>
            <Modal.Title>Generar Diagnóstico</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form className='w-100'>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-3'>
                    <span className="input-group-text" id="numerodiagnostico">Diagnóstico N°</span>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-3'>
                    <span className="input-group-text" id="fechaRecepcion">Fecha Recepción</span>
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>DATOS GENERALES</div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="equipo">Equipo</label>
                    <input type="text" className="form-control" id="equipo" />
                  </div>
                  <div class="form-group">
                    <label for="marca">Marca</label>
                    <input type="text" className="form-control" id="marca"/>
                  </div>
                  <div class="form-group">
                    <label for="modelo">Modelo</label>
                    <input type="text" className="form-control" id="modelo"/>
                  </div>
                  <div class="form-group">
                    <label for="serie">Serie</label>
                    <input type="text" className="form-control" id="serie"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="accesorios">Accesorios</label>
                    <textarea className="form-control" id="accesorios" rows="3"></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label for="aplicacion">Uso / Aplicación</label>
                  <input type="text" className="form-control" id="aplicacion"/>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>ESTADO DE INGRESO</div>
              <div className="row">
                <div className="form-group">
                  <textarea className="form-control" id="estadoingreso" rows="4"></textarea>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>DIAGNÓSTICO</div>
              <div className="row">
                <div className="form-group">
                  <textarea className="form-control" id="diagnostico" rows="4"></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaManufactura">Fecha Manufactura</span>
                    <input type="date" class="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaCalibracion">Fecha Calibración</span>
                    <input type="date" class="form-control" />
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>RECOMENDACIONES / OBSERVACIONES</div>
              <div className="row">
                <div className="form-group">
                  <textarea className="form-control" id="recomendaciones" rows="4"></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaRevisión">Fecha Revisión</span>
                    <input type="date" class="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="realizadoPor">Realizado por:</span>
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>ADJUNTOS</div>
              <div className="row">
                <div className="col-md-7">
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" id="descFig1" placeholder="Descripción Fig. 1:"/>
                  </div>
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" id="descFig2" placeholder="Descripción Fig. 2:"/>
                  </div>
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" id="descFig3" placeholder="Descripción Fig. 3:"/>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura1" placeholder='Figura 1'/>
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura2"/>
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura3"/>
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

    </div>
  );
};

export default GenerarDiagnosticos;
