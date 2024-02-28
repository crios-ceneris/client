import React from "react"
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'USER ID',
    selector: 'userId',
  },
  {
    name: 'ID',
    selector: 'id',
  },
  {
    name: 'TITULO',
    selector: 'title',
  },
  {
    name: 'CONTENIDO',
    selector: 'body',
  },
]

const data = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }
]

const TablaGestionarEquipos = () => {
  return(
  <DataTable
    title='Data example'
    columns={columns}
    data={data}
    pagination/>
  )
}

export default TablaGestionarEquipos