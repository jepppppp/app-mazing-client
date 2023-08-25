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
        d="M4 6.436a.436.436 0 01.745-.309l5.798 5.816 5.714-5.73a.436.436 0 01.616.617l-6.022 6.042a.436.436 0 01-.616 0L4.129 6.748A.434.434 0 014 6.437z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
