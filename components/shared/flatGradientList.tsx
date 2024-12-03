/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatePresence, View } from 'tamagui';

import { getScrollGradient } from '@utils/platform';
import { useColorScheme } from 'nativewind';

type VirtualizedListProps = {
  color?: number;
  items: any[];
  isRefetching: boolean;
  refetch?: () => void;
  renderItem: (props: { item: any; index: number }) => React.ReactElement;
};

type GradientType = {
  top: boolean;
  bottom: boolean;
};

const FlatGradientList = React.forwardRef<any, VirtualizedListProps>(
  (props: VirtualizedListProps, ref) => {
    const { items, isRefetching, refetch, renderItem, color = 255 } = props;

    const { colorScheme } = useColorScheme();

    const [refreshColor] = React.useState(colorScheme === 'light' ? '#339AF0' : '#339AF0');

    const [gradientType, setGradientType] = React.useState<GradientType>({
      top: false,
      bottom: false,
    });

    return (
      <React.Fragment>
        <View className="cd-h-full cd-relative" ref={ref}>
          <FlatList
            className="cd-h-full"
            data={items}
            keyExtractor={(item) => item.id || item.key}
            refreshControl={
              <RefreshControl
                colors={[refreshColor]}
                refreshing={isRefetching}
                tintColor={refreshColor}
                onRefresh={refetch}
              />
            }
            renderItem={renderItem}
            onScroll={(e) => setGradientType(getScrollGradient(e.nativeEvent.contentOffset.y))}
          />

          <AnimatePresence>
            {gradientType.top && (
              <LinearGradient
                className="cd-absolute"
                colors={getColor(colorScheme === 'light' ? color : 0, 'top')}
                style={StyleGradient.top}
              />
            )}
          </AnimatePresence>
        </View>
        <View className="cd-absolute cd-bottom-0 cd-left-0 cd-right-0">
          <LinearGradient
            className="cd-absolute"
            colors={getColor(colorScheme === 'light' ? color : 0, 'bottom')}
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
  },
);

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

export default FlatGradientList;
