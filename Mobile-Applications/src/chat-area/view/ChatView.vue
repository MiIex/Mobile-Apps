<template>
    <div :class="textSizeClass">
        <Chat></Chat>
        <Navigation class="bar"></Navigation>
    </div>
</template>

<script setup>
import Chat from './../component/Chat.vue'
import Navigation from './../../global/shared/navigation.vue'
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()
const textSizeClass = ref(store.getters.textSize);

onMounted(() => {
    if (!store.state.token) {
        router.push("/login")
    }
})
</script>

<style scoped>
.bar {
    position: absolute;
    width: 97%;
    bottom: 10px
}
</style>