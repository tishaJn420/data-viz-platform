import type { KPI } from '../types';

export const KPI_DATA: KPI[] = [
    {
        title: 'Infrastructure Units',
        value: '€421.07',
        desc: 'This value refers to the infrastructure units for this metric.',
    },
    {
        title: 'Charging Growth',
        value: '33.07',
        desc: 'This value refers to the charging growth for this metric.',
    },
    {
        title: 'Localization change',
        value: '21.9%',
        desc: 'This value refers to the localization change for this metric.',
    },
    {
        title: 'Fleet growth',
        value: '7.03%',
        desc: 'This value refers to the fleet growth for this metric.',
    },
];

export const KPI_DATA_MOCK = {
    FINANCIAL: [
        {
            title: 'Revenue',
            value: '€125.4K',
            desc: 'Total revenue generated this month',
        },
        {
            title: 'Profit Margin',
            value: '23.5%',
            desc: 'Net profit margin percentage',
        },
    ],
    OPERATIONAL: [
        {
            title: 'Efficiency',
            value: '94.2%',
            desc: 'Overall system efficiency rating',
        },
        {
            title: 'Uptime',
            value: '99.8%',
            desc: 'System availability percentage',
        },
    ],
    CUSTOMER: [
        {
            title: 'Satisfaction',
            value: '4.8/5',
            desc: 'Customer satisfaction score',
        },
        {
            title: 'Retention',
            value: '87.3%',
            desc: 'Customer retention rate',
        },
    ],
}; 