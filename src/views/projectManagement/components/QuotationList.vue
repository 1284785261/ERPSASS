<!-- 项目报价信息 -->
<template>
  <div>
    <div class="table-content">
      <div>
        <div class="tableHeader-operation">
          <el-button class="operation-button" size="small" type="primary" @click="SubmitQuotation">添加项目报价信息</el-button>
        </div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="QuotationList" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
          <el-table-column align="center" prop="Id" width="55" label="序号" />
          <el-table-column align="center" prop="Tender" width="100" label="是否招标">
            <template slot-scope="scope">
              <span>{{ scope.row.Tender | Tender}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Recruit" width="100" label="是否招聘">
            <template slot-scope="scope">
              <span>{{ scope.row.Recruit | Tender}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Measure" width="170" label="项目成本及盈利测算" show-overflow-tooltip />
          <el-table-column align="center" prop="Limited" width="120" label="审批时限">
            <template slot-scope="scope">
              <span>{{scope.row.Limited | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Desc" min-width="140" label="项目概况" show-overflow-tooltip />
          <el-table-column align="center" prop="PriceContent" min-width="140" label="报价内容" show-overflow-tooltip />
          <el-table-column align="center" prop="PriceDesc" min-width="140" label="报价说明" show-overflow-tooltip />
          <el-table-column align="center" prop="AddTime" width="160" label="添加时间">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SysUserName" width="80" label="创建人" />
          <el-table-column align="center" prop="StatusText" width="100" label="状态" />
          <el-table-column align="center" label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="scope.row.Status == '0'">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="EditQuotation(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item @click.native="SubmitAudit(scope.row,'Modify')">提交审核</el-dropdown-item>
                    <el-dropdown-item @click.native="DeleteQuotation(scope.row,'Modify')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { GetProjectPriceList, DeleteProjectPrice, ProjectPriceApproval } from '@/api/projectManagement.js'
import filters from '@/utils/filters'
import { showLoading, hideLoading, datemonth, MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  data () {
    return {
      Id: '',
      tableloading: false,
      QuotationList: [],
      operating: {}
    }
  },
  created () {
    this.$nextTick(() => {
      // 获取操作operating
      this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      this.Id = this.$route.query.Id
      this.getQuotationList()
    })
  },
  methods: {
    getQuotationList () {
      this.tableloading = true
      let obj = {
        ProjectId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.QuotationList = []
      GetProjectPriceList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.QuotationList = response.Data
          } else {
            this.QuotationList = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //添加项目审核报价
    SubmitQuotation () {
      if (this.QuotationList.length > 0) {
        for (let i = 0; i < this.QuotationList.length; i++) {
          if (this.QuotationList[i].Status == '3') {
            this.$message({
              message: '已存在审核通过的项目报价信息',
              type: 'error'
            })
            return
          }
        }
      }
      this.$router.push({
        path: '/projectManagement/ProjectReviewQuotation',
        query: {
          Id: this.Id
        }
      })
    },
    //修改项目审核报价
    EditQuotation (data) {
      this.$router.push({
        path: '/projectManagement/ProjectReviewQuotation',
        query: {
          Id: this.Id,
          QuotationId: data.Id
        }
      })
    },
    //提交审核
    SubmitAudit (data) {
      this.$confirm('你确定提交该项目报价审核吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: data.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        ProjectPriceApproval(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '提交项目报价审核成功!'
            })
            this.getQuotationList()
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    //删除项目报价
    DeleteQuotation (data) {
      this.$confirm('你确定删除该项目报价吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: data.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        DeleteProjectPrice(obj).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除项目报价成功!'
            })
            this.getQuotationList()
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tableHeader-operation {
  position: relative;
  text-align: right;
  margin-bottom: 20px;
  margin-top: 20px;
}
/deep/ .table-content {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>