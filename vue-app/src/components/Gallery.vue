<template>
  <table>
    <tr>
      <td>
        <img v-img src="/assets/culture1.jpg">
      </td>
      <td>
        <img src="../assets/culture2.jpg" />
      </td>
      <td>
        <img src="../assets/culture3.jpg" />
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
     components:{
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
</style>