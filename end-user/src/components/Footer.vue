<template>
  <v-col class="text-center" cols="12">
    <v-icon>mdi-copyright</v-icon>
    {{ new Date().getFullYear() }} —
    <strong> BSD 3-Clause "New" License. All right reserved</strong>
  </v-col>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped />