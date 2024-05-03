<template>
  <div class="login-container">
    <div class="card flex flex-column md:flex-row gap-3">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText placeholder="Username" v-model="username"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText placeholder="Nickname" v-model="nickname"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText placeholder="Name" v-model="fullname"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <Password v-model="password" placeholder="Passwort" toggleMask :feedback="false" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <Password v-model="repeatPassword" placeholder="Passwort wiederholen" toggleMask :feedback="false" />
      </InputGroup>
      <div class="flex align-items-center">
        <label for="stay-signed-in" class="ml-2"> Eingeloggt bleiben </label>
        <Checkbox v-model="checked" inputId="stay-signed-in"  value={{checked}} />
      </div>
      
        <Button label="Account erstellen" @click="registry(username, nickname, password, repeatPassword, fullname)" class="registry-btn"></Button>
     
      <RouterLink to="/login" tag="button">
        <Button label="Zurück zum Login" class="login-btn" link></Button>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
var username = ref(null);
var nickname = ref(null);
var password = ref(null);
var repeatPassword = ref(null);
var fullname = ref(null)

let checked = ref(false)
</script>

<script>
export default {
  methods: {
    async registry(username, nickname, password, repeatPassword, fullname) {
      console.log(password)
      console.log(repeatPassword)
      if(password === repeatPassword){
      let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=register", {
        params: {
          userid: username,
          password: password,
          nickname: nickname,
          fullname: fullname,
        }
      })
      
      this.$store.commit('logIn', result)
      this.$router.push("/chat")
    } else {
      console.warn("passwörter stimmen nicht überein")
    }
    }
  },
}
</script>

<style lang="scss" scoped>
  .login-container{
    margin-left: auto;
    margin-right: auto;
    width: 85%;
    background-color: rgb(255, 255, 255);
  }

  .registry-btn{
    width: 80%;
    margin-left: 10%;
  }

.login-btn {
  width: 80%;
  margin-left: 10%;
  margin-right: auto;
}

label {
  color: black;
}
</style>
