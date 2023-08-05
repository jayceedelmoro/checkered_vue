<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    import { useUserDataStore } from '../stores/UserData';


    const data = useUserDataStore();

    const taskList = ref([])

//fetch user tasks and save it UserData store (variable)
    axios.get(`${ import.meta.env.VITE_SITE_LINK }/api/v1/users/${ localStorage.getItem('userId') }/tasks`).then((dbResponse) => {
        data.tasks = dbResponse.data.tasksList;
        taskList.value = data.tasks;
    });

    const completeHandler = (taskId) => {
        axios.put(`${ import.meta.env.VITE_SITE_LINK }/api/v1/tasks/${ taskId }`, {'isComplete': event.target.checked }).then(() => {
            axios.get(`${ import.meta.env.VITE_SITE_LINK }/api/v1/users/${ localStorage.getItem('userId') }/tasks`).then((dbResponse) => {
                data.tasks = dbResponse.data.tasksList;
                taskList.value = data.tasks;

                toast.success('Task Updated', {
                    autoClose: 1000,
                });
            });
        });
    }

</script>

<template>
    <div class="container">
        <div class='title'>
            <h3>
                <slot name="title"></slot>
            </h3>
        </div>

        <div class='task-list'>
            <div v-for="task in taskList" class="tasks">
                <input
                    type="checkbox"
                    v-model="task.data.isComplete"
                    @change="completeHandler(task.id, $event)"
                >
                <p> {{ task.data.name }} </p>
                <p> {{ task.data.description }} </p>
                <button class="edit-btn"> Edit </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .container {
        height: 45vh;
        background: var(--white);
        border-radius: 5px;
        box-shadow: 0 0 10px #D3D3D3;
        padding: 20px;
        margin: 30px 0;
        overflow-y: auto;
    }

    h3 {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
    }

    .task-list {
        margin: 0 20px;
    }

    .tasks {
        display: flex;
        align-items: center;
        background: #D3D3D3;
        border-radius: 5px;
        box-shadow: 0 0 5px #D3D3D3;
        padding: 10px;
        margin: 2px 0;
    }

    .tasks input {
        margin-right: 10px;
    }

    .tasks p {
        width: 100%;
        text-overflow: ellipsis;
    }

    .edit-btn {
        padding: 5px;
    }
</style>