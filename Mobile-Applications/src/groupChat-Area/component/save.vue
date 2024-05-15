<template>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
  
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
    <MessagesTransmitter></MessagesTransmitter>
    <MessagesRecipient></MessagesRecipient>
   
    <MessagesTransmitter></MessagesTransmitter>
</template>

<script setup>
import MessagesRecipient from './../component/MessagesRecipient.vue'
import MessagesTransmitter from './../component/MessagesTransmitter.vue'
import axios from 'axios';


</script>

<script>
export default {
  methods: {
    async getMessages() {
      let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=fetchmessages", {
        params: {
          token: "sqlF6fJU"
        }
      }).catch(function (error){
        
      })

    
      console.log(result)
     
    }
  },
}

</script>