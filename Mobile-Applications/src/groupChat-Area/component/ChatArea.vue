<template>
    <div class="messages-container" :class="textSizeClass">
        <div class="header">
            <RouterLink to="/chat" tag="button">
                <Button class="chat"><i class="pi pi-angle-left"></i></Button>
            </RouterLink>
            <h2>Groupchat</h2>
            <Button class="chat" @click="loadMessages()"><i class="pi pi-refresh"></i></Button>
        </div>
        <ScrollPanel class="chat-area">
            <button @click="getMessages()" class="load-more">Mehr Nachrichten</button>
            <template v-for="message in messages">
                <MessagesTransmitter v-if="message.userhash == userhash" :text="message.text" :time="message.time">
                </MessagesTransmitter>
                <MessagesRecipient v-else :name="message.usernickname" :text="message.text" :time="message.time" :photoid="message.photoid">
                </MessagesRecipient>
            </template>
        </ScrollPanel>
    </div>
    <div class="background-layer" :style="backgroundLayerStyle"></div>
</template>

<script setup>
import MessagesRecipient from './../component/MessagesRecipient.vue';
import MessagesTransmitter from './../component/MessagesTransmitter.vue';
import ScrollPanel from 'primevue/scrollpanel';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const textSizeClass = computed(() => store.getters.textSize);

let key = store.state.token;
let userhash = store.state.userhash
let messages = ref([]);
var shownmessages = -200

onMounted(() => {
    loadMessages();
    if (!store.state.token) {
        router.push("/login");
    }
});

const loadMessages = async () => {
    let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/", {
        params: {
            token: store.state.token,
            request: "getmessages",
            timestamp: Date.now()
        },
        
    }).catch(function (error) {

    })
    console.log(result)
    messages.value = []
    let lastMessages = result.data.messages.slice(shownmessages)
    for (var message of lastMessages) {
        messages.value.push({ userhash: message.userhash, text: message.text, usernickname: message.usernickname, time: message.time, photoid: message.photoid })
    }
}

const getMessages = async () => {
    let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/index.php/?request=getmessages", {
        params: {
            token: store.state.token
        }
    }).catch(function (error) {

    })

    messages.value = []
    shownmessages = shownmessages - 5;
    let lastMessages = result.data.messages.slice(shownmessages)
    for (var message of lastMessages) {
        messages.value.push({ userhash: message.userhash, text: message.text, usernickname: message.usernickname, time: message.time })
    }
}

const backgroundImageUrl = ref(localStorage.getItem('backgroundImageUrl') || '');

const backgroundLayerStyle = computed(() => ({
    backgroundImage: `url(${backgroundImageUrl.value})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.5
}));
</script>

<style scoped>
.messages-container {
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.background-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
}

.header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    border: solid;
    border-width: 1px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background-color: #1f2937;
}

.chat-area {
    margin-top: 60px;
}

.chat {
    height: 40px;
    top: 10px;

}

.load-more {
    height: 20px;

    margin: auto;
    display: block;
    margin-bottom: 10px;
}
</style>
