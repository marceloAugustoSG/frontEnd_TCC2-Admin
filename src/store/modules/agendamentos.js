import { http } from "@/services/axiosConfig";
import formatDate from "@/services/date";

const agendamentosModule = {
  state: {
    isMessageSucesso: false,

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
    consultas: [],
    consultasFiltradas: [],
    // outras definições relacionadas às consultas
  },
  mutations: {
 
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
    // outras mutações relacionadas às consultas
  },
  getters: {
    consultas: (state) => state.consultas,
    consultasFiltradas: (state) => state.agendamento.consultasFiltradas,
    consultasAsc: (state) => {
      const consultasOrdenadasAsc = [...state.consultas];
      function ordenanarAsc(a, b) {
        return a.data_solicitacao - b.data_solicitacao;
      }
      consultasOrdenadasAsc.sort(ordenanarAsc);
      return consultasOrdenadasAsc;
    },
    consultasDesc: (state) => {
      const consultasOrdenadasDesc = [...state.consultas];
      function ordenanarDesc(a, b) {
        return b.data_solicitacao - a.data_solicitacao;
      }
      consultasOrdenadasDesc.sort(ordenanarDesc);
      return consultasOrdenadasDesc;
    },
    consultas: (state) => state.consultas,
    consultasFiltradas: (state) => state.consultasFiltradas,
    consultasAtendimentoPsicologico: (state) =>
      state.consultas.filter(
        (consulta) => consulta.servico === "Atendimento Psicológico"
      ),
    consultasExetoPsicologico: (state) =>
      state.consultas.filter(
        (consulta) => consulta.servico !== "Atendimento Psicológico"
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
    setDataConsulta({ commit }, valor) {
      commit("setDataConsulta", valor);
    },

    IsMessage({ commit }, valor) {
      commit("setIsMessage", valor);
      // console.log(this.state.is)
    },

    async agendarConsulta({ commit, state }) {
      let dataNula = new Date(0, 0, 0);
      const consulta = {
        status: state.consulta.status,
        profissionalId: state.consulta.profissionalId,
        data: state.consulta.data
          ? state.consulta.data.concat(":00.000Z")
          : formatDate(dataNula),
      };
      const consultaId = state.consulta ? Number(state.consulta.id) : null;
      if (consultaId !== null) {
        await http.put(`consulta/${consultaId}`, consulta);
      } else {
        console.error("Consulta está nula ou indefinida");
      }
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
    async listarConsultas({ commit }) {
      try {
        const resposta = await http.get("consultas");
        const data = await resposta.data;
        commit("setConsultas", data);
      } catch (error) {
        console.error(error);
      }
    },
    async excluirConsulta({ commit }, idConsulta) {
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
