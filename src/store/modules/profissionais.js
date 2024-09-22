import { http } from "@/services/axiosConfig";
import tratarErroEditProf from "@/services/erros/tratarEditProfissional";
const profissionaisModule = {
  state: {
    profissional: {},
    profissionais: [],
    consultasEmpty: false,
    idProfissionalSelecionado: null,

    profissionaisMedicos: [], // Lista de profissionais médicos
    profissionaisPsicologicos: [], // Lista de profissionais psicológicos
  },
  mutations: {

    setIdProfissionalSelecionado(state, payload) {
      state.idProfissionalSelecionado = payload;
    },
    setProfissionais(state, payload) {
      state.profissionais = payload;
    },

    setProfissional(state, payload) {
      state.profissional = payload;
    },
    setConsultasEmpty(state, payload) {
      state.consultasEmpty = payload;
    },
  },
  getters: {
    profissional: (state) => state.profissional,
    profissionais: (state) => state.profissionais,
    consultasProf: (state) => state.state.profissional.consultas,
    profissionaisMedicos: (state) => {
      return state.profissionais.filter(prof => prof.especialidade === 'Atendimento Médico');
    },

    // Getter para profissionais psicológicos
    profissionaisPsicologicos: (state) => {
      return state.profissionais.filter(prof => prof.especialidade === 'Atendimento Psicológico');
    },

  },
  actions: {
    setIdProfissionalSelecionado({ commit, state }, value) {
      commit('setIdProfissionalSelecionado', value)

    },
    setConsultasEmpty({ commit, state }, value) {
      commit("setConsultasEmpty", value);
    },
    setProfissional({ commit }, prof) {
      commit("setProfissional", prof);
    },
    async criarProfissional({ commit, dispatch }, dados) {
      try {
        const resposta = await http.post("usuarioPsicologo", dados);
        const data = await resposta.data;
        console.log(data);

        dispatch("listarProfissionais"); //   commit("SetMsgSaveProf", true);
        // }, 500);
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

    async getProfissionais({ commit, state }) {
      const resposta = await http.get("profissionais");
      console.log(resposta.data.profissionais);
      commit("setProfissionais", resposta.data.profissionais);
      if (state.profissionais.length === 0) {
        commit("setShowMsgSemProfi", true);
        console.log(state.showMsgSemProfi);
      } else console.log(resposta.data);
    },

    async getProfissionalById({ commit, state, dispatch }, idProfissional) {
      const idPro = Number(idProfissional);

      try {
        const resposta = await http.get(`profissional/${idPro}`);
        commit("setProfissional", resposta.data);
        console.log(resposta.data);
        console.log(state.profissional.consultas);
        if (state.profissional.consultas.length === 0) {
          dispatch("setConsultasEmpty", false);
        } else {
          dispatch("setConsultasEmpty", true);
        }

        console.log(state.consultasEmpty);
      } catch (error) {
        console.error(error);
      }
    },

    async editarProfissional({ state, dispatch }) {
      const dadosProfissional = {
        nome: state.profissional.nome,
        especialidade: state.profissional.especialidade,
        email: state.profissional.email,
        telefone: state.profissional.telefone,
      };
      console.log(tratarErroEditProf(dadosProfissional));
      try {
        const resposta = await http.put(
          `profissional/${state.profissional.id}`,
          dadosProfissional
        );
        console.log(resposta.data);

        dispatch("listarProfissionais");
      } catch (error) {
        console.log(error);
      }
    },

    async excluirProfissional({ dispatch }, id) {
      const idProf = Number(id);
      await http.delete(`profissional/${idProf}`);
      dispatch("listarProfissionais");
    },

    async excluirConsultasProfissional({ dispatch }, id) {
      const idProf = Number(id);
      await http.delete(`consultas/profissional/${idProf}`)
      await http.delete(`profissional/${idProf}`);
      dispatch("listarProfissionais");
    },

  },
};
export default profissionaisModule;
