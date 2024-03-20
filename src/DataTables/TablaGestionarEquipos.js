import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import Axios from "axios"

function TablaGestionarEquipos() {
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
      wrap: true,
    },
    {
      name: 'Guía',
      selector: row => row.numeroguia,
      width: '90px',
      wrap: true,
    },
    {
      name: 'Equipo',
      selector: row => row.equipo,
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
      wrap: true,
    },
    {
      name: 'Accesorios',
      selector: row => row.accesorios,
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
        <button className="btn btn-primary"><i className="fa-regular fa-eye"></i></button>
      )
    },
    {
      name: 'Editar',
      cell:(row) => (
        <button className="btn btn-primary"><i className="fa-regular fa-pen-to-square"></i></button>
      )
    },
    {
      name: 'Eliminar',
      cell:(row) => (
        <button className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
      )
    },
  ];

  const tableStyles = {
    headRow:{
      style: {
        justifyContent: "center",
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
      }
    },
    cells:{
      style:{
        justifyContent: "center",
        overflowX: "visible",
        textAlign: "center",
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
  )
}

export default TablaGestionarEquipos