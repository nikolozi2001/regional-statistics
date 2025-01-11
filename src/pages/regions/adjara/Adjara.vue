<template>
    <div>
        <!-- Display the region with ID 4 -->
        <h1 class="d-flex justify-content-center" v-for="region in filteredRegions" :key="region.ID">{{
            getRegionName(region) }}</h1>
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
    computed: {
        filteredRegions() {
            return this.regions.filter(region => region.ID === 4);
        }
    },
    mounted() {
        this.fetchRegions(); // Fetch regions when the component is mounted
    },
    methods: {
        async fetchRegions() {
            try {
                const response = await axios.get('http://localhost:8000/api/regions');
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