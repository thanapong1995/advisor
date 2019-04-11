<template>
  <v-dialog persistent  v-model="deleteDialogOpen" max-width="500">
    <v-card class="text-xs-center">
      <v-card-title class="headline justify-center" >ลบปลัดจังหวัด</v-card-title>
      <v-card-text>
        กรุณายืนยันการลบข้อมูล เลขประจำตัวประชาชน: {{selectedPerson.pid}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat"  @click="onDialogSubmit">บันทึก</v-btn>
        <v-btn color="red darken-1" flat="flat"  @click="onDialogClose">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import swal from 'sweetalert'
  import {mapActions} from 'vuex'
  export default {
    name: 'AddItemSubTypeDialog',
    props: {
      deleteDialogOpen: Boolean,
      selectedPerson: Object
    },
    methods: {
      ...mapActions('deputyStore', ['deleteDeputy']),
      onDialogClose () {
        this.$emit('clearSelectedPerson')
        this.$emit('dialogChangeStatus', false)
      },
      async onDialogSubmit () {
        const result = await this.deleteDeputy(this.selectedPerson.id)
        if (result === true) {
          // await this.getVehicleTypeList(this.selectedCategory.vehicleCategory)

          this.$emit('dialogComplete')
          this.onDialogClose()
        }
      }
    }
  }
</script>

<style scoped>

</style>
