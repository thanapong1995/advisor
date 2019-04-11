<template>
  <v-dialog persistent  v-model="editDialogOpen" max-width="500">
    <v-card class="text-xs-center">
      <v-card-title class="headline justify-center" >เพิ่มปลัดจังหวัด</v-card-title>
      <v-card-text>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              :disabled="true"
              mask="#-####-#####-##-#"
              label="เลขประจำตัวประชาชน :"
              v-model="pid"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              label="ชื่อตัว :"
              v-model="fname"
            />
          </v-flex>
        </v-layout>

        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              label="ขื่อกลาง :"
              v-model="mname"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              label="ชื่อสกุล :"
              v-model="lname"
            />
          </v-flex>
        </v-layout>

        <v-layout row pt-3>
          <v-flex>
            <v-select
              :items="$store.state.ccaattmmStore.ccList"
              item-text="cc_desc"
              item-value="cc_code"
              label="สังกัด :"
              v-model="selectedCC"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              :disabled="true"
              mask="##/##/####"
              placeholder="##/##/####"
              label="วันที่เข้ารับราชการ :"
              v-model="dateMovein"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              mask="##/##/####"
              placeholder="##/##/####"
              label="วันที่ออกจากราชการ :"
              v-model="dateMoveout"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              label="ที่อยู่ :"
              v-model="addr"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              label="เบอร์โทรศัพท์ :"
              v-model="tel"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
              label="อีเมล์ :"
              v-model="email"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex class="text-xs-left" >
            <v-btn color="indigo darken-1 " class="white--text " @click="$refs.fileupload.click()">อัพโหลดเอกสาร</v-btn>
            <label>{{fileName}}</label>
            <input type="file" ref="fileupload" @change="onFileChange" label="ใบสมัครเข้าเป็น อส. :" hidden/>
          </v-flex>
        </v-layout>
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
    async mounted() {
      await this.getCCList()
      this.initialData()
    },
    name: 'AddItemSubTypeDialog',
    data () {
      return {
        selectedCC: null,
        pid: null,
        fname: null,
        mname: null,
        lname: null,
        dateMovein: null,
        addr: null,
        tel: null,
        email: null,
        dateMoveout: null,
        img: null,
        fileName: null
      }
    },
    props: {
      editDialogOpen: Boolean,
      selectedPerson: Object
    },
    methods: {
      ...mapActions('ccaattmmStore',['getCCList']),
      ...mapActions('deputyStore', ['updateDeputy']),
      onDialogClose () {
        this.$emit('clearSelectedPerson')
        this.$emit('dialogChangeStatus', false)
      },
      initialData() {
        this.selectedCC= this.selectedPerson.catmUkey.substring(0,2)
        this.pid= this.selectedPerson.pid
        this.fname= this.selectedPerson.fname
        this.mname= this.selectedPerson.mname
        this.lname= this.selectedPerson.lname
        this.dateMovein= this.formatDate(this.selectedPerson.dateMovein)
        this.dateMoveout= this.formatDate(this.selectedPerson.dateMoveout)
        this.addr= this.selectedPerson.addr
        this.tel= this.selectedPerson.tel
        this.email= this.selectedPerson.email

      },
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files

        if (files.length > 0) {
          if (!files[0].type.startsWith('image') ) {
            this.$refs.fileupload.value = ''
            this.img = null
            return swal({icon: 'warning', text: 'กรุณาเลือกไฟล์ รูปภาพ'})
          }
          this.img = files[0]
          this.fileName = files[0].name
        } else {
          this.img = null
          this.fileName = null
        }
      },
      formatDate (item) {
        if(item !==null) {
          let y = item.toString()
            .substring(0, 4)
          let m = item.toString()
            .substring(4, 6)
          let d = item.toString()
            .substring(6, 8)
          return d + m + (parseInt(y) + 543)
        }
        return null
      },
      async onDialogSubmit () {
        const {fileName,selectedCC, ...rest} = this.$data
        let catmUkey= selectedCC.padBack("8")
        let payload = {...rest,catmUkey, id:this.selectedPerson.id}
        const result = await this.updateDeputy(payload)

        if (result === true) {
          this.selectedCC= null
          this.pid= null
          this.fname= null
          this.mname= null
          this.lname= null
          this.dateMovein= null
          this.addr= null
          this.tel= null
          this.email= null
          this.img= null
          this.fileName= null
          this.dateMoveout = null
          this.$refs.fileupload.value = ''
          this.$emit('dialogComplete')
          this.onDialogClose()
        }
      }
    }
  }
</script>

<style scoped>

</style>
