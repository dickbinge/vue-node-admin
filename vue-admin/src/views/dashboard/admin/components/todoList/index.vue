<template>
  <section class="todo-app">
    <header class="header">
      <input class="new-to" autocomplete="off" placeholder="todo list" @keyup.enter="addTodo">
    </header>
    <section v-show="todoList.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"/>
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @delteTodo="deleteTodo"/>
      </ul>
    </section>
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item')}} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key}" @click.prevent="visibility = key"> {{ key | capitalize }}</a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script>
import todo from './todo';

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done),
};
const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true },
];
export default {
  name: 'todoList',
  components: {
    todo,
  },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : `${w}s`),
    capitalize: s => s.chartAt(0).toUpperCase() + s.slice(1),
  },
  data() {
    return {
      visibility: 'all',
      filters,
      todos: defalutList,
    };
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility(this.todos)];
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length;
    },
  },
  methods: {
    updateTodo(todo) {
      console.log(todo);
    },
    addTodo(e) {
      const text = e.target.value;
      if (text.trim()) {
        this.todos.push({
          text,
          done: false,
        });
      }
      e.target.value = '';
    },
    toggleTodo(val) {
      val.done = !val.done;
      this.updateTodo(val);
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    editTodo({ todo, value }) {
      todo.text = value;
      this.updateTodo(todo);
    },
    // 移除已完成项目
    clearCompleted() {
      this.todos = this.todos.filters(todo => !todo.done);
    },
    toggleAll({ done }) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
  },
};
</script>
<style lang="scss">
  @import './index.scss';
</style>
