<template>
    <div class="video-container">
        <video ref="videoNode" id="player" autoplay class="video"></video>
        <div class="photo-button" @click="takePhoto"></div>
        <button class="back-button" @click="goBack">Back</button>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: 'CameraComponent',
    setup() {
        const videoNode = ref(null);
        const stream = ref(null);
        let photo = null;
        const router = useRouter();
        const store = useStore();

        const switchOn = () => {
            navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 },
                audio: false,
                facingMode: 'user',
            }).then(newStream => {
                console.log('Established stream');
                videoNode.value.srcObject = newStream;
                stream.value = newStream;
            }).catch(error => {
                console.error('Error accessing camera:', error);
            });
        };

        const switchOff = () => {
            console.log('Switching off...');
            if (stream.value) {
                stream.value.getTracks().forEach(track => {
                    console.log('Stopping track:', track);
                    track.stop();
                });
                videoNode.value.srcObject = null;
                stream.value = null;
                console.log('Camera turned off.');
            } else {
                console.log('Stream not found.');
            }
        };

        const takePhoto = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 480;
            const context = canvas.getContext('2d');
            context.drawImage(videoNode.value, 0, 0, canvas.width, canvas.height);
            photo = context.canvas.toDataURL();
            context.clearRect(0, 0, canvas.width, canvas.height);

            store.commit('photo', photo);

            switchOff();
            router.push('/groupchat');
        };

        const goBack = () => {
            switchOff();
            router.push('/groupchat');
        };

        onMounted(() => {
            switchOn();
        });

        onUnmounted(() => {
            switchOff();
        });

        return {
            videoNode,
            takePhoto,
            goBack,
        };
    },
};
</script>

<style scoped>
.video-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.video {
    width: 100%;
    height: 90%;
    margin-bottom: 15vh;
    object-fit: cover;
}

.photo-button {
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
}

.photo-button:active {
    transform: translateX(-50%) scale(0.9);
}

.back-button {
    width: 80px;
    height: 40px;
    background-color: lightgray;
    border: none;
    border-radius: 5px;
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.back-button:hover {
    background-color: gray;
}
</style>
