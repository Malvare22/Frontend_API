import Tabla from "./Tabla_idea";
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
                        <button type="button" class="btn rounded-3" style={{background: "#1C3B57", color: "#FFFFFF"}}>
                <div className="row">
                    <div className="col-auto">
                        Generar informe
                    </div>
                    <div className="col-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
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
    return (<form className="row g-7">
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
