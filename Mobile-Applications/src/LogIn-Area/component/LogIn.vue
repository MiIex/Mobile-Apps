<template>
  <div class="login-container">
    <div class="card flex flex-column md:flex-row gap-3">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="username" placeholder="Username" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <Password v-model="password" placeholder="Passwort" toggleMask :feedback="false" />
      </InputGroup>
      <div class="flex align-items-center">
        <label for="stay-signed-in" class="ml-2"> Eingeloggt bleiben </label>
        <Checkbox v-model="checked" inputId="stay-signed-in" name="pizza" value={{checked}} />
      </div>
      
        <Button @click="logIn(username, password)" label="Log In" class="login-btn"></Button>
    
      <RouterLink to="/registry" tag="button">
        <Button label="Neuen Account erstellen" class="registry-btn" link></Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'
var username = ref(null)
var password = ref(null);
let checked = ref(false);
</script>

<script>
export default {
  methods: {
    async logIn(username, password) {
      let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=login", {
        params: {
          userid: username,
          password: password
        }
      })
      
      this.$store.commit('logIn', result)
      this.$router.push("/chat")
      console.log(this.$store.state.token)
    }
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  background-color: rgb(255, 255, 255);
}

.login-btn {
  width: 50%;
  margin-left: 25%;
  margin-right: auto;
}

.registry-btn {
  width: 80%;
  margin-left: 10%;
}

.login-btn {
  width: 50%;
  margin-left: 25%;
  margin-right: auto;
}

label {
  color: black;
}
</style>
