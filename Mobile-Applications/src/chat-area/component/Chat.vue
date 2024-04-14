<template>
    <h1>Chats</h1>
    <div class="chat-container">
        Gruppenchat
        <RouterLink to="/groupchat">
            <span class="pi pi-arrow-right"></span>
        </RouterLink>
    </div>
</template>

<script setup>
import 'primeicons/primeicons.css'
</script>

<style scoped>
.chat-container {
    display: flex;
    gap: 20vh;
    height: 9vh;
    font-size: 30px;
    background-color: grey;
}

.pi {
    padding-top: 70%;
    font-size: 2rem;
}
</style>