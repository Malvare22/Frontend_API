import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const EstudianteCardIdea = (props) => {


    return (
        <div class="card rounded m-4 p-2" style={{ width: "90%", height: "90%", backgroundColor: props.color }}>
            <div class="card-body">
                <h5 class="card-title">{props.estado}</h5>
                <h6 class="card-subtitle mb-2 text-muted"> {props.titulo} </h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    );
}

export default EstudianteCardIdea;
