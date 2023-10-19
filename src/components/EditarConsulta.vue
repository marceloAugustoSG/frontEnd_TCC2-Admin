<template>
    <v-dialog v-model="dialog" width="auto" v-click-outside="reniciarVariaveis()">
        <v-card width="auto">
            <v-toolbar color="primary" :title="toggleTittle === false ? 'Editar consulta' : 'Detalhes da Consulta'">
                <v-btn icon @click="EnabledEdit()">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-item>
                <v-sheet width="600" height="auto" class="mx-auto">
                    <v-form @submit.prevent="submit">
                        <v-container>
                            <v-row>
                                <v-col cols="8">
                                    <v-text-field v-model="consultaData.nome" label="Nome do Paciente" disabled />
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="consultaData.tipo" label="Vínculo" disabled />
                                </v-col>
                                <v-col cols="12">
                                    <v-select :items="opcoesSelectProf(opcoesProfissionais)"
                                        v-model="consultaData.nomeProfissional" label="Profissional" requerid
                                        :disabled="ativarEdicao">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field type="datetime-local" v-model="consultaData.data"
                                        label="Data e hora da consulta" min="2023-06-01T07:00" max="2030-06-30T18:00"
                                        step="1800" :disabled="ativarEdicao" />
                                </v-col>
                                <v-col cols="4">
                                    <v-select :items="opcoes" v-model="consultaData.status" label="Status"
                                        :disabled="ativarEdicao" />
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="8">
                                    <v-text-field v-model="consulta.servico" disabled label="Serviço" />
                                </v-col>

                                <v-col cols="4">
                                    <v-text-field v-model="local" label="Local" disabled />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-sheet>
            </v-card-item>
            <v-card-actions class="pa-5">
                <v-card-item>
                    <v-btn text="Salvar" @click="submit(consultaData)" variant="outlined" :disabled="ativarEdicao" />
                </v-card-item>
                <v-spacer />
                <v-card-item>
                    <v-btn @click="fecharEdicao()" text="Fechar" variant="outlined" />
                </v-card-item>
            </v-card-actions>
            <p>{{ consultaData }}</p>
            <p>{{ opcoesProfissionais }}</p>
        </v-card>
    </v-dialog>
    <v-btn @click="dialog = true" color="btn" icon="mdi-tune-vertical-variant" variant="outlined" />
</template>
<script setup>
import store from '@/store';
import { onMounted, ref } from 'vue'
import { defineProps, computed } from 'vue';
const toggleTittle = ref(true)
const ativarEdicao = ref(true)
const local = ref('Castelinho')
const opcoes = ref(['Agendada', 'Confirmada', 'Cancelada'])


const consultaData = ref({
    nome: props.consulta.Paciente.nome,
    tipo: props.consulta.Paciente.tipo,
    status: props.consulta.status,
    data: props.consulta.data
});

function EnabledEdit() {
    ativarEdicao.value = !ativarEdicao.value
    toggleTittle.value = !toggleTittle.value
}
const dialog = ref(false)
const props = defineProps({
    dialog: Boolean,
    consulta: Object
})

function reniciarVariaveis() {
    ativarEdicao.value = true
    consultaData.value.data = props.consulta.data
    consultaData.value.status = props.consulta.status
}
function submit(consulta) {
    console.log(consulta)
}
function fecharEdicao() {
    ativarEdicao.value = true
    dialog.value = false
}

onMounted(async () => {
    await store.dispatch('listarProfissionais')
})
const opcoesProfissionais = computed(() => store.state.profissionais)

function opcoesSelectProf(opcoes) {
    return opcoes.map(opcao => opcao.nome)
}

console.log(opcoesProfissionais.value)
</script>

<style></style>