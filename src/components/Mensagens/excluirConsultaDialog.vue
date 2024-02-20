<template>
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
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
const props = defineProps({
    consulta: Object
})
const store = useStore()

function excluirAgendamento(idConsulta){

    store.dispatch('excluirConsulta',idConsulta)
}
store.dispatch('setDialogExcluir', true)

function fecharDialogExcluir() {

    store.dispatch('setDialogExcluir', false)

}
z
onBeforeMount(() => {
    console.log(props.consulta.id)
})

</script>