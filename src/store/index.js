import Vue from 'vue'
import Vuex from 'vuex'
import empStore from './modules/EmpStore'
import actionPageStore from './modules/ActionPageStore'
import ccaattmmStore from './modules/ccaattmmStore'
import deputyStore from './modules/Deputy/DeputyStore'
import deputyDistrictStore from './modules/Deputy/DeputyDistrictStore'
import officialStore from './modules/Moi/OfficialStore'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    empStore,
    actionPageStore,
    ccaattmmStore,
    deputyStore,
    deputyDistrictStore,
    officialStore
  },
  strict: debug
})
