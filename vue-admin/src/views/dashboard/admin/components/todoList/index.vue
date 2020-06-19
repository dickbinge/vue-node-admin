<template>
  <section class="todo-app">
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="todo list" @keyup.enter="addTodo">
    </header>
    <section v-show="todoList.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"/>
      <ul class="todo-list">
        <el-scrollbar ref="todobar" class="todo-bar">
          <todo
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :todo="todo"
            @toggleTodo="toggleTodo"
            @editTodo="editTodo"
            @delteTodo="deleteTodo"/>
        </el-scrollbar>
      </ul>
    </section>
    <footer v-show="todoList.length" class="footer">
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
  all: todoList => todoList,
  active: todoList => todoList.filter(todo => !todo.done),
  completed: todoList => todoList.filter(todo => todo.done),
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
  { text: 'webpack', done: true },
  { text: 'webpack', done: true },
  { text: 'webpack', done: true },
];
export default {
  name: 'todoList',
  components: {
    todo,
  },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : `${w}s`),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1),
  },
  props: {
    todoData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visibility: 'all',
      filters,
      todoList: defalutList,
    };
  },
  computed: {
    allChecked() {
      return this.todoList.every(todo => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todoList);
    },
    remaining() {
      return this.todoList.filter(todo => !todo.done).length;
    },
  },
  methods: {
    updateTodo(todo) {
      console.log(todo);
    },
    addTodo(e) {
      const text = e.target.value;
      if (text.trim()) {
        this.todoList.push({
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
      this.todoList.splice(this.todoList.indexOf(todo), 1);
    },
    editTodo({ todo, value }) {
      todo.text = value;
      this.updateTodo(todo);
    },
    // 移除已完成项目
    clearCompleted() {
      this.todoList = this.todoList.filters(todo => !todo.done);
    },
    toggleAll({ done }) {
      this.todoList.forEach((todo) => {
        todo.done = done;
      });
    },
  },
};
</script>
<style lang="scss">
  @import './index.scss';
</style>
