<template>
  <v-container  pb-0 pt-3>
    <AddDeputyDistrictDialog   :addDialogOpen="addDialogOpen" @dialogChangeStatus="(e)=> addDialogOpen = e" @dialogComplete="(e)=> search()"/>
    <editDeputyDistrictDialog v-if="editDialogOpen && selectedPerson" :selectedPerson="selectedPerson"  @dialogComplete="(e)=> search()" @clearsSelectedPerson = "clearItem" :editDialogOpen="editDialogOpen" @dialogChangeStatus="(e)=> editDialogOpen = e"  />
    <deleteDeputyDistrictDialog v-if="deleteDialogOpen && selectedPerson" :selectedPerson="selectedPerson"  @dialogComplete="(e)=> search()" @clearsSelectedPerson = "clearItem" :deleteDialogOpen="deleteDialogOpen" @dialogChangeStatus="(e)=> deleteDialogOpen = e"  />

    <v-card class="text-xs-center">
      <v-layout  row pt-3>
        <v-flex xs5 offset-xs4>
          <v-text-field
            mask="#-####-#####-##-#"
            label="เลขประจำตัวประชาชน :"
            v-model="pid"
          />
        </v-flex>
      </v-layout>
      <v-layout row pt-3>
        <v-flex xs5 offset-xs4>
          <v-text-field
            label="ชื่อตัว :"
            v-model="fname"
          />
        </v-flex>
      </v-layout>


      <v-layout row pt-3>
        <v-flex xs5 offset-xs4>
          <v-text-field
            label="ชื่อสกุล :"
            v-model="lname"
          />
        </v-flex>
      </v-layout>

      <v-layout row pt-3>
        <v-flex xs5 offset-xs4>
          <v-select
            :items="$store.state.ccaattmmStore.ccList"
            item-text="cc_desc"
            item-value="cc_code"
            label="สังกัด :"
            v-model="selectedCC"
          />
        </v-flex>
      </v-layout>
      <v-layout   row pt-3>
        <v-flex class="text-xs-center" >
          <v-btn color="indigo darken-1 " class="white--text "  @click="search">
            ค้นหา
          </v-btn>
          <v-btn color="indigo darken-1 " class="white--text "  @click="clearFilter">
            ล้างตัวเลือกการค้นหา
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <div style="margin-top:20px;">
      <v-layout >
        <v-flex >
          <v-btn color="indigo darken-1 right" class="white--text " @click="addDialogOpen = true" >
            เพิ่มปลัดจังหวัด
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex row>
          <v-data-table
            :headers="headers()"
            rows-per-page-text="จำนวนต่อหน้า"
            :items="deputyList">
            <template slot="items" slot-scope="props">

              <td >{{props.item.index}}</td>
              <td>{{ formatPID(props.item.pid) }}</td>
              <td>{{props.item.fname}} {{props.item.mname}} {{props.item.lname}}</td>
              <td >{{props.item.ccDesc}} ({{props.item.catmDesc}})</td>
              <td class="text-xs-right">
                <!--<v-btn color="indigo darken-1" small class="white--text" @click="onDialogPidListOpen(props.item)"  ><v-icon>search</v-icon></v-btn>-->
                <v-btn color="indigo darken-1" small class="white--text" @click="editDeputy(props.item)" ><v-icon>create</v-icon></v-btn>
                <v-btn color="indigo darken-1" small class="white--text" @click="deleteItemSubType(props.item)" ><v-icon>delete</v-icon></v-btn>
              </td>

            </template>
            <template
              slot="pageText"
              slot-scope="props"
              class="dialogTable"
            >
              จำนวนยานพาหนะ {{ props.itemsLength }}
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
  import {mapActions} from 'vuex'
  import AddDeputyDistrictDialog from './ManageDeputyDistrictDialog/AddDeputyDistrictDialog'
  import editDeputyDistrictDialog from './ManageDeputyDistrictDialog/EditDeputyDistrictDialog'
  import deleteDeputyDistrictDialog from './ManageDeputyDistrictDialog/DeleteDeputyDistrictDialog'
  import { deformObject } from '../../helper/helperFunction'
  export default {
    name: 'ItemSubTypeManagement',
    components: {
      AddDeputyDistrictDialog,
      editDeputyDistrictDialog,
      deleteDeputyDistrictDialog
    },
    data () {
      return {
        selectedCC: null,
        pid: null,
        fname: null,
        lname: null,
        addDialogOpen: false,
        editDialogOpen: false,
        deleteDialogOpen: false,
        selectedPerson: null,
        headers () {
          return [
            { text: 'ลำดับ', sortable: false, value: 'index' },
            { text: 'เลขประจำตัวประชาชน', sortable: false, value: 'buildingTypeDesc' },
            { text: 'ชื่อตัว-ชื่อสกุล', sortable: false, value: 'buildingTypeDesc' },
            { text: 'จังหวัด (อำเภอ) ที่สังกัด', sortable: false, value: 'buildingTypeDesc' },
            { text: '', align: 'right', sortable: false, value: 'btn' }
          ]
        }
      }
    },
    async mounted () {
      await this.getDeputy({})
      await this.getCCList()
      console.log(this.$store.state.deputyStore.deputyList)
    },
    computed: {
      deputyList: {
        get () {
          const {deputyList} =this.$store.state.deputyDistrictStore
          return deputyList.map((row,index) => {
            let {ccaattmm:{CATM_DESC},CATM_UKEY,...rest} = row
            const ccDesc = this.$store.state.ccaattmmStore.ccList.find( row=> row.cc_code === CATM_UKEY.substring(0,2))
            rest = {...rest,CATM_DESC,CATM_UKEY}
            return {...deformObject(rest),index: index+1,ccDesc:ccDesc.cc_desc}
          })
        }
      }
    },
    methods: {
      ...mapActions('ccaattmmStore',['getCCList','getAAList']),
      ...mapActions('deputyDistrictStore', ['getDeputy']),
      async search() {
        const {selectedCC, pid, fname, lname} = this
        await this.getDeputy({catmUkey: selectedCC && selectedCC.padBack(8)||null, pid,fname,lname})
      },
      clearFilter() {
        this.selectedCC = null
        this.pid = null
        this.fname = null
        this.lname = null
      },
      formatPID (item) {
        var pid1 = item.substring(0, 1)
        var pid2 = item.substring(1, 5)
        var pid3 = item.substring(5, 10)
        var pid4 = item.substring(10, 12)
        var pid5 = item.substring(12, 13)
        return pid1 + '-' + pid2 + '-' + pid3 + '-' + pid4 + '-' + pid5
      },
      clearItem () {
        this.selectedPerson = null
      },
      deleteItemSubType (item) {
        this.selectedPerson = item
        this.deleteDialogOpen = true
      },
      editDeputy (item) {
        this.selectedPerson = item
        this.editDialogOpen = true
      },

    }
  }
</script>

<style scoped>

</style>
