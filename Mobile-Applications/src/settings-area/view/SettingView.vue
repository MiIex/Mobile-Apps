<script>
import Settings from './../component/Settings.vue'
import Navigation from './../../global/shared/navigation.vue'
export default {
  components: {
    Settings,
    Navigation
  }
}
</script>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()
const textSizeClass = computed(() => store.getters.textSize);

onMounted(() => {
  if (!store.state.token) {
    router.push("/login")
  }
})
</script>
<template>
  <h1>Einstellungen</h1>
  <Settings></Settings>
  <Navigation class="bar"></Navigation>

</template>

<style scoped>
.bar {
  position: fixed;
  width: 97%;
  bottom: 10px
}
</style>