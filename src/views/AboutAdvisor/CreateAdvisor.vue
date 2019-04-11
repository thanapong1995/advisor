<template>
  <v-container pb-0 pt-1>
    <form v-focusNextOnEnter>
      <v-layout row style="padding-top:10px;">
        <v-flex xs12 md3 px-1>
          <v-select :items="facultyItem" v-model="group" label="*คณะ :"/>
        </v-flex>
      </v-layout>

      <v-layout row pt-1>
        <v-flex xs3 px-1 pt-1>
          <v-select :items="groupItem" v-model="group" label="*ภาควิชา :"/>
        </v-flex>
        <v-flex xs3 px-1 pt-1>
          <v-select
            :items="ccDescList"
            item-text="cc_desc"
            item-value="cc_code"
            v-model="ccaa"
            label="*จังหวัด :"
          />
        </v-flex>
      </v-layout>
      <v-layout row pt-3>
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
      </v-layout>
      <v-layout v-if="state">
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
      </v-layout>
      {{name}}
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
      // facultyItem: [
      //   { text: "คณะฟนึ่ง", value: 1 },
      //   { text: "4", value: 2 },
      //   { text: "คณะฟนึ่35ง", value: 3 },
      //   { text: "คณะฟนึ่4ง", value: 4 }
      // ],
      facultyItem: [],
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
    this.getFaculty();
  },
  computed: {
    ...mapState({
      emp: state => state.empStore.emp,
      groupItem: state => state.empStore.groupItem,
      ccDescList: state => state.ccaattmmStore.ccDescList
    }),
    name() {
      return this.fname + this.lname;
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
    back() {
      this.setAction(null);
    },
    ...mapActions({
      setAction: "actionPageStore/setAction",
      getCCDescList: "ccaattmmStore/getCCDescList"
    }),
    getbtnfunc() {
      if (this.state === "insert") this.insert();
      else this.update();
    },
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
