import classNames from "classnames";
import React, { FC } from "react";

export interface CardProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  /**
   * Inset card
   */
  inset?: boolean;
  /**
   * Flat card
   */
  flat?: boolean;
  /**
   * Box shadow changed when hovered
   */
  hovered?: boolean;
}

/**
 *
 * Commonly used with `CardContent`
 *
 * ## Usage
 * ```javascript
 * import {Card, CardContent} from "collin-ui"
 * ```
 */
export const Card: FC<CardProps> = (props) => {
  const { inset, flat, hovered, className, ...restProps } = props;
  const classes = classNames(
    "neu-card",
    {
      inset: inset,
      flat: flat,
      hovered: hovered,
    },
    classNames
  );
  return <div className={classes} {...restProps}></div>;
};

Card.defaultProps = {
  inset: false,
  flat: false,
  hovered: false,
};

export default Card;
