<template>
    <v-container>
        <v-dialog v-model="store.state.controladoresTela.showMDeletarProf" max-width="600px" persistent>
            <msgDeletarProfissional />
        </v-dialog>

        <v-dialog v-model="store.state.msgSaveProf">
            sucesso ao criar profissional
        </v-dialog>

        <v-dialog v-model="store.state.controladoresTela.showMEditProf" max-width="600px" persistent>
            <EditarProfissional />
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
                            Nome
                        </th>
                        <th class="text-left">
                            Especialidade
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
                        <td>{{ item.nome }}</td>
                        <td>{{ item.especialidade }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <v-icon @click="editar(item)" icon="mdi-pencil" />
                            <v-icon @click="deletar(item)" icon="mdi-delete" />
                            <!-- <v-icon @click="verAgenda" icon="mdi-view-list" /> -->
                        </td>
                    </tr>
                </tbody>
            </v-table>

        </v-container>
    </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import CriarProfissional from '@/components/Modais/CriarProfissional.vue';
import EditarProfissional from '@/components/Modais/editarProfissional.vue';
import msgDeletarProfissional from '@/components/Modais/msgDeletarProfissional.vue';

import { useStore } from 'vuex';
const store = useStore()
const dialog = ref(false);
const dialogNovoProfissional = ref(false)
const dialogDelete = ref(false);
const headers = [
    { title: 'Nome', align: 'start', sortable: false, key: 'nome' },
    { title: 'Especialidade', key: 'especialidade' },
    { title: 'E-mail', key: 'email', sortable: false },
    { title: 'Telefone', key: 'telefone', sortable: false },
    { title: 'Ações', key: 'actions', sortable: false },
];
const profissionalEdit = ref({
    nome: '',
    especialidade: '',
    email: '',
    telefone: '',
})
const profissionais = ref([]);

onBeforeMount(async () => {
    await store.dispatch('listarProfissionais');
    profissionais.value = store.state.profissionais.profissionais;
    console.log(profissionais.value.message)
});

function editar(item) {
    store.dispatch('getProfissionalById', item.id)
    profissionalEdit.value = store.state.profissional
    console.log(profissionalEdit.value)
    store.dispatch('setShowMEditProf', true)
}

function deletar(item) {
    store.dispatch('setShowMDeletarProf', true)
    store.dispatch('getProfissionalById', item.id)
    console.log(item.id)
    store.dispatch('excluirProfissional', item.id)
}

function showNewProfissional() {
    store.dispatch('setShowMNewProf', true);
    console.log(store.state.controladoresTela.showMNewProf)
}

</script>