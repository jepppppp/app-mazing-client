import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.5 17.5h-5v-7A.5.5 0 018 10h4a.5.5 0 01.5.5v7zM17 17.5h-4.5v-2.417a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V17a.5.5 0 01-.5.5zM7.5 17.5v-4.083a.5.5 0 00-.5-.5H3a.5.5 0 00-.5.5V17a.5.5 0 00.5.5h4.5zM9.005 4.261l.757-1.606a.26.26 0 01.476 0l.757 1.606 1.695.26c.217.032.304.312.146.473l-1.226 1.25.29 1.764c.037.227-.19.4-.385.293L10 7.467 8.485 8.3c-.195.107-.422-.066-.385-.293l.29-1.765-1.226-1.25c-.158-.16-.07-.44.146-.473l1.695-.259z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
