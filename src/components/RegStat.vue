<template>
    <div class="regions-info-container">
        <p class="d-inline-flex gap-1">
            <a class="btn btn-primary" data-bs-toggle="collapse" :href="`#basicInfo-${regionId}`" role="button" :aria-expanded="isBasicExpanded" 
                :aria-controls="`basicInfo-${regionId}`" @click="toggleBasicExpand">
                {{ basicInfoLabels && basicInfoLabels[0] ? basicInfoLabels[0].basicInformation : 'Basic Information' }}
                <span class="ms-1" v-if="isBasicLoading"><i class="pi pi-spin pi-spinner"></i></span>
            </a>
        </p>
        <div class="collapse" :id="`basicInfo-${regionId}`">
            <div class="card card-body">
                <div v-if="basicError" class="alert alert-danger" role="alert">
                    {{ basicError }}
                </div>
                <div v-if="isBasicLoading" class="text-center">
                    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                </div>
                <div v-else>
                    <p>{{ basicInfoLabels && basicInfoLabels[1] ? basicInfoLabels[1].basicInformation : 'Area of the region' }}
                        <span>
                            <a :href="getFilePath('area')" download title="Download Excel file">
                                <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                            </a>
                        </span>
                    </p>
                    <p>{{ basicInfoLabels && basicInfoLabels[2] ? basicInfoLabels[2].basicInformation : 'Number of municipalities, cities and villages' }}
                        <span>
                            <a :href="getFilePath('settlements')" download title="Download Excel file">
                                <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Population Information Section -->
        <p class="d-inline-flex gap-1 mt-2 population-section">
            <a class="btn btn-primary" data-bs-toggle="collapse" :href="`#populationInfo-${regionId}`" role="button" :aria-expanded="isPopulationExpanded" 
                :aria-controls="`populationInfo-${regionId}`" @click="togglePopulationExpand">
                {{ populationLabels && populationLabels[0] ? populationLabels[0].population : 'Population Information' }}
                <span class="ms-1" v-if="isPopulationLoading"><i class="pi pi-spin pi-spinner"></i></span>
            </a>
        </p>
        <div class="collapse" :id="`populationInfo-${regionId}`">
            <div class="card card-body">
                <div v-if="populationError" class="alert alert-danger" role="alert">
                    {{ populationError }}
                </div>
                <div v-if="isPopulationLoading" class="text-center">
                    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                </div>
                <div v-else>
                    <template v-if="populationData.length > 0">
                        <p v-for="(item, index) in populationData" :key="index">
                            {{ item.population }}
                            <span>
                                <a :href="getPopulationFilePath(index + 1)" download title="Download Excel file">
                                    <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                                </a>
                            </span>
                        </p>
                    </template>
                    <p v-else>No population data available.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'primeicons/primeicons.css';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default {
    props: {
        regionId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const { locale } = useI18n();
        const basicInfoLabels = ref([]);
        const populationLabels = ref([]);
        const isBasicLoading = ref(false);
        const isPopulationLoading = ref(false);
        const basicError = ref(null);
        const populationError = ref(null);
        const isBasicExpanded = ref(false);
        const isPopulationExpanded = ref(false);
        const cachedData = ref({
            basicInfo: {},
            population: {}
        });

        // Computed property to safely filter and extract population data
        const populationData = computed(() => {
            if (!populationLabels.value || populationLabels.value.length === 0) {
                return [];
            }
            
            // Filter out empty items and return only the ones with population data
            return populationLabels.value
                .slice(1, 4)  // Get the first 3 items after the title
                .filter(item => item && item.population && item.population.trim() !== '');
        });

        const toggleBasicExpand = () => {
            isBasicExpanded.value = !isBasicExpanded.value;
        };

        const togglePopulationExpand = () => {
            isPopulationExpanded.value = !isPopulationExpanded.value;
            
            // Always fetch population data when expanding, regardless of cache
            if (isPopulationExpanded.value) {
                // Force refresh data when toggling
                fetchPopulationInformation(true);
            }
        };

        const fetchBasicInformation = async (forceRefresh = false) => {
            // Skip cache if forceRefresh is true
            if (!forceRefresh && cachedData.value.basicInfo[locale.value]) {
                basicInfoLabels.value = cachedData.value.basicInfo[locale.value];
                return;
            }

            isBasicLoading.value = true;
            basicError.value = null;
            
            try {
                // Use indicatorsEn API when language is English
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/basicInformation`;
                
                const response = await axios.get(endpoint);
                basicInfoLabels.value = response.data;
                
                // Cache the response by language
                cachedData.value.basicInfo[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching basic information:', err);
                basicError.value = 'Failed to load data. Please try again later.';
                // Reset data on error to avoid showing stale data
                basicInfoLabels.value = [];
            } finally {
                isBasicLoading.value = false;
            }
        };

        const fetchPopulationInformation = async (forceRefresh = false) => {
            // Skip cache if forceRefresh is true
            if (!forceRefresh && cachedData.value.population[locale.value]) {
                populationLabels.value = cachedData.value.population[locale.value];
                return;
            }

            isPopulationLoading.value = true;
            populationError.value = null;
            
            try {
                // Fetch population data from the API
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/population`;
                
                const response = await axios.get(endpoint);
                populationLabels.value = response.data;
                
                // Cache the response by language
                cachedData.value.population[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching population information:', err);
                populationError.value = 'Failed to load data. Please try again later.';
                
                // Set empty array on error to avoid undefined errors
                populationLabels.value = [];
            } finally {
                isPopulationLoading.value = false;
            }
        };

        /**
         * Generates a file path based on file type and current language
         * @param {string} fileType - Type of file (area or settlements)
         * @returns {string} Path to the file
         */
        const getFilePath = (fileType) => {
            const lang = locale.value === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'dziritadi informacia' : 'main information';
            
            let fileName;
            if (fileType === 'area') {
                fileName = lang === 'ka' ? 'regionis fartobi.xlsx' : 'area.xlsx';
            } else if (fileType === 'settlements') {
                fileName = lang === 'ka' ? 'municipalitetebis, qalaqebis da soflebis raodenoba.xlsx' : 'number of settlements.xlsx';
            }
            
            return `/src/excels/reg/${lang}/${props.regionId}/${folder}/${fileName}`;
        };

        /**
         * Generates a file path for population files
         * @param {number} index - Index of the population data item
         * @returns {string} Path to the file
         */
        const getPopulationFilePath = (index) => {
            const lang = locale.value === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'demografia' : 'demography';
            
            let fileName;
            switch(index) {
                case 1:
                    fileName = lang === 'ka' ? 'mosaxleobis ricxovnoba.xlsx' : 'population.xlsx';
                    break;
                case 2:
                    fileName = lang === 'ka' ? 'qalaqis mosaxleobis cili.xlsx' : 'urban_population.xlsx';
                    break;
                case 3:
                    fileName = lang === 'ka' ? 'mosaxleobis simchidrove.xlsx' : 'population_density.xlsx';
                    break;
                default:
                    fileName = 'data.xlsx';
            }
            
            return `/src/excels/reg/${lang}/${props.regionId}/${folder}/${fileName}`;
        };

        const clearCache = () => {
            // Clear cached data to force a fresh fetch
            cachedData.value = {
                basicInfo: {},
                population: {}
            };
            
            // Reset data refs
            basicInfoLabels.value = [];
            populationLabels.value = [];
        };

        onMounted(() => {
            fetchBasicInformation();
            // Initialize populationLabels with an empty array to avoid undefined errors
            populationLabels.value = [];
        });

        // Watch for language changes and refetch all data when locale changes
        watch(locale, (newLocale, oldLocale) => {
            
            // Clear the cache to force new data fetching
            clearCache();
            
            // Always fetch basic information on language change with force refresh
            fetchBasicInformation(true);
            
            // Always fetch population data on language change, even if not expanded
            // This ensures data is ready when user expands the section
            fetchPopulationInformation(true);
        }, { immediate: true }); // immediate: true ensures it runs on component mount

        return { 
            locale,
            basicInfoLabels,
            populationLabels,
            populationData,
            isBasicLoading,
            isPopulationLoading,
            basicError,
            populationError,
            isBasicExpanded,
            isPopulationExpanded,
            toggleBasicExpand,
            togglePopulationExpand,
            getFilePath,
            getPopulationFilePath
        };
    }
};
</script>

<style scoped>
.card-body p {
    margin-bottom: 0.75rem;
    font-size: 1rem;
}
.alert {
    margin-top: 0.5rem;
}
.regions-info-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.population-section {
    margin-top: 1rem;
}
</style>