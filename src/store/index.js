import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import url from '../url'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: [],
    transactions:[],
    planner:[],
    inventory:[]
  },
  getters:{
    getUser(state) {
    return state.user
    },
    getTransactions(state) {
      return state.transactions
      },
      getPlanner(state) {
        return state.planner
        },
        getInventory(state) {
          return state.inventory
          },
  },
  mutations: {
    setUser(state, payload){
      return state.user = payload
    },
    setTransaction(state, payload){
      return state.transactions = payload
    },
    setPlanner(state, payload){
      return state.planner = payload
    },
    setInventory(state, payload){
      return state.inventory = payload
    }
  },
  actions: {
    async getProfile({commit, dispatch}){
      const token = localStorage.getItem('token');
      const user = await axios.get(`${url}/profile`, { headers: { 'Authorization': `Bearer ${token}` } })
      commit('setUser', user.data)
    },
    async getTransaction({commit, dispatch}){
      const token = localStorage.getItem('token');
      const transaction = await axios.get(`https://api-inventoryapp.herokuapp.com/transactions`, { headers: { 'Authorization': `Bearer ${token}` } })
      const tran = transaction.data
      const newTran = tran.sort(function(a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return d-c;
    });
       commit('setTransaction', newTran)
    },

    async getPlanner({commit, dispatch}){
      const token = localStorage.getItem('token');
      const planner = await axios.get(`https://api-inventoryapp.herokuapp.com/planner`, { headers: { 'Authorization': `Bearer ${token}` } })
      const tran = planner.data
      const newTran = tran.sort(function(a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return d-c;
    });
       commit('setPlanner', newTran)
    },

    async getInventory({commit, dispatch}){
      const token = localStorage.getItem('token');
      const inventory = await axios.get(`https://api-inventoryapp.herokuapp.com/inventory`, { headers: { 'Authorization': `Bearer ${token}` } })
      const tran = inventory.data
      const newTran = tran.sort(function(a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return d-c;
    });
       commit('setInventory', newTran)
    }

  }

})
