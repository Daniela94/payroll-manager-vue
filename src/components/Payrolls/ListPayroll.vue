<template>
  <div class="list-payroll">
   <p class="list-payroll__not-found" v-if="payrolls?.length === 0">No tienes ninguna nómina, sube la primera.</p>
   <div class="list-payroll__payroll"
    v-for="payroll in payrolls"
    :key="payroll.id"
   >
    <p>{{formaDate(payroll.dateString)}}</p>
    <div class="action">
      <a :href="payroll.payrollUrl" target="_blank" class="compact ui positive button">Descargar</a>
      <a href="#" class="compact ui red button" @click="deletePayroll(payroll.id)">Eliminar</a>
    </div>
   </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/es-mx"
import { auth, db } from "../../utils/firebase";

export default {
  name: "ListPayroll.vue",
  props: {
    payrolls: Array,
    getPayrolls: Function
  },
  setup(props) {
    const formaDate = (date) => {
      return moment(date).format("MMMM [del] YYYY")
    }

    const deletePayroll = async id => {
      try {
        await db.collection(auth.currentUser.uid)
        .doc(id)
        .delete()
        props.getPayrolls()
      } catch (err) {
        console.log(err);
      }
    }

    return {
      formaDate,
      deletePayroll,
    }
  },
}
</script>

<style lang="scss" scoped>
  .list-payroll {
    &__note-found {
      text-align: center;
      font-size: 20px;
    }

    &__payroll {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0 10px;

      p {
        margin: 0;
        text-transform: uppercase;
        font-weight: bold;
      }
    }
  }
</style>