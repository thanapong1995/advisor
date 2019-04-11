<template>
  <div>
    <login v-if="!emp"></login>
    <Index v-else></Index>
  </div>
</template>
<script>
  import login from './views/Login/Login.vue'
  import Index from './views/Index.vue'
  // import Index from './views/AboutUser/User.vue'


  export default {
    name: 'App',
    components: {
      login,
      Index
    },
    computed: {
      emp: {
        get () {
          return this.$store.state.empStore.emp
        }
      }
    },
    methods: {}
  }
</script>
<style >
  .headline,.title { font-family: "CSChatThaiUI"}
  @font-face {
    font-family: "CSChatThaiUI";
    src: url("../fonts/Kanit-Regular.ttf") format("truetype");
  }

  .login {
    background-color: #303F9F !important;
  }

  hr {
    border-top: 3px solid #303F9F;
  }
  body {
    overflow-y: hidden;
  }
  label {
    color: #303F9F;
  }
  .v-input input,
  .v-menu__activator {
    max-height: 25px;
  }
  hr {
    background-color: #303F9F;
    height: 2px;
    border: none;
  }
  .v-input .v-label {
    width: auto;
    font-size: 14px;
    color: #303F9F;
  }
  .v-text-field .v-label--active {
    max-width: none;
    font-size: 20px;
  }
  .v-text-field {
    margin-top: 8px;

  }
  .v-textarea.v-text-field--box.v-text-field--single-line .v-text-field__prefix,
  .v-textarea.v-text-field--box.v-text-field--single-line textarea,
  .v-textarea.v-text-field--enclosed.v-text-field--single-line
  .v-text-field__prefix,
  .v-textarea.v-text-field--enclosed.v-text-field--single-line textarea {
    margin-top: 0px;

  }

  * {
    font-family: "CSChatThaiUI";
    font-size: 16px;
  }

  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }

  hr {
    background-color: #303F9F;
    height: 2px;
    border: none;
  }

  label {
    color: #303F9F;
  }

  .v-input input,
  .v-menu__activator {
    max-height: 25px;
  }

  .v-input .v-label {
    width: auto;
    font-size: 16px;
    color: #303F9F;
  }

  .v-text-field .v-label--active {
    max-width: none;
    font-size: 18px;
  }
  table.v-table tbody td {
    font-size: 16px;
  }
  .v-text-field {
    margin-top: 8px;
  }

  .v-textarea.v-text-field--box.v-text-field--single-line .v-text-field__prefix,
  .v-textarea.v-text-field--box.v-text-field--single-line textarea,
  .v-textarea.v-text-field--enclosed.v-text-field--single-line
  .v-text-field__prefix,
  .v-textarea.v-text-field--enclosed.v-text-field--single-line textarea {
    margin-top: 0px;
  }

  .v-input--radio-group .v-input__control .v-input__slot {
    margin-bottom: 0px;
  }

  .v-radio {
    align-items: flex-start;
  }

  .v-text-field .v-input__control .v-text-field__details,
  .v-messages {
    display: none;
  }

  .select-label .v-select__selection {
    color: #303F9F;
  }

  .container > label,
  form > label {
    font-weight: bold;
  }

  .flex > label:last-child {
    font-weight: bold;
  }

  .flex > label:first-child {
    color: #303F9F;
    font-weight: normal;
  }

  /* .v-select__selection,.v-input {
        font-size: 14px;
      } */
</style>
