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

// Watcher, um Änderungen des Dark Mode im Store zu überwachen
store.watch(() => store.state.isDarkMode, (newValue) => {
    if (newValue) {
        // Dark Mode ist aktiv
        PrimeVue.changeTheme('md-light-deeppurple', 'lara-dark-indigo', 'theme-link', () => {
            console.log('Theme changed to Dark');
        });
    } else {
        // Dark Mode ist deaktiviert
        PrimeVue.changeTheme('lara-dark-indigo', 'md-light-deeppurple', 'theme-link', () => {
            console.log('Theme changed to Light');
        });
    }
});
</script>
