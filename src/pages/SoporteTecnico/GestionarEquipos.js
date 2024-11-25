import React, {useEffect, useState} from 'react'
import { Button, Modal, Form, ModalFooter } from 'react-bootstrap'
import Axios from "axios"
import Swal from 'sweetalert2'
import TablaGestionarEquipos from '../../DataTables/TablaGestionarEquipos.js'

function GestionarEquipos() {

  // Estados para el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[data, setData] = useState([])

  // Estado para almacenar datos de equipos
  const[dataUsers, setDataUsers] =  useState([])

  // Estado para el nuevo equipo
  const [newEquipo, setNewEquipo] = useState({
    servicio: '',
    cliente: '',
    numeroGuia: '',
    equipo: '',
    marca: '',
    modelo: '',
    serie: '',
    accesorios: '',
    fechaRecepcion: '',
    prioridad: '',
    responsable: '',
  });

  // Función para manejar cambios en el formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEquipo({ ...newEquipo, [name]: value });
  };

  // Función para enviar datos a la API y agregar equipo
  const handleAddEquipo = async() => {
    try {
      console.log('Datos enviados: ', newEquipo)
      const addNewEquipo = await Axios.post(`http://localhost:3001/api/agregar-equipo`,{
        servicio: newEquipo.servicio,
        numeroGuia: newEquipo.numeroGuia,
        cliente: newEquipo.cliente,
        serie: newEquipo.serie,
        marca: newEquipo.marca,
        equipo: newEquipo.equipo,
        modelo: newEquipo.modelo,
        accesorios: newEquipo.accesorios,
        fechaRecepcion: newEquipo.fechaRecepcion,
        prioridad: newEquipo.prioridad,
        responsable: newEquipo.responsable,
      })
      if (addNewEquipo.status === 201) {
        handleClose()
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Equipo registrado correctamente",
          showConfirmButton: false,
          timer: 1000
        })
        fetchData()
        setNewEquipo(newEquipo)
      }
      else {
        Swal.fire({
          position: "top-center",
          icon: "warning",
          title: "No ha sido posible registrar equipo",
          showConfirmButton: false,
          timer: 1000
        })
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "errow",
        title: "Oops... ocurrio un error!",
        showConfirmButton: false,
        timer: 1000
      })
      console.error('Error al registrar equipo: ', error)
    }
  }

  // Función para obtener datos de equipos
  const fetchData = async() => {
    try {
      const backData = await Axios.get('http://localhost:3001/api/obtener-equipos')
      setData(backData.data)
    } catch (error) {
      console.error('Error al obtener datos', error)
    }
  }

  const fetchUserData = async() => {
    try {
      const dataUser = await Axios.get('http://localhost:3001/api/users-names-data')
      setDataUsers(dataUser.data)
      console.log('usuarios obtenidos: ', dataUser.data)
    } catch (error) {
      console.error('Error al obtener usuarios', error)
    }
  }

  useEffect(() =>{
    fetchData()
    fetchUserData()
  }, [])

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
      </div> 
      
      <TablaGestionarEquipos/>
      
      {/* Formulario Modal para Registrar Equipos*/}
      <div>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton className='text-bg-success'>
            <Modal.Title>Agregar Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="w-100">
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Servicio:</Form.Label>
                    <Form.Select
                      name="servicio"
                      value={newEquipo.servicio}
                      onChange={handleChange}>
                      <option value="">Seleccione</option>
                      <option value="Local">Local</option>
                      <option value="Tercero">Tercero</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>#Guía:</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroGuia"
                      value={newEquipo.numeroGuia}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Control
                    type="text"
                    name="cliente"
                    value={newEquipo.cliente}
                    onChange={handleChange}/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Serie:</Form.Label>
                    <Form.Control
                      type="text"
                      name="serie"
                      value={newEquipo.serie}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Marca:</Form.Label>
                    <Form.Control
                      type="text"
                      name="marca"
                      value={newEquipo.marca}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Equipo:</Form.Label>
                    <Form.Control
                      type="text"
                      name="equipo"
                      value={newEquipo.equipo}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Modelo:</Form.Label>
                    <Form.Control
                      type="text"
                      name="modelo"
                      value={newEquipo.modelo}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Accesorios:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="accesorios"
                    value={newEquipo.accesorios}
                    onChange={handleChange}/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha Recepcion:</Form.Label>
                    <Form.Control type="date" name="fechaRecepcion" 
                    value={newEquipo.fechaRecepcion} 
                    onChange={handleChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Prioridad:</Form.Label>
                    <Form.Select name="prioridad" 
                      value={newEquipo.prioridad} 
                      onChange={handleChange}>
                      <option value="">Seleccione</option>
                      <option value="Muy Alta">Muy Alta</option>
                      <option value="Alta">Alta</option>
                      <option value="Normal">Normal</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Responsable:</Form.Label>
                    <Form.Select name="responsable" 
                      value={newEquipo.responsable} 
                      onChange={handleChange}>
                      <option value="">Seleccione</option>
                      {dataUsers.map(item => (
                        <option key={item.id} value={item.id}>{item.fullName}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <ModalFooter>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddEquipo}>
              Guardar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default GestionarEquipos