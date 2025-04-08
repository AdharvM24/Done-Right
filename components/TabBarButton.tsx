import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { icon } from "@/constants/icon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scale.value, [0, 1], [1, 0]),
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scale.value, [0, 1], [1, 1.2]),
        },
      ],
      top: interpolate(scale.value, [0, 1], [0, 9]),
    };
  });
  console.log(
    "Tab:",
    routeName,
    "Focused:",
    isFocused,
    "Color:",
    isFocused ? "#fff" : "#222"
  );

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]?.({ color: isFocused ? "#fff" : "#222" })}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color: isFocused ? "#673ab7" : "#222",
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
