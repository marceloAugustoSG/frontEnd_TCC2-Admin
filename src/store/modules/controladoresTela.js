const contradoresTelaModule = {
  state: {
    showMsgSucessoAgendamento: false,
    showMEditProf: false,
    showMDeletarProf: false,
    showMNewProf: false,
    msgSaveProf: false,
    showRelatorio: false,
    dialogExcluir: false,
    isMessageExcluir: false,
    showAvisoDataObg: false,
  },
  mutations: {
    setIsMsgSAgendamento(state, payload) {
      state.showMsgSucessoAgendamento = payload;
    },

    setAvisoDataObg(state, payload) {
      state.showAvisoDataObg = payload;
    },

    setIsMessageExcluir(state, payload) {
      state.isMessageExcluir = payload;
    },

    setDialogExcluir(state, payload) {
      state.dialogExcluir = payload;
    },
    setShowRelatorio(state, payload) {
      state.showRelatorio = payload;
    },

    SetShowMEditProf(state, payload) {
      state.showMEditProf = payload;
    },

    SetShowMDeletarProf(state, payload) {
      state.showMDeletarProf = payload;
    },

    setShowMNewProf(state, payload) {
      state.showMNewProf = payload;
    },

    SetMsgSaveProf(state, payload) {
      state.msgSaveProf = payload;
    },
  },
  getters: {},
  actions: {
    setIsMsgSAgendamento({ commit }, valor) {
      commit("setIsMsgSAgendamento", valor);
    },

    setAvisoDataObg({ commit }, valor) {
      commit("setAvisoDataObg", valor);
    },

    IsMessageExcluir({ commit }, valor) {
      commit("setIsMessageExcluir", valor);
    },

    setDialogExcluir({ commit }, valor) {
      commit("setDialogExcluir", valor);
    },

    setShowRelatorio({ commit }, valor) {
      commit("setShowRelatorio", valor);
    },

    setShowMNewProf({ commit }, valor) {
      commit("setShowMNewProf", valor);
    },

    setShowMEditProf({ commit }, valor) {
      commit("SetShowMEditProf", valor);
    },
    setShowMDeletarProf({ commit }, valor) {
      commit("SetShowMDeletarProf", valor);
    },
  },
};

export default contradoresTelaModule;
