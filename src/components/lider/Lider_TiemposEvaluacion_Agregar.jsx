import { useState, useEffect} from 'react';
import axios from 'axios';
import ModalAceptar from '../useGeneral/ModalAceptar';


export default function TiemposEvaluacionAgregar(){
    const [tiempoIdea, setTiempoIdea] = useState('');
    const [tiempoPlan, setTiempoPlan] = useState('');
    const [Tiempos, setTiempos] = useState({});
    const[viewAlert, setViewAlert] = useState(false);
    

    

    const toggleAlert = () => {
        if(viewAlert){
          window.location.reload();
        }
        setViewAlert(!viewAlert);
    }
    const getTiempos = async () => {
     
      let ruta = "http://localhost:8080/periodo";
      let value = await axios.get(ruta, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } })
        .then((response) => {
          const data = response.data;
          return data;
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
      setTiempos(value);

      console.log(Tiempos)
    };
    
    useEffect(() => {
      getTiempos();
   }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
          let ruta = "http://144.22.32.132:8080/periodo";
          let value = await axios.patch(ruta, {
            diasPeriodoIdea : tiempoIdea,
            diasPeriodoPlan : tiempoPlan
          }, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } })
            .then((response) => {
              console.log("hecho")
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
            setTiempoIdea('');
            setTiempoPlan('');
            toggleAlert();
    

      };
      const actualizarDiasIdea = (e) => {
        setTiempoIdea(e.target.value);
      };
      const actualizarDiasPlan = (e) => {
        setTiempoPlan(e.target.value);
      };
    
    return(
        
        <div className="container rounded-3" style={{width : "60%" , background : "#DEDEDE" }}>
            <div className="text-center">
                <h1 className="p-4 fw-bold">Tiempos de evaluación</h1>
            </div>
            <hr className='border-3 border-black m-0 p-2'></hr>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="p-4 d-flex justify-content-center">
                        <div className="row">
                            <div className="col-auto text-center">
                                <p>Ideas de negocio</p>
                            </div>
                            <div className="col-auto text-center">
                                <input required placeholder="Tiempo en días" value={tiempoIdea} onChange={actualizarDiasIdea} className="rounded-3" type="Number" />
                            </div>
                            <div className="col-auto text-center">
                               <p>Tiempo actual : {Tiempos.diasPeriodoIdea}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 d-flex justify-content-center">
                        <div className="row text-center " >
                            <div className="col-auto text-center">
                                <p>Planes de negocio</p>
                            </div>
                            <div className="col-auto text-center ">
                                <input required placeholder="Tiempo en días" value={tiempoPlan} onChange={actualizarDiasPlan} className="rounded-3" type="Number" />
                            </div>
                            <div className="col-auto text-center">
                               <p>Tiempo actual : {Tiempos.diasPeriodoPlan}</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mb-3 p-2">
                            <button type="submit" className="btn my-2 rounded-4" style={{ background: '#1C3B57', color: 'white' }}>
                            <b>Guardar cambios</b>
                            </button>
                    </div>
                </form>
                <ModalAceptar viewAlert={viewAlert} msg="Se han actualizado los tiempos de evaluación" toggleAlert={toggleAlert}></ModalAceptar>

            </div>
        </div>
    )
};





