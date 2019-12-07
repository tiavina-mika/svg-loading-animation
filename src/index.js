import ReactDOM from "react-dom";
import React from "react";
import clsx from "clsx";
import { makeStyles, darken } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { useCountUp } from 'react-countup';

const useStyles = makeStyles({
  circleIn: {
    fill: "url(#gradientIn)",
    strokeWidth: 10
  },
  circleInStart: {
    stroke: "red",
  },
  circleInEnd: {
    stroke: "#348e00",
  },
  circleOut: {
    // fill: 'url(#gradientOut)',
    stroke: '#000',
    strokeMiterlimit: '10',
    strokeWidth: '2px',
  },
  circleOutActive: {
    fill: 'url(#gradientOutActive)',
    animation: '$setCircleOutBg 2s linear infinite forwards'
  },
  circleOutCompleted: {
    fill: 'url(#gradientOutCompleted)',
  },
  '@keyframes setCircleOutBg': {
    '100%': {
      fill: 'url(#gradientOutActive)'
    }
  },
  '@keyframes setBorderCircle': {
    '100%': {
      stroke: darken('#fff', 0.6)
    }
},
  circleInBorder: {
    fill: "none",
    stroke: "black",
    strokeWidth: 2
  },
  circleInBorderActive: {
    animation: '$setBorderCircle 2s linear infinite forwards',
  },
  circleInBorderCompleted: {
    stroke: darken('#348e00', 1),
  },

  line: {
    fill: "pink",
    stroke: "pink",
    strokeWidth: "10",
    strokeLinecap: "round"
  },
  stop1: {
    stopColor: "red",
    stopOpacity: 1
  },
  stop2: {
    stopColor: "#348e00",
    stopOpacity: 1
  },
  count: {
    fill: '#fff',
    fontSize: 35
  }
});

const App = () => {
  const classes = useStyles();
  const { countUp } = useCountUp({ end: 100 });

  return (
    <svg width="300" height="300" viewBox="0, 0, 300, 300">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className={classes.stop1} />
          <stop offset="100%" className={classes.stop2} />
        </linearGradient>

        <radialGradient id="gradientOutActive" cx="50%" cy="50%" r="55%">
          <stop stopColor="transparent" offset="0%" />
          <stop stopColor="red" offset="40%" />
          <stop stopColor="#000" offset="90%" />
          <stop stopColor="#000" offset="100%" />
        </radialGradient>
        <radialGradient id="gradientOutCompleted" cx="50%" cy="50%" r="55%">
          <stop stopColor="transparent" offset="0%" />
          <stop stopColor="#348e00" offset="40%" />
          <stop stopColor={`${darken('#348e00', 0.8)}`} offset="90%" />
          <stop stopColor="#000" offset="100%" />
        </radialGradient>
        <radialGradient id="gradientOutActive" cx="50%" cy="50%" r="55%">
          <stop stopColor="transparent" offset="0%" />
          <stop stopColor="#fff" offset="40%" />
          <stop stopColor="#000" offset="90%" />
          <stop stopColor="#000" offset="100%" />
        </radialGradient>

        <radialGradient id="gradientIn" cx="50%" cy="50%" r="55%">
          <stop stopColor="#000" offset="0%" />
          <stop stopColor="#000" offset="40%" />
          <stop stopColor="#000" offset="90%" />
          <stop stopColor="#000" offset="100%" />
        </radialGradient>
      </defs>
      <g>
        <circle
          cx={150}
          cy={150}
          r={130}
          className={clsx(
            classes.circleOut,
            countUp < 100 ? classes.circleOutActive: classes.circleOutCompleted
          )}
          // fill= 'url(#gradientOut)'
          // animate={{ cy: [null, 200], r: [115, 125] }}
          // transition={{
          //   duration: 1,
          //   times: [0, 1],
          //   yoyo: Infinity,
          // }}
        />
        <circle
            cx={150} 
            cy={150}
            r={106}
            className={clsx(
              classes.circleInBorder, 
              countUp < 100? classes.circleInBorderActive: classes.circleInBorderCompleted
            )} 
        />
        <motion.circle cx={150} cy={150} r={100}
          className={clsx(
            classes.circleIn, 
            countUp < 100 ? classes.circleInStart: classes.circleInEnd
          )}
        />
        <text 
          x={150} y={150}
          className={classes.count}
          strokeWidth="2px"
          textAnchor="middle"
          alignmentBaseline="middle">
            {countUp}%
        </text>
        <circle cx={150} cy={150} r={95}
            className={clsx(
              classes.circleInBorder, 
              countUp < 100? classes.circleInBorderActive: ''
            )} 
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
