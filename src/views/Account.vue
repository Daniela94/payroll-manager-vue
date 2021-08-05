<template>
  <div class="account">
    <BasicLayout>
      <div class="account__section">
        <p class="title">Cambiar nombre <span v-if="user.displayName">({{user.displayName}})</span></p>
        <ChangeName />
      </div>

      <div class="account__section">
        <p class="title">Cambiar Email <span>({{user.email}})</span></p>
        <ChangeEmail />
      </div>

      <div class="account__section">
        <p class="title">Cambiar Contraseña</p>
        <ChangePassword />
      </div>

    </BasicLayout>
  </div>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout";
import { useStore } from "vuex";
import { computed } from "vue";
import ChangeName from "../components/Account/ChangeName";
import ChangeEmail from "../components/Account/ChangeEmail";
import ChangePassword from "../components/Account/ChangePassword";

export default {
  name: "Account",
  components: {
    BasicLayout,
    ChangeName,
    ChangeEmail,
    ChangePassword
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user )
    
    return {
      user
    }

  }

}
</script>

<style lang="scss" scoped>
  .account {
    h1 {
      margin: 50px 0;
      text-align: center;

    }
    &__section {
      position: relative;
      padding: 10px;
      border: 1px solid #16212b;
      padding-top: 25px;
      margin-top: 40px;

      .title {
        position: absolute;
        top: -12px;
        background-color: #16212b;
        color: #fff;
        padding: 2px 10px;
      }
    }
  }
</style>