<template>

  <v-navigation-drawer
    style="overflow:hidden;"
    app
    fixed
    clipped
  >
    <v-card class="text-xs-center">
      
      <v-card-title  primary-title  class="text-xs-center">
        <div class="container">
          <h4 class="title font-weight-bold " >{{emp.USER_NAME}} </h4>
          <h4 class="title  font-weight-bold ">ชื่อ : {{emp.NAME}}</h4>
          <h4 class="subheading  font-weight-bold ">ระดับผู้ใช้งาน : {{getPermiss(emp.PERMISS)}}</h4>
        </div>
      </v-card-title>
    </v-card>
    <v-list >

      <v-list-tile  @click="onBackToMainMenu">
        <v-list-tile-action>
          <v-icon>view_module</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>กลับเมนูหลัก</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>


      
    </v-list>
    <v-list dense>
      <template  v-if="selectedMenu">
        <div  v-for="items in selectedMenu.menuGroup">

          <!--:prepend-icon="items.action"  no-action  :value="items.active"-->
          <v-list-group  :prepend-icon="items.action" v-model="items.active"   :key="items.menuName" no-action>

            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title v-html="items.menuName" ></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <template v-for="subItem in items.menuItem">
              <v-tooltip  allow-overflow right  :key="subItem.name"      >
                <v-list-tile slot="activator"   v-model="subItem.active" :to="subItem.path" router-link  >
                  <v-list-tile-content  >
                    <!-- <v-list-tile  v-model="subItem.active" slot="activator" :to="subItem.link" router-link @click="subItem.click">
              <v-list-tile-content  :prepend-icon="subItem.action" > -->
                    <v-list-tile-title> {{subItem.name}}</v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-icon>{{ subItem.action }}</v-icon>
                  </v-list-tile-action>

                </v-list-tile>

                <span>{{ subItem.name }}</span>
              </v-tooltip>
            </template>
          </v-list-group>

        </div>
      </template>
    </v-list>
    
    <v-list>
<v-list-tile @click="onLogoutBtnClick" >
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ออกจากระบบ</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {  mapGetters, mapState, mapActions } from 'vuex'
import menuList from '../Menu/menuList'
import  swal from 'sweetalert'
export default {
  name: 'Navigation',
  props: {
    initMini: {
      type: Boolean
    },
  },
  async mounted(){
    console.log(this.emp)
    this.menu =[menuList]
    this.selectedMenu = this.menu[0]
    await this.getCCDescList()

  },
  data() {
    return {
      test:'fff',
      menu:[],
      selectedMenu: null

    }
  },
  computed: {
    ...mapState({
      emp: state => state.empStore.emp,
      groupItem: state => state.empStore.groupItem,
      ccDescList: state => state.ccaattmmStore.ccDescList
    }),
    displayCC: {
      get () {
        const {EMP_CCAA} = this.emp
        const [result] = this.ccDescList.filter(row => row.cc_code === EMP_CCAA.substring(0,2))
        console.log(result)
        if (!result) return ''
        return result.cc_desc
      }
    },
  },
  methods: {
    ...mapActions({
      getCCDescList: 'ccaattmmStore/getCCDescList'
    }),
    getPermiss(item){
      if(item==`0`){
        return 'อาจารย์'
      }  
    },
    formatPID (item) {
      var pid1 = item.substring(0, 1)
      var pid2 = item.substring(1, 5)
      var pid3 = item.substring(5, 10)
      var pid4 = item.substring(10, 12)
      var pid5 = item.substring(12, 13)
      return pid1 + '-' + pid2 + '-' + pid3 + '-' + pid4 + '-' + pid5
    },
    getGroup(item){
      let [result] = this.groupItem.filter(row => row.value==this.emp.EMP_GROUP);
      console.log(result)
      return result.text
    },
    getCCAA(item){
      
    },
    getName(item){
      if(item.EMP_MNAME){
        return item.EMP_FNAME+' '+item.EMP_MNAME+' '+item.EMP_LNAME
      }
      else{
        return item.EMP_FNAME+' '+item.EMP_LNAME
      }
    },
    onBackToMainMenu(){
      this.$router.push('/menu')
      // this.$store.commit('empStore/SET_EMP',null)
    },
    onLogoutBtnClick() {
      swal({icon:'warning', title:'กรุณายืนยันการออกจากระบบ', buttons: true}).then((value) => {
        if(value=== true){
          this.$store.commit('empStore/SET_EMP',null)
        }
      })
    }
  }
    // items: {
    //   type: Object,
    //   default: _ => []
    // }
}
</script>
<style scoped>
  .v-list__group__header .v-list__group__header__append-icon{
    padding-left: 5px;
  }
  .v-list {
    padding: 0px;
  }
  .menunav {
    margin-left: 25px;
  }
  .v-card-actions {
    align-items: center;
  }
  img {
    margin-top: 10px;
  }
  .font-weight-bold {
    /* margin-left: 24px; */
    font-family: "CSChatThaiUI" !important;
    color: #4a1212b5;
  }
  .list-hotfix {
    flex: 1 1 auto !important;
    overflow: hidden;
  }
  .v-list__tile {
    flex: 1 1 auto !important;
    overflow: hidden;
  }
  .container {
    padding: 0 !important;
    text-align: center!important;
}
</style>
