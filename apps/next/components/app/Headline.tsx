import React from "react";

interface HeadlineProps {
  text: string;
  level?: number;
}

const Headline = (props: HeadlineProps) => {
  let styles = "";
  switch (props.level) {
    case 1:
      styles = "font-bold text-3xl text-center mb-5";
      break;
    case 2:
      styles = "font-bold text-2xl text-center mb-4";
      break;
    case 3:
      styles = "font-bold text-xl text-center mb-3";
      break;
    case 4:
      styles = "font-bold text-lg text-center mb-2";
      break;
    case 5:
      styles = "font-bold text-base text-center mb-1";
      break;
    case 6:
      styles = "font-bold text-sm text-center mb-1";
      break;
    default:
      styles = "";
      break;
  }
  return React.createElement(props.level ? `h${props.level}` : 'div', { className: styles }, props.text);
}

export default Headline;