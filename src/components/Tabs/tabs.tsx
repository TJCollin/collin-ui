import React, { useState, createContext } from "react";
import ClassNames from "classnames";
import { TabItemProps } from "./tabItem";

export interface SelectCallback {
  (index: string): void;
}

type TabsType = "line" | "card";

export interface TabsProps {
  defaultIndex?: string;
  className?: string;
  onSelect?: SelectCallback;
  type?: TabsType;
}

export interface TabsContextType {
  activeIndex?: string;
  onSelect?: SelectCallback;
}
export const TabsContext = createContext<TabsContextType>({ activeIndex: "0" });

/**
 * Divide data collections which are related yet belong to different types.<br>
 *
 * ```javascript
 * import {Tabs} from "collin-ui"
 * ```
 */
export const Tabs: React.FC<TabsProps> = (props) => {
  const { defaultIndex, className, onSelect, type, children } = props;
  const tabsClasses = ClassNames("tabs", className);
  const tabsNavClasses = ClassNames("tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });

  const [activeIndex, setActive] = useState(defaultIndex);

  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };
  const passedContext: TabsContextType = {
    activeIndex: activeIndex,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    const indexArr: string[] = [];
    return React.Children.map(children, (child, index) => {
      let childEl = child as React.FunctionComponentElement<TabItemProps>;
      let customIndex = childEl.props.index;
      if (customIndex) {
        if (!indexArr.includes(customIndex)) {
          indexArr.push(customIndex);
        } else {
          customIndex = index.toString();
          console.error(
            `${customIndex} is invalid for duplicate index, reset to default index ${index}`
          );
        }
      } else {
        customIndex = index.toString();
      }

      return React.cloneElement(childEl, {
        index: customIndex,
      });
    });
  };

  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      let childEl = child as React.FunctionComponentElement<TabItemProps>;
      const classes = ClassNames("tabs-content-item", {
        "been-actived":
          (childEl.props.index || index.toString()) === activeIndex,
      });

      return <div className={classes}>{childEl.props.children}</div>;
    });
  };

  return (
    <div className={tabsClasses} data-testid="test-tabs">
      <ul className={tabsNavClasses}>
        <TabsContext.Provider value={passedContext}>
          {renderChildren()}
        </TabsContext.Provider>
      </ul>
      <div className="tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  type: "line",
  defaultIndex: "0",
};

export default Tabs;
