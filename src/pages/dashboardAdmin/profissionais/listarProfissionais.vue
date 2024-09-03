<template>
    <v-container>
        <v-dialog v-model="store.state.controladoresTela.showMDeletarProf" max-width="800px" persistent>
            <msgDeletarProfissional />
        </v-dialog>

        <v-dialog v-model="store.state.controladoresTela.msgSaveProf">
            <mensagemSucesso1 :mensagem="'Profissional cadastrado !'" />
        </v-dialog>

        <v-dialog v-model="store.state.controladoresTela.showMEditProf" max-width="600px" persistent>
            <EditarProfissional />
        </v-dialog>
        <v-dialog v-model="store.state.controladoresTela.showSucessoEditProf" max-width="600px" persistent>
            <mensagemSucesso1 :mensagem="'Profissional atualizado !'" />
        </v-dialog>

        <v-dialog v-model="store.state.controladoresTela.showMNewProf" max-width="600px" persistent>
            <CriarProfissional />
        </v-dialog>
        <v-toolbar>
            <v-toolbar-title text="Profissionais" />
            <v-spacer />
            <v-btn @click="showNewProfissional" prepend-icon="mdi-plus-circle" text="Novo" color="create" variant="flat"
                elevation="5" style="border-radius: 5px" />
        </v-toolbar>

        <v-container class="pr-5" v-if="profissionais.totalProfissionais === 0">
            <v-alert type="warning">Nenhum profissional cadastrado no sistema</v-alert>
        </v-container>

        <v-container v-else>
            <v-table class="ma-5">
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            Nome
                        </th>
                        <th class="text-left">
                            Especialidade
                        </th>
                        <th class="text-left">
                            Telefone
                        </th>
                        <th class="text-left">
                            E-mail
                        </th>
                        <th class="text-left">
                            Ações
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in profissionais" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nome }}</td>
                        <td>{{ item.especialidade }}</td>
                        <td>{{ item.telefone }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <v-icon @click="editar(item)" icon="mdi-pencil" />
                            <v-icon @click="deletar(item)" icon="mdi-delete" />
                            <!-- <v-icon @click="deletar(item)" icon="mdi-view-agenda" /> -->
                            <v-icon @click="verAgenda" icon="mdi-view-list" />
                        </td>
                    </tr>
                </tbody>
            </v-table>

        </v-container>
    </v-container>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import CriarProfissional from '@/components/Modais/CriarProfissional.vue';
import EditarProfissional from '@/components/Modais/editarProfissional.vue';
import msgDeletarProfissional from '@/components/Modais/msgDeletarProfissional.vue';
import mensagemSucesso1 from '@/components/Mensagens/mensagemSucesso1.vue';

import { useStore } from 'vuex';
const store = useStore()


const profissionais = computed(() => store.getters.profissionais)


function editar(item) {
    store.dispatch('getProfissionalById', item.id)
    store.dispatch('setShowMEditProf', true)
}

function deletar(item) {
    store.dispatch('setShowMDeletarProf', true)
    store.dispatch('getProfissionalById', item.id)
    console.log(store.state.profissionais.profissional.consultas)
    console.log(store.state.profissionais.profissional.id)
    console.log(item.id)
}

function showNewProfissional() {
    store.dispatch('setShowMNewProf', true);
    console.log(store.state.controladoresTela.showMNewProf)
}

onBeforeMount(async () => {
    await store.dispatch('listarProfissionais');
});


</script>