<template>
  <table>
    <pre>
      {{  }}
    </pre>
    <tr>
      <td v-for="i in 3" :key="i.id">
        <img v-img contain :src="`http://localhost:8080/photo${i}.jpg`">
      </td>
    </tr>
    <tr>
      <td>"photo 4"</td>
      <td>"photo 5"</td>
      <td>"photo 6"</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Gallery",
  props: {
    value: {
      type: String,
      default: "Salut"
    },
  },
  data() {
    return {
      totalVuePackages: null
    };
  },
    created() {
    // Simple GET request using fetch
    fetch("https://api.npms.io/v2/search?q=vue")
      .then(response => response.json())
      .then(data => (this.totalVuePackages = data.total));
  }
};

</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
  color: green;
}
table td {
  border: 1px solid blue;
}
table {
  margin-left: auto;
  margin-right: auto;
}
img {
  width: 30vw;
  height: auto;
}
</style>