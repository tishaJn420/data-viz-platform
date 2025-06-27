// Chart and Data Types
export interface ChartDataPoint {
    month: string;
    value: number;
}

export interface KPI {
    title: string;
    value: string;
    desc: string;
}

export interface CategoryButton {
    id: string;
    label: string;
}

export interface DataPoint {
    time: string;
    variable: string;
    value: number;
    [key: string]: string | number;
}

// UI Types
export interface TooltipProps {
    active?: boolean;
    payload?: any[];
    coordinate?: { x: number; y: number };
}

// Navigation Types
export interface TabItem {
    id: string;
    label: string;
    icon?: string;
}

// Chart Configuration Types
export interface ChartConfig {
    width: number;
    height: number;
    margin: {
        top: number;
        right: number;
        left: number;
        bottom: number;
    };
    colors: {
        primary: string;
        secondary: string;
        background: string;
        grid: string;
    };
}

// Responsive Breakpoints
export interface Breakpoints {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
} 