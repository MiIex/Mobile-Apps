<template>
    <div class="message-container">
        <span class="name">Hans</span>
        <span class="text">Hallo</span>
        <span class="timestamp">8:58</span>
    </div>
</template>

<script setup>
</script>

<style scoped>
.message-container {
    background-color: #075e54;
    padding: 0.5em;
    width: 60%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;
    max-height: 200px;
}

.name {
    color: greenyellow;
    font-size: 20px;
}

.text {
    color: white;
    font-size: 30px;
    word-wrap: break-word;
}

.timestamp {
    align-self: flex-end;
    color: gray;
    font-size: 16px;
    margin-top: -15px;
}
</style>
