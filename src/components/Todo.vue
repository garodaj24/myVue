<template>
    <div class="todo">
      <input type="checkbox" id="checkbox" v-model="checked">
      <div class="todoInfo">
        <input v-if="edit" type="text" v-model="newTodoName" />
        <div v-else>{{todo.name}}</div>
        <div>{{todo.created_at.split("T")[0] + " " + todo.created_at.split("T")[1].split(".")[0]}}</div>
      </div>
      <div v-if="edit" class="todoModify">
        <div @click="saveTodo(todo.id)">Save</div>
      </div>
      <div v-else class="todoModify">
        <div @click="editTodo">Edit</div>
        <div @click="deleteTodo(todo.id)">Delete</div>
      </div>
      <div v-if="checked" class="todoChecked"></div>
    </div>
</template>

<script>

export default {
    name: "Todo",
    props: {
        todo: {
            type: Object,
            description: 'todo object',
        }
    },
    data() {
        return {
            checked: false,
            edit: false,
            newTodoName: this.todo.name
        }
    },
    methods: {
        editTodo() {
            this.edit = true
        },
        saveTodo(todoId) {
            this.edit = false
            this.$store.dispatch("todo/updateTodo", {
                id: todoId,
                newTodoName: this.newTodoName
            })
        },
        deleteTodo(todoId) {
            this.$store.dispatch("todo/deleteTodo", {
                id: todoId
            })
        }
    },
};
</script>

<style scoped>
    .todo {
        width: 60%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border: 1px solid grey;
        border-radius: 5px;
        padding: 0 20px;
        margin-top: 20px;
        position: relative;
    }
    .todoInfo {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 30px;
    }
    .todoModify {
        display: flex;
        justify-content: space-around;
        width: 100px;
    }
    .todoModify div:hover {
        cursor: pointer;
    }
    .todoChecked {
        position: absolute;
        left: 5%;
        width: 94%;
        border: 2px solid black;
    }
</style>