//社保公积金选择人员
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="Statements" class="dialog-box" append-to-body :visible.sync="showGenerateStatement" :show-close="false" :destroy-on-close="true" width="580px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <div>
        <el-table class="multipleTable" :data="tableDataUser" style="width: 100%">
          <el-table-column prop="isshow" label="选择" width="50" align="center">
            <template slot-scope="scope">
              <el-checkbox class="erpcheck" @change="changecheck" v-model="scope.row.isshow"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="姓名" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.Name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="IdCode" label="身份证" align="center">
          </el-table-column>
          <el-table-column v-if="dimensionType=='0'" align="center" prop="TotalPers" label="个人社保合计">
            <template slot-scope="scope">
              <span>￥{{scope.row.TotalPers}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="dimensionType=='0'" align="center" prop="TotalEnt" label="单位社保合计">
            <template slot-scope="scope">
              <span>￥{{scope.row.TotalEnt}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="dimensionType=='0'" align="center" prop="Total" label="合计金额">
            <template slot-scope="scope">
              <span>￥{{scope.row.Total}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="dimensionType=='1'" align="center" prop="TotalPers" label="个人公积金合计">
            <template slot-scope="scope">
              <span>￥{{scope.row.TotalPers}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="dimensionType=='1'" align="center" prop="TotalEnt" label="单位公积金合计">
            <template slot-scope="scope">
              <span>￥{{scope.row.TotalEnt}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="dimensionType=='1'" align="center" prop="TotalAmount" label="合计金额">
            <template slot-scope="scope">
              <span>￥{{scope.row.TotalAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="dimensionType=='2'" align="center" prop="TotalPers" label="个人医保合计">
            <template slot-scope="scope">
              <span>￥{{scope.row.TotalPers}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="dimensionType=='2'" align="center" prop="TotalEnt" label="单位医保合计">
            <template slot-scope="scope">
              <span>￥{{scope.row.TotalEnt}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="dimensionType=='2'" align="center" prop="Total" label="合计金额">
            <template slot-scope="scope">
              <span>￥{{scope.row.Total}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="operate-bottom">
          <el-checkbox class="erpcheck" @change="allselect" v-model="ischecked">全选</el-checkbox>
        </div>
      </div>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round size="small" @click="close">取消</el-button>
        <el-button round size="small" @click="dialogtrue">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetProjectList } from '@/api/projectManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, uuid, copy } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'ImportContract',
  props: ['showStatements', 'dimensionType', 'Statements', 'tableData'],
  data() {
    return {
      dataObject: {
        Id: '',
        FileUrl: ''
      },
      loading: false,
      showGenerateStatement: false,
      ProjectList: [],
      tableDataUser: [],
      ischecked: true
    }
  },
  watch: {
    showStatements(newvalue, oldvalue) {
      this.showGenerateStatement = newvalue
      this.tableDataUser = this.tableData
    }
  },
  created() {
    this.remoteProject()
  },
  methods: {
    remoteProject(query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Name: query,
          CompanyId: '',
          BusinessType: '-1',
          Priority: '-1',
          Status: '-1',
          PageIndex: 1,
          PageSize: 99,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetProjectList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.ProjectList = response.Data
            } else {
              this.ProjectList = []
            }
          } else {
            this.ProjectList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearProject() {
      this.remoteProject()
    },
    //导入社保
    dialogtrue() {
      // 调用接口,保存数据
      let objArr = []
      for (let i = 0; i < this.tableDataUser.length; i++) {
        if (this.tableDataUser[i].isshow) {
          objArr.push(this.tableDataUser[i])
        }
      }
      this.$emit('StatementsSave', objArr)
    },
    // 全选
    allselect(e) {
      for (let i = 0; i < this.tableDataUser.length; i++) {
        this.tableDataUser[i].isshow = e
      }
    },
    changecheck(e) {
      this.ischecked = this.tableDataUser.every(v => {
        return v.isshow
      })
    },
    //关闭导入事件
    close() {
      this.dataObject.FileUrl = ''
      this.$emit('closeStatements', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.multipleTable /deep/ {
  tr > td,
  tr > th {
    border: none;
  }
}
.operate-bottom {
  margin-left: 17px;
}
</style>