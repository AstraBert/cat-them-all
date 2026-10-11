import { Image, ImageSource } from 'expo-image';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface BlinkingCatProps {
  image: ImageSource;
  size: number;
  visibleMs: number;
}

/**
 * A cat that appears briefly on screen — tap fast to catch it!
 */
export function BlinkingCat({ image, size, visibleMs }: BlinkingCatProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.4);

  useEffect(() => {
    // Fade in quickly and scale up with a bounce
    opacity.value = withTiming(1, { duration: 100, easing: Easing.linear });
    scale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.back(2)) });
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={image}
        style={{ width: size, height: size, borderRadius: size / 5 }}
        contentFit="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
