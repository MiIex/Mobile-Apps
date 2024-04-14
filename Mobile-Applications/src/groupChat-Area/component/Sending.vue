<template>
    <div class="container">
        <div class="card">
        </div>
        <div class="fixed-input">
            <i class="pi pi-plus"></i>
            <InputText type="text" v-model="value" style="height: 45px;" />
            <i class="pi pi-send"></i>
            <i class="pi pi-face-smile"></i>
            <i class="pi pi-camera"></i>
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
    margin-top: 6em;
    max-height: 1000px;
    overflow-y: scroll;
}

.fixed-input {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
}

.pi-send {
    margin-left: -30px;
    font-size: 20px;
}

.pi-face-smile {
    margin-left: -225px;
    font-size: 20px;
}

.pi-camera {
    font-size: 20px;
    margin-left: 250px;
}

.pi-plus {
    font-size: 20px;
    margin-right: 20px;
}
</style>
