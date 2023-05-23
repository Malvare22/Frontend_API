import React, { useEffect, useState } from 'react'
import Tabla from "./Lider_Tabla_idea";
import axios from "axios";

export default function Listar_Ideas() {
    return (
            <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Ideas de Negocio</h1>
                    <div className="container">
                        <Filtros></Filtros>
                        <br></br>
                        <Tabla></Tabla>
                        <br></br>
                        <div className="d-flex justify-content-end">
                        <button type="button" className="btn rounded-3" style={{background: "#1C3B57", color: "#FFFFFF"}}>
                <div className="row">
                    <div className="col-auto">
                        Generar informe
                    </div>
                    <div className="col-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
</svg>
                    </div>
                </div>                    
              </button> 
                        </div>                          
                    </div>
                </div>
            </div>
        </div>
    );
}
function Filtros() {
    return (<form className="row gy-2 gx-1">
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="tutor" className="form-select-sm selector fw-bold text-black">
                <option selected="0">Tutor</option>
                <Getdocentes></Getdocentes>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="estudiante" className="form-select-sm selector fw-bold text-black">
                <option selected="0">Estudiante</option>
                <Getestudiantes></Getestudiantes>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="actividad" className="form-select-sm selector fw-bold text-black">
                <option selected="0">Actividad</option>
                <option value="minera">Minera</option>
                <option value="agrupecuaria">Agropecuaria</option>
                <option value="comercial">Comercial</option>
                <option value="servicios">Servicios</option>
                <option value="industrial">Industrial</option>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="estado" className="form-select-sm selector fw-bold text-black">       
                <option selected="0">Estado</option>         
                <option value="aprobada">Aprobada</option>
                <option value="desaprobada">Desaprobada</option>
                <option value="vencida">Vencida</option>
                <option value="formulacion">Formulación</option>
                <option value="formulacion">Pendiente</option>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <input name="fecha_inicio" type="date" className="fw-bold text-black form-control-sm" id="start"  min="1800-01-01" max="2040-12-31"></input>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <input name="fecha_fin" type="date" className="fw-bold text-black form-control-sm" id="finish" min="1800-01-01" max="2040-12-31"></input>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <button type="submit" className="btn btn-warning fw-bold text-black">Aplicar</button>
        </div>
    </form>)
}
function Getdocentes () {
    const [datos, setDatos] = useState([]);
    const getDocentes = async () => {
        let value = null;
        value = await axios.get('../docentes.json').then(
          response => {
            const data = response.data;
            return data;
          }).catch(error => {
            console.error(error);
          });
        setDatos(value)
      };
      useEffect(() => {
        getDocentes();
      }, []);
      return(
        datos.map((d) => {
            return (
                <option value={d.id}>{d.docente}</option>
        )})
      )       
}
function Getestudiantes () {
    const [datos2, setDatos] = useState([]);
    const getEstudiantes = async () => {
        let value = null;
        value = await axios.get('../estudiantes.json').then(
          response => {
            const data = response.data;
            return data;
          }).catch(error => {
            console.error(error);
          });
        setDatos(value)
      };
      useEffect(() => {
        getEstudiantes();
      }, []);
      return(
        datos2.map((d) => {
            return (
                <option value={d.id}>{d.estudiante}</option>
        )})
      )       
}