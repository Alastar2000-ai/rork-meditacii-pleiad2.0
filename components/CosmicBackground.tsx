import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat,
  Easing,
  withDelay
} from 'react-native-reanimated';
import { Platform } from 'react-native';
import colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

// Generate random stars
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 1;
    stars.push({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size,
      opacity: Math.random() * 0.7 + 0.3,
      animationDelay: Math.random() * 3000,
    });
  }
  return stars;
};

const stars = generateStars(150);

// Create a few constellations (groups of connected stars)
const constellations = [
  // Pleiades-inspired constellation (since the app is named after it)
  [
    { x: width * 0.2, y: height * 0.2 },
    { x: width * 0.25, y: height * 0.18 },
    { x: width * 0.22, y: height * 0.25 },
    { x: width * 0.18, y: height * 0.22 },
    { x: width * 0.15, y: height * 0.15 },
    { x: width * 0.28, y: height * 0.15 },
    { x: width * 0.3, y: height * 0.25 },
  ],
  // Another constellation
  [
    { x: width * 0.7, y: height * 0.7 },
    { x: width * 0.75, y: height * 0.75 },
    { x: width * 0.8, y: height * 0.7 },
    { x: width * 0.77, y: height * 0.65 },
  ],
  // A third constellation
  [
    { x: width * 0.5, y: height * 0.4 },
    { x: width * 0.55, y: height * 0.45 },
    { x: width * 0.6, y: height * 0.4 },
    { x: width * 0.55, y: height * 0.35 },
  ],
];

const Star = ({ x, y, size, opacity, animationDelay }: { 
  x: number, 
  y: number, 
  size: number, 
  opacity: number,
  animationDelay: number
}) => {
  const starOpacity = useSharedValue(opacity);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      starOpacity.value = withDelay(
        animationDelay,
        withRepeat(
          withTiming(opacity * 0.5, { duration: 1500 + Math.random() * 1000, easing: Easing.inOut(Easing.ease) }),
          -1,
          true
        )
      );
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    if (Platform.OS === 'web') {
      return { opacity };
    }
    return {
      opacity: starOpacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.star,
        {
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        animatedStyle,
      ]}
    />
  );
};

const ConstellationLine = ({ start, end }: { start: { x: number, y: number }, end: { x: number, y: number } }) => {
  return (
    <View
      style={[
        styles.constellationLine,
        {
          left: start.x,
          top: start.y,
          width: Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
          transform: [
            { 
              rotate: `${Math.atan2(end.y - start.y, end.x - start.x)}rad` 
            }
          ],
        },
      ]}
    />
  );
};

export default function CosmicBackground() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, '#2D1A42', '#3D2A52']}
        style={styles.gradient}
      />
      
      {/* Render stars */}
      {stars.map((star) => (
        <Star
          key={star.id}
          x={star.x}
          y={star.y}
          size={star.size}
          opacity={star.opacity}
          animationDelay={star.animationDelay}
        />
      ))}
      
      {/* Render constellation lines */}
      {Platform.OS !== 'web' && constellations.map((constellation, constellationIndex) => (
        <React.Fragment key={`constellation-${constellationIndex}`}>
          {constellation.map((point, pointIndex) => {
            if (pointIndex < constellation.length - 1) {
              return (
                <ConstellationLine
                  key={`line-${constellationIndex}-${pointIndex}`}
                  start={point}
                  end={constellation[pointIndex + 1]}
                />
              );
            }
            return null;
          })}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    backgroundColor: colors.starColor,
  },
  constellationLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transformOrigin: 'left',
  },
});