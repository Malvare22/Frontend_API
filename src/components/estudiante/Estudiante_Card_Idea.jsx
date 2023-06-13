import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import imagen from '../../assets/images/imagen idea-plan.png'


const EstudianteCardIdea = (props) => {

    return (
        <div className="container d-flex justify-content-center">
            <div className="card rounded my-3" style={{ width: "90%", height: "90%", backgroundColor: props.color }}>
                <div className="card-body">
                    <div className='row'>
                        <div className="col-4 d-flex justify-content-center align-items-center">
                            <img src={imagen} width="100%"></img>
                        </div>
                        <div className='col-8'>
                            <div className='row d-flex justify-content-center align-items-center text-center'>
                                <h6 className="card-subtitle mb-2"> {props.titulo} </h6>
                            </div>
                            <div className='row d-flex justify-content-center align-items-center'>
                                <button type="button" onClick={(e)=>{e.preventDefault();  props.setInfo(props.id);}} style={{ background: "#3C3C3C", color: "white", width: "auto" }} className="btn btn-sm">Ver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EstudianteCardIdea;




