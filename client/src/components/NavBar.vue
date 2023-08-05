<script setup>

    import { useUserDataStore } from '@/stores/userData';
    const data = useUserDataStore();

</script>

<template>
    <div class="navbar-container">
        <img
            src=""
            alt="logo"
            class="logo"
        >
        <p class="username"> {{ data.username }}</p>
    </div>
</template>

<style scoped>
    .navbar-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: var(--main-color);
        padding: 20px;
    }

    .navbar-container > * {
        width: 100%;;
    }

    .username {
        color: var(--white);
        font-size: 20px;
        text-transform: uppercase;
        text-align: right;
        margin: 0;
    }
</style>