<!-- src/components/ThemeSwitcher.vue -->
<template>
  <div>
    <button @click="changeToDarkTheme">Dark Theme</button>
    <button @click="changeToLightTheme">Light Theme</button>
  </div>
</template>

<script setup>
import { usePrimeVue } from 'primevue/config';

const PrimeVue = usePrimeVue();

const changeToDarkTheme = () => {
  PrimeVue.changeTheme('md-light-deeppurple', 'lara-dark-indigo', 'theme-link', () => {
    console.log('Theme changed to Dark');
  });
};

const changeToLightTheme = () => {
  PrimeVue.changeTheme('lara-dark-indigo', 'md-light-deeppurple', 'theme-link', () => {
    console.log('Theme changed to Light');
  });
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
