<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class=" mx-auto" style="width: auto;">
                    <v-table color="primary" fixed-header height="300px">
                        <thead>
                            <tr>
                                <th class="text-left">Paciente</th>
                                <th class="text-left">Profissional</th>
                                <th class="text-left">Serviço</th>
                                <th class="text-left">Data</th>
                                <th class="text-left">Status</th>
                                <th class="text-left">Data de Solicitação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="consulta in consultasFiltradas" :key="consulta.id">
                                <td>{{ consulta.Paciente.nome }}</td>
                                <td>{{ consulta.Profissional ? consulta.Profissional.nome : 'Não Definido' }}</td>
                                <td>{{ consulta.servico }}</td>
                                <td>{{ consulta.data ? formatDate(consulta.data) : 'Data indefinida' }}</td>
                                <td>{{ consulta.status }}</td>
                                <td>{{ formatDate(consulta.data_solicitacao) }}</td>
                            </tr>
                            <tr>
                                <td>Total de consultas : {{ totalConsultas }}</td>
                            </tr>
                        </tbody>
                    </v-table>

                    <v-card-actions>
                        <v-spacer />
                        <v-btn @click="gerarPDF" variant="tonal" text="Gerar PDF" />
                        <v-btn @click="fechar" variant="tonal" text="Fechar" />
                    </v-card-actions>
                </v-card>


            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { computed } from 'vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useStore } from 'vuex';
import formatDate from '@/services/date';
const store = useStore()

const consultasFiltradas = computed(() => {
    return store.getters.consultasFiltradas;
});

const totalConsultas = computed(() => {
    return consultasFiltradas.value.length;
});

function fechar() {

    store.dispatch('setShowRelatorio', false)

}

const gerarPDF = () => {
    const doc = new jsPDF();
    const tableData = consultasFiltradas.value.map((consulta) => [
        consulta.Paciente.nome,
        consulta.Profissional ? consulta.Profissional.nome : 'Não Definido',
        consulta.servico,
        consulta.data ? formatDate(consulta.data) : '',
        consulta.status,
        consulta.data_solicitacao ? formatDate(consulta.data_solicitacao) : '',
    ]);

    // Adiciona o total de consultas ao rodapé do documento
    doc.text(`Total de Consultas: ${totalConsultas.value}`, 12, 285);

    doc.autoTable({
        head: [['Paciente', 'Profissional', 'Serviço', 'Data', 'Status', 'Data de Solicitação']],
        body: tableData,
    });

    doc.save('relatorio_consultas.pdf');
};
</script>
  
<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table th,
.table td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

.table th {
    background-color: #f2f2f2;
}
</style>
  