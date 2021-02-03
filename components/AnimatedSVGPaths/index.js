import React, { Component } from "react";
import PropTypes from "prop-types";
import Svg from "react-native-svg";
import { Dimensions } from "react-native";

import Path from "../AnimatedPath";

const { height, width } = Dimensions.get("window");
class AnimatedSVGPaths extends Component {
  static propTypes = {
    ds: PropTypes.arrayOf(PropTypes.string).isRequired,
    clipDs: PropTypes.arrayOf(PropTypes.string),
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    duration: PropTypes.number,
    height: PropTypes.number,
    delay: PropTypes.number,
    loopDelay: PropTypes.number,
    width: PropTypes.number,
    scale: PropTypes.number,
    fill: PropTypes.string,
    loop: PropTypes.bool,
    rewind: PropTypes.bool,
  };

  static defaultProps = {
    clipDs: [],
    strokeColor: "black",
    strokeWidth: 1,
    duration: 1000,
    delay: 1000,
    loopDelay: 0,
    fill: "none",
    scale: 1,
    height,
    width,
    rewind: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      ds,
      clipDs,
      fill,
      scale,
      width,
      height,
      strokeColor,
      strokeWidth,
      duration,
      delay,
      loopDelay,
      loop,
      rewind,
    } = this.props;
    
    const svgDefs = clipDs.map((d, index) => {
      return (
        <ClipPath key={index} id={`clip${index}`}>
          <Path d={d} />
        </ClipPath>
      );
    });

    const svgPaths = ds.map((d, index) => {
      return (
        <Path
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          duration={duration}
          delay={delay}
          loopDelay={loopDelay}
          scale={scale}
          fill={fill}
          key={index}
          loop={loop}
          rewind={rewind}
          d={d}
          clipPath={clipDs.length ? `url(#clip${index})` : null}
        />
      );
    });

    return (
      <Svg height={height * scale + 5} width={width * scale + 5} {...this.props}>
        {clipDs.length ? <Defs>{svgDefs}</Defs> : null}
        {svgPaths}
      </Svg>
    );
  }
}

/* Export ==================================================================== */

module.exports = AnimatedSVGPaths;
module.exports.details = {
  title: "AnimatedSVGPaths",
};
