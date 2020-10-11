import React, { useContext, useState, cloneElement } from "react";
import ClassNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
}

export const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, index, className, children } = props;
  const menuContext = useContext(MenuContext);
  const defaultOpenSubMenus = menuContext.defaultOpenSubMenus as Array<string>;
  const isOpend =
    index && menuContext.mode === "vertical"
      ? defaultOpenSubMenus.includes(index)
      : false;
  const [opened, setOpen] = useState(isOpend);

  const clickEvents =
    menuContext.mode === "vertical"
      ? {
          onClick: (e: React.MouseEvent) => {
            e.persist();
            setOpen(!opened);
          },
        }
      : {};
  let timer: any;
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      e.persist();
      setOpen(toggle);
    }, 500);
  };
  const hoverEvents =
    menuContext.mode === "vertical"
      ? {}
      : {
          onMouseEnter: (e: React.MouseEvent) => {
            handleHover(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleHover(e, false);
          },
        };

  const classes = ClassNames(
    "menu-item submenu-item",
    {
      "been-activated": menuContext.activeIndex === index,
    },
    className
  );
  const subMenuClasses = ClassNames("submenu", {
    "submenu-open": opened,
  });
  const renderChildren = () => {
    let subMenuIndex = index;
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
      const { displayName } = childEl.type;
      if (displayName === "MenuItem") {
        return cloneElement(childEl, {
          index: `${subMenuIndex}-${index}`,
        });
      } else {
        console.error(`Warning: ${displayName} is not a MenuItem component`);
      }
    });
  };

  return (
    <li className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      <ul className={subMenuClasses}>{renderChildren()}</ul>
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
