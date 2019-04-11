<template>
  <v-app id="inspire" class="login">
    <v-content>
      <v-container fluid fill-height>

      </v-container>
    </v-content>
  </v-app>
</template>
<script>

  export default {
    name: 'Home',
  }
</script>
<style scoped>
  .card-1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .card-1:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  .card-2 {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .card-3 {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  .card-4 {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  .card-5 {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
  .logo {
    margin-top: 3%;
  }
  .clickDesc {
    font-size: 16px;
  }
  .bar {
    height: 7px;
    background-color: #192058;
  }
  .fullHeight {
    height: 100%;
  }
  .loginTemplate {
    height: 70%;
    max-height: 700px;
  }
  .sideImage {
    /*background-image: url("../assets/sigil.jpg");*/
    /* background-size: 101% auto; */
    background-size: cover;
    background-position: right;
    width: 100%;
    height: 100%;
  }
  .v-alert {
    height: 85px;
    width: 100%;
  }
  .btn:hover {
    cursor: pointer;
    opacity: 0.75;
  }
  .application.theme--light {
    /* background: #61200f; */
    /* background-image: url("../assets/background_.jpg"); */
    /*background-image: url("../assets/sigil_background.jpg");*/
    background-size: cover;
    /* background-size: 100% auto; */
    /* background-image:  */
  }
  hr {
    border-top: 3px solid #303F9F;
  }
  label {
    align-items: center;
  }
  .headline.logoDesc {
    margin: 8px;
    margin-top: 30px;
  }
  .headline {
    color: #192058;
    align-items: center;
  }
</style>
<style>
  .theme--light .v-datatable thead th.column,
  .theme--light .v-datatable thead th.column.sortable.active,
  .theme--light .v-datatable thead th.column.sortable:hover,
  .theme--light .v-datatable thead th.column.sortable.active i {
    color: white;
    background-color: #303F9F;
    font-size: 16px;
  }
  .theme--light .v-datatable .v-datatable thead th.column,
  .theme--light .v-datatable .v-datatable thead th.column.sortable.active,
  .theme--light .v-datatable .v-datatable thead th.column.sortable:hover,
  .theme--light .v-datatable .v-datatable thead th.column.sortable.active i {
    background-color: #303F9F;
    font-size: 16px;
  }
</style>
