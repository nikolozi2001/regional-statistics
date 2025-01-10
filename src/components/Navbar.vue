<template>
    <div class="container-fluid">
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
            <!-- Brand Logo on the left -->
            <div id="brand-logo" class="me-3 mb-2 mb-md-0">
                <img :src="logoSrc" alt="Brand Logo" class="img-fluid" />
            </div>
            <!-- Page Title centered, with responsive text size and wrap control -->
            <h1 id="pagetitlename" class="tr mx-auto text-center text-md-nowrap mb-2 mb-md-0">
                {{ $t('title') }}
            </h1>
            <!-- Language Switcher -->
            <div class="language-switcher">
                <button @click="changeLanguage('en')"><img src="./images/en.png" alt=""></button>
                <button @click="changeLanguage('ka')"><img src="./images/ka.png" alt=""></button>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
            <!-- Back Button on the left -->
            <div class="mb-2 mb-md-0">
                <a class="btn header-btn" onclick="previous()">
                    {{ $t('back') }}
                </a>
            </div>

            <!-- Navigation Links with responsive wrapping -->
            <div class="d-flex flex-wrap justify-content-center justify-content-md-end">
                <a class="btn header-btn me-2 mb-2" href="">
                    {{ $t('comparison_regions') }}
                </a>

                <a class="btn header-btn me-2 mb-2" href="">
                    {{ $t('comparison_municipalities') }}
                </a>

                <a class="btn header-btn mb-2" href="">
                    {{ $t('gender_statistics') }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    computed: {
        logoSrc() {
            return this.$i18n.locale === 'en'
                ? '/src/components/images/logo_transparency_eng.png'
                : '/src/components/images/logo_transparency_geo.png';
        },
    },
    methods: {
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },
        previous() {
            window.history.back();
        },
    },
};
</script>

<style scoped>
#pagetitlename {
    flex-grow: 1;
    font-size: 1.5rem;
}

.img-fluid {
    width: 80px;
    height: auto;
}

.navbar-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.navbar-item {
    padding: 14px 20px;
}

.navbar-item a {
    color: black;
    text-align: center;
    text-decoration: none;
    display: block;
}

.navbar-item a:hover {
    background-color: #ddd;
    color: black;
}

.language-switcher button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-left: 10px;
}

.language-switcher img {
    width: 24px;
    height: auto;
}

.btn.header-btn {
    background-color: #0396A6;
    color: white;
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
}

.btn.header-btn:hover {
    background-color: #0B698B;
}
</style>