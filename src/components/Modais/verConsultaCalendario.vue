<template>
    <v-container>

        <v-dialog v-model="$props.dialog" persistent>
            <p>{{ props.consulta.id }}</p>
            <v-sheet class=" mx-auto" style="width:  1000px;" border rounded>
                <v-toolbar color="primary" :title="!ativarEdicao ? 'Editar consulta' : 'Detalhes da Consulta'">
                    <v-btn icon @click="EnabledEdit()"
                        :disabled="props.consulta.status === 'Confirmada' || psi === 'false'">
                        <v-icon :icon="!ativarEdicao ? 'mdi-pencil-off' : 'mdi-pencil'" />
                    </v-btn>
                </v-toolbar>
                <form @submit.prevent="submit">
                    <v-sheet border rounded class="ma-2 pa-2">

                        <h3 class="ml-5"> Paciente</h3>

                        <v-row class="ma-3">
                            <v-col cols="12" lg="4">
                                <!-- <v-text-field label="Nome" variant="outlined"
                                    v-model="store.state.agendamento.consulta.Paciente.nome" disabled /> -->
                                <v-text-field label="Nome" variant="outlined" v-model="props.consulta.Paciente.nome"
                                    disabled />
                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-text-field label="Vínculo" variant="outlined"
                                    v-model="store.state.agendamento.consulta.Paciente.tipo" disabled />
                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-text-field label="Matricula" variant="outlined"
                                    v-model="store.state.agendamento.consulta.Paciente.matricula" disabled />
                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-text-field label="Telefone" variant="outlined"
                                    v-model="store.state.agendamento.consulta.Paciente.telefone" disabled />
                            </v-col>
                        </v-row>
                    </v-sheet>
                    <v-divider class="ma-5" />
                    <v-sheet border rounded class="ma-2 pa-2">
                        <h3 class="ml-5"> Informações para a Consulta</h3>
                        <v-row class="ma-3">
                            <v-col cols="12" lg="4">
                                <v-text-field label="Serviço" variant="outlined"
                                    v-model="store.state.agendamento.consulta.servico" disabled />
                                <v-textarea rows="1" label="Observação" variant="outlined"
                                    v-model="store.state.agendamento.consulta.observacao" :items="selectTipos"
                                    disabled />
                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-select label="Status" variant="outlined"
                                    v-model="store.state.agendamento.consulta.status" :items="selectTipos" item-value=""
                                    :disabled="ativarEdicao" :item-title="item"
                                    @update:model-value="habilitarCampoData(store.state.agendamento.consulta.status)" />
                                <v-text-field v-if="props.consulta.status === 'Confirmada'"
                                    :type="ativarEdicao ? 'text' : 'datetime-local'"
                                    label="Data e Horário para a consulta"
                                    v-model="store.state.agendamento.consulta.data" variant="outlined"
                                    :disabled="ativarEdicao" />
                                <v-text-field v-else type="datetime-local" variant="outlined"
                                    label="Data e Horário para a consulta"
                                    v-model="store.state.agendamento.consulta.data" :disabled="habilitarCData" />

                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-select label="Profissional" variant="outlined" v-model="profissional"
                                    :items="store.getters.profissionais" :item-value="profissional => profissional.id"
                                    :item-title="profissional => profissional.nome" :disabled="ativarEdicao"
                                    @update:model-value="trocarSelectTeste(profissional)" />
                                <v-text-field label="Data de Solicitação" variant="outlined"
                                    v-model="store.state.agendamento.consulta.data_solicitacao" disabled />
                            </v-col>

                            <v-col cols="12" lg="4">

                            </v-col>
                        </v-row>
                    </v-sheet>
                    <v-row class="ma-3">
                        <v-col>
                        </v-col>
                    </v-row>
                    <v-card-item>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn
                                v-show="store.state.agendamento.consulta.servico === 'Atendimento Psicológico' && psi === 'false'"
                                text="Ver Respostas Confidências" @click="showDialogRespostas" variant="outlined" />
                            <v-btn class="mr-5" text="Salvar" variant="tonal" @click="salvar"
                                :disabled="ativarEdicao" />
                            <v-btn @click="fecharDialog" text="Fechar" variant="tonal" />
                        </v-card-actions>
                    </v-card-item>
                </form>
            </v-sheet>
        </v-dialog>
        <v-dialog v-model="store.state.controladoresTela.showMsgSucessoAgendamento">
            <mensagemSucesso :mensagem="mensagem" />
        </v-dialog>
    </v-container>

   


    <div style="display: flex;" v-if="props.consulta.status === 'Confirmada'">
        <v-btn icon="mdi-eye" @click="abrirDialog" />
        <v-btn icon="mdi-cancel" color="red" @click="abrirDialogAtualizar" />
    </div>
    <div style="display: flex;" v-if="props.consulta.status === 'Cancelada'">
        <v-btn icon="mdi-alpha-x-circle" @click="abrirDialogExcluir" />
    </div>
    <div v-if="props.consulta.status === 'Solicitada'">
        <v-btn icon="mdi-eye" @click="abrirDialog" />
    </div>

    <v-dialog v-model="store.state.controladoresTela.dialogCancelar" persistent>
        <v-card class=" mx-auto" style="width: 300px;">
            <p>{{ store.state.agendamento.consulta.id }}</p>
            <v-toolbar title="Aviso" color="primary" />
            <v-card-text style="text-align: justify;">Tem certeza que deseja cancelar esse agendamento?</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text="Sim" variant="tonal" @click="cancelarAgendamento" />
                <v-btn text="Não" variant="tonal" @click="fecharDialogExcluir" />
            </v-card-actions>

        </v-card>
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
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import mensagemSucesso from '@/components/Mensagens/mensagemSucesso.vue'
import mensagemSucessoExcluir from '@/components/Mensagens/mensagemSucessoExcluir.vue';
import avisoExcluirConsulta from '../Mensagens/avisoExcluirConsulta.vue';
import avisoDataObrigatoria from '@/components/Mensagens/avisoDataObrigatoria.vue';
const store = useStore()


