<template>
    <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
        <v-btn color="red" @click="logout">Voltar para o login</v-btn>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()

function logout() {
    store.dispatch('logout')
    router.push({ name: 'login' })
}
</script>

<style></style>