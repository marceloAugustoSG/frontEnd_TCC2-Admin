<template>
    <v-sheet class="pa-5">
        <v-card-title>
            <span class="text-h5">Novo</span>
        </v-card-title>
        <v-container>
            <form @submit.prevent="submit">
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="novoProfissional.nome" label="Nome" variant="outlined" required />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-select v-model="novoProfissional.especialidade" :items="['Medico', 'Psicólogo']"
                            label="Especialidade" variant="outlined" required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="novoProfissional.email" label="E-mail" variant="outlined" required />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="novoProfissional.telefone" label="Telefone" variant="outlined"
                            required />
                    </v-col>
                </v-row>
            </form>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" type="submit" variant="tonal" color="blue-darken-2" text="Salvar" />
            <v-btn @click="close" color="blue-darken-1" variant="tonal" text="Fechar" />
        </v-card-actions>
    </v-sheet>
</template>

<script setup>

import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore()

const novoProfissional = ref({
    nome: '',
    email: '',
    especialidade: '',
    telefone: ''

})


async function submit() {

    store.dispatch('criarProfissional', novoProfissional.value)
    console.log(novoProfissional.value)
}

function close() {
    store.dispatch('setShowMNewProf', false)

}

</script>

<style></style>