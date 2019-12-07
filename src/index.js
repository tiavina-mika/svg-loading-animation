import ReactDOM from "react-dom";
import React from 'react';
import { makeStyles, darken, lighten } from '@material-ui/core/styles';
import { motion } from "framer-motion";


const useStyles = makeStyles({
  circleIn: {
    fill: 'url(#gradientIn)', 
    stroke: 'red',
    strokeWidth: 10,
  },
  circleOut: {
    fill: 'url(#gradientOut)', 
    stroke: 'black'
  },
  circleInBorder: {
    fill: 'none', 
    stroke: 'black',
    strokeWidth: 2
  },
  line: {
      fill: 'pink', 
      stroke: 'pink', 
      strokeWidth: '10',
      strokeLinecap: 'round'
  },
  stop1: {
    stopColor: 'red',
    stopOpacity: 1
  },
  stop2: {
    stopColor: 'green',
    stopOpacity: 1
  },

});

const App = ({ variants, onCompleted}) => {
    const classes = useStyles();

    return (
        <svg width="300" height="300" viewBox="0, 0, 300, 300">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"  className={classes.stop1} />
                <stop offset="100%"  className={classes.stop2} />
              </linearGradient>

              <radialGradient id = "gradientOut" cx = "50%" cy = "50%" r = "55%">
                  <stop stopColor = "transparent" offset = "0%"/>
                  <stop stopColor = "#757575" offset = "40%"/>
                  <stop stopColor = {darken("#757575", 0.8)} offset = "90%"/>
                  <stop stopColor =  "#fff" offset = "100%"/>
              </radialGradient>

              <radialGradient id = "gradientIn" cx = "50%" cy = "50%" r = "55%">
                  <stop stopColor = "#000" offset = "0%"/>
                  <stop stopColor = "#000" offset = "40%"/>
                  <stop stopColor = "#000" offset = "90%"/>
                  <stop stopColor = '#000' offset = "100%"/>
              </radialGradient>

          </defs>
          <g>
          <circle
                cx={150}
                cy={150}
                r={130}
                // id="orange-circle"
                className={classes.circleOut}
                // fill= 'url(#gradientOut)'
                // animate={{ cy: [null, 200], r: [115, 125] }}
                // transition={{ 
                //   duration: 1,
                //   times: [0, 1], 
                //   yoyo: Infinity, 
                // }}
            >
            <animateColor 
                // xlinkHref="#orange-circle"
                attributeName="fill"
                attributeType="CSS"
                from='url(#gradientOut)'
                to='url(#grad1)' 
                dur="3s"
                repeatCount="indefinite"
                // begin="click"
                fill="freeze"
            />
          </circle>
          <circle
              cx={150}
              cy={150}
              r={106}
              className={classes.circleInBorder}
          />
           <motion.circle
              cx={150}
              cy={150}
              r={100}
              className={classes.circleIn}
          />
           <circle
              cx={150}
              cy={150}
              r={95}
              className={classes.circleInBorder}
          />

          </g>
        </svg> 
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
