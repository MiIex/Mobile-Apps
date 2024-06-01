<template>
    <div class="full-screen">
        <ChatArea></ChatArea>
        <Sending></Sending>
    </div>
</template>

<script setup>
import ChatArea from './../component/ChatArea.vue'
import Sending from './../component/Sending.vue'
</script>

<style scoped>
.full-screen {
    width: 100%;
    height: 100vh;
    /* 100% der Bildschirmhöhe */
}
</style>
