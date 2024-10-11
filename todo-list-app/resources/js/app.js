require('./bootstrap');
import { createApp } from 'vue';
import TodoList from './components/TodoList.vue';

createApp({
    components: { TodoList }
}).mount('#app');
