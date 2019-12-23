import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages:[]
  },
  mutations: {
    addMessages(state,message){
      console.log('store.received :', message);
      state.messages.push(message);
      console.log('state.message :', state.messages);
    }
  },
  actions: {
    addMessages(context,message){
      context.commit('addMessages',message)
    }
  },
  modules: {
  }
})
