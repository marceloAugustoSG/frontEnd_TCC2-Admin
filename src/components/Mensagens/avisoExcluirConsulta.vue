<template>
    <v-card class=" mx-auto" style="width: 300px;">
        <!-- {{ store.state.agendamento.idConsulta }} -->
        <v-toolbar title="Aviso" color="primary" />
        <v-card-text style="text-align: justify;">Tem certeza que deseja excluir esse agendamento?</v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn text="Sim" variant="tonal" @click="excluirAgendamento" />
            <v-btn text="Não" variant="tonal" @click="fecharDialogExcluir" />
        </v-card-actions>

    </v-card>


</template>

<script setup>
import { useStore } from "vuex"


const store = useStore()

function excluirAgendamento() {

    store.dispatch('excluirConsulta')
    store.dispatch('setShowDialogExcluirConsulta', false)

}
function fecharDialogExcluir() {

    store.dispatch('setShowDialogExcluirConsulta', false)
}

</script>

<style></style>