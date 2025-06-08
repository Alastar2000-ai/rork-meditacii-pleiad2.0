import colors from '@/constants/colors';

export const textStyles = {
  // 3D Text Effect Styles
  text3D: {
    color: colors.text,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  
  text3DLarge: {
    color: colors.text,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
  },
  
  text3DSubtle: {
    color: colors.text,
    textShadowColor: colors.textShadowLight,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  text3DStrong: {
    color: colors.text,
    textShadowColor: colors.textShadowStrong,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 8,
  },
  
  // Secondary text with 3D effect
  textSecondary3D: {
    color: colors.textSecondary,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  
  // Outlined text effect
  textOutlined: {
    color: colors.text,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 1,
  },
};