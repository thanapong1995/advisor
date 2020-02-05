<template>
  <v-container pb-0 pt-1>
    <form v-focusNextOnEnter>
      <v-layout row style="padding-top:10px;">
        <v-flex xs12 md6 px-1>
          <v-select
            :items="faculties"
            v-model="select.facultie"
            label="*คณะ :"
            v-on:change="selectedfac"
            solo
          />
        </v-flex>
        <v-flex xs12 md6 px-1>
          <v-select
            :items="departments"
            v-model="select.department"
            label="*ภาควิชา :"
            v-on:change="selecteddept"
            solo
          />
        </v-flex>
      </v-layout>

      <v-layout row pt-1>
        <v-flex xs12 md6 px-1 pt-1>
          <v-select
            :items="devisions"
            v-model="select.devision"
            label="*สาขาวิชา :"
            v-on:change="selecteddiv"
            solo
          />
        </v-flex>
        <v-flex xs12 md6 px-1 pt-1>
          <v-select
            :items="curriculums"
            v-model="select.curriculum"
            label="*หลักสูตร :"
            v-on:change="selectedcurr"
            solo
          />
        </v-flex>
      </v-layout>
      <v-layout row pt-1>
        <v-flex xs12 md4 px-1 pt-1>
          <v-select
            :items="studentypes"
            v-model="select.studentype"
            label="*ประเภทนักศึกษา :"
            solo
          />
        </v-flex>
        <v-flex xs12 md4 px-1 pt-1>
          <v-select :items="classes" v-model="select.classs" label="*รอบ :" solo/>
        </v-flex>
        <v-flex xs12 md4 px-1 pt-1>
          <v-select :items="rounds" v-model="select.round" label="*ห้อง/กลุ่มการเรียน :" solo/>
        </v-flex>
      </v-layout>
      <!-- <v-layout row pt-3>
        <v-flex xs3 px-1 pt-1>
          <v-text-field v-model="email" label="อีเมล์"/>
        </v-flex>
        <v-flex xs3 px-1 pt-1>
          <v-text-field
            mask="###-###-####"
            placeholder="###-###-####"
            v-model="tel"
            label="เบอร์โทรศัพท์"
          />
        </v-flex>
      </v-layout>-->
      <v-layout>
        <v-flex offset-xs3 mt-2 text-xs-right>
          <v-btn @click="hidden = !hidden" color="indigo darken-1 " class="white--text">ตกลง</v-btn>
        </v-flex>
      </v-layout>
      <v-layout v-show="hidden">
        <v-flex xs12 md6 px-1>
          <v-card>
            <v-card-title>
              <v-select
                :items="advisors"
                v-model="select.advisor"
                label="*อาจารย์ที่ปรึกษา :"
                solo
              />
              <v-spacer></v-spacer>
              <v-text-field v-model="search1" append-icon="search" label="Search" single-line></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="items" :search="search1"></v-data-table>
          </v-card>
        </v-flex>
        <v-flex xs12 md6 px-1>
          <v-card>
            <v-card-title>
              นักศึกษาทั้งหมด
              <v-spacer></v-spacer>
              <v-text-field v-model="search2" append-icon="search" label="Search" single-line></v-text-field>
              <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search2"
              v-model="selected"
              :single-select="singleSelect"
            >
              <template v-slot:items="props">
                <td>{{ props.item.STU_FIRST_NAME_THAI+" "+props.item.STU_LAST_NAME_THAI }}</td>
                <td class="text-xs-right">{{ props.item.STU_CODE }}</td>
                <td>
                  <v-checkbox color="primary">เลือก</v-checkbox>
                </td>
              </template>
              <v-alert
                v-slot:no-results
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- <v-layout v-if="state">
        <v-flex xs4 offset-xs3 mt-5 text-xs-center>
          <v-btn @click="getbtnfunc()" class="white--text primary">{{getbtn()}}</v-btn>&nbsp;
          <v-btn @click="back()" class="white--text primary">ย้อนกลับ</v-btn>
        </v-flex>
        <v-flex xs1 mt-5 text-xs-center></v-flex>
      </v-layout>
      <v-layout v-if="!state">
        <v-flex xs4 offset-xs3 mt-5 text-xs-center>
          <v-btn @click="back()" class="white--text primary">ย้อนกลับ</v-btn>
        </v-flex>
      </v-layout>-->
    </form>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "CreateAdvisor",
  data() {
    return {
      select: {
        facultie: null,
        department: null,
        devision: null,
        advisor: null,
        curriculum: null,
        studentype: "1",
        classs: "A",
        round: "R"
      },
      selectedItems: [],
      singleSelect: false,
      hidden: false,
      faculties: [],
      departments: [],
      devisions: [],
      curriculums: [],
      studentypes: [],
      advisors: [],
      classes: [
        { value: "A", text: "A" },
        { value: "B", text: "B" },
        { value: "C", text: "C" },
        { value: "D", text: "D" }
      ],
      rounds: [
        { value: "R", text: "R รอบเช้า" },
        { value: "T", text: "T รอบบ่าย" }
      ],
      studentAdvisors: [],
      selected: [],
      search1: "",
      search2: "",
      headers: [
        {
          text: "Person Full name",
          align: "left",
          value: "STU_FIRST_NAME_THAI"
        },
        { text: "studentcode", value: "STU_CODE" },
        { text: "Actions", value: "action", sortable: false }
      ],

      // facultyItem: [
      //   { text: "คณะนึ่ง", value: 1 },
      //   { text: "4", value: 2 },
      //   { text: "คณะฟนึ่35ง", value: 3 },
      //   { text: "คณะฟนึ่4ง", value: 4 }
      // ],
      facultyItem: [],
      fullname: null,
      pidSearch: null,
      fname: null,
      mname: null,
      lname: null,
      group: null,

      email: null,
      tel: null,
      state: null,
      // ccListLevel:[
      //   {text:"กรุงเทพ",value:10},
      //   {text:"กระบี่",value:81},
      // ],
      ccaa: null,
      clear: null
    };
  },
  watch: {
    pidSearch: function() {
      if (this.pidSearch) {
        if (this.pidSearch.length == 13) {
          // alert('haveeee')
          //   this.getdb();
        }
        if (this.pidSearch.length != 13) {
          // alert('no have')
          //   this.cleardata();
        }
      } else {
        this.cleardata();
      }
    }
  },
  mounted() {
    this.type();
    this.fac();
    this.getFaculty();
  },
  props: {
    items: {
      type: Array
    }
  },
  computed: {
    ...mapState({
      emp: state => state.empStore.emp,
      groupItem: state => state.empStore.groupItem,
      ccDescList: state => state.ccaattmmStore.ccDescList
    }),
    getname() {
      return this.STU_FIRST_NAME_THAI + this.STU_LAST_NAME_THAI;
    },
    ccListLevel: {
      get() {
        const { ccListLevel } = this.$store.state.ccaattmmStore;

        if (ccListLevel.length === 0) {
          this.getCCDescList();
          return [];
        } else {
          return ccListLevel;
        }
      }
    }
  },

  // computed: {
  // ccListLevel: {
  //   get() {
  //     const { ccListLevel } = this.$store.state.ccaattmmStore;
  //     if (ccListLevel.length === 0) {
  //       this.getCCListWithLevel();
  //       return [];
  //     } else {
  //       return ccListLevel;
  //     }
  //   }
  // }
  // },
  methods: {
    fac: function() {
      const urlfac = "/testpro/connectfac.php";
      axios
        .post(urlfac) //ประเภทนักศึกษา
        .then(response => {
          this.faculties = this.faculties.concat(
            response.data.map(data => ({
              value: data.FAC_CODE,
              text: data.FAC_CODE + " " + data.FAC_NAME
            }))
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    type: function() {
      const urltype = "/testpro/selecttype.php";
      axios
        .post(urltype) //ประเภทนักศึกษา
        .then(response => {
          this.studentypes = this.studentypes.concat(
            response.data.map(data => ({
              value: data.STU_TYPE,
              text: data.STU_TYPE_SHRT + " " + data.STU_TYPE_DESC
            }))
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectedfac(fac_code) {
      //ภาควิชา
      const urldept = "/testpro/connectdept.php";
      const body = {
        FAC_CODE: fac_code
      };
      this.select.department = null;
      this.select.devision = null;
      this.select.curriculum = null;
      this.select.advisor = null;
      this.advisors = this.advisors.slice(0, 1);
      this.devisions = this.devisions.slice(0, 1);
      this.curriculums = this.curriculums.slice(0, 1);
      axios
        .post(urldept, body)
        .then(response => {
          this.departments = this.departments.slice(0, 1).concat(
            response.data.map(data => ({
              value: data.DEPT_CODE,
              text: data.DEPT_CODE + " " + data.DEPT_NAME_THAI
            }))
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    selecteddept(dept_code) {
      //สาขาวิชา
      const urldiv = "/testpro/connectdiv.php";
      const urlav = "/testpro/selectAdvisor.php";
      const body = {
        DEPT_CODE: dept_code
      };
      this.select.devision = null;
      this.select.curriculum = null;
      this.select.advisor = null;
      this.advisors = this.advisors.slice(0, 1);
      this.curriculums = this.curriculums.slice(0, 1);
      axios.post(urldiv, body).then(response => {
        this.devisions = this.devisions.slice(0, 1).concat(
          response.data.map(data => ({
            value: data.DIV_CODE,
            text:
              data.DIV_CODE +
              " " +
              data.DIV_NAME_THAI +
              " " +
              data.DIV_SHRT_NAME
          }))
        );
      });
      axios
        .post(urlav, body)
        .then(response => {
          this.advisors = this.advisors.slice(0, 1).concat(
            response.data.map(data => ({
              value: {
                username: data.USER_NAME,
                deptcode: data.DEPT_CODE,
                ...data
              },
              text: data.NAME
            }))
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    selecteddiv(div_code) {
      //หลักสูตร
      const urlcurr = "/testpro/connectcurr.php";
      const body = {
        DIV_CODE: div_code
      };
      this.select.curriculum = null;
      axios
        .post(urlcurr, body)
        .then(response => {
          this.curriculums = this.curriculums.slice(0, 1).concat(
            response.data.map(data => ({
              value: data.CURR_CODE,
              text: data.CURR_CODE + " " + data.CURR_NAME_THAI
            }))
          );
          // console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectedcurr(curr_code) {
      //นักเรียน
      const urlstu = "/testpro/selectstudent.php";
      const body = {
        CURR_CODE: curr_code,
        CLASS: this.select.class,
        ROUND: this.select.round,
        STU_TYPE: this.select.studentype
      };
      axios
        .post(urlstu, body)
        .then(response => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch(error => {
          console.log(error);
        });
      const urlavstu = "/testpro/advistor.stu.php";
      const body2 = {
        CURR_CODE: curr_code
      };
      axios
        .post(urlavstu, body2)
        .then(response => {
          this.studentAdvisors = response.data;
          console.log(this.studentAdvisors);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // back() {
    //   this.setAction(null);
    // },
    ...mapActions({
      setAction: "actionPageStore/setAction",
      getCCDescList: "ccaattmmStore/getCCDescList"
    }),
    // getbtnfunc() {
    //   if (this.state === "insert") this.insert();
    //   else this.update();
    // },
    getbtn() {
      if (this.state === "insert") return "เพิ่มผู้ใช้งาน";
      else return "แก้ไขผู้ใช้งาน";
    },
    clickPid: function() {
      if (this.pidSearch) {
        if (this.pidSearch.length == 13) {
          this.pid = this.pidSearch;
          this.cleardata();
          this.pidSearch = this.pid;
          this.getdb();
        } else alert("กรุณากรอกเลขบัตรประชาชนให้ครบถ้วน");
      } else alert("กรุณากรอกเลขบัตรประชาชน");
    },
    cleardata() {
      (this.pass = null),
        (this.fname = null),
        (this.mname = null),
        (this.lname = null),
        (this.group = null),
        (this.ccaa = null),
        (this.email = null),
        (this.tel = null),
        (this.state = null);
    },
    async getdb() {
      axios
        .get("/dods/services/public/api/user/getOne/" + this.pidSearch)
        .then(res => {
          const data = res.data.data;
          if (res.data.status == false) {
            this.alertError(res.data.error);
            this.state = "insert";
          } else {
            if (data.STATUS === "0") {
              swal({
                title: "ผู้ใช้งานไม่มีสิทธิการใช้งาน",
                text: "ต้องการเปิดสิทธิการใช้งานหรือไม่",
                buttons: {
                  next: {
                    text: "ถัดไป",
                    value: "next"
                  },
                  cancel: "ยกเลิก"
                }
              }).then(res => {
                switch (res) {
                  case "next":
                    axios
                      .get(
                        "/dods/services/public/api/user/active/" +
                          data.EMP_PID +
                          "/1"
                      )
                      .then(res => {
                        this.alertSuccess("เปิดสิทธิการใช้งานแล้ว");
                      })
                      .catch(err => {
                        this.alertError(err.data);
                      });
                    break;

                  default:
                    this.cleardata();
                    this.pidSearch = null;
                    this.pidScan = null;
                }
              });
            } else {
              swal({
                title: "ต้องการแก้ไขข้อมูลผู้ใช้งานหรือไม่",
                buttons: {
                  next: {
                    text: "ถัดไป",
                    value: "next"
                  },
                  cancel: "ยกเลิก"
                }
              }).then(res => {
                switch (res) {
                  case "next":
                    this.pidSearch = data.EMP_PID;
                    this.fname = data.EMP_FNAME;
                    this.mname = data.EMP_MNAME;
                    this.lname = data.EMP_LNAME;
                    this.group = parseInt(data.EMP_GROUP, 10);
                    (this.ccaa = data.EMP_CCAA.substring(0, 2)), 10;
                    this.email = data.EMP_EMAIL;
                    this.tel = data.EMP_TEL;
                    this.state = "update";
                    break;

                  default:
                    this.cleardata();
                    this.pidSearch = null;
                }
              });
            }
          }
        })
        .catch(error => {
          this.state = null;
          swal({
            title: error,
            text: "กรุณากรอกข้อมูลผู้ใช้งาน"
          });
        });
    },
    alertError(error) {
      swal({
        title: error,
        icon: "warning"
      });
    },
    alertSuccess(success) {
      swal({
        title: success,
        icon: "success",
        buttons: {
          next: {
            text: "ถัดไป",
            value: "next"
          }
        }
      }).then(res => {
        this.pidSearch = null;
        this.clearData();
      });
    },

    checkdata: function() {
      this.clear = false;
      if (!this.pidSearch) {
        alert("กรุณากรอกเลขบัตรประชาชน");
      } else if (this.pidSearch.length != 13) {
        alert("กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง");
      } else if (!this.fname) {
        alert("กรุณากรอกชื่อ");
      } else if (!this.lname) {
        alert("กรุณากรอกนามสกุล");
      }
      //  else if (!this.pass)
      //   alert("กรุณากรอกรหัสผ่านให้ถูกต้อง");
      else if (!this.group) {
        alert("กรุณาเลือกระดับผู้ใช้งาน");
      } else if (!this.ccaa) {
        alert("กรุณาเลือกจังหวัด");
      }
      //  else if (!this.email)
      //   alert("กรุณากรอกอีเมล์ให้ถูกต้อง");
      //  else if (!this.tel)
      //   alert("กรุณากรอกเบอร์โทรศัพท์");
      //  else if (this.tel.length != 10)
      //   alert("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
      else {
        this.clear = true;
      }
    },
    insert: function() {
      this.checkdata();

      if (this.clear) {
        this.clear = false;
        if (!isValidPID(this.pidSearch)) {
          this.clear = false;
          alert("เลขบัตรประชาชนไม่ถูกต้อง");
        } else {
          this.clear = true;
        }
      }
      if (this.clear) {
        axios
          .post("/dods/services/public/api/user", {
            EMP_PID: this.pidSearch,
            EMP_PASS: this.pidSearch.substring(9, 13),
            EMP_FNAME: this.fname,
            EMP_MNAME: this.mname,
            EMP_LNAME: this.lname,
            EMP_GROUP: this.group,
            EMP_CCAA: this.ccaa,
            EMP_EMAIL: this.email,
            EMP_TEL: this.tel
          })
          .then(res => {
            this.clear = null;
            this.state = null;
            this.alertSuccess("บันทึกสำเร็จ");
          })
          .catch(err => {
            this.alertError("บันทึกไม่สำเร็จ");
          });
      }
    },
    update: function() {
      this.checkdata();
      if (this.clear) {
        this.clear = false;
        if (!isValidPID(this.pidSearch)) {
          this.clear = false;
          alert("เลขบัตรประชาชนไม่ถูกต้อง");
        } else {
          this.clear = true;
        }
      }
      if (this.clear) {
        axios
          .post("/dods/services/public/api/user/update/" + this.pidSearch, {
            EMP_FNAME: this.fname,
            EMP_MNAME: this.mname,
            EMP_LNAME: this.lname,
            EMP_GROUP: this.group,
            EMP_CCAA: this.ccaa,
            EMP_EMAIL: this.email,
            EMP_TEL: this.tel
          })
          .then(res => {
            swal({
              title: "บันทึกสำเร็จ",
              icon: "success"
            }).then(res => {});
            this.pidScan = null;
            this.state = null;
            this.cleardata();
          })
          .catch(err => {
            swal({
              title: "ไม่สามารถแก้ไขได้",
              icon: "warning"
            }).then(res => {});
          });
      }
    }
  }
};
</script>
<style scoped>
.v-card__text {
  padding: 72px 40px;
  font-weight: bold;
  font-size: 20px;
  color: #840d0d;
}
/* .v-card {
  padding-bottom: 50px;
  color: #840d0d;
} */
.margintop {
  margin-top: 40px;
  margin-left: -290px;
}
.textmargin {
  margin-top: -32px;
  width: 250px;
  margin-left: 50px;
}
.right {
  margin-left: 130px;
}
.btn {
  margin-top: -30px;
  margin-bottom: 10px;
}
.nopad {
  padding-bottom: 0px;
}
.btn:hover {
  cursor: pointer;
  opacity: 0.75;
}
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
</style>
