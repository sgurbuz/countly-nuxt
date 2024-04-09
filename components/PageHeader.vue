<script setup lang="ts">
    import moment from 'moment';
    import Dropdown from 'primevue/dropdown';
    import Calendar from 'primevue/calendar';

    defineProps({
        titles: Array,
        showViewer: {
            type: Boolean,
            default: true,
            required: false,
        },
        showUpdate:{
            type: Boolean,
            default: true,
            required: false,
        },
    });

    const layoutStore = useLayoutStore();

    const updateTime = ref('');
    const time:any = await $fetch('/api/time');

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    let prevMonth = (month === 0) ? 11 : month - 1;
    
    const prevRange = ref(new Date());
    const maxDate = ref(new Date());

    prevRange.value.setMonth(prevMonth);

    const dates = ref([prevRange.value, today]);

    updateTime.value = moment(time.updated).fromNow();

    const layouts = [
        {
            option: 'Default View',
            value: 'default',
        },
        {
            option: 'Stats View',
            value: 'stats',
        },
        {
            option: 'Monitor View',
            value: 'monitor',
        },
        {
            option: 'Metrics View',
            value: 'metrics',
        }
    ];

    const handleViewerChange = (e: any) => {
        layoutStore.loading = true;
        layoutStore.layout = e.value;
        layoutStore.saveLocalData();
        window.location.reload();
    }

</script>

<template>
    <div v-if="!layoutStore.loading" class="countly-page-header flex align-items-center justify-content-between py-5">
        <div class="page-titles text-2xl font-light">
            <span v-for="title in titles"> {{ title }}</span> for 
            <Calendar v-model="dates" selectionMode="range" showIcon :maxDate="maxDate" iconDisplay="input" :manualInput="false">
                <template #inputicon="{ clickCallback }">
                    <InputIcon class="pi pi-angle-down cursor-pointer" @click="clickCallback" />
                </template>
            </Calendar>
        </div>
        <div class="page-options flex align-items-center justify-content-end gap-2">
            <div v-if="showUpdate" class="update-time"><i class="pi pi-refresh"></i> {{ updateTime }}</div>
            <div v-if="showViewer">
                <Dropdown v-model="layoutStore.layout" :options="layouts" checkmark optionLabel="option" optionValue="value" class="w-full" v-on:change="handleViewerChange($event)"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    :deep(.p-calendar .p-inputtext) {
        border-left: 0;
        border-right: 0;
        border-top: 0;
        background: transparent;
        font-size: 1.5rem;
        font-weight: 300;
    }

    :deep(.p-calendar) {
        width: 354px;
    }

    .page-titles {
        span {
            &:first-child {
                font-weight: 600;
                
                &::after {
                    content: "/";
                    display:inline-block;
                    padding-left: 0.25rem;
                    padding-right: 0.25rem;
                    font-weight: 200;
                }
            }
        }
    }
</style>