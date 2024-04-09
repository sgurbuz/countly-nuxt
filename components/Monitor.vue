<script setup>
    import { ref, onMounted } from "vue";
    import Chart from "primevue/chart";

    const layoutStore = useLayoutStore();

    const monitoringEvents = await $fetch('/api/monitor', { headers: { 'Api-Data-Count': layoutStore.layout === 'monitor' ? '3' : layoutStore.layout === 'metrics' ? '1' : '2' } });

    onMounted(() => {
        monitorChartData.value = setChartData();
        monitorChartOptions.value = setChartOptions();
    });

const monitorChartData = ref();
const monitorChartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21','22', '23', '24', '25', '26', '27','28', '29', '30'],
        datasets: [
            {
                label: 'Change',
                backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                barPercentage: 0.5,
                data: [65, 59, 80, 81, 56, 55, 40, 56, 80, 81, 65, 59, 80, 81, 56, 55, 40, 56, 80, 81, 65, 59, 80, 81, 56, 55, 40, 56, 80, 81]
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    display: false,
                    color: textColorSecondary
                },
                grid: {
                    display: false,
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
</script>

<template>
    <div v-if="!layoutStore.loading" :class="['card monitor-events surface-card border-round-lg p-3 shadow-1 w-full', layoutStore.layout === 'stats' ? 'stats-view': '', layoutStore.layout === 'monitor' ? 'active': 'default', layoutStore.layout === 'metrics' ? 'slim': '']">
        <div class="card-header flex align-items-center justify-content-between"><div>Monitor Events <i class="pi pi-info-circle"></i></div><Button icon="pi pi-cog" severity="secondary" size="small" text aria-label="Manage Monitoring Datas" /></div>
        <div :class="['data-list flex justify-content-between', layoutStore.layout === 'monitor' ? 'align-items-center gap-4': 'gap-3 align-items-stretch flex-column']">
            <div v-for="item in monitoringEvents" :class="['data-item flex align-items-center justify-content-between', layoutStore.layout === 'monitor' ? 'align-items-stretch flex-column w-4': 'align-items-center', layoutStore.layout === 'metrics' ? 'gap-2' : '']">
                <div :class="['infos', layoutStore.layout === 'monitor' ? 'w-full flex align-items-center justify-content-between': layoutStore.layout === 'metrics' ? 'w-6 flex align-items-center justify-content-between' : 'w-3']">
                    <div>
                        <div class="name">{{ item.name }}</div>
                        <div class="type">{{ item.type }}</div>
                    </div>
                    <div :class="layoutStore.layout === 'monitor' || layoutStore.layout === 'metrics' ? 'text-right': ''">
                        <div class="count">{{ item.count }}</div>
                        <div :class="['change', item.change < 0 ? 'text-red-500': item.change > 0 ? 'text-primary': 'text-yellow-500']"><i :class="['pi', item.change < 0 ? 'pi-arrow-down': item.change > 0 ? 'pi-arrow-up': 'pi-circle']"></i> %{{!!item.change ? item.change : 'N/A'}}</div>
                    </div>
                </div>
                <div :class="['chart', layoutStore.layout === 'monitor' ? 'w-full': layoutStore.layout === 'metrics' ? 'w-6' : 'w-9']">
                    <Chart type="bar" :data="monitorChartData" :options="monitorChartOptions" :class="layoutStore.layout === 'metrics' ? 'h-3rem' : 'h-6rem'" style="width: 100%;"  />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .monitor-events {
        min-height: 312px;

        .data-list {
            .data-item {
                .infos {
                    .name {
                        margin-bottom: 0.25rem;
                        font-size: 1rem;
                    }

                    .type {
                        text-transform: uppercase;
                        color: #ABAFAB;
                        font-size: 0.75rem;
                        margin-bottom: 0.5rem;
                    }

                    .count {
                        font-size: 2rem;
                    }
                }
            }
        }

        &.stats-view {
            min-height: 372px;
        }

        &.active {
            min-height: auto;

            .data-list {
                .data-item {
                    .infos {
                        margin-bottom: 2rem;

                        .name {
                            margin-bottom: 0.25rem;
                            font-size: 1.5rem;
                        }

                        .count {
                            font-size: 3rem;
                        }
                    }
                }
            }
        }

        &.slim {
            min-height: 113px;

            .data-list {
                .data-item {
                    .infos {
                        .name {
                            font-size: 0.75rem;
                        }

                        .count {
                            font-size: 1.25rem;
                        }

                        .change {
                            font-size: 0.75rem;
                        }
                    }
                }
            }
        }
    }
</style>