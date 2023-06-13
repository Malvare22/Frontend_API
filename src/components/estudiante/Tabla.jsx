import { Chart } from "react-google-charts";

const options = {
  title: "My Daily Activities",
};

export default function Tabla(props) {
  return (
    <Chart
      chartType="Table"
      data={props.data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}







