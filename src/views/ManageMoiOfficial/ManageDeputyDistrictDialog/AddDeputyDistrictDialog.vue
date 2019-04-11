<template>
  <v-dialog persistent  v-model="addDialogOpen" max-width="500">
    <v-card class="text-xs-center">
      <v-card-title class="headline justify-center" >เพิ่มปลัดจำเภอ</v-card-title>
      <v-card-text>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
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
              label="สังกัด(จังหวัด) :"
              v-model="selectedCC"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-select
              :items="$store.state.ccaattmmStore.aaList"
              item-text="aa_desc"
              item-value="aa_code"
              label="สังกัด(อำเภอ) :"
              v-model="selectedAA"
            />
          </v-flex>
        </v-layout>
        <v-layout row pt-3>
          <v-flex>
            <v-text-field
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
    },
    name: 'AddItemSubTypeDialog',
    watch: {
      selectedCC: async function (val) {
        if(val !== null)
        await this.getAAList(val)
      }
    },
    data () {
      return {
        selectedCC: null,
        selectedAA: null,
        pid: null,
        fname: null,
        mname: null,
        lname: null,
        dateMovein: null,
        addr: null,
        tel: null,
        email: null,
        img: null,
        fileName: null
      }
    },
    props: {
      addDialogOpen: Boolean,
    },
    methods: {
      ...mapActions('ccaattmmStore',['getCCList','getAAList']),
      ...mapActions('deputyDistrictStore', ['createDeputy']),
      onDialogClose () {
        this.$emit('dialogChangeStatus', false)
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
      async onDialogSubmit () {
        if(!this.pid || !this.fname || !this.lname || !this.selectedCC || !this.selectedAA || !this.dateMovein )
          return swal({icon:'warning', title: 'กรุณากรอกข้อมูลให้ครบถ้วน'})
        const {fileName,selectedCC,selectedAA, ...rest} = this.$data
        let catmUkey= (`${selectedCC}${selectedAA}`).padBack("8")
        let payload = {...rest,catmUkey}
        const result = await this.createDeputy(payload)

        if (result === true) {
          this.selectedAA= null
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
