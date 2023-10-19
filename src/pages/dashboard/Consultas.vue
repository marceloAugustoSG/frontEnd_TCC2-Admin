<template>
  <v-data-iterator v-model:items-per-page="itemsPerPage" v-model:page="page" :items="consultas" :search="search"
    :sort-by="sortBy">

    <template v-slot:header>
      <v-toolbar dark color="blue-darken-3" class="px-2 mb-2">
        <v-text-field v-model="search" clearable hide-details prepend-inner-icon="mdi-magnify" placeholder="Procurar"
          variant="solo" density="comfortable"></v-text-field>
        <v-spacer></v-spacer>
        <v-select v-model="sortKey" hide-details :items="keys" :item-value="item => item.toLowerCase()"
          prepend-inner-icon="mdi-sort" label="Ordenar por" density="comfortable" />
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="sortOrder" mandatory>
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
      <v-alert class="ma-2" type="warning">Nenhum resultado encontrado</v-alert>
    </template>

    <template v-slot:default="props">
      <v-row class="pa-5">
        <v-col v-for="  item   in   props.items  " :key="item.id" cols="12" sm="6" md="4" lg="3">
          <v-card elevation="10">
            <v-toolbar>
              <span class="ma-5"> {{ item.raw.servico }}</span>
              <v-spacer />
              <editar-consulta :dialog="showEDitarConsulta" :consulta="item.raw" />
            </v-toolbar>
            <v-divider></v-divider>
            <v-list density="compact">
              <v-list-item v-for="(  key, index  ) in   filteredKeys  " :key="index"
                :title="key === 'data_solicitacao' ? 'Solicitada em :' : key === 'Observacao' ? 'Observação' : key"
                :subtitle="key === 'data_solicitacao' ? new Date(item.raw.data_solicitacao).toLocaleDateString() : key === 'Data' ? (item.raw.data ? new Date(item.raw.data).toLocaleDateString() : 'Data não definida') : String(item.raw[key.toLowerCase()])"
                :class="{ 'text-blue': sortKey === key.toLowerCase() }" />
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <div class="d-flex align-center justify-space-around pa-4">
        <span class="grey--text">Itens por página</span>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn variant="text" color="primary" class="ml-2" append-icon="mdi-chevron-down" v-bind="props">
              {{ itemsPerPage }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(  number, index  ) in   itemsPerPageArray  " :key="index" :title="number"
              @click="itemsPerPage = number"></v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <span class="mr-4
          grey--text">
          Página {{ page }} de {{ numberOfPages }}
        </span>
        <v-btn icon size="small" @click="prevPage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon size="small" class="ml-2" @click="nextPage">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-iterator>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import EditarConsulta from '@/components/EditarConsulta.vue';

// Suas variáveis reativas
const itemsPerPageArray = [4, 8, 12];
const itemsPerPage = ref(4);
const page = ref(1);
const search = ref('');
const sortKey = ref('Status');
const sortOrder = ref('asc');
const keys = [
  'Status',
  'Data',
  'Observacao',
  'data_solicitacao'];



const store = useStore()
const showEDitarConsulta = ref(true)


onMounted(async () => {

  await store.dispatch('listarConsultas')
})
const consultas = computed(() => store.state.consultas)

const infoConsulta = ref({
  status: String,
  nome: String,
  tipo: String,
  local: String,
  profissional: String,
})


const desserts = [
  {
    "id": 3,
    "data": null,
    "status": "Agendada",
    "observacao": "Nenhuma observação",
    "servico": "Atendimento Médico",
    "profissionalId": null,
    "data_solicitacao": "2022-10-16T16:55:33.617Z"
  },
  {
    "id": 4,
    "data": null,
    "status": "confirmado",
    "observacao": "extracao do siso",
    "servico": "Atendimento Médico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 5,
    "data": null,
    "status": "Agendada",
    "observacao": "extracao do siso",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 6,
    "data": null,
    "status": "Agendada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 7,
    "data": null,
    "status": "Agendada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 8,
    "data": null,
    "status": "Agendada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 9,
    "data": null,
    "status": "Agendada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 10,
    "data": null,
    "status": "Agendada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 11,
    "data": null,
    "status": "Agendada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 12,
    "data": null,
    "status": "Cancelada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 13,
    "data": null,
    "status": "Cancelada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  },
  {
    "id": 14,
    "data": null,
    "status": "Cancelada",
    "observacao": "Nenhuma Observação",
    "servico": "Atendimento Psicológico",
    "profissionalId": null,
    "data_solicitacao": "2023-10-16T16:55:33.617Z"
  }
];

// Funções de paginação
const nextPage = () => {
  if (page.value + 1 <= numberOfPages.value) page.value += 1;
};

const prevPage = () => {
  if (page.value - 1 >= 1) page.value -= 1;
};

function mostrarConsulta(consulta) {
  infoConsulta.value.status = consulta.status
  infoConsulta.value.local = "Castelinho"
  if (consulta.Paciente.nome) {
    infoConsulta.value.nome = consulta.Paciente.nome
    showEDitarConsulta.value = false
  } else { infoConsulta.value.nome = 'teste' }
  alert(infoConsulta.value.status)



}

// Propriedades calculadas
const numberOfPages = computed(() => {
  return Math.ceil(consultas.value.length / itemsPerPage.value);
});


const filteredKeys = computed(() => keys.filter(key => key !== 'Name'));

const sortBy = computed(() => [{
  key: sortKey.value,
  order: sortOrder.value,
}]);



</script>