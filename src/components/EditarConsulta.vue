<template>
    <v-dialog v-model="dialog" width="auto" v-click-outside="reniciarVariaveis()">
        <v-card width="auto">
            <v-toolbar color="primary" :title="toggleTittle === true ? 'Editar consulta' : 'Detalhes da Consulta'">
                <v-btn icon @click="EnabledEdit()">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-item>
                <v-sheet width="auto" height="auto" class="mx-auto">
                    <v-form @submit.prevent="submit">
                        <v-container>
                            <v-row>
                                <v-col cols="8">
                                    <v-text-field v-model="props.consulta.Paciente.nome" label="Nome do Paciente"
                                        disabled />
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="props.consulta.Paciente.tipo" label="Vínculo" disabled />
                                </v-col>
                                <v-col cols="12">
                                    <v-select :items="opcoesProfissionais" item-title="nome"
                                        v-model="props.consulta.Profissional.id" label="Profissional" requerid
                                        item-value="id" :disabled="isEnablesC">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field type="datetime-local" v-model="props.consulta.data"
                                        label="Data e hora da consulta" :disabled="isEnablesC" />
                                </v-col>

                                <v-col cols="4">
                                    <v-select :items="opcoes" v-model="props.consulta.status" label="Status"
                                        :disabled="isEnablesC" />
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="8">
                                    <v-text-field v-model="props.consulta.servico" label="Serviço" disabled />
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
                    <v-btn text="Salvar" @click="submit(consultaData)" variant="outlined" :disabled="isEnablesC" />
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
    <v-btn @click="dialog = true" color="btn" icon="mdi-tune-vertical" variant="outlined" />
</template>
<script setup>
import store from '@/store';
import { onMounted, ref } from 'vue'
import { defineProps, computed } from 'vue';
const toggleTittle = ref(true)
const isEnablesC = ref(true)
const local = ref('Castelinho')
const opcoes = ref(['Agendada', 'Confirmada', 'Cancelada'])


const consultaData = ref({
    data: props.consulta.data,
    status: props.consulta.status,
    observacao: props.consulta.observacao,
    servico: props.consulta.servico,
    profissionalId: props.consulta.Profissional ? props.consulta.Profissional.id : props.consulta.Profissional = {}
});

function EnabledEdit() {
    isEnablesC.value = !isEnablesC.value
    toggleTittle.value = !toggleTittle.value
}
const dialog = ref(false)
const props = defineProps({
    dialog: Boolean,
    consulta: Object
})

function reniciarVariaveis() {
    consultaData.value.data = props.consulta.data
    consultaData.value.status = props.consulta.status
}
async function submit() {

    console.log('teste')
    console.log(consultaData)
    console.log(props.consulta)


}
function fecharEdicao() {
    isEnablesC.value = true
    dialog.value = false
}



onMounted(async () => {
    await store.dispatch('listarProfissionais')
})
const opcoesProfissionais = computed(() => store.state.profissionais)



</script>

<style></style>