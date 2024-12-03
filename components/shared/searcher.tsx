/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { XStack } from 'tamagui';
import { Search, X } from '@tamagui/lucide-icons';

import Loader from './loader';
import InputText from './inputText';
import ActionIcon from './actionIcon';
import { scrollToTarget } from '@utils/scroll';
import { View } from 'react-native';

type SearcherProps = {
  query: string;
  loading?: boolean;
  placeholder?: string;
  onQueryChange: (query: string) => void;
};

const Searcher = React.forwardRef<any, SearcherProps>((props: SearcherProps, ref) => {
  const { query, loading, placeholder, onQueryChange } = props;

  const refView = React.useRef(null);

  return (
    <XStack
      alignContent="center"
      alignItems="center"
      className="cd-w-full"
      justifyContent="space-between"
    >
      <View className="cd-grow" ref={refView}>
        <InputText
          placeholder={placeholder}
          ref={refView}
          value={query}
          onChange={onQueryChange}
          onPress={() => {
            scrollToTarget(refView, ref as any);
          }}
        />
      </View>
      <View>
        {!loading && Boolean(query.length) && (
          <ActionIcon
            onlyIcon
            classes="cd-my-[4] cd-ml-[8]"
            icon={<X color="$gray11" size={18} />}
            variant="icon"
            onPress={() => {
              props.onQueryChange?.('');
            }}
          />
        )}
        {!query.length && (
          <ActionIcon
            onlyIcon
            classes="cd-my-[4] cd-ml-[8]"
            icon={<Search color="$gray11" size={18} />}
            variant="icon"
            onPress={() => {
              props.onQueryChange?.(query);
            }}
          />
        )}
        {Boolean(query.length) && loading && (
          <View className="cd-ml-[14] cd-my-[11]">
            <Loader color="$gray10" size="small" />
          </View>
        )}
      </View>
    </XStack>
  );
});

export default Searcher;
