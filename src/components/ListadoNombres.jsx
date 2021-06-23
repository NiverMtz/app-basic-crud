import React, { useState } from "react";
import uniqid from "uniqid";

export const ListadoNombres = () => {
  const [nombre, setNombre] = useState("");
  const [listaNombres, setListaNombres] = useState([]);
  const [modoEdit, setmodoEdit] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(null)

  const addNombre = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
        setError('El campo nombre está vacío')
        return
    }
    const nuevoNombre = {
      id: uniqid(),
      tituloNombre: nombre,
    };
    setListaNombres([...listaNombres, nuevoNombre]);
    setNombre("");
    setError(null);
  };

  const deleteNombre = (id) => {
    const nuevaArray = listaNombres.filter((item) => item.id !== id);
    setListaNombres(nuevaArray);
  };

  const edit = (item) => {
    setmodoEdit(true);
    setNombre(item.tituloNombre);
    setId(item.id);
  };

  const editNombre = (e) => {
      e.preventDefault()
      const nuevoArray = listaNombres.map(item => item.id === id ? {id:item.id, tituloNombre:nombre} : item)
      setListaNombres(nuevoArray)
      setmodoEdit(false)
      setNombre('')
  }

  return (
    <div>
      <h2 className="mb-5">Aplicación de CRUD BÁSICA</h2>
      <div className="row">
        <div className="col">
          <h2 className="mb-3">Listado de Nombres</h2>
          <ul className="list-group ">
            {listaNombres.map((item) => (
              <li key="{item.id}" className="list-group-item">
                {item.tituloNombre}
                <button
                  className="btn btn-danger float-end"
                  onClick={() => {
                    deleteNombre(item.id);
                  }}
                >
                  BORRAR
                </button>
                <button
                  className="btn btn-info float-end"
                  onClick={() => {
                    edit(item);
                  }}
                >
                  EDITAR
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2 className="mb-5">Formulario para añadir nombres</h2>
          <form
            onSubmit={modoEdit ? editNombre : addNombre}
            action=""
            className="formgroup d-grid gap-3"
          >
            <input
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Introduce el nombre"
              value={nombre}
            />
            <input
              type="submit"
              className="btn btn-info"
              name=""
              id=""
              value={modoEdit ? 'EDITAR NOMBRE' : 'REGISTRAR NOMBRE'}
            />
          </form>
          {
              error != null ? (
                  <div className="alert alert-danger mt-3">
                      {error}
                  </div>
              ):
              (
                  <div></div>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default ListadoNombres;
