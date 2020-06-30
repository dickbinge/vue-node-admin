<template>
  <div class="drag-dialog">
    <p class="info-content">
      这里显示一个可以自由拖拽的弹窗
    </p>
    <div class="btn-content" style="padding-left: 15px;">
      <el-button type="text" @click="openDialog">打开Dialog</el-button>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      v-dialogDrag="true"
    >
      <transaction-table :show-pagination="false"/>
    </el-dialog>
  </div>
</template>
<script>
import transactionTable from '../dashboard/admin/components/transactionTable';

export default {
  name: 'dragDialog',
  components: {
    transactionTable,
  },
  data() {
    return {
      dialogVisible: false,
      title: '商品列表',

    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>
