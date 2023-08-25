import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={401}
      height={102}
      viewBox="0 0 401 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 59s78.36-1.11 105.5-9c43-12.5 77.5-24 111-18s56 17.708 78.5 20.5c38.852 4.821 106 6.5 106 6.5v30.5H0V59z"
        fill="#686262"
      />
      <Path
        d="M0 68s45.14 1.753 84-3c40.286-4.927 72.35-23.5 111.5-23.5 39.15 0 59.599 18.548 99.5 23.5 38.852 4.821 106 3 106 3v34H0V68z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
