<template>
    <v-container>
        <v-sheet dark rounded>
            <v-row class="pa-5">
                <v-col cols="12" lg="3">
                    <v-select label="Pesquisar por..." variant="outlined" v-model="ordenar" :items="ordenacoes"
                        prepend-inner-icon="mdi-sort" @change="atualizarFiltragem" density="comfortable" />
                </v-col>
                <v-col cols="12" lg="5">
                    <v-text-field variant="outlined" v-model="search" placeholder="Pesquisar" clearable
                        :type="ordenar === 'Data da Consulta' || ordenar === 'Data de Solicitação' ? 'date' : 'text'"
                        prepend-inner-icon="mdi-magnify" density="comfortable" />
                </v-col>

                <v-col cols="12" lg="4">
                    <div style="display: flex;width: 100%;justify-content: space-evenly;">
                        <div class="">
                            <v-btn icon="mdi-chevron-up" color="blue" style="margin-right: 10px;" @click="ordenarAsc" />
                            <v-btn icon="mdi-chevron-down" color="blue" @click="ordenarDesc" />
                        </div>
                        <v-btn icon="mdi-refresh" color="card" @click="refresh" />
                    </div>
                </v-col>
            </v-row>
        </v-sheet>

        <v-container class="pr-5" v-if="filteredItems.length === 0">
            <v-alert type="warning">Nenhum resultado encontrado</v-alert>
        </v-container>

        <v-container class="pr-5" v-else-if="totalConsultas === 0">
            <v-alert type="warning">Nenhuma consulta registrada no sistema</v-alert>
        </v-container>

        <v-container v-else fluid>
            <v-row>
                <v-col cols="12" lg="4" v-for="consulta in filteredItems" :key="consulta.id">
                    <v-sheet elevation="3" border rounded>
                        <v-toolbar :title="consulta.servico">
                            <div style="display: flex;" class="mr-2">
                                <editar-consulta :consulta="consulta" />
                            </div>
                        </v-toolbar>
                        <v-divider />
                        <div class="ma-5">
                            <p class="mb-5"><strong>Paciente: </strong>{{ consulta.Paciente.nome }}</p>
                            <p class="mb-5"><strong>Data:
                                </strong>{{ consulta.data ? formatDate(consulta.data) : 'Data não definida' }}</p>
                            <p class="mb-5"><strong>Data de Solicitação: </strong>{{
                                formatDate(consulta.data_solicitacao) }}</p>

                            <v-chip :color="getChipColor(consulta.status)">
                                {{ consulta.status }}
                            </v-chip>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import EditarConsulta from '@/components/Modais/EditarConsulta.vue';
import formatDate from '@/services/date'

const store = useStore()

const totalConsultas = computed(() => {
    consultas.value.totalConsultas
})
const ordenacoes = ref(['Status', 'Paciente', 'Serviço'])
const ordenar = ref()
let search = ref('')
const consultas = ref([])

function ordenarAsc() {
    const asc = [...consultas.value]
    asc.sort((a, b) => new Date(a.data_solicitacao) - new Date(b.data_solicitacao));
    consultas.value = asc
    atualizarFiltragem();
}

function ordenarDesc() {
    const desc = [...consultas.value];
    desc.sort((a, b) => new Date(b.data_solicitacao) - new Date(a.data_solicitacao));
    consultas.value = desc
    atualizarFiltragem();
}

const profissionais = computed(() => {
    store.state.profissionais.profissionais
})

const refresh = async () => {
    await store.dispatch('listarConsultas');
}

function getChipColor(status) {
    switch (status) {
        case 'Solicitada':
            return 'orange';
        case 'Confirmada':
            return 'green';
        case 'Cancelada':
            return 'red';
        default:
            return '';
    }
}


onBeforeMount(async () => {
    try {
        await store.dispatch('listarProfissionais');
        consultas.value = store.state.agendamento.consultas
        await store.dispatch('listarConsultas');
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
});

const filteredItems = computed(() => {
    const term = search.value ? search.value.toLowerCase() : '';
    switch (ordenar.value) {
        case 'Status': {
            return consultas.value.filter(consulta => consulta.status.toLowerCase().includes(term));
        }
        case 'Serviço': {
            return consultas.value.filter(consulta => consulta.servico.toLowerCase().includes(term));
        }
        case 'Paciente': {
            return consultas.value.filter(consulta => consulta.Paciente.nome.toLowerCase().includes(term));
        }
        default:
            return consultas.value.filter(consulta => consulta.status.toLowerCase().includes(term));
    }
});

function atualizarFiltragem() {
    const term = search.value ? search.value.toLowerCase() : '';
    switch (ordenar.value) {
        case 'Status': {
            filteredItems.value = consultas.value.filter(consulta => consulta.status.toLowerCase().includes(term));
            break;
        }
        case 'Serviço': {
            filteredItems.value = consultas.value.filter(consulta => consulta.servico.toLowerCase().includes(term));
            break;
        }
        case 'Paciente': {
            filteredItems.value = consultas.value.filter(consulta => consulta.Paciente.nome.toLowerCase().includes(term));
            break;
        }
        default:
            filteredItems.value = consultas.value.filter(consulta => consulta.status.toLowerCase().includes(term));
    }
}

function pMaiuscula(titulo) {
    return titulo[0].toUpperCase() + titulo.substring(1);
}


</script>
