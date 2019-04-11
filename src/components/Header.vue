<template>
  <v-toolbar
    app
    fixed
    clipped-left
    height="88"
    dark
    :color=" backgroundColor || 'indigo darken-1'"
  >
    <v-layout wrap align-end justify-space-between reverse fill-height>
      <v-flex xs2 sm2 md2 lg3 xl2 class="toolbar-item">
        <v-layout row align-center justify-center reverse fill-height>
          <v-flex hidden-sm-and-down>
            <v-flex class="head">
              {{ systemName }}
            </v-flex>
            
          </v-flex>
          <v-flex xs3>
            <v-avatar size="5.2rem">
              <!-- <img src="../assets/VDC_LOGO.png" alt="#"> -->
            </v-avatar>
          </v-flex>

          <v-flex class="hidden-lg-and-up">
            <v-toolbar-side-icon @click.stop="()=>setDrawer(true)"></v-toolbar-side-icon>
          </v-flex>
         
        </v-layout>
      </v-flex>
        

      <v-flex md4 lg3 xl2 text-md-right hidden-sm-and-down pr-2 class="toolbar-item">
        <v-flex caption mt-1 headline>
          <span style="font-size:18px;" v-if="date">{{ date }}</span>
          <span style="font-size:18px;" class="ml-2" v-if="time">{{ time }} น.</span>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
// import headerBackgroundImage from '../assets/bg_header.png'

export default {
  name: 'Header',
  props: [
    'systemName',
    'backgroundColor'
  ],
  methods: {
  },
  data () {
    return {
      date: null,
      time: null
    }
  },
  computed: {
  },
  mounted () {
    require('moment/locale/th')
    let [d, m, y] = moment().format('LL').split(' ')
    y = Number(y)
    y += 543
    this.date = d + ' ' + m + ' ' + y
    // this.date = '25 มกราคม 2562'
  },
  async created () {
    setInterval(_ => {
      this.time = moment().format('HH:mm:ss')
    }, 1000)
  }
}
</script>

<style scoped>
  .head {
    font-size: 24px !important;
    line-height: 32px !important;
    font-weight: 400;
    letter-spacing: normal !important;
  }
  .t {
    font-size: 20px !important;
    font-weight: 500;
    line-height: 1 !important;
    letter-spacing: normal !important;
  }
  /*.headline,.title { font-family: "CSChatThaiUI !!important"}*/
  /*@font-face {*/
  /*font-family: "CSChatThaiUI";*/
  /*src: url("../fonts/Kanit-Regular.ttf") format("truetype");*/
  /*}*/
  #maintoolbar .v-toolbar__content {
    padding: 0 0 !important;
  }
  #maintoolbar .v-toolbar {
    position: relative;
  }
  .v-toolbar {
    background-repeat: repeat-x;
    background-color: #831e29 !important;
  }
  .ellipsis-overflow-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-avatar {
    justify-content: left;
    margin-bottom: 12px;
  }
  .center {
    margin-bottom: 23px;
  }
</style>
