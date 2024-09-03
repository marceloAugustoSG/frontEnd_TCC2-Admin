const contradoresTelaModule = {
  state: {
    showMsgSucessoAgendamento: false,
    showMEditProf: false,
    showSucessoEditProf: false,
    showMDeletarProf: false,
    showMNewProf: false,
    msgSaveProf: false,
    showRelatorio: false,
    dialogCancelar: false,
    isMessageExcluir: false,
    showAvisoDataObg: false,
    showDialogExcluirConsulta: false,
  },
  mutations: {
    setShowDialogExcluirConsulta(state, payload) {
      state.showDialogExcluirConsulta = payload;
    },

    setShowModalSucesso(state, payload) {
      state.showSucessoEditProf = payload;
    },
    setIsMsgSAgendamento(state, payload) {
      state.showMsgSucessoAgendamento = payload;
    },

    setAvisoDataObg(state, payload) {
      state.showAvisoDataObg = payload;
    },

    setIsMessageExcluir(state, payload) {
      state.isMessageExcluir = payload;
    },

    setDialogCancelar(state, payload) {
      state.dialogCancelar = payload;
    },
    setShowRelatorio(state, payload) {
      state.showRelatorio = payload;
    },

    setShowMEditProf(state, payload) {
      state.showMEditProf = payload;
    },

    SetShowMDeletarProf(state, payload) {
      state.showMDeletarProf = payload;
    },

    setShowMNewProf(state, payload) {
      state.showMNewProf = payload;
    },

    setMsgSaveProf(state, payload) {
      state.msgSaveProf = payload;
    },
  },
  getters: {},
  actions: {
    setShowDialogExcluirConsulta({ commit }, value) {
      commit("setShowDialogExcluirConsulta", value);
    },

    setMsgSaveProf({ commit }, value) {
      commit("setMsgSaveProf", value);
    },

    setShowModalSucesso({ commit }, value) {
      commit("setShowModalSucesso", value);
    },
    setIsMsgSAgendamento({ commit }, valor) {
      commit("setIsMsgSAgendamento", valor);
    },

    setAvisoDataObg({ commit }, valor) {
      commit("setAvisoDataObg", valor);
    },

    IsMessageExcluir({ commit }, valor) {
      commit("setIsMessageExcluir", valor);
    },

    setDialogCancelar({ commit }, valor) {
      commit("setDialogCancelar", valor);
    },

    setShowRelatorio({ commit }, valor) {
      commit("setShowRelatorio", valor);
    },

    setShowMNewProf({ commit }, valor) {
      commit("setShowMNewProf", valor);
    },

    setShowMEditProf({ commit }, valor) {
      commit("setShowMEditProf", valor);
    },
    setShowMDeletarProf({ commit }, valor) {
      commit("SetShowMDeletarProf", valor);
    },
  },
};

export default contradoresTelaModule;
