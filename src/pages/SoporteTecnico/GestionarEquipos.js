import React, {useEffect, useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import MUIDataTable from "mui-datatables";


function GestionarEquipos() {

  // Estados para el modal
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => {
    setShow2(false);

  }

  const handleShow = () => setShow(true);

  const handleShow2 = (index) => {
    const selectedEquipo = equipoData[index];
    setEquipoEditado(selectedEquipo); // Establecer el equipo que se está editando
    setEditFormData({  // Establecer editFormData con los valores del equipo seleccionado
      servicio: selectedEquipo.servicio,
      cliente: selectedEquipo.cliente,
      numeroguia: selectedEquipo.numeroguia,
      equipo: selectedEquipo.equipo,
      marca: selectedEquipo.marca,
      modelo: selectedEquipo.modelo,
      serie: selectedEquipo.serie,
      accesorios: selectedEquipo.accesorios,
      fecharecepcion: selectedEquipo.fecharecepcion,
      prioridad: selectedEquipo.prioridad,
      responsable: selectedEquipo.responsable,
    });
    setShow2(true);
  };
  // Estado para almacenar datos de equipos
  const [equipoData, setEquipoData] = useState([]);
  const [responsableOpciones, setResponsableOpciones] = useState([]);

  // Estado para el equipo a editar
  const [equipoEditado, setEquipoEditado] = useState(null);

// Estado para almacenar los cambios realizados en el formulario de edición
  const [editFormData, setEditFormData] = useState({
    servicio: '',
    cliente: '',
    numeroguia: '',
    equipo: '',
    marca: '',
    modelo: '',
    serie: '',
    accesorios: '',
    fecharecepcion: '',
    prioridad: '',
    responsable: '',
  });

// Función para manejar cambios en el formulario de edición
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };




  // Estado para el nuevo equipo
  const [newEquipo, setNewEquipo] = useState({
    servicio: '',
    cliente: '',
    numeroguia: '',
    equipo: '',
    marca: '',
    modelo: '',
    serie: '',
    accesorios: '',
    fecharecepcion: '',
    prioridad: '',
    responsable: '',
  });

  // Función para manejar cambios en el formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEquipo({ ...newEquipo, [name]: value });
  };



  // Función para enviar datos a la API y agregar equipo
  const handleAddEquipo = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/agregar-equipo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEquipo),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Equipo agregado correctamente');
        // Actualizar la lista de equipos
        fetchData();
        // Cerrar el modal
        handleClose();
        // Limpiar el estado del nuevo equipo
        setNewEquipo({
          servicio: '',
          cliente: '',
          numeroguia: '',
          serie: '',
          equipo: '',
          marca: '',
          modelo: '',
          accesorios: '',
          fecharecepcion: '',
          prioridad: '',
          responsable: '',
        });
      } else {
        console.error('Error al agregar equipo:', data.message);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al agregar equipo:', error);
      // Mostrar un mensaje de error al usuario
    }
  };


  const handleEditEquipo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/editar-equipo/${equipoEditado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Equipo editado correctamente');
        // Actualizar la lista de equipos
        fetchData();
        // Cerrar el modal
        handleClose2();
        // Limpiar el estado del equipo editado y los datos del formulario de edición
        setEquipoEditado(null);
        setEditFormData({
          servicio: '',
          cliente: '',
          numeroguia: '',
          serie: '',
          equipo: '',
          marca: '',
          modelo: '',
          accesorios: '',
          fecharecepcion: '',
          prioridad: '',
          responsable: '',
        });
      } else {
        console.error('Error al editar equipo:', data.message);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al editar equipo:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const handleEliminarEquipo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/eliminar-equipo/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        console.log('Equipo eliminado correctamente');
        // Filtrar el equipo eliminado de la lista actual
        const nuevaListaEquipos = equipoData.filter(equipo => equipo.id !== id);
        // Actualizar el estado equipoData con la nueva lista filtrada
        setEquipoData(nuevaListaEquipos);
      } else {
        console.error('Error al eliminar equipo:', data.message);
      }
    } catch (error) {
      console.error('Error al eliminar equipo:', error);
    }
  };

  // Función para obtener datos de equipos
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/equipos');
      const data = await response.json();
      const responseServicios = await fetch('http://localhost:3001/api/servicios');
      const dataServicios = await responseServicios.json();
      const responsePrioridades = await fetch('http://localhost:3001/api/prioridad');
      const dataPrioridad = await responsePrioridades.json();
      const responseResponsable = await fetch('http://localhost:3001/api/responsable');
        const dataResponsable = await responseResponsable.json();
      setEquipoData(data);
      setResponsableOpciones(dataResponsable);
    } catch (error) {
      console.error(error);
      // Mostrar un mensaje de error al usuario
    }
  };

  // Efecto para obtener datos al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);


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
            {equipoData.map((equipo, index) => (
                <tr key={index}>
                  <td>{equipo.id}</td>
                  <td>{equipo.servicio}</td>
                  <td>{equipo.cliente}</td>
                  <td>{equipo.numeroguia}</td>
                  <td>{equipo.equipo}</td>
                  <td>{equipo.marca}</td>
                  <td>{equipo.modelo}</td>
                  <td>{equipo.serie}</td>
                  <td>{equipo.accesorios}</td>
                  <td>{new Date(equipo.fecharecepcion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</td>
                  <td>{equipo.prioridad}</td>
                  <td>{equipo.responsable}</td>
                  <td>
                    <button className="btn btn-sm btn-primary" ><i className="fa-solid fa-eye"></i></button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info" type='button' onClick={() => handleShow2(index)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleEliminarEquipo(equipo.id)}><i
                        className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {/* Formulario Modal para Registrar Equipos*/}
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddEquipo}>
              <Form.Group className="mb-3">
                <Form.Label>Servicio:</Form.Label>
                <Form.Select
                    name="servicio"
                    value={newEquipo.servicio}
                    onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Local">Local</option>
                  <option value="Tercero">Tercero</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cliente:</Form.Label>
                <Form.Control
                    type="text"
                    name="cliente"
                    value={newEquipo.cliente}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>#Guía:</Form.Label>
                <Form.Control
                    type="text"
                    name="numeroguia"
                    value={newEquipo.numeroguia}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Serie:</Form.Label>
                <Form.Control
                    type="text"
                    name="serie"
                    value={newEquipo.serie}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Equipo:</Form.Label>
                <Form.Control
                    type="text"
                    name="equipo"
                    value={newEquipo.equipo}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca:</Form.Label>
                <Form.Control
                    type="text"
                    name="marca"
                    value={newEquipo.marca}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Modelo:</Form.Label>
                <Form.Control
                    type="text"
                    name="modelo"
                    value={newEquipo.modelo}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Accesorios:</Form.Label>
                <Form.Control
                    type="text"
                    name="accesorios"
                    value={newEquipo.accesorios}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha Recepcion:</Form.Label>
                <Form.Control
                    type="date"
                    name="fecharecepcion"
                    value={newEquipo.fecharecepcion}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Prioridad:</Form.Label>
                <Form.Select
                    name="prioridad"
                    value={newEquipo.prioridad}
                    onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Muy Alta">Muy Alta</option>
                  <option valute="Alta">Alta</option>
                  <option value="Normal">Normal</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Responsable:</Form.Label>
                <Form.Select
                    name="responsable"
                    value={newEquipo.responsable}
                    onChange={handleChange}
                >
                  {responsableOpciones.map((opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.responsable}
                      </option>
                  ))}
                </Form.Select>
              </Form.Group>


              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditEquipo}>
              <Form.Group className="mb-3">
                <Form.Label>Servicio:</Form.Label>
                <Form.Select
                    name="servicio"
                    value={editFormData.servicio}
                    onChange={handleEditFormChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Local">Local</option>
                  <option value="Tercero">Tercero</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label >Cliente:</Form.Label>
                <Form.Control
                    type="text"
                    name="cliente"
                    value={editFormData.cliente}
                    onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>#Guía:</Form.Label>
                <Form.Control
                    type="text"
                    name="numeroguia"
                    value={editFormData.numeroguia}
                    onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Serie:</Form.Label>
                <Form.Control
                    type="text"
                    name="serie"
                    value={editFormData.serie}
                    onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Equipo:</Form.Label>
                <Form.Control
                    type="text"
                    name="equipo"
                    value={editFormData.equipo}
                    onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca:</Form.Label>
                <Form.Control
                    type="text"
                    name="marca"
                    value={editFormData.marca}
                    onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Modelo:</Form.Label>
                <Form.Control
                    type="text"
                    name="modelo"
                    value={editFormData.modelo}
                    onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Accesorios:</Form.Label>
                <Form.Control
                    type="text"
                    name="accesorios"
                    value={editFormData.accesorios}
                    onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha Recepcion:</Form.Label>
                <Form.Control
                    type="date"
                    name="fecharecepcion"
                    value={editFormData.fecharecepcion}
                    onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Prioridad:</Form.Label>
                <Form.Select
                    name="prioridad"
                    value={editFormData.prioridad}
                    onChange={handleEditFormChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Muy Alta">Muy Alta</option>
                  <option valute="Alta">Alta</option>
                  <option value="Normal">Normal</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Responsable:</Form.Label>
                <Form.Select
                    name="responsable"
                    value={editFormData.responsable}
                    onChange={handleEditFormChange}
                >
                  {responsableOpciones.map((opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.responsable}
                      </option>
                  ))}
                </Form.Select>
              </Form.Group>


              <Button variant="primary" type="submit" onClick={handleEditEquipo}>
                Guardar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}

export default GestionarEquipos