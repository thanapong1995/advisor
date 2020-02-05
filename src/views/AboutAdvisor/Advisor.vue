<template>
  <v-container pa-0>
    <v-layout row>
      <v-flex xs12>
        <v-tabs v-model="active">
          <v-tab :key="'จัดการข้อมูลอาจารย์ที่ปรึกษา'">จัดการข้อมูลอาจารย์ที่ปรึกษา</v-tab>
          <v-tab-item :key="'จัดการข้อมูลอาจารย์ที่ปรึกษา'">
             <MainAdvisor/>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
    <v-footer height="auto" absolute color="transparent">
      <v-spacer></v-spacer>
    </v-footer>
  </v-container>
</template>
<script>
// บันทึกข้อมูลผู้ใช้งานระบบ

import MainAdvisor from './MainAdvisor.vue'
import CreateAdvisor from './CreateAdvisor.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Advisor',
  data () {
    return {
      active: null,
      button: 'ถัดไป',
      z: 'MainUser',
      item: [],
    }
  },
  props: {

  },
  computed: {
    ...mapState({
      action: state => state.actionPageStore.action
    })
  },
  methods: {
    ...mapActions({
      setAction: 'actionPageStore/setAction'
    })
  },
  mounted () {
    this.setAction(null)
  },
  watch: {
    action () {
      if (this.action) {
        this.z = 'CreateUser'
      } else this.z = 'MainUser'
    }
    
  },
  components: {
    MainAdvisor
  }
}
</script>
