import type { CategoryButton } from '../types';

export const CATEGORY_1_BUTTONS: CategoryButton[] = [
    { id: 'cat1-1', label: 'Carbon 1' },
    { id: 'cat1-2', label: 'Co2 Distribution' },
    { id: 'cat1-3', label: 'Fleet sizing' },
];

export const CATEGORY_2_BUTTONS: CategoryButton[] = [
    { id: 'cat2-1', label: 'Parking Rate' },
    { id: 'cat2-2', label: 'Border Rate' },
    { id: 'cat2-3', label: 'Request rate' },
    { id: 'cat2-4', label: 'Variable 1' },
    { id: 'cat2-5', label: 'Variable 2' },
    { id: 'cat2-6', label: 'Variable 3' },
];

export const CATEGORY_3_BUTTONS: CategoryButton[] = [
    { id: 'cat3-1', label: 'Variable 4' },
    { id: 'cat3-2', label: 'Variable 5' },
    { id: 'cat3-3', label: 'Variable 6' },
];

export const CATEGORY_DATA = {
    ENVIRONMENTAL: [
        { id: 'env-1', label: 'Carbon Footprint' },
        { id: 'env-2', label: 'Energy Efficiency' },
        { id: 'env-3', label: 'Renewable Sources' },
    ],
    OPERATIONAL: [
        { id: 'op-1', label: 'Capacity Utilization' },
        { id: 'op-2', label: 'Response Time' },
        { id: 'op-3', label: 'Availability' },
    ],
    FINANCIAL: [
        { id: 'fin-1', label: 'Cost per Unit' },
        { id: 'fin-2', label: 'Revenue Growth' },
        { id: 'fin-3', label: 'Profit Margin' },
    ],
}; 