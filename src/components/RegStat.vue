<template>
    <p class="d-inline-flex gap-1">
        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
            aria-controls="collapseExample">
            Basic Information
        </a>
    </p>
    <div class="collapse" id="collapseExample">
        <div class="card card-body">
            <p>area of the region
                <span>
                    <a :href="areaFilePath" download>
                        <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                    </a>
                </span>
            </p>
            <p>Number of municipalities, cities and villages
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

export default {
    props: {
        regionId: {
            type: Number,
            required: true
        }
    },
    setup() {
        const { locale } = useI18n();
        return { locale };
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