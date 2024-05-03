<template>
  <div class="login-container">
    <div class="card flex flex-column md:flex-row gap-3">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText placeholder="Username" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText placeholder="Nickname" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <Password v-model="value" placeholder="Passwort" toggleMask :feedback="false" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <Password v-model="value" placeholder="Passwort wiederholen" toggleMask :feedback="false" />
      </InputGroup>
      <div class="flex align-items-center">
        <label for="stay-signed-in" class="ml-2"> Eingeloggt bleiben </label>
        <Checkbox v-model="checked" inputId="stay-signed-in" name="pizza" value={{checked}} />
      </div>
      
        <Button label="Account erstellen"  class="registry-btn"></Button>
     
      <RouterLink to="/login" tag="button">
        <Button label="Zurück zum Login" class="login-btn" link></Button>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(null);
let checked = ref(false)
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
