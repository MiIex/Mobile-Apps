<template>
    <div :style="{ backgroundColor: chatBackgroundColor }" class="message-container">
        <span class="name">{{ name }}</span>
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
    name: String,
    text: String,
    time: String,
    photoid: String
});

const chatBackgroundColor = computed(() => {
    const storedColor = localStorage.getItem('chatColor');
    return storedColor ? `#${storedColor}` : '#075e54'; // Default color if none set
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
        photoIsAvailable.value = true;
    } catch (error) {
        console.error("Error fetching photo:", error);
    }
}
</script>

<style scoped>
.message-container {
    padding: 0.5em;
    margin-bottom: 1em;
    width: fit-content;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;
    max-height: fit-content;
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
    margin-top: px;
}
</style>