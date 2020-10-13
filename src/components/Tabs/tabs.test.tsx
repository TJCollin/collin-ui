import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
} from "@testing-library/react";
import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabItem";

describe("Tabs", () => {
  const createStyleFile = () => {
    const cssFile: string = `
		.tabs-content-item {
				display: none;
			}
			.tabs-content-item.been-actived {
				display:block;
			}
		`;
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssFile;
    return style;
  };
  const generateTabs = (props: TabsProps) => {
    return (
      <Tabs {...props}>
        <TabItem label="tab1" index="tab1" className="test-tab-item-class">
          default tabItem
        </TabItem>
        <TabItem label="tab2" disaled>
          disabled tabItem
        </TabItem>
        <TabItem label={<button>tab3</button>} disaled>
          customized tabItem
        </TabItem>
      </Tabs>
    );
  };

  const defautlProps: TabsProps = {
    defaultIndex: "tab1",
    className: "test-class",
    onSelect: jest.fn(),
  };
  const cardProps: TabsProps = {
    type: "card",
  };
  let wrapper: RenderResult,
    cardWrraper: RenderResult,
    tabsEl: HTMLElement,
    normalEl: HTMLElement,
    disabledEL: HTMLElement,
    customizedBtn: HTMLElement;
  beforeEach(() => {
    wrapper = render(generateTabs(defautlProps));
    wrapper.container.append(createStyleFile());
    tabsEl = wrapper.getByTestId("test-tabs");
    normalEl = wrapper.getByText("tab1");
    disabledEL = wrapper.getByText("tab2");
    customizedBtn = wrapper.getByText("tab3");
  });
  it("should render default tabs", () => {
    expect(tabsEl).toBeInTheDocument();
    expect(tabsEl.children[0].children.length).toBe(3);
    // custom class for tabs
    expect(tabsEl).toHaveClass("test-class", "tabs");
    // default active index
    expect(normalEl).toHaveClass("been-actived", "test-tab-item-class");
    expect(disabledEL).not.toHaveClass("been-actived");
    expect(customizedBtn).not.toHaveClass("been-actived");

    // disabled tabItem
    expect(disabledEL).toHaveClass("been-disabled");

    // customised tabItem
    expect(customizedBtn).toBeInTheDocument();
    expect(customizedBtn.tagName).toBe("BUTTON");
  });
  it("should call select callback and change tab content when normal nav clicked and do nothing when disabled nav clicked", () => {
    // undisabled tabItem clicked
    fireEvent.click(customizedBtn);
    expect(customizedBtn.parentElement).toHaveClass("been-actived");
    expect(normalEl).not.toHaveClass("been-actived");

    // disabled tabItem click
    expect(customizedBtn.parentElement).toHaveClass("been-actived");
    expect(disabledEL).not.toHaveClass("been-actived");
  });
  // card tab
  it("should render card tabs when type set to card", () => {
    cleanup();
    cardWrraper = render(generateTabs(cardProps));
    tabsEl = cardWrraper.getByTestId("test-tabs");
    expect(tabsEl.children.length).toBe(2);
    expect(tabsEl.children[0]).toHaveClass("nav-card");
  });
});
