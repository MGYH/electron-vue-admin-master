<template>
  <div>
    <pagination-table v-model="formInline" v-show="!chart">
      <template v-slot:search>
        <el-form :inline="true" v-model="formInline.form">
          <el-form-item label="入库编号">
            <el-input v-model="formInline.form.id" placeholder="入库编号"></el-input>
          </el-form-item>
          <el-form-item label="分类名称">
            <cascader
              :options="options"
              v-model="formInline.form.treeString"
            ></cascader>
          </el-form-item>
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="formInline.form.startDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="formInline.form.endDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <export-excel filename="销售明细" methodname="getSellGoodsList" :form="formInline.form"></export-excel>
            <el-button type="primary" @click="showChart(true)">显示图表</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template>
        <el-table
          :data="formInline.data"
          :height="height"
          class="editTable"
          style="width: 100%">
          <el-table-column label="入库条码" prop="entryCode" fit></el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="treeName"></el-table-column>
          <el-table-column label="售价" prop="price"></el-table-column>
          <el-table-column label="进价" prop="purchasePrice"></el-table-column>
          <el-table-column label="数量" prop="num"></el-table-column>
          <el-table-column label="付款方式" prop="payment"></el-table-column>
          <el-table-column label="总金额" prop="totalMoney"></el-table-column>
          <el-table-column label="实收金额" prop="paid"></el-table-column>
          <el-table-column label="找零" prop="changes"></el-table-column>
          <el-table-column label="销售日期" prop="date" fit></el-table-column>
          <el-table-column label="销售人" prop="operator"></el-table-column>
        </el-table>
      </template>
    </pagination-table>
    <div v-show="chart">
      <el-form :inline="true" v-model="formInline.form">
        <el-form-item label="入库编号">
          <el-input v-model="formInline.form.id" placeholder="入库编号"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <cascader
            :options="options"
            v-model="formInline.form.treeString"
          ></cascader>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="formInline.form.startDate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="formInline.form.endDate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
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
    },
    mixins: [clientResize],
    data() {
      return {
        data: [],
        formInline: new PagedList('/sell/findAll', 30),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.69,
        options: [],
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