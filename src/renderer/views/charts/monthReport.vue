<template>
  <div>
    <pagination-table v-model="formInline" v-show="!chart">
      <template v-slot:search>
        <el-form :inline="true" v-model="formInline.form">
          <el-form-item label="统计方式">
            <el-select v-model="formInline.form.group" placeholder="请选择">
              <el-option label="按年" value="year"></el-option>
              <el-option label="按月" value="month"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询日期">
            <el-date-picker
              v-model="formInline.form.operateDate"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <export-excel filename="测试" methodname="getEntryGoodsList" :form="formInline.form"></export-excel>
            <el-button type="primary" @click="showChart(true)">显示图表</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template>
        <el-table
          :data="formInline.data"
          :height="height"
          style="width: 100%">
          <el-table-column label="销售日期" prop="time" fit></el-table-column>
          <el-table-column label="总金额" prop="totalMoney"></el-table-column>
          <el-table-column label="实收金额" prop="paid"></el-table-column>
          <el-table-column label="找零" prop="changes"></el-table-column>
        </el-table>
      </template>
    </pagination-table>
    <div v-show="chart">
      <el-form :inline="true" v-model="formInline.form">
        <el-form-item label="查询日期">
          <el-date-picker
            v-model="formInline.form.operateDate"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="showChart(false)">隐藏图表</el-button>
        </el-form-item>
      </el-form>
      <mg-pie-charts :data="data" text="销售统计图"></mg-pie-charts>
    </div>
  </div>
</template>

<script>
  import MgPieCharts from '@/components/Charts/MgPieCharts'
  import ExportExcel from '@/components/Excel/ExportExcel'
  import { getOptions } from '@/api/classification'
  import PagedList from '@/utils/pageList'
  import PaginationTable from '@/components/Table/PaginationTable'
  import Cascader from '@/components/Cascader/index'
  import { clientResize } from '@/mixins/getClientResize'
  import { common } from '@/api/common'

  export default {
    name: 'index',
    components: { MgPieCharts, ExportExcel, PaginationTable, Cascader },
    mounted() {
      this.onSubmit()
      this.getOptions()
    },
    mixins: [clientResize],
    watch: {
      'formInline'(value) {
        console.log(value, '=========')
      }
    },
    data() {
      return {
        data: [],
        formInline: new PagedList('/sell/monthReport', 9999, { operateDate: new Date() }),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8,
        options: [],
        time: '',
        chart: false,
        form: {
        }
      }
    },
    methods: {
      onSubmit() {
        this.formInline.search()
      },
      getOptions() {
        getOptions().then(response => {
          this.options = response.data
        })
      },
      showChart(val) {
        this.chart = val
        if (this.chart) {
          this.search()
        }
      },
      search() {
        const _this = this
        common('/sell/getPieChart', this.formInline.form).then(response => {
          _this.data = response.data.list
        })
      }
    }

  }
</script>

<style scoped>

</style>