import { createStore } from "vuex";
import { http } from "@/services/axiosConfig";
import router from "@/router";
import formatDate from "@/services/date";
const store = createStore({
  state: {
    consulta: {
      Paciente: {
        id: '',
        nome: '',
        telefone: '',
        matricula: '',
        tipo: '',
        usuarioId: '',
        dataNascimento: ''
      },
      Profissional: {
        id: '',
        nome: ''
      },
      data: '',
      data_solicitacao: '',
      id: '',
      observacao: '',
      profissionalId: '',
      pacienteId: '',
      respostas: '',
      servico: '',
      status: ''
    },
    consultas: [],
    profissionais: [],
    mensagem: '',
    isMessageSucesso: false,
    isMessageExcluir: false
  },
  mutations: {

    setIsMessageExcluir(state, payload) {
      state.isMessageExcluir = payload

    },
    setIsMessage(state, payload) {
      state.isMessageSucesso = payload

    },
    setConsulta(state, payload) {
      state.consulta = payload
    }
    ,
    setMensagem(state, payload) {
      state.mensagem = payload
    },
    setConsultas(state, payload) {
      state.consultas = payload
    },
    setProfissionais(state, payload) {
      state.profissionais = payload
    }
  },
  getters: {
    consultas: (state) => state.consultas
  },
  actions: {

    IsMessage({ commit }, valor) {
      commit('setIsMessage', valor)
      console.log(this.state.isMessage)


    },
    IsMessageExcluir({ commit }, valor) {
      commit('setIsMessageExcluir', valor)
      console.log(this.state.isMessageExcluir)


    },

    async agendarConsulta({ commit }) {
      let dataNula = new Date(0, 0, 0)
      const consulta = {
        status: this.state.consulta.status,
        profissionalId: this.state.consulta.profissionalId,
        data: store.state.consulta.data ? store.state.consulta.data.concat(':00.000Z') : formatDate(dataNula)
      }
      console.log(consulta)
      const consultaId = Number(this.state.consulta.id)
      console.error(this.state.consulta)
      try {
        const resposta = await http.put(`consulta/${consultaId}`, consulta)
        console.log(resposta.data)
      } catch (error) {
        console.error(error)
      }
    },

    async getConsulta({ commit }, idConsulta) {
      let consultaId = Number(idConsulta);
      try {
        const data = await http.get(`consulta/${consultaId}`);
        console.log('Consulta do GET:');
        console.log(data.data);
        let dataConsulta = data.data.data ? formatDate(new Date(data.data.data)) : formatDate(null);
        console.log(dataConsulta)
        console.log("Data Consulta:")
        console.log(dataConsulta)

        let datasolicitacao = new Date(data.data.data_solicitacao);
        datasolicitacao = formatDate(datasolicitacao);

        data.data.data = dataConsulta;
        data.data.data_solicitacao = datasolicitacao;
        commit('setConsulta', data.data);
        console.log(this.state.consulta);
      } catch (error) {
        console.error(error);
      }
    },

    async logar({ commit }, usuario) {
      try {
        const resposta = await http.post('login', usuario)
        const data = resposta.data
        console.error(data)

        if (data.usuario.regra === 'psicologo') {
          localStorage.setItem('usuarioId', data.usuario.id)
          localStorage.setItem('token', data.token)
          router.push({ name: 'dashboard' })
        }
        if (data.usuario.regra === 'paciente') {
          router.push({ name: 'login' })

        }

      } catch (error) {
        console.error(error)
      }

    },
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
        console.log(data)
        commit('setConsultas', data)
        console.log(this.state.consultas)
      } catch (error) {
        console.error(error)
      }
    },

    async excluirConsulta({ commit }, idConsulta) {
      let consultaId = Number(idConsulta);
      try {
        const resposta = await http.delete(`consulta/${consultaId}`)
        console.log(resposta.data)

      } catch (error) {
        console.error(error)

      }


    },
  }, logout({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('pacienteId')
    localStorage.removeItem('message')
    this.state.message = ''
    this.state.consultas = []
  },

})

export default store;
