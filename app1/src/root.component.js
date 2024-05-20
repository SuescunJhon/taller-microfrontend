import { useState } from 'react'
import {almacenarInformacion} from '@talleres/store'

export default function Root(props) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = event => {
    event.preventDefault()

    const datos = {
      nombre: nombre,
      apellido: apellido,
      descripcion: descripcion
    }

    almacenarInformacion(datos)

    setNombre('')
    setApellido('')
    setDescripcion('')
  }

  return <>
    <h1>{props.name} Formulario</h1>
    <form onSubmit={handleSubmit}>
      <label>Nombre:
        <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} />
      </label>

      <label>Apellido:
        <input type="text" value={apellido} onChange={(event) => setApellido(event.target.value)} />
      </label>

      <label>Descripcion:
        <textarea value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
      </label>

      <button type="submit">Enviar</button>
    </form>
  </>
}