const psi = localStorage.getItem('psi')
const props = defineProps({
    consulta: Object,
    dialog: Boolean
})

const profissionais = ref([])

//Variáveis e constantes
const dialog = ref(false)
let habilitarCData = ref(true)
let ativarEdicao = ref(true)
let showRespostas = ref(false)
const profissional = ref('')
profissional.value = props.consulta.Profissional ? props.consulta.Profissional.nome : 'Profissional Indefinido'
const selectTipos = ref(['Confirmada'])


//Funções da tela

function habilitarCampoData(item) {

    if (item === 'Confirmada') {
        habilitarCData.value = false
    } else {
        habilitarCData.value = true

    }
}

function trocarSelectTeste(item) {
    store.dispatch('setProfissionalId', item)
    console.log(store.state.agendamento.consulta)
    console.log(item)
}

async function abrirDialog() {
    if (props.consulta.status === 'Solicitada') {
        habilitarCData.value = true

        profissional.value = 'Profissional Indefinido'

        console.log('entrou aqui')
    }

    console.log(store.state.agendamento.consulta.data)
    console.log(store.state.agendamento.consulta.data_solicitacao)
    console.log('abri modal de editar agendamento')
    await store.dispatch('getConsulta', props.consulta.id)
    await store.dispatch('getProfissionais')
    console.log("Profissionais do store:", store.getters.profissionais)
    if (store.state.profissionais.profissional.nome === '' && store.state.profissionais.profissional.especialidade === '') {
        console.log('Profissional indefinido')
    } else {
        console.log(store.state.profissionais.profissional)
    }
    profissionais.value = store.getters.profissionais
    if (profissionais.value.message === 'Nenhuma profissional cadastrado no sistema') {
        store.dispatch('setShowMsgSemProfi', true)
    }
    dialog.value = !dialog.value
    console.log(profissionais.value)
}


async function abrirDialogExcluir() {
    await store.dispatch('getConsulta', props.consulta.id)
    store.dispatch('setShowDialogExcluirConsulta', true)
}

async function fecharDialog() {
    ativarEdicao.value = true
    console.log('fechar modal de editar agendamento')
    dialog.value = !dialog.value
    console.log(store.getters.profissionais)
    store.dispatch('listarConsultas');
}

async function abrirDialogAtualizar() {
    await store.dispatch('getConsulta', props.consulta.id)
    console.log(store.state.agendamento.consulta)
    console.log(store.state.agendamento.idConsulta)
    // store.dispatch('setIdConsulta', props.consulta.id)
    store.dispatch('setDialogCancelar', true)
}
function EnabledEdit() {
    ativarEdicao.value = !ativarEdicao.value
}
function fecharDialogExcluir() {
    store.dispatch('setDialogCancelar', false)
}
function showDialogRespostas() {
    store.dispatch('resposta')
    showRespostas.value = true
}
function fecharRespostas() {
    showRespostas.value = false
}

async function cancelarAgendamento() {

    store.dispatch('atualizarConsulta')
    // store.dispatch('getConsulta', store.state.agendamento.consulta.id)
    // console.log(store.state.agendamento.consulta.id)
    // console.log(store.state.agendamento.consulta)
    store.dispatch('setDialogCancelar', false)
}

async function salvar() {
    store.dispatch('agendarConsulta')
}
</script>

<style></style>