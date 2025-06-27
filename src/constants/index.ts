import type { TabItem, Breakpoints } from '../types';

// Navigation Constants
export const NAVIGATION_TABS: TabItem[] = [
    { id: 'charging-stations', label: 'Charging Stations' },
    { id: 'fleet-sizing', label: 'Fleet Sizing' },
    { id: 'parking', label: 'Parking' },
];

// Responsive Breakpoints
export const BREAKPOINTS: Breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

// Chart Constants
export const CHART_CONSTANTS = {
    TOOLTIP_HEIGHT: 93,
    TOOLTIP_MARGIN: 12,
    TOOLTIP_WIDTH: 193,
    CHART_HEIGHT: 462,
    CHART_MIN_HEIGHT: 300,
    CHART_MAX_HEIGHT: 462,
    CHART_PADDING_RIGHT: 50,
    CHART_MARGIN: {
        top: 20,
        right: 30,
        left: 0,
        bottom: 30,
    },
    RESPONSIVE_MARGIN: {
        top: 10,
        right: 20,
        left: 0,
        bottom: 20,
    },
    COLORS: {
        PRIMARY: '#D4FF3F',
        SECONDARY: '#C9FF3B',
        BACKGROUND: '#232323',
        GRID: '#333',
        WHITE: '#fff',
        GRAY: '#888',
    },
    AXIS_CONFIG: {
        X_PADDING: { left: 30, right: 10 },
        Y_WIDTH: 60,
        RESPONSIVE_X_PADDING: { left: 20, right: 10 },
        RESPONSIVE_Y_WIDTH: 50,
        FONT_SIZE: 15,
        RESPONSIVE_FONT_SIZE: 12,
    },
    DOT_CONFIG: {
        RADIUS: 6,
        STROKE_WIDTH: 2,
        ACTIVE_RADIUS: 8,
        RESPONSIVE_RADIUS: 4,
        RESPONSIVE_ACTIVE_RADIUS: 6,
    },
    LINE_CONFIG: {
        STROKE_WIDTH: 3,
        RESPONSIVE_STROKE_WIDTH: 2,
    },
    REFERENCE_LINE: {
        STROKE_DASHARRAY: '6 6',
        STROKE_WIDTH: 2,
    },
};

// UI Constants
export const UI_CONSTANTS = {
    SIDEBAR_WIDTH: {
        MOBILE: 256,
        DESKTOP: 80,
    },
    HEADER_HEIGHT: 87,
    MOBILE_HEADER_HEIGHT: 64,
    SLIDE_OVER_WIDTH: {
        MOBILE: '100%',
        SM: '80vw',
        MD: '70vw',
        LG: '60vw',
        XL: '50vw',
    },
    KPI_CARD: {
        WIDTH: 241,
        HEIGHT: 221,
        MIN_HEIGHT: 180,
        GRID_COLUMNS: {
            MOBILE: 1,
            SM: 2,
        },
        GRID_GAP: {
            MOBILE: 16,
            LG: 20,
        },
    },
    PADDING: {
        MOBILE: 12,
        SM: 16,
        LG: 32,
    },
    GAP: {
        MOBILE: 16,
        LG: 24,
    },
    FONT_SIZES: {
        MOBILE: {
            SMALL: '12px',
            BASE: '14px',
            LARGE: '16px',
            XL: '18px',
            '2XL': '20px',
            '3XL': '24px',
        },
        DESKTOP: {
            SMALL: '14px',
            BASE: '16px',
            LARGE: '18px',
            XL: '24px',
            '2XL': '32px',
            '3XL': '36px',
        },
    },
};

// Animation Constants
export const ANIMATION_CONSTANTS = {
    DURATION: {
        FAST: 150,
        NORMAL: 200,
        SLOW: 300,
    },
    EASING: {
        EASE_IN_OUT: 'ease-in-out',
        EASE_OUT: 'ease-out',
        EASE_IN: 'ease-in',
    },
};

// Color Constants
export const COLORS = {
    PRIMARY: {
        GREEN: '#C9FF3B',
        LIME: '#D4FF3F',
        LIGHT_GREEN: '#DCFF7FFD',
    },
    BACKGROUND: {
        DARK: '#161618',
        DARKER: '#000000',
        CARD: '#222324',
        SLIDE_OVER: '#18181A',
    },
    BORDER: {
        GRAY: '#525252',
        LIME: '#C8E972',
    },
    TEXT: {
        WHITE: '#FFFFFF',
        GRAY: '#D5D5D5',
        LIGHT_GRAY: '#BBBBBB',
        DARK_GRAY: '#888888',
    },
    STATUS: {
        SUCCESS: '#B6FF6C',
        WARNING: '#FFB74D',
        ERROR: '#F44336',
    },
}; 