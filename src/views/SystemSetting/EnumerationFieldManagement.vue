<template>
  <div class="enumeration-container">
    <!-- <h2>枚举字段管理</h2> -->
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">枚举字段名称</div>
        <!-- <el-input class="erpsearchinput" clearable placeholder="请输入操作名称" size="small" v-model="searchform.name"></el-input> -->
        <el-input class="erpsearchinput" placeholder="请输入字段名称" clearable size="small" v-model="searchform.ClassName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon cursor-pointer" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">字段类型</div>
        <el-select v-model="searchform.ClassType" size="small" class="selet erpselect" @change="changeclasstype" placeholder="请选择字段类型">
          <el-option v-for="item in calsstype" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="addmenu erpbtn" @click="addenumerate('Add')">新增枚举</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-table">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right"  v-if="tablebread.length>1"> -->
        <div class="table-bread">
          <span>表格数据位置:</span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, index) in tablebread" :key="index" :class="{'cursor-pointer': index!=tablebread.length-1}" @click.native="totiertable(item, index)">{{item.Name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" max-height="600" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" prop="Id" label="字段ID" />
          <el-table-column align="center" prop="ClassName" label="字段名称">
            <template slot-scope="scope">
              <span class="cursor-pointer" @click="searchsubset(scope.row)">{{scope.row.ClassName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Remark" label="备注" />
          <el-table-column align="center" prop="Status" label="使用状态">
            <template slot-scope="scope">
              {{scope.row.Status | usestatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['View','Delete','AddSublevel','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="view(scope.row,'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="update(scope.row,'Delete')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddSublevel')" @click.native="addsubset(scope.row,'AddSublevel')">添加子集</el-dropdown-item>
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
      <updateenumerate :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></updateenumerate>
      <el-dialog :close-on-click-modal="false" title="查看字段" :visible.sync="enumerVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <el-form label-position="top" ref="operateform" label-width="100px" class="operateform disabled">
          <el-form-item label="父级ID">
            <el-input v-model="contentdata.ParentId" disabled></el-input>
            <!-- <span>{{contentdata.ParentId}}</span> -->
          </el-form-item>
          <el-form-item label="类别类型" class="select">
            <!-- <span>{{contentdata.ClassType | ClassType}}</span> -->
            <el-select v-model="contentdata.ClassType" disabled placeholder="请选择类别类型">
              <el-option v-for="item in calsstype" :key="item.value" :label="item.describe" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别名称">
            <!-- <span>{{contentdata.ClassName}}</span> -->
            <el-input v-model="contentdata.ClassName" disabled></el-input>
          </el-form-item>
          <el-form-item label="排序" class="counternumber">
            <!-- <span>{{contentdata.Sort}}</span> -->
            <el-input-number v-model="contentdata.Sort" disabled :min="1" :max="999"></el-input-number>
          </el-form-item>
          <el-form-item label="备注" class="text">
            <!-- <span>{{contentdata.Remark}}</span> -->
            <el-input type="textarea" :rows="5" maxlength="200" disabled show-word-limit v-model="contentdata.Remark"></el-input>
          </el-form-item>
          <el-form-item label="使用状态" class="useraido">
            <el-radio-group v-model="contentdata.Status">
              <el-radio :label="0" disabled>禁用</el-radio>
              <el-radio :label="1" disabled>启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="enumerVisible=!enumerVisible">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import updateenumerate from './components/UpdateEnumerate'
import { GetCatagoryClassType, GetCatagoryPageList, AddCatagory, EditCatagory, DeleteCatagory, GetCatagoryInfo } from '@/api/SystemSetting.js'
import { MenuIdDate, copy, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    updateenumerate
  },
  filters: {
    ClassType (value) {
      let msg = ''
      switch (value) {
        case 0: msg = '行业类别'; break
        case 1: msg = '职位类别'; break
        case 2: msg = '语言类型'; break
        case 3: msg = '技能类型'; break
        case 4: msg = '民族类别'; break
      }
      return msg
    }
  },
  data () {
    return {
      searchform: {
        ClassName: '',
        ClassType: 0
      },
      tablebread: [{
        Id: 0,
        Name: '综合分类'
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
      Ids: [], // 多个选中id
      Id: '', // 选中的ID
      calsstype: [], // 分类类别
      ParentId: 0, // 父级Id
      isSubset: false, // 判断该操作是否新增子集
      enumerVisible: false,
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    let obj = {
      menuid: MenuIdDate(),
      operationcode: 1
    }
    // console.log(this.$route);
    GetCatagoryClassType(qs.stringify(obj)).then(response => {
      if (response && response.length) {
        this.calsstype = response
        this.$store.dispatch('systemsetting/getclasstype', this.calsstype)
      } else {
        this.$message({
          message: '分类接口出错!',
          type: 'error'
        })
      }
    })
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getCatagoryPageList('', this.operatiOBj)
    }
  },
  methods: {
    // 获取分类列表
    getCatagoryPageList (e, operat) {
      let data1 = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        ClassName: this.searchform.ClassName,
        ClassType: this.searchform.ClassType,
        ParentId: e || '',
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode ||'1'
      }
      this.tableloading = true
      GetCatagoryPageList(qs.stringify(data1)).then(response => {
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
    // 获取子集列表
    searchsubset (e) {
      let data1 = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        ClassName: this.searchform.ClassName,
        ClassType: this.searchform.ClassType,
        ParentId: e.Id
      }
      this.tableloading = true
      GetCatagoryPageList(qs.stringify(data1)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.tableData = response.Data
            this.total = response.Total
            let breabdata = {
              Id: e.Id,
              Name: e.ClassName
            }
            this.tablebread.push(breabdata)
            this.ParentId = e.Id
          } else {
            this.$message({
              message: '这已经是最后一级了!',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.tableloading = false
      })
    },
    // 面包屑跳转
    totiertable (e, i) {
      if (this.tablebread.length - 1 == i) {
        return
      } else {
        console.log(this.tablebread);
        console.log(e);
        var arry = this.tablebread.filter(v => {
          if (v.Id <= e.Id) {
            return v
          }
        })
        console.log(arry);
        this.tablebread = arry
        // var tablebread = this.tablebread.slice( 0, num )
        // var tablebread = this.tablebread.slice( 0, num )
        // this.$nextTick( () => {
        //   this.tablebread = tablebread
        // })
        this.getCatagoryPageList(e.Id, this.operatiOBj)
      }
    },
    // 添加新的枚举
    addenumerate (str) {
      // const operating = this.$operatedata(this.operates, str)
      // console.log(operating);
      this.titlename = '新建枚举'
      this.dialogvisible = true
      this.contentdata = {
        ParentId: this.ParentId,
        ClassType: this.searchform.ClassType,
        ClassName: '',
        Sort: 1,
        Remark: '',
        Status: 1
      }
      this.issave = true
      this.isSubset = false
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getCatagoryPageList('', this.operatiOBj)
    },
    // 类型改变
    changeclasstype () {
      this.tablebread = [{
        Id: 0,
        Name: '综合分类'
      }]
      this.getCatagoryPageList('', this.operatiOBj)
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
      const operating = this.$operatedata(this.operates, str)
      let data1 = {
        Id: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      GetCatagoryInfo(qs.stringify(data1)).then(response => {
        if (response.IsSuccess) {
          this.contentdata = {
            ParentId: response.Data.ParentId,
            ClassType: response.Data.ClassType,
            ClassName: response.Data.ClassName,
            Sort: response.Data.Sort,
            Remark: response.Data.Remark,
            Status: response.Data.Status
          }
          this.enumerVisible = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })

    },
    addsubset (e, str) {
      console.log(e);
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '添加枚举'
      this.dialogvisible = true
      this.contentdata = {
        ParentId: e.Id,
        ClassType: this.searchform.ClassType,
        ClassName: '',
        Sort: 1,
        Remark: '',
        Status: 1
      }
      this.issave = true
      // 为了上面的面包屑相对应,新增子集的时候,特殊处理
      this.isSubset = true
    },
    update (e, str) {
      // 修改
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '修改枚举'
      this.dialogvisible = true
      this.contentdata = {
        ParentId: e.ParentId,
        ClassType: e.ClassType,
        ClassName: e.ClassName,
        Sort: e.Sort,
        Remark: e.Remark,
        Status: e.Status
      }
      this.Id = e.Id
      this.issave = false
    },
    deletes (e, str) {
      // 删除
      const operating = this.$operatedata(this.operates, str)
      let data1 = {
        ClassType: e.ClassType,
        IdArr: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('你确定删除选中的分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteCatagory(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.dialogvisible = false
            this.getCatagoryPageList('', this.operatiOBj)
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
      console.log(this.Ids);
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
      this.$confirm('你确定删除选中的分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteCatagory(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.dialogvisible = false
            this.getCatagoryPageList('', this.operatiOBj)
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
      this.getCatagoryPageList('', this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCatagoryPageList('', this.operatiOBj)
    },
    // 关闭弹框
    closedialog () {
      this.dialogvisible = false
    },
    // 保存弹框
    savedialog (data) {
      console.log(data);
      // const operating = JSON.parse(localStorage.getItem('operating')) || {}
      // const operating = this.$operatedata(this.operates, str)
      if (this.issave) {
        // 保存
        let data1 = {
          ParentId: data.ParentId,
          ClassName: data.ClassName,
          ClassType: data.ClassType,
          Logo: '',
          LinkUrl: '',
          Sort: data.Sort,
          Remark: data.Remark,
          Status: data.Status,
          // menuid: operating.MenuId,
          // operationcode: operating.OperationCode
          menuid: MenuIdDate(),
          operationcode: 1
        }
        showLoading()
        AddCatagory(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
            this.dialogvisible = false
            // 判断是新增子集还是添加新的分类
            if (this.isSubset == true) {
              // 添加子集
              let breabdata = {
                Id: data.ParentId,
                Name: data.ClassName
              }
              this.tablebread.push(breabdata)
            }
            this.getCatagoryPageList(data.ParentId, this.operatiOBj)
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
        let data2 = {
          Id: this.Id,
          ParentId: data.ParentId,
          ClassName: data.ClassName,
          ClassType: data.ClassType,
          Logo: '',
          LinkUrl: '',
          Sort: data.Sort,
          Remark: data.Remark,
          Status: data.Status,
          menuid: MenuIdDate(),
          operationcode: 1
        }
        showLoading()
        EditCatagory(qs.stringify(data2)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.dialogvisible = false
            this.getCatagoryPageList(data.ParentId, this.operatiOBj)
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
.enumeration-container {
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
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-table {
      .table-bread {
        margin-bottom: 16px;
        > span {
          margin-right: 10px;
          font-size: $f14;
          display: inline-block;
        }
        > div {
          display: inline-block;
          vertical-align: bottom;
          line-height: 22px;
        }
        span {
          color: #a3b1cc;
        }
      }
    }
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