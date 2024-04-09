<script setup>
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import { FilterMatchMode } from 'primevue/api';

    const layoutStore = useLayoutStore();

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const events = await $fetch('/api/metrics', { headers: { 'Api-Data-Count': layoutStore.layout === 'metrics' ? '10' : '5' } });
</script>

<template>
    <div class="metrics-area surface-card border-round-lg p-3 shadow-1 w-full">
        <DataTable v-model:filters="filters" stripedRows removableSort :paginator="layoutStore.layout === 'metrics'" :value="events" :rows="layoutStore.layout === 'metrics' ? 10 : 5"  :rowsPerPageOptions="[10, 20, 50]" tableStyle="min-width: 50rem">
            <template #header>
                <div class="card flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="card-header">Events Metric <i class="pi pi-info-circle"></i></span>
                    <div class="table-options flex justify-content-end gap-2">
                        <IconField iconPosition="left">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" variant="filled" style="border: 0;"/>
                        </IconField>
                        <Button icon="pi pi-download" severity="secondary"/>
                    </div>       
                </div>
            </template>
            <Column field="event" sortable header="Event"></Column>
            <Column field="count" sortable header="Count"></Column>
            <Column field="sum" sortable header="Sum"></Column>
            <Column field="duratiom" sortable header="Duration"></Column>
        </DataTable>
    </div>
</template>