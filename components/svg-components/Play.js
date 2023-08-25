import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.214 7.863H4.786a4.786 4.786 0 103.99 7.429h2.449a4.786 4.786 0 103.99-7.429zm0 8.338c-1.192 0-2.3-.595-2.961-1.592l-.366-.551H8.113l-.366.551a3.548 3.548 0 01-2.961 1.592 3.556 3.556 0 01-3.552-3.552 3.556 3.556 0 013.552-3.552h10.428a3.556 3.556 0 013.552 3.552 3.556 3.556 0 01-3.552 3.552zM10.505 3.332a.675.675 0 01.3-.566.672.672 0 01.647-.063.685.685 0 01.416.629 1.677 1.677 0 00.742 1.394 1.675 1.675 0 001.595.155 1.687 1.687 0 001.027-1.55V.566h-1v2.767a.675.675 0 01-.3.565.676.676 0 01-.647.063.685.685 0 01-.417-.628 1.683 1.683 0 00-3.076-.94 1.678 1.678 0 00-.287.94v4.09h1v-4.09z"
        fill="#000"
      />
      <Path
        d="M5.405 10.459H4.119v1.476H2.643v1.286h1.476v1.475h1.286v-1.475H6.88v-1.287H5.405V10.46zM14.653 10.316a.794.794 0 101.123 1.122.794.794 0 00-1.123-1.122zM12.882 12.088a.794.794 0 101.122 1.122.794.794 0 00-1.122-1.122zM14.653 13.86a.793.793 0 101.12 1.121.793.793 0 00-1.12-1.121zM17.547 12.088a.794.794 0 10-1.122 1.123.794.794 0 001.122-1.123z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
