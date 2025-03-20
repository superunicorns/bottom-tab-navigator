import { ReactNode, useEffect } from 'react';
import { StyleSheet, GestureResponderEvent, Pressable, View } from 'react-native';
import { Text } from '@react-navigation/elements';
import { icon } from '@/constants/Icon';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = ({ onPress, onLongPress, isFocused, routeName, color, label}:
  { onPress: ((event: GestureResponderEvent) => void) | null | undefined; 
    onLongPress: ((event: GestureResponderEvent) => void) | null | undefined; 
    isFocused: boolean; 
    routeName: string; 
    color: string; 
    label: ReactNode; }
) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused, { duration: 350 });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 9])

    return {
      transform: [{
        scale: scaleValue
      }],
      top
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity
    }
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
      {icon[routeName]({
        color: isFocused ? "#673AB7" :  "#687076"
      })}
      </Animated.View>
      <Animated.Text style={[{ color: isFocused ? "#673AB7" :  "#687076", fontSize: 12 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
}

export default TabBarButton;


const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5
  }
});