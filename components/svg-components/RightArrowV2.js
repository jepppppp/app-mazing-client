import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      fill="#000"
      width="20px"
      height="20px"
      viewBox="0 0 512 512"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000"
      {...props}
    >
      <Path d="M150.46 478L129.86 456.5 339.11 256 129.86 55.49 150.46 34 382.14 256 150.46 478z" />
    </Svg>
  );
}

export default SvgComponent;
