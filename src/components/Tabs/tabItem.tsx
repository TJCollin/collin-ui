import React, { useContext, ReactNode, useRef, useEffect } from "react";
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
  const { onSelect, activeIndex } = passedContext;
  const tabItemRef = useRef<HTMLLIElement>(null);
  const handleClick = () => {
    const offsetLeft =
      tabItemRef.current?.offsetLeft !== undefined
        ? tabItemRef.current?.offsetLeft
        : -1;
    const offsetWidth =
      tabItemRef.current?.offsetWidth !== undefined
        ? tabItemRef.current?.offsetWidth
        : -1;
    index && onSelect && onSelect(index, offsetLeft, offsetWidth, false);
  };
  useEffect(() => {
    const offsetLeft =
      tabItemRef.current?.offsetLeft !== undefined
        ? tabItemRef.current?.offsetLeft
        : -1;
    const offsetWidth =
      tabItemRef.current?.offsetWidth !== undefined
        ? tabItemRef.current?.offsetWidth
        : -1;
    index &&
      activeIndex === index &&
      onSelect &&
      onSelect(index, offsetLeft, offsetWidth, true);
  }, []);
  const classes = ClassNames(
    "tab-item",
    {
      "been-actived": index === passedContext.activeIndex,
      "been-disabled": disaled,
    },
    className
  );
  return (
    <li className={classes} onClick={handleClick} ref={tabItemRef}>
      {label}
    </li>
  );
};

export default TabItem;
