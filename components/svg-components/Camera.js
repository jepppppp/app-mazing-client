import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width="25px"
      height="25px"
      viewBox="0 -1 22 22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M326 3814v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 012 0zm8 .5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-6a4 4 0 100 8 4 4 0 000-8zm3-5.5h-6v-1a1 1 0 011-1h4a1 1 0 011 1v1zm6 0v-1a1 1 0 00-2 0v1h-2v-2a2 2 0 00-2-2h-6a2 2 0 00-2 2v2h-3a2 2 0 00-2 2v6h2v-5a1 1 0 011-1h14a1 1 0 011 1v8a1 1 0 01-1 1h-1v2h2a2 2 0 002-2v-12h-1z"
        transform="translate(-378 -3959) translate(56 160)"
        fill="#000"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default SvgComponent;
