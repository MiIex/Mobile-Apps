<template>
    <RouterLink to="/chat">
        <i class="pi pi-arrow-left"></i>
    </RouterLink>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
</template>

<script setup>
import MessagesRecipient from './../component/MessagesRecipient.vue'
import MessagesTransmitter from './../component/MessagesTransmitter.vue'
</script>

<style scoped>
.pi {
    position: fixed;
    font-size: 200%;
}
</style>