<template>
  <v-container>
    <manageOfficialProvince />
    <!--<manageDeputyDistrict/>-->
  </v-container>
</template>

<script>
  import manageOfficialProvince from './ManageOfficialProvince'
  import manageDeputyDistrict from './ManageDeputyDistrict'
  export default {
    name: 'Index',
    components: {
      manageOfficialProvince,
      manageDeputyDistrict
    }
  }
</script>

<style scoped>

</style>
