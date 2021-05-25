import React from "react";
import { ThemeType } from "../Icon/icon";
import ClassNames from "classnames";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percent: number;
  theme?: ThemeType;
  height?: number;
}

/**
 * Linear progress bar
 *
 * ## Usage
 *
 * import {ProgressBar} from "collin-ui"
 *
 */
export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { theme, percent, className, style, height, ...restProps } = props;
  const styleWithHeight: React.CSSProperties = {
    ...style,
    height: `${height}px`,
  };
  const innerStyle: React.CSSProperties = {
    width: `${percent}%`,
    height: "100%",
  };
  const classes = ClassNames(
    "progress-bar",
    {
      [`progress-${theme}`]: theme,
    },
    className
  );
  return (
    <div style={styleWithHeight} {...restProps} className={classes}>
      <div className="progress-bar-inner" style={innerStyle}></div>
    </div>
  );
};

ProgressBar.defaultProps = {
  height: 15,
  theme: "primary",
};

export default ProgressBar;
