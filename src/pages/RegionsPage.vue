<template>
    <div>
        <h1>Regions</h1>
        <ul>
            <!-- Loop through regions and display them -->
            <li v-for="region in regions" :key="region.id">{{ getRegionName(region) }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n';

export default {
    data() {
        return {
            regions: [], // Array to hold fetched regions
        };
    },
    mounted() {
        this.fetchRegions(); // Fetch regions when the component is mounted
    },
    methods: {
        async fetchRegions() {
            try {
                const response = await regionsAPI.getAll();
                this.regions = response.data; // Set the regions data from the API response
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        },
        getRegionName(region) {
            const { locale } = useI18n();
            return locale.value === 'ka' ? region.Name : region.NameEN;
        },
    },
};
</script>