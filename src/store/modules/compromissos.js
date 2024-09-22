import { http } from "@/services/axiosConfig";

const compromissosModule = {

    state: {
        compromissos: [],
        idCompromisso: "",
    },
    mutations: {
        setIdCompromisso(state, payload) {

            state.idCompromisso = payload;
        },

        setCompromissos(state, payload) {
            state.compromissos = payload;
        },
    },
    getters: {
        compromissos: (state) => state.compromissos,

    },
    actions: {

        setIdCompromisso({ commit, state }, idCompromisso) {
            commit('setIdCompromisso', idCompromisso);
        },

        setCompromissos({ commit, state }, compromissos) {
            commit("setCompromissos", compromissos);
        },


        async criarCompromisso({ commit, dispatch }, dados) {
            try {
                const resposta = await http.post("compromisso/", dados);
                const data = await resposta.data;
                console.log('resposta:', data);

                // dispatch("listarProfissionais"); //   commit("SetMsgSaveProf", true);
                // }, 500);
            } catch (error) {
                console.error(error);
            }
        },

        async listarCompromissos({ commit, state }) {

            const profissionalId = localStorage.getItem('profissionalId')
            try {
                const resposta = await http.get(`compromissos/${profissionalId}`);
                const data = await resposta.data;
                console.log(data);
                commit("setCompromissos", data);

                console.log('state:', state.compromissos)
            } catch (e) {
                console.log(e);
            }
        },


        async excluirCompromisso({ commit, state, dispatch }, idCompromisso) {


            try {
                await http.delete(`compromisso/${Number(idCompromisso)}`);
            } catch (error) {
                console.error(error);
            }
        },


    }

}

export default compromissosModule;