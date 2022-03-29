// 公司信息管理
<template>
  <div class="operate-container">
    <!-- <h2>公司信息管理</h2> -->
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">公司名称</div>
        <el-input class="erpsearchinput" placeholder="请输入公司名称进行查询" size="small" v-model="searchform.Name" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">公司级别</div>
        <el-select v-model="searchform.Level" filterable class="selet erpselect" @change="searchtable" clearable size="small">
          <el-option v-for="item in companyLeave" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">公司状态</div>
        <el-select v-model="searchform.Status" class="selet erpselect" size="small" @change="searchtable">
          <el-option v-for="item in companystatus" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">搜索</el-button>
      </div>
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" v-if="$operatebtn(operates, 'Add')" @click="addcompany('Add')">新增公司</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" prop="Id" width="55" label="编号" />
          <el-table-column align="center" prop="Name" label="公司名称" show-overflow-tooltip />
          <el-table-column align="center" prop="LevelText" label="公司级别" />
          <el-table-column align="center" prop="Addr" label="公司办公位置" show-overflow-tooltip />
          <el-table-column align="center" prop="AddTime" label="数据创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="UpdateTime" label="编辑时间">
            <template slot-scope="scope">
              <span>{{scope.row.UpdateTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Status" label="公司状态">
            <template slot-scope="scope">
              {{ scope.row.Status | companyStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['View','Modify','Business','Logout','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="view(scope.row,'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="update(scope.row,'Modify')">编辑</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status=='0' && $operatebtn(operates, 'Business')" @click.native="business(scope.row,'Business')">正常营业</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status=='1' && $operatebtn(operates, 'Logout')" @click.native="write(scope.row,'Logout')">注销</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="deletes(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom" v-if="($operatebtns(operates,['Delete']))">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="erpdelete" v-if="$operatebtn(operates, 'Delete')" @click="alldeletes('Delete')">删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <!-- <updateuoerate :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></updateuoerate> -->
    </div>
  </div>
</template>

<script>
// import updateuoerate from './components/UpdateOperate'
import { GetBfCompanyPageList, DeleteBfCompany, EditBfCompanyStatus } from '@/api/BusinessSet.js'
import { BfCompanyLevelEnum } from '@/api/Public.js'
import { mapGetters } from 'vuex'
import filters from '@/utils/filters'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    // updateuoerate
  },
  data () {
    return {
      searchform: {
        Name: '',
        Level: '',
        Status: -1
      },
      companyLeave: [],
      companystatus: [{
        value: -1,
        describe: '全部'
      }, {
        value: 0,
        describe: '已注销'
      }, {
        value: 1,
        describe: '正常营业'
      }],
      tableloading: false,
      tableData: [],
      allchecked: false, // 全选
      PageSize: 10,
      currentPage: 1,
      total: 0,
      titlename: '', // 弹框名
      dialogvisible: false, // 是否显示弹框
      contentdata: {}, // 弹框内容
      issave: false,
      Ids: [],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  computed: {
    ...mapGetters([
      'companystylelist'
    ])
  },
  created () {
    this.bfCompanyLevelEnum()
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getBfCompanyPageList(this.operatiOBj)
    }

  },
  methods: {
    // 查询公司列表
    getBfCompanyPageList (operat) {
      let obj = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Name: this.searchform.Name,
        Status: this.searchform.Status,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      if (this.searchform.Level === '') {
        obj.Level = -1
      } else {
        obj.Level = this.searchform.Level
      }
      this.tableloading = true
      GetBfCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tableData = response.Data
          this.total = response.Total
          this.tableloading = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取公司枚举
    bfCompanyLevelEnum () {
      let data = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      if (this.companystylelist && this.companystylelist.length) {
        this.companyLeave = this.companystylelist
      } else {
        BfCompanyLevelEnum(qs.stringify(data)).then(response => {
          if (response && response.length) {
            this.companyLeave = response
            this.$store.dispatch('BusinessSet/getcompanylist', response)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    // 新增公司
    addcompany (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/BusinessSet/AddCompany'
      })
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getBfCompanyPageList(this.operatiOBj)
    },
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    // 查看
    view (e, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/BusinessSet/AddCompany',
        query: {
          id: e.Id,
          isview: true
        }
      })
    },
    //修改
    update (e, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/BusinessSet/AddCompany',
        query: {
          id: e.Id
        }
      })
    },
    write (e, str) {
      const operating = this.$operatedata(this.operates, str)
      // 注销
      let obj = {
        IdArr: e.Id,
        Status: 0,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      EditBfCompanyStatus(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '已成功更改公司状态为注销!',
            type: 'success'
          })
          this.getBfCompanyPageList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    business (e, str) {
      // 正常营业
      const operating = this.$operatedata(this.operates, str)
      let obj = {
        IdArr: e.Id,
        Status: 1,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      EditBfCompanyStatus(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '已成功修改公司状态为营业!',
            type: 'success'
          })
          this.getBfCompanyPageList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    deletes (e, str) {
      // 删除
      const operating = this.$operatedata(this.operates, str)
      let data1 = {
        IdArr: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('你确定删除选中的公司吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteBfCompany(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getBfCompanyPageList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 全选
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 多选删除
    alldeletes () {
      var array = ''
      if (this.Ids.length == 0) {
        this.$message({
          message: '你未选中任何操作！',
          type: 'warning'
        })
        return
      } else {
        array = this.Ids.join(',')
      }
      const operating = this.$operatedata(this.operates, str)
      let data1 = {
        ClassType: this.searchform.ClassType,
        IdArr: array,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('你确定删除选中的公司吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteBfCompany(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.getBfCompanyPageList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getBfCompanyPageList(this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getBfCompanyPageList(this.operatiOBj)
    },
    // 关闭弹框
    closedialog () {
      this.dialogvisible = false
    },
    // 保存弹框
    savedialog (data) {
      console.log(data);
      if (this.issave) {
        // 保存
      } else {
        // 修改
      }
    }
  },
}
</script>

<style lang="scss">
.operate-container {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .search-bar {
    padding: 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      .search-name {
        font-size: $f16;
        color: $erp666;
        font-weight: 700;
        display: inline-block;
        margin-right: 7px;
      }
      .el-input {
        display: inline-block;
        width: 216px;
      }
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      // width: 96px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
</style>