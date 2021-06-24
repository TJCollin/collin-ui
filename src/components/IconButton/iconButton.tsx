import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React, { FC, memo } from "react";
import Button from "../Button";
import { ButtonProps } from "../Button/button";
import Icon from "../Icon/icon";
import classNames from "classnames";

export interface IconButtonProps extends ButtonProps {
  icon: IconProp;
  rounded?: boolean;
}

/**
 * Commonly used buttons with `icon` & `rounded` props.
 *
 * ```javascript
 * import { IconButton } from "collin-ui"
 * ```
 *
 */
export const IconButton: FC<IconButtonProps> = memo(
  ({ icon, rounded, className, ...restProps }) => {
    const classes = classNames("icon-button", rounded && "rounded", className);

    return (
      <Button className={classes} {...restProps}>
        <Icon icon={icon}></Icon>
      </Button>
    );
  }
);

export default IconButton;
