<template>
    <div class="container">
        <div v-if="photoIsAvailable" class="photo-container">
            <img :src="image" class="chat-photo" alt="Chat Photo">
            <i @click="clearPhoto" class="pi pi-times delete-photo-button"></i>
        </div>
        <div class="fixed-input">
            <RouterLink to="/camera" tag="button">
                <i class="pi pi-camera"></i>
            </RouterLink>
            <InputText type="text" v-model="value" class="input-text"/>
            <i class="pi pi-send" @click="sendMessage(store.state.token)"></i>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();

const value = ref(null);
const image = computed(() => store.state.photo || null);
const photoIsAvailable = computed(() => !!image.value);

const sendMessage = async (token) => {
    console.warn("A", token);
    console.log(value.value);
    console.log(token);
    try {
        await axios.post("https://www2.hs-esslingen.de/~melcher/map/chat/api/index.php/", {
            request: "postmessage",
            token: token,
            text: value.value,
            photo: image.value
        });
        // Nachricht erfolgreich gesendet, Foto entfernen
        store.commit('clearPhoto');
        value.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

const clearPhoto = () => {
    store.commit('clearPhoto');
};
</script>

<style scoped>
.container {
    position: relative;
}

.photo-container {
    display: flex;
    align-items: center;
    margin-left: 8vh;
}

.chat-photo {
    z-index: 100;
    max-width: 50px;
    max-height: 50px;
    margin-right: 1vh;
}

.delete-photo-button {
    border: none;
    margin-left: 20vh;
    padding-left: 5px 10px;
    cursor: pointer;
    font-size: 12px;
}

.fixed-input {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1vh;
    box-sizing: border-box;
    width: 100%;
}

.pi {
    font-size: 20px;
}

.input-text {
    flex-grow: 1;
    height: 6vh;
    width: 20vh; /* Adjusted to ensure proper sizing */
}

.pi-send,
.pi-camera,
.pi-face-smile,
.pi-plus {
    margin: 0 0.5vh;
}
</style>
