<template>
  <v-footer app>
    <v-col class="text-center" cols="12">
      <v-icon>mdi-copyright</v-icon>
      {{ new Date().getFullYear() }} —
      <strong>BSD 2.0 License. All right reserved</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped></style>
