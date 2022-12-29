import { createStore } from 'vuex'
// import { createStore } from './gvuex'

const store = createStore({
  state() {
    return {
      count: 666
    }
  },
  getters: {
    double(state) {
      return state.count * 2
    }
  },
  mutations: {
    add(state) {
      state.count++
    }
  },
  actions: {
    asyncAdd({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    },

    addRoutes({ commit }, accessRoutes) {
      // 添加动态路由，同时保存移除函数，将来如果需要重置路由可以用到它们
      const removeRoutes = []
      accessRoutes.forEach((route) => {
        const removeRoute = router.addRoute(route)
        removeRoutes.push(removeRoute)
      })
      commit('SET_REMOVE_ROUTES', removeRoutes)
    }
  }
})

export default store
