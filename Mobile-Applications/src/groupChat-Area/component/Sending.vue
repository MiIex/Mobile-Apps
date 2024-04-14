<template>
    <div class="container">
        <div class="card">
            <!-- Hier kommt der Inhalt, der gescrollt werden kann -->
        </div>
        <div class="fixed-input">
            <InputText class="input" type="text" v-model="value" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
</script>

<style scoped>
.container {
    position: relative;
}

.card {
    /* Hier wird der Inhalt platziert, der gescrollt werden kann */
    max-height: 1000px;
    /* Beispielhöhe */
    overflow-y: scroll;
}

.fixed-input {
    position: fixed;
    bottom: 20px;
    /* Ändere diesen Wert, um die gewünschte Abstand zum unteren Rand anzupassen */
    left: 50%;
    /* Optional: Zentriert das Eingabefeld horizontal */
    transform: translateX(-50%);
}
</style>
