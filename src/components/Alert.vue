<template>
    <div>
        <v-alert density="compact" :type="props.type" :title="props.title" :text="props.text"
            :variant="props.variant"></v-alert>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    density: String,
    variant: String,
    type: String,
    title: String,
    text: String,
});
</script>