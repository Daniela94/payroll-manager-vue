<template>
  <div class="auth">
    <!-- <h1>Estamos en auth</h1> -->
    <Login v-if="showLogin" :changeForm="changeForm" />
    <Register v-if="!showLogin" :changeForm="changeForm" />
  </div>
</template>

<script>
import { ref } from "vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";

export default {
  name: "Auth",
  components: {
    Login,
    Register,
  },
  setup() {
    let showLogin = ref(true)

    const changeForm = () => {
      showLogin.value = !showLogin.value
    }

    return {
      showLogin,
      changeForm
    }
  },
}
</script>

<style lang="scss">
  .auth {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(4, 121, 157);
    background: linear-gradient(
      0deg,
      rgba(4, 121, 157, 1) 0%,
      rgb(123, 213, 255) 100%
    );
  }
</style>