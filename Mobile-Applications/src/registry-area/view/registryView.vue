<script>
import Registry from './../component/registry.vue';
export default {
  components: {
    Registry
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
    <h1>Registrieren</h1>
    <Registry></Registry>
  </div>
</template>
