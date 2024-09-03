import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/Login"),
  },
  {
    path: "/criarConta",
    component: () => import("@/pages/CriarConta.vue"),
  },
  {
    path: "/logout",
    component: () => import("@/pages/login/Logout"),
  },
  {
    name: "dashboardAdmin",
    path: "/dashBoard",
    component: () => import("@/pages/dashboardAdmin/Dashboard.vue"),

    children: [
      {
        name: "inicio",
        path: "/inicio",
        component: () => import("@/pages/dashboardAdmin/Inicio.vue"),
      },
      {
        path: "/profissionais",
        component: () =>
          import("@/pages/dashboardAdmin/profissionais/listarProfissionais"),
      },

      {
        path: "/relatorios",
        component: () =>
          import("@/pages/dashboardAdmin/relatorios/Relatorios.vue"),
      },
      {
        path: "/consultas",
        component: () => import("@/pages/Consultas/Consultas.vue"),
      },

      {
        path: "/configuracoes",
        component: () => import("@/components/DashBoard/Configuracoes.vue"),
      },
      {
        path: "/perfil",
        component: () => import("@/components/DashBoard/Perfil.vue"),
      },
      {
        path: "/teste",
        component: () => import("@/components/TESTE/componenteTesteCalendario.vue"),
      },
    ],
  },
  {
    name: "dashboardPsi",
    path: "/dashBoardPsi",
    component: () => import("@/pages/dashBoardPsi/DashBoardPsi.vue"),

    children: [
      {
        path: "/inicioPsi",
        component: () => import("@/pages/dashBoardPsi/Inicio.vue"),
      },
      {
        path: "/consultasPsi",
        component: () => import("@/pages/Consultas.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
