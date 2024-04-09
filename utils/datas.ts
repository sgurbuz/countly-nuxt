import type { Stats, Events, Monitor, Metrics, Time } from "./interfaces";

export const StatsData: Stats[] = [
    {
        id: 123,
        name: 'Total Event Count',
        count: 349260,
        change: 30.3,
        tooltip: 'Tooltip for Total Event Count',
    },
    {
        id: 456,
        name: 'Events Per User',
        count: 247.9,
        change: -22.2,
        tooltip: 'Tooltip for Event per user',
    },
    {
        id: 789,
        name: 'Events Per Session',
        count: 32.5,
        change: 0,
        tooltip: 'Tooltip for Events Per Session',
    },
    {
        id: 102,
        name: 'Another Event Stat',
        count: 9999999,
        change: 99.9,
        tooltip: 'Tooltip for Another Event Stat',
    }
];

export const TopEvData: Events[] = [
    {
        id:123,
        name: 'period-change',
        count: 329272,
        change: 30.9,
        status: 94.3,
    },
    {
        id:345,
        name: 'PING',
        count: 17902,
        change: 20.2,
        status: 5.1,
    },
    {
        id:567,
        name: 'cohort-create',
        count: 1015,
        change: 10,
        status: 0.3,
    },
    {
        id:789,
        name: 'formula-execute',
        count: 585,
        change: 10,
        status: 0.15,
    },
    {
        id:901,
        name: 'popular-execute',
        count: 182,
        change: 10,
        status: 0.03,
    },
]; 

export const MonitorData: Monitor[] = [
    {
        id:223,
        name: 'cohort-create',
        count: 2711,
        change: -6851.3,
        type: 'count',
        data: [5741, 6896, 3084, 5478, 1775, 5359, 1461, 335, 5223, 3904, 668, 1182, 4164, 2486, 1438, 2941, 5546, 7242, 4416, 3641, 1790, 3964, 5607, 1350, 8390, 5974, 4900, 104, 5744, 2711]
    },
    {
        id:356,
        name: 'drill-action',
        count: 274,
        change: null,
        type: 'count',
        data: [119, 376, 613, 315, 616, 1013, 247, 1037, 954, 106, 85, 80, 588, 560, 1008, 544, 561, 775, 678, 857, 1044, 486, 988, 349, 622, 117, 612, 264, 710, 476]
    },
    {
        id:567,
        name: 'formula-action',
        count: 121,
        change: null,
        type: 'count',
        data: [669, 133, 91, 10, 681, 60, 165, 244, 376, 614, 115, 304, 674, 390, 578, 190, 308, 324, 381, 675, 601, 135, 197, 97, 564, 613, 683, 375, 579, 191]
    }
];

export const MetricsData: Metrics[] = [
    {
        id:123,
        event: 'period-change',
        count: 329272,
        sum: 0,
        duration: '-',
    },
    {
        id:345,
        event: 'PING',
        count: 17902,
        sum: 0,
        duration: '-',
    },
    {
        id:567,
        event: 'cohort-create',
        count: 1015,
        sum: 0,
        duration: '-',
    },
    {
        id:789,
        event: 'formula-execute',
        count: 585,
        sum: 0,
        duration: '-',
    },
    {
        id:901,
        event: 'popular-execute',
        count: 182,
        sum: 0,
        duration: '-',
    },
    {
        id:234,
        event: 'move-to-report-manager',
        count: 148,
        sum: 0,
        duration: '-',
    },
    {
        id:456,
        event: 'drill-action',
        count: 88,
        sum: 0,
        duration: '-',
    },
    {
        id:678,
        event: 'INSTALL',
        count: 49,
        sum: 0,
        duration: '-',
    },
    {
        id:890,
        event: 'funnel-create',
        count: 29,
        sum: 0,
        duration: '-',
    },
    {
        id:101,
        event: 'attribution-campaign-create',
        count: 29,
        sum: 0,
        duration: '-',
    }
];

const getTimer = () => {
    const date = Date.now();
    const randomNumber = Math.floor(Math.random() * (99999 - 1000) + 1000);
    return Math.floor(date - randomNumber);
}

export const TimeData = {
    updated: getTimer(),
}