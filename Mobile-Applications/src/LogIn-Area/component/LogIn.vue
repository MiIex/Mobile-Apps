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
              <i class="pi pi-key"></i>
          </InputGroupAddon>
        <Password v-model="value"  toggleMask :feedback="false" />
      </InputGroup>
      <div class="card flex justify-content-center">
    </div>
  </div>
    <RouterLink to="/chat" tag="button" >
      <Button label="Log In" class="login-btn"></Button>
    </RouterLink>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const value = ref(null);
</script>

<style lang="scss">
  .login-container{
    margin-left: auto;
    margin-right: auto;
    width: 85%;
    background-color: rgb(255, 255, 255);
  }


  .login-btn{
    width:50%;
    margin-left: 25%;
    margin-right: auto;
  }
</style>

