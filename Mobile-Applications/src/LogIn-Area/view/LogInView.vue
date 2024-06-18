<script>
import LogIn from './../component/LogIn.vue';
import logo from './../../assets/file.png';

export default {
  components: {
    LogIn
  }
}
</script>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const textSizeClass = computed(() => store.getters.textSize);
</script>

<template>
  <div :class="textSizeClass">
    <div class="logo-container">
      <img :src="logo" alt="Car Logo" class="logo-image">
      <p class="logo-text">CarRestore</p>
    </div>
    
    <div class="login-container">
      <LogIn></LogIn>
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  text-align: center;
  margin-bottom: 20px; /* Abstand zwischen Logo und Login */
}

.logo-text {
  position: relative;
  font-size: 24px; /* Größere Schriftgröße für den Text */
  font-weight: bold;
  bottom: 10vh;
}

.logo-image {
  width: 20vh;
  height: 20vh;
}

.login-container {

}
</style>
