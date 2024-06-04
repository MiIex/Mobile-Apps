<template>
    <div :class="textSizeClass">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { usePrimeVue } from 'primevue/config';
import { watch } from 'vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const PrimeVue = usePrimeVue();

const storedTextSize = localStorage.getItem('textSize');
let textSizeClass = store.getters.textSize;
const darkmodeChecked = ref(localStorage.getItem('darkmode') === 'true');

window.addEventListener('storage', (event) => {
    if (event.key === 'textSize') {
        const newTextSize = event.newValue;
        textSizeClass.value = newTextSize;
        console.log(`textSize changed in localStorage to ${newTextSize}`);
    }
});

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
