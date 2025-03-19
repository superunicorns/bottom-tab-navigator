import { ReactNode, useEffect } from 'react';
import { StyleSheet, GestureResponderEvent, Pressable } from 'react-native';
import { Text } from '@react-navigation/elements';
import { icon } from '@/constants/Icon';
import { useSharedValue, withSpring } from 'react-native-reanimated';

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

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      {icon[routeName]({
        color: isFocused ? "#673AB7" :  "#687076"
      })}
      <Text style={{ color: isFocused ? "#673AB7" :  "#687076" }}>
        {label}
      </Text>
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