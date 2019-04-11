<template>
  <div>
    <v-app>

      <v-card>
        <v-card-title>
          <v-container fluid>
            <v-layout row>
              <v-flex xs3>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="ค้นหาด้วยเลขบัตรประชาชนหรือชื่อผู้ใช้งาน"
                  single-line
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex xs3 offset-xs6 class="text-xs-right" style="margin-top:20px;">
                <v-tooltip top>
                  <v-btn
                    style="margin-right:30px;margin-top:10px;"
                    slot="activator"
                    class="white--text primary mb-2"
                    @click="setStatusStore('Add')"
                    dark
                  ><v-icon style="margin-left:0px;" dark right>add</v-icon>เพิ่มผู้ใช้งาน
                  </v-btn>

                  <span>เพิ่มผู้ใช้งาน</span>
                </v-tooltip>

              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs3>
                <v-radio-group v-model="active" row>
                  <v-radio label="ใช้งาน" value="1"></v-radio>
                  <v-radio label="ไม่ได้ใช้งาน" value="0"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
        <div v-if="active=='0'">
          <v-data-table
            style="margin-left:20px;margin-right:20px;margin-bottom:50px;"
            :headers="getHeader()"
            :items="empNonActive"
            :search="search"
            :pagination.sync="pagination"
            rows-per-page-text="จำนวนต่อหน้า"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{setIndex(props.index)}}</td>
              <td>{{ formatPID(props.item.EMP_PID) }}</td>
              <td>{{ setName(props.item) }}</td>
              <td class="text-xs-center">{{ getGroup(props.item.EMP_GROUP) }}</td>
              <td class="text-xs-center">{{ setActive(props.item.STATUS) }}</td>
              <td class="text-xs-center">{{ formatDate(props.item.TERM_DATE) }}</td>
              <td class="text-xs-right">
                <!-- <div v-if="emp.EMP_LEVEL==9">
                  <div v-if="emp.EMP_LEVEL!=props.item.EMP_LEVEL">

                    <v-tooltip top>
                      <v-btn slot="activator" @click="edit(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>create</v-icon>
                      </v-btn>
                      <span>แก้ไข</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <v-btn slot="activator" @click="unlock(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>lock_open</v-icon>
                      </v-btn>
                      <span>เพิ่มสิทธิ</span>
                    </v-tooltip>
                  </div>
                </div>
                <div v-if="emp.EMP_LEVEL==2">
                  <div
                    v-if="emp.EMP_PID!=props.item.EMP_PID&&((props.item.EMP_LEVEL==2&&props.item.EMP_PERMIT!=9)||(props.item.EMP_LEVEL==1&&props.item.EMP_PERMIT==9))"
                  >
                    <v-tooltip top>
                      <v-btn slot="activator" @click="edit(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>create</v-icon>
                      </v-btn>
                      <span>แก้ไข</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <v-btn slot="activator" @click="unlock(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>lock_open</v-icon>
                      </v-btn>
                      <span>เพิ่มสิทธิ</span>
                    </v-tooltip>
                  </div>
                </div>
                <div v-if="emp.EMP_LEVEL==1">
                  <div
                    v-if="emp.EMP_PID!=props.item.EMP_PID&&(props.item.EMP_LEVEL==1&&props.item.EMP_PERMIT!=9)"
                  >
                    <v-tooltip top>
                      <v-btn slot="activator" @click="edit(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>create</v-icon>
                      </v-btn>
                      <span>แก้ไข</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <v-btn slot="activator" @click="unlock(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>lock_open</v-icon>
                      </v-btn>
                      <span>เพิ่มสิทธิ</span>
                    </v-tooltip>

                  </div>
                </div> -->
              </td>
            </template>
            <template slot="no-data">
              <v-layout>
                <v-flex xs2 offset-xs5>ไม่มีข้อมูลผู้ใช้งาน</v-flex>
              </v-layout>
            </template>
            <template
              slot="pageText"
              slot-scope="props"
              class="dialogTable"
            >จำนวนข้อมูลผู้ใช้งาน {{ props.itemsLength }} คน</template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">ไม่พบการค้นหา</v-alert>
          </v-data-table>
        </div>
        <div v-if="active=='1'">
          <v-data-table
            style="margin-left:20px;margin-right:20px;margin-bottom:50px;"
            :headers="getHeader()"
            :items="empActive"
            :search="search"
            :pagination.sync="pagination"
            rows-per-page-text="จำนวนต่อหน้า"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{setIndex(props.index)}}</td>
              <td>{{ formatPID(props.item.EMP_PID) }}</td>
              <td>{{ setName(props.item) }}</td>
              <td class="text-xs-center">{{ getGroup(props.item.EMP_GROUP) }}</td>
              <td class="text-xs-center">{{ setActive(props.item.STATUS) }}</td>
              <td class="text-xs-right">
                <!-- <div v-if="emp.EMP_LEVEL==9">
                  <div v-if="emp.EMP_LEVEL!=props.item.EMP_LEVEL">
                    <v-tooltip top>
                      <v-btn slot="activator" @click="edit(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>create</v-icon>
                      </v-btn>
                      <span>แก้ไข</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <v-btn  slot="activator" @click="lock(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>lock</v-icon>
                      </v-btn>
                      <span>ถอนสิทธิ์</span>
                    </v-tooltip>

                  </div>
                </div>
                <div v-if="emp.EMP_LEVEL==2">
                  <div
                    v-if="emp.EMP_PID!=props.item.EMP_PID&&((props.item.EMP_LEVEL==2&&props.item.EMP_PERMIT!=9)||(props.item.EMP_LEVEL==1&&props.item.EMP_PERMIT==9))"
                  >
                    <v-tooltip top>
                      <v-btn slot="activator" @click="edit(props.item)"  color="indigo darken-1" small class="white--text">
                        <v-icon>create</v-icon>
                      </v-btn>
                      <span>แก้ไข</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <v-btn slot="activator" @click="lock(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>lock</v-icon>
                      </v-btn>
                      <span>ถอนสิทธิ์</span>
                    </v-tooltip>

                  </div>
                </div>
                <div v-if="emp.EMP_LEVEL==1">
                  <div
                    v-if="emp.EMP_PID!=props.item.EMP_PID&&(props.item.EMP_LEVEL==1&&props.item.EMP_PERMIT!=9)"
                  >
                    <v-tooltip top>
                      <v-btn slot="activator" @click="edit(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>create</v-icon>
                      </v-btn>
                      <span>แก้ไข</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <v-btn  slot="activator" @click="lock(props.item)" color="indigo darken-1" small class="white--text">
                        <v-icon>lock</v-icon>
                      </v-btn>
                      <span>ถอนสิทธิ์</span>
                    </v-tooltip>

                  </div>
                </div> -->
              </td>
            </template>
            <template slot="no-data">
              <v-layout>
                <v-flex xs2 offset-xs5>ไม่มีข้อมูลผู้ใช้งาน</v-flex>
              </v-layout>
            </template>
            <template
              slot="pageText"
              slot-scope="props"
              class="dialogTable"
            >จำนวนข้อมูลผู้ใช้งาน {{ props.itemsLength }} คน</template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">ไม่พบการค้นหา</v-alert>
          </v-data-table>
        </div>
      </v-card>
    </v-app>
  </div>

