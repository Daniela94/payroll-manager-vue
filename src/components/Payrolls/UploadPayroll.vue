<template>
  <div class="upload-payroll">
    <button class="compact ui button primary" @click="openCloseForm">Nueva nómina</button>
    <form class="ui form upload-payroll__form" @submit.prevent="handleSubmit" :class="{open: showForm}">
      <div class="field">
        <label for="file" class="ui icon button">
          <i class="file icon" />
          Seleccionar nómina
          <span v-if="file">{{file.name}}</span>
        </label>
        <input type="file" id="file" style="display: none" @change="uploadFile"/>
        <div class="field">
          <div class="ui calendar">
            <div class="ui input left icon">
              <input type="date" @change="changeDate" :value="date" />
            </div>
          </div>
        </div>
        <button class="ui teal button" :class="{loading}">Subir nómina</button>
        <p v-if="error"> {{error}} </p>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { auth, storage, db } from "../../utils/firebase";

export default {
  name: "UploadPayroll",
  props: {
    getPayrolls: Function,
  },
  setup(props) {

    let showForm = ref(false)
    let file = ref(null)
    let date = ref(null)
    let loading = ref(false)
    let error = ref(null)

    const openCloseForm = () => {
      showForm.value = !showForm.value
    }

    const uploadFile = (e) => {
      // console.log(e.target.files);
      error.value = null
      const fileTemp = e.target.files[0]
      if(fileTemp.type === "application/pdf") {
        file.value = fileTemp
      } else {
        error.value = "Archivo no válido"
      }
    }

    const changeDate = (e) => {
      date.value = e.target.value
    }

    const handleSubmit = async () => {
      if(file.value && date.value) {
        loading.value = true

        try {
          const nameFile = uuidv4()
          const idUser = auth.currentUser.uid
          await storage.
          ref(idUser).child(`${nameFile}.pdf`)
          .put(file.value)
          const payrollUrl = await storage.ref(`${auth.currentUser.uid}/${nameFile}.pdf`).getDownloadURL()

          // le mandamos los datos al firestore
          await db.collection(idUser).add({
            payrollUrl,
            date: new Date(date.value),
            dateString: date.value
          })
          props.getPayrolls()
        } catch (err) {
          console.log(err);
        }
        
        loading.value = false
        file.value = null
        date.value = null
        showForm.value = false
        error.value = null
        document.getElementById("file").value = ""
      } else {
        error.value = "Sube una nómina y selecciona la fecha de la nómina"
      }
    }

    return {
      showForm,
      openCloseForm,
      file,
      date,
      loading,
      error,
      uploadFile,
      handleSubmit,
      changeDate,
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-payroll {
    > .ui.button.primary {
      margin-bottom: 20px;
    }
    &__form {
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 0;
      overflow: hidden;
      transition: height 0.3s ease;

      &.open {
        height: 200px;
      }
    }
  }
</style>