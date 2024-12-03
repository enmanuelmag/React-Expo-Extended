/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { AnimatePresence, View } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, VirtualizedList as NativeVirtualizedList } from 'react-native';

import { getScrollGradient } from '@utils/platform';
import { $ } from '@utils/styles';
import { useColorScheme } from 'nativewind';

type VirtualizedListProps = {
  items: any[];
  classes?: string;
  bottomGradientClass?: string;
  initialNumToRender?: number;
  renderItem: (props: { item: any; index: number }) => React.ReactElement;
};

type GradientType = {
  top: boolean;
  bottom: boolean;
};

const VirtualizedList = (props: VirtualizedListProps) => {
  const { items, initialNumToRender = 3, renderItem, classes } = props;

  const { colorScheme } = useColorScheme();

  const [gradientType, setGradientType] = React.useState<GradientType>({
    top: false,
    bottom: false,
  });

  return (
    <React.Fragment>
      <View className={$('cd-relative', classes)}>
        <NativeVirtualizedList
          className="cd-w-full"
          data={items}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          initialNumToRender={initialNumToRender}
          keyExtractor={(_, idx) => `schedule-${idx}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => setGradientType(getScrollGradient(e.nativeEvent.contentOffset.y))}
        />

        <AnimatePresence>
          {gradientType.top && (
            <LinearGradient
              className="cd-absolute"
              colors={getColor(colorScheme === 'light' ? 255 : 0, 'top')}
              style={StyleGradient.top}
            />
          )}
        </AnimatePresence>
      </View>
      <View
        className={$('cd-absolute cd-bottom-0 cd-left-0 cd-right-0', props.bottomGradientClass)}
      >
        <LinearGradient
          className="cd-absolute"
          colors={getColor(colorScheme === 'light' ? 255 : 0, 'bottom')}
          style={StyleGradient.bottom}
        />
      </View>
    </React.Fragment>
  );

  function getColor(value: number, dir: 'top' | 'bottom') {
    if (dir === 'top') {
      return [
        `rgba(${value}, ${value}, ${value}, ${value}.85)`,
        `rgba(${value}, ${value}, ${value}, 0)`,
      ];
    } else {
      return [
        `rgba(${value}, ${value}, ${value}, 0)`,
        `rgba(${value}, ${value}, ${value}, ${value}.85)`,
      ];
    }
  }
};

const StyleGradient = StyleSheet.create({
  top: {
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    height: 35,
  },
  bottom: {
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    height: 35,
  },
});

export default VirtualizedList;
