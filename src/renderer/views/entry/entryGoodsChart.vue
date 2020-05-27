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
            <export-excel filename="测试" methodname="getEntryGoodsList" :form="formInline.form"></export-excel>
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
          <el-table-column label="入库编号" prop="id"></el-table-column>
          <el-table-column label="商品条码" prop="code" fit></el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="treeName"></el-table-column>
          <el-table-column label="进价" prop="price"></el-table-column>
          <el-table-column label="数量" prop="num"></el-table-column>
          <el-table-column label="剩余数量" prop="currentNum"></el-table-column>
          <el-table-column label="入库日期" prop="date"></el-table-column>
          <el-table-column label="入库人" prop="operator"></el-table-column>
          <el-table-column label="条形码编号" prop="entryCode"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="showPrint(scope.row)">打印</el-button>
            </template>
          </el-table-column>
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
      <mg-pie-charts :data="data" text="入库统计图"></mg-pie-charts>
    </div>
    <el-dialog title="打印" :visible.sync="printShow" >
      <el-form :inline="true">
        <el-form-item label="打印数量">
          <el-input v-model="printData.num" placeholder="打印数量"></el-input>
        </el-form-item>
        <el-form-item>
         <el-button type="primary" @click="printMethod">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  import Print from '@/utils/printTemplate'

  export default {
    name: 'index',
    components: { MgPieCharts, ExportExcel, PaginationTable, Cascader },
    mounted() {
      this.onSubmit()
      this.getOptions()
    },
    mixins: [clientResize],
    data() {
      return {
        data: [],
        formInline: new PagedList('/entry/findAll', 30),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.69,
        options: [],
        chart: false,
        printShow: false,
        form: {
        },
        printData: {
          code: '',
          num: 0,
          name: ''
        },
        print: new Print()
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
        common('/entry/getPieChart', this.formInline.form).then(response => {
          _this.data = response.data.list
        })
      },
      showPrint(row) {
        this.printData = {}
        this.printData.code = row.entryCode
        this.printData.num = row.currentNum
        this.printData.name = row.name
        this.printShow = true
      },
      printMethod() {
        const data = []
        for (let i = 0; i < this.printData.num; i++) {
          console.log(this.printData, '+++++++++++')
          data.push({ name: this.printData.name, code: this.printData.code })
        }
        this.print.print(data)
        this.printShow = false
      }
    }

  }
</script>

<style scoped>

</style>