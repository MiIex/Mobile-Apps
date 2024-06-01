<template>
    <div class="container">
        <div class="fixed-input">
            <i class="pi pi-plus"></i>
            <i class="pi pi-face-smile"></i>
            <InputText type="text" v-model="value" class="input-text" />
            <i class="pi pi-send" @click="sendMessage(value.value)"></i>
            <i class="pi pi-camera"></i>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex'

const store = useStore()

const value = ref(null);

const sendMessage = async (message) => {
    let result = await axios({
        method: 'post',
        url: "https://www2.hs-esslingen.de/~melcher/map/chat/api/",
        data: {
            token: store.state.token,
            text: message
        }
    })
}
</script>

<style scoped>
.container {
    position: relative;
}

.fixed-input {
    display: flex;
    align-items: center;
    padding: 1vh;
    box-sizing: border-box;
}

.pi {
    font-size: 20px;
}

.input-text {
    flex-grow: 1;
    height: 6vh;
    width: 1vh;
}

.pi-send,
.pi-camera,
.pi-face-smile,
.pi-plus {
    margin: 0 0.5vh;
}
</style>
