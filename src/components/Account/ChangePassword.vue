<template>
  <form class="ui form change-password" @submit.prevent="onChangePassword">
    <div class="three fields">
      <div class="field">
        <input type="password" placeholder="Contraseña actual" v-model="formData.password" :class="{error: formError.password}">
      </div>
      <div class="field">
        <input type="password" placeholder="Nueva contraseña" v-model="formData.newPassword" :class="{error: formError.newPassword}">
      </div>
      <div class="field">
        <input type="password" placeholder="Confirmar nueva contraseña" v-model="formData.repeatNewPassword" :class="{error: formError.repeatNewPassword}">
      </div>
    </div>
    <p v-if="messageError"> {{messageError}} </p>
    <button type="submit" class="compact ui primary button" :class="{loading}">Actualizar</button>
  </form>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
import { auth } from "../../utils/firebase";
import { reauthenticate } from "../../utils/firebaseFunctions";

export default {
  name: "ChangePassword",
  setup() {
    let formData = {}
    let formError = ref({})
    let loading = ref(false)
    let messageError = ref("")

    const schemeForm = Yup.object().shape({
      password: Yup.string().required(true),
      newPassword: Yup.string().required(true),
      repeatNewPassword: Yup.string().required(true).oneOf([Yup.ref("newPassword")], true)
    })

    const onChangePassword = async () => {
      loading.value = true
      formError.value = {}
      messageError.value = ""
      try {
        await schemeForm.validate(formData, {abortEarly: false})
        try {
          const { password, newPassword } = formData
          await reauthenticate(password)
          await auth.currentUser.updatePassword(newPassword)
          auth.signOut()
        } catch (err) {
          messageError.value = err.message
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
      onChangePassword,
      formError,
      loading,
      messageError,
    }
  },
}
</script>

<style lang="scss" scoped>
  .ui.form.change-password {
    text-align: center;

    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }

    .ui.button {
      margin: 20px 0 0 0;
    }
  }
</style>