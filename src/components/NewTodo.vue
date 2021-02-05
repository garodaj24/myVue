<template>
    <div class="newTodo">
        <div class="newTodoContent">
            New Todo <br />
            <input class="newTodoInput" type="text" v-model="newTodo" />
        </div>
        <button @click="saveTodo" class="newTodoSave">Save</button>
    </div>
</template>

<script>

export default {
    name: "newTodo",
    data() {
        return {
            newTodo: "",
        }
    },
    methods: {
        saveTodo() {
            if (this.newTodo.trim() !== "") {
                this.$store.dispatch('todo/addNewTodo', {
                    name: this.newTodo
                });
                this.newTodo = "";
            }
        }
    },
};
</script>