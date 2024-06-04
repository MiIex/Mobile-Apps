<template>
    <div class="full-screen">
        <ChatArea></ChatArea>
        <Sending class="sending"></Sending>
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

.sending{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 999;
}
</style>
