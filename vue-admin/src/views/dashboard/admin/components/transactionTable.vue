<template>
  <div class="transaction-table">
    <el-table
      :height="height"
      :data="tableData"
      border
      style="width: 100%;" @sort-change="handlerSortChange">
      <el-table-column label="编号"  prop="code"/>
      <el-table-column label="姓名"  prop="name"/>
      <el-table-column label="产地"  prop="make"/>
      <el-table-column label="单价(￥)"  prop="price" sortable="custom"/>
      <el-table-column label="甜度"  prop="sweetness"/>
      <el-table-column label="采摘日期" prop="pickTime"/>
    </el-table>
    <el-pagination
      background
      v-if="device !== 'mobile'"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'transactionTable',
  filters: {
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      tableData: [],
      height: 480,
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      sort: {},
    };
  },
  computed: {
    ...mapGetters(['device']),
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sort: this.sort,
      };
      this.$http.post('/goods/goodslist', params).then(({ data }) => {
        this.tableData = data.data || [];
        this.totalCount = data.totalCount;
      }).catch();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableData();
    },
    handlerSortChange({ prop, order }) {
      const orderNum = order === 'ascending' ? 1 : -1;
      this.sort[prop] = orderNum;
      this.getTableData();
    },
  },
};
</script>
<style scoped>
.transaction-table {
  background-color: #fff;
  overflow: hidden;
  position: relative;
  height: 100%;
}
.transaction-table .pagination {
  width: 500px;
  position: absolute;
  right: 10px;
  bottom: 15px;
}
</style>
