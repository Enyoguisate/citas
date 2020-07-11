import React, { Fragment, useState } from "react";
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({citas, crearCita}) => {
  // Crear State de Citas
  const [cita, actualicarCita] = useState({
    id: 0,
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [ error, actualizarError ] = useState(false);

  // Funcion que se ejecuta cuando el usuario escribe un input
  const actualizarState = (event) => {
    actualizarError(false);
    actualicarCita({
      ...cita,
      [event.target.name]: event.target.value
    })
  }

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita
  const submitCita = (event) => {
    event.preventDefault();
    // Validar Campos
    if (mascota.trim() === '' || propietario.trim() === '' || 
    fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
      actualizarError(true);
      return;
    } 
    actualizarError(false);
    // Asignar Id
    cita.id = uuid();
    // Crear la cita
    crearCita(cita);
    // Reiniciar el form
    actualicarCita({
      id: 0,
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  } 
  return (
    <Fragment>
      <h2>Crear Cita</h2>
      { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }
      <form
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          value={mascota}
          onChange={actualizarState}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          value={propietario}
          onChange={actualizarState}
        />
        <label>Fecha</label>
        <input 
          type="date" 
          name="fecha" 
          className="u-full-width" 
          value={fecha}
          onChange={actualizarState}
        />
        <label>Hora</label>
        <input 
          type="time" 
          name="hora" 
          className="u-full-width" 
          value={hora}
          onChange={actualizarState}
        />
        <label>Sintomas</label>
        <textarea
          type="text"
          name="sintomas"
          className="u-full-width"
          value={sintomas}
          onChange={actualizarState}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  citas: PropTypes.array.isRequired,
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
