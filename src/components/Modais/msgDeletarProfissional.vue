<template>
    <v-sheet class="pa-5">
        <v-card-title>
            <span class="text-h5">Excluir</span>
        </v-card-title>
        <v-card-subtitle>Deseja realmente excluir esse profissional?</v-card-subtitle>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="confirmar" color="blue-darken-1" variant="tonal" text="Sim" />
            <v-btn @click="fechar" type="submit" variant="tonal" color="blue-darken-2" text="Não" />
        </v-card-actions>
    </v-sheet>


</template>

<script setup>
import { useStore } from 'vuex';

const props = defineProps({
    profissional: Object

})

const store = useStore()
function confirmar() {
    store.dispatch('excluirProfissional', store.state.profissional.id)
    console.log(store.state.profissional.id)
    window.location.reload();
    store.dispatch('setShowMDeletarProf', false)
}

function fechar() {
    store.dispatch('setShowMDeletarProf', false)


}


</script>
