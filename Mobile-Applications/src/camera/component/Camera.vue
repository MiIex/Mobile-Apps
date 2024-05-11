<template>
    <div>
        <video ref="videoNode" id="player" autoplay></video>
        <button @click="switchOn">Switch On</button>
        <button @click="takePhoto">Take Photo</button>
        <button @click="switchOff">Switch Off</button>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'CameraComponent',
    setup() {
        const videoNode = ref(null);
        const stream = ref(null);
        let photo = null;
        const message = ref('');

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
            return photo;
        };

        const onSendHandler = async (e) => {
            console.dir(photo);
            await sendMessage(message.value, photo.substring(22));
            message.value = '';
            photo = null;
            refreshMessages();
            e.preventDefault();
        };

        const sendMessage = async (text, photo) => {
            const token = getToken();
            return await postAndDecode({ request: 'sendmessage', text, photo, token });
        };

        return {
            videoNode,
            switchOn,
            switchOff,
            takePhoto,
            message,
            onSendHandler,
        };
    },
};
</script>
