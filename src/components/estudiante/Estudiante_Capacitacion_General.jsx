import ImagenCapacitacionGeneral from '../../assets/images/EstudianteCapacitaciones/ImagenCapacitacionGeneral.png'
import ImagenBeneficios from '../../assets/images/EstudianteCapacitaciones/ImagenBeneficios.png'
import TablaMaterialApoyo from '../estudiante/TablaMaterialApoyo'

export default function CapacitacionGeneral() {
    return (
        <div className="container">
            <img src="https://live.staticflickr.com/65535/52965391213_c807af25a6_o.png" className='img-fluid mt-2' />
            <div className="container my-5" style={{ width: "80%" }}>
                <InfoGeneralCapacitacion ></InfoGeneralCapacitacion>
            </div>
        </div>
    )
}

const InfoGeneralCapacitacion = () => {
    return (
        <main>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <p id='tituloG' style={{ color: "#DC4B4B" }}>¿Qué es ser emprendedor?</p>
                    </div>
                    <div className="row">
                        <p id='parrafoG'>
                            Ser emprendedor implica ser una persona dedicada a generar nuevas ideas, al identificar oportunidades que le permiten asumir riesgos y tomar medidas para alcanzarlas. También se caracteriza por estar en constante búsqueda de mejora y perfeccionamiento en su trabajo. Un emprendedor siempre está mirando hacia el futuro y está dispuesto a asumir desafíos y adaptarse a los cambios del mercado para seguir persiguiendo sus objetivos y metas.
                        </p>
                    </div>
                </div>
                <div className="col-12 col-lg-5">
                    <img src={ImagenCapacitacionGeneral} className='img-fluid m-auto' />
                </div>
            </div>
            <div className='row my-5'>
                <p className='text-center' id='tituloG' style={{ color: "#DC4B4B" }}>¿Por qué ser emprendedor?</p>
            </div>
            <div className='row my-5'>
                <iframe height="500" src="https://www.youtube.com/embed/fixRdLY4BqE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div className="row my-5">
                <div className="col-12 col-lg-5">
                    <img src={ImagenBeneficios} className='img-fluid m-auto' />
                </div>
                <div className="col">
                    <div className="row">
                        <p className='text-end' id='tituloG' style={{ color: "#DC4B4B" }}>Beneficios de ser emprendedor</p>
                    </div>
                    <div className="row">
                        <p id='parrafoG'>
                            Los emprendedores son individuos valientes que no temen al fracaso. Están dispuestos a asumir todos los riesgos necesarios para lograr el éxito completo de su idea de negocio. Una vez que lo consiguen, experimentan una gran satisfacción que puede transformar su estilo de vida. A continuación, se mencionan algunos de los beneficios de ser emprendedor:
                        </p>
                    </div>
                </div>
            </div>
            <div className='row my-5'>
                <p id='parrafoG'>
                    <b id='subtituloListaG'>Ver nacer tu proyecto de la nada : </b> Te embarcarás en un camino repleto de desafíos y obstáculos, pero los encontrarás gratificantes, ya que sabrás que estás peleando por algo que te es propio, que te pertenece y que has edificado desde el principio.
                </p>
                <p id='parrafoG'>
                    <b id='subtituloListaG'>Conseguir el trabajo de tus sueños : </b> Una de las principales ventajas de ser emprendedor radica en la posibilidad de dedicarse a algo que realmente apasiona. Algo que genera motivación. Trabajar con mayor satisfacción y motivación se asemeja a no estar trabajando en absoluto, sino más bien disfrutando plenamente de la actividad que tanto te gusta realizar.
                </p>
                <p id='parrafoG'>
                    <b id='subtituloListaG'>Contribuir al mejoramiento de tu entorno : </b> Al emprender tu propio negocio o empresa, tendrás la oportunidad de brindar ayuda a tu entorno, es decir, a las personas de tu localidad, barrio, municipio, entre otros. Al crear tu negocio, podrás atender las necesidades de las personas y contribuir a mejorar su calidad de vida, generando empleos y aportando al desarrollo económico de la región. Sin duda, esta contribución te traerá satisfacción y felicidad en tu vida.
                </p>
                <p id='parrafoG'>
                    <b id='subtituloListaG'>Seleccionar a tu equipo : </b> Como líder de tu emprendimiento, tendrás la oportunidad de formar un equipo conformado por personas que siempre has deseado trabajar. Tendrás la capacidad de seleccionar personal que comparta tus valores y esté alineado con los objetivos de tu proyecto. Juntos trabajarán en colaboración, enfocados en el beneficio colectivo y en alcanzar el éxito de manera conjunta.
                </p>
            </div>
            <div className='row my-5'>
                <b><p id='cita'>
                    Sacado de la tesis de grado presentada por Rolon Estupiñan, M. y Benavides Escalante, C. A. (2021).
                </p></b>
            </div>
            <div className='row my-5 d-flex justify-content-center align-items-center'>
                <TablaMaterialApoyo tipo=""></TablaMaterialApoyo>
            </div>
        </main>
    )
}











