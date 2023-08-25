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
        d="M4 13.667V6.333C4 3.667 4.667 3 7.333 3H12c2.667 0 3.333.667 3.333 3.333V13c0 .093 0 .187-.006.28"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.9 11.667h9.433V14A2.336 2.336 0 0113 16.333H6.333A2.336 2.336 0 014 14v-.433c0-1.047.853-1.9 1.9-1.9zM7 6.333h5.333M7 8.667h3.333"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
