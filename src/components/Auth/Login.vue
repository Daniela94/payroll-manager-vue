<template>
  <div class="login">
    <h1>Iniciar sesión</h1>
    <form class="ui form" @submit.prevent="onLogin">
      <div class="field">
        <input type="text" placeholder="Correo electrónico" v-model="formData.email" :class="{error: formError.email}">
      </div>
      <div class="field">
        <input type="password" placeholder="Contraseña" v-model="formData.password" :class="{error: formError.password}">
      </div>
      <button type="submit" class="ui teal button fluid" :class="{loading}"> Entrar </button>
      <p @click="changeForm">Crear una cuenta</p>
    </form>
  </div>
</template>

<script>
import * as Yup from "yup";
import { ref } from "vue";
import { auth } from "../../utils/firebase";

export default {
  name: "Login",
  props: {
    changeForm: Function,
  },
  setup() {
    let formData = {}
    let formError = ref({})
    let loading = ref(false)

    const onLogin = async () => {
      loading.value = true
      formError.value = {}
      try {
        await schemeForm.validate(formData, {abortEarly: false})
        
        try {
          const {email, password} = formData
          auth.signInWithEmailAndPassword(email, password)
         } catch (err) {
          console.log(err);
        }

      } catch (err) {
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message
        })
      }
      loading.value = false
    }

    const schemeForm = Yup.object().shape({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true)
    })

    return {
      formData,
      onLogin,
      formError,
      loading,
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
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