<template>
  <v-app>
    <v-layout>
      <v-app-bar style="position: fixed;" color="primary">
        <v-app-bar-nav-icon style="margin: 0 10px ; " variant="text" @click.stop="isOpenSBar = !isOpenSBar" />
        <v-app-bar-title text="Painel Administrativo" />

        <template #append>
          <v-btn class="mr-3" @click="toggleTheme">
            <v-icon v-if="theme.global.current.value.dark" icon="mdi-white-balance-sunny" color="orange"></v-icon>
            <v-icon v-else icon="mdi-moon-waning-crescent" color="gray"></v-icon>
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
                <v-list-item prepend-icon="mdi-logout" to="/logout" title="Sair" />
              </v-list>
            </v-card>
          </v-menu>
        </template>
      </v-app-bar>
      <v-navigation-drawer style="position: fixed;" v-model="isOpenSBar" color="primary">
        <v-list>
          <v-list-item to="/inicio" prepend-icon="mdi-home" title="Início" />
          <v-list-item to="/consultas" prepend-icon="mdi-list-box-outline" title="Consultas" />
          <v-list-item to="/teste" prepend-icon="mdi-list-box-outline" title="Teste" />
          <v-list-group value="users">
            <template #activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-account-group" title="Profissionais">
              </v-list-item>
            </template>

            <v-list-item to="/cadastrarProfissional" prepend-icon="mdi-account-plus">
              <v-list-item-title>Cadastrar</v-list-item-title>
            </v-list-item>

            <v-list-item to="/profissionais" prepend-icon="mdi-view-list">
              <v-list-item-title>Listar</v-list-item-title>
            </v-list-item>

          </v-list-group>
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
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

const theme = useTheme();
const isOpenSBar = ref(true);
const store = useStore();


onBeforeMount(async () => {
  await store.dispatch('listarConsultas')
})
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark
    ? "ligth"
    : "dark";
}

</script>
