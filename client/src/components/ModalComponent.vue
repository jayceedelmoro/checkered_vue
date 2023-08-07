<script setup>
    import { defineProps } from 'vue';
    import { CloseCircleOutline } from '@vicons/ionicons5';
    import { Icon } from '@vicons/utils'

    const props = defineProps(['modalToggle']);

    const hideModal = (event) => {
        let modalContainer = document.querySelector('.modal-container');
        let modalClose = document.querySelector('.modal-close');
        
        if (modalContainer !== undefined) {
            if (!modalContainer.contains(event.target) || modalClose.contains(event.target)){
                props.modalToggle();
            }
        }
    }

</script>

<template>
    <div class="modal-overlay" @click="hideModal">
        <div class="modal-container">
            <div className='modal-close' @click="hideModal">
                <Icon>
                    <CloseCircleOutline />
                </Icon>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .modal-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100%;
        height: 100%;
        background: #24232350;
        top: 0;
        left: 0;
        z-index: 99;
    }

    .modal-container {
            position: relative;
            min-width: 30%;
            min-height: 35%;
            background: #FFF;
            text-align: left;
            border-radius: 10px;
            padding: 30px 50px;
        }

    .modal-close {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 25px;
        height: 25px;
        font-size: 31px;
        background: #FFF;
        border-radius: 50%;
        top: -10px;
        right: -10px;
        cursor: pointer;
    }
</style>