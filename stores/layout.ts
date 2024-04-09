import { defineStore } from "pinia";

export const useLayoutStore = defineStore('layoutStore', {
    state: () => ({
        visits: 0,
        layout: 'default',
        stats: 0,
        monitor: 0,
        metrics: 0,
        default: 0,
        loading: true,
        base: 'selected'
    }),
    actions: {
        async getLocalData() {
            const localData = window.localStorage.getItem('events');
            if(!!localData) {
                const newData = JSON.parse(localData);
                this.visits = Math.round(newData.visits + 1);
                this.layout = newData.layout;
                this.stats = newData.layout === 'stats' ? Math.round(newData.stats + 1) : newData.stats;
                this.monitor = newData.layout === 'monitor' ? Math.round(newData.monitor + 1) : newData.monitor;
                this.metrics = newData.layout === 'metrics' ? Math.round(newData.metrics + 1) : newData.metrics;
                this.default = newData.layout === 'default' ? Math.round(newData.default + 1) : newData.default;

                this.saveLocalData();
            } else {
                this.visits = 1;
                this.default = 1;

                this.saveLocalData();
                
            }

            this.loading = false;
        },
        async saveLocalData() {
            const localData = window.localStorage.getItem('events');

            if(!!localData) {
                window.localStorage.removeItem('events');
            }
            
            const saveData = {
                visits: this.visits,
                layout: this.layout,
                stats: this.stats,
                monitor: this.monitor,
                metrics: this.metrics,
                default: this.default,
                base: this.base,
            }

            window.localStorage.setItem('events', JSON.stringify(saveData));
        }
    }
})