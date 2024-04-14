<template>
    <div class="message-container">
        <span class="text">Hey</span>
        <span class="timestamp">8:59</span>
    </div>
</template>

<script setup>
</script>

<style scoped>
.message-container {
    background-color: #25d366;
    padding: 0.5em;
    margin-left: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    width: 60%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;
    max-height: 200px;
}

.name {
    color: brown;
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
