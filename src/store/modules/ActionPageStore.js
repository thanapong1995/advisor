let getDefaultState = () => ({
    action: null
  })
  const state = {
    action: null
  }
  
  const getters = {
  
  }
  const actions = {
    setAction: async ({
      commit,
      state
    }, action) => {
      await commit('SET_ACTION', {
        action
      })
    },
    setItem: async ({
      commit,
      state
    }, item) => {
      await commit('SET_ITEM', {
        item
      })
    }
  }
  const mutations = {
    SET_ACTION (state, {
      action
    }) {
      state.action = action
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  