<template>
    <div class="container mt-4">
        <div class="card shadow-sm">
            <div class="card-body">
                <div v-if="tasks.length" class="mb-4 mt-2">
                    <div class="progress">
                        <div
                            class="progress-bar"
                            role="progressbar"
                            :style="{ width: completionRate + '%' }"
                            :aria-valuenow="completionRate"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {{ completionRate }}% Completed
                        </div>
                    </div>
                </div>

                <div class="btn-group mb-4">
                    <button
                        class="btn"
                        :class="
                            filter === 'all'
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        "
                        @click="filter = 'all'"
                    >
                        All
                    </button>
                    <button
                        class="btn"
                        :class="
                            filter === 'completed'
                                ? 'btn-success'
                                : 'btn-outline-success'
                        "
                        @click="filter = 'completed'"
                    >
                        Completed
                    </button>
                    <button
                        class="btn"
                        :class="
                            filter === 'incomplete'
                                ? 'btn-warning'
                                : 'btn-outline-warning'
                        "
                        @click="filter = 'incomplete'"
                    >
                        Incomplete
                    </button>
                </div>

                <h3 class="card-title text-center mb-4">Todo List</h3>
                <form @submit.prevent="addTask" class="mb-4">
                    <div class="row mb-3">
                        <div class="col">
                            <input
                                v-model="newTask.title"
                                type="text"
                                class="form-control"
                                placeholder="Task Title"
                                required
                            />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <textarea
                                v-model="newTask.description"
                                class="form-control"
                                placeholder="Task Description"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <input
                                v-model="newTask.due_date"
                                type="date"
                                class="form-control"
                                placeholder="Due Date"
                            />
                        </div>
                    </div>
                    <div class="text-end">
                        <button class="btn btn-primary" type="submit">Add Task</button>
                    </div>
                </form>
                <div v-if="tasks.length">
                    <ul class="list-group">
                        <li
                            v-for="task in filteredTasks"
                            :key="task.id"
                            class="list-group-item"
                        >
                            <div class="d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">
                                        <input
                                            type="checkbox"
                                            class="form-check-input me-2"
                                            :checked="task.completed == 1"
                                            @change="toggleComplete(task)"
                                        />
                                        <span
                                            :class="{
                                                'text-decoration-line-through': task.completed,
                                                'text-muted': task.completed
                                            }"
                                        >
                                            {{ task.title }}
                                        </span>
                                    </div>
                                    <small class="text-muted" v-if="task.description">
                                        {{ task.description }}
                                    </small>
                                    <div v-if="task.due_date">
                                        <small
                                            :class="{
                                                'text-danger': isOverdue(task),
                                                'text-success': !isOverdue(task)
                                            }"
                                        >
                                            Due: {{ formatDate(task.due_date) }}
                                        </small>
                                    </div>
                                </div>
                                <button
                                    @click="deleteTask(task)"
                                    class="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else class="text-center text-muted">
                    No tasks yet. Add a new task to get started!
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const newTask = ref({
    title: "",
    description: "",
});

const tasks = ref([]);

const filter = ref("all");

const filteredTasks = computed(() => {
    if (filter.value === "all") return tasks.value;
    if (filter.value === "completed")
        return tasks.value.filter((task) => task.completed);
    if (filter.value === "incomplete")
        return tasks.value.filter((task) => !task.completed);
    return tasks.value;
});

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};


const isOverdue = (task) => {
    if (!task.due_date || task.completed) return false;
    const today = new Date();
    const dueDate = new Date(task.due_date);

    // Normalize time to midnight to compare dates only
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    return today > dueDate;
};


const completionRate = computed(() => {
    if (!tasks.value.length) return 0;
    const completedTasks = tasks.value.filter((task) => task.completed).length;
    return Math.round((completedTasks / tasks.value.length) * 100);
});

const fetchTasks = () => {
    axios.get("/tasks").then((response) => {
        tasks.value = response.data.data;
    });
};

onMounted(() => {
    fetchTasks();
});

const addTask = () => {
    if (!newTask.value.title.trim()) return;
    axios.post("/tasks", newTask.value).then(() => {
        newTask.value = { title: "", description: "" };
        fetchTasks();
    });
};

const toggleComplete = (task) => {
    let completed = task.completed ? 0 : 1;
    axios.patch(`/tasks/${task.id}`, { completed: completed }).then(() => {
        fetchTasks();
    });
};

const deleteTask = (task) => {
    axios.delete(`/tasks/${task.id}`).then(() => {
        fetchTasks();
    });
};
</script>

<style scoped>
.text-decoration-line-through {
    text-decoration: line-through;
}
</style>
