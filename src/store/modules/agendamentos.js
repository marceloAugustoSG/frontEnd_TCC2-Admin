import { http } from "@/services/axiosConfig";
import formatDate from "@/services/date";
import tratarAgendamento from "@/services/erros/tratarAgendamento";

const agendamentosModule = {
  state: {
    search: "",
    ordenar: "",
    ord: 0,
    isMessageSucesso: false,
    idConsulta: Number,
    consulta: {
      Paciente: {
        id: "",
        nome: "",
        telefone: "",
        matricula: "",
        tipo: "",
        usuarioId: "",
        dataNascimento: "",
      },
      Profissional: {
        id: "",
        nome: "",
        especialidade: "",
      },
      data: new Date(0, 0, 0),
      data_solicitacao: "",
      id: "",
      observacao: "",
      profissionalId: "",
      pacienteId: "",
      respostas: "",
      servico: "",
      status: "",
    },
    consultas: [],
    consultasFiltradas: [],
    // outras definições relacionadas às consultas
  },
  mutations: {
    setSearch(state, payload) {
      state.ord = payload;
    },
    setIdConsulta(state, payload) {
      state.idConsulta = payload;
    },
    setProfissional(state, profissional) {
      state.consulta.Profissional = profissional;
    },

    setProfissionalId(state, newId) {
      state.consulta.profissionalId = newId;
    },
    setIsMessage(state, payload) {
      state.isMessageSucesso = payload;
    },

    setDataConsulta(state, payload) {
      state.consulta.data = payload;
    },
    setConsulta(state, payload) {
      state.consulta = payload;
    },
    setConsultas(state, payload) {
      state.consultas = payload;
    },
    setConsultasFiltradas(state, payload) {
      state.consultasFiltradas = payload;
    },
  },
  getters: {
    consultasFiltradas: (state) => {
      // Faz uma cópia da matriz de consultas
      let consultasFiltradas = [...state.consultas];

      // Verifica a ordem de classificação
      switch (state.ord) {
        case 0:
          // Ordena em ordem crescente
          consultasFiltradas.sort(
            (a, b) =>
              new Date(a.data_solicitacao) - new Date(b.data_solicitacao)
          );

          break;
        case 1:
          // Ordena em ordem decrescente
          consultasFiltradas.sort(
            (a, b) =>
              new Date(b.data_solicitacao) - new Date(a.data_solicitacao)
          );
          break;
      }

      // Filtra com base no critério selecionado
      switch (state.ordenar) {
        case "Status":
          consultasFiltradas = consultasFiltradas.filter((consulta) =>
            consulta.status.toLowerCase().includes(state.search)
          );
          break;
        case "Serviço":
          consultasFiltradas = consultasFiltradas.filter((consulta) =>
            consulta.servico.toLowerCase().includes(state.search)
          );
          break;
        case "Paciente":
          consultasFiltradas = consultasFiltradas.filter((consulta) =>
            consulta.Paciente.nome.toLowerCase().includes(state.search)
          );
          break;
      }

      return consultasFiltradas;
    },

    consultas: (state) => state.consultas,

    consultasAtendimentoPsicologico: (state) =>
      state.consultas.filter(
        (consulta) => consulta.servico === "Atendimento Psicológico"
      ),
    consultasExcetoPsicologicoSolicitada: (state) =>
      state.consultas.filter(
        (consulta) =>
          consulta.status !== "Solicitada" ||
          consulta.servico !== "Atendimento Psicológico"
      ),
    // outros getters relacionados às consultas
  },
  actions: {
    setSearch({ commit }, search) {
      commit("setSearch", search);
    },
    setConsultasAsc({ commit, getters, state }) {
      commit("setConsultasFiltradas", getters.consultasFiltradas);
      console.log(state.consultasFiltradas);
    },
    setConsultasDec({ commit, getters, state }) {
      commit("setConsultasFiltradas", getters.consultasDec);
      console.log(state.consultasFiltradas);
    },
    setConsultas({ commit, state }, consultas) {
      commit("setConsultas", consultas);
    },

    setIdConsulta({ commit }, id) {
      commit("setIdConsulta", id);
    },
    setProfissional({ commit }, profissional) {
      commit("setProfissional", profissional);
    },
    setProfissionalId({ commit }, newId) {
      commit("setProfissionalId", newId);
    },
    setConsulta({ commit, dispatch }, valor) {
      commit("setConsulta", valor);
    },

    setDataConsulta({ commit }, valor) {
      commit("setDataConsulta", valor);
    },

    IsMessage({ commit }, valor) {
      commit("setIsMessage", valor);
      // console.log(this.state.is)
    },

    // async agendarConsulta({ commit, state }) {
    //   let dataNula = new Date(0, 0, 0);
    //   const consulta = {
    //     status: state.consulta.status,
    //     profissionalId: state.consulta.profissionalId,
    //     data: state.consulta.data
    //       ? state.consulta.data.concat(":00.000Z")
    //       : formatDate(dataNula),
    //   };
    //   const consultaId = state.consulta ? Number(state.consulta.id) : null;
    //   if (consultaId !== null) {
    //     await http.put(`consulta/${consultaId}`, consulta);
    //     console.log(consulta);
    //   } else {
    //     console.error("Consulta está nula ou indefinida");
    //   }
    // },

    async agendarConsulta({ commit, state }) {
      console.log("agendar consulta");
      const consultaId = state.consulta ? Number(state.consulta.id) : null;
      console.log(state.consulta);
      const resposta = tratarAgendamento(state.consulta);

      switch (resposta) {
        case "Escolha um profissional":
          commit("setAvisoDataObg", true);
          break;
        case "Data indefinida":
          commit("setAvisoDataObg", true);
          break;
        case "Consulta válida":
          commit("setIsMsgSAgendamento", true);
          try {
            let dataNula = new Date(0, 0, 0);
            const consulta = {
              status: state.consulta.status,
              profissionalId: state.consulta.profissionalId,
              data: state.consulta.data
                ? state.consulta.data.concat(":00.000Z")
                : formatDate(dataNula),
            };
            const resultadoRequest = await http.put(
              `consulta/${consultaId}`,
              consulta
            );

            console.log(resultadoRequest.status);
          } catch (error) {
            console.log(error);
          }

          break;
      }
      console.log("Resposta 1 : ");
      console.log(resposta);
    },

    async getConsulta({ commit }, idConsulta) {
      let consultaId = Number(idConsulta);
      try {
        const data = await http.get(`consulta/${consultaId}`);
        let dataConsulta = data.data.data
          ? formatDate(new Date(data.data.data))
          : formatDate(null);
        let datasolicitacao = new Date(data.data.data_solicitacao);
        datasolicitacao = formatDate(datasolicitacao);
        data.data.data = dataConsulta;
        data.data.data_solicitacao = datasolicitacao;
        commit("setConsulta", data.data);
      } catch (error) {
        console.error(error);
      }
    },

    atualizarConsultas({ state, commit }) {
      return state.consulta;
    },
    async listarConsultas({ commit }) {
      const resposta = await http.get("consultas");
      const data = await resposta.data;
      console.log(data);
      commit("setConsultas", data.consultas);
    },
    async excluirConsulta({ commit }, idConsulta) {
      commit("setIdConsulta", idConsulta);
      console.log("teste id consulta do store");
      console.log(this.state.agendamento.idConsulta);
      let consultaId = Number(idConsulta);
      try {
        await http.delete(`consulta/${consultaId}`);
      } catch (error) {
        console.error(error);
      }
    },
    // outras ações relacionadas às consultas
  },
};

export default agendamentosModule;
