<template>
        <v-form ref="form" v-model="valid" @submit.prevent="passwordreset">
            <v-text-field 
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
            <v-alert v-if="emailIsValid">
                Email sent!
            </v-alert>
            <v-btn
                :disabled="!valid || loading"
                color="success"
                :loading="loading"
                class="mr-4"
                @click="passwordreset"
                >
                Reinitialiser mon mot de passe
            </v-btn>
            <v-alert v-if="unknown"
            dense
            type="error"
            >
                Utilisateur introuvable
            </v-alert>
        </v-form>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return{
            loading: false,
            valid: false,
            email:'',
            unknown: false,
            errors: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            emailIsValid: false,
            }
    },
    methods:{
        passwordreset(){
            this.loading = true;
            axios.post(this.$api_url + '/passwordreset', {
                email:this.email,
            }).then(res => {

                this.unknown = false
                this.emailIsValid = true;
                this.loading = false;
                this.emailIsValid = true;
            }).catch(error =>{
                    this.emailIsValid = false;
                    this.unknown = true
                    this.errors = error;
                    this.loading = false
                    return
            })
        }
    }
}
</script>
<style>

</style>
