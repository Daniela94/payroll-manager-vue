<template>
  <div>
    
    <template v-if="user">
      <router-view />
    </template>
    <Auth v-if="!user && user !== undefined" />

  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { auth } from "./utils/firebase";
import Auth from "./views/Auth";

export default {
  name: 'App',
  components: {
    Auth,
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user )
    
    // const user = store.state.user

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        store.commit("setUser", user)
      })
    })

    return {
      user
    }
  }
}
</script>

<style lang="scss">

</style>
