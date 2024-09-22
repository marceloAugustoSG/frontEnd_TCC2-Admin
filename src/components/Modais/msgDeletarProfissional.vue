<template>
    <v-sheet class="pa-5">
        <v-card-title>
            <span class="text-h5">Excluir</span>
        </v-card-title>
        <v-card-title>Deseja realmente excluir esse profissional?</v-card-title>
        <v-sheet v-if="store.state.profissionais.consultasEmpty">
            <v-card-subtitle>
                Existem consultas que estão ligadas a esse profissional</v-card-subtitle>
            <v-card-subtitle>
                Ao apagar esse profissional, as consultas relacionadas a ele tambem irão ser apagadas</v-card-subtitle>
        </v-sheet>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="confirmar" color="#28A745" variant="tonal" text="Sim" />
            <v-btn @click="fechar" type="submit" variant="tonal" color="#FF6B6B" text="Não" />
        </v-card-actions>
    </v-sheet>


</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({
    profissional: Object

})


function confirmar() {
    if (store.state.profissionais.consultasEmpty) {
        store.dispatch('excluirConsultasProfissional', store.state.profissionais.profissional.id)
        store.dispatch('setShowMDeletarProf', false)
    }
    else {
        console.log(store.state.profissionais.profissional)
        console.log(store.state.profissionais.profissional.id)
        store.dispatch('excluirProfissional', store.state.profissionais.profissional.id)
        store.dispatch('setShowMDeletarProf', false)
    }
}

function fechar() {
    store.dispatch('setShowMDeletarProf', false)


}


</script>
