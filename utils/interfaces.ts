export interface Monitor {
    id: number,
    name: string,
    type: string,
    count: number,
    change: number | null,
    data: number[],
}

export interface Stats {
    id: number,
    name: string,
    count: number,
    change: number | null,
    tooltip: string,
}

export interface Events {
    id: number,
    name: string,
    count: number,
    change: number | null,
    status: number,
}

export interface Metrics {
    id: number,
    event: string,
    count: number,
    sum: number,
    duration: string,
}

export interface Time {
    updated: number,
}