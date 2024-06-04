<template>

    <div class="messages-container">
    <div class="header">
        <RouterLink to="/chat" tag="button">
            <Button><i class="pi pi-angle-left"></i></Button>
        </RouterLink>
        <h2>Groupchat</h2>
    </div>
        <template v-for="message in messages">
            <MessagesTransmitter v-if="message.userhash == userhash" :text="message.text" :time="message.time">
            </MessagesTransmitter>
            <MessagesRecipient v-else :name="message.usernickname" :text="message.text" :time="message.time">
            </MessagesRecipient>
        </template>
    </div>
    <div class="background-layer" :style="backgroundLayerStyle"></div>
</template>

<script setup>
import MessagesRecipient from './../component/MessagesRecipient.vue';
import MessagesTransmitter from './../component/MessagesTransmitter.vue';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

let key = store.state.token;
let userhash = store.state.userhash
var messages = ref([]);

onMounted(() => {
    getMessages();
    if (!store.state.token) {
        router.push("/login");
    }
    console.log(store.state.userhash)
});

const getMessages = async () => {
    let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/index.php/?request=getmessages", {
        params: {
            token: store.state.token
        }
    }).catch(function (error) {

    })
    console.log(result.data.messages)
    let lastMessages = result.data.messages.slice(-20)
    console.warn(lastMessages)
    for (var message of lastMessages) {
        //messages.value.push({userhash: "VBB2mJqq", text: "hahaha"})
        messages.value.push({ userhash: message.userhash, text: message.text, usernickname: message.usernickname, time: message.time })
    }
    console.log(messages.value)
    console.log(store.state.userhash)
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

.header{
    display: flex;
    height: 60px;
    border: solid;
    border-width: 1px;
}

Button{
  height: 40px;
  top: 10px;
 
}


</style>
