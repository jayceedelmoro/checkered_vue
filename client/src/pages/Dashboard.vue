<script setup>
import { useUserDataStore } from '../stores/UserData.js';
import { ref } from 'vue';
import axios from 'axios';

import NavBar from '../components/NavBar.vue'
import TaskComponent from '../components/TaskComponent.vue';
import ModalComponentVue from '../components/ModalComponent.vue';

const data = useUserDataStore();

const isModalOpen = ref(false);

const modalToggle = () => {
    isModalOpen.value = !isModalOpen.value;
}

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
            <div class="add-btn-container">
                <button
                    class="add-task"
                    @click="modalToggle"
                >
                    Add Task
                </button>
            </div>
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

    <ModalComponentVue 
        v-if="isModalOpen"
        :modalToggle="modalToggle"
    />
</template>

<style scoped>
    .dashboard-container {
        height: 100%;
        background: #F9F9F9;
        padding: 50px 100px;
        margin: auto;
    }

    .controls {
        display: flex;
    }

    .controls > * {
        width: 100%;
    }

    .controls .add-btn-container {
        text-align: right;
    }

    .controls button {
        color: var(--white);
        font-size: 18px;
        background: var(--main-color);
        border: none;
        border-radius: 5px;
        padding: 15px 30px;
        transition: all 0.3s ease-out;
    }
</style>