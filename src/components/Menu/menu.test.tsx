import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.submenu-open {
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};
const testMenuClass = "test-menu-class";
const testMenuItemClass = "test-menu-item-class";
const testMenuStyle = {
  background: "yello",
};
const testMenuItemStyle = {
  background: "gray",
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem className={testMenuItemClass} style={testMenuItemStyle}>
        normal
      </MenuItem>
      <SubMenu title="subMenu">
        <MenuItem>dropdown1</MenuItem>
        <MenuItem>dropdown2</MenuItem>
      </SubMenu>
      <SubMenu title="subMenu2">
        <MenuItem>dropdown3</MenuItem>
        <MenuItem>dropdown4</MenuItem>
      </SubMenu>
    </Menu>
  );
};

let verWrapper: RenderResult,
  wrapper: RenderResult,
  menuEl: HTMLUListElement,
  activeItem: HTMLLIElement,
  disabledItem: HTMLLIElement,
  normalItem: HTMLLIElement;
describe("Menu", () => {
  const disabledItemClass = "been-disabled";
  const activedItemClass = "been-actived";

  const testMenuProps: MenuProps = {
    defaultIndex: "0",
    className: testMenuClass,
    onSelect: jest.fn(),
    style: testMenuStyle,
  };

  beforeEach(() => {
    wrapper = render(generateMenu(testMenuProps));
    wrapper.container.append(createStyleFile());
    menuEl = wrapper.getByTestId("test-menu") as HTMLUListElement;
    activeItem = wrapper.getByText("active") as HTMLLIElement;
    disabledItem = wrapper.getByText("disabled") as HTMLLIElement;
    normalItem = wrapper.getByText("normal") as HTMLLIElement;
  });
  it("should render default menu and menuItem", () => {
    expect(menuEl).toBeInTheDocument();
    expect(menuEl).toHaveClass("menu", testMenuClass);
    expect(menuEl).toHaveStyle(testMenuStyle);
    expect(menuEl.querySelectorAll(":scope > li").length).toBe(5);
    expect(activeItem).toHaveClass("menu-item", activedItemClass);
    expect(disabledItem).toHaveClass("menu-item", disabledItemClass);
    expect(normalItem).toHaveClass("menu-item", testMenuItemClass);
    expect(normalItem).toHaveStyle(testMenuItemStyle);
  });
  it("should change active or not based on disabled props and call callback function when item selected", () => {
    fireEvent.click(normalItem);
    expect(activeItem).not.toHaveClass(disabledItemClass);
    expect(normalItem).toHaveClass(activedItemClass);
    expect(testMenuProps.onSelect).toBeCalledWith("2");
    fireEvent.click(disabledItem);
    expect(testMenuProps.onSelect).toBeCalledTimes(1);
    expect(disabledItem).toHaveClass(disabledItemClass);
    expect(normalItem).toHaveClass(activedItemClass);
    expect(disabledItem).not.toHaveClass(activedItemClass);
  });

  it("should show dropdown when hover on subMenu", async () => {
    const subMenu = wrapper.getByText("subMenu");
    expect(subMenu).toBeInTheDocument();
    expect(wrapper.queryByText("dropdown1")).not.toBeVisible();
    expect(wrapper.queryByText("dropdown2")).not.toBeVisible();
    // test show drop dow
    fireEvent.mouseEnter(subMenu);
    await waitFor(() => {
      expect(wrapper.queryByText("dropdown1")).toBeVisible();
      expect(wrapper.queryByText("dropdown2")).toBeVisible();
    });
    // test click on dropdown item
    fireEvent.click(wrapper.getByText("dropdown1"));
    expect(testMenuProps.onSelect).toBeCalledWith("3-0");
    // test hide dropdown
    fireEvent.mouseLeave(subMenu);
    await waitFor(() => {
      expect(wrapper.queryByText("dropdown1")).not.toBeVisible();
      expect(wrapper.queryByText("dropdown2")).not.toBeVisible();
    });
  });
});

describe("test Menu and MenuItem component in vertical mode", () => {
  const testVerProps: MenuProps = {
    mode: "vertical",
    defaultOpenSubMenus: ["3"],
  };
  beforeEach(() => {
    verWrapper = render(generateMenu(testVerProps));
    verWrapper.container.append(createStyleFile());
  });

  it("should render vertical mode when mode is set to vertical", () => {
    const menuElement = verWrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", () => {
    expect(verWrapper.queryByText("dropdown1")).toBeVisible();
    expect(verWrapper.queryByText("dropdown3")).not.toBeVisible();
  });
  it("should show dropdown when subMenu is clicked", () => {
    expect(verWrapper.queryByText("dropdown3")).not.toBeVisible();
    fireEvent.click(verWrapper.getByText("subMenu2"));
    expect(verWrapper.queryByText("dropdown3")).toBeVisible();
  });
});
