<script>
import ProfileSettings from './../component/ProfileSettings.vue'
import Navigation from './../../global/shared/navigation.vue'
export default {
  components: {
    ProfileSettings,
    Navigation
  }
}
</script>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()

onMounted(() => {
    if (!store.state.token) {
        router.push("/login")
    }
})
</script>
<template>
    <h1>Profil-Einstellungen</h1>
    <ProfileSettings></ProfileSettings>
    <Navigation class="bar"></Navigation>
</template>

<style scoped>
.bar{
    position: absolute;
    width: 97%;
    bottom: 10px
}
</style>