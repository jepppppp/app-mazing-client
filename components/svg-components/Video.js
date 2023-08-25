import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent(props) {
  const scale = props?.scale ? 50 : 100;

  return (
    <Svg
      width={scale}
      height={scale}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_22_10)">
        <Path
          d="M100 7.89a4.632 4.632 0 00-4.632-4.632H50l-4.082 62.9L100 62.077V7.889z"
          fill="#424242"
        />
        <Path
          d="M4.632 3.258A4.632 4.632 0 000 7.889v54.188l50 4.081v-62.9H4.632zM63.79 79.148l-17.872-4.081L50 93.68h15.895L63.79 79.148z"
          fill="#707070"
        />
        <Path
          d="M36.21 79.148L34.105 93.68H50V75.067l-13.79 4.081z"
          fill="#B4B4B4"
        />
        <Path
          d="M45.918 62.077L50 79.149h45.368A4.632 4.632 0 00100 74.517v-12.44H45.918z"
          fill="#B4B4B4"
        />
        <Path
          d="M0 62.077v12.44a4.632 4.632 0 004.632 4.632H50V62.077H0z"
          fill="#E0E0E0"
        />
        <Path
          d="M74.633 90.62H50l-4.082 3.06L50 96.742h24.633v-6.123z"
          fill="#424242"
        />
        <Path d="M50 90.62H25.367v6.122H50V90.62z" fill="#707070" />
        <Path
          d="M54.35 67.551H50l-2.04 3.062 2.04 3.06h4.35v-6.122z"
          fill="#424242"
        />
        <Path d="M50 67.55h-4.349v6.123h4.35V67.55z" fill="#707070" />
        <Path
          d="M84.458 13.784h-17.23l-4.08 18.883 4.08 18.883h17.23V13.785z"
          fill="#FFBA00"
        />
        <Path
          d="M50 13.784l-4.082 18.883L50 51.55h17.229V13.785H50z"
          fill="#FDE09C"
        />
        <Path
          d="M50 13.784H32.771L28.69 32.667l4.082 18.883H50V13.785z"
          fill="#FFBA00"
        />
        <Path d="M32.771 13.785H15.543v37.766H32.77V13.785z" fill="#FDE09C" />
        <Path
          d="M42.193 19.9H32.77l-2.04 3.06 2.04 3.062h9.422v-6.123zM42.193 29.606H32.77l-2.04 3.061 2.04 3.061h9.422v-6.122zM42.193 39.313H32.77l-2.04 3.06 2.04 3.062h9.422v-6.122z"
          fill="#FF8E00"
        />
        <Path
          d="M32.77 19.9h-9.421v6.122h9.42V19.9zM32.77 29.606h-9.421v6.122h9.42v-6.122zM32.77 39.312h-9.421v6.123h9.42v-6.123z"
          fill="#FFBA00"
        />
        <Path
          d="M76.65 19.9H67.23l-2.04 3.06 2.04 3.062h9.421v-6.123zM76.65 29.606H67.23l-2.04 3.061 2.04 3.061h9.421v-6.122zM76.65 39.313H67.23l-2.04 3.06 2.04 3.062h9.421v-6.122z"
          fill="#FF8E00"
        />
        <Path
          d="M67.228 19.9h-9.42v6.122h9.42V19.9zM67.228 29.606h-9.42v6.122h9.42v-6.122zM67.228 39.312h-9.42v6.123h9.42v-6.123z"
          fill="#FFBA00"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_22_10">
          <Path fill="#fff" d="M0 0H100V100H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
