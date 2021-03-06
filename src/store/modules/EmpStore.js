
import axios from 'axios'
//
// let getDefaultState = () => ({
//   programName: null,
//   pid: null,
//   cid: null,
//   emp: null,
//   desc: null,
//   X: null,
//   permit: null,
//   envelope: null,
//   n: null,
//   verifyStatus: false,
//   linkageToken: null,
//   name: null,
//   tName: null,
//   fName: null,
//   mName: null,
//   lName: null,
//   faceImage: null,
//   linkage: null,
//   status: null,
//   IndexMenu: null,
//   selectMenu: false,
//   selectSubMenuIndex: null,
//   Menu: null
// })
const state = {
  emp: null,
  groupItem:[
    { text: "อำเภอ", value: 1 },
    { text: "จังหวัด", value: 2},
    { text: "ส่วนกลาง", value: 3},
    { text: "แอดมิน", value: 4},
    { text: "ผู้บริหาร", value: 5}
  ],
}

const getters = {
}

const actions = {

  login: async ({commit, state}, { EMP_USER }) => {
    try {
      const result = await axios.post('/testpro/login.php', { EMP_USER })
      const emp = result.data[0]
      // const emp = {
      //   USER_NAME: "adisakt",
      //   DEPT_CODE: "0103",
      //   FAC_CODE: "01",
      //   NAME: "อดิศักดิ์ โตจะนะ",
      //   PERMISS: "0",
      //   POSITION: null,
      //   FAC_CODE2: null,
      //   PERMISS2: null,
      //   LAST_LOGIN: null
      // }
      commit('SET_EMP',emp)
    } catch (e) {
      const { error } = e.response.data
      return error
    }
  }
}
const mutations = {
  SET_EMP (state, payload){
    state.emp = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
