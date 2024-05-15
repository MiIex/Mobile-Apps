<template>
  <div class="flex justify-content-center">
    <form @submit.prevent="submitForm">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="username" placeholder="Username" :class="{ 'p-invalid': $v.username.$error }" />
      </InputGroup>
      <div v-if="$v.username.$error" class="p-error">Name is required.</div>
      <div v-if="$v.username.$error" class="p-error">Name must be 8 characters and a HSE ID</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="nickname" placeholder="Nickname" :class="{ 'p-invalid': $v.nickname.$error }" />
      </InputGroup>
      <div v-if="$v.nickname.$error" class="p-error">Name is required.</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="fullname" placeholder="Ganzer Name" :class="{ 'p-invalid': $v.fullname.$error }" />
      </InputGroup>
      <div v-if="$v.fullname.$error" class="p-error">Name is required.</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <Password v-model="password" placeholder="Passwort" :class="{ 'p-invalid': $v.password.$error }" toggleMask
          :feedback="false" />
      </InputGroup>
      <div v-if="$v.password.$error" class="p-error">Password is required.</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <Password v-model="repeatPassword" placeholder="Passwort wiederholen" :class="{ 'p-invalid': $v.repeatPassword.$error }" toggleMask
          :feedback="false" />
      </InputGroup>
      <div v-if="$v.repeatPassword.$error" class="p-error">Password is required.</div>
      <Button type="submit" class="p-button p-button-primary">Submit</Button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators'
import axios from 'axios';
var username = ref(null);
var nickname = ref(null);
var password = ref(null);
var repeatPassword = ref(null);
var fullname = ref(null);
let checked = ref(false)

const rules = computed(() => (
  {
    username: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(8),
    },
    nickname: {
      required
    },
    fullname: {
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs(password)
    }

  }
));

const $v = useVuelidate(rules, { username, nickname, fullname, password, repeatPassword });
console.log($v);
const submitForm = () => {
  const result = $v.value.$validate();
  result.then((res) => {
    if (res) {
      console.log(this.$store.state.token)
    }
  }).catch((err) => {
    console.log(err);
  })
};
</script>

<script>
 export default  {
  methods: {
    async registry(username, nickname, password, repeatPassword, fullname) {
      console.log(password)
      console.log(repeatPassword)
      if (password === repeatPassword) {
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
.login-container {
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  background-color: rgb(255, 255, 255);
}

.registry-btn {
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
