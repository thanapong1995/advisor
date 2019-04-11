<template>
  <v-app>
    <Header
      system-name="Amphoe"
      work-place="หน่วยงานอาสารักษาดินแดน"
      position="Admin"
      background-color="indigo darken-2"
    />
    <Navigation />
    <v-content>
      <router-view :items="getMenu"  :itemclick="name"></router-view>
    </v-content>
  </v-app>
</template>
<script>
import {  mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState({
      emp: state => state.empStore.emp
    }),
    // ...mapState({
    //   emp: state => state.userStore.emp,
    //   IndexMenu: state => state.userStore.IndexMenu,
    //   selectMenu: state => state.userStore.selectMenu
    // }),
    // getMenu () {
    //   if(this.status === 'admin'){
    //     this.result =[...this.admin.menuITem]
    //   }
    //   else{
    //     this.result =[...this.user.menuITem]
    //   }
    //   console.log(this.result)
    //   // this.result = [...this.user.menuItem]
    //   // if (this.status === 'admin') { this.result = [...this.result, ...this.admin.menuItem] }

    //   // console.log(this.user.menuItem)
    //   return this.result
    // }
    getMenu() {
    //  if(this.emp.)
      return this.item;
    }
  },
  name: "Index",
  data() {
    return {
      Add: [],
      drawer: null,
      select: false,
      result: [],
      Menu: null,
      name: null,
      programName: null,
      item: [
        {
          action: "account_balance",
          title: "กำหนดอาจารย์ที่ปรึกษา",
          subtitle: "Header Pages",
          active: true,
          click: "advisor",
          color: "teal",
        },
        {
          action: "format_align_center",
          title: "ส่วนล่างของเว็บไซต์",
          subtitle: "ตราสัญลักษณ์ช่องทางการติดต่อสื่อสาร ฯลฯ",
          active: true,
          click: "main",
          color: "pink darken-2",
          

        }
      ]
    }
  },

  methods: {
    // ...mapActions({
    //   setInHouseEditPosition: "assignVolunteerStore/setInHouseEditPosition",
    //   clearSelected: "mainSearchStore/clearSelected",
    //   setIsPersonSearch: "mainSearchStore/setIsPersonSearch",
    //   getPrefixHistory: "volunteerHistoryStore/getPrefixHistory",
    //   clearSearchArray: "mainSearchStore/clearSearchArray",
    //   setSelectSubMenuIndex: "userStore/setSelectSubMenuIndex",
    //   clearEditFlag: "assignVolunteerStore/clearEditFlag",
    //   setEditCompFlag: "assignVolunteerStore/setEditCompFlag",
    //   setEditPositionFlag: "assignVolunteerStore/setEditPositionFlag",
    //   setEditPrefixFlag: "assignVolunteerStore/setEditPrefixFlag",
    //   getAllOrderDocs: "orderManagementStore/getAllOrderDocs"
    // }),
    clickDrawer() {
      this.drawer = !this.drawer;
      // console.log(this.drawer)
    }
  },
  mounted() {
    this.$router.push("/menu");
  },
  watch: {
    selectMenu: function(value) {
      // console.log(value)
      if (this.selectMenu == "true") {
        // prepareFunction
        this.setSelectSubMenuIndex(null);
        if (this.result[this.IndexMenu].prepareFunction) {
          this.result[this.IndexMenu].prepareFunction();
        }
        this.Menu = this.result[this.IndexMenu];
        this.programName = this.result[this.IndexMenu].title;
        this.name = this.result[this.IndexMenu].items[0];
      }
      if (this.selectMenu == "false") {
        this.setSelectSubMenuIndex(null);
        this.Menu = {};
        this.programName = "";
      }
    }
  }
};
</script>
