// loginLogout.js
import { http } from "@/services/axiosConfig";
import router from "@/router";

const loginLogoutModule = {
  state: {
    message: "",
    consultas: [],
    isPsi: Boolean,
  },
  mutations: {
    setPsi(state, payload) {
      state.isPsi = payload;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setConsultas(state, consultas) {
      state.consultas = consultas;
    },

    setPsi(state, payload) {
      state.isPsi = payload;
    },
  },
  getters: {},
  actions: {
    async logar({ commit }, usuario) {
      try {
        const resposta = await http.post("login", usuario);
        const data = resposta.data;
        console.log(data);

        const tokenDecodificado = JSON.parse(
          atob(resposta.data.token.split(".")[1])
        ); // Decodifica a parte do payload
        console.log(tokenDecodificado);
        console.log(data.token);

        if (tokenDecodificado.regra === "psicologo") {
          commit("setPsi", false);

          localStorage.setItem("psi", false);
          console.log(this.state.isPsi);

          localStorage.setItem("usuarioId", tokenDecodificado.id);
          localStorage.setItem("token", data);
          router.push({ name: "dashboardPsi" });
          commit("setMessage", "");
        }
        if (tokenDecodificado.regra === "paciente") {
          router.push({ name: "login" });
          commit("setMessage", "Usuario sem permissão");
        }
        if (tokenDecodificado.regra === "administrador") {
          commit("setPsi", true);

          localStorage.setItem("psi", true);
          localStorage.setItem("token", data.token);

          commit("setMessage", "");

          router.push({ name: "dashboardAdmin" });
        }
      } catch (error) {
        console.error(error);
      }
    },

    init({ commit }) {
      localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("usuarioId");
      localStorage.removeItem("message");
      commit("setMessage", "");
      commit("setConsultas", []);
    },
  },
};

export default loginLogoutModule;
