import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import TabBarButton from "./TabBarButton";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const tabPositionX = useSharedValue(0); // ✅ sharedValue to animate

  const buttonWidth = dimensions.width / state.routes.length;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  // ✅ Set initial tab position
  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index);
  }, [state.index, buttonWidth]);

  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      {/* ✅ Animated moving background */}
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: "#723FEB",
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 20,
          },
          animatedStyle,
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            damping: 15,
            stiffness: 120,
          });

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#fff" : "#222"}
            label={typeof label === "string" ? label : ""}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 35,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
