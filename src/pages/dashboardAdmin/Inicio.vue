<template>
    <v-container>
        <h2>Informações:</h2>
        <v-row>
            <v-col cols="2" />
            <v-col cols="2">
                <v-card color="blue" class="text-center">
                    <v-card-title style="font-size: 14px;">Todas as consultas</v-card-title>
                    <v-card-text>{{ consultas }}</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card color="orange" class="text-center">
                    <v-card-title style="font-size: 14px;">Solicitadas</v-card-title>
                    <v-card-text>{{ consultasSolicitadas }}</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="2">
                <v-card color="green" class="text-center">
                    <v-card-title style="font-size: 14px;">Confirmadas</v-card-title>
                    <v-card-text>{{ consultasConfirmadas }}</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card color="red" class="text-center">
                    <v-card-title style="font-size: 14px;">Canceladas</v-card-title>
                    <v-card-text>{{ consultasCanceladas }}</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="2" />
        </v-row>
        <v-divider class="ma-2" />
        <v-row>
        </v-row>
        <v-row>
            <v-col cols="2" />
            <v-col cols="10">
                <graficoTeste />
            </v-col>
            <v-col cols="2" />

        </v-row>
    </v-container>
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
