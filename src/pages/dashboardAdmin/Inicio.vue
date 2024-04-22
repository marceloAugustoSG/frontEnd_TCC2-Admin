<template>

</template>

<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import graficoTeste from './graficoTeste.vue';

const store = useStore()

const consultas = computed(() => store.getters.consultas.length);
const consultasConfirmadas = computed(() => store.getters.consultas.filter(consulta => consulta.status === 'Confirmada').length);
const consultasSolicitadas = computed(() => store.getters.consultas.filter(consulta => consulta.status === 'Solicitada').length);
const consultasCanceladas = computed(() => store.getters.consultas.filter(consulta => consulta.status === 'Cancelada').length);

onBeforeMount(async () => {

    await store.dispatch('listarConsultas');
})

</script>
