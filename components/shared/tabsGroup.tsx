import React, { useState } from 'react';
import { Search, X } from '@tamagui/lucide-icons';
import type { TabLayout } from 'tamagui';
import { SizableText, Text, ToggleGroup, View, XStack } from 'tamagui';

import Loader from './loader';
import InputText from './inputText';
import ActionIcon from './actionIcon';

export type TabType = {
  value: string;
  title: string;
  content: React.ReactNode;
};

type TabsAdvancedProps = {
  name?: string;
  tabs: TabType[];
  query?: string;
  loadingSearch?: boolean;
  searchableTabs?: string[] | 'all';
  onQueryChange?: (query: string) => void;
};

type TabState = {
  currentTab: string;
  intentAt?: TabLayout | null;
  activeAt?: TabLayout | null;
  prevActiveAt?: TabLayout | null;
};

const TabsGroup = (props: TabsAdvancedProps) => {
  const { tabs, query, searchableTabs, loadingSearch } = props;

  const [searching, setSearching] = useState(false);

  const [tabState, setTabState] = useState<TabState>({ currentTab: tabs[0].value });

  const isSearchable =
    searchableTabs === 'all' ? true : searchableTabs?.includes(tabState.currentTab);

  const contentTab = tabs.find((tab) => tab.value === tabState.currentTab)?.content;

  return (
    <React.Fragment>
      <XStack
        alignContent="center"
        alignItems="center"
        className="cd-w-full"
        justifyContent="space-between"
      >
        {!searching && (
          <ToggleGroup
            disableDeactivation
            orientation="horizontal"
            paddingHorizontal="$2"
            size="$2"
            type="single"
            value={tabState.currentTab}
            onValueChange={(value) => {
              setTabState({ ...tabState, currentTab: value });
            }}
          >
            {tabs.map((tab, index) => (
              <ToggleGroup.Item
                flexGrow={1}
                height="$3.5"
                key={index}
                value={tab.value}
                onPress={() => setTabState({ ...tabState, currentTab: tab.value })}
              >
                <SizableText>{tab.title}</SizableText>
              </ToggleGroup.Item>
            ))}
          </ToggleGroup>
        )}

        {isSearchable && searching && (
          <View className="cd-grow">
            <InputText
              placeholder="Search"
              value={query}
              onChange={(value) => props.onQueryChange?.(value)}
            />
          </View>
        )}

        {isSearchable && !loadingSearch && (
          <ActionIcon
            onlyIcon
            classes="cd-my-[-4]"
            icon={
              searching ? <X color="$gray11" size={18} /> : <Search color="$gray11" size={18} />
            }
            variant="icon"
            onPress={() => setSearching((prev) => !prev)}
          />
        )}

        {isSearchable && loadingSearch && <Loader color="$gray10" size="small" />}
      </XStack>

      {contentTab || <Text>Tab content not found</Text>}
    </React.Fragment>
  );
};

export default TabsGroup;