</template>
<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'MainUser',
  data () {
    return {
      search:null,
      active:null,
      pagination: {
        rowsPerPage: 10
      },
      header:[
        { text: 'ลำดับ', sortable: true, value: 'No' },
        { text: 'เลขบัตรประชาชน', sortable: true, value: 'EMP_PID' },
        {
          text: 'ชื่อ-นามสกุล',
          align: 'left',
          sortable: true,
          value: 'EMP_FNAME'
        },
        {
          text: 'ระดับผู้ใช้งาน',
          align: 'center',
          sortable: true,
          value: 'EMP_LEVEL'
        },
        {
          text: 'สิทธิ์การทำงาน',
          align: 'center',
          sortable: true,
          value: 'EMP_PERMIT'
        },
        {
          text: 'สถานะการใช้งาน',
          align: 'center',
          sortable: false,
          value: 'EMP_LNAME'
        },
        {
          text: 'วันที่ระงับการใช้งาน',
          align: 'center',
          sortable: true,
          value: 'TERM_DATE'
        },
        {
          text: 'การดำเนินการ',
          align: 'center',
          sortable: false,
          value: 'btn'
        }
      ],
      empActive:[],
      empNonActive:[],
    };
  },
  mounted () {
    this.active='1';
    this.getEmpAll();
  },
  watch: {

  },
  computed: {
    ...mapState({
      emp: state => state.userStore.emp,
      ccListLevel: state => state.ccaattmmStore.ccListLevel
    }),
    ccListLevel: {
      get () {
        const { ccListLevel } = this.$store.state.ccaattmmStore

        if (ccListLevel.length === 0) {
          this.getCCListWithLevel()
          return []
        } else {
          return ccListLevel
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setAction: 'actionPageStore/setAction',
      getCCListWithLevel: 'ccaattmmStore/getCCListWithLevel',
    }),
    getEmpAll(){
      axios.get("/dods/services/public/api/user/getAll").then(res => {
        this.empNonActive = res.data.nonactive
        this.empActive = res.data.active
      })
    },
    setIndex (item) {
      return (
        item + 1 + this.pagination.rowsPerPage * (this.pagination.page - 1)
      )
    },
    formatDate (item) {
      var y = item.toString().substring(0, 4)
      var m = item.toString().substring(4, 6)
      var d = item.toString().substring(6, 8)
      return d + '/' + m + '/' + y
    },
    formatPID (item) {
      var pid1 = item.substring(0, 1)
      var pid2 = item.substring(1, 5)
      var pid3 = item.substring(5, 10)
      var pid4 = item.substring(10, 12)
      var pid5 = item.substring(12, 13)
      return pid1 + '-' + pid2 + '-' + pid3 + '-' + pid4 + '-' + pid5
    },
    setStatusStore (status) {
      this.setAction(status)
    },
    getHeader(){
      if(this.active=='0'){
        return [
          { text: 'ลำดับ', sortable: true, value: 'No' },
          { text: 'เลขบัตรประชาชน', sortable: true, value: 'EMP_PID' },
          {
            text: 'ชื่อ-นามสกุล',
            align: 'left',
            sortable: true,
            value: 'EMP_FNAME'
          },
          {
            text: 'ระดับผู้ใช้งาน',
            align: 'center',
            sortable: true,
            value: 'EMP_LEVEL'
          },
          {
            text: 'สถานะการใช้งาน',
            align: 'center',
            sortable: false,
            value: 'EMP_LNAME'
          },
         {
            text: 'วันที่ระงับการใช้งาน',
            align: 'center',
            sortable: true,
            value: 'TERM_DATE'
          },
          {
            text: 'การดำเนินการ',
            align: 'center',
            sortable: false,
            value: 'btn'
          }
        ]
      }
      else{
        return [
          { text: 'ลำดับ', sortable: true, value: 'No' },
          { text: 'เลขบัตรประชาชน', sortable: true, value: 'EMP_PID' },
          {
            text: 'ชื่อ-นามสกุล',
            align: 'left',
            sortable: true,
            value: 'EMP_FNAME'
          },
          {
            text: 'ระดับผู้ใช้งาน',
            align: 'center',
            sortable: true,
            value: 'EMP_LEVEL'
          },
          {
            text: 'สถานะการใช้งาน',
            align: 'center',
            sortable: false,
            value: 'EMP_LNAME'
          },

          {
            text: 'การดำเนินการ',
            align: 'center',
            sortable: false,
            value: 'btn'
          }
        ]
      }
    },
    setName (item) {
      if (item.EMP_MNAME) { return item.EMP_FNAME + ' ' + item.EMP_MNAME + ' ' + item.EMP_LNAME } else return item.EMP_FNAME + ' ' + item.EMP_LNAME
    },
    setActive (item) {
      if (item === '0') return 'ไม่ได้ใช้งาน'
      else if (item === '1') return 'ใช้งาน'
    },
    getGroup (item) {
      if (item == 1) return 'อำเภอ'
      else if (item == 2) return 'จังหวัด'
      else if (item == 3) return 'ส่วนกลาง'
      else if (item == 4) return 'แอดมิน'
      else if (item == 5) return 'ผู้บริหาร'
      else return '-'
    },
   
  }
}
</script>
