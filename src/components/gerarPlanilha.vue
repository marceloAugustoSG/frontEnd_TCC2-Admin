// Seu componente Vue
<template>
    <div>
        <v-btn @click="generateExcel" text="Gerar planilha de respostas" variant="tonal" />
    </div>
</template>

<script setup>
import ExcelJS from 'exceljs';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const resposta = ref(store.state.resposta);

const generateExcel = () => {
    if (!resposta.value) {
        console.error('Os dados de resposta não estão disponíveis.');
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Dados');

    // Adicione os campos principais
    Object.entries(resposta.value).forEach(([key, value]) => {
        worksheet.addRow([key, value]);
    });

    // Adicione um espaço entre os dados principais e as respostas confidenciais
    worksheet.addRow([]);

    // Adicione os cabeçalhos das respostas confidenciais
    const headers = Object.keys(resposta.value["Respostas Confidencias"]);
    worksheet.addRow(["Pergunta", "Resposta"]);

    // Adicione as respostas confidenciais ao Excel usando um loop for...in
    for (const pergunta in resposta.value["Respostas Confidencias"]) {
        const respostaConfidencial = resposta.value["Respostas Confidencias"][pergunta];
        worksheet.addRow([pergunta, respostaConfidencial]);
    }

    // Crie um Blob do workbook Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Crie um objeto URL para o Blob
        const url = window.URL.createObjectURL(blob);

        // Crie um link e clique nele para iniciar o download
        const a = document.createElement('a');
        a.href = url;
        // a.download = 'dados.xlsx';
        a.download = `respostas_${store.state.consulta.Paciente.nome}.xlsx`;
        a.click();

        // Libere a URL do objeto Blob
        window.URL.revokeObjectURL(url);
    });
};


</script>
