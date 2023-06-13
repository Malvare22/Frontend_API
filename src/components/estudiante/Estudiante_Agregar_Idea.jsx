import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {

  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [integrantesSeleccionados, setIntegrantesSeleccionados] = useState([]);
  const [areaEnfoque, setAreaEnfoque] = useState('');
  const [formatoIdea, setFormatoIdea] = useState(null);
  const [error, setError] = useState(null);


  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleCursoChange = (e) => {
    setCursoSeleccionado(e.target.value);
  };

  const handleIntegrantesClick = (value) => {
    if (integrantesSeleccionados.includes(value)) {
      setIntegrantesSeleccionados(prevOptions => prevOptions.filter(option => option !== value));
    } else {
      setIntegrantesSeleccionados(prevOptions => [...prevOptions, value]);
    }
  };

  const handleareaEnfoqueChange = (e) => {
    setAreaEnfoque(e.target.value);
  };

  const handleformatoIdeaChange = (e) => {
    setFormatoIdea(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formatoIdea) {
      setError(null);
      var formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('integrantes', integrantesSeleccionados);
      formData.append('area', areaEnfoque);
      formData.append('documento', formatoIdea);

      let ruta = "http://144.22.32.132:8080/ideaNegocio";
      let value = await axios.post(ruta, formData, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } })
        .then((response) => {
          console.log("hecho")
          console.log([...formData.entries()]);
        })
        .catch((error) => {
          if (error.response) {
            console.log('Código de estado:', error.response.status);
            console.log('Respuesta del backend:', error.response.data);
          } else if (error.request) {
            console.log('No se recibió respuesta del backend');
          } else {
            console.log('Error al realizar la solicitud:', error.message);
          }
        });
      setFormatoIdea(null);
      navigate('../ListarIdeas')

    } else {
      setError('Por favor, selecciona un archivo');
    }
  };

  const [estudiantes, setEstudiantes] = useState([]);
  const getEstudiantes = async () => {
    
    var localData = localStorage.getItem("session");
    var parsedData = JSON.parse(localData);

    try {
      const response = await axios.get('http://144.22.32.132:8080/estudiante/listar', {
        headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
      });

      const estudiantesFiltrados = response.data.filter(estudiante => estudiante.correo !== parsedData.email);
      setEstudiantes(estudiantesFiltrados);

      console.log(estudiantesFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEstudiantes();
  }, []);

  const [areas, setAreas] = useState([]);
  const getAreas = async () => {
    try {
      const response = await axios.get('http://144.22.32.132:8080/areaConocimiento', {
        headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
      });
      console.log(response.data);
      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAreas();
  }, []);

  const [cursos, setCursos] = useState([]);
  const getCursos = async () => {
    try {
      const response = await axios.get('http://144.22.32.132:8080/estudiante/listarCursos', {
        headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
      });
      console.log(response.data);
      setCursos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCursos();
  }, []);

  return (
    <>
      <div className="container">
        <img src="https://live.staticflickr.com/65535/52923256419_f1155354b4_o.png" className="img-fluid mt-2" />
        <div className="container-fluid" style={{ width: '100%' }}>
          <div className="row">
            <Sobreponer>
              <div className="col-12">
                <div id="titulo1" className="rounded-3 mt-4" style={{ background: '#ECB904' }}>
                  <div className="row">
                    <div className="d-flex col ms-3">
                      <h5 className="m-0 p-2" style={{ color: 'black' }}>
                        <b>Ideas de negocio</b>
                      </h5>
                    </div>
                  </div>
                </div>
                <div id="cuerpo" className="row mx-3 rounded-2" style={{ background: '#DEDEDE' }}>
                  <div className="mt-2 p-4">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <p>
                          <b>1. Nombre de la idea de negocio</b>
                        </p>
                        <input
                          type="text"
                          placeholder="Nombre"
                          id="titulo"
                          value={titulo}
                          onChange={handleTituloChange}
                          pattern="[A-Za-z\s]+"
                          required
                        />
                      </div>

                      <div className='mt-3'>

                        <Label id="texto">Escoge el curso</Label>
                        <Label for="exampleSelect"></Label>
                        <Input type="select" name="select" onChange={handleCursoChange} id="exampleSelect" required>
                          <option value="">Seleccione...</option>
                          {cursos && cursos.map((v, i) => {
                            return (<option key={i} value={v}>{v}</option>);
                          })}
                        </Input>

                        <div className='mt-3'>
                          <Label for="exampleSelectMulti">Escoge los estudiantes</Label>
                          <div>
                            <select
                              name="selectMulti"
                              style={{ width: "100%" }}
                              multiple
                              required
                            >
                              {estudiantes && estudiantes.map((v, i) => {
                                if (v.curso === cursoSeleccionado) {
                                  return (<option key={i} onClick={() => handleIntegrantesClick(v.correo)}>{v.nombre + " " + v.apellido}</option>);
                                } else {
                                  return null;
                                }
                              })}
                            </select>

                            <div className='mt-2'>
                              <p><b>Los integrantes que ha seleccionado son: </b><i>{integrantesSeleccionados.join(', ')}</i></p>
                            </div>

                          </div>
                        </div>

                      </div>

                      <div className="mt-3">
                        <p>
                          <b>3. Área de enfoque</b>
                        </p>
                        <select
                          style={{ height: '40px', borderRadius: '5px' }}
                          id="areaEnfoque"
                          value={areaEnfoque}
                          onChange={handleareaEnfoqueChange}
                          required
                        >
                          <option value="">Seleccione ...</option>
                          {areas.map((v, i) => {
                            return (
                              <option key={i} value={v.nombre}>{v.nombre}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="mt-3">
                        <p>
                          <b>4. Subir formato de la idea de negocio</b>
                        </p>
                        <input type="file" id="formatoIdea" onChange={handleformatoIdeaChange} accept=".pdf,.docx" required />
                      </div>
                      <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn mt-2" style={{ background: '#ECB904', color: 'black' }}>
                          <b>Enviar</b>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Sobreponer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Formulario;

const Sobreponer = styled.div`

  #titulo1,
  #cuerpo {
    position: relative;
  }

  #titulo1 {
    z-index: 2;
  }

  #cuerpo {
    z-index: 1;
    top: -15px;
  }

  #titulo {
    width: 100%;
    border: 1px solid grey;
    border-radius: 4px;
    height: 40px;
  }
`;






