/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatePresence, View } from 'tamagui';

import { getScrollGradient } from '@utils/platform';
import { useColorScheme } from 'nativewind';

type VirtualizedListProps = {
  color?: number;
  fromPopOver?: boolean;
  children: React.ReactElement[] | React.ReactElement;
};

type GradientType = {
  top: boolean;
  bottom: boolean;
};

const GradientList = React.forwardRef<any, VirtualizedListProps>(
  (props: VirtualizedListProps, ref) => {
    const { children, fromPopOver, color = 255 } = props;

    const { colorScheme } = useColorScheme();

    const [gradientType, setGradientType] = React.useState<GradientType>({
      top: false,
      bottom: false,
    });

    return (
      <React.Fragment>
        <View className="cd-h-full cd-relative">
          <ScrollView
            ref={ref}
            showsVerticalScrollIndicator={false}
            onScroll={(e) => setGradientType(getScrollGradient(e.nativeEvent.contentOffset.y))}
          >
            {children}
          </ScrollView>

          <AnimatePresence>
            {gradientType.top && (
              <LinearGradient
                className="cd-absolute"
                colors={getColor(colorScheme === 'light' ? color : fromPopOver ? 20 : 0, 'top')}
                style={StyleGradient.top}
              />
            )}
          </AnimatePresence>
        </View>
        <View className="cd-absolute cd-bottom-0 cd-left-0 cd-right-0">
          <LinearGradient
            className="cd-absolute"
            colors={getColor(colorScheme === 'light' ? color : fromPopOver ? 20 : 0, 'bottom')}
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

export default GradientList;
