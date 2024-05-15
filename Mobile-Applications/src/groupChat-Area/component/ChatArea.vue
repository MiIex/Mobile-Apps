<template>
    <template v-for="message in messages">
        <MessagesTransmitter 
        v-if="message.userhash == key"
        :text="message.text"
        :time="message.time"
        ></MessagesTransmitter>
        <MessagesRecipient v-else 
        :name="message.usernickname"
        :text="message.text"
        :time="message.time"></MessagesRecipient>
    </template>
</template>

<script setup>
import MessagesRecipient from './../component/MessagesRecipient.vue'
import MessagesTransmitter from './../component/MessagesTransmitter.vue'
import { ref } from 'vue'
import axios from 'axios';
import { useStore } from 'vuex'
import { onMounted } from 'vue';
const store = useStore()

let key = store.state.token
var messages = ref([])

onMounted(() => {
    getMessages()
})

const getMessages = async () => {
    let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=fetchmessages", {
        params: {
            token: store.state.token
        }
    }).catch(function (error) {

    })
    let lastMessages = result.data.messages.slice(-5)
    for (var message of lastMessages) {
        messages.value.push({userhash: "sqlF6fJU", text: "hahaha"})
        messages.value.push({ userhash: message.userhash , text: message.text, usernickname: message.usernickname, time: message.time})
    }
        

}
</script>
