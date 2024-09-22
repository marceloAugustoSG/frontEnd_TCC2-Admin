const contradoresTelaModule = {
  state: {
    showMsgSucessoAgendamento: false,
    showMEditProf: false,
    showSucessoEditProf: false,
    showMDeletarProf: false,
    showMNewProf: false,
    showMNewCompromisso: false,
    msgSaveProf: false,
    showRelatorio: false,
    dialogCancelar: false,
    isMessageExcluir: false,
    showAvisoDataObg: false,
    showDialogExcluirConsulta: false,
    showDialogExcluirCompromisso: false,
    showAlertErrorAgendarConsulta: false,
    showEditarConsulta: false,
    showMessageConflitoCompromisso: false
  },
  mutations: {
    setShowMessageConflitoCompromisso(state, payload) {
      state.showMessageConflitoCompromisso = payload
    },

    setShowEditarConsulta(state, payload) {
      state.showEditarConsulta = payload
    },
    setShowAlertErrorAgendarConsulta(state, payload) {
      state.showAlertErrorAgendarConsulta = payload
    },
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
    setShowMNewCompromisso(state, payload) {
      state.showMNewCompromisso = payload;
    },
    setShowDialogExcluirCompromisso(state, payload) {
      state.showDialogExcluirCompromisso = payload;
    },

    setMsgSaveProf(state, payload) {
      state.msgSaveProf = payload;
    },
  },
  getters: {},
  actions: {
    setShowMessageConflitoCompromisso({ commit }, value) {
      commit('setShowMessageConflitoCompromisso', value)
    },

    setShowEditarConsulta({ commit }, value) {
      commit('setShowEditarConsulta', value)
    },

    setShowAlertErrorAgendarConsulta({ commit }, value) {
      commit('setShowAlertErrorAgendarConsulta', value)
    },

    setShowDialogExcluirCompromisso({ commit }, value) {
      commit('setShowDialogExcluirCompromisso', value)
    },
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
    setShowMNewCompromisso({ commit }, valor) {
      commit("setShowMNewCompromisso", valor);
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
