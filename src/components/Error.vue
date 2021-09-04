<template>
  <div class="d-flex error pb-1 pt-1 flex-jc-center" :class="{ round }">
    <span>{{ error }}</span>
    <button class="close-button icon-button" @click="$emit('dismiss')">
      <v-icon name="times" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    error: String,
    round: {
      type: Boolean,
      required: false,
      default: false
    }
  },
}
</script>

<style>
div.error {
  color: white;
  font-weight: bold;
  font-size: 10pt;
  background: rgb(219, 59, 33);
  padding: 0 30px;
  position: relative;
}

div.error.round {
  border-radius: 5px;
}

button.close-button.icon-button {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 100%;
  color: white;
}
</style>
