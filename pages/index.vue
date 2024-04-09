<script setup>
    import Button from 'primevue/button';
    import Skeleton from 'primevue/skeleton';

    import { useLayoutStore } from '~/stores/layout';

    import PageHeader from '~/components/PageHeader.vue';
    import Stats from '~/components/Stats.vue';
    import TopEvents from '~/components/TopEvents.vue';

    const layoutStore = useLayoutStore();
    onBeforeMount(() => {
        layoutStore.getLocalData();
    });


    const pageTitles = ['Events', 'Overview'];

    const setLayoutState = (layout) => {
        layoutStore.layout = layout;
        layoutStore.base = 'more';
        switch (layout) {
            case 'stats':
                layoutStore.stats = layoutStore.stats++;
                break;
            
            case 'metrics':
                layoutStore.metrics = layoutStore.metrics++;
                break;
            
            case 'monitor':
                layoutStore.monitor = layoutStore.monitor++;
                break;
        
            default:
                layoutStore.default = layoutStore.default++;
                break;
        }
        layoutStore.saveLocalData();
    }

</script>

<template>
    <div v-if="layoutStore.loading">
        <div class="flex align-items-center justify-content-between skeleton-header px-3 py-4">
            <Skeleton height="2rem" width="8rem"></Skeleton>
            <Skeleton height="2rem" width="16rem"></Skeleton>
        </div>
        <div class="px-3 py-4 gap-4 flex-column w-full">
            <Skeleton height="1rem" width="24rem" class="mb-3"></Skeleton>
            <Skeleton height="2rem" width="65rem" class="mb-3"></Skeleton>
            <Skeleton height="1rem" width="10rem" class="mb-3"></Skeleton>
        </div>
    </div>
    <div v-if="!layoutStore.loading" class="events app-page">
        <PageHeader :titles="pageTitles" />
        <div class="page-content gap-4">
            <div :class="['summary flex align-items-start justify-content-between gap-4', layoutStore.layout === 'monitor' ? 'flex-column-reverse' : '']">
                <div :class="['stats-area',  layoutStore.layout === 'stats' ? 'w-12' : layoutStore.layout === 'monitor' ? 'w-full flex align-items-start flex-wrap justify-content-between' :  layoutStore.layout === 'metrics' ? 'w-8 flex align-items-start flex-wrap justify-content-between': 'w-8']">
                    <Stats />
                    <TopEvents />
                    <div v-if="layoutStore.layout !== 'stats'" class="more-btn-area w-full p-3 text-center">
                        <Button label="More Detailed Stats" text severity="secondary" icon="pi pi-angle-down" iconPos="right" @click="setLayoutState('stats')" />
                    </div>
                </div>
                <div v-if="layoutStore.layout !== 'stats'" :class="['monitor-area', layoutStore.layout === 'monitor' ? 'w-full' : 'w-4']">
                    <Monitor />
                    <div v-if="layoutStore.layout !== 'monitor'" class="more-btn-area p-3 text-center">
                        <Button label="More Monitoring Data" text severity="secondary" icon="pi pi-angle-down" iconPos="right" @click="setLayoutState('monitor')"/>
                    </div>
                </div>
            </div>
            <div :class="['datas-area flex align-items-start justify-content-between gap-4', layoutStore.layout === 'monitor' ||  layoutStore.layout === 'metrics' ? 'mt-0' : '']">
                <div :class="['metrics-area', layoutStore.layout === 'stats' ? 'w-8' : 'w-full']">
                    <Metrics />
                    <div v-if="layoutStore.layout !== 'metrics'" class="more-btn-area p-3 text-center">
                        <Button label="More Metrics" text severity="secondary" icon="pi pi-angle-down" iconPos="right" @click="setLayoutState('metrics')"/>
                    </div>
                </div>
                <div v-if="layoutStore.layout === 'stats'" class="monitor-area w-4">
                    <Monitor />
                    <div v-if="layoutStore.layout !== 'monitor'" class="more-btn-area p-3 text-center">
                        <Button label="More Monitoring Data" text severity="secondary" icon="pi pi-angle-down" iconPos="right" @click="setLayoutState('monitor')"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .datas-area {
        margin-top: 1.5rem;
    }
</style>