<template>
  <div class="register">
    <h1>Crear cuenta</h1>
    <form class="ui form" @submit.prevent="onRegister">
      <div class="field">
        <input type="text" placeholder="Correo electrónico" :class="{error: formError.email}" v-model="formData.email">
      </div>
      <div class="field">
        <input type="password" placeholder="Contraseña" :class="{error: formError.password}" v-model="formData.password">
      </div>
      <div class="field">
        <input type="password" placeholder="Repetir contraseña" :class="{error: formError.repeatPassword}" v-model="formData.repeatPassword">
      </div>
      <button type="submit" class="ui teal button fluid" :class="{loading}">Registrarme</button>
    </form>
    <p @click="changeForm">Iniciar sesión</p>
  </div>
</template>

<script>
import * as Yup from "yup";
import { ref } from "vue";
import { auth } from "../../utils/firebase";
import LoginVue from './Login.vue';

export default {
  name: "Register",
  props: {
    changeForm: Function
  },
  setup() {
    let formData = {}
    let formError = ref({})
    let loading = ref(false)

    const schemeForm = Yup.object().shape({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
      // Al final le decimos que repeatPassword debe ser igual a password
      repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true)
    })

    const onRegister = async () => {
      // console.log("Registrando usuario...");
      loading.value = true
      // console.log(formData);
      formError.value = {}

      try {
        await schemeForm.validate(formData, {abortEarly: false})
        // console.log("Todo Ok");
        try {
          const { email, password } = formData
          await auth.createUserWithEmailAndPassword(email, password)
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message
        })
      }
      loading.value = false
    }

    return {
      formData,
      onRegister,
      formError,
      loading,
    }
  },
}
</script>

<style lang="scss" scoped>
  .register {
    background: #fff;
    padding: 30px;
    box-shadow: 0 0 38px -5px rgba(0, 0, 0, 0.45);
    width: 380px;
    border-radius: 5px;

    h1 {
      text-align: center;
      margin-bottom: 30px;
    }

    form {
      input.error {
        border-color: #faa;
        background-color: #ffeded;
      }
    }

    p {
      text-align: center;
      margin-top: 30px;

      &:hover {
        cursor: pointer;
        opacity: 0.6;
      }
    }

  }
</style>