<template>
    <v-sheet>
        <v-container>
            <v-row>
                <!-- Verifica se há consultas -->
                <v-col cols="12" v-if="!consultas.consultas || consultas.consultas.length === 0">
                    <v-alert type="info" text>
                        Nenhuma consulta encontrada.
                    </v-alert>
                </v-col>

                <!-- Renderiza as consultas quando existirem -->
                <v-col v-else v-for="(consulta, index) in consultas.consultas" :key="index" cols="12" md="4">
                    <v-card class="pa-5">
                        <v-card-text>
                            <!-- <strong>Data:</strong> {{ formatarData(consulta.data) }}<br /> -->
                            <strong>Data:</strong> {{ formatarDataHora(consulta.data) }}<br />
                            <strong>Hora:</strong> {{ formatarHora(consulta.data) }}<br />
                            <strong>Paciente:</strong> {{ consulta.Paciente.nome }}
                        </v-card-text>
                        <v-card-actions v-if="consulta.respostas">
                            <v-spacer />
                            <v-btn variant="flat" @click="abrirModal(consulta)" color="#007BFF">Ver mais</v-btn>
                        </v-card-actions>

                        <v-dialog v-model="modal_respostas" max-width="1800px" persistent>
                            <v-sheet>
                                <v-card-title>Respostas</v-card-title>
                                <v-card-text>
                                    <template v-if="consulta && consulta.respostas">
                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>

                                                    
                                                    <v-list-item-title><strong>Paciente:</strong>
                                                        {{ consulta.Paciente.nome }}

                                                        </v-list-item-title>

                                                    <v-list-item-title><strong>Estudante de:</strong>
                                                        {{ JSON.parse(consulta.respostas)["Estudante de"] }}
                                                    </v-list-item-title>
                                                    <v-list-item-title><strong>Curso:</strong> {{
                                                        JSON.parse(consulta.respostas)["Curso"] }}</v-list-item-title>
                                                    <v-list-item-title><strong>Centro:</strong> {{
                                                        JSON.parse(consulta.respostas)["Centro"] }}</v-list-item-title>
                                                    <v-list-item-title><strong>Se mudou para estudar na UFES?</strong>
                                                        {{ JSON.parse(consulta.respostas)["Se mudou para estudar na UFES?"] }}
                                                    </v-list-item-title>
                                                    <v-list-item-title><strong>Com quem você reside em Alegre?</strong>
                                                        {{ JSON.parse(consulta.respostas)["com quem você reside em Alegre?"] }}
                                                    </v-list-item-title>
                                                    <v-list-item-title><strong>Motivos para o atendimento:</strong> {{
                                                        JSON.parse(consulta.respostas)["Motivos para o atendimento"] }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>

                                            <!-- Respostas Confidenciais -->
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title><strong>Respostas Confidenciais:</strong></v-list-item-title>
                                                    <template v-if="JSON.parse(consulta.respostas)['Respostas Confidencias']">
                                                        <v-list dense>
                                                            <v-list-item-group>
                                                                <v-list-item
                                                                    v-for="(value, key) in JSON.parse(consulta.respostas)['Respostas Confidencias']"
                                                                    :key="key">
                                                                    <v-list-item-content>
                                                                        <v-list-item-title><strong>{{ key }}:</strong>
                                                                            {{ value }}</v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                            </v-list-item-group>
                                                        </v-list>
                                                    </template>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </template>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn variant="flat" color="create" @click="exportarParaExcel(consulta)">Gerar CSV (Excel)</v-btn>
                                    <v-btn @click="fecharModal()" variant="flat"  color="#FF6B6B">Fechar</v-btn>
                                </v-card-actions>
                            </v-sheet>
                        </v-dialog>

                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import { formatarDataHora } from '@/services/date';
import ExcelJS from 'exceljs';

const store = useStore();

// Computed para pegar as consultas diretamente do Vuex
const consultas = computed(() => store.getters.consultasProfissional || []);

const modal_respostas = ref(false);
const consultaSelecionada = ref(null);

function abrirModal(consulta) {
    consultaSelecionada.value = consulta; // Armazena a consulta selecionada
    modal_respostas.value = true;
}

function fecharModal() {
    modal_respostas.value = false;
}

// Função para formatar a data (dd/mm/aaaa)
const formatarData = (dataIso) => {
    const data = new Date(dataIso);
    return data.toLocaleDateString('pt-BR'); // formato: dia/mês/ano
};

// Função para formatar a hora (hh:mm)
const formatarHora = (dataIso) => {
    const data = new Date(dataIso);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Função para exportar para Excel
function exportarParaExcel(consulta) {
    if (consulta && consulta.respostas) {
        const respostas = JSON.parse(consulta.respostas);
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Respostas');

        worksheet.addRow(['Pergunta', 'Resposta']);
   
        worksheet.addRow(['Estudante de', respostas['Estudante de']]);
        worksheet.addRow(['Curso', respostas['Curso']]);
        worksheet.addRow(['Centro', respostas['Centro']]);
        worksheet.addRow(['Se mudou para estudar na UFES?', respostas['Se mudou para estudar na UFES?']]);
        worksheet.addRow(['Com quem você reside em Alegre?', respostas['com quem você reside em Alegre?']]);
        worksheet.addRow(['Motivos para o atendimento', respostas['Motivos para o atendimento']]);

        if (respostas['Respostas Confidencias']) {
            for (const [key, value] of Object.entries(respostas['Respostas Confidencias'])) {
                worksheet.addRow([key, value]);
            }
        }

        // Ajusta a largura das colunas



// Ajusta a largura das colunas
worksheet.columns.forEach((column, index) => {
    if (index === 0) {
        column.width = 140; // Define a largura da primeira coluna como 140
    } else if (index === 1) {
        column.width = 32; // Define a largura da segunda coluna como 32
    } else {
        const maxLength = Math.max(
            column.header ? column.header.length : 0, // Tamanho do cabeçalho
            ...column.values.map(v => (v ? v.toString().length : 0)) // Tamanho dos valores
        );

        column.width = maxLength + 2; // Adiciona um pouco de espaço extra
    }
});



        // Exporta a planilha
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `respostas_${consulta.Paciente.nome}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    } else {
        alert('Não há dados para exportar.');
    }
}

onBeforeMount(async () => {
    try {
        const profissionalId = localStorage.getItem('profissionalId');

        if (!profissionalId) {
            throw new Error('ID do profissional não encontrado no localStorage');
        }

        // Dispatch com o ID recuperado
        await store.dispatch('getConsultaProfissional', profissionalId);

        console.log('consultas dentro do componente:', consultas.value);
    } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
    }
});
</script>

<style scoped>
.v-card {
    border: 1px solid #ccc;
}
</style>