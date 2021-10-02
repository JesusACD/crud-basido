import React, { useState } from 'react'
import uniqid from 'uniqid';

const Listadonombres = () => {

    const [nombre, setNombre] = useState('')
    const [listanombre, setListanombre] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (e) => {
        e.preventDefault(e)
        if(!nombre.trim()){
            setError('el campo nombre esta vacio')
            return
        }
        const nuevoNombre = {
            id: uniqid(),
            titulonombre: nombre
        }
        // agregar valores a un array
        setListanombre([...listanombre,nuevoNombre])
        setNombre('')
        setError(null)
    }
    const deleNombre = (id) => {
        const newArray = listanombre.filter(item => item.id !== id)
        setListanombre(newArray)
    }
    const editar = (item) =>{
        setModoEdicion(true)
        setNombre(item.titulonombre)
        setId(item.id)
    }
    const editarNombre = (e) => {
        e.preventDefault()

        const nuevoArray = listanombre.map(item => item.id === id ? {id:item.id, titulonombre:nombre}: item)
        setListanombre(nuevoArray)
        // if (!nombre.trim()) {
        //     deleNombre(id)
        // }
        setNombre('')
        setModoEdicion(false)
    }
    return (
        <div>
            <h1>Aplicacion CRUD BASICO</h1>
            <div className="row">
                <div className="col">
                    <h2>Listadi de nombres</h2>
                    <ul className="list-group">
                        {
                            listanombre.map(item =>
                                <li key={item.id} className="list-group-item">
                                    {item.titulonombre}
                                    <button onClick={() => deleNombre(item.id)} className="btn btn-danger float-end">BORRAR</button>
                                    <button onClick={() => editar(item)} className="btn btn-info float-end">EDITAR</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                        <input onChange={(e) => setNombre(e.target.value)} 
                            className="form-control mb-3" 
                            type="text" 
                            placeholder="Introduce el nombre"
                            value={nombre}
                            />
                        <input className="btn btn-info btn-block" type="submit" value={modoEdicion ? 'Editar Nombre' : 'Registar Nombre'}/>
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger mt-2">El campo nombre esta vacio</div>
                        ): 
                        (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Listadonombres
