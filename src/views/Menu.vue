<template>
  <v-layout>
    <v-flex xs12>
      <v-toolbar flat>
        <v-toolbar-title>เมนู</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>

        <v-layout wrap>
          <v-flex xs4 md3 pa-2 v-for="(subItem, index) in items">
            <transition name="fade-transition">
              <v-card color="white"  @click="clickMenu(index)">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">การจัดการข้อมูล</div>
                    <div class="headline">{{subItem.title}}</div>
                    <span>{{subItem.subtitle}}</span>
                  </div>
                  <template>
                    <v-progress-linear
                      :color="items[index].color"
                      height="10"
                      value="100"
                    ></v-progress-linear>
                  </template>
                </v-card-title>
              </v-card>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import {  mapState } from 'vuex'

import axios from 'axios'
export default {
  name: 'Menu',
  data () {
    return {
      drawer: null,
      click: null,
      
    }
  },
  props: {
    items: {
      type: Array
    },
  },
  computed: {
    ...mapState({
      emp: state => state.empStore.emp
    }),
    // notificationObject: {
    //   get () {
    //     // this.$store.state.notificationStore.notificationVolunteerTransferring
    //     return {
    //       transferNotification: this.$store.state.notificationStore
    //         .notificationVolunteerTransferring,
    //       reNotification: this.$store.state.notificationStore.notificationRe,
    //       vehicleExpireNotification: this.$store.state.notificationStore.notificationVehicleExpire
    //     }
    //   }
    // }
  },
  async mounted () {
      console.log(this.itemUser)
      console.log(this.items)
    // await this.getNotiVolTransfer()
    // await this.getNotiRe()
    // await this.getExpireVehicleNotification()
  },
  methods: {
    getNotification (item) {
      for (let i in item) {
        if (typeof this.notificationObject[i] !== 'undefined') {
          return true
        }
      }
      return false
    },
    mapNotification (item) {
      for (let i in item) {
        if (typeof this.notificationObject[i] !== 'undefined') {
          return this.notificationObject[i]
        }
      }
      return ''
    },
    clickMenuUser(indexMenu){
      this.$router.push('/' + this.itemUser[indexMenu].click)
    },
    clickMenu (indexMenu) {
      // console.log(indexMenu)
      // this.$log.info('test','Menu:' +indexMenu, 123)
      // (this.items[indexMenu].editPosition) ? this.setEditPositionFlag(true) : this.setEditPositionFlag(false)

      // this.setSelectMenu('true')
      this.$router.push('/' + this.items[indexMenu].click)
      // this.setIndexMenu(indexMenu)
    },
    getnoti: async function () {
      // console.log(this.persons.cc);
      const res = await axios.get('/or/server/public/api/person/getnoti')
      // this.raceGroup = res.data.data;
      console.log(res)
    }
  }
}
</script>
<style scoped>

.v-card:hover {
  cursor: pointer;
  opacity: 0.85;
}

.menuCard:hover {
  cursor: pointer;
}
.menuCard {
  padding-top: 40px;
  padding-bottom: 30px;
  background-size: 50% auto;
  background-position: right top;
  overflow: hidden;
}

.menuLabel {
  font-size: 22px;
  line-height: 30px;
  margin-top: 10px;
  margin-bottom: 4px;
}

.background-icon {
  position: absolute;
  opacity: 0.075;
  top: 10%;
  left: 15%;
}

.background-icon .icon {
  font-size: 300px;
}
</style>
