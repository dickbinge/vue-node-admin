<template>
  <div class="dnd-list-page">
    <p class="info-content">
      这是一个可进行拖拽的列表
    </p>
    <dnd-list
      :listLeft="listLeft"
      :listRight="listRight"
    />
  </div>
</template>
<script>
import dndList from '@/components/dndList';

export default {
  name: 'dndListDemo',
  components: {
    dndList,
  },
  data() {
    return {
      listLeft: [],
      listRight: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get('/work/article').then(({ data }) => {
        debugger;
        console.log(data);
        this.listLeft = data.data || [];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dnd-list-page {
  padding: 15px;
}
</style>
