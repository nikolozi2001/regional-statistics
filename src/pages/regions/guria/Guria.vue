<template>
    <main id="background">
        <div>
            <!-- Display the region with ID 3 -->
            <h1 class="d-flex justify-content-center" v-for="region in filteredRegions" :key="region.ID">{{
                getRegionName(region) }}</h1>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col order-first">
                    <reg-stat :region-id="3"></reg-stat>
                </div>
                <div class="col">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1"
                        viewBox="0 250 620 100">

                        <g inkscape:groupmode="layer" inkscape:label="Georgia">
                            <router-link :to="{ name: 'Adjara' }">
                                <path transform="matrix(1,0,0,-1,315.0942,305.9346)" stroke-width=".25"
                                    stroke-linecap="round" stroke-linejoin="round" fill="#6ea76f" stroke="#f9f9f9"
                                    d="M0 0-1.193-1.845 .07-3.692 2.649-4.146 3.596-4.431 4.466-4.154 6.046-3.123 7.9-3.571 8.921-5.235 9.593-7.286 11.098-8.183 12.952-8.736 14.285-9.742 15.715-10.443 16.704-11.066 17.752-11.572 19.396-11.442 20.971-11.883 21.767-14.912 21.874-18.446 20.536-18.48 19.38-19.269 18.913-20.515 18.053-21.227 16.871-21.016 15.715-20.594 13.141-20.873 11.82-20.745 11.154-20.398 9.18-18.344 8.013-18.084 6.6-18.519 3.816-20.27 .989-20.725 .043-20.877-1.483-20.483-2.42-19.937-4.079-19.064-6.611-19.373-7.906-19.849-7.97-19.873-8.631-19.982-10.221-18.73-10.856-18.446-11.873-17.781-14.425-16.71-14.699-15.244-15.489-14.774-16.865-13.956-23.663-13.616V-13.314L-24.285-8.914-24.374-7.326-24.611-6.357-26.714-2.651-25.856-1.161-25.583-.81-25.352 .534-24.642 2.478-21.369 3.099-18.037 3.215-11.587 4.306-8.707 3.59-6.079 1.818-2.752 1.391Z" />
                            </router-link>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import RegStat from '@/components/RegStat.vue';

export default {
    components: {
        RegStat
    },
    data() {
        return {
            regions: [], // Array to hold fetched regions
        };
    },
    computed: {
        filteredRegions() {
            return this.regions.filter(region => region.ID === 3);
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

<style scoped>
#background::before {
    content: '';
    background-image: url('/src/components/images/reg_photos/3.jpg');
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    z-index: -1;
}
</style>