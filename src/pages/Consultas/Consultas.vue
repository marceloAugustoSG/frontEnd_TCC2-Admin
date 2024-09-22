<template>
    <v-container>
        <v-sheet rounded>
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
                        <v-btn icon="mdi-refresh" color="#28A745" @click="refresh" />
                    </div>
                </v-col>
            </v-row>
        </v-sheet>




        <v-dialog v-model="store.state.controladoresTela.dialogCancelar" persistent>
            <v-card class=" mx-auto" style="width: 300px;">
                <v-toolbar title="Aviso" color="primary" />
                <v-card-text style="text-align: justify;">Tem certeza que deseja cancelar esse
                    agendamento?</v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text="Sim" variant="tonal" @click="cancelarAgendamento" />
                    <v-btn text="Não" variant="tonal" @click="fecharDialogExcluir" />
                </v-card-actions>

            </v-card>
        </v-dialog>


        <v-dialog v-model="store.state.controladoresTela.showMsgSucessoAgendamento">
            <mensagemSucesso :mensagem="mensagem" />
        </v-dialog>

        <v-dialog v-model="store.state.controladoresTela.isMessageSucesso" persistent>
            <mensagemSucesso />
        </v-dialog>
        <v-dialog v-model="store.state.controladoresTela.isMessageExcluir" persistent>
            <mensagemSucessoExcluir />
        </v-dialog>

        <v-dialog v-model="store.state.controladoresTela.showAvisoDataObg" persistent>
            <avisoDataObrigatoria />
        </v-dialog>
        <v-dialog v-model="store.state.controladoresTela.showDialogExcluirConsulta" persistent>
            <avisoExcluirConsulta />
        </v-dialog>



        <v-dialog v-model="store.state.controladoresTela.showAlertErrorAgendarConsulta" max-width="600px">
            <v-alert type="warning" density="compact" title="Aviso">Horário já ocupado para esse
                profissional</v-alert>
        </v-dialog>

        <v-container class="pr-5" v-if="store.getters.consultasFiltradas.length === 0">
            <v-alert type="warning">Nenhum resultado encontrado</v-alert>
        </v-container>

        <v-container class="pr-5" v-if="store.state.agendamento.consultas.length === 0">
            <v-alert type="warning">Nenhum agendamento solicitado</v-alert>
        </v-container>
        <v-container class="pr-5" v-if="store.state.profissionais.profissionais.length === 0">
            <v-alert type="warning">Cadastre pelo menos 1 profissional no sistema</v-alert>
        </v-container>
        <v-container fluid>

            <!-- modal aqui, de editar consulta -->
            <v-dialog v-model="store.state.controladoresTela.showEditarConsulta" persistent>
                <editar-consulta :consulta="store.state.agendamento.consulta" />
            </v-dialog>

            <v-row>
                <v-col cols="12" lg="4" v-for="consulta in store.getters.consultasFiltradas" :key="consulta.id">

                    <v-sheet elevation="1" border rounded>
                        <v-toolbar :title="consulta.servico">
                            <v-btn v-show="consulta.status === 'Cancelada'" icon="mdi-alpha-x-circle"
                                @click="abrirDialogExcluir(consulta)" />
                            <v-btn icon="mdi-eye" @click="abrirModalEditarConsulta(consulta)" />
                            <v-btn v-show="consulta.status === 'Confirmada'" icon="mdi-cancel" color="red"
                                @click="abrirDialogCancelar(consulta)" />
                        </v-toolbar>
                        <v-divider />
                        <div class="ma-5">
                            <p class="mb-5"><strong>Paciente: </strong>{{ consulta.Paciente.nome }}</p>

                            <p class="mb-5"><strong>Profissional: </strong>{{
                                consulta.Profissional ? `${consulta.Profissional.nome}` : 'Profissional Indefinido' }}
                            </p>

                            <p class="mb-5"><strong>Data e Horário:
                                </strong>{{ consulta.data ? formatarDataHora(consulta.data) : 'Data não definida' }}</p>
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
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import EditarConsulta from '@/components/Modais/EditarConsulta.vue';
import { formatarDataHora } from "@/services/date";
import { formatDate } from "@/services/date";


import mensagemSucesso from '@/components/Mensagens/mensagemSucesso.vue'
import mensagemSucessoExcluir from '@/components/Mensagens/mensagemSucessoExcluir.vue';
import avisoExcluirConsulta from '@/components/Mensagens/avisoExcluirConsulta.vue';
import avisoDataObrigatoria from '@/components/Mensagens/avisoDataObrigatoria.vue';
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


async function abrirModalEditarConsulta(consulta) {

    await store.dispatch('setIdConsultaState', consulta.id)
    await store.dispatch('getConsulta', store.state.agendamento.idConsultaState)

    store.dispatch('setConsulta', consulta);
    store.dispatch('setShowEditarConsulta', true)

}


async function abrirDialogExcluir(consulta) {
    await store.dispatch('setIdConsultaState', consulta.id)
    await store.dispatch('getConsulta', store.state.agendamento.idConsultaState)
    console.log(store.state.agendamento.idConsultaState)
    store.dispatch('setShowDialogExcluirConsulta', true)
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

async function abrirDialogCancelar(consulta) {

    await store.dispatch('setIdConsultaState', consulta.id)
    console.log(store.state.agendamento.idConsultaState)

    await store.dispatch('getConsulta', store.state.agendamento.idConsultaState)
    // console.log(store.state.agendamento.consulta)
    // console.log(store.state.agendamento.idConsulta)
    // // store.dispatch('setIdConsulta', props.consulta.id)
    store.dispatch('setDialogCancelar', true)
}


async function cancelarAgendamento() {

    // await store.dispatch('setIdConsultaState', consulta.id)
    // console.log(store.state.agendamento.idConsultaState)

    store.dispatch('atualizarConsulta')
    store.dispatch('getConsulta', store.state.agendamento.consulta.id)
    // console.log(store.state.agendamento.consulta.id)
    // console.log(store.state.agendamento.consulta)
    store.dispatch('setDialogCancelar', false)
}

function fecharDialogExcluir() {
    store.dispatch('setDialogCancelar', false)
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
