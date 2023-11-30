<template>
    <v-container>
        <v-dialog v-model="dialog">
            <v-card class=" mx-auto" style="width: 1000px;">
                <v-toolbar color="primary" :title="!ativarEdicao ? 'Editar consulta' : 'Detalhes da Consulta'">
                    <v-btn icon @click="EnabledEdit()" :disabled="props.consulta.status === 'Confirmada'">
                        <v-icon :icon="!ativarEdicao ? 'mdi-pencil-off' : 'mdi-pencil'" />
                    </v-btn>
                </v-toolbar>
                <form @submit.prevent="submit">
                    <v-card-item>
                        <v-card-subtitle class="ml-5">
                            Paciente
                        </v-card-subtitle>
                        <v-row class="ma-3">
                            <v-col cols="12" lg="4">
                                <v-text-field label="Nome" v-model="store.state.consulta.Paciente.nome" disabled />
                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-text-field label="Vínculo" v-model="store.state.consulta.Paciente.tipo" disabled />
                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-text-field label="Matricula" v-model="store.state.consulta.Paciente.matricula"
                                    disabled />
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-divider class="ma-5" />
                    <v-card-item>
                        <v-card-subtitle class="ml-5">
                            Informações da Consulta
                        </v-card-subtitle>
                        <v-row class="ma-3">
                            <v-col cols="12" lg="4">
                                <v-text-field label="Serviço" v-model="store.state.consulta.servico" disabled />
                                <v-textarea rows="1" label="Observação" v-model="store.state.consulta.observacao"
                                    :items="selectTipos" disabled />
                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-select label="Status" v-model="store.state.consulta.status" :items="selectTipos"
                                    :disabled="ativarEdicao" />
                                <v-text-field v-if="props.consulta.status === 'Confirmada'"
                                    :type="ativarEdicao ? 'text' : 'datetime-local'" label="Data e Horário para a consulta"
                                    v-model="store.state.consulta.data" :disabled="ativarEdicao" />
                                <v-text-field v-else type="datetime-local" label="Data e Horário para a consulta"
                                    v-model="store.state.consulta.data" :disabled="ativarEdicao" />

                            </v-col>
                            <v-col cols="12" lg="4">
                                <v-select label="Profissional" v-model="nomeProfissional"
                                    :items="store.getters.profissionais" :item-value="profissional => profissional.id"
                                    :item-title="profissional => profissional.nome" :disabled="ativarEdicao"
                                    v-show="store.state.isPsi" />


                                <v-text-field label="Data de Solicitação" v-model="store.state.consulta.data_solicitacao"
                                    disabled />
                            </v-col>
                            <v-col cols="12" lg="4">

                            </v-col>
                        </v-row>
                        <v-row class="ma-3">
                            <v-col>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-item>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn v-show="store.state.consulta.servico === 'Atendimento Psicológico' && psi === 'false'"
                                text="Ver Respostas Confidências" @click="showDialogRespostas" variant="outlined" />
                            <v-btn class="mr-5" text="Salvar" variant="tonal" @click="salvar" :disabled="ativarEdicao" />
                            <v-btn @click="fechar" text="Fechar" variant="tonal" />
                        </v-card-actions>
                    </v-card-item>
                </form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="store.state.isMessageSucesso">
            <mensagemSucesso :mensagem="mensagem" />
        </v-dialog>
    </v-container>

    <v-dialog v-model="showRespostas">
        <v-card>
            <v-toolbar title="Respostas Confidências" />
            <v-card-item class="ma-5">
                <v-row>
                    <v-col cols="12">
                        <p>Curso: {{ store.state.resposta['Curso'] }}</p>
                        <p>Estudante de: {{ store.state.resposta['Estudante de'] }}</p>
                        <p>Motivos para o atendimento: {{ store.state.resposta['Motivos para o atendimento'] }}</p>
                        <p>Se mudou para estudar na UFES? {{ store.state.resposta['Se mudou para estudar na UFES?'] }}</p>
                        <p>com quem você reside em Alegre?? {{ store.state.resposta['com quem você reside em Alegre?'] }}
                        </p>
                    </v-col>
                    <v-col cols="12">


                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" style="display: flex; align-items: center; justify-content: space-between;">
                        <p>Respostas Confidênciais: </p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" style="display: flex; align-items: center; justify-content: space-between;">
                        <ul>
                            <li class="ma-1" v-for="(valor, chave) in store.state.resposta['Respostas Confidencias']"
                                :key="chave">
                                {{ chave }}: {{ valor }}</li>
                        </ul>
                    </v-col>
                </v-row>
            </v-card-item>
            <v-card-actions class="ma-3">
                <v-spacer />
                <gerarExcel :json-data="store.state.resposta" style="margin-right: 30px;" />
                <v-btn @click="fecharRespostas" text="Fechar" variant="tonal" />
            </v-card-actions>
        </v-card>
    </v-dialog>


    <div style="display: flex;" v-if="props.consulta.status === 'Confirmada'">
        <v-btn icon="mdi-eye" @click="abrirDialog" />
        <v-btn icon="mdi-alpha-x-circle" @click="abrirDialogExcluir" />
    </div>
    <div style="display: flex;" v-if="props.consulta.status === 'Cancelada'">
        <v-btn icon="mdi-alpha-x-circle" @click="abrirDialogExcluir" />
    </div>
    <div v-if="props.consulta.status === 'Solicitada'">
        <v-btn icon="mdi-eye" @click="abrirDialog" />
    </div>

    <v-dialog v-model="store.state.dialogExcluir">
        <v-card class=" mx-auto" style="width: 300px;">
            <v-toolbar title="Aviso" color="primary" />
            <v-card-text style="text-align: justify;">Tem certeza que deseja excluir esse agendamento?</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text="Sim" variant="tonal" @click="excluirAgendamento" />
                <v-btn text="Não" variant="tonal" @click="fecharDialogExcluir" />
            </v-card-actions>
            <p>{{ props.consulta.id }}</p>
            <v-dialog v-model="store.state.isMessageExcluir">
                <mensagemSucesso mensagem="Agendamento Excluido com sucesso!" />
            </v-dialog>
        </v-card>
    </v-dialog>
</template>

<script setup>
import formatDate from '@/services/date';
import { defineProps, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import mensagemSucesso from '@/components/Mensagens/mensagemSucesso.vue'
import gerarExcel from '@/components/gerarPlanilha.vue';

const psi = localStorage.getItem('psi')
const props = defineProps({
    consulta: Object
})

//Variáveis e constantes
const dialog = ref(false)
const dialogExcluir = ref(false)
let ativarEdicao = ref(true)
const dialogErro = ref(false)
const mensagem = ref("Consulta Confirmada com Sucesso !")
const store = useStore()
let showRespostas = ref(false)
//props
const nomeProfissional = ref('')
nomeProfissional.value = props.consulta.Profissional ? props.consulta.Profissional.nome : 'Profissional Indefinido'
const selectTipos = ref(['Confirmada', 'Cancelada'])

let dataProps = props.consulta.data

//Funções
function showDialogRespostas() {
    store.dispatch('resposta')
    showRespostas.value = true

}
function fecharRespostas() {
    showRespostas.value = false
}


function fecharDialogExcluir() {

    store.dispatch('setDialogExcluir', false)
    dialogExcluir.value = false

}
function fecharDialogErro() {
    dialogErro.value = false

}

async function excluirAgendamento() {
    try {
        store.dispatch('IsMessageExcluir', true);

        await store.dispatch('excluirConsulta', props.consulta.id)

    } catch (error) {

    }
}

async function salvar() {
    let dataP = formatDate(dataProps)
    console.log(store.state.consulta.data)
    console.log(dataP)
    if (dataP === store.state.consulta.data) {
        store.dispatch('setDataConsulta', '')
        console.log('datas iguais')
        dataP = ''
        dialogErro.value = true

    } else {
        console.log('datas diferentes')
        console.log(dataP)
        console.log(store.state.consulta.data)

        store.state.consulta.profissionalId = nomeProfissional.value
        try {
            await store.dispatch('agendarConsulta');
        } catch (error) {
            console.error(error);
        }

        // Aguarda 4 segundos antes de chamar a função fechar
        store.dispatch('IsMessage', true);
        store.dispatch('listarConsultas');
        console.log(store.state.consulta.data)


        setTimeout(() => {
            fechar();
        }, 500); // 4000 milissegundos = 4 segundos
    }

}

async function fechar() {

    dialog.value = !dialog.value
    console.log(store.getters.profissionais)


    try {
        await store.dispatch('getConsulta', props.consulta.id)

    } catch (error) {
        console.error(error)
    }
    console.log(props.consulta.Profissional)

}

async function abrirDialogExcluir() {

    store.dispatch('setDialogExcluir', true)
    dialogExcluir.value = true


}
const profissionais = ref([])
async function abrirDialog() {
    try {
        await store.dispatch('getConsulta', props.consulta.id)
        await store.dispatch('getProfissionais')

    } catch (error) {
        console.error(error)
    }


    profissionais.value = store.state.profissionais
    dialog.value = !dialog.value
    console.log(profissionais.value)
}

function EnabledEdit() {
    ativarEdicao.value = !ativarEdicao.value

    console.log(ativarEdicao.value)

}

onBeforeMount(() => {
    store.dispatch('setDataConsulta', null)

})

</script>

<style></style>