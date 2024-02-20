import { createStore } from "vuex";
import { http } from "@/services/axiosConfig";
import router from "@/router";
import formatDate from "@/services/date";

const store = createStore({
  state: {
    // Administrador
    consulta: {
      Paciente: {
        id: "",
        nome: "",
        telefone: "",
        matricula: "",
        tipo: "",
        usuarioId: "",
        dataNascimento: "",
      },
      Profissional: {
        id: "",
        nome: "",
        especialidade: "",
      },
      data: "",
      data_solicitacao: "",
      id: "",
      observacao: "",
      profissionalId: "",
      pacienteId: "",
      respostas: "",
      servico: "",
      status: "",
    },

    consultas: [],
    profissionais: [],
    mensagem: "",
    isMessageSucesso: false,
    isMessageSucessoExcluir: false,
    isMessageExcluir: false,
    resposta: {
      Centro: String,
      Curso: String,
      "Estudante de": String,
      "Motivos para o atendimento": String,
      "Se mudou para estudar na UFES?": String,
      "com quem você reside em Alegre?": String,
      "Respostas Confidencias": {
        1: Number,
        2: String,
        3: String,
        4: String,
        5: String,
        6: String,
        7: String,
        8: String,
        9: String,
        10: String,
        11: String,
        12: String,
        13: String,
        14: String,
        15: String,
        16: String,
        17: String,
        18: String,
        19: String,
        20: String,
      },
    },

    isPsi: Boolean,
    consultasFiltradas: [],
    profissional: {
      nome: "",
      especialidade: "",
    },

    dataIni: Date,
    dataFim: Date,
    filtro: String,
    status: String,
    message: "",
    dialogExcluir: false,
    showRelatorio: false,
    showAvisoDataObg: false,
  },
  mutations: {
    setMensagemSucessoExcluir(state, payload) {
      state.isMessageSucessoExcluir = payload;
    },
    setAvisoDataObg(state, payload) {
      state.showAvisoDataObg = payload;
    },
    setShowRelatorio(state, payload) {
      state.showRelatorio = payload;
    },

    setDataConsulta(state, payload) {
      state.consulta.data = payload;
    },

    setDialogExcluir(state, payload) {
      state.dialogExcluir = payload;
    },

    setMessage(state, newMessage) {
      state.message = newMessage;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setFiltro(state, payload) {
      state.filtro = payload;
    },
    setDataIni(state, payload) {
      state.dataIni = payload;
    },
    setDatafim(state, payload) {
      state.dataFim = payload;
    },

    setConsultasFiltradas(state, payload) {
      state.consultasFiltradas = payload;
    },
    setPsi(state, payload) {
      state.isPsi = payload;
    },

    setProfissional(state, payload) {
      state.profissional = payload;
    },
    setProfissionais(state, payload) {
      state.profissionais = payload;
    },

    setIsMessageExcluir(state, payload) {
      state.isMessageExcluir = payload;
    },
    setIsMessage(state, payload) {
      state.isMessageSucesso = payload;
    },
    setConsulta(state, payload) {
      state.consulta = payload;
    },
    setMensagem(state, payload) {
      state.mensagem = payload;
    },
    setConsultas(state, payload) {
      state.consultas = payload;
    },

    setRespostas(state, payload) {
      state.resposta = payload;
    },
  },

  getters: {
    consultas: (state) => state.consultas,
    consultasFiltradas: (state) => state.consultasFiltradas,
    consultasAtendimentoPsicologico: (state) =>
      state.consultas.filter(
        (consulta) => consulta.servico === "Atendimento Psicológico"
      ),
    consultasExetoPsicologico: (state) =>
      state.consultas.filter(
        (consulta) => consulta.servico !== "Atendimento Psicológico"
      ),
    respostasConfidenciais: (state) => JSON.parse(state.consulta.respostas),

    consultasExcetoPsicologicoSolicitada: (state) =>
      state.consultas.filter(
        (consulta) =>
          consulta.status !== "Solicitada" ||
          consulta.servico !== "Atendimento Psicológico"
      ),
    profissionais: (state) =>
      state.profissionais.map((profissional) => ({
        id: profissional.id,
        nome: `${profissional.nome} (${profissional.especialidade})`,
        especialidade: profissional.especialidade,
      })),
  },
  actions: {
    setMensagemSucessoExcluir({ commit }, valor) {
      commit("setMensagemSucessoExcluir", valor);
    },

    setConsulta({ commit, dispatch }, valor) {
      commit("setConsulta", valor);
    },

    setAvisoDataObg({ commit }, valor) {
      commit("setAvisoDataObg", valor);
    },
    setShowRelatorio({ commit }, valor) {
      commit("setShowRelatorio", valor);
    },

    setDataConsulta({ commit }, valor) {
      commit("setDataConsulta", valor);
    },

    setDialogExcluir({ commit }, valor) {
      console.log("alodfsd");
      commit("setDialogExcluir", valor);
    },

    setStatus({ commit }, status) {
      commit("setStatus", status);
      console.log(this.state.status);
    },
    setDataInit({ commit }, data) {
      commit("setDataIni", data);
      console.log(this.state.dataIni);
    },
    setDataFim({ commit }, data) {
      commit("setDatafim", data);
      console.log(this.state.dataFim);
    },
    setFiltro({ commit }, filtro) {
      commit("setFiltro", filtro);
      console.log(this.state.filtro);
    },

    async gerarRelatorio({ commit }) {
      try {
        const consultas = this.getters.consultas;

        // Defina as datas de início e fim (você pode ajustar conforme necessário)
        const dataInicio = new Date(this.state.dataIni);
        const dataFim = new Date(this.state.dataFim);
        const filtro = this.state.filtro;
        const status = this.state.status;

        if (filtro === "Todos") {
          const consultasFiltradas = consultas.filter((consulta) => {
            const dataConsulta = new Date(consulta.data_solicitacao);

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
        console.log(this.state.consultasFiltradas);
      } catch (error) {
        console.error(error);
      }
    },

    setPsi({ commit }, valor) {
      commit("setPsi", valor);
      console.log(this.state.isPsi);
    },

    resposta({ commit }) {
      commit("setRespostas", this.getters.respostasConfidenciais);
      console.log(this.state.resposta);
    },

    async criarProfissional({ commit }, dados) {
      try {
        const resposta = await http.post("profissional", dados);
        const data = await resposta.data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },

    async getProfissionais({ commit }) {
      try {
        const resposta = await http.get("profissionais");
        commit("setProfissionais", resposta.data);
        console.log(resposta.data);
      } catch (error) {
        console.error(error);
      }
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

    IsMessage({ commit }, valor) {
      commit("setIsMessage", valor);
      // console.log(this.state.is)
    },
    IsMessageExcluir({ commit }, valor) {
      commit("setIsMessageExcluir", valor);
    },

    async criarNotificacao({ commit }, idPaciente) {
      const idPac = Number(idPaciente);
      const dataConsulta = formatDate(this.state.consulta.data);
      console.log(this.state.profissional);

      const notificacao = {
        mensagem: `Consulta marcada para o dia e horario: ${dataConsulta} com o ${this.state.profissional.especialidade}(a) ${this.state.profissional.nome} no Castelinho `,
        pacienteId: idPac,
      };

      try {
        const resposta = await http.post(
          `paciente/${idPac}/notificacao`,
          notificacao
        );
        const data = resposta.data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },

    async agendarConsulta({ commit, dispatch }) {
      let dataNula = new Date(0, 0, 0);
      const consulta = {
        status: this.state.consulta.status,
        profissionalId: this.state.consulta.profissionalId,
        data: store.state.consulta.data
          ? store.state.consulta.data.concat(":00.000Z")
          : formatDate(dataNula),
      };

      console.log(consulta);

      const consultaId = this.state.consulta
        ? Number(this.state.consulta.id)
        : null;

      if (consultaId !== null) {
        console.error(this.state.consulta);
        await http.put(`consulta/${consultaId}`, consulta);
      } else {
        console.error("Consulta está nula ou indefinida");
      }
    },

    async getConsulta({ commit }, idConsulta) {
      let consultaId = Number(idConsulta);
      try {
        const data = await http.get(`consulta/${consultaId}`);
        let dataConsulta = data.data.data
          ? formatDate(new Date(data.data.data))
          : formatDate(null);
        let datasolicitacao = new Date(data.data.data_solicitacao);
        datasolicitacao = formatDate(datasolicitacao);
        data.data.data = dataConsulta;
        data.data.data_solicitacao = datasolicitacao;
        commit("setConsulta", data.data);

        console.log("get consulta");
        console.log(this.state.consulta);
      } catch (error) {
        console.error(error);
      }
    },

    async logar({ commit }, usuario) {
      try {
        const resposta = await http.post("login", usuario);
        const data = resposta.data;
        console.log(data);

        const tokenDecodificado = JSON.parse(
          atob(resposta.data.token.split(".")[1])
        ); // Decodifica a parte do payload
        console.log(tokenDecodificado);
        console.error(data);

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
          console.log(this.state.isPsi);
          commit("setMessage", "");

          router.push({ name: "dashboardAdmin" });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async listarProfissionais({ commit }) {
      try {
        const resposta = await http.get("profissionais");
        const data = await resposta.data;
        console.log(data.data);
        commit("setProfissionais", data);
      } catch (e) {
        console.log(e);
      }
    },

    async listarConsultas({ commit }) {
      try {
        const resposta = await http.get("consultas");
        const data = await resposta.data;
        console.log(data);
        commit("setConsultas", data);
      } catch (error) {
        console.error(error);
      }
    },

    async excluirConsulta({ commit }, idConsulta) {
      let consultaId = Number(idConsulta);
      console.log(consultaId);
      try {
        const resposta = await http.delete(`consulta/${consultaId}`);
        console.log(resposta.data);
      } catch (error) {
        console.error(error);
      }
    },
    logout({ commit }) {
      localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("usuarioId");
      localStorage.removeItem("message");
      localStorage.removeItem("psi");
      this.state.message = "";
      this.state.consultas = [];
    },

    init({ commit }) {
      localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("usuarioId");
      localStorage.removeItem("message");
      this.state.message = "";
      this.state.consultas = [];
    },
  },
});

export default store;
