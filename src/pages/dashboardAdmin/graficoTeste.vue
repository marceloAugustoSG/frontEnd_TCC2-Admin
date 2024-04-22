<!-- <template>
    <div>
        <canvas ref="myChart" width="800"></canvas>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import { useStore } from 'vuex';

const store = useStore()

const myChart = ref(null);

onMounted(() => {

    const consultaConfirmadas = store.state.consultas.filter(consulta => consulta.status === 'Confirmada').length
    const consultasSolicitadas = store.state.consultas.filter(consulta => consulta.status === 'Solicitada').length;
    const ctx = myChart.value.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Confirmadas', 'Solicitadas', 'Canceladas'],
            datasets: [
                {
                    label: 'Confirmadas',
                    data: [consultaConfirmadas,],
                    backgroundColor: ['rgba(89,152,0.1)',],
                    borderColor: ['rgba(255,152,0.7)',]
                },
            ],
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }

            }
        }
    });
});
</script>
   

  -->
<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useStore } from 'vuex';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useStore()
const consultaConfirmadas = store.state.consultas.filter(consulta => consulta.status === 'Confirmada').length
const consultasSolicitadas = store.state.consultas.filter(consulta => consulta.status === 'Solicitada').length;
const consultasCanceladas = store.state.consultas.filter(consulta => consulta.status === 'Cancelada').length;
const chartData = {
    labels: ['Confirmadas', 'Solicitadas', 'Canceladas'],
    datasets: [
        {
            label: 'Consultas',
            backgroundColor: 'rgb(33,150,243)',
            data: [consultaConfirmadas]
        }, 
        {
            label: 'Solicitadas',
            backgroundColor: 'rgb(20,150,243)',
            data: [consultasSolicitadas]
        }

    ]
}

const chartOptions = {
    responsive: true
}
</script>
  