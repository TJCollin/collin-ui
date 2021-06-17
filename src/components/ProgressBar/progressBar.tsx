import React, { forwardRef } from "react";
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
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (props, ref) => {
    const {
      theme,
      percent,
      className,
      style,
      height = 16,
      ...restProps
    } = props;
    const styleWithHeight: React.CSSProperties = {
      borderRadius: height / 2,
      ...style,
      height: `${height}px`,
    };
    const innerStyle: React.CSSProperties = {
      width: `${percent}%`,
      height: "100%",
      borderRadius: height / 2,
    };
    const classes = ClassNames(
      "progress-bar",
      {
        [`progress-${theme}`]: theme,
      },
      className
    );
    return (
      <div style={styleWithHeight} {...restProps} className={classes} ref={ref}>
        <div className="progress-bar-inner" style={innerStyle}></div>
      </div>
    );
  }
);

ProgressBar.defaultProps = {
  height: 15,
  theme: "primary",
};

export default ProgressBar;
