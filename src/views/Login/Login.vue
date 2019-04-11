<template>
  <v-app  class="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout  align-center justify-center align-content-space-between>
          <v-flex offset-xs-8 xs4 class="loginTemplate">
            <v-card  class="fullHeight card-5" max-width="700">
              <v-layout wrap class="fullHeight">
                <v-flex xs12 sm12 >
                  <v-flex style="display:flex; justify-content:space-between; flex-direction :column; height:100%">
                    <!-- <div class="bar"></div> -->
                    <v-flex class="text-xs-center">
                      <v-avatar size="10rem" class="logo" style="margin-top:40px;">
                        <h1 style="font-size: 34px">Amphoe</h1>
                        <!--<img src=".././assets/VDC_LOGO.png" alt="#">-->
                      </v-avatar>
                    </v-flex>
                    <v-layout >
                      <v-flex  offset-xs3 xs6>
                        <v-text-field v-model="empPid" label="รหัสประจำตัวประชาชน" ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout mt-4>
                      <v-flex  offset-xs3 xs6>
                        <v-text-field v-model="empPass" type='password' label="รหัสผ่าน" ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-flex my-3 class="text-xs-center">
                      <v-btn @click="onLoginBtnClick">เข้าสู่ระบบ</v-btn>
                    </v-flex>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'Login',
    methods: {
      ...mapActions('empStore',['login']),
      async onLoginBtnClick (){
        const {empPid, empPass} = this
        await this.login({EMP_PID: empPid, password: empPass})
      }
    },
    data() {
      return {
        empPid: null,
        empPass: null
      }
    },
  }
</script>

<style scoped>

</style>
