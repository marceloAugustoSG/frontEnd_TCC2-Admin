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
                if (resposta.status === 200) {
                    commit('setMsgSaveProf', true);
                }
                // dispatch("listarProfissionais"); //   commit("SetMsgSaveProf", true);
                // }, 500);
            } catch (error) {
                if (error.response.status === 400 && error.response.data.error === 'Conflito de compromisso detectado!') {
                    console.log('caiu aqui')

                    commit('setShowMessageConflitoCompromisso', true)
                }

                console.error(error.response.data.error);
                console.error(error);
                // console.error(error.response.status);
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
                dispatch('listarCompromissos');
            } catch (error) {
                console.error(error);
            }
        },


    }

}

export default compromissosModule;