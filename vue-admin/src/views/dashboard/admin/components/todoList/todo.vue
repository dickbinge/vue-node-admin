<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)">
        <label @dblclick="editing = true" v-text="todo.text" />
        <button class="destory" @click="deleteTodo(todo)" />
    </div>
    <input
      v-focus="editing"
      v-show="editing"
      :value="todo.text"
      class="edit-input"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script>
export default {
  name: 'todo',
  props: {
    todo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo);
    },
    editTodo({ todo, value }) {
      this.$emit('editTodo', { todo, value });
    },
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo);
    },
    doneEdit(e) {
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        this.deleteTodo({ todo });
      } else {
        this.editTodo({
          todo,
          value,
        });
        this.editing = false;
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.text;
      this.editing = false;
    },
  },
};
</script>
