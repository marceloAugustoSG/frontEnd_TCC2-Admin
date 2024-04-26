const relatoriosModule = {
  state: {
    dataIni: Date,
    dataFim: Date,
    filtro: String,
    status: String,
  },
  mutations: {
    setDataIni(state, payload) {
      state.dataIni = payload;
    },
    setDatafim(state, payload) {
      state.dataFim = payload;
    },
    setFiltro(state, payload) {
      state.filtro = payload;
    },

    setStatus(state, payload) {
      state.status = payload;
    },
  },
  getters: {
    
  },
  actions: {
    setFiltro({ commit }, filtro) {
      commit("setFiltro", filtro);
      console.log(this.state.relatorio.filtro);
    },

    setStatus({ commit }, status) {
      commit("setStatus", status);
      console.log(this.state.relatorio.dataIni);
    },
    setDataInit({ commit }, data) {
      commit("setDataIni", data);
      console.log(data);
      console.log(this.state.relatorio.dataIni);
    },
    setDataFim({ commit }, data) {
      commit("setDatafim", data);
      console.log(this.state.relatorio.dataFim);
    },
    setFiltro({ commit }, filtro) {
      commit("setFiltro", filtro);
      console.log(this.state.relatorio.filtro);
    },

    async gerarRelatorio({ commit }) {
      try {
        const consultas = this.getters.consultas;
        console.log(this.getters);

        // Defina as datas de início e fim
        const dataInicio = new Date(this.state.relatorio.dataIni);
        const dataFim = new Date(this.state.relatorio.dataFim);
        const filtro = this.state.relatorio.filtro;
        const status = this.state.relatorio.status;
        console.log(dataInicio);

        if (filtro === "Todos") {
          const consultasFiltradas = consultas.filter((consulta) => {
            const dataConsulta = new Date(consulta.data_solicitacao);
            console.log(dataConsulta);

            return (
              (dataConsulta >= new Date(dataInicio) || !dataInicio) &&
              (dataConsulta <= new Date(dataFim) || !dataFim) &&
              consulta.status === status
            );
          });
          commit("setConsultasFiltradas", consultasFiltradas);
        } else {
          const consultasFiltradasSF = consultas.filter((consulta) => {
            const dataConsulta = new Date(consulta.data_solicitacao);

            return (
              (dataConsulta >= new Date(dataInicio) || !dataInicio) &&
              (dataConsulta <= new Date(dataFim) || !dataFim) &&
              consulta.status === status &&
              consulta.servico === filtro
            );
          });
          commit("setConsultasFiltradas", consultasFiltradasSF);
        }
        console.log(this.state.agendamento.consultasFiltradas);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
export default relatoriosModule;
