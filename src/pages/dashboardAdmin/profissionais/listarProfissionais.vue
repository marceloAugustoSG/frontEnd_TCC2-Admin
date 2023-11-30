<template>
    <v-card class="ma-5" elevation="10" title="Listagem de profissionais">
        <v-data-table :headers="headers" :items="profissionais" item-key="name" items-per-page="5" />
    </v-card>
</template>

<script setup>
import { computed, onBeforeMount } from "vue"
import { useStore } from "vuex";

const store = useStore()

const headers = [
    { title: 'Nome', value: 'nome' },
    { title: 'E-mail', value: 'email' },
    { title: 'Especialidade', value: 'especialidade' }]



onBeforeMount(async () => {

    console.log('Entrou aqui')
    await store.dispatch('getProfissionais')


})

const profissionais = computed(() => store.state.profissionais)
</script>