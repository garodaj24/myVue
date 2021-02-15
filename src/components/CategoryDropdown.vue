<template>
  <div @click="toggleDropdown" class="dropdown">
      Select Categories
    <div v-if="dropdownOpen" class="dropdown-content">
        <div v-for="(category) in categories" @click.stop :key="category.id">
            <input @change="selectCategories(category)" type="checkbox" id="checkbox" v-model="category.selected"> {{category.name}}
        </div>
    </div>
  </div>
  <div v-if="dropdownOpen" class="dropdownBackgroundClose" @click="toggleDropdown"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "CategoryDropdown",
  props: {
    todo: {
      type: Object,
      description: "todo data",
    }
  },
  emits: ["selectCategories"],
  data() {
      return {
          dropdownOpen: false,
      }
  },
  watch: {
    "categories": function() {
        if (this.todo) {
            this.todo.categories.forEach(todoCategory => {
                    this.categories.forEach(category => {
                        if (todoCategory.id === category.id) {
                            category.selected = true;
                            this.$emit('selectCategories', category, true);
                        }
                    });
                });
        }
    }
  },
  computed: {
    ...mapGetters({
      categories: 'todo/getCategoriesList',
    })
  },
  methods: {
    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    },
    selectCategories(category) {
        this.$emit('selectCategories', category);
    }
  },
  created() {
      this.$store.dispatch('todo/getAllCategories');
  }
};
</script>
