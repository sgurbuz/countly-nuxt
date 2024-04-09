<script setup>
    const layoutStore = useLayoutStore();
    const statsData = await $fetch('/api/stats', { headers: {'Api-Data-Count': layoutStore.layout === 'stats' ? '4' : '3'}});
    const calculateChange = (val, per) => {
        const calculatedValue = Math.round((val*100)/(100 + per));
        return calculatedValue;
    }
</script>

<template>
    <div :class="['stats flex gap-4 align-items-start justify-content-start', layoutStore.layout === 'monitor' ? 'w-7 slim': layoutStore.layout === 'metrics'? 'w-8 slim' : 'w-full']">
        <div :class="['card stats-card surface-card border-round-lg p-3 shadow-1', layoutStore.layout === 'stats' ? 'w-3 active' : 'w-4']" v-for="item in statsData">
            <div class="event-name flex gap-2 align-items-center">{{item.name}} <i class="pi pi-info-circle"></i><span class="tooltip hidden">{{ item.tooltip }}</span></div>
            <div class="flex align-items-center justify-content-start gap-2">
                <div class="event-count">
                    {{item.count}}
                    <div v-if="layoutStore.layout === 'stats'" class="changed-value"><i class="pi pi-history"></i> {{ calculateChange(item.count, item.change) }}</div>
                </div>
                <div :class="['event-change', item.change < 0 ? 'text-red-500': item.change > 0 ? 'text-primary': 'text-yellow-500']"><i :class="['pi', item.change < 0 ? 'pi-arrow-down': item.change > 0 ? 'pi-arrow-up': 'pi-circle']"></i> %{{item.change}}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @use "~/assets/scss/_color.scss" as *;

    .stats-card {
        .event-name {
            color: $countly-black;
            font-weight: 300;
            font-size: 1rem;
            margin-bottom: 0.75rem;

            .pi {
                color: $countly-secondary;
                font-size: 0.75rem
            }
        }

        .event-count {
            font-size: 2.5rem;
            font-weight: 500;

            .changed-value {
                font-weight: normal;
                font-size: 1rem;

                .pi {
                    font-size: 0.75rem;
                }
            }
        }

        .event-change {
            font-size: 1rem;

            i {
                font-size: 0.75rem;
            }
        }
    }

    .active {
        .event-count {
            font-size: 3rem;
            font-weight: normal;
        }
    }

    .stats {
        &.slim {
            .stats-card {
                min-height: 113px;

                .event-count {
                    font-size: 1.75rem;
                    font-weight: normal;
                }
            }
        }
    }
</style>