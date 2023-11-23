<template>
    <v-container>
        <v-dialog v-model="dialogErro">
            <v-card class=" mx-auto" style="width: 400px;">
                <v-toolbar title="Aviso" color="primary" />
                <v-card-text>
                    Forneca uma data e horario para a consulta
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="fecharDialogErro" text="OK" />
                </v-card-actions>
            </v-card>

        </v-dialog>
        <v-dialog v-model="dialogExcluir">
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
                            <v-col cols="12" lg="6">
                                <v-text-field label="Serviço" v-model="store.state.consulta.servico" disabled />
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-select label="Status" v-model="store.state.consulta.status" :items="selectTipos"
                                    :disabled="ativarEdicao" />
                            </v-col>
                        </v-row>
                        <v-row class="ma-3">
                            <v-col cols="12" lg="6">
                                <v-text-field label="Data de Solicitação" v-model="store.state.consulta.data_solicitacao"
                                    disabled />
                            </v-col>
                            <v-col>
                                <v-text-field v-if="props.consulta.status === 'Confirmada'"
                                    :type="ativarEdicao ? 'text' : 'datetime-local'" label="Data e Horário para a consulta"
                                    v-model="store.state.consulta.data" :disabled="ativarEdicao" />
                                <v-text-field v-else type="datetime-local" label="Data e Horário para a consulta"
                                    v-model="store.state.consulta.data" :disabled="ativarEdicao" />

                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-item>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn class="mr-5" text="Salvar" variant="tonal" @click="salvar" :disabled="ativarEdicao" />
                            <v-btn @click="fechar" text="Fechar" variant="tonal" />
                        </v-card-actions>
                    </v-card-item>
                </form>
            </v-card>
            <p>{{ dataProps }}</p>
        </v-dialog>

        <v-dialog v-model="store.state.isMessageSucesso">
            <mensagemSucesso :mensagem="mensagem" />
        </v-dialog>

    </v-container>
    <div style="display: flex;" v-if="props.consulta.status === 'Confirmada'">
        <v-btn icon="mdi-eye" @click="abrirDialog" />
        <v-btn icon="mdi-alpha-x-circle" @click="abrirDialogExcluir" />
    </div>
    <div style="display: flex;" v-if="props.consulta.status === 'Cancelada'">
        <v-btn icon="mdi-alpha-x-circle" @click="abrirDialogExcluir" />
    </div>
    <div v-if="props.consulta.status === 'Agendada'">
        <v-btn icon="mdi-eye" @click="abrirDialog" />

    </div>
</template>

<script setup>
import formatDate from '@/services/date';
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import mensagemSucesso from '@/components/DashBoard/mensagemSucesso.vue'
const dialog = ref(false)
const dialogExcluir = ref(false)
let ativarEdicao = ref(true)
let dataProps = props.consulta.data
const dialogErro = ref(false)
const mensagem = ref("Consulta Confirmada com Sucesso !")


const store = useStore()

const props = defineProps({
    consulta: Object
})



const selectTipos = ref(['Confirmada', 'Cancelada'])

function fecharDialogExcluir() {
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
        console.log('datas iguais')
        dialogErro.value = true

    } else {
        console.log('datas diferentes')
        console.log(dataP)
        console.log(store.state.consulta.data)
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

    try {
        await store.dispatch('getConsulta', props.consulta.id)

    } catch (error) {
        console.error(error)
    }

}

async function abrirDialogExcluir() {
    dialogExcluir.value = true


}
async function abrirDialog() {
    try {
        await store.dispatch('getConsulta', props.consulta.id)

    } catch (error) {
        console.error(error)
    }


    dialog.value = !dialog.value
}

function EnabledEdit() {
    ativarEdicao.value = !ativarEdicao.value

    console.log(ativarEdicao.value)

}





</script>

<style></style>