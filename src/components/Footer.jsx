import styled from 'styled-components';
import escudo_NSDLM from '../assets/images/Footer/escudo_NSDLM.png'
import logo_sistemas from '../assets/images/Footer/logo_sistemas.png'
import logo_TDSF from '../assets/images/Footer/logo_TDSF.png'
import logo_UFPS from '../assets/images/Footer/logo_UFPS.png'


function Footer() {

    return (<div className="container-fluid p-0 d-flex align-items-center justify-content-center w-100" style={{ backgroundColor: "#3B3737"}}>
        <SFoot>
        <div className='d-flex align-items-center justify-content-center w-100'>
            <div className='d-flex align-items-center justify-content-center i' style={{width: "18%"}}>
                <div className='text-center' style={{width: "70%"}}>
                    <p>Institución Educativa</p>
                    <p>Nuestra Señora de las</p>
                    <p>Mercedes de Sardinata</p>
                </div>
                <div className='' style={{width: "30%"}}>
                    <img className='img-fluid' src={escudo_NSDLM}></img>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-center i' style={{width: "8%"}}>
                <img src={logo_UFPS} className='img-fluid'></img>
            </div>
            <div className='d-flex align-items-center justify-content-center i' style={{width: "6%"}}>
                <img src={logo_sistemas} className='img-fluid'></img>
            </div>
            <div className='d-flex align-items-center justify-content-center text-center i' style={{width: "12%"}}>
                <div className='text-center d-flex align-items-center justify-content-center' style={{width: "55%"}}><p id='pi'>Powered by:</p></div>
                <img src={logo_TDSF} className='img-fluid' style={{width: "45%"}}></img>
            </div>
        </div>
        </SFoot>
    </div>);
};

const SFoot= styled.div`
    .i{
        margin: 1%;
        margin-right: 5%;
        margin-left: 5%;
    }
    p{
        font-weight: bolder;
        color: white;
        margin: 0px;
        font-size: 0.2rem;
        text-align: center;
    @media only screen and  (min-width: 480px) and (max-width: 768px){
        font-size: 0.4rem;
    }
    @media only screen and  (min-width: 768px) and (max-width: 1024px){
        font-size: 0.55rem;
    }
    @media only screen and  (min-width: 1024px) and (max-width: 1200px) {
        font-size: 0.6rem;
    }
    @media only screen and (min-width: 1200px) {
        font-size: 0.7rem;
    }
    }
    #pi{

        font-weight: bolder;
        color: white;
        margin: 0px;
        text-align: center;
        @media only screen and  (min-width: 480px) and (max-width: 768px){
        font-size: 0.5rem;
    }
    @media only screen and  (min-width: 768px) and (max-width: 1024px){
        font-size: 0.65rem;
    }
    @media only screen and  (min-width: 1024px) and (max-width: 1200px) {
        font-size: 0.7rem;
    }
    @media only screen and (min-width: 1200px) {
        font-size: 0.8rem;
    }
    }
    
`; 

export default Footer;







