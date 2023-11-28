import { createStore } from "vuex";
import { http } from "@/services/axiosConfig";
import router from "@/router";
import formatDate from "@/services/date";
const store = createStore({
  state: {
    // Administrador
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
        nome: '',
        especialidade: ''
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
    isMessageExcluir: false,
    profissionais: [],
    resposta: {
      "Centro": String,
      "Curso": String,
      "Estudante de": String,
      "Motivos para o atendimento": String,
      "Respostas Confidencias": {
        "1": String,
        "2": String,
        "3": String,
        "4": String,
        "5": String,
        "6": String,
        "7": String,
        "8": String,
        "9": String,
        "10": String,
        "11": String,
        "12": String,
        "13": String,
        "14": String,
        "15": String,
        "16": String,
        "17": String,
        "18": String,
        "19": String,
        "20": String
      }
    },



    // Psicologo
  },
  mutations: {
    setProfissionais(state, payload) {
      state.profissionais = payload
    },

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
    },

    setRespostas(state, payload) {
      state.resposta = payload
    },
  },
  getters: {
    consultas: (state) => state.consultas,

    consultasAtendimentoPsicologico: (state) => state.consultas.filter(consulta => consulta.servico === "Atendimento Psicológico"),
    consultasExetoPsicologico: (state) => state.consultas.filter(consulta => consulta.servico !== "Atendimento Psicológico"),
    respostasConfidenciais: (state) => JSON.parse(state.consulta.respostas),
    // profissionais: (state) => state.profissionais.map(profissional => `${profissional.nome} (${profissional.especialidade})`),

    profissionais: (state) => state.profissionais.map(profissional => ({
      id: profissional.id, // substitua "id" pelo nome correto do campo na sua API
      nome: `${profissional.nome} (${profissional.especialidade})`,
      especialidade: profissional.especialidade
    }))

  },
  actions: {

    resposta({ commit }) {
      commit('setRespostas', this.getters.respostasConfidenciais)
      console.log(this.state.resposta)


    },

    async getProfissionais({ commit }) {
      try {
        const resposta = await http.get('profissionais')
        commit('setProfissionais', resposta.data)
        console.log(resposta.data)
        console.log(this.state.profissionais)
      } catch (error) {
        console.error(error)

      }

    },

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
        let dataConsulta = data.data.data ? formatDate(new Date(data.data.data)) : formatDate(null);
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
          localStorage.setItem('isAdm', false)
          localStorage.setItem('isPsi', true)

          localStorage.setItem('usuarioId', data.usuario.id)
          localStorage.setItem('token', data.token)
          router.push({ name: 'dashboardPsi' })
        }
        if (data.usuario.regra === 'paciente') {
          router.push({ name: 'login' })

        }
        if (data.usuario.regra === 'administrador') {
          localStorage.setItem('isAdm', true)
          localStorage.setItem('isPsi', false)


          router.push({ name: 'dashboardAdmin' })

        }

      } catch (error) {
        console.error(error)
      }

    },
    async listarProfissionais({ commit }) {
      try {
        const resposta = await http.get('profissionais')
        const data = await resposta.data
        console.log(data.data)
        // const nomeFormatado = data.nome.concat(`(${data.especialidade})`)
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
  },
  logout({ commit }) {
    localStorage.clear()
    localStorage.removeItem('token')
    localStorage.removeItem('usuarioId')
    localStorage.removeItem('message')
    this.state.message = ''
    this.state.consultas = []
  },

  gerarPlanilha({ commit }) {



  }

})

export default store;
