<template>
    <p class="d-inline-flex gap-1">
        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
            aria-controls="collapseExample">
            {{ basicInfoLabels[0] ? basicInfoLabels[0].basicInformation : 'Basic Information' }}
        </a>
    </p>
    <div class="collapse" id="collapseExample">
        <div class="card card-body">
            <p>{{ basicInfoLabels[1] ? basicInfoLabels[1].basicInformation : 'area of the region' }}
                <span>
                    <a :href="areaFilePath" download>
                        <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                    </a>
                </span>
            </p>
            <p>{{ basicInfoLabels[2] ? basicInfoLabels[2].basicInformation : 'Number of municipalities, cities and villages' }}
                <span>
                    <a :href="settlementsFilePath" download>
                        <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                    </a>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
import 'primeicons/primeicons.css';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

export default {
    props: {
        regionId: {
            type: Number,
            required: true
        }
    },
    setup() {
        const { locale } = useI18n();
        const basicInfoLabels = ref([]);

        const fetchBasicInformation = async () => {
            try {
                // Use indicatorsEn API when language is English
                const endpoint = locale.value === 'en' 
                    ? 'http://localhost:3001/api/indicatorsEn/basicInformation' 
                    : 'http://localhost:3001/api/indicators/basicInformation';
                
                const response = await axios.get(endpoint);
                basicInfoLabels.value = response.data;
            } catch (error) {
                console.error('Error fetching basic information:', error);
            }
        };

        onMounted(() => {
            fetchBasicInformation();
        });

        // Watch for language changes and refetch data when locale changes
        watch(locale, () => {
            fetchBasicInformation();
        });

        return { locale, basicInfoLabels };
    },
    computed: {
        areaFilePath() {
            const lang = this.locale === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'dziritadi informacia' : 'main information';
            const fileName = lang === 'ka' ? 'regionis fartobi.xlsx' : 'area.xlsx';
            return `/src/excels/reg/${lang}/${this.regionId}/${folder}/${fileName}`;
        },
        settlementsFilePath() {
            const lang = this.locale === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'dziritadi informacia' : 'main information';
            const fileName = lang === 'ka' ? 'municipalitetebis, qalaqebis da soflebis raodenoba.xlsx' : 'number of settlements.xlsx';
            return `/src/excels/reg/${lang}/${this.regionId}/${folder}/${fileName}`;
        }
    }
};
</script>