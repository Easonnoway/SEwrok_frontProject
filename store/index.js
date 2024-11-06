import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
    
    }
  },
  actions:{
    updateuser(context,newuser){
      context.commit('SETUSER',newuser)
    }
  },
  mutations:{
    SETUSER(state,value){
        state.user = value
    }
  }
});

export default store;
