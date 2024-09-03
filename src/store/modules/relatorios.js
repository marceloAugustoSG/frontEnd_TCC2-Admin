const relatoriosModule = {
  state: {
    dataIni: Date,
    dataFim: Date,
    filtro: String,
    status: String,
    consultasFiltradasRelatorio: [],
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

    setConsultasFiltradasRelatorio(state, payload) {
      state.consultasFiltradasRelatorio = payload
    }
  },
  getters: {
    consultasFiltradasRelatorio: (state) => state.consultasFiltradasRelatorio


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
    setConsultasFiltradasRelatorio({ commit, state }, consultasFiltradasRelatorio) {
      commit('setConsultasFiltradasRelatorio', consultasFiltradasRelatorio)

    },

    // async gerarRelatorio({ commit, state, getters }) {
    //   try {
    //     const consultas = getters.consultas;
    //     console.log(consultas);

    //     // Defina as datas de início e fim

    //     console.log(state.dataIni);
    //     const dataInicio = new Date(state.dataIni);
    //     console.log(dataInicio);
    //     const dataFim = new Date(state.dataFim);
    //     console.log(dataFim);
    //     const filtro = state.filtro;
    //     const status = state.status;
    //     console.log(dataInicio);

    //     if (filtro === "Todos") {
    //       console.log("entrou no filtro todos");
    //       const consultasFiltradas = consultas.filter((consulta) => {
    //         const dataConsulta = new Date(consulta.data_solicitacao);
    //         console.log(dataConsulta);

    //         return (
    //           (dataConsulta >= new Date(dataInicio) || !dataInicio) &&
    //           (dataConsulta <= new Date(dataFim) || !dataFim) &&
    //           consulta.status === status
    //         );
    //       });
    //       commit("setConsultasFiltradas", consultasFiltradas);

    //       console.log(state.consultas);
    //     } else {
    //       const consultasFiltradasSF = consultas.filter((consulta) => {
    //         const dataConsulta = new Date(consulta.data_solicitacao);

    //         return (
    //           (dataConsulta >= new Date(dataInicio) || !dataInicio) &&
    //           (dataConsulta <= new Date(dataFim) || !dataFim) &&
    //           consulta.status === status &&
    //           consulta.servico === filtro
    //         );
    //       });
    //       commit("setConsultasFiltradas", consultasFiltradasSF);
    //     }
    //     console.log(this.state.agendamento.consultasFiltradas);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    async gerarRelatorio({ commit, state, getters }) {
      try {
        const consultas = getters.consultas;
        console.log("Consultas:", consultas);

        // Defina as datas de início e fim
        const dataInicio = state.dataIni ? new Date(state.dataIni) : null;
        const dataFim = state.dataFim ? new Date(state.dataFim) : null;
        const filtro = state.filtro;
        const status = state.status;

        console.log("Data Início:", dataInicio);
        console.log("Data Fim:", dataFim);
        console.log("Filtro:", filtro);
        console.log("Status:", status);

        const consultasFiltradas = consultas.filter((consulta) => {
          const dataConsulta = new Date(consulta.data_solicitacao);
          console.log("Data Consulta:", dataConsulta);

          const dataInicioCond = !dataInicio || dataConsulta >= dataInicio;
          const dataFimCond = !dataFim || dataConsulta <= dataFim;
          const statusCond = status === "Todos" || consulta.status === status;
          const filtroCond = filtro === "Todos" || consulta.servico === filtro;

          console.log("Condições:",
            "Data Início:", dataInicioCond,
            "Data Fim:", dataFimCond,
            "Status:", statusCond,
            "Filtro:", filtroCond
          );

          return dataInicioCond && dataFimCond && statusCond && filtroCond;
        });

        console.log("Consultas Filtradas:", consultasFiltradas);
        commit("setConsultasFiltradasRelatorio", consultasFiltradas);

        console.log("Estado Consultas Filtradas:", state.consultasFiltradasRelatorio);
      } catch (error) {
        console.error(error);
      }
    }

  },
};
export default relatoriosModule;
