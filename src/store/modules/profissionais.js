import { http } from "@/services/axiosConfig";
const profissionaisModule = {
  state: {
    profissional: {
      nome: "",
      especialidade: "",
    },

    profissionais: [],
  },
  mutations: {
    setProfissionais(state, payload) {
      state.profissionais = payload;
    },

    setProfissional(state, payload) {
      state.profissional = payload;
    },
  },
  getters: {
    profissionais: (state) => state.profissionais,
  },
  actions: {
    async criarProfissional({ commit }, dados) {
      try {
        const resposta = await http.post("profissional", dados);
        const data = await resposta.data;
        console.log(data);
        setInterval(() => {
          commit("SetMsgSaveProf", true);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    },

    async listarProfissionais({ commit }) {
      try {
        const resposta = await http.get("profissionais");
        const data = await resposta.data;
        console.log(data);
        commit("setProfissionais", data.profissionais);
      } catch (e) {
        console.log(e);
      }
    },

    async getProfissionais({ commit }) {
      const resposta = await http.get("profissionais");
      console.log(resposta.data.profissionais);
      commit("setProfissionais", resposta.data.profissionais);
      if (this.state.profissionais.length === 0) {
        commit("setShowMsgSemProfi", true);
        console.log(this.state.showMsgSemProfi);
      } else console.log(resposta.data);
    },

    async getProfissionalById({ commit }, idProfissional) {
      const idPro = Number(idProfissional);

      try {
        const resposta = await http.get(`profissional/${idPro}`);
        commit("setProfissional", resposta.data);
        console.log(resposta.data);
        console.log(this.state.profissional);
      } catch (error) {
        console.error(error);
      }
    },

    async excluirProfissional({ commit }, id) {
      const idProf = Number(id);
      await http.delete(`profissional/${idProf}`);
    },
  },
};
export default profissionaisModule;
