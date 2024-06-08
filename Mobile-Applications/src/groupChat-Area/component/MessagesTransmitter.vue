<template>
    <div :style="{ backgroundColor: chatBackgroundColor }" class="message-container">
        <span class="text">{{ text }}</span>
        <img v-if="photoIsAvailable" :src="image" style="z-index: 100; max-width: 200px; max-height: 200px;"
            alt="Chat Photo">
        <span class="timestamp">{{ time }}</span>
    </div>
</template>

<script setup>
import { defineProps, computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

const photoIsAvailable = ref(false);
const image = ref('');
const store = useStore();

onMounted(() => {
    checkphoto()
});

const props = defineProps({
    text: String,
    time: String,
    photoid: String
});

const chatBackgroundColor = computed(() => {
    const storedColor = localStorage.getItem('selfChatColor');
    return storedColor ? `#${storedColor}` : '#5F8575';
});

const checkphoto = () => {
    if (props.photoid) {
        getPhoto()
    }
}

const getPhoto = async () => {
    try {
        const result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/", {
            params: {
                token: store.state.token,
                request: "getphoto",
                photoid: props.photoid
            },
            responseType: 'blob' // specify the response type as blob
        });

        const blobUrl = URL.createObjectURL(result.data); // convert blob to URL
        image.value = blobUrl;
        console.log(image)
        photoIsAvailable.value = true;
    } catch (error) {
        console.error("Error fetching photo:", error);
    }
}
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
    max-height: fit-content;
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
    margin-top: 10px;
}
</style>
