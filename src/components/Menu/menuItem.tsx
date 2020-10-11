import React, { useContext } from "react";
import ClassNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = ClassNames(
    "menu-item",
    {
      "been-disabled": disabled,
      "been-actived": !disabled && index === context.activeIndex,
    },
    className
  );
  return (
    <li
      style={style}
      className={classes}
      onClick={() => {
        !disabled && context.onSelect && index && context.onSelect(index);
      }}
    >
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
