<template>
    <main id="background">
        <div>
            <!-- Display the region with ID 4 -->
            <h1 class="d-flex justify-content-center" v-for="region in filteredRegions" :key="region.ID">{{
                getRegionName(region) }}</h1>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col order-first">
                    <reg-stat :region-id="4"></reg-stat>
                </div>
                <div class="col">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1"
                        viewBox="0 250 620 100">

                        <g inkscape:groupmode="layer" inkscape:label="Georgia">
                            <router-link :to="{ name: 'Adjara' }">
                                <path transform="matrix(1,0,0,-1,315.0942,305.9346)" stroke-width=".25"
                                    stroke-linecap="round" stroke-linejoin="round" fill="#ce8d34" stroke="#f9f9f9"
                                    d="M0 0 .233-.68 .742-2.158 .693-4.577 .097-5.49-.027-6.808 .322-7.801 .833-8.67 2.193-9.941 3.413-11.363 4.944-13.826 5.458-15.289 5.385-15.313 4.342-16.121 3.811-17.288 3.321-20.117 2.8-21.236 1.671-22.435 .113-24.798-.968-25.515-1.594-25.547-2.279-25.583-11.399-22.012-13.958-22.158-15.205-22.055-16.07-21.236-16.812-20.792-17.602-20.767-19.235-21.236-19.977-20.899-20.708-20.777-21.439-20.882-22.191-21.236-24.029-21.821-27.754-20.397-29.845-21.236-30.559-21.789-32.188-24.131-34.273-25.92-34.773-26.21-35.407-25.941-37.476-24.009-38.164-23.779-39.685-23.59-40.292-23.342-40.513-22.904-40.502-22.338-40.443-21.817-40.513-21.545-40.911-21.542-42.216-22.141-43.77-22.263-44.431-22.137-49.969-19.797-46.562-13.646-45.03-11.566-41.894-9.511-41.018-7.414-38.581-3.399-38.445-2.58-38.441-1.95-38.365-1.396-38.047-.778-37.201 .386-36.914 .97-36.803 1.601V7.257L-30.006 6.917-28.629 6.099-27.84 5.629-27.566 4.163-25.013 3.092-23.997 2.427-23.361 2.143-21.772 .891-21.111 1-21.046 1.024-19.751 1.5-17.22 1.809-15.561 .937-14.624 .39-13.098-.004-12.152 .148-9.325 .604-6.541 2.354-5.127 2.789-3.961 2.529-1.986 .475-1.32 .128 0 0Z" />
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

<style scoped>
#background::before {
    content: '';
    background-image: url('/src/components/images/reg_photos/4.jpg');
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