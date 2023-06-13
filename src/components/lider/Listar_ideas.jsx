import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import axios from "axios";

const useAlert = () => {
  const [state, setState] = useState(false);
  const [valor, setValor] = useState({});

  const toggleAlert = (v) => {
    setState(!state);
    if (v != null) {
      setValor(v);
    }
  }
  return { state, toggleAlert, valor }
}
const modalStyles = {
  transform: 'translate(0%, 120%)'
}


// Componente de tabla
const Table = ({ data }) => {
  const [orderBy, setOrderBy] = useState({ column: 'Título', ascending: true });
  const handleSort = (column) => {
    if (orderBy.column === column) {
      setOrderBy((prevState) => ({
        column,
        ascending: !prevState.ascending
      }));
    } else {
      setOrderBy({
        column,
        ascending: true
      });
    }
  };
  const sortData = () => {
    const { column, ascending } = orderBy;
    return data && data.slice().sort((a, b) => {
      let comparison = 0;
      if (column === 'Título') {
        comparison = a.titulo && a.titulo.localeCompare(b.titulo);
      } else if (column === 'Estudiante') {
        comparison = a.estudianteLiderInfo && a.estudianteLiderInfo[0][0].localeCompare(b.estudianteLiderInfo && b.estudianteLiderInfo[0][0]);
      } else if (column === 'Tutor') {
        comparison = a.tutorInfo && a.tutorInfo[0][0].localeCompare(b.tutorInfo && b.tutorInfo[0][0]);
      } else if (column === 'Fecha de corte') {
        const dateA = new Date(a.fechaCorte && a.fechaCorte[0], (a.fechaCorte && a.fechaCorte[1]) - 1, a.fechaCorte && a.fechaCorte[2]);
        const dateB = new Date(b.fechaCorte && b.fechaCorte[0], (b.fechaCorte && b.fechaCorte[1]) - 1, b.fechaCorte && b.fechaCorte[2]);
        comparison = dateA - dateB;
      }
      if (!ascending) {
        comparison *= -1;
      }
      return comparison;
    });
  };
  const sortedData = sortData();
  const { state, toggleAlert, valor } = useAlert();
  const navigate = useNavigate();
  const toggleA = (titulo) => {
    localStorage.setItem('titulo', titulo);
    navigate('/Lider/Ideas/Vista');
  };
  const descargarArchivo = (nombre) => {
    let URL = 'http://129.151.121.230:8080/ideaNegocio/recuperarDocumento/' + nombre;
    axios.get(URL, { responseType: 'blob', headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
    ).then(
      response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');

        // Obtener la extensión del nombre de archivo del encabezado Content-Type
        const contentType = response.headers['content-type'];
        const extension = contentType === 'application/octet-stream' ? '.docx' : '.pdf';

        link.href = url;
        link.setAttribute('download', `documento${extension}`); // Establecer el nombre del archivo con la extensión obtenida
        document.body.appendChild(link);
        link.click();

        // Limpiar el enlace temporal después de la descarga
        link.parentNode.removeChild(link);
      }).catch(error => {
        if (error.response) {
          console.log('Código de estado:', error.response.status);
          console.log('Respuesta del backend:', error.response.data);
        } else if (error.request) {
          console.log('No se recibió respuesta del backend');
        } else {
          console.log('Error al realizar la solicitud:', error.message);
        }
      });
  }
  return (
    <Sdiv>
      <div className='w-auto'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Título')} scope="col-auto">Título</th>
              <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Estudiante')} scope="col-auto">Estudiante</th>
              <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Tutor')} scope="col-auto">Tutor</th>
              <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Fecha de corte')} scope="col-auto">Fecha de corte</th>
              <th className='text-center' scope="col-auto">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedData && sortedData.map((d) => (
              <tr key={d.id}>
                <td className='text-center align-middle col-auto'>{d.titulo}</td>
                <td className='text-center align-middle col-auto'>{d.estudianteLiderInfo[1]}</td>
                <td className='text-center align-middle col-auto'>{d.tutorInfo && d.tutorInfo[1]}</td>
                <td className='text-center align-middle'>{d.fechaCorte && d.fechaCorte[0] && d.fechaCorte[1] && d.fechaCorte[2] && `${d.fechaCorte[2].toString().padStart(2, '0')}/${d.fechaCorte[1].toString().padStart(2, '0')}/${d.fechaCorte[0]}`}
                </td>
                <td className='text-center align-middle'>
                  <div>
                    <button type="button" className="btn" onClick={() => toggleA(d.titulo)} value={d.titulo} style={{ width: "auto", border: "none" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                    </button>
                    <button type="button" className="btn" onClick={() => descargarArchivo(d.titulo)} value={d.titulo} style={{ width: "auto", border: "none" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={state} style={modalStyles}>
        <ModalBody>
          <FormGroup>
            <Label id="texto">¿Está seguro de que desea eliminar la idea de negocio: {valor.titulo} que tiene como id: {valor.id}?</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="danger">Eliminar</Button>
          <Button color="primary" onClick={() => toggleAlert(null)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Sdiv>
  );
};
const Sdiv = styled.div`
table{
    table-layout: fixed;
}

th, td {
    border: 1px solid;
    width: 100px;
    word-wrap: break-word;
}
table th{
    background-color: #1C3B57;
    color: #FFFFFF;
}
overflow-y: scroll;
height: fit-content;
max-height: 66.4vh;
    
@media screen and (max-width: 576px){
    th, td {
        width: 60px;
    }}
`;

// Componente de filtros
const Filters = ({ onFilter }) => {
  const [tutor, setTutor] = useState('');
  const [estudiante, setEstudiante] = useState('');
  const [area, setArea] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      tutor,
      estudiante,
      area,
      estado,
      fechaInicio,
      fechaFin
    };
    if ((fechaInicio && !fechaFin) || (!fechaInicio && fechaFin)) {
      alert("Se requiere tanto la fecha de inicio como la fecha de fin para filtrar.");
      return;
    }
    if (fechaInicio && fechaFin) {
      const dateInicio = new Date(fechaInicio);
      const dateFin = new Date(fechaFin);
      if (dateInicio > dateFin) {
        alert("La fecha de inicio no puede ser mayor que la fecha de fin.");
        return;
      }
    }
    onFilter(filters);
  };

  return (<form className="row gy-2 gx-1" onSubmit={handleSubmit}>
    <div className="col-auto d-flex align-items-center mb-1">
      <select name="tutor" onChange={(e) => setTutor(e.target.value)} className="form-select-sm selector fw-bold text-black">
        <option value="">Tutor</option>
        <Getdocentes></Getdocentes>
      </select>
    </div>
    <div className="col-auto d-flex align-items-center mb-1">
      <select name="estudiante" onChange={(e) => setEstudiante(e.target.value)} className="form-select-sm selector fw-bold text-black">
        <option value="">Estudiante</option>
        <Getestudiantes></Getestudiantes>
      </select>
    </div>
    <div className="col-auto d-flex align-items-center mb-1">
      <select name="area" onChange={(e) => setArea(e.target.value)} className="form-select-sm selector fw-bold text-black">
        <option value="">Area</option>
        <Getareas></Getareas>
      </select>
    </div>
    <div className="col-auto d-flex align-items-center mb-1">
      <select name="estado" onChange={(e) => setEstado(e.target.value)} className="form-select-sm selector fw-bold text-black">
        <option value="">Estado</option>
        <option value="aprobada">Aprobada</option>
        <option value="rechazada">Desaprobada</option>
        <option value="vencida">Vencida</option>
        <option value="formulado">Formulación</option>
        <option value="pendiente">Pendiente</option>
      </select>
    </div>
    <div className="col-auto d-flex align-items-center mb-1">
      <input name="fecha_inicio" onChange={(e) => setFechaInicio(e.target.value)} type="date" className="fw-bold text-black form-control-sm" id="start" min="2020-01-01" max="3000-12-31"></input>
    </div>
    <div className="col-auto d-flex align-items-center mb-1">
      <input name="fecha_fin" onChange={(e) => setFechaFin(e.target.value)} type="date" className="fw-bold text-black form-control-sm" id="finish" min="2020-01-01" max="3000-12-31"></input>
    </div>
    <div className="col-auto d-flex align-items-center mb-1">
      <button type="submit" className="btn btn-warning fw-bold text-black">Aplicar</button>
    </div>
  </form>
  );
};

// Componente principal que contiene la tabla y los filtros
export default function Listar_Ideas() {
  const [filteredData, setFilteredData] = useState([]);
  const getIdeas = async () => {
    const value = await axios.get("http://129.151.121.230:8080/ideaNegocio", { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
    ).then(
      response => {
        const data = response.data;
        return data;
      }).catch(error => {
        console.error(error);
      });
    setFilteredData(value);
  };
  useEffect(() => {
    getIdeas();
  }, []);
  const handleFilter = async (filters) => {
    let formData = new FormData()
    console.log(filters);
    if (filters.estudiante !== '') {
      formData.append('codigoEstudiante', filters.estudiante);
    }
    if (filters.area !== '') {
      formData.append('area', filters.area);
    }
    if (filters.tutor !== '') {
      formData.append('tutorCodigo', filters.tutor);
    }
    if (filters.estado !== '') {
      console.log(filters.estado)
      formData.append('estado', filters.estado);
    }
    if (filters.fechaInicio !== '' && filters.fechaFin !== '') {
      console.log(filters.fechaInicio);
      console.log(filters.fechaFin);
      formData.append('fechaInicio', filters.fechaInicio);
      formData.append('fechaFin', filters.fechaFin);
    }
    console.log([...formData.entries()]);
    try {
      const config = {
        headers: {
          "X-Softue-JWT": localStorage.getItem('token_access')
        }
      }
      let value = await axios.post("http://129.151.121.230:8080/ideaNegocio/filtrar", formData, config
      ).then(
        response => {
          const data = response.data;
          console.log(data);
          return data;
        }).catch(error => {
          if (error.response) {
            console.log('Código de estado:', error.response.status);
            console.log('Respuesta del backend:', error.response.data);
          } else if (error.request) {
            console.log('No se recibió respuesta del backend');
          } else {
            console.log('Error al realizar la solicitud:', error.message);
          }
        });
      setFilteredData(value);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container-fluid w-75">
      <div className="row">
        <div className="col-12 m-1 p-1">
          <h1 className="fst-italic fw-bold fs-1 text-black">Ideas de Negocio</h1>
          <div className="container">
            <Filters onFilter={handleFilter}></Filters>
            <br></br>
            <Table data={filteredData}></Table>
            <br></br>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }}>
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
function Getdocentes() {
  const [datos, setDatos] = useState([]);
  const getDocentes = async () => {
    const value = await axios.get('http://129.151.121.230:8080/docente/listar', { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
    ).then(
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
  return (
    datos && datos.map((d) => {
      return (
        <option value={d.codigo} key={d.correo}>{d.nombre} {d.apellido}</option>
      )
    })
  )
}
function Getestudiantes() {
  const [datos2, setDatos] = useState([]);
  const getEstudiantes = async () => {
    const value = await axios.get('http://129.151.121.230:8080/estudiante/listar', { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
    ).then(
      response => {
        const data = response.data;
        return data;
      }).catch(error => {
        console.log(error);
      });
    setDatos(value)
  };
  useEffect(() => {
    getEstudiantes();
  }, []);
  return (
    datos2 && datos2.map((d) => {
      return (
        <option value={d.codigo} key={d.correo}>{d.nombre} {d.apellido}</option>
      )
    })
  )
}

function Getareas() {
  const [datos2, setDatos] = useState([]);
  const getAreas = async () => {
    const value = await axios.get('http://129.151.121.230:8080/areaConocimiento', { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
    ).then(
      response => {
        const data = response.data;
        return data;
      }).catch(error => {
        console.log(error);
      });
    setDatos(value)
  };
  useEffect(() => {
    getAreas();
  }, []);
  return (
    datos2 && datos2.map((d) => {
      return (
        <option value={d.nombre} key={d.id}>{d.nombre.charAt(0).toUpperCase() + d.nombre.slice(1).toLowerCase()}</option>
      )
    })
  )
}


