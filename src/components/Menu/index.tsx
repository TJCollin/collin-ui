import { FC } from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import SubMenu, { SubMenuProps } from "./subMenu";

type MenuType = FC<MenuProps> & {
  MenuItem: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};
const MenuComponent = Menu as MenuType;
MenuComponent.MenuItem = MenuItem;
MenuComponent.SubMenu = SubMenu;
export default MenuComponent;
