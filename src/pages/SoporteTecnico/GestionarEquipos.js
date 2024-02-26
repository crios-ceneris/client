import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function GestionarEquipos() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return(
    <div className='p-2'>
      {/* Título de la tabla */}
      <div className='d-grid gap-2'>
        <div className='p-1 bg-primary rounded-2 text-center text-white fw-medium'>Gestionar Equipos</div>
      </div>

      {/* Tabla con datos */}
      <div className='mt-4'>
        <div className="input-group w-25 mb-4">
          <button className='btn btn-success' type='button' onClick={handleShow}>Registrar Equipo</button>
        </div>
        <div className='table-responsive'>
          <table className='table table-bordered text-center table-hover'>
            <thead className='table-primary'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Servicio</th>
                <th scope="col">Cliente</th>
                <th scope="col">#Guía</th>
                <th scope="col">Equipo</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Serie</th>
                <th scope="col">Accesorios</th>
                <th scope="col">Fecha de Recepción</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Responsable</th>
                <th scope="col">Diagnostico</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th scope='row'>1</th>
                <td>Local</td>
                <td>Ceneris EIRL Proyecto Cerro Verde</td>
                <td>204</td>
                <td>Bomba Gravimétrica</td>
                <td>SKC</td>
                <td>XR5000</td>
                <td>86303</td>
                <td>Sin Accesorios</td>
                <td>04/01/2024</td>
                <td>Muy Alta</td>
                <td>Técnico 1</td>
                <td>Ver</td>
                <td>Editar/Eliminar</td>
              </tr>
              <tr>
                <th scope='row'>2</th>
                <td>Local</td>
                <td>Ceneris EIRL Proyecto Cerro Verde</td>
                <td>206</td>
                <td>Vibrómetro</td>
                <td>Larson Davis</td>
                <td>HVM 200</td>
                <td>0001101</td>
                <td>SEN027 SN: P208766, SEN 041F SN: SN:P360675</td>
                <td>28/01/2024</td>
                <td>Alta</td>
                <td>Técnico 2</td>
                <td>Ver</td>
                <td>Editar/Eliminar</td>
              </tr>
            </tbody>     
          </table>
        </div>
      </div>
      <div>
        {/* Formulario Modal para Registrar Equipos*/}
        <Modal 
          show={show} 
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title text-center>Registrar Equipo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Servicio</Form.Label>
                <Form.Select aria-label="Seleccionar Servicio">
                  <option>Seleccione</option>
                  <option value='Local'>Local</option>
                  <option value='Tercero'>Tercero</option>
                </Form.Select>
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                  type="text"/>
                <Form.Label>Serie</Form.Label>
                <Form.Control
                  type="text"/>
                <Form.Label>Equipo</Form.Label>
                <Form.Control
                  type="text"/>
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"/>
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"/>
                <Form.Label>Accesorios</Form.Label>
                <Form.Group
                  className="mb-3"
                  controlId="Accesorios">
                  <Form.Control as="textarea" rows={2} />
                </Form.Group>
                <Form.Label>Fecha de Recepción</Form.Label>
                <Form.Control
                  type="date"/>
                <Form.Label>Prioridad</Form.Label>
                <Form.Select aria-label="Seleccionar Prioridad">
                  <option>Seleccione</option>
                  <option value='Muy Alta'>Muy Alta</option>
                  <option value='Alta'>Alta</option>
                  <option value='Normal'>Normal</option>
                </Form.Select>
                <Form.Label>Responsable</Form.Label>
                <Form.Select aria-label="Seleccionar Responsable">
                  <option>Seleccione</option>
                </Form.Select>
                <Form.Label>Fecha Límite</Form.Label>
                <Form.Control
                  type="date"/>    
              </Form.Group>
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
    </div>
  )
}

export default GestionarEquipos