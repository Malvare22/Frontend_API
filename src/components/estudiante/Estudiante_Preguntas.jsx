import React from 'react';
import PropTypes from 'prop-types';





const EstudiantePreguntas = (props) => {
    return (
        <div className='p-3 pt-2'>
            <div style={{wordWrap : "breack-word"}}>
                <p className='fw-bold '>
                    {props.enunciado}
                </p>
            </div>

            {props.respuestas.map((v, i) =>{
                return(
                <div className='row d-flex'>
                    <div className="col-auto">
                        <input required className='mx-1' type="radio"  value="" name=''/>
                    </div>
                    <div className="col-auto">
                        <p className='m-0' >{v.contenido}</p>
                    </div>
                </div>
                )
            })}
            
        </div>
    );
};


EstudiantePreguntas.propTypes = {

};


export default EstudiantePreguntas;
