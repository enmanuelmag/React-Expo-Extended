/* eslint-disable @typescript-eslint/no-explicit-any */
import { findNodeHandle, ScrollView } from 'react-native';

export const scrollToTarget = (
  inputRef?: React.RefObject<any>,
  refScroll?: React.RefObject<ScrollView>,
) => {
  if (!inputRef || !refScroll?.current) {
    return;
  }

  const targetViewNodeHandle = findNodeHandle(inputRef.current as any);

  if (!targetViewNodeHandle) return;

  inputRef.current.measureLayout(
    refScroll.current.getInnerViewNode(),
    (_: number, y: number) => {
      if (!refScroll.current) return;

      refScroll.current.scrollTo({
        y: y - 25,
        animated: true,
      });
    },
    () => null,
  );
};
