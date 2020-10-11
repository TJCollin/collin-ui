import { FC } from "react";
import TabItem, { TabItemProps } from "./tabItem";
import Tabs, { TabsProps } from "./tabs";

type TabsType = FC<TabsProps> & {
  TabItem: FC<TabItemProps>;
};

const TabsComponent = Tabs as TabsType;
TabsComponent.TabItem = TabItem;

export default TabsComponent;
