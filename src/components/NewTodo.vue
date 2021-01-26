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
                })
                this.newTodo = ""
            }
        }
    },
};
</script>

<style scoped>
    .newTodo {
        width: 63%;
        margin: auto;
        margin-top: 100px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px 0;
        position: relative;
    }
    .newTodoContent {
        width: 100%;
        margin-right: 20px;
    }
    .newTodoInput {
        width: 100%;
        height: 25px;
    }
    .newTodoSave {
        align-self: flex-end;
        height: 30px;
    }
</style>