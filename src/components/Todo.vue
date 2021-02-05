<template>
    <div class="todo">
      <input @change="completeTodo" type="checkbox" id="checkbox" v-model="checked">

      <div class="todoInfo">
        <input v-if="edit" type="text" v-model="clonedTodo.name" />
        <div v-else>{{clonedTodo.name}}</div>
        <div>{{clonedTodo.created_at.split("T")[0] + " " + clonedTodo.created_at.split("T")[1].split(".")[0]}}</div>
      </div>

      <div v-if="edit" class="todoModify">
        <div @click="saveTodo()">Save</div>
      </div>
      <div v-else class="todoModify">
        <div @click="editTodo(true)">Edit</div>
        <div @click="deleteTodo()">Delete</div>
      </div>
      <div v-if="checked" class="todoChecked"></div>
    </div>
</template>

<script>
import _ from 'lodash';

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
            edit: false,
            clonedTodo: null,
            checked: false,
        }
    },
    methods: {
        editTodo(status) {
            this.edit = status;
        },
        saveTodo() {
            this.editTodo(false);
            this.$store.dispatch("todo/updateTodo", {
                id: this.clonedTodo.id,
                newTodoName: this.clonedTodo.name
            });
        },
        deleteTodo() {
            this.$store.dispatch("todo/deleteTodo", {
                id: this.clonedTodo.id
            });
        },
        completeTodo() {
            this.$store.dispatch("todo/completeTodo", {
                id: this.clonedTodo.id,
                completed: this.checked
            });
        }
    },
    created() {
        this.clonedTodo = _.cloneDeep(this.todo);
        if (this.clonedTodo.completed_at) {
            this.checked = true;
        }
    }
};
</script>