<template>
    <div class="regions-info-container" v-if="componentsReady">
        <!-- Basic Information Section -->
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
        
        <!-- Demography Main Section -->
        <p class="d-inline-flex gap-1 mt-2 demography-section">
            <a class="btn btn-primary" data-bs-toggle="collapse" :href="`#demographyInfo-${regionId}`" role="button" :aria-expanded="isDemographyExpanded" 
                :aria-controls="`demographyInfo-${regionId}`" @click="toggleDemographyExpand">
                {{ 'Demography' }}
                <span class="ms-1" v-if="isDemographyLoading"><i class="pi pi-spin pi-spinner"></i></span>
            </a>
        </p>
        <div class="collapse" :id="`demographyInfo-${regionId}`">
            <div class="card card-body">
                <div v-if="isDemographyLoading" class="text-center">
                    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                </div>
                <div v-else>
                    <!-- Population Information Section -->
                    <p class="d-inline-flex gap-1 mt-2 population-section">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" :href="`#populationInfo-${regionId}`" role="button" :aria-expanded="isPopulationExpanded" 
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

                    <!-- Population Description Section -->
                    <p class="d-inline-flex gap-1 mt-2 population-description-section">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" :href="`#populationDescriptionInfo-${regionId}`" role="button" :aria-expanded="isPopulationDescriptionExpanded" 
                            :aria-controls="`populationDescriptionInfo-${regionId}`" @click="togglePopulationDescriptionExpand">
                            {{ populationDescriptionLabels && populationDescriptionLabels[0] ? populationDescriptionLabels[0].populationDescription : 'Population Description' }}
                            <span class="ms-1" v-if="isPopulationDescriptionLoading"><i class="pi pi-spin pi-spinner"></i></span>
                        </a>
                    </p>
                    <div class="collapse" :id="`populationDescriptionInfo-${regionId}`">
                        <div class="card card-body">
                            <div v-if="populationDescriptionError" class="alert alert-danger" role="alert">
                                {{ populationDescriptionError }}
                            </div>
                            <div v-if="isPopulationDescriptionLoading" class="text-center">
                                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                            </div>
                            <div v-else>
                                <template v-if="populationDescriptionData.length > 0">
                                    <p v-for="(item, index) in populationDescriptionData" :key="index">
                                        {{ item.populationDescription }}
                                        <span>
                                            <a :href="getPopulationDescriptionFilePath(index + 1)" download title="Download Excel file">
                                                <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                                            </a>
                                        </span>
                                    </p>
                                </template>
                                <p v-else>No population description data available.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Birth Information Section -->
                    <p class="d-inline-flex gap-1 mt-2 birth-section">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" :href="`#birthInfo-${regionId}`" role="button" :aria-expanded="isBirthExpanded" 
                            :aria-controls="`birthInfo-${regionId}`" @click="toggleBirthExpand">
                            {{ birthLabels && birthLabels[0] ? birthLabels[0].birth : 'Birth Information' }}
                            <span class="ms-1" v-if="isBirthLoading"><i class="pi pi-spin pi-spinner"></i></span>
                        </a>
                    </p>
                    <div class="collapse" :id="`birthInfo-${regionId}`">
                        <div class="card card-body">
                            <div v-if="birthError" class="alert alert-danger" role="alert">
                                {{ birthError }}
                            </div>
                            <div v-if="isBirthLoading" class="text-center">
                                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                            </div>
                            <div v-else>
                                <template v-if="birthData.length > 0">
                                    <p v-for="(item, index) in birthData" :key="index">
                                        {{ item.birth }}
                                        <span>
                                            <a :href="getBirthFilePath(index + 1)" download title="Download Excel file">
                                                <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                                            </a>
                                        </span>
                                    </p>
                                </template>
                                <p v-else>No birth data available.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Death Information Section -->
                    <p class="d-inline-flex gap-1 mt-2 death-section">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" :href="`#deathInfo-${regionId}`" role="button" :aria-expanded="isDeathExpanded" 
                            :aria-controls="`deathInfo-${regionId}`" @click="toggleDeathExpand">
                            {{ deathLabels && deathLabels[0] ? deathLabels[0].death : 'Death Information' }}
                            <span class="ms-1" v-if="isDeathLoading"><i class="pi pi-spin pi-spinner"></i></span>
                        </a>
                    </p>
                    <div class="collapse" :id="`deathInfo-${regionId}`">
                        <div class="card card-body">
                            <div v-if="deathError" class="alert alert-danger" role="alert">
                                {{ deathError }}
                            </div>
                            <div v-if="isDeathLoading" class="text-center">
                                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                            </div>
                            <div v-else>
                                <template v-if="deathData.length > 0">
                                    <p v-for="(item, index) in deathData" :key="index">
                                        {{ item.death }}
                                        <span>
                                            <a :href="getDeathFilePath(index + 1)" download title="Download Excel file">
                                                <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                                            </a>
                                        </span>
                                    </p>
                                </template>
                                <p v-else>No death data available.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Natural Increase Information Section -->
                    <p class="d-inline-flex gap-1 mt-2 natural-increase-section">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" :href="`#naturalIncreaseInfo-${regionId}`" role="button" :aria-expanded="isNaturalIncreaseExpanded" 
                            :aria-controls="`naturalIncreaseInfo-${regionId}`" @click="toggleNaturalIncreaseExpand">
                            {{ naturalIncreaseLabels && naturalIncreaseLabels[0] ? naturalIncreaseLabels[0].naturalIncrease : 'Natural Increase Information' }}
                            <span class="ms-1" v-if="isNaturalIncreaseLoading"><i class="pi pi-spin pi-spinner"></i></span>
                        </a>
                    </p>
                    <div class="collapse" :id="`naturalIncreaseInfo-${regionId}`">
                        <div class="card card-body">
                            <div v-if="naturalIncreaseError" class="alert alert-danger" role="alert">
                                {{ naturalIncreaseError }}
                            </div>
                            <div v-if="isNaturalIncreaseLoading" class="text-center">
                                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                            </div>
                            <div v-else>
                                <template v-if="naturalIncreaseData.length > 0">
                                    <p v-for="(item, index) in naturalIncreaseData" :key="index">
                                        {{ item.naturalIncrease }}
                                        <span>
                                            <a :href="getNaturalIncreaseFilePath(index + 1)" download title="Download Excel file">
                                                <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                                            </a>
                                        </span>
                                    </p>
                                </template>
                                <p v-else>No natural increase data available.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Marriage Information Section -->
                    <p class="d-inline-flex gap-1 mt-2 marriage-section">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" :href="`#marriageInfo-${regionId}`" role="button" :aria-expanded="isMarriageExpanded" 
                            :aria-controls="`marriageInfo-${regionId}`" @click="toggleMarriageExpand">
                            {{ marriageLabels && marriageLabels[0] ? marriageLabels[0].marriage : 'Marriage Information' }}
                            <span class="ms-1" v-if="isMarriageLoading"><i class="pi pi-spin pi-spinner"></i></span>
                        </a>
                    </p>
                    <div class="collapse" :id="`marriageInfo-${regionId}`">
                        <div class="card card-body">
                            <div v-if="marriageError" class="alert alert-danger" role="alert">
                                {{ marriageError }}
                            </div>
                            <div v-if="isMarriageLoading" class="text-center">
                                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                            </div>
                            <div v-else>
                                <template v-if="marriageData.length > 0">
                                    <p v-for="(item, index) in marriageData" :key="index">
                                        {{ item.marriage }}
                                        <span>
                                            <a :href="getMarriageFilePath(index + 1)" download title="Download Excel file">
                                                <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                                            </a>
                                        </span>
                                    </p>
                                </template>
                                <p v-else>No marriage data available.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Divorce Information Section -->
                    <p class="d-inline-flex gap-1 mt-2 divorce-section">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" :href="`#divorceInfo-${regionId}`" role="button" :aria-expanded="isDivorceExpanded" 
                            :aria-controls="`divorceInfo-${regionId}`" @click="toggleDivorceExpand">
                            {{ divorceLabels && divorceLabels[0] ? divorceLabels[0].divorce : 'Divorce Information' }}
                            <span class="ms-1" v-if="isDivorceLoading"><i class="pi pi-spin pi-spinner"></i></span>
                        </a>
                    </p>
                    <div class="collapse" :id="`divorceInfo-${regionId}`">
                        <div class="card card-body">
                            <div v-if="divorceError" class="alert alert-danger" role="alert">
                                {{ divorceError }}
                            </div>
                            <div v-if="isDivorceLoading" class="text-center">
                                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                            </div>
                            <div v-else>
                                <template v-if="divorceData.length > 0">
                                    <p v-for="(item, index) in divorceData" :key="index">
                                        {{ item.divorce }}
                                        <span>
                                            <a :href="getDivorceFilePath(index + 1)" download title="Download Excel file">
                                                <i class="pi pi-file-excel" style="font-size: 20px; margin-right: 5px;"></i>
                                            </a>
                                        </span>
                                    </p>
                                </template>
                                <p v-else>No divorce data available.</p>
                            </div>
                        </div>
                    </div>
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
        const populationDescriptionLabels = ref([]);
        const birthLabels = ref([]);
        const deathLabels = ref([]);
        const naturalIncreaseLabels = ref([]);
        const marriageLabels = ref([]);
        const divorceLabels = ref([]);
        const isBasicLoading = ref(false);
        const isDemographyLoading = ref(false);
        const isPopulationLoading = ref(false);
        const isPopulationDescriptionLoading = ref(false);
        const isBirthLoading = ref(false);
        const isDeathLoading = ref(false);
        const isNaturalIncreaseLoading = ref(false);
        const isMarriageLoading = ref(false);
        const isDivorceLoading = ref(false);
        const basicError = ref(null);
        const populationError = ref(null);
        const populationDescriptionError = ref(null);
        const birthError = ref(null);
        const deathError = ref(null);
        const naturalIncreaseError = ref(null);
        const marriageError = ref(null);
        const divorceError = ref(null);
        const isBasicExpanded = ref(false);
        const isDemographyExpanded = ref(false);
        const isPopulationExpanded = ref(false);
        const isPopulationDescriptionExpanded = ref(false);
        const isBirthExpanded = ref(false);
        const isDeathExpanded = ref(false);
        const isNaturalIncreaseExpanded = ref(false);
        const isMarriageExpanded = ref(false);
        const isDivorceExpanded = ref(false);
        const componentsReady = ref(false);
        const cachedData = ref({
            basicInfo: {},
            population: {},
            birth: {},
            death: {},
            naturalIncrease: {},
            marriage: {},
            divorce: {}
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

        // Computed property to safely filter and extract birth data
        const birthData = computed(() => {
            if (!birthLabels.value || birthLabels.value.length === 0) {
                return [];
            }
            
            // Filter out empty items and return only the ones with birth data
            return birthLabels.value
                .slice(1, 8)  // Get the first 7 items after the title (adjust as needed)
                .filter(item => item && item.birth !== null);
        });

        // Computed property to safely filter and extract death data
        const deathData = computed(() => {
            if (!deathLabels.value || deathLabels.value.length === 0) {
                return [];
            }
            
            // Filter out empty items and return only the ones with death data
            return deathLabels.value
                .slice(1, 8)  // Get the first 7 items after the title (adjust as needed)
                .filter(item => item && item.death !== null);
        });

        // Computed property to safely filter and extract natural increase data
        const naturalIncreaseData = computed(() => {
            if (!naturalIncreaseLabels.value || naturalIncreaseLabels.value.length === 0) {
                return [];
            }
            
            // Filter out empty items and return only the ones with natural increase data
            return naturalIncreaseLabels.value
                .slice(1, 8)  // Get the first 7 items after the title (adjust as needed)
                .filter(item => item && item.naturalIncrease !== null);
        });

        // Computed property to safely filter and extract marriage data
        const marriageData = computed(() => {
            if (!marriageLabels.value || marriageLabels.value.length === 0) {
                return [];
            }
            
            // Filter out empty items and return only the ones with marriage data
            return marriageLabels.value
                .slice(1, 8)  // Get the first 7 items after the title (adjust as needed)
                .filter(item => item && item.marriage !== null);
        });

        // Computed property to safely filter and extract divorce data
        const divorceData = computed(() => {
            if (!divorceLabels.value || divorceLabels.value.length === 0) {
                return [];
            }
            
            // Filter out empty items and return only the ones with divorce data
            return divorceLabels.value
                .slice(1, 8)  // Get the first 7 items after the title (adjust as needed)
                .filter(item => item && item.divorce !== null);
        });

        // Computed property to safely filter and extract population description data
        const populationDescriptionData = computed(() => {
            if (!populationDescriptionLabels.value || populationDescriptionLabels.value.length === 0) {
                return [];
            }
            
            // Filter out empty items and return only the ones with population description data
            return populationDescriptionLabels.value
                .slice(1, 8)  // Get the first 7 items after the title (adjust as needed)
                .filter(item => item && item.populationDescription !== null);
        });

        const toggleBasicExpand = () => {
            isBasicExpanded.value = !isBasicExpanded.value;
        };

        const toggleDemographyExpand = () => {
            isDemographyExpanded.value = !isDemographyExpanded.value;
            
            // When expanding the demography section, load all demographic data
            if (isDemographyExpanded.value) {
                isDemographyLoading.value = true;
                
                // Load all demographic data in parallel
                Promise.all([
                    fetchPopulationInformation(true),
                    fetchPopulationDescriptionInformation(true),
                    fetchBirthInformation(true),
                    fetchDeathInformation(true),
                    fetchNaturalIncreaseInformation(true),
                    fetchMarriageInformation(true),
                    fetchDivorceInformation(true)
                ]).finally(() => {
                    isDemographyLoading.value = false;
                });
            }
        };

        const togglePopulationExpand = () => {
            isPopulationExpanded.value = !isPopulationExpanded.value;
            
            // Always fetch population data when expanding, regardless of cache
            if (isPopulationExpanded.value) {
                // Force refresh data when toggling
                fetchPopulationInformation(true);
            }
        };

        const toggleBirthExpand = () => {
            isBirthExpanded.value = !isBirthExpanded.value;
            
            // Always fetch birth data when expanding, regardless of cache
            if (isBirthExpanded.value) {
                // Force refresh data when toggling
                fetchBirthInformation(true);
            }
        };

        const toggleDeathExpand = () => {
            isDeathExpanded.value = !isDeathExpanded.value;
            
            // Always fetch death data when expanding, regardless of cache
            if (isDeathExpanded.value) {
                // Force refresh data when toggling
                fetchDeathInformation(true);
            }
        };

        const toggleNaturalIncreaseExpand = () => {
            isNaturalIncreaseExpanded.value = !isNaturalIncreaseExpanded.value;
            
            // Always fetch natural increase data when expanding, regardless of cache
            if (isNaturalIncreaseExpanded.value) {
                // Force refresh data when toggling
                fetchNaturalIncreaseInformation(true);
            }
        };

        const toggleMarriageExpand = () => {
            isMarriageExpanded.value = !isMarriageExpanded.value;
            
            // Always fetch marriage data when expanding, regardless of cache
            if (isMarriageExpanded.value) {
                // Force refresh data when toggling
                fetchMarriageInformation(true);
            }
        };

        const toggleDivorceExpand = () => {
            isDivorceExpanded.value = !isDivorceExpanded.value;
            
            // Always fetch divorce data when expanding, regardless of cache
            if (isDivorceExpanded.value) {
                // Force refresh data when toggling
                fetchDivorceInformation(true);
            }
        };

        const togglePopulationDescriptionExpand = () => {
            isPopulationDescriptionExpanded.value = !isPopulationDescriptionExpanded.value;
            
            // Always fetch population description data when expanding, regardless of cache
            if (isPopulationDescriptionExpanded.value) {
                // Force refresh data when toggling
                fetchPopulationDescriptionInformation(true);
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

        const fetchBirthInformation = async (forceRefresh = false) => {
            // Skip cache if forceRefresh is true
            if (!forceRefresh && cachedData.value.birth[locale.value]) {
                birthLabels.value = cachedData.value.birth[locale.value];
                return;
            }

            isBirthLoading.value = true;
            birthError.value = null;
            
            try {
                // Fetch birth data from the API
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/birth`;
                
                const response = await axios.get(endpoint);
                birthLabels.value = response.data;
                
                // Cache the response by language
                cachedData.value.birth[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching birth information:', err);
                birthError.value = 'Failed to load data. Please try again later.';
                
                // Set empty array on error to avoid undefined errors
                birthLabels.value = [];
            } finally {
                isBirthLoading.value = false;
            }
        };

        const fetchDeathInformation = async (forceRefresh = false) => {
            // Skip cache if forceRefresh is true
            if (!forceRefresh && cachedData.value.death[locale.value]) {
                deathLabels.value = cachedData.value.death[locale.value];
                return;
            }

            isDeathLoading.value = true;
            deathError.value = null;
            
            try {
                // Fetch death data from the API
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/death`;
                
                const response = await axios.get(endpoint);
                deathLabels.value = response.data;
                
                // Cache the response by language
                cachedData.value.death[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching death information:', err);
                deathError.value = 'Failed to load data. Please try again later.';
                
                // Set empty array on error to avoid undefined errors
                deathLabels.value = [];
            } finally {
                isDeathLoading.value = false;
            }
        };

        const fetchNaturalIncreaseInformation = async (forceRefresh = false) => {
            // Skip cache if forceRefresh is true
            if (!forceRefresh && cachedData.value.naturalIncrease[locale.value]) {
                naturalIncreaseLabels.value = cachedData.value.naturalIncrease[locale.value];
                return;
            }

            isNaturalIncreaseLoading.value = true;
            naturalIncreaseError.value = null;
            
            try {
                // Fetch natural increase data from the API
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/naturalIncrease`;
                
                const response = await axios.get(endpoint);
                naturalIncreaseLabels.value = response.data;
                
                // Cache the response by language
                cachedData.value.naturalIncrease[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching natural increase information:', err);
                naturalIncreaseError.value = 'Failed to load data. Please try again later.';
                
                // Set empty array on error to avoid undefined errors
                naturalIncreaseLabels.value = [];
            } finally {
                isNaturalIncreaseLoading.value = false;
            }
        };

        const fetchMarriageInformation = async (forceRefresh = false) => {
            // Skip cache if forceRefresh is true
            if (!forceRefresh && cachedData.value.marriage[locale.value]) {
                marriageLabels.value = cachedData.value.marriage[locale.value];
                return;
            }

            isMarriageLoading.value = true;
            marriageError.value = null;
            
            try {
                // Fetch marriage data from the API
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/marriage`;
                
                const response = await axios.get(endpoint);
                marriageLabels.value = response.data;
                
                // Cache the response by language
                cachedData.value.marriage[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching marriage information:', err);
                marriageError.value = 'Failed to load data. Please try again later.';
                
                // Set empty array on error to avoid undefined errors
                marriageLabels.value = [];
            } finally {
                isMarriageLoading.value = false;
            }
        };

        const fetchDivorceInformation = async (forceRefresh = false) => {
            // Skip cache if forceRefresh is true
            if (!forceRefresh && cachedData.value.divorce[locale.value]) {
                divorceLabels.value = cachedData.value.divorce[locale.value];
                return;
            }

            isDivorceLoading.value = true;
            divorceError.value = null;
            
            try {
                // Fetch divorce data from the API
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/divorce`;
                
                const response = await axios.get(endpoint);
                divorceLabels.value = response.data;
                
                // Cache the response by language
                cachedData.value.divorce[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching divorce information:', err);
                divorceError.value = 'Failed to load data. Please try again later.';
                
                // Set empty array on error to avoid undefined errors
                divorceLabels.value = [];
            } finally {
                isDivorceLoading.value = false;
            }
        };

        const fetchPopulationDescriptionInformation = async (forceRefresh = false) => {
            // Skip cache if forceRefresh is true
            if (!forceRefresh && cachedData.value.populationDescription && cachedData.value.populationDescription[locale.value]) {
                populationDescriptionLabels.value = cachedData.value.populationDescription[locale.value];
                return;
            }

            isPopulationDescriptionLoading.value = true;
            populationDescriptionError.value = null;
            
            try {
                // Fetch population description data from the API
                const endpoint = `${API_BASE_URL}/${locale.value === 'en' ? 'indicatorsEn' : 'indicators'}/populationDescription`;
                
                const response = await axios.get(endpoint);
                populationDescriptionLabels.value = response.data;
                
                // Cache the response by language
                if (!cachedData.value.populationDescription) {
                    cachedData.value.populationDescription = {};
                }
                cachedData.value.populationDescription[locale.value] = response.data;
            } catch (err) {
                console.error('Error fetching population description information:', err);
                populationDescriptionError.value = 'Failed to load data. Please try again later.';
                
                // Set empty array on error to avoid undefined errors
                populationDescriptionLabels.value = [];
            } finally {
                isPopulationDescriptionLoading.value = false;
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

        /**
         * Generates a file path for population description files
         * @param {number} index - Index of the population description data item
         * @returns {string} Path to the file
         */
        const getPopulationDescriptionFilePath = (index) => {
            const lang = locale.value === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'demografia' : 'demography';
            
            let fileName;
            switch(index) {
                case 1:
                    fileName = lang === 'ka' ? 'mosaxleobis gamocdileba.xlsx' : 'population_description.xlsx';
                    break;
                case 2:
                    fileName = lang === 'ka' ? 'qalaqis mosaxleobis gamocdileba.xlsx' : 'urban_population_description.xlsx';
                    break;
                default:
                    fileName = 'data.xlsx';
            }
            
            return `/src/excels/reg/${lang}/${props.regionId}/${folder}/${fileName}`;
        };

        /**
         * Generates a file path for birth files
         * @param {number} index - Index of the birth data item
         * @returns {string} Path to the file
         */
        const getBirthFilePath = (index) => {
            const lang = locale.value === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'demografia' : 'demography';
            
            let fileName;
            switch(index) {
                case 1:
                    fileName = lang === 'ka' ? 'gamosaxulebuli ricxovnoba.xlsx' : 'births.xlsx';
                    break;
                case 2:
                    fileName = lang === 'ka' ? 'qalaqis gamosaxleobis cili.xlsx' : 'urban_births.xlsx';
                    break;
                case 3:
                    fileName = lang === 'ka' ? 'gamosaxlebis simchidrove.xlsx' : 'birth_density.xlsx';
                    break;
                default:
                    fileName = 'data.xlsx';
            }
            
            return `/src/excels/reg/${lang}/${props.regionId}/${folder}/${fileName}`;
        };

        /**
         * Generates a file path for death files
         * @param {number} index - Index of the death data item
         * @returns {string} Path to the file
         */
        const getDeathFilePath = (index) => {
            const lang = locale.value === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'demografia' : 'demography';
            
            let fileName;
            switch(index) {
                case 1:
                    fileName = lang === 'ka' ? 'mokleobis ricxovnoba.xlsx' : 'deaths.xlsx';
                    break;
                case 2:
                    fileName = lang === 'ka' ? 'qalaqis mokleobis cili.xlsx' : 'urban_deaths.xlsx';
                    break;
                case 3:
                    fileName = lang === 'ka' ? 'mokleobis simchidrove.xlsx' : 'death_density.xlsx';
                    break;
                default:
                    fileName = 'data.xlsx';
            }
            
            return `/src/excels/reg/${lang}/${props.regionId}/${folder}/${fileName}`;
        };

        /**
         * Generates a file path for natural increase files
         * @param {number} index - Index of the natural increase data item
         * @returns {string} Path to the file
         */
        const getNaturalIncreaseFilePath = (index) => {
            const lang = locale.value === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'demografia' : 'demography';
            
            let fileName;
            switch(index) {
                case 1:
                    fileName = lang === 'ka' ? 'natakhtobi ricxovnoba.xlsx' : 'natural_increase.xlsx';
                    break;
                case 2:
                    fileName = lang === 'ka' ? 'qalaqis natakhtobis cili.xlsx' : 'urban_natural_increase.xlsx';
                    break;
                case 3:
                    fileName = lang === 'ka' ? 'natakhtobis simchidrove.xlsx' : 'natural_increase_density.xlsx';
                    break;
                default:
                    fileName = 'data.xlsx';
            }
            
            return `/src/excels/reg/${lang}/${props.regionId}/${folder}/${fileName}`;
        };

        /**
         * Generates a file path for marriage files
         * @param {number} index - Index of the marriage data item
         * @returns {string} Path to the file
         */
        const getMarriageFilePath = (index) => {
            const lang = locale.value === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'demografia' : 'demography';
            
            let fileName;
            switch(index) {
                case 1:
                    fileName = lang === 'ka' ? 'qorwinebata raodenoba.xlsx' : 'marriages.xlsx';
                    break;
                case 2:
                    fileName = lang === 'ka' ? 'qorwinebis koeficienti.xlsx' : 'marriage_rate.xlsx';
                    break;
                case 3:
                    fileName = lang === 'ka' ? 'qorwineba asaki.xlsx' : 'marriage_by_age.xlsx';
                    break;
                default:
                    fileName = 'data.xlsx';
            }
            
            return `/src/excels/reg/${lang}/${props.regionId}/${folder}/${fileName}`;
        };

        /**
         * Generates a file path for divorce files
         * @param {number} index - Index of the divorce data item
         * @returns {string} Path to the file
         */
        const getDivorceFilePath = (index) => {
            const lang = locale.value === 'ka' ? 'ka' : 'en';
            const folder = lang === 'ka' ? 'demografia' : 'demography';
            
            let fileName;
            switch(index) {
                case 1:
                    fileName = lang === 'ka' ? 'gamosaxulebuli ricxovnoba.xlsx' : 'divorces.xlsx';
                    break;
                case 2:
                    fileName = lang === 'ka' ? 'qalaqis gamosaxulebis cili.xlsx' : 'urban_divorces.xlsx';
                    break;
                case 3:
                    fileName = lang === 'ka' ? 'gamosaxlebis simchidrove.xlsx' : 'divorce_density.xlsx';
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
                population: {},
                birth: {},
                death: {},
                naturalIncrease: {},
                marriage: {},
                divorce: {}
            };
            
            // Reset data refs
            basicInfoLabels.value = [];
            populationLabels.value = [];
            birthLabels.value = [];
            deathLabels.value = [];
            naturalIncreaseLabels.value = [];
            marriageLabels.value = [];
            divorceLabels.value = [];
        };

        onMounted(() => {
            fetchBasicInformation();
            // Initialize populationLabels with an empty array to avoid undefined errors
            populationLabels.value = [];
            // Initialize birthLabels with an empty array to avoid undefined errors
            birthLabels.value = [];
            // Initialize deathLabels with an empty array to avoid undefined errors
            deathLabels.value = [];
            // Initialize naturalIncreaseLabels with an empty array to avoid undefined errors
            naturalIncreaseLabels.value = [];
            // Initialize marriageLabels with an empty array to avoid undefined errors
            marriageLabels.value = [];
            // Initialize divorceLabels with an empty array to avoid undefined errors
            divorceLabels.value = [];
            // Set componentsReady to true to allow rendering of the template
            componentsReady.value = true;
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

            // Always fetch birth data on language change, even if not expanded
            // This ensures data is ready when user expands the section
            fetchBirthInformation(true);

            // Always fetch death data on language change, even if not expanded
            // This ensures data is ready when user expands the section
            fetchDeathInformation(true);

            // Always fetch natural increase data on language change, even if not expanded
            // This ensures data is ready when user expands the section
            fetchNaturalIncreaseInformation(true);

            // Always fetch marriage data on language change, even if not expanded
            // This ensures data is ready when user expands the section
            fetchMarriageInformation(true);

            // Always fetch divorce data on language change, even if not expanded
            // This ensures data is ready when user expands the section
            fetchDivorceInformation(true);
        }, { immediate: true }); // immediate: true ensures it runs on component mount

        return { 
            locale,
            basicInfoLabels,
            populationLabels,
            populationDescriptionLabels,
            birthLabels,
            deathLabels,
            naturalIncreaseLabels,
            marriageLabels,
            divorceLabels,
            populationData,
            populationDescriptionData,
            birthData,
            deathData,
            naturalIncreaseData,
            marriageData,
            divorceData,
            isBasicLoading,
            isPopulationLoading,
            isPopulationDescriptionLoading,
            isBirthLoading,
            isDeathLoading,
            isNaturalIncreaseLoading,
            isMarriageLoading,
            isDivorceLoading,
            basicError,
            populationError,
            populationDescriptionError,
            birthError,
            deathError,
            naturalIncreaseError,
            marriageError,
            divorceError,
            isBasicExpanded,
            isDemographyExpanded,
            isPopulationExpanded,
            isPopulationDescriptionExpanded,
            isBirthExpanded,
            isDeathExpanded,
            isNaturalIncreaseExpanded,
            isMarriageExpanded,
            isDivorceExpanded,
            toggleBasicExpand,
            toggleDemographyExpand,
            togglePopulationExpand,
            togglePopulationDescriptionExpand,
            toggleBirthExpand,
            toggleDeathExpand,
            toggleNaturalIncreaseExpand,
            toggleMarriageExpand,
            toggleDivorceExpand,
            getFilePath,
            getPopulationFilePath,
            getPopulationDescriptionFilePath,
            getBirthFilePath,
            getDeathFilePath,
            getNaturalIncreaseFilePath,
            getMarriageFilePath,
            getDivorceFilePath,
            componentsReady,
            isDemographyLoading
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
.birth-section {
    margin-top: 1rem;
}
.death-section {
    margin-top: 1rem;
}
.natural-increase-section {
    margin-top: 1rem;
}
.marriage-section {
    margin-top: 1rem;
}
.divorce-section {
    margin-top: 1rem;
}
</style>