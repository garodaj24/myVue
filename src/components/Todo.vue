<template>
    <div class="todo">
        <input @change="completeTodo" type="checkbox" id="checkbox" v-model="checked">

        <div class="todoInfo">
            <input v-if="edit" type="text" v-model="clonedTodo.name" />
            <div v-else>{{clonedTodo.name}}</div>
            <div>{{clonedTodo.created_at.split("T")[0] + " " + clonedTodo.created_at.split("T")[1].split(".")[0]}}</div>
        </div>

        <template v-if="edit">
            <categoryDropdown @selectCategories="selectTodoCategories" :todo="this.todo"/>
        </template>
        <template v-else>
            <div class="todoCategories" v-for="(category, index) in todo.categories" :key="index">{{category.name}}</div>
        </template>

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
import CategoryDropdown from '@/components/CategoryDropdown.vue';
import _ from 'lodash';

export default {
    name: "Todo",
    components: {
        CategoryDropdown
    },
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
            categoriesList: []
        }
    },
    methods: {
        editTodo(status) {
            this.edit = status;
        },
        saveTodo() {
            this.editTodo(false);
            console.log(this.categoriesList, "list");
            this.$store.dispatch("todo/updateTodo", {
                id: this.clonedTodo.id,
                newTodoName: this.clonedTodo.name,
                categories: this.categoriesList
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
        },
        selectTodoCategories(category, prevSelected) {
            if (this.categoriesList.includes(category.id)) {
                let i = this.categoriesList.indexOf(category.id);
                if(i >= 0) {
                    if (!prevSelected) {
                        this.categoriesList.splice(i,1);
                    }
                }
            } else {
                this.categoriesList.push(category.id);
            }
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