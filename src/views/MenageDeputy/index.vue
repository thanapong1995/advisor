<template>
  <v-container>
    <!--<manageDeputyChief />-->
    <manageDeputyDistrict/>
  </v-container>
</template>

<script>
  import manageDeputyChief from './ManageDeputyChief'
  import manageDeputyDistrict from './ManageDeputyDistrict'
  export default {
    name: 'Index',
    components: {
      manageDeputyChief,
      manageDeputyDistrict
    }
  }
</script>

<style scoped>

</style>
