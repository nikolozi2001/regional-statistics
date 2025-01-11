<template>
    <div class="container py-5 text-center">
        <h1 class="display-4">{{ $t('pageNotFound') }}</h1>
        <span class="display-1 text-danger">404</span>
        <span class="d-block my-3">
            <strong>{{ $t('route') }}</strong> <code>{{ notFoundRoute }}</code> <strong>{{ $t('notFound') }}</strong>
        </span>
        <p class="lead">
            {{ $t('pageNotExist') }}
        </p>
        <RouterLink :to="{ name: 'Home' }" class="btn btn-primary btn-lg mt-3">{{ $t('goToHome') }}</RouterLink>
    </div>
</template>

<script>
export default {
    name: 'NotFoundErrorPage',
    computed: {
        notFoundRoute() {
            return this.$route.params && this.$route.params.notFound ? this.$route.params.notFound : 'unknown';
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
}

.display-1 {
    font-size: 6rem;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>