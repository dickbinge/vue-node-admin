<template>
  <div class="admin-container">
    <github-corner style="position:absolute; top: 0px; right: 0px;" :href="gitHref"/>
  <panel-group :panel-list="panelList"  @set-data="setLineData" />
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px;">
      <line-chart :chart-data="lineChartData" :xAxisLabel="chartAxisLabel"/>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart :chart-data="randdarData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart :chart-data="barData" :xAxisLabel="chartAxisLabel"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 540px">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" class="box-content">
        <transaction-table :table-data="tableData" :table-column="tableColumn" />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" class="box-content">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span:6}" :xl="{span:6}" class="box-content">
        <box-card :header-img="boxHeaderImg" :avatar="avatar" :mallki-text="mallkiText" :progress-list="progressList"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import githubCorner from '@/components/githubCorner';
import panelGroup from './components/panelGroup';
import lineChart from './components/lineChart';
import raddarChart from './components/raddarChart';
import pieChart from './components/pieChart';
import barChart from './components/barChart';
import transactionTable from './components/transactionTable';
import todoList from './components/todoList/todoList';
import boxCard from './components/boxCard';

export default {
  name: 'adminDashboard',
  components: {
    githubCorner,
    panelGroup,
    lineChart,
    raddarChart,
    pieChart,
    barChart,
    transactionTable,
    todoList,
    boxCard,
  },
  data() {
    return {
      gitHref: 'https://github.com/PanJiaChen/vue-element-admin',
      shoppingList: [],
      lineChartData: {},
      chartAxisLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      randdarData: [],
      pieData: [],
      barData: [],
      tableData: [],
      tableColumn: [],
      boxHeaderImg: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      mallkiText: 'Vue学习',
      progressList: [
        {
          text: 'JavaScript学习',
          precentage: 80,
        },
        {
          text: 'ElementUI',
          precentage: 80,
        },
        {
          text: 'vuex学习',
          precentage: 80,
        },
        {
          text: 'JavaScript学习',
          precentage: 80,
        },
        {
          text: 'ElementUI',
          precentage: 80,
        },
        {
          text: 'vuex学习',
          precentage: 80,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['avatar']),
    panelList() {
      return this.shoppingList.map(item => ({
        code: item.code,
        value: item.actualData.reduce((prev, next) => prev + next, 0),
        iconType: item.iconType,
        iconClass: item.iconClass,
        text: item.text,
      }));
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.getBugetList();
      this.getShoppingList();
      this.getPieChartData();
      this.getBarChartData();
    },
    getBugetList() {
      this.$http.get('/shopping/bugetList').then(({ data }) => {
        this.randdarData = data.data;
      }).catch();
    },
    getShoppingList() {
      this.$http.get('/shopping/infoList').then(({ data }) => {
        this.shoppingList = data.data;
        this.setLineData('newVisitis');
      }).catch();
    },
    getPieChartData() {
      this.$http.get('/shopping/industrial').then(({ data }) => {
        this.pieData = data.data;
      }).catch();
    },
    getBarChartData() {
      this.$http.get('/shopping/consumption').then(({ data }) => {
        this.barData = data.data;
      }).catch();
    },
    setLineData(code) {
      this.lineChartData = this.shoppingList.find(item => item.code === code);
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .box-content {
    height: 100%;
  }
}
</style>
