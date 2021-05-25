import React, { useState, createContext } from "react";
import ClassNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
export interface SelectCallback {
  (index: string): void;
}

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface CMenuContext {
  activeIndex?: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<CMenuContext>({ activeIndex: "0" });

/**
 * Menu that provides navigation for your website.
 *
 * ```javascript
 * import {Menu} from "collin-ui"
 * ```
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenSubMenus,
  } = props;

  const [currentActiveIndex, setActive] = useState(defaultIndex || "0");
  const classes = ClassNames(
    "menu",
    {
      "menu-vertical": mode === "vertical",
      "menu-horizontal": mode !== "vertical",
    },
    className
  );
  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };
  const passedContext: CMenuContext = {
    activeIndex: currentActiveIndex,
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus: defaultOpenSubMenus,
  };

  const renderChildren = (children: React.ReactNode) => {
    let indexArray: string[] = [];

    return React.Children.map(children, (child, index) => {
      // child 是 reactNode 类型,reactNode 可以是ReactElement, ReactFragment, string ，a number 或者一个数组 ReactNodes, 或者null,或者 undefined, 或者 a boolean
      // 而这里明显传过来的应该是<MenuItem /> 或者 <other />
      // MenuItem是functionalComponent
      // <MenuItem /> 是MenuItem是functionalComponentElement
      // 区别可以详细了解 component element
      const childEl = child as React.FunctionComponentElement<MenuItemProps>;
      let customIndex = childEl.props.index;
      if (customIndex) {
        if (indexArray.includes(customIndex)) {
          console.error(`Error: duplicate index ${customIndex} for MenuItem`);
        } else {
          indexArray.push(customIndex);
        }
      }
      customIndex && index === 0 && !defaultIndex && setActive(customIndex);
      const { displayName } = childEl.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childEl, {
          index: customIndex || `${index}`,
        });
      } else {
        console.error(`Warning: ${displayName} is not a MenuItem component`);
      }
    });
  };

  return (
    <ul style={style} className={classes} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren(children)}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
