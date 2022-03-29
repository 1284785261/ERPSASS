<template>
  <div class="operate-container">
    <!-- <h2>操作管理</h2> -->
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">操作名称</div>
        <el-input class="erpsearchinput" placeholder="请输入操作名称" clearable size="small" v-model="searchform.Title" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>

      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="addmenu erpbtn" @click="addoperate('Add')">新增操作</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" prop="Title" label="操作名称" />
          <el-table-column align="center" prop="OperationCode" label="操作编码" />
          <el-table-column align="center" prop="Sort" width="55" label="排序" />
          <el-table-column align="center" prop="Remark" label="备注" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','View','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="view(scope.row,'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="update(scope.row,'Modify')">修改</el-dropdown-item>
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
        <el-button size="small" v-if="$operatebtn(operates, 'Delete')" class="erpdelete" @click="alldeletes('Delete')">删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <updateuoerate :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></updateuoerate>
      <el-dialog :close-on-click-modal="false" title="操作详情" :visible.sync="operateVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <el-form label-position="top" ref="operateform" label-width="100px" class="operateform disabled">
          <el-form-item label="操作名称">
            <el-input v-model="contentdata.Title" disabled></el-input>
            <!-- <span>{{contentdata.Title}}</span> -->
          </el-form-item>
          <el-form-item label="操作编码">
            <!-- <span>{{contentdata.OperationCode}}</span> -->
            <el-input v-model="contentdata.OperationCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="排序" class="counternumber">
            <!-- <span>{{contentdata.Sort}}</span> -->
            <el-input-number v-model="contentdata.Sort" disabled :min="1" :max="999"></el-input-number>
          </el-form-item>
          <el-form-item label="备注" class="text">
            <!-- <span>{{contentdata.Remark}}</span> -->
            <el-input type="textarea" disabled :rows="5" maxlength="200" show-word-limit v-model="contentdata.Remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="operateVisible=!operateVisible">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GetSysOperationPageList, AddSysOperation, EditSysOperation, DelSysOperation, GetCatagoryInfo } from '@/api/SystemSetting.js'
import updateuoerate from './components/UpdateOperate'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    updateuoerate
  },
  data () {
    return {
      searchform: {
        Title: '',
        id: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
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
      Id: '',
      operateVisible: false, // 操作弹框
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getSysOperationPageList(this.operatiOBj)
    }
  },
  methods: {
    // 获取操作列表
    getSysOperationPageList (operat) {
      let data1 = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Title: this.searchform.Title,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      // this.tableloading = true
      GetSysOperationPageList(qs.stringify(data1)).then(response => {
        if (response.IsSuccess) {
          this.tableData = response.Data
          this.total = response.Total
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.tableloading = false
      })
    },
    // 新增操作
    addoperate (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '新建操作'
      this.dialogvisible = true
      this.contentdata = {
        Title: '',
        OperationCode: '',
        Sort: 1,
        Remark: ''
      }
      this.issave = true
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getSysOperationPageList(this.operatiOBj)
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
    // 操作
    view (e, str) {
      // 查看
      this.contentdata = {
        Title: e.Title,
        OperationCode: e.OperationCode,
        Sort: e.Sort,
        Remark: e.Remark
      }
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.operateVisible = true
    },
    update (e, str) {
      // 修改
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '修改操作'
      this.dialogvisible = true
      this.contentdata = {
        Title: e.Title,
        OperationCode: e.OperationCode,
        Sort: e.Sort,
        Remark: e.Remark
      }
      this.Id = e.Id
      this.issave = false
    },
    deletes (e, str) {
      // 删除操作
      const operating = this.$operatedata(this.operates, str)
      let data1 = {
        IdArr: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('你确定删除选中的操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DelSysOperation(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.getSysOperationPageList(this.operatiOBj)
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
    alldeletes (str) {
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
      this.$confirm('你确定删除选中的操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DelSysOperation(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.getSysOperationPageList(this.operatiOBj)
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
      this.getSysOperationPageList(this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getSysOperationPageList(this.operatiOBj)
    },
    // 关闭弹框
    closedialog () {
      this.dialogvisible = false
    },
    // 保存弹框
    savedialog (data) {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      if (this.issave) {
        // 保存
        let data1 = {
          OperationCode: data.OperationCode,
          Title: data.Title,
          Sort: data.Sort,
          Remark: data.Remark,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        AddSysOperation(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
            this.dialogvisible = false
            this.getSysOperationPageList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      } else {
        // 修改
        let data1 = {
          Id: this.Id,
          OperationCode: data.OperationCode,
          Title: data.Title,
          Sort: data.Sort,
          Remark: data.Remark,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        EditSysOperation(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.dialogvisible = false
            this.getSysOperationPageList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
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
      width: 96px;
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