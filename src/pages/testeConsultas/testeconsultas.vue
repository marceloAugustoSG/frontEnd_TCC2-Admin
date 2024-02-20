<template>
    <v-container>
        <v-sheet dark rounded>
            <v-row class="pa-5">
                <v-col cols="12" lg="2">
                    <v-select label="Pesquisar por..." variant="outlined" v-model="ordenar" :items="ordenacoes"
                        prepend-inner-icon="mdi-sort" @change="filtrarItens" density="comfortable" />
                </v-col>
                <v-col cols="12" lg="4">
                    <v-text-field variant="outlined" v-model="search" placeholder="Pesquisar" clearable
                        :type="ordenar === 'Data da Consulta' || ordenar === 'Data de Solicitação' ? 'date' : 'text'"
                        prepend-inner-icon="mdi-magnify" density="comfortable" />
                </v-col>
                <v-col />
            </v-row>
        </v-sheet>

        <v-container class="pr-5" v-if="filteredItems.length === 0">

            <v-alert type="warning">Nenhum resultado</v-alert>
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
                            <p class="mb-5"><strong>Data de Solicitação: </strong>{{ formatDate(consulta.data_solicitacao)
                            }}
                            </p>
                            <p
                                :class="{ 'text-orange': consulta.status === 'Solicitada', 'text-green': consulta.status === 'Confirmada', 'text-red': consulta.status === 'Cancelada' }">
                                <strong>Status: </strong>{{ consulta.status }}
                            </p>
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
import EditarConsulta from '@/components/EditarConsulta.vue';
import formatDate from '@/services/date'

const store = useStore()

const ordenacoes = ref(['Status', 'Paciente', 'Serviço'])
const ordenar = ref()
let search = ref('')
const consultas = ref([])

onBeforeMount(async () => {
    try {
        await store.dispatch('listarConsultas');
        consultas.value = store.getters.consultas;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
});

const filteredItems = computed(() => {
    const term = search.value ? search.value.toLowerCase() : ''; // Verifique se search.value é null antes de chamar toLowerCase()
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

function filtrarItens() {
    filteredItems.value = filteredItems.value;
}
function pMaiuscula(titulo) {
    return titulo[0].toUpperCase() + titulo.substring(1);
}
</script>

<style scope></style>