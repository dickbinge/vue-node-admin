<template>
  <div class="dnd-list">
    <div class="dndList-list">
      <h3>{{ list1Title }}</h3>
      <draggable :list="listLeft" :options="{group: 'article'}" class="dragArea">
        <div v-for="item in listLeft" :key="item._id" class="list-complete-item">
          <div class="list-complete-item-handle" :title="item.title">[{{item.author}}]{{item.title}}</div>
          <span class="icon-delete" @click="deleteItem(item)">
            <i class="el-icon-delete"/>
          </span>
        </div>
      </draggable>
    </div>
    <div class="dndList-list">
      <h3>{{ list2Title }}</h3>
      <draggable :list="filterList2" :options="{group: 'article'}" class="dragArea">
        <div v-for="item in filterList2" :key="item._id" class="list-complete-item list-complete-item__rside" @click="pushLeftList(item)">
          <span>[{{item.author}}]{{item.title}}</span>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: 'dndList',
  components: {
    draggable,
  },
  props: {
    listLeft: {
      type: Array,
      default: () => [],
    },
    listRight: {
      type: Array,
      default: () => [],
    },
    list1Title: {
      type: String,
      default: 'listLeft',
    },
    list2Title: {
      type: String,
      default: 'listRight',
    },
  },
  computed: {
    filterList2() {
      return this.listRight.filter(item => this.listLeft.every(({ _id }) => _id !== item._id));
    },
  },
  methods: {
    deleteItem(item) {
      this.listLeft.forEach((ele, index) => {
        if (ele._id === item._id) {
          this.listLeft.splice(index, 1);
        }
      });
      const flag = this.listRight.every(({ _id }) => _id !== item._id);
      if (flag) {
        this.listRight.unshift(item);
      }
    },
    pushLeftList(item) {
      this.listLeft.push(item);
    },
  },
};
</script>
<style lang="scss" scoped>
.dnd-list {
  padding: 15px;
  display: flex;
  .dndList-list {
    width: 48%;
    .dragArea {
      display: flex;
      flex-direction: column;
      padding-right: 20px;
      .list-complete-item {
        display: flex;
        justify-content: space-between;
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        border: 1px solid rgba($color: #000000, $alpha: .15);
        margin-bottom: 5px;
        cursor: pointer;
        .list-complete-item-handle {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .icon-delete {
          color: red;
        }
      }
      .list-complete-item.sortable-chosen {
        background: #4AB7BD;
      }

      .list-complete-item.sortable-ghost {
        background: #30B08F;
      }
      .list-complete-item__rside {
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
