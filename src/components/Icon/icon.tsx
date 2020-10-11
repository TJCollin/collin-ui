import React from "react";
import ClassNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export type ThemeType =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeType;
}

/**
 * FontAwesome icons from library `@fortawesome/free-solid-svg-icons`
 *
 * ```javascript
 * import {Icon} from
 * ```
 */
export const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;
  const classes = ClassNames(
    "icon",
    {
      [`icon-${theme}`]: theme,
    },
    className
  );
  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>;
};

export default Icon;
