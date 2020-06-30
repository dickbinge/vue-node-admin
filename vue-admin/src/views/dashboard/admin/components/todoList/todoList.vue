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
            @deleteTodo="deleteTodo"/>
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
export default {
  name: 'todoList',
  components: {
    todo,
  },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : `${w}s`),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1),
  },
  data() {
    return {
      todoList: [],
      visibility: 'all',
      filters,
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
  created() {
    this.getTodoData();
  },
  methods: {
    getTodoData() {
      this.$http.post('/work/todoList').then(({ data }) => {
        this.todoList = data.data;
      }).catch();
    },
    deleteTodo(todo) {
      const params = {
        id: todo._id,
      };
      this.$confirm('请确认是否删除当前任务！', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.delete(`/work/todo?id=${params.id}`).then(({ data }) => {
          if (data.code === 0) {
            this.getTodoData();
            this.$message.success('删除成功！');
          }
        });
      });
    },
    updateTodo(todo) {
      console.log(todo);
      const id = todo._id;
      this.$http.put(`/work/todo?id=${id}`, {
        text: todo.text,
      }).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success('修改成功！');
        }
      }).catch();
    },
    addTodo(e) {
      const text = e.target.value;
      if (text.trim()) {
        this.$http.post('/work/todo', {
          text,
          done: false,
        }).then(({ data }) => {
          if (data.code === 0) {
            this.$message.success('保存成功');
            this.getTodoData();
          }
        });
      }
      e.target.value = '';
    },
    toggleTodo(val) {
      val.done = !val.done;
      this.updateTodo(val);
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
