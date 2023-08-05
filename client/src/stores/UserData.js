import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserDataStore = defineStore('userData', () => {
    const id = ref('')
    const username = ref('');
    const email = ref('');
    const tasks = ref([]);
  
    return { id, username, email, tasks }
  })
  