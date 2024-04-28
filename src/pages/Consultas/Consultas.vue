<template>
    <v-container>
        <v-sheet dark rounded>
            <v-row class="pa-5">
                <v-col cols="12" lg="3">
                    <v-select label="Pesquisar por..." variant="outlined" v-model="store.state.agendamento.ordenar"
                        :items="ordenacoes" prepend-inner-icon="mdi-sort" @update:model-value="atualizarFiltragem"
                        density="comfortable" />
                </v-col>
                <v-col cols="12" lg="5">
                    <v-text-field variant="outlined" v-model="store.state.agendamento.search" placeholder="Pesquisar"
                        :type="ordenar === 'Data da Consulta' || ordenar === 'Data de Solicitação' ? 'date' : 'text'"
                        prepend-inner-icon="mdi-magnify" density="comfortable"
                        @update:model-value="atualizarFiltragem" />
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

        <v-container class="pr-5" v-if="store.getters.consultasFiltradas.length === 0">
            <v-alert type="warning">Nenhum resultado encontrado</v-alert>
        </v-container>

        <v-container class="pr-5" v-else-if="store.getters.consultas.length === 0">
            <v-alert type="warning">Nenhuma consulta registrada no sistema</v-alert>
        </v-container>

        <v-container class="pr-5" v-if="store.state.agendamento.consultas.length === 0">
            <v-alert type="warning">Nenhuma consulta registrada no sistema</v-alert>
        </v-container>
        <v-container fluid>
            <v-row>
                <v-col cols="12" lg="4" v-for="consulta in store.getters.consultasFiltradas" :key="consulta.id">
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

                            <v-chip :color="getChipColor(consulta.status)" elevation="3">
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
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";
import EditarConsulta from '@/components/Modais/EditarConsulta.vue';
import formatDate from '@/services/date'

const store = useStore()


const ordenacoes = ref(['Status', 'Paciente', 'Serviço'])
const ordenar = ref()

function ordenarAsc() {
    store.dispatch('setSearch', 0)
    console.log(store.state.agendamento.ord)
    console.log(store.getters.consultasFiltradas)
}

function ordenarDesc() {
    store.dispatch('setSearch', 1)
    console.log(store.state.agendamento.ord)
    console.log(store.getters.consultasFiltradas)
}



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
        await store.dispatch('listarConsultas');
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
});





function atualizarFiltragem() {
    console.log(store.state.agendamento.search)
    switch (store.state.agendamento.ordenar) {
        case 'Status': {
            console.log(store.getters.consultasFiltradas)
        }
    }



}

function pMaiuscula(titulo) {
    return titulo[0].toUpperCase() + titulo.substring(1);
}


</script>
