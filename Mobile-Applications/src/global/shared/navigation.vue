<template>
    <div class="bar" :class="textSizeClass">
        <RouterLink to="/profilesettings" tag="button">
            <Button label="Profile" />
        </RouterLink>
        <RouterLink to="/chat" tag="button">
            <Button label="Chat" />
        </RouterLink>
        <RouterLink to="/settings" tag="button">
            <Button label="Settings" />
        </RouterLink>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const textSizeClass = computed(() => store.getters.textSize);

</script>

<style scoped>
Button {
    width: 33%
}
</style>
