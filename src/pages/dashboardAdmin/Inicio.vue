<template>
    <v-container>
        <h2>Informações:</h2>
        <br>
        <v-row>
            <v-col cols="2">
                <v-card color="orange" class="text-center">
                    <v-card-title>Solicitadas</v-card-title>
                    <v-card-text>{{ consultasAgendadas }}</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card color="green" class="text-center">
                    <v-card-title>Confirmadas</v-card-title>
                    <v-card-text>{{ consultasConfirmadas }}</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card color="red" class="text-center">
                    <v-card-title>Canceladas</v-card-title>
                    <v-card-text>{{ consultasCanceladas }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-divider class="ma-2" />
        <v-row>



        </v-row>
    </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const consultasAgendadas = computed(() => store.getters.consultasAgendadas);
const consultasConfirmadas = computed(() => store.getters.consultasConfirmadas);
const consultasCanceladas = computed(() => store.getters.consultasCanceladas);

</script>
