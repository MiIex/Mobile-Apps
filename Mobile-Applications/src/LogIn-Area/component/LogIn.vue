<template>
  <div class="login-container">
    <div class="card flex flex-column md:flex-row gap-3">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="username" placeholder="Username" />
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
      <RouterLink to="/chat" tag="button">
        <Button @click="clicked" label="Log In" class="login-btn"></Button>
      </RouterLink>
      <RouterLink to="/registry" tag="button">
        <Button label="Neuen Account erstellen" class="registry-btn" link></Button>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref(null);
const password = ref(null);
let checked = ref(false);


const clicked = () => {
  console.log(username.value);
  console.log(password.value);
};
</script>

<style lang="scss">
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

  .registry-btn{
    width: 80%;
    margin-left: 10%;
  }

label {
  color: black;
}
</style>
