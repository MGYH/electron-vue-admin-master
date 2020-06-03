<template>
  <div>
    <pagination-table v-model="formInline" v-show="!chart" :pagination="false">
      <template v-slot:search>
        <el-form :inline="true" v-model="formInline.form">
          <el-form-item label="统计方式">
            <el-select v-model="formInline.form.type" placeholder="请选择" >
              <el-option label="按年" value="year"></el-option>
              <el-option label="按月" value="month"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询日期">
            <el-date-picker
              v-model="monthDate"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              placeholder="选择日期"
              v-if="formInline.form.type === 'month'"
            >
            </el-date-picker>
            <el-date-picker
              v-model="yearDate"
              type="year"
              format="yyyy 年"
              value-format="yyyy"
              placeholder="选择日期"
              v-else-if="formInline.form.type === 'year'"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <export-excel filename="销售统计" methodname="getReport" :form="formInline.form"></export-excel>
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
          <el-table-column label="利润" prop="profit"></el-table-column>
        </el-table>
      </template>
    </pagination-table>
    <div v-show="chart">
      <el-form :inline="true" v-model="formInline.form">
        <el-form-item label="统计方式">
          <el-select v-model="formInline.form.type" placeholder="请选择" >
            <el-option label="按年" value="year"></el-option>
            <el-option label="按月" value="month"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询日期">
          <el-date-picker
            v-model="monthDate"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="选择日期"
            v-if="formInline.form.type === 'month'"
          >
          </el-date-picker>
          <el-date-picker
            v-model="yearDate"
            type="year"
            format="yyyy 年"
            value-format="yyyy"
            placeholder="选择日期"
            v-else-if="formInline.form.type === 'year'"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="showChart(false)">隐藏图表</el-button>
        </el-form-item>
      </el-form>
      <mg-bar-charts :data="chartData" text="销售统计图"></mg-bar-charts>
    </div>
  </div>
</template>

<script>
  import MgBarCharts from '@/components/Charts/MgBarCharts'
  import ExportExcel from '@/components/Excel/ExportExcel'
  import { getOptions } from '@/api/classification'
  import PagedList from '@/utils/pageList'
  import PaginationTable from '@/components/Table/PaginationTable'
  import Cascader from '@/components/Cascader/index'
  import { clientResize } from '@/mixins/getClientResize'
  import { common } from '@/api/common'

  export default {
    name: 'index',
    components: { MgBarCharts, ExportExcel, PaginationTable, Cascader },
    mounted() {
      this.onSubmit()
    },
    mixins: [clientResize],
    data() {
      return {
        data: [],
        chartData: [],
        formInline: new PagedList('/sell/typeReport', 9999, { operateDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1), type: 'month' }),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8,
        options: [],
        monthDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
        yearDate: new Date().getFullYear() + '',
        time: '',
        chart: false,
        form: {
        }
      }
    },
    methods: {
      onSubmit() {
        if (this.formInline.form.type === 'month') {
          this.formInline.form.operateDate = this.monthDate
        } else {
          this.formInline.form.operateDate = this.yearDate
        }
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
        if (this.formInline.form.type === 'month') {
          this.formInline.form.operateDate = this.monthDate
        } else {
          this.formInline.form.operateDate = this.yearDate
        }
        const _this = this
        common('/sell/getBarChart', this.formInline.form).then(response => {
          _this.chartData = response.data.list
        })
      }
    }

  }
</script>

<style scoped>

</style>