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
      <div>
        <div className='mt-3'>
          <button className='btn btn-success' type='button' onClick={handleShow}>Registrar Equipo</button>
        </div>

        {/* Formulario Modal */}
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