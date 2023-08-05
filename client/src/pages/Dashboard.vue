<script setup>
import { useUserDataStore } from '@/stores/userData.js';
import { ref } from 'vue';
import axios from 'axios';

import NavBar from '../components/NavBar.vue'
import TaskComponent from '../components/TaskComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';

const data = useUserDataStore();

const isModalOpen = ref(true);

//fetch user data and save it UserData store (variable)
axios.get(`${ import.meta.env.VITE_SITE_LINK }/api/v1/users/${ localStorage.getItem('userId') }`).then((dbResponse) => {
    data.username = dbResponse.data.user.username;
    data.email = dbResponse.data.user.email;
});

</script>

<template>
    <NavBar />

    <div class="dashboard-container">
        <div class="controls">

        </div>

        <!-- In Progress Tasks -->
        <TaskComponent>
            <template #title> In Progress </template>
        </TaskComponent>

        <!-- In Completed -->
        <TaskComponent>
            <template #title> Completed </template>
        </TaskComponent>
    </div>

    <ModalComponent
        v-if="isModalOpen"
        :isModalOpen="isModalOpen"
    />
</template>

<style scoped>
    .dashboard-container {
        height: 100%;
        background: #F9F9F9;
        padding: 50px 100px;
        margin: auto;
    }
</style>