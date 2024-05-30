<template>
    <div :class="textSizeClass">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { usePrimeVue } from 'primevue/config';
import { useStore } from 'vuex';

const store = useStore();

const PrimeVue = usePrimeVue();

const storedTextSize = localStorage.getItem('textSize');
const textSizeClass = store.getters.textSize;

const isDarkMode = localStorage.getItem('darkmode') === 'true';

if (isDarkMode) {
    PrimeVue.changeTheme('md-light-deeppurple', 'lara-dark-indigo', 'theme-link', () => {
        console.log('Theme changed to Dark');
    });
} else {
    PrimeVue.changeTheme('lara-dark-indigo', 'md-light-deeppurple', 'theme-link', () => {
        console.log('Theme changed to Light');
    });
}
</script>
