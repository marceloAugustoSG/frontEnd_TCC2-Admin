<template>
    <v-container>
        <v-card title="Cadastrar Profissional" elevation="10" class="ma-5 pa-5">
            <form @submit.prevent="submit">
                <v-row>
                    <v-col>
                        <v-text-field label="Nome" v-model="nome" requerid />
                    </v-col>
                    <v-col>
                        <v-select label="Especialidade" v-model="especialidade" :items="['Médico', 'Psicologo']" requerid />
                    </v-col>
                </v-row>
                <v-btn text="Cadastrar " variant="tonal" @click="submit" />
            </form>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore()
const nome = ref('')
const email = ref('')
const especialidade = ref('')

async function submit() {

    const profissional = {
        nome: nome.value,
        especialidade: especialidade.value
    }

    await store.dispatch('criarProfissional', profissional)





}

</script>

<style></style>