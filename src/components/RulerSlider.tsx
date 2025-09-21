// src/components/RulerSlider.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";

type RulerSliderProps = {
  min: number;
  max: number;
  step?: number;
  initialValue?: number;
  unit?: string;
  stepWidth?: number; // px per step
  longStepInterval?: number; // show label every N steps
  onValueChange?: (value: number) => void;
  onValueChangeEnd?: (value: number) => void;
  shortStepHeight?: number;
  longStepHeight?: number;
  shortStepColor?: string;
  longStepColor?: string;
};

export default function RulerSlider({
  min,
  max,
  step = 1,
  initialValue,
  unit = "kg",
  stepWidth = 12,
  longStepInterval = 10,
  onValueChange,
  onValueChangeEnd,
  shortStepHeight = 12,
  longStepHeight = 24,
  shortStepColor = "#d9d9d9",
  longStepColor = "#999",
}: RulerSliderProps) {
  const totalSteps = Math.round((max - min) / step);
  const values = Array.from({ length: totalSteps + 1 }, (_, i) =>
    Math.round((min + i * step) * 100) / 100
  ); // array of values

  const [containerWidth, setContainerWidth] = useState<number>(
    Dimensions.get("window").width
  );
  const scrollRef = useRef<ScrollView | null>(null);
  const [currentValue, setCurrentValue] = useState<number>(
    initialValue ?? values[0]
  );
  const stepWidthRef = useRef(stepWidth);

  // initial index
  const initialIndex = Math.max(
    0,
    Math.min(values.length - 1, Math.round(( (initialValue ?? min) - min) / step))
  );

  useEffect(() => {
    // scroll to initial position after layout (centered)
    const x = initialIndex * stepWidthRef.current;
    // scroll after a tiny delay so layout measured
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x, animated: false });
      setCurrentValue(values[initialIndex]);
    }, 50);
  }, [containerWidth]); // triggers after layout

  function handleLayout(e: LayoutChangeEvent) {
    setContainerWidth(e.nativeEvent.layout.width);
  }

  function clampIndex(i: number) {
    return Math.max(0, Math.min(values.length - 1, i));
  }

  function indexFromOffset(x: number) {
    // index = round(x / stepWidth)
    const idx = Math.round(x / stepWidthRef.current);
    return clampIndex(idx);
  }

  function valueFromIndex(idx: number) {
    return values[clampIndex(idx)];
  }

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    const idx = indexFromOffset(x);
    const val = valueFromIndex(idx);
    if (val !== currentValue) {
      setCurrentValue(val);
      onValueChange?.(val);
    }
  }

  function onMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    const idx = indexFromOffset(x);
    const snappedX = idx * stepWidthRef.current;
    // snap to nearest step
    scrollRef.current?.scrollTo({ x: snappedX, animated: true });
    const val = valueFromIndex(idx);
    setCurrentValue(val);
    onValueChangeEnd?.(val);
  }

  // padding so first and last ticks can align center
  const horizontalPadding = containerWidth / 2 - stepWidthRef.current / 2;

  return (
    <View style={styles.wrapper} onLayout={handleLayout}>
      {/* top label */}
      <View style={styles.topLabel}>
        <Text style={styles.topValueText}>{currentValue}</Text>
        <Text style={styles.topUnitText}>{unit}</Text>
      </View>

      {/* scrollable ticks */}
      <View style={styles.scrollArea}>
        <ScrollView
          ref={(r) => { scrollRef.current = r; }}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumEnd}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            {values.map((val, i) => {
              const isMajor = i % longStepInterval === 0;
              return (
                <View
                  key={`tick-${i}`}
                  style={{
                    width: stepWidthRef.current,
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      width: 2,
                      height: isMajor ? longStepHeight : shortStepHeight,
                      backgroundColor: isMajor ? longStepColor : shortStepColor,
                      borderRadius: 1,
                    }}
                  />
                  {isMajor && (
                    <Text style={styles.tickLabel}>{val}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* center highlight box (optional) */}
        <View
          pointerEvents="none"
          style={[
            styles.centerHighlight,
            { left: containerWidth / 2 - 30, width: 60 }, // center a 60px highlight
          ]}
        />
        {/* center indicator line */}
        <View
          pointerEvents="none"
          style={[
            styles.centerIndicator,
            { left: containerWidth / 2 - 1 }, // center vertical line
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  topLabel: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  topValueText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333", // color black
    marginRight: 6,
  },
  topUnitText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  scrollArea: {
    width: "100%",
    height: 120,
    justifyContent: "center",
  },
  centerHighlight: {
    position: "absolute",
    top: 24,
    height: 48,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 6,
  },
  centerIndicator: {
    position: "absolute",
    top: 78,
    height: 40,
    width: 2,
    backgroundColor: "#222",
  },
  tickLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
  },
});
