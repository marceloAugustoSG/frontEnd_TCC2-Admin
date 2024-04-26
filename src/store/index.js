import { createStore } from "vuex";
import loginLogoutModule from "./modules/loginLogout";
import agendamentosModule from "./modules/agendamentos";
import profissionaisModule from "./modules/profissionais";
import contradoresTelaModule from "./modules/controladoresTela";
import relatoriosModule from "./modules/relatorios";

export default createStore({
  modules: {
    loginLogout: loginLogoutModule,
    agendamento: agendamentosModule,
    profissionais: profissionaisModule,
    controladoresTela: contradoresTelaModule,
    relatorio: relatoriosModule,
  },
});
