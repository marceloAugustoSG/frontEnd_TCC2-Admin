<template>
    <Bar :data="data" :options="options" />
</template>


<script setup>

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


let props = defineProps({
    labels: Array,
    dados: Array,
    colors: Array


})


const data = {
    labels: props.labels,
    datasets: [
    {
      label: 'CEANS',
      data:[50,0,0], // Valores do primeiro conjunto de dados
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'CCENS',
      data:[0,10,0], // Valores do segundo conjunto de dados
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
   
    ]
}

const options = {
    responsive: true,
    maintainAspectRatio: false
}



</script>