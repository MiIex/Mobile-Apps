<template>
    <div>
        <h1 style="text-align: center;">Chats</h1>
        <RouterLink to="/groupchat" style="text-decoration: none;" class="chat-link">
            <Card>
                <template #title>
                    <div class="chat-header">
                        <span class="title">Gruppenchat</span>
                        <span class="pi pi-arrow-right"></span>
                    </div>
                </template>
            </Card>
        </RouterLink>
    </div>
</template>

<script setup>
import 'primeicons/primeicons.css';
</script>

<style scoped>
.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    margin: 0;
    flex-grow: 1;
}

.pi-arrow-right {
    font-size: larger;
}
</style>
