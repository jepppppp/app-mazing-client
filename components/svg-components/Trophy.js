import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M54.075 8.308v6.113h39.64c-1.136 9.953-7.723 17.613-15.655 17.613H54.075v6.113H78.06c5.995 0 11.586-2.878 15.744-8.103C97.8 25.024 100 18.391 100 11.364V8.309H54.075z"
        fill="#FFBA00"
      />
      <Path
        d="M21.94 32.034c-7.932 0-14.52-7.66-15.654-17.613h39.639V8.308H0v3.057c0 7.025 2.2 13.66 6.196 18.68 4.159 5.224 9.75 8.102 15.744 8.102h23.985v-6.113H21.94z"
        fill="#FDE09C"
      />
      <Path d="M54.701 84.845V57.539h-6.739L50 84.845h4.701z" fill="#FFBA00" />
      <Path d="M50 57.538h-4.702v27.306H50V57.539z" fill="#FDE09C" />
      <Path
        d="M69.988 88.924v-8.019H50L45.925 93l24.063-4.076z"
        fill="#FF8E00"
      />
      <Path d="M50 80.905H30.012v8.02L50 93V80.905z" fill="#FFBA00" />
      <Path
        d="M80.786 94.378a5.454 5.454 0 00-5.453-5.454H50v8.02h30.786v-2.566z"
        fill="#983300"
      />
      <Path
        d="M30.012 88.924h-5.345a5.454 5.454 0 00-5.454 5.454v2.565H50v-8.019H30.012z"
        fill="#D5681E"
      />
      <Path
        d="M78.06 35.906V3.056H50l-4.075 28.13L50 63.86h.107c15.438 0 27.953-12.516 27.953-27.954z"
        fill="#FF8E00"
      />
      <Path
        d="M21.94 3.057v32.85c0 15.438 12.515 27.953 27.953 27.953H50V3.057H21.94z"
        fill="#FFBA00"
      />
      <Path
        d="M61.843 27.91l-8.183-1.189L50 19.306l-4.075 10.69L50 37.985l7.32 3.848-1.399-8.15 5.922-5.773z"
        fill="#FFBA00"
      />
      <Path
        d="M46.34 26.721l-8.183 1.19 5.922 5.772-1.399 8.15L50 37.985v-18.68l-3.66 7.416z"
        fill="#FDE09C"
      />
    </Svg>
  );
}

export default SvgComponent;
