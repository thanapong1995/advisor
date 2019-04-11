
import axios from 'axios'
import { checkDate, isValidDate, removeEmpty, transformObject } from '../../../helper/helperFunction'
import  swal  from 'sweetalert'

const state = {
  deputyList: []
}

const getters = {
}

const actions = {
  async getDeputy ({commit, state}, payload) {
    removeEmpty(payload)
    payload = transformObject(payload)
    const result = await axios.post('/dods/services/public/api/moi/official/search', payload)
    if (result.data.isFound === true) {
      commit('SET_DEPUTY_LIST', result.data.data)

    } else {
      commit('SET_DEPUTY_LIST', [])
    }
  },
  async deleteDeputy ({commit, state}, payload) {
    const result = await axios.get('/dods/services/public/api/moi/official/delete/'+payload )
    if (result.data.status === true) {
      swal({icon: 'success', title: 'ลบข้อมูลข้าราชการ สำเร็จ'})
      return true
    } else {
      swal({icon: 'error', title: 'ลบข้อมูลข้าราชการ ล้มเหลว'})
      return false
    }
  },
  async updateDeputy ({commit, state}, payload) {

    let {img, ...rest} = payload
    removeEmpty(rest)
    if (rest.dateMoveout && rest.dateMoveout !== null) {
      let formattedDate = `${rest.dateMoveout.substring(0, 2)}/${rest.dateMoveout.substring(2, 4)}/${rest.dateMoveout.substring(4)}`
      if (isValidDate(formattedDate) === false) {
        return swal({icon: 'warning', title: 'วันที่ไม่ถูกต้อง'})
      }
      if (checkDate(formattedDate) === false) {
        return swal({icon: 'warning', title: 'วันที่ไม่ถูกต้อง'})
      }
      rest.dateMoveout = parseInt(rest.dateMoveout.substring(4)) - 543 + rest.dateMoveout.substring(2, 4) + rest.dateMoveout.substring(0, 2)
    }

    let formData = new FormData()
    formData.append('image', img)
    rest = transformObject(rest)
    for (let key in rest) {
      formData.append(key, rest[key])
    }
    const result = await axios.post('/dods/services/public/api/moi/official/update', formData)
    if (result.data.status === true) {
      swal({icon: 'success', title: 'แก้ไขข้อมูลข้าราชการ สำเร็จ'})
      return true
    } else {
      swal({icon: 'error', title: 'แก้ไขข้อมูลข้าราชการ ล้มเหลว'})
      return false
    }
  },
  async createDeputy ({commit, state}, payload) {
    removeEmpty(payload)
    let {img, ...rest} = payload
    if (rest.dateMovein !== null) {
      let formattedDate = `${rest.dateMovein.substring(0, 2)}/${rest.dateMovein.substring(2, 4)}/${rest.dateMovein.substring(4)}`
      if (isValidDate(formattedDate) === false) {
        return swal({icon: 'warning', title: 'วันที่ไม่ถูกต้อง'})
      }
      if (checkDate(formattedDate) === false) {
        return swal({icon: 'warning', title: 'วันที่ไม่ถูกต้อง'})
      }
      rest.dateMovein = parseInt(rest.dateMovein.substring(4)) - 543 + rest.dateMovein.substring(2, 4) + rest.dateMovein.substring(0, 2)
    }
    let formData = new FormData()
    formData.append('image', img)
    rest = transformObject(rest)
    for (let key in rest) {
      formData.append(key, rest[key])
    }
    const result = await axios.post('/dods/services/public/api/moi/official', formData)
    if (result.data.status === true) {
      swal({icon: 'success', title: 'เพิ่มข้อมูลข้าราชการ สำเร็จ'})
      return true
    } else {
      swal({icon: 'error', title: 'เพิ่มข้อมูลข้าราชการ ล้มเหลว'})
      return false
    }
  },
}
const mutations = {
  SET_EMP (state, payload){
    state.emp = payload
  },
  SET_DEPUTY_LIST(state, payload) {
    state.deputyList = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
