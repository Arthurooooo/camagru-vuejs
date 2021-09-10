<template>
    <v-alert v-if="valid">Congrats! You've been verified!</v-alert>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Verified',
    data() {
        return {
        valid: false
    }},
    mounted() {
        axios.get(this.$api_url + '/verify?id=' + this.$route.query.id, {
            id: this.$route.query.id
            })
        .then((res) => {
            if(res.status == 200){
                this.valid = true
            }
        })
        .catch((err) => {
            console.log(err)
        })
        this.$route.query.test
    }
}
</script>