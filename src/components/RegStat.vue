<template>
    <p class="d-inline-flex gap-1">
        <a class="btn btn-primary" data-bs-toggle="collapse" :href="`#basicInfo-${regionId}`" role="button" :aria-expanded="isExpanded" 
            :aria-controls="`basicInfo-${regionId}`" @click="toggleExpand">
            {{ basicInfoLabels[0] ? basicInfoLabels[0].basicInformation : 'Basic Information' }}
            <span class="ms-1" v-if="isLoading"><i class="pi pi-spin pi-spinner"></i></span>
        </a>
    </p>
    <div class="collapse" :id="`basicInfo-${regionId}`">
        <div class="card card-body">
            <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
            </div>
            <div v-if="isLoading" class="text-center">
                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            </div>
            <div v-else>
                <p>{{ basicInfoLabels[1] ? basicInfoLabels[1].basicInformation : 'Area of the region' }}
                    <span>
                        <a :href="getFilePath('area')" download title="Download Excel file">
                            <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                        </a>
                    </span>
                </p>
                <p>{{ basicInfoLabels[2] ? basicInfoLabels[2].basicInformation : 'Number of municipalities, cities and villages' }}
                    <span>
                        <a :href="getFilePath('settlements')" download title="Download Excel file">
                            <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                        </a>
                    </span>
                </p>
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
        const isLoading = ref(false);
        const error = ref(null);
        const isExpanded = ref(false);
        const cachedData = ref({});

        const toggleExpand = () => {
            isExpanded.value = !isExpanded.value;
        };

        const fetchBasicInformation = async () => {
            // Check if we have cached data for this locale
            if (cachedData.value[locale.value]) {
                basicInfoLabels.value = cachedData.value[locale.value];
                return;
            }

            isLoading.value = true;
            error.value = null;
            
            try {
                // Use indicatorsEn API when language is English
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/basicInformation`;
                
                const response = await axios.get(endpoint);
                basicInfoLabels.value = response.data;
                
                // Cache the response by language
                cachedData.value[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching basic information:', err);
                error.value = 'Failed to load data. Please try again later.';
            } finally {
                isLoading.value = false;
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

        onMounted(() => {
            fetchBasicInformation();
        });

        // Watch for language changes and refetch data when locale changes
        watch(locale, () => {
            fetchBasicInformation();
        });

        return { 
            locale, 
            basicInfoLabels, 
            isLoading, 
            error, 
            isExpanded,
            toggleExpand,
            getFilePath
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
</style>