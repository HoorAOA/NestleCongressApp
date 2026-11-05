import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  Rect,
} from 'react-native-svg';

import { Colors } from '../../theme/colors';


const DOTS = Array.from({ length: 20 }, (_, index) => ({
  top: 50 + Math.floor(index / 4) * 12,
  left: 5 + (index % 4) * 12,
  size: 3,
}));

const MainBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">

      {/* Main background */}
      <LinearGradient
        colors={[Colors.backgroundLight, Colors.backgroundMid, Colors.backgroundDeep]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Light glow at the top */}
      <Svg
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
      >
        <Defs>
          <RadialGradient
            id="topGlow"
            cx="90%"
            cy="2%"
            rx="50%"
            ry="30%"
            gradientUnits="objectBoundingBox"
          >
            <Stop offset="0%" stopColor={Colors.blueGlow} stopOpacity="0.35" />
            <Stop offset="60%" stopColor={Colors.blueGlow} stopOpacity="0.12" />
            <Stop offset="100%" stopColor={Colors.blueGlow} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        <Rect
          width="100%"
          height="100%"
          fill="url(#topGlow)"
        />
      </Svg>

      {/* Decorative circles on the right */}
      <View style={styles.circleOuter} />
      <View style={styles.circleInner} />

      {/* Decorative dots on the left */}
      {DOTS.map((dot, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default MainBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  topGlow: {
    position: 'absolute',
    top: -180,
    left: 0,
    right: 0,
    height: 420,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleOuter: {
    position: 'absolute',
    top: 70,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'rgba(120, 170, 255, 0.09)',
    backgroundColor: 'rgba(70, 120, 220, 0.035)',
  },

  circleInner: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(120, 170, 255, 0.09)',
    backgroundColor: 'rgba(70, 120, 220, 0.025)',
  },

  dot: {
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: 'rgba(115, 171, 255, 0.16)',
  },

  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  nestleText: {
    color: Colors.white,
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: -10,
  },

  congressText: {
    color: Colors.goldLight,
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: -2,
  },

  bottomLine: {
    width: 48,
    height: 2,
    borderRadius: 3,
    backgroundColor: Colors.goldLight,
    marginTop: 22,
  },
});
