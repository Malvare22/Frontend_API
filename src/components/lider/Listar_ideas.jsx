import { Chart } from "react-google-charts";
export default function Listar_Ideas(){

    return(<><main className="container-fluid w-75">
    <div className="row">
        <div class="col-12 m-1 p-1">
            <h1 className="fst-italic fw-bold fs-1 text-black">Ideas de Negocio</h1>
            <div className="container">
            <Filtros></Filtros>
            
            </div>
            <div className="output"></div>
        </div>
    </div>
</main> <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script></>);
}

function Filtros(){
    return(<form className="row g-7">
    <div className="col-auto d-flex align-items-center mb-2">
        <select className="form-select-sm selector fw-bold text-black">
        <option selected="0">Tutor</option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        </select>
    </div>
    <div className="col-auto d-flex align-items-center mb-2">
        <select className="form-select-sm selector fw-bold text-black">
        <option selected="0">Estudiante</option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
    </select>
    </div>
    <div className="col-auto d-flex align-items-center mb-2">
        <select className="form-select-sm selector fw-bold text-black">
        <option selected="0">Area</option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
    </select>
    </div>
    <div className="col-auto d-flex align-items-center mb-2">
        <select className="form-select-sm selector fw-bold text-black">
        <option selected="0">Estado</option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
    </select>
    </div>
    <div className="col-auto d-flex align-items-center mb-2">
        <input type="date" className="fw-bold text-black form-control-sm" id="start" required name="fecha_inicio" min="1800-01-01" max="2040-12-31"></input>
    </div>
    <div className="col-auto d-flex align-items-center mb-2">
        <input type="date" className="fw-bold text-black form-control-sm" id="finish" required name="fecha_fin" min="1800-01-01" max="2040-12-31"></input>
    </div>
    <div className="col-auto d-flex align-items-center mb-2">
        <button type="button" className="btn btn-warning fw-bold text-black">Aplicar</button>
    </div>    
</form>)
}
