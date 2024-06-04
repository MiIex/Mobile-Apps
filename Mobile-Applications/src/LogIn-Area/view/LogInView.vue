<script>
import LogIn from './../component/LogIn.vue'
export default {
  components: {
    LogIn
  }
}
</script>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore()
const textSizeClass = computed(() => store.getters.textSize);
</script>

<template>
  <div :class="textSizeClass">
    <h1>Login</h1>
    <LogIn></LogIn>
  </div>
</template>
