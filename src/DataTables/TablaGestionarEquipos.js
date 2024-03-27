import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'
import DataTable from "react-data-table-component"
import Axios from "axios"

function TablaGestionarEquipos() {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const columns = [
    {
      name: '#',
      selector: row => row.id,
      width: '50px',
      wrap: true,
    },
    {
      name: 'Servicio',
      selector: row => row.servicio,
      width: '100px',
      wrap: true,
    },
    {
      name: 'Cliente',
      selector: row => row.cliente,
      width: '100px',
      wrap: true,
    },
    {
      name: '#Guía',
      selector: row => row.numeroguia,
      width: '80px',
      wrap: true,
    },
    {
      name: 'Equipo',
      selector: row => row.equipo,
      width: '120px',
      wrap: true,
    },
    {
      name: 'Marca',
      selector: row => row.marca,
      wrap: true,
    },
    {
      name: 'Modelo',
      selector: row => row.modelo,
      wrap: true,
    },
    {
      name: 'Serie',
      selector: row => row.serie,
      width: '80px',
      wrap: true,
    },
    {
      name: 'Accesorios',
      selector: row => row.accesorios,
      width: '200px',
      wrap: true,
    },
    {
      name: 'F. Recepción',
      selector: row => row.fecharecepcion,
      wrap: true,
    },
    {
      name: 'Prioridad',
      selector: row => row.prioridad,
      wrap: true,
    },
    {
      name: 'Responsable',
      selector: row => row.responsable,
      wrap: true,
    },
    {
      name: 'Diagnóstico',
      cell:(row) => (
        <button className="btn btn-primary btn-sm"><i className="fa-regular fa-eye"></i></button>
      )
    },
    {
      name: 'Opciones',
      cell:(row) => (
        <div>
          <button className="btn btn-info btn-sm" onClick={handleShow}><i className="fa-regular fa-pen-to-square"></i></button>
          <button className="btn btn-danger btn-sm"><i className="fa-solid fa-trash"></i></button>
        </div>
        
      )
    },
  ];

  const tableStyles = {
    headRow:{
      style: {
        justifyContent: "center",
        padding: "0 5px 0 5px",
      }
    },
    headCells:{
      style:{
        fontWeitgth: "bold",
        fontSize: "14px",
        justifyContent: "center",
        overflowX: "hidden",
        wrap: true,
        width: "100px",
        padding: "0 5px 0 5px",
      }
    },
    cells:{
      style:{
        justifyContent: "center",
        overflowX: "visible",
        textAlign: "center",
        padding: "0 5px 0 5px",
      }
    }
  }

  const[data, setData] = useState([])
  const[search, setSearch] = useState('')
  const[filter, setFilter] = useState([])

  const handleSearch = (e) => {
    const searchText = e.target.value
    setSearch(searchText)

    if (searchText) {
      setFilter(
        data.filter((row) => {
          return Object.values(row)
          .join("").toLowerCase()
          .includes(searchText.toLowerCase())
        })
      )
    } else {
      setFilter(data)
    }
  }

  useEffect(() =>{
    const fetchData = async() => {
      try {
        const result = await Axios.get('http://localhost:3001/api/equipos')
        setData(result.data)
        setFilter(result.data)
      } catch (error) {
        console.error('Error al obtener datos', error)
      }
    }
    fetchData()
  }, [])

  return(
    <div>
      <DataTable
        customStyles={tableStyles}
        columns={columns}
        data={filter}
        responsive
        pagination
        subHeader
        subHeaderComponent={
          <input type="text" 
          className="w-25 form-control"
          placeholder="Buscar..."
          value={search}
          onChange={handleSearch}/>
        }/>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="w-100">
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Servicio:</Form.Label>
                    <Form.Select
                        name="servicio">
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
                        name="numeroguia"/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Control
                      type="text"
                      name="cliente"/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Serie:</Form.Label>
                    <Form.Control
                        type="text"
                        name="serie"/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Marca:</Form.Label>
                    <Form.Control
                        type="text"
                        name="marca"/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Equipo:</Form.Label>
                    <Form.Control
                        type="text"
                        name="equipo"/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Modelo:</Form.Label>
                    <Form.Control
                        type="text"
                        name="modelo"/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Accesorios:</Form.Label>
                  <Form.Control
                      as="textarea"
                      name="accesorios"/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                  <Form.Label>Fecha Recepcion:</Form.Label>
                  <Form.Control type="date"/>
                </Form.Group>
                </div>
                <div className="col md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Prioridad:</Form.Label>
                  <Form.Select
                      name="prioridad">
                    <option value="">Seleccione</option>
                    <option value="Muy Alta">Muy Alta</option>
                    <option valute="Alta">Alta</option>
                    <option value="Normal">Normal</option>
                  </Form.Select>
                </Form.Group>
                </div>
                <div className="col md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Responsable:</Form.Label>
                  <Form.Select
                      name="responsable">
                  </Form.Select>
                </Form.Group>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default TablaGestionarEquipos