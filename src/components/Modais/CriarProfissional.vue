<template>

    <v-sheet class="pa-5">
        <v-card-title>
            <span class="text-h5">Novo Profissional</span>
        </v-card-title>

        <v-container>
            <v-form ref="form">
                <v-row>
                    <v-col cols="12" lg="12">
                        <v-text-field v-model="novoProfissional.ProfissionalSaude.nome" variant="outlined"
                            :rules="nomeRules" label="Nome" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-select v-model="novoProfissional.ProfissionalSaude.especialidade" :items="especialidades"
                            variant="outlined" :rules="especialidadeRules" label="Especialidade" />
                    </v-col>

                    <v-col cols="12" lg="6">
                        <v-text-field v-model="novoProfissional.ProfissionalSaude.telefone" variant="outlined"
                            :rules="telefoneRules" label="Telefone" />
                    </v-col>

                </v-row>

                <v-row>

                    <v-col cols="12" lg="12">
                        <v-text-field v-model="novoProfissional.email" variant="outlined" :rules="emailRules"
                            label="E-mail" />
                    </v-col>
                    <v-col cols="12" lg="12">
                        <v-text-field variant="outlined" v-model="novoProfissional.password"
                            :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showpassword ? 'text' : 'password'"
                            @click:append-inner="showpassword = !showpassword" label="Senha" :rules="passwordRules"
                            required />
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="submit" variant="flat" color="#28A745" text="Salvar" />
                    <v-btn @click="close" color="#FF6B6B" variant="flat" text="Fechar" />
                </v-card-actions>
            </v-form>
        </v-container>

    </v-sheet>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const especialidades = ['Atendimento Médico', 'Atendimento Psicológico']

const novoProfissional = ref({
    email: '',
    password: '',
    regra: '',
    ProfissionalSaude: {
        nome: '',
        especialidade: '',
        email: '',
        telefone: '',
    }

})


// Watch para observar mudanças no campo 'email' no nível superior
watch(
    () => novoProfissional.value.email,
    (novoEmail) => {
        novoProfissional.value.ProfissionalSaude.email = novoEmail;
    },
    { immediate: true } // Adiciona immediate para definir o valor inicial
);

// Watch para observar mudanças no campo 'especialidade' dentro de ProfissionalSaude
watch(
    () => novoProfissional.value.ProfissionalSaude.especialidade,
    (novaEspecialidade) => {
        if (novaEspecialidade === 'Atendimento Psicológico') {
            novoProfissional.value.regra = 'psicologo';
        } else if (novaEspecialidade === 'Atendimento Médico') {
            novoProfissional.value.regra = 'medico';
        } else {
            novoProfissional.value.regra = ''; // Valor padrão se não atender nenhuma condição
        }
    }
);



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

const passwordRules = ref([
    v => !!v || 'Senha é obrigatoria',
])

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



let showpassword = ref(false)

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