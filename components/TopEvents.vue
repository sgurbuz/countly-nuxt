<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";

const layoutStore = useLayoutStore();

const topEvents = await $fetch('/api/top-events', { headers: { 'Api-Data-Count': layoutStore.layout === 'stats' ? '5' :  layoutStore.layout === 'monitor' ? '2' : layoutStore.layout === 'metrics' ? '1' : '3' } });

onMounted(() => {
    chartData.value = setChartData(0);
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref(null);

const setChartData = (index) => {
    
    const totalStatus = topEvents[index].status;
    const others = Math.ceil(100 - totalStatus);

    return {
        labels: [],
        datasets: [
            {
                data: [totalStatus, others],
                backgroundColor: ['#00B2CA', '#F4F4F4'],
                hoverBackgroundColor: ['#00B2CA', '#F4F4F4']
            }
        ],
        cutout: '80%',
    };
};

const setChartOptions = () => {
    return {
        cutout: '80%',
        plugins: {
            legend: {
                labels: {
                    display:false,
                }
            }
        }
    };
};

const getChartData = (index) => {
    chartData.value = setChartData(index);
    return chartData.value;
}
</script>

<template>
    <div v-if="!layoutStore.loading" :class="['card top-events surface-card border-round-lg p-3 shadow-1', layoutStore.layout === 'stats' ? 'active': 'default', layoutStore.layout === 'monitor' ? 'w-4 flex-grow-1 slim': layoutStore.layout === 'metrics' ? 'w-3 flex-grow-1 slim metrics-view' : 'w-full']">
        <div class="card-header">Top Events by Count <i class="pi pi-info-circle"></i></div>
        <div class="data-list flex align-items-center justify-content-between gap-3">
            <div v-for="(item, index) in topEvents" :class="['data-item flex align-items-center justify-content-between', layoutStore.layout === 'stats' ? 'w-3': layoutStore.layout === 'monitor'? 'w-6' : layoutStore.layout === 'metrics' ? 'w-full': 'w-4']">
                <div :class="['infos w-8 flex flex-column', layoutStore.layout === 'monitor' || layoutStore.layout === 'metrics' ? '': 'gap-1']">
                    <div class="name">{{ item.name }}</div>
                    <div :class="layoutStore.layout === 'monitor' || layoutStore.layout === 'metrics' ? 'flex align-items-center justify-content-start': ''">
                        <div class="count">{{ item.count }}</div>
                        <div :class="['change', item.change < 0 ? 'text-red-500': item.change > 0 ? 'text-primary': 'text-yellow-500']"><i :class="['pi', item.change < 0 ? 'pi-arrow-down': item.change > 0 ? 'pi-arrow-up': 'pi-circle']"></i> %{{item.change}}</div>
                    </div>
                </div>
                <div :class="['chart flex align-items-center relative w-4', layoutStore.layout === 'monitor' || layoutStore.layout === 'metrics' ? 'justify-content-start' : 'justify-content-center']">
                    <div class="status absolute z-1">% {{ item.status }}</div>
                    <div :class="['chart-area', layoutStore.layout === 'monitor' || layoutStore.layout === 'metrics' ? '' : 'w-full']">
                        <Chart type="doughnut" :data="getChartData(index)" :options="chartOptions" style="width:100%;"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .top-events {
        margin-top: 1.5rem;

        .data-list {
            .data-item {
                border-right: 1px solid;
                border-color: var(--surface-border);

                &:last-child {
                    border-right:0;
                }

                .infos {
                    .name{
                        font-size: 1rem;
                    }

                    .count {
                        font-size: 2rem;
                    }

                    .change {
                        font-size: 1rem;

                        .pi {
                            font-size: 0.75rem;
                        }
                    }
                }

                .chart {
                    .status {
                        font-size: 0.75rem;
                    }
                }
            }
        }

        &.slim {
            margin-left: 1.5rem;
            margin-top: 0;

            .data-list {
                .data-item {
                    .infos {
                        .name {
                            font-size: 0.75rem
                        }

                        .count {
                            font-size: 1.5rem;
                        }
                    }

                    .chart {
                        .chart-area {
                            width: 48px;
                        }

                        .status {
                            right: 0.25rem;
                        }
                    }
                }
            }
        }

        &.metrics-view {
            min-height: 113px;
        }
    } 
</style>