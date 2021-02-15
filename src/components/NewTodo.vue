<template>
    <div class="newTodo">
        <div class="newTodoContent">
            New Todo <br />
            <input class="newTodoInput" type="text" v-model="newTodo" />
        </div>
        <categoryDropdown @selectCategories="selectTodoCategories"/>
        <button @click="saveTodo" class="newTodoSave">Save</button>
    </div>
</template>

<script>
import CategoryDropdown from '@/components/CategoryDropdown.vue';

export default {
    name: "newTodo",
    components: {
        CategoryDropdown
    },
    data() {
        return {
            newTodo: "",
            newTodoCategory: "",
            categoriesList: []
        }
    },
    methods: {
        saveTodo() {
            if (this.newTodo.trim() !== "") {
                this.$store.dispatch('todo/addNewTodo', {
                    name: this.newTodo,
                    categories: this.categoriesList
                });
                this.newTodo = "";
            }
        },
        selectTodoCategories(category) {
            if (this.categoriesList.includes(category.id)) {
                let i = this.categoriesList.indexOf(category.id);
                if(i >= 0) {
                    this.categoriesList.splice(i,1);
                }
            } else {
                this.categoriesList.push(category.id);
            }
        }
    },
};
</script>