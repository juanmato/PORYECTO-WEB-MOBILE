/**
 * Layout constants for consistent spacing and sizing throughout the app
 */

export const SPACING = {
  /** 4px - Extra small spacing */
  xs: 4,
  /** 8px - Small spacing */
  sm: 8,
  /** 12px - Medium-small spacing */
  md: 12,
  /** 16px - Medium spacing (most common) */
  base: 16,
  /** 20px - Medium-large spacing */
  lg: 20,
  /** 24px - Large spacing */
  xl: 24,
  /** 32px - Extra large spacing */
  xxl: 32,
  /** 48px - Extra extra large spacing */
  xxxl: 48,
} as const;

export const BORDER_RADIUS = {
  /** 4px - Small radius for buttons/inputs */
  sm: 4,
  /** 8px - Medium radius */
  md: 8,
  /** 12px - Large radius (badges, cards) */
  lg: 12,
  /** 16px - Extra large radius */
  xl: 16,
  /** 20px - Extra extra large radius */
  xxl: 20,
  /** 9999px - Full rounded (pills) */
  full: 9999,
} as const;

export const FONT_SIZE = {
  /** 10px - Extra small text */
  xs: 10,
  /** 12px - Small text (captions, labels) */
  sm: 12,
  /** 14px - Base text size */
  base: 14,
  /** 16px - Medium text */
  md: 16,
  /** 18px - Large text */
  lg: 18,
  /** 20px - Extra large text */
  xl: 20,
  /** 24px - Extra extra large text (headings) */
  xxl: 24,
  /** 32px - Huge text */
  xxxl: 32,
} as const;

export const FONT_WEIGHT = {
  /** 400 - Normal weight */
  normal: '400' as const,
  /** 500 - Medium weight */
  medium: '500' as const,
  /** 600 - Semi-bold */
  semibold: '600' as const,
  /** 700 - Bold */
  bold: '700' as const,
} as const;

export const SHADOW = {
  /** Light shadow for subtle elevation */
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  /** Medium shadow for cards */
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  /** Strong shadow for modals/overlays */
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const DIMENSIONS = {
  /** Standard input/button height */
  inputHeight: 48,
  /** Small button height */
  buttonSmallHeight: 36,
  /** Standard button height */
  buttonHeight: 48,
  /** Large button height */
  buttonLargeHeight: 56,
  /** Bottom tab bar height */
  tabBarHeight: 60,
  /** Header height */
  headerHeight: 56,
} as const;

export const BUSINESS = {
  /** Minimum stock level to show warning */
  lowStockThreshold: 50,
  /** Maximum rating value */
  maxRating: 5,
  /** Minimum rating value */
  minRating: 1,
  /** Default rating */
  defaultRating: 5,
} as const;
