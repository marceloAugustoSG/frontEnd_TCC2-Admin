<template>
    <v-container class="fill-height">
        <v-row class=" p-4">
            <v-col cols="12" lg="3" md="2" sm="2" xl="4"></v-col>
            <v-col cols="12" lg="6" md="8" sm="8" xl="4">
                <v-card>
                    <v-card-text>
                        <h2 class="text-center">alo sua conta</h2>
                    </v-card-text>
                    <v-card>
                        <v-card-item>
                            <form @submit.prevent="submit">

                                <v-text-field prepend-inner-icon="mdi-account" v-model="usuario.paciente.nome" label="Nome"
                                    required />
                                <v-text-field prepend-inner-icon="mdi-email" v-model="usuario.email" :rules="emailRules"
                                    label="E-mail" required />

                                <v-text-field prepend-inner-icon="mdi-form-textbox-password" v-model="usuario.password"
                                    :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showpassword ? 'text' : 'password'"
                                    @click:append-inner="showpassword = !showpassword" label="Senha" :rules="passwordRules"
                                    required />


                                <v-text-field prepend-inner-icon="mdi-form-textbox-password" v-model="confirmPassword"
                                    :append-inner-icon="showCorfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showCorfirmPassword ? 'text' : 'password'"
                                    @click:append-inner="showCorfirmPassword = !showCorfirmPassword" label="Confirmar Senha"
                                    required />


                                <v-text-field type="number" v-model="usuario.paciente.matricula" label="Nº Matricula"
                                    :rules="matriculaRules" />

                                <v-select label="Tipo" v-model="usuario.paciente.tipo" :items="selectTipos" />

                                <v-row class="pb-5">
                                    <v-col>
                                        <v-btn @click="backtoLogin" class="w-100" color="primary">Voltar para o
                                            Login</v-btn>
                                    </v-col>

                                    <v-col>
                                        <v-btn type="submit" class="w-100" color="create">Criar
                                            Conta</v-btn>
                                    </v-col>

                                </v-row>
                            </form>
                        </v-card-item>
                    </v-card>
                </v-card>
                <v-col cols="12" lg="3" md="2" sm="2" xl="4" />
            </v-col>
        </v-row>
        <v-dialog v-model="isUserCreated" max-width="500">
            <v-card>
                <Alert type="success" title="Aviso" text="Usuario criado com sucesso" variant="outlined" />
            </v-card>
        </v-dialog>

        <v-dialog v-model="isUserCreated" max-width="500">
            <v-card>
                <Alert type="success" title="Aviso" text="Usuario criado com sucesso" variant="outlined" />
            </v-card>
        </v-dialog>

        <v-dialog v-model="differentPass" max-width="500">
            <v-card>
                <Alert type="warning" title="Aviso" text="Senhas diferentes" variant="outlined" />
            </v-card>
        </v-dialog>
        <v-dialog v-model="isCheckEmail" max-width="500">
            <v-card>
                <Alert type="warning" title="Aviso" text="Email deve ser : email@edu.ufes.br" variant="outlined" />
            </v-card>
        </v-dialog>

        <v-dialog v-model="isUserExist" max-width="500">
            <v-card>
                <Alert type="warning" title="Aviso" text="Já existe um usuario com esse email" variant="outlined" />
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router";
import { useStore } from "vuex"
import Alert from "@/components/Alert.vue";
const store = useStore();
const router = useRouter();
let differentPass = ref(false)
let isCheckEmail = ref(false)
let isUserCreated = ref(false)
let isUserExist = ref(false)
let usuario = reactive({
    email: '',
    password: '',
    regra: 'paciente',
    paciente: {
        nome: '',
        tipo: '',
        matricula: '',
        dataNascimento: ''
    },
})
let confirmPassword = ref('')
let showpassword = ref(false)
let showCorfirmPassword = ref(false)
const emailRules = ref([
    v => !!v || 'E-mail é obrigatório e unico',
    v => /^[a-zA-Z0-9._%+-]+@edu\.ufes\.br/.test(v) || 'E-mail deve ser válido',
])
const passwordRules = ref([
    v => !!v || 'Senha é obrigatoria',
])
const matriculaRules = ref([
    value => !!value || "Campo obrigatório",
    value =>
        (value && /^\d{10}$/.test(value)) ||
        "A matricula deve ter exatamente 10 números",
    value => value.leng
])
const selectTipos = ref(['Aluno', 'Servidor'])

async function submit() {
    try {
        await store.dispatch('criarUsuario', usuario)

        if (store.state.message === "usuario criado com sucesso!") {
            isUserCreated.value = true
            setInterval(() => {
                isUserCreated.value = false
            }, 2500)

        }
        if (store.state.message === 'email nao aceito') {
            isCheckEmail.value = true
            setInterval(() => {
                isCheckEmail.value = false
            }, 2500)
            clearInputs()
        }
        if (store.state.message === 'usuário ja existe') {
            isUserExist.value = true
            setInterval(() => {
                isUserExist.value = false
            }, 2500)
            clearInputs()
        }

        if (!checkPassoWord()) {
            differentPass.value = true
            setInterval(() => {
                differentPass.value = false
            }, 2500)
        }
    } catch (error) {
        console.log(error)
    }
}
function backtoLogin() {
    router.push({ name: 'login' })
}
function clearInputs() {
    usuario.paciente.nome = ''
    usuario.email = ''
    usuario.password = ''
    confirmPassword.value = ''
    usuario.paciente.matricula = ''
    usuario.paciente.tipo = ''
}

function checkPassoWord() {
    return usuario.password === confirmPassword.value ? true : false

}
</script>
<style>
.text-center {
    text-align: center;

}
</style>