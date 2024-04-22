<template>
  <v-app>
    <v-layout>
      <v-app-bar style="position: fixed;" color="primary" elevation="1">
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
                <v-btn>
                  <v-icon size="25" v-bind="props" color="colorIcons" icon="mdi-account " />
                </v-btn>
                <!-- <v-img cover src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration.png">
                </v-img> -->
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

          <v-list-item to="/inicio">
            <v-icon start color="colorIcons" icon="mdi-home" />
            Início
          </v-list-item>


          <v-list-item to="/consultas">
            <v-icon start color="colorIcons" icon="mdi-list-box-outline" />
            Agendamentos
          </v-list-item>

          <v-list-item to="/profissionais">
            <v-icon start color="colorIcons" icon="mdi-account-group" />
            Profissionais
          </v-list-item>

          <v-list-item to="/relatorios">
            <v-icon start color="colorIcons" icon="mdi-chart-line" />
            Relatórios
          </v-list-item>
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
