import styled from "styled-components";

export default function TablaMaterialIdea() {
    // const [datos, setDatos] = useState([]);
    // const getIdeas = async () => {
    //     let value = null;
    //     value = await axios.get('../ideas.json').then(
    //         response => {
    //             const data = response.data;
    //             return data;
    //         }).catch(error => {
    //             console.error(error);
    //         });
    //     setDatos(value)
    // };
    // useEffect(() => {
    //     getIdeas();
    // }, []);
    return (
        <Sdiv>
            <div className='w-auto m-2'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col-auto">Tipo de material</th>
                            <th className='text-center' scope="col-auto">Fecha de creación</th>
                            <th className='text-center' scope="col-auto">Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {datos.map((d) => ( */}
                            <tr /*key={d.id}*/>
                                <td className='text-center align-middle col-auto'>Documento</td>
                                <td className='text-center align-middle'>2023/05/22</td>
                                <td className='text-center align-middle col-auto'>
                                    <button type="button" className="btn" /*value={d.id}*/ style={{ width: "auto", border: "none" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </Sdiv>
    );
}

const Sdiv = styled.div`
  table{
      table-layout: fixed;
  }
  
  th, td {
      border: 1px solid;
      width: 100px;
      word-wrap: break-word;
  }
  table th{
      background-color: #1C3B57;
      color: #FFF;
  }
  table td{
    background-color:#FFF;
  }
  overflow-y: scroll;
  height: fit-content;
  max-height: 66.4vh;
  
  @media screen and (max-width: 576px){
      th, td {
          width: 60px;
      }}
`;







