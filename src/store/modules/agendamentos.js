import { http } from "@/services/axiosConfig";
import { converterDataParaUTC, formatarDataHora } from "@/services/date";
import tratarAgendamento from "@/services/erros/tratarAgendamento";
import { formatDate } from "@/services/date";
const agendamentosModule = {
  state: {
    mensagemResposta: "",
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
        curso: "",
        usuarioId: "",
        dataNascimento: "",
      },
      Profissional: {
        id: "",
        nome: "",
        especialidade: "",
      },
      data: "",
      data_solicitacao: "",
      id: "",
      observacao: "",
      profissionalId: "",
      pacienteId: "",
      respostas: "",
      servico: "",
      status: "",
    },


    idConsultaState: '',



    consultas: [],
    consultasFiltradas: [],
    consultasProfissional: []
    // outras definições relacionadas às consultas
  },


  mutations: {

    setIdConsultaState(state, payload) {
      state.idConsultaState = payload
    },

    setMensagemResposta(state, payload) {

      state.mensagemResposta = payload
    },


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
    setConsultasProfissional(state, payload) {
      state.consultasProfissional = payload
    },
    setConsultasFiltradas(state, payload) {
      state.consultasFiltradas = payload;
    },
  },
  getters: {
    consultasParaHoje: (state) => {
      // Obtém a data atual no formato 'yyyy-mm-dd'
      const now = new Date()
        .toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-");

      console.log(now);

      return state.consultas.filter((consulta) => {
        // Converte a data da consulta para o formato 'yyyy-mm-dd'
        const consultaData = new Date(consulta.data)
          .toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-");
        // Compara a data da consulta com a data atual
        return consultaData === now;
      });
    },

    consultasParaAmanha: (state) => {
      // Obtém a data de amanhã
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowFormatted = tomorrow
        .toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-");

      return state.consultas.filter((consulta) => {
        // Converte a data da consulta para o formato 'yyyy-mm-dd'
        const consultaData = new Date(consulta.data)
          .toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-");
        // Compara a data da consulta com a data de amanhã
        return consultaData === tomorrowFormatted;
      });
    },


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

    consultasAtendimentoMedico: (state) =>
      state.consultas.filter(
        (consulta) => consulta.servico === "Atendimento Médico"
      ),

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

    consultasSolicitadas: (state) =>
      state.consultas.filter((consulta) => consulta.status === "Solicitada"),
    consultasConfirmadas: (state) =>
      state.consultas.filter((consulta) => consulta.status === "Confirmada"),

    consultasCanceladas: (state) =>
      state.consultas.filter((consulta) => consulta.status === "Cancelada"),

    consultasProfissional: (state) => state.consultasProfissional
  },

  actions: {


    setIdConsultaState({ commit }, id) {
      commit('setIdConsultaState', id)
    },

    setMensagemResposta({ commit }, mensagem) {
      commit('setMensagemResposta', mensagem)
    },

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
    setConsultasProfissional({ commit, state }, consultas) {
      commit("setConsultasProfissional", consultas);
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
    },
    async agendarConsulta({ commit, state, dispatch }) {
      console.log("agendar consulta");
      const consultaId = state.consulta ? Number(state.consulta.id) : null;
      console.log(state.consulta);
      const resposta = tratarAgendamento(state.consulta);

      console.log(resposta);

      switch (resposta) {
        case "Escolha um profissional":
        case "Data indefinida":
          commit("setIsMsgSAgendamento", false);
          commit("setAvisoDataObg", true);
          break;
        case "Consulta válida":


          try {
            let dataNula = new Date(0, 0, 0);
            const consulta = {
              status: state.consulta.status,
              profissionalId: state.consulta.profissionalId,
              data: state.consulta.data
                ? state.consulta.data.concat(":00.000Z")
                : formatDate(dataNula),
            };

            console.log("dados da consulta 317: ", Number(consultaId), consulta);

            // Enviar a requisição para agendar a consulta
            const resultadoRequest = await http.post(
              `consulta/agendar`,
              {
                id: Number(consultaId),
                dataConsulta: consulta.data,
                profissionalId: consulta.profissionalId,
                // status: consulta.status,
              }
            );
            if (resultadoRequest.status === 200) {
              commit("setShowAlertErrorAgendarConsulta", false);
              dispatch("listarConsultas");
              commit("setShowEditarConsulta", false);
              commit("setIsMsgSAgendamento", true);
              commit("setAvisoDataObg", false);
            }
          } catch (error) {
            commit("setAvisoDataObg", false);
            commit("setIsMsgSAgendamento", false);
            console.log(error.response.data.error)
            dispatch('setMensagemResposta', error.response.data.error)
            commit("setShowAlertErrorAgendarConsulta", true);


          }



          break;
      }
      console.log("Resposta 1:", resposta);
    },
    async getConsultaProfissional({ commit, state }, idProfissional) {
      const consultas = await http.get(`consultas-profissional/${idProfissional}`);
      commit("setConsultasProfissional", consultas.data);
      console.log(state.consultasProfissional)

      console.log(consultas.data);
    },
    async getConsulta({ commit, state }, idConsulta) {
      const dadosConsulta = await http.get(`consulta/${idConsulta}`);
      commit("setConsulta", dadosConsulta.data);
      console.log(state.consulta);
      state.consulta.data = state.consulta.data
        ? formatarDataHora(state.consulta.data)
        : null;
      console.log(state.consulta);
      state.consulta.data_solicitacao = formatDate(
        state.consulta.data_solicitacao
      );
    },
    async atualizarConsulta({ state, dispatch }) {
      state.consulta.status = "Cancelada";
      console.log(state.consulta.data);
      const dadosConsulta = {
        data: converterDataParaUTC(state.consulta.data),
        status: state.consulta.status,
        profissionalId: state.consulta.profissionalId,
      };

      console.log(dadosConsulta);
      console.log(state.consulta);

      try {
        const idConsulta = Number(state.consulta.id);
        await http.put(`consulta/${idConsulta}`, dadosConsulta);
        dispatch("listarConsultas");
      } catch (error) {
        console.log(error);
      }

      console.log(state.consulta.status);
    },
    async listarConsultas({ commit }) {
      const resposta = await http.get("consultas");
      const data = await resposta.data;
      console.log(data);
      commit("setConsultas", data.consultas);
    },
    async excluirConsulta({ commit, state, dispatch }) {
      console.log("teste id consulta do store");
      console.log(state.idConsulta);

      try {
        const idConsulta = Number(state.consulta.id);
        await http.delete(`consulta/${idConsulta}`);
        dispatch("listarConsultas");
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default agendamentosModule;
