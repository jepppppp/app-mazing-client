import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.333 16.667a6.25 6.25 0 00-6.25-6.25H8.333a6.25 6.25 0 00-6.25 6.25v16.666a6.25 6.25 0 006.25 6.25h18.75a6.25 6.25 0 006.25-6.25v-4.285l11.29 8.064a2.083 2.083 0 003.294-1.695V14.583a2.083 2.083 0 00-3.294-1.695l-11.29 8.064v-4.285zM34.834 25l8.916-6.368v12.736L34.834 25zm-7.75-10.417c1.15 0 2.083.933 2.083 2.084v16.666c0 1.151-.933 2.084-2.084 2.084H8.333a2.083 2.083 0 01-2.083-2.084V16.667c0-1.15.933-2.084 2.083-2.084h18.75z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgComponent
