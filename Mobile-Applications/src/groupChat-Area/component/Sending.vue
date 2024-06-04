<template>
    <div class="container">
        <div class="fixed-input">
            <i class="pi pi-plus"></i>
            <i class="pi pi-face-smile"></i>
            <InputText type="text" v-model="value" style="height: 45px;" />
            <i class="pi pi-send" @click="sendMessage(store.state.token)"></i>
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

const sendMessage = (token) => {
    console.warn("A", token)
    console.log(value.value)
    console.log(token)
    return axios.post("https://www2.hs-esslingen.de/~melcher/map/chat/api/index.php/", 
    {request:"postmessage",
    token:token,
    text:value.value})
   
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
