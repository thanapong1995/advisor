import axios from 'axios'
import swal from 'sweetalert'
const state = {
  ccList: [],
  deptList: [],
  ccDescList: [],
  ccListLevel: [],
  aaList: [],
  ttList: []
}

const getters = {}

const actions = {
  getCCListWithDept: async ({commit, state}, payload) => {
    const result = await axios.get(`/dods/services/public/api/ccaattmm/listCC/dept`)
    const {isFound, data} = result.data
    if (isFound === false) {
      commit('SET_CCLIST', [])
      return swal({
        title: 'ไม่มีข้อมูล',
        icon: 'warning'
      })
    }
    commit('SET_CCLIST', data)
  },
  getCCListWithLevel: async ({commit, state}, payload) => {
    const result = await axios.get(`/dods/services/public/api/ccaattmm/listCC/level`)
    const {isFound, data} = result.data
    if (isFound === false) {
      return commit('SET_CCLISTWITHLEVEL', [])
    }
    commit('SET_CCLISTWITHLEVEL', data)
  },
  getCCDescList: async ({commit, state}, payload) => {
    const result = await axios.get(`/dods/services/public/api/ccaattmm/listCC`)
    const {isFound, data} = result.data
    if (isFound === false) {
      return commit('SET_CC_DESC_LIST', [])
    } else commit('SET_CC_DESC_LIST', [{cc_code: '99', cc_desc: 'ส่วนกลาง'}, ...data])
  },
  getCCList: async ({commit, state}, payload) => {
    const result = await axios.get(`/dods/services/public/api/ccaattmm/listCC`)
    const {isFound, data} = result.data
    if (isFound === false) {
      commit('SET_CCLIST', [])
      return swal({
        title: 'ไม่มีข้อมูล',
        icon: 'warning'
      })
    } else commit('SET_CCLIST', data)
  },
  getDeptListWithEmp: async ({commit, state}, payload) => {
    const result = await axios.get(`/dods/services/public/api/dept/with/place/AA`)
    const {isFound, data} = result.data
    if (isFound === false) {
      return commit('SET_DEPT_LIST', [])
    } else commit('SET_DEPT_LIST', data)
  },
  getDeptList: async ({commit, state}, payload) => {
    const result = await axios.get(`/dods/services/public/api/dept/AA/${payload}`)
    const {isFound, data} = result.data
    if (isFound === false) {
      commit('SET_DEPT_LIST', [])
      return swal({
        icon: 'warning',
        title: 'ไม่มีข้อมูล'

      })
    } else commit('SET_DEPT_LIST', data)
  },
  getAAList: async ({commit, state}, payload) => {
    const result = await axios.get(`/dods/services/public/api/ccaattmm/listAA/${payload}`)
    const {isFound, data} = result.data
    if (isFound === false) {
      return commit('SET_AA_LIST', [])
    } else commit('SET_AA_LIST', data)
  },
  getTTList: async ({commit, state}, {cc,aa}) => {
    const result = await axios.get(`/dods/services/public/api/ccaattmm/listTT/${cc}/${aa}`)
    const {isFound, data} = result.data
    if (isFound === false) {
      return commit('SET_TT_LIST', [])
    } else commit('SET_TT_LIST', data)
  },
  setTTList ({commit, state}, payload) {
    commit('SET_TT_LIST', payload)
  },
  setAAList ({commit, state}, payload) {
    commit('SET_AA_LIST', payload)
  }
}
// getAllDeptAndCountDetail
const mutations = {
  SET_TT_LIST (state, payload){
    state.ttList = payload
  },
  SET_AA_LIST (state, payload) {
    state.aaList = payload
  },
  SET_CCLISTWITHLEVEL (state, payload) {
    state.ccListLevel = payload
  },
  SET_CCLIST (state, payload) {
    state.ccList = payload
  },
  SET_CC_DESC_LIST (state, payload) {
    state.ccDescList = payload
  },
  SET_DEPT_LIST (state, payload) {
    state.deptList = payload
  }
}

export default{
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
