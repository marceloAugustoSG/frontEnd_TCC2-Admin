<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Gerar Relatórios</v-card-title>
          <v-card-text>
            <form>
              <v-row>
                <v-col>
                  <v-text-field v-model="dataInicio" type="date" label="Data de inicio" />
                </v-col>
                <v-col>
                  <v-text-field v-model="dataFim" type="date" label="Data de fim" />
                </v-col>
              </v-row>
            </form>
          </v-card-text>
          <v-card-actions class="pa-5">
            <span>Data de início: {{ dataInicio }}</span> <v-spacer /><span>Data de fim: {{ dataFim }}</span>
            <v-spacer />
            <v-btn @click="gerarRelatorio(dataInicio, dataFim)" prepend-icon="mdi-file" variant="tonal">Gerar
              Relatório</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Adicione a exibição do relatório ou uma tabela aqui -->
  </v-container>
</template>
  
<script setup>
import { ref } from 'vue';

const dataInicio = ref('')
const dataFim = ref('')

function gerarRelatorio(dataIni, dataFim) {
  alert(`${dataIni} || ${dataFim}`)

}
</script>
  
  