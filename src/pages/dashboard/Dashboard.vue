<template>
  <v-app>
    <v-layout>
      <v-app-bar style="position: fixed;">
        <v-app-bar-nav-icon style="margin: 0 10px ; " variant="text" @click.stop="isOpenSBar = !isOpenSBar" />
        <v-app-bar-title>Painel Administrativo</v-app-bar-title>

        <template #append>
          <v-btn class="mr-3" @click="toggleTheme">
            <v-icon v-if="theme.global.current.value.dark" icon="mdi-white-balance-sunny" color="orange"></v-icon>
            <v-icon v-else icon="mdi-moon-waning-crescent" color="gray"></v-icon>
          </v-btn>

          <v-btn icon class="mr-3">
            <v-badge dot>
              <v-icon icon="mdi-bell-outline"></v-icon>
            </v-badge>
            <v-menu activator="parent">
              <Notificacoes :notificacoes="notificacoes" />
            </v-menu>
          </v-btn>

          <v-menu>
            <template #activator="{ props }">
              <v-avatar v-bind="props" style="max-width: 30px; max-height: 30px">
                <v-img cover src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration.png">
                </v-img>
              </v-avatar>
            </template>
            <v-card min-width="230px" class="mt-5">
              <v-list nav density="compact">
                <v-list-item prepend-icon="mdi-account" to="/perfil" title="Meu Perfil" />
                <v-list-item color="primary" prepend-icon="mdi-cog" to="/configuracoes" title="Configurações" />
                <v-list-item prepend-icon="mdi-logout" to="/logout" title="Sair" />
              </v-list>
            </v-card>
          </v-menu>
        </template>
      </v-app-bar>
      <v-navigation-drawer style="position: fixed;" v-model="isOpenSBar">
        <v-list>
          <v-list-item to="/inicio" prepend-icon="mdi-home" title="Início" />
          <v-list-item to="/consultas" prepend-icon="mdi-list-box-outline" title="Consultas" />
          <v-list-item to="/relatorios" prepend-icon="mdi-file-document-multiple" title="Relatórios" />
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";
import { onMounted, ref } from "vue";
import Notificacoes from '@/components/DashBoard/Notificacoes.vue'
import { useStore } from "vuex";

const theme = useTheme();
const isOpenSBar = ref(true);
const store = useStore();

const notificacoes = [
  { title: "notificacao 1" },
  { title: "notificacao 2" },
  { title: "notificacao 3" },
  { title: "notificacao 4" },
];
onMounted(async () => {
  await store.dispatch('listarConsultas')
})
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark
    ? "ligth"
    : "dark";
}





</script>
