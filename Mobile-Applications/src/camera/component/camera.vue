<template>
    <div>
        <video ref="videoNode" id="player" autoplay></video>
        <button @click="takePhoto">Take Photo</button>
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
                facingMode: 'user', // or environment
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

            // Speichern des Fotos im Vuex-Store
            store.commit('photo', photo);

            // Kamera ausschalten und zurück navigieren
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
        };
    },
};
</script>
