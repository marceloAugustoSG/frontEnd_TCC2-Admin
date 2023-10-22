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
    consultas: (state) => state.consultas
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

    async atualizarConsulta({ commit }, id, data) {
      try {

        const resposta = await http.put(`consulta/${id}`, data)
        const dados = await resposta.data
        console.log(dados)
      } catch (error) {
        console.log(`erro: ${error}`)

      }

    },

    async listarConsultas({ commit }) {
      try {
        const resposta = await http.get('consultas')
        const data = await resposta.data
        console.log(data)
        commit('setConsultas', data)
        console.log(this.state.consultas)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default store;
