<template>
    <v-card class=" mx-auto" style="width: 400px;">
        <v-toolbar title="Aviso" color="primary" />
        <v-card-text>
            Preencha todos os campos corretamente
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="fecharDialogErro" text="OK" />
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore()

function fecharDialogErro() {
    store.dispatch('setAvisoDataObg', false)
    // store.dispatch('setConsulta', null)



}



</script>