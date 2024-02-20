<template>
  <!-- <v-container> -->
  <v-data-iterator :page="page" :items-per-page="itemsPerPage" :items="consultas" :search="search" :sort-by="sortBy">
    <template v-slot:header>
      <v-toolbar dark class="px-2 ma-5">
        <v-text-field v-model="search" clearable hide-details prepend-inner-icon="mdi-magnify" placeholder="Procurar"
          variant="outlined" density="comfortable" />
        <v-spacer />

        <v-select v-model="sortKey" hide-details :items="ops" item-title="nome" item-value="valor"
          prepend-inner-icon="mdi-sort" label="ordenar por " variant="outlined" density="comfortable" />
        <v-spacer />

        <v-btn-toggle v-model="sortOrder" mandatory class="mr-5">
          <v-btn color="blue" value="asc">
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn color="blue" value="desc">
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </template>

    <template v-slot:no-data>
      <v-alert class="ma-2" type="warning">Nenhum resultado</v-alert>
    </template>

    <template v-slot:default="props">
      <v-row class="ma-2">
        <v-col v-for="item in        props.items       " :key="item.servico" cols="12" sm="6" md="4" lg="4">
          <v-sheet elevation="3" border rounded>
            <v-toolbar :title="item.raw.servico">
              <div style="display: flex;" class="mr-1">
                <editar-consulta :consulta="item.raw" />
              </div>
            </v-toolbar>
            <v-divider />
            <v-list density="compact">
              <v-list-item v-for="(key, index) in        filteredKeys       " :key="index"
                :title="key === 'observacao' ? 'Observação' : key === 'servico' ? 'Serviço' : key === 'data_solicitacao' ? 'Solicitada em:' : key === 'Paciente.nome' ? 'Paciente' : pMaiuscula(key)"
                :subtitle="key === 'Paciente.nome' ? item.raw.Paciente.nome
                  : key === 'data' && item.raw[key.toLowerCase()] !== null ? formatDate(item.raw.data)
                    : key === 'data_solicitacao' ? formatDate(item.raw.data_solicitacao)
                      : key === 'status' ? item.raw.status : 'Data ainda não definida'
                  " :class="{
    'text-blue': sortKey === key.toLowerCase(),
    'text-orange': item.raw[key.toLowerCase()] === 'Solicitada',
    'text-green': item.raw[key.toLowerCase()] === 'Confirmada',
    'text-red': item.raw[key.toLowerCase()] === 'Cancelada'
  }
    ">
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <div class="d-flex align-center justify-space-around pa-4">
        <span class="gren--text">Itens por página</span>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn variant="outlined" class="ml-2" append-icon="mdi-chevron-down" v-bind="props">
              {{ itemsPerPage }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(          number, index          ) in           itemsPerPageArray          " :key="index"
              :title="number" @click="itemsPerPage = number"></v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <span class="mr-4
          grey--text">
          Página {{ page }} de {{ numberOfPages }}
        </span>
        <v-btn icon size="small" @click="prevPage" variant="outlined">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon size="small" class="ml-2" @click="nextPage" variant="outlined">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-iterator>
</template>

<script setup>
import formatDate from '@/services/date'
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import EditarConsulta from '@/components/EditarConsulta.vue';
const store = useStore()
const itemsPerPageArray = ref([3, 4, 6, 9, 12]);
const itemsPerPage = ref(10);
const page = ref(1);
const search = ref('');
const sortKey = ref('Paciente.nome');
const sortOrder = ref('asc');
const keys = ref([
  'Paciente.nome',
  'data',
  'data_solicitacao',
  'status'
]);

function pMaiuscula(titulo) {
  return titulo[0].toUpperCase() + titulo.substring(1);
}



const ops = ref([
  { nome: 'Paciente', valor: 'Paciente.nome' },
  { nome: 'Status', valor: 'status' },
  { nome: 'Data da consulta', valor: 'data' },
  { nome: 'Data de Solicitação', valor: 'data_solicitacao' },

])

const consultas = ref([]);


onBeforeMount(async () => {
  try {
    await store.dispatch('listarConsultas');
    consultas.value = store.getters.consultas;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
});

const numberOfPages = computed(() => Math.ceil(consultas.value.length / itemsPerPage.value));

const filteredKeys = computed(() => keys.value);

const sortBy = computed(() => {
  return [
    {
      key: sortKey.value,
      order: sortOrder.value,

    },
  ];
});

const nextPage = () => {
  if (page.value + 1 <= numberOfPages.value) page.value += 1;
};

const prevPage = () => {
  if (page.value - 1 >= 1) page.value -= 1;
};



</script>


