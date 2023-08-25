import * as React from "react";
import Svg, { Path } from "react-native-svg";

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
      <Path d="M29.818 0H7.647v100h22.171V0z" fill="#00DDC0" />
      <Path d="M29.818 0H18.733v100h11.085V0z" fill="#00AC93" />
      <Path d="M51.99 0H29.818v100H51.99V0z" fill="#FFAD1D" />
      <Path d="M51.992 0H40.906v100h11.086V0z" fill="#FF8900" />
      <Path d="M29.818 85.449H7.647v14.549h22.171v-14.55z" fill="#006659" />
      <Path d="M29.818 85.449H18.733v14.549h11.085v-14.55z" fill="#005349" />
      <Path d="M51.99 85.449H29.818v14.549H51.99v-14.55z" fill="#FF4F18" />
      <Path d="M51.992 85.449H40.906v14.549h11.086v-14.55z" fill="#FF3400" />
      <Path
        d="M71.279 99.905l21.072-4.216L73.336.652 52.264 4.87l19.015 95.036z"
        fill="#00A5FF"
      />
      <Path
        d="M81.814 97.796l10.537-2.108L73.336.652 62.8 2.76l19.014 95.036z"
        fill="#0082D2"
      />
      <Path
        d="M92.352 95.682l-21.07 4.216-2.858-14.279 21.08-4.172 2.848 14.235z"
        fill="#006DF3"
      />
      <Path
        d="M92.352 95.682L81.817 97.79l-2.853-14.257 10.54-2.086 2.848 14.235z"
        fill="#005FD1"
      />
      <Path d="M23.144 10H14.45v6.521h8.695V10z" fill="#fff" />
      <Path d="M23.144 10h-4.348v6.521h4.348V10z" fill="#E1E1E4" />
      <Path d="M45.318 10h-8.695v6.521h8.695V10z" fill="#fff" />
      <Path d="M45.32 10h-4.414v6.521h4.413V10z" fill="#E1E1E4" />
      <Path
        d="M60.788 13.414l1.236 6.404 8.274-1.598-1.236-6.404-8.274 1.598z"
        fill="#fff"
      />
      <Path
        d="M66.057 19.039l-1.28-6.396 4.284-.826 1.236 6.403-4.24.819z"
        fill="#E1E1E4"
      />
    </Svg>
  );
}

export default SvgComponent;
