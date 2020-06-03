<template>
  <div>
    <pagination-table v-model="formInline" v-show="!chart">
      <template v-slot:search>
        <el-form :inline="true" v-model="formInline.form">
          <el-form-item label="分类名称">
            <el-input v-model="formInline.form.name" placeholder="分类名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <export-excel filename="商品统计" methodname="getGoodsList" :form="formInline.form"></export-excel>
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
          <el-table-column label="商品条码" prop="code"></el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="商品数量" prop="num"></el-table-column>
          <el-table-column label="所属分类" prop="treeString">
            <template slot-scope="scope">
              <cascader
                :options="options"
                v-model="scope.row.treeString"
                :disabled="true"
              ></cascader>
            </template>
          </el-table-column>
          <el-table-column label="商品售价" prop="price"></el-table-column>
          <el-table-column label="保质期限" prop="shelfLife">
            <template slot-scope="scope">
              <el-input v-model="scope.row.shelfLife" :disabled="true">
                <el-select v-model="scope.row.shelfLifeUnit" slot="append" placeholder="请选择" :disabled="!scope.row.edit">
                  <el-option label="年" value="年"></el-option>
                  <el-option label="月" value="月"></el-option>
                  <el-option label="日" value="日"></el-option>
                </el-select>
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </pagination-table>
    <div v-show="chart">
      <el-form :inline="true" v-model="form">
        <el-form-item label="统计方式">
          <el-select v-model="form.group" placeholder="请选择">
            <el-option label="商品名称" value="g.name"></el-option>
            <el-option label="分类名称" value="tc.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="showChart(false)">隐藏图表</el-button>
        </el-form-item>
      </el-form>
      <mg-pie-charts :data="data" text="商品统计图"></mg-pie-charts>
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
  import { getPieChart } from '@/api/goods'

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
        formInline: new PagedList('/goods/findAll', 30),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8,
        options: [],
        chart: false,
        form: {
          group: 'g.name'
        }
      }
    },
    methods: {
      onSubmit() {
        this.formInline.search()
        this.getOptions()
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
        getPieChart(this.form).then(response => {
          _this.data = response.data.list
        })
      }
    }

  }
</script>

<style scoped>

</style>