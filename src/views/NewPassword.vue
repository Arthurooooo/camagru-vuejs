<template>
    <div>
    <a>Entrez votre nouveau mot de passe</a>
    <v-form v-model="valid">
        <v-text-field 
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordRules.required]"
        type="password"
        label="Nouveau mot de passe"
        ></v-text-field>
        <v-btn
        :disabled="!valid || loading"
        color="success"
        :loading="loading"
        class="mr-4"
        @click="newPassword"
        >Valider</v-btn>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return{
            token: '',
            userID: '',
            valid: false,
            loading: false,
            passwordRules: {
            required: value => !!value || 'Required.',
            },
        }

    },
    methods: { 
        newPassword(){
        axios.post(this.$api_url + '/newpassword', {
        token:this.$route.query.token,
        userID:this.$route.query.userID,
        password:this.password
        })
        }
    }
}
</script>
