<template>
 <div>
    <form @submit.prevent="submitform">
       <input type="text" v-model="formdata.name"> 
       <input type="text" v-model="formdata.email"> 
       <input type="text" v-model="formdata.password"> 
       <input type="text" v-model="formdata.password"> 
       <button type="submit">
         Submitform
       </button>
    </form>
 </div>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'Admin',
  data () {
    return {
       formdata:{ name: '', email: '', password: '' }
       // this is formdata object to store form values
    }
},
  methods: {
        submitForm(){
            axios.post('/api/users', this.form)
                 .then((res) => {
                     console.log("added user to database" + res)
                 })
                 .catch((error) => {
                     console.log("error :" + error)
                 }).finally(() => {
                     console.log("done")
                 });
        }
    }
}
</script>