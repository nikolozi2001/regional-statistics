<template>
    <div class="container">
        <!-- Social Share Section -->
        <div class="row justify-content-center mb-3">
            <div class="col-auto text-center">
                <div class="social-icons">
                    <!-- Facebook Icon -->
                    <a href="https://www.facebook.com/sharer/sharer.php?u=http://regions.geostat.ge/regions/"
                        target="_blank" class="social-icon">
                        <i class="pi pi-facebook"></i>
                    </a>

                    <!-- Twitter Icon -->
                    <a href="https://twitter.com/intent/tweet?url=http://regions.geostat.ge/regions/" target="_blank"
                        class="social-icon">
                        <i class="pi pi-twitter"></i>
                    </a>
                </div>
            </div>
        </div>

        <!-- Logos and Footer Text Section -->
        <div class="row align-items-center justify-content-center">
            <div class="col-12 col-md-8 text-center">
                <!-- Partner Logos -->
                <div class="logos mb-2">
                    <img class="eu-logo" :src="euLogo" alt="EU Logo" />
                    <img class="partner-logo" :src="denmarkLogo" alt="Denmark Logo" />
                    <img class="partner-logo" :src="undpLogo" alt="UNDP Logo" />
                </div>

                <!-- Footer Text -->
                <div class="footer-text">
                    <span>{{ $t('copyright1') }}</span><br />
                    <span>{{ $t('copyright2') }}</span><br />
                    <span>
                        <a href="https://www.geostat.ge/ka/page/monacemta-gamoyenebis-pirobebi">
                            {{ $t('copyright3') }}
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'primeicons/primeicons.css';

export default {
    name: "Footer",
    computed: {
        euLogo() {
            return this.getImagePath("eu");
        },
        denmarkLogo() {
            return this.getImagePath("denmark");
        },
        undpLogo() {
            return this.getImagePath("undp");
        },
    },
    methods: {
        getImagePath(imageName) {
            const lang = this.$i18n.locale;
            const basePath = "/src/components/images";
            return `${basePath}/${lang}/${imageName}.png`;
        },
    },
};


</script>

<style scoped>
.social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.social-icon i {
    font-size: 30px;
    color: #555;
}

.social-icon:hover i {
    color: #007bff;
}

.logos {
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
}

.eu-logo,
.partner-logo {
    height: 40px;
}

.footer-text {
    color: #555;
    font-size: 0.9rem;
    font-weight: bold;
}

.footer-text a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
}

.footer-text a:hover {
    text-decoration: underline;
}
</style>