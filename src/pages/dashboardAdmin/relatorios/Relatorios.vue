<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Gerar Relatório</v-card-title>
          <v-card-text>
            <form>
              <v-row>
                <v-col cols="3">
                  <v-text-field v-model="dataInicio" type="date" label="Data de inicio" />
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="dataFim" type="date" label="Data de fim" />
                </v-col>
                <v-col cols="3">
                  <v-select v-model="filtro" label="Filtro"
                    :items="['Atendimento Médico', 'Atendimento Psicológico', 'Todos']" />
                </v-col>
                <v-col cols="3">
                  <v-select v-model="status" label="Status" :items="['Solicitada', 'Confirmada', 'Cancelada']" />
                </v-col>
              </v-row>
            </form>
          </v-card-text>
          <v-card-actions class="pa-5">
            <span>Data de início: {{ dataInicio }}</span> <v-spacer /><span>Data de fim: {{ dataFim }}
              <v-spacer /></span><v-spacer /><span>Filtro:
              {{ filtro }}</span><v-spacer /><span>Status:
              {{ status }}</span>
            <v-spacer />
            <v-btn @click="gerarRelatorio" prepend-icon="mdi-file" variant="tonal">Gerar
              Relatório</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showRelatorio">
      <Relatorio />

    </v-dialog>


    <!-- Adicione a exibição do relatório ou uma tabela aqui -->
  </v-container>
</template>
  
<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Relatorio from '@/components/Relatorio.vue';

const dataInicio = ref('')
const dataFim = ref('')
const filtro = ref('')
const status = ref('')
const showRelatorio = ref(false)

let consultas = computed(() => store.getters.consultasFiltradas)
const store = useStore()

async function gerarRelatorio() {
  showRelatorio.value = true
  await store.dispatch('setDataInit', dataInicio.value)
  await store.dispatch('setDataFim', dataFim.value)
  await store.dispatch('setFiltro', filtro.value)
  await store.dispatch('setStatus', status.value)


  await store.dispatch('gerarRelatorio')


}

</script>
  
  