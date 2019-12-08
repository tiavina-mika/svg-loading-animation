import ReactDOM from "react-dom";
import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, darken } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useCountUp } from 'react-countup';
import Buttons from './buttons';

const useStyles = makeStyles({
    circleIn: {
      fill: "url(#gradientIn)",
      strokeWidth: 10
    },
    circleInStart: {
      stroke: "#ff3f3f",
    },
    circleInEnd: {
      stroke: "#4dd300",
    },
    circleOut: {
      stroke: '#000',
      strokeMiterlimit: '10',
      strokeWidth: '2px',
    },
    circleOutActive: {
      fill: 'url(#gradientOutActive)',
      animation: '$setCircleOutBg 0.8s linear infinite forwards'
    },
    circleOutCompleted: {
      fill: 'url(#gradientOutCompleted)',
    },
    circleOutAnimated: {
      stroke: darken('#7f7f7f', 0.6),
      strokeWidth: 45,
      strokeDasharray: '75,2',
      transformOrigin: 'center', 
      position: 'absolute',
    },
    circleOutAnimatedOffset: {
      fill: 'none',
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
      stroke: darken('#4dd300', 1),
    },

    stop1: {
      stopColor: "#ff3f3f",
      stopOpacity: 1
    },
    stop2: {
      stopColor: "#348e00",
      stopOpacity: 1
    },
    count: {
      fill: '#777777',
      fontSize: 15,
      fontWeight: 700,
      fontFamily: 'Arial'
    },
    icon: {
      color: '#fff',
      fontSize: 25
    },
    buttonActive: {
      fill: '#fff'
    },
    img: {
      position:"absolute",
      transformOrigin: 'center'
    },
    '@keyframes setCircleOutBg': {
      '100%': {
        fill: 'url(#gradientOutActiveAnimate)'
      }
    },
    '@keyframes setBorderCircle': {
      '100%': {
        stroke: darken('#fff', 0.6)
    },
  },
});

const App = () => {
  const classes = useStyles();
  const [paused, setPaused] = useState(false);

  const { countUp, pauseResume, start } = useCountUp({
    end: 100,
    duration: 2,
    onPauseResume: () => setPaused(!paused),
    onStart: () => paused === true && setPaused(false),
  });

  return (
    <Box bgcolor="#000" height="100vh" display="flex"
      justifyContent="center" alignItems="center" flexDirection="column"
    >
      <svg width="300" height="300" viewBox="0, 0, 300, 300">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className={classes.stop1} />
            <stop offset="100%" className={classes.stop2} />
          </linearGradient>

          <radialGradient id="gradientOutActive" cx="50%" cy="50%" r="55%">
            <stop stopColor="transparent" offset="0%" />
            <stop stopColor="#ff3f3f" offset="40%" />
            <stop stopColor={`${darken('#ff3f3f', 0.8)}`} offset="90%" />
            <stop stopColor="#000" offset="100%" />
          </radialGradient>
          <radialGradient id="gradientOutCompleted" cx="50%" cy="50%" r="55%">
            <stop stopColor="transparent" offset="0%" />
            <stop stopColor="#4dd300" offset="40%" />
            <stop stopColor={`${darken('#4dd300', 0.8)}`} offset="90%" />
            <stop stopColor="#000" offset="100%" />
          </radialGradient>
          <radialGradient id="gradientOutActiveAnimate" cx="50%" cy="50%" r="55%">
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
         { countUp < 100
          ? <g id="animated">
              <circle
                  cx={150} 
                  cy={150}
                  r={128}
                  className={classes.circleOutAnimatedOffset} 
              />
              <g>
                <circle
                    cx={150} 
                    cy={150}
                    r={106}
                    className={classes.circleOutAnimated}
                >
                  <animateTransform 
                    attributeName="transform" 
                    type="rotate" 
                    from="0" to="360" begin="0" dur="4s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </g>
              <circle
                cx={150}
                cy={150}
                r={120}
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
            </g>
          : <circle
              cx={150}
              cy={150}
              r={130}
              className={clsx(
                classes.circleOut,
                countUp < 100 ? classes.circleOutActive: classes.circleOutCompleted
              )}
            /> 
         } 
        <circle
              cx={150} 
              cy={150}
              r={106}
              className={clsx(
                classes.circleInBorder, 
                countUp < 100? classes.circleInBorderActive: classes.circleInBorderCompleted
              )} 
          />
          <circle cx={150} cy={150} r={100}
            className={clsx(
              classes.circleIn, 
              countUp < 100 ? classes.circleInStart: classes.circleInEnd
            )}
          />
          { countUp < 100
            ? 
              // ?   <rect
              //         x="125"
              //         y="125"
              //         height="50"
              //         width="50"
              //         className={classes.buttonActive}
              //         onClick={pauseResume}
              //     />
                 <image
                    href="https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png"
                    height="70"
                    width="70"
                    y="115"
                    x="115"
                    className={classes.img}
                    onClick={pauseResume}
                  >
                    {!paused ? <animateTransform 
                      attributeName="transform" 
                      type="rotate" 
                      from="0" to="360" begin="0" dur="4s" 
                      repeatCount="indefinite" 
                    /> : null
                    }
                  </image>
              //  :  <path 
              //         d="M 100,166 L 150,100 L 202,166 z"
              //           onClick={pauseResume}
              //           className={classes.buttonActive}
              //     />
              // :   <g transform="translate(125, 125) scale(2)" fill="#fff">
              //         <path onClick={start} d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
              //     </g>
              :<g transform="translate(125, 125)">
                  <path
                    fill="#fff"
                    d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"/>
              </g>
          }
          <text 
            x={155}
            y={200}
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
      <Buttons onPause={pauseResume} paused={paused} start={start}/>
    </Box>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
