import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AddToFavorite = (props) => (
  <Svg
    fill="#FFF"
    width="40px"
    height="40px"
    viewBox="-2 -2 28 28"
    id="favourite"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
    {...props}
  >
    <Path
      id="primary"
      d="M19.57,5.44a4.91,4.91,0,0,1,0,6.93L12,20,4.43,12.37A4.91,4.91,0,0,1,7.87,4a4.9,4.9,0,0,1,3.44,1.44,4.46,4.46,0,0,1,.69.88,4.46,4.46,0,0,1,.69-.88,4.83,4.83,0,0,1,6.88,0Z"
      style={{
        fill: "none",
        stroke: "#FFF",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1.75,
      }}
    />
  </Svg>
);
export default AddToFavorite;
