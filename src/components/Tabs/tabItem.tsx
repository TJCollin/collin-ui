import React, { useContext, ReactNode } from "react";
import ClassNames from "classnames";
import { TabsContext } from "./tabs";
export interface TabItemProps {
  label: string | ReactNode;
  disaled?: boolean;
  className?: string;
  index?: string;
  children?: ReactNode;
}

export const TabItem: React.FC<TabItemProps> = (props) => {
  const { label, disaled, className, index } = props;
  const passedContext = useContext(TabsContext);
  const onClick = passedContext.onSelect;
  const classes = ClassNames(
    "tab-item",
    {
      "been-actived": index === passedContext.activeIndex,
      "been-disabled": disaled,
    },
    className
  );
  return (
    <li
      className={classes}
      onClick={() => {
        index && onClick && onClick(index);
      }}
    >
      {label}
    </li>
  );
};

export default TabItem;
