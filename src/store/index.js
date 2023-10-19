import { createStore } from "vuex";
import { http } from "@/services/axiosConfig";
const store = createStore({
  state: {
    consultas: [],
    profissionais: []
  },
  mutations: {
    setConsultas(state, payload) {
      state.consultas = payload
    },

    setProfissionais(state, payload) {

      state.profissionais = payload
    }
    ,
  },
  getters: {
    getConsultas: state => state.consultas
  },
  actions: {
    async listarProfissionais({ commit }) {
      try {
        const resposta = await http.get('profissionais')
        const data = await resposta.data
        commit('setProfissionais', data)
      } catch (e) {
        console.log(e)
      }

    },

    async listarConsultas({ commit }) {
      try {
        const resposta = await http.get('consultas')
        const data = await resposta.data
        commit('setConsultas', data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default store;
