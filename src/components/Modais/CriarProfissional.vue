<!-- <template>
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


const rules(value) = [
    value => {
        if (value) return true

        return 'You must enter a first name.'
    },
],

    async function submit() {

        store.dispatch('criarProfissional', novoProfissional.value)
        console.log(novoProfissional.value)
    }

function close() {
    store.dispatch('setShowMNewProf', false)

}

</script>

<style></style> -->

<template>

    <v-sheet class="pa-5">
        <v-card-title>
            <span class="text-h5">Novo</span>
        </v-card-title>

        <v-container>
            <v-form ref="form">
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="novoProfissional.nome" variant="outlined" :rules="nomeRules"
                            label="Nome" />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-select v-model="novoProfissional.especialidade" :items="especialidades" variant="outlined"
                            :rules="especialidadeRules" label="Especialidade" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="novoProfissional.email" variant="outlined" :rules="emailRules"
                            label="email" />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="novoProfissional.telefone" variant="outlined" :rules="telefoneRules"
                            label="Telefone" />
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="submit" variant="tonal" color="blue-darken-2" text="Salvar" />
                    <v-btn @click="close" color="blue-darken-1" variant="tonal" text="Fechar" />
                </v-card-actions>
            </v-form>
        </v-container>

    </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const especialidades = ['Atendimento Médico', 'Atendimento Psicológico']

const novoProfissional = ref({
    nome: '',
    especialidade: '',
    email: '',
    telefone: ''
})
const nomeRules = [
    value => {
        if (value) return true

        return 'Campo nome não pode ser vazio'
    },
]
const especialidadeRules = [
    value => {
        if (value) return true

        return 'Campo especialidade não pode ser vazio'
    },
]
const emailRules = [
    value => {
        if (value) return true

        return 'Campo email não pode ser vazio'
    },
]
const telefoneRules = [
    value => {
        if (value) return true

        return 'Campo telefone não pode ser vazio'
    },
    value => {
        const telefoneRegex = /^\d{2}\d{9}$/;
        if (!value) return 'Campo telefone não pode ser vazio';
        if (!telefoneRegex.test(value)) return 'Por favor, insira um número de telefone válido: (xx)xxxxxxxxx';
        return true;
    }


]

const form = ref(null);
async function submit() {
    const isValid = await form.value.validate();

    if (isValid.valid) {
        console.log('Form is valid')

        store.dispatch('criarProfissional', novoProfissional.value)
        close();

        store.dispatch('setMsgSaveProf', true)
    } else {
        console.log('Form is not valid')
        // await form.value.resetValidation()
        return;
    }


    console.log(novoProfissional.value)
}

function close() {
    store.dispatch('setShowMNewProf', false)

}

</script>