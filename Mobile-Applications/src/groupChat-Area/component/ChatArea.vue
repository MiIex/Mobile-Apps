<template>
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
</template>

<script setup>
import MessagesRecipient from './../component/MessagesRecipient.vue'
import MessagesTransmitter from './../component/MessagesTransmitter.vue'
import { ref } from 'vue'
import axios from 'axios';
import { useStore } from 'vuex'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

let userhash = store.state.userhash
var messages = ref([])

onMounted(() => {
    getMessages()
    if (!store.state.token) {
        router.push("/login")
    }
})

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
    for (var message of result.data.messages) {
        //messages.value.push({userhash: "VBB2mJqq", text: "hahaha"})
        messages.value.push({ userhash: message.userhash, text: message.text, usernickname: message.usernickname, time: message.time })
    }
    console.log(messages.value)
    console.log(store.state.userhash)


}
</script>

<style scoped>
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
