<template>
  <BasicLayout>
    <div class="payrolls">
      <h1>Mis nóminas</h1>
      <UploadPayroll 
        :getPayrolls="getPayrolls" />
      <ListPayroll 
        :payrolls="payrolls" 
        :getPayrolls="getPayrolls" />
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout.vue";
import UploadPayroll from "../components/Payrolls/UploadPayroll.vue";
import { ref, onMounted } from "vue";
import { auth, db } from "../utils/firebase";
import ListPayroll from "../components/Payrolls/ListPayroll.vue";

export default {
  name: "Payrolls",
  components: {
    BasicLayout,
    UploadPayroll,
    ListPayroll,
  },
  setup() {

    let payrolls = ref(null)

    onMounted(() => {
      getPayrolls()
    })
    
    const getPayrolls = async () => {
      // console.log("Obteniendo nóminas");
      const response = await db.collection(auth.currentUser.uid)
      .orderBy("date", "desc")
      .get()

      const result = []

      response.docs.forEach((doc) => {
        // console.log(doc.data());
        const data = doc.data()
        data.id = doc.id
        result.push(data)
      })
      payrolls.value = result
    }


    return {
      payrolls,
      getPayrolls,
    }
  }
}
</script>

<style lang="scss" scoped>
  .payrolls {
    margin: 50px 0;
    text-align: center;
  }
</style>