<template>
    <router-view></router-view>
</template>

<script setup>
import { usePrimeVue } from 'primevue/config';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const PrimeVue = usePrimeVue();

const storedTextSize = localStorage.getItem('textSize');
const darkmodeChecked = ref(localStorage.getItem('darkmode') === 'true');

onMounted(() => {
    darkmode(darkmodeChecked.value);
})

function darkmode(isDarkMode) {
    const newTheme = isDarkMode ? 'lara-dark-indigo' : 'md-light-deeppurple';
    const oldTheme = isDarkMode ? 'md-light-deeppurple' : 'lara-dark-indigo';

    PrimeVue.changeTheme(oldTheme, newTheme, 'theme-link', () => {
        console.log(`Theme changed to ${newTheme}`);
    });
}
</script>
