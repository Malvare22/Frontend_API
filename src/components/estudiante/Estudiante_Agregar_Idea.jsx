import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import styled from 'styled-components';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [integrantesIdea, setIntegrantesIdea] = useState([]);
  const [areaEnfoque, setAreaEnfoque] = useState('');
  const [formatoIdea, setFormatoIdea] = useState(null);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleintegrantesIdeaChange = (event, values) => {
    setIntegrantesIdea(values);
  };

  const handleareaEnfoqueChange = (e) => {
    setAreaEnfoque(e.target.value);
  };

  const handleformatoIdeaChange = (e) => {
    setFormatoIdea(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('integrantesIdea', JSON.stringify(integrantesIdea));
    formData.append('areaEnfoque', areaEnfoque);
    formData.append('formatoIdea', formatoIdea);

    try {
      const response = await axios.post('http://localhost:8080', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Softue-JWT': localStorage.getItem('token_access'),
        },
      });
      
      console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const [datos, setDatos] = useState([]);

  const estudiantes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/estudiante/listar', {
        headers: {
          'X-Softue-JWT': localStorage.getItem('token_access'),
        },
      });
      console.log(response.data);
      setDatos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    estudiantes();
  }, []);

  return (
    <>
      <div className="container">
        <img src="https://live.staticflickr.com/65535/52923256419_f1155354b4_o.png" className="img-fluid mt-2" />
        <div className="container-fluid" style={{ width: '100%' }}>
          <div className="row">
            <Sobreponer>
              <div className="col-12">
                <div id="titulo" className="rounded-3 mt-4" style={{ background: '#ECB904' }}>
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
                          id="nombre"
                          value={nombre}
                          onChange={handleNombreChange}
                          required
                        />
                      </div>
                      <div className="mt-3">
                        <p>
                          <b>2. Estudiantes que hacen parte del proyecto</b>
                        </p>
                        <Autocomplete
                          style={{ background: 'white' }}
                          id="integrantes"
                          options={datos}
                          getOptionLabel={(option) => option.correo}
                          value={integrantesIdea}
                          onChange={handleintegrantesIdeaChange}
                          multiple
                          renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
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
                          <option value="">Área de enfoque</option>
                          <option value="minera">Minera</option>
                          <option value="agropecuaria">Agropecuaria</option>
                          <option value="comercial">Comercial</option>
                          <option value="servicios">Servicios</option>
                          <option value="industrial">Industrial</option>
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
  #titulo,
  #cuerpo {
    position: relative;
  }

  #titulo {
    z-index: 2;
  }

  #cuerpo {
    z-index: 1;
    top: -15px;
  }

  #nombre {
    width: 100%;
    border: 1px solid grey;
    border-radius: 4px;
    height: 40px;
  }
`;
