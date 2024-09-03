<!-- <template>

    <v-sheet class="pa-5">
        <v-card-title>
            <span class="text-h5">Editar</span>
        </v-card-title>

        <v-container>
            <v-form ref="form">
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="store.state.profissionais.profissional.nome" variant="outlined"
                            :rules="nomeRules" label="Nome" />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-select v-model="store.state.profissionais.profissional.especialidade" :items="especialidades"
                            variant="outlined" :rules="especialidadeRules" label="Especialidade" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="store.state.profissionais.profissional.email" variant="outlined"
                            :rules="emailRules" label="email" />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="store.state.profissionais.profissional.telefone" variant="outlined"
                            :rules="telefoneRules" label="Telefone" />
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

        store.dispatch('editarProfissional')
        close();

        store.dispatch('setShowModalSucesso', true)
    } else {
        console.log('Form is not valid')
        return;
    }
}

function close() {
    store.dispatch('setShowMEditProf', false)

}

</script> -->


<template>
    <v-sheet class="pa-5">
        <v-card-title>
            <span class="text-h5">Editar</span>
        </v-card-title>

        <v-container>
            <v-form ref="form">
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="store.state.profissionais.profissional.nome" variant="outlined"
                            :rules="nomeRules" label="Nome" @keydown.enter="submit" />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-select v-model="store.state.profissionais.profissional.especialidade" :items="especialidades"
                            variant="outlined" :rules="especialidadeRules" label="Especialidade"
                            @keydown.enter="submit" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="store.state.profissionais.profissional.email" variant="outlined"
                            :rules="emailRules" label="E-mail" @keydown.enter="submit" />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field v-model="store.state.profissionais.profissional.telefone" variant="outlined"
                            :rules="telefoneRules" label="Telefone" @keydown.enter="submit" />
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

const store = useStore();

const especialidades = ['Atendimento Médico', 'Atendimento Psicológico'];

const nomeRules = [
    value => {
        if (value) return true;
        return 'Campo nome não pode ser vazio';
    }
];

const especialidadeRules = [
    value => {
        if (value) return true;
        return 'Campo especialidade não pode ser vazio';
    }
];

const emailRules = [
    value => {
        if (value) return true;
        return 'Campo email não pode ser vazio';
    }
];

const telefoneRules = [
    value => {
        if (value) return true;
        return 'Campo telefone não pode ser vazio';
    },
    value => {
        const telefoneRegex = /^\d{2}\d{9}$/;
        if (!value) return 'Campo telefone não pode ser vazio';
        if (!telefoneRegex.test(value)) return 'Por favor, insira um número de telefone válido: (xx)xxxxxxxxx';
        return true;
    }
];

const form = ref(null);

async function submit() {
    const isValid = await form.value.validate();

    if (isValid) {
        console.log('Form is valid');

        store.dispatch('editarProfissional');
        close();
        store.dispatch('setShowModalSucesso', true);
    } else {
        console.log('Form is not valid');
        return;
    }
}

function close() {
    store.dispatch('setShowMEditProf', false);
}
</script>