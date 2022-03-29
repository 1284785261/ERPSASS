<!-- 社保增减员 -->
<template>
  <div class="social-security-officer-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入员工名称查询" size="small" v-model="searchform.StaffName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">缴交起始年月</div>
        <el-date-picker class="erpsearchinput" clearable v-model="searchform.YearMonth" size="small" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <div class="condition">
        <div class="search-name">就职项目</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入就职项目查询" size="small" v-model="searchform.ProjectName">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">用工单位</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入用工单位查询" size="small" v-model="searchform.CompanyName">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">社保打款账号</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入社保打款账号查询" size="small" v-model="searchform.Account">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">处理人</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入处理人查询" size="small" v-model="searchform.UserName">
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
      <!-- <el-button size="small" class="erpbtn" @click="addpersonnel">社保增减人员</el-button> -->
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="StaffChangeList" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" min-width="55" fixed label="全选" />
          <el-table-column align="center" prop="Id" min-width="55" label="序号" />
          <el-table-column align="center" prop="StaffName" label="员工姓名" min-width="120" />
          <!-- <template slot-scope="scope">
              <span class="watchcode" @click="watchstaff(scope.row)">{{scope.row.StaffName}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="IdCode" label="身份证号码" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" prop="ProjectName" label="相关项目" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" prop="Account" label="社保打款账号" min-width="150" show-overflow-tooltip />
          <el-table-column v-if="tabidx===0" align="center" prop="BeginYear" label="缴纳起始年月" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.BeginYear">{{scope.row.BeginYear}}年{{scope.row.BeginMonth}}月</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column v-if="tabidx===1" align="center" prop="EndYear" label="缴纳截止年月" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.EndYear">{{scope.row.EndYear}}年{{scope.row.EndMonth}}月</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AddUserName" label="处理人" min-width="120" />
          <el-table-column align="center" prop="AddTime" label="处理时间" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.AddTime">{{scope.row.AddTime | Time}}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="tabidx===0 && $operatebtn(operates, 'Modify')" @click.native="updatestaff(scope.row, 0)">修改</el-dropdown-item>
                    <el-dropdown-item v-if="tabidx===1 && $operatebtn(operates, 'Modify')" @click.native="updatestaff(scope.row, 1)">修改</el-dropdown-item>
                    <el-dropdown-item v-if="tabidx===0 && $operatebtn(operates, 'Delete')" @click.native="removepersonnel(scope.row,'Delete')">从增员名单移除</el-dropdown-item>
                    <el-dropdown-item v-if="tabidx===1 && $operatebtn(operates, 'Delete')" @click.native="removepersonnel(scope.row,'Delete')">从减员名单移除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <div class="operate-bottom" v-if="($operatebtns(operates,['Export']))">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="batchSelectAll(allchecked)">全选</el-checkbox>
        <el-button v-if="tabidx===0 && $operatebtn(operates, 'Export')" size="small" class="erpbtn" @click="OpenStatements('Export')">导出增员名单</el-button>
        <el-button v-if="tabidx===1 && $operatebtn(operates, 'Export')" size="small" class="erpbtn" @click="OpenStatements('Export')">导出减员名单</el-button>
      </div>
    </div>
    <div class="dialog">
      <revisionperson :title="revisiontitle" :itemname="revisionitem" :visible="revisiontvisible" :contentdata="revisiontdata" @saverevision="saverevision" @closeSaverevision="closeSaverevision"></revisionperson>
    </div>
  </div>
</template>

<script>
import revisionperson from './components/dialog-revision-person.vue'
import { GetSiChangePageList, EditSiChange, DeleteSiChange, DownloadSiChangeExcel } from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import filters from '@/utils/filters.js'
import qs from 'qs'
export default {
  components: {
    revisionperson
  },
  data () {
    return {
      searchform: {
        StaffName: '', // 外包员工
        YearMonth: '', // 起始年月
        ProjectName: '', // 就职项目名称
        CompanyName: '', // 用工单位
        Account: '', // 社保打款账号
        UserName: '', // 处理人
      },
      StaffChangeList: [],
      tableloading: false,
      allchecked: false,
      currentPage: 1,
      total: 0,
      PageSize: 10,
      tablist: [{
        value: 0,
        describe: '社保增员名单'
      }, {
        value: 1,
        describe: '社保减员名单'
      }],
      tabidx: 0,
      Ids: [],
      Id: '',
      revisiontitle: '', // 弹框标题
      revisionitem: '', // 表格名称
      revisiontvisible: false, // 表格弹框是否展示
      revisiontdata: {}, // 弹框内容
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
      this.getTabelList(this.operatiOBj)
    }
  },
  methods: {
    searchtable () {
      this.currentPage = 1
      this.getTabelList(this.operatiOBj)
    },
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.allchecked = false
        this.Ids = []
        this.getTabelList(this.operatiOBj)
      }
    },
    getTabelList (operat) {
      let obj = {
        Type: this.tabidx,
        StaffName: this.searchform.StaffName,
        YearMonth: this.searchform.YearMonth,
        ProjectName: this.searchform.ProjectName,
        CompanyName: this.searchform.CompanyName,
        Account: this.searchform.Account,
        UserName: this.searchform.UserName,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      this.tableloading = true
      GetSiChangePageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.StaffChangeList = response.Data
            this.total = response.Total
          } else {
            this.StaffChangeList = []
            this.total = 0
          }
        } else {
          this.StaffChangeList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 查看详情
    watchstaff (e) {

    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.getTabelList(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTabelList(this.operatiOBj)
    },
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      if (this.Ids.length == this.StaffChangeList.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    batchSelectAll () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 修改人员名单
    updatestaff (e, type) {
      this.Id = e.Id
      const operating = this.$operatedata(this.operates, 'Modify')
      localStorage.setItem('operating', JSON.stringify(operating))
      if (type === 0) {
        this.revisiontitle = e.StaffName + '增员修改'
        this.revisionitem = '社保缴纳时间'
        this.revisiontdata = {
          date: new Date(e.BeginYear, e.BeginMonth - 1)
        }
        this.revisiontvisible = true
      } else if (type === 1) {
        this.revisiontitle = e.StaffName + '减员修改'
        this.revisionitem = '社保停缴时间'
        this.revisiontdata = {
          date: new Date(e.EndYear, e.EndMonth - 1)
        }
        this.revisiontvisible = true
      }
    },
    // 保存人员
    saverevision (e) {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      let obj = {
        Id: this.Id,
        Type: this.tabidx,
        Year: e.Year,
        Month: e.Month,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      EditSiChange(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.revisiontvisible = false
          this.getTabelList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 从名单中移除
    removepersonnel (e, str) {
      const operating = this.$operatedata(this.operates, str)
      let obj = {
        Id: e.Id,
        Type: this.tabidx,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      let title = ''
      let message = ''
      // if (this.tabidx === 0) {
      //   message = `移除成功！（检测到该员工的社保缴纳状态为未缴纳时）
      //   当前客户已执行增员操作，请前往减员名单进行处理！（检测到该员工的社保缴纳状态为已缴纳时）`
      //   title = '从增员名单移除'
      // } else if (this.tabidx === 1) {
      //   message = '移除成功！（检测到该员工的社保缴纳状态为缴纳中时）'
      //   title = '从增员名单移除'
      // }
      // this.$alert(message, title, {
      //   confirmButtonText: '我知道了',
      //   customClass: 'erpconfirm one',
      //   callback: action => {
      //     this.$message({
      //       type: 'info',
      //       message: `action: ${action}`
      //     });
      //   }
      // });
      // return
      showLoading()
      DeleteSiChange(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          let title = ''
          let message = response.MessageContent
          if (this.tabidx === 0) {
            //   message = `移除成功！（检测到该员工的社保缴纳状态为未缴纳时）
            //   当前客户已执行增员操作，请前往减员名单进行处理！（检测到该员工的社保缴纳状态为已缴纳时）`
            title = '从增员名单移除'
          } else if (this.tabidx === 1) {
            //   message = '移除成功！（检测到该员工的社保缴纳状态为缴纳中时）'
            title = '从减员名单移除'
          }
          this.$alert(message, title, {
            confirmButtonText: '我知道了',
            customClass: 'erpconfirm one',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
            }
          });
          this.getTabelList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    closeSaverevision (val) {
      this.revisiontvisible = val
    },
    // 导出人员名单
    OpenStatements () {
      // 判断是否选择人员
      if (this.Ids.length) {
        let obj = {
          IdArr: this.Ids.join(','),
          Type: this.tabidx,
          menuid: MenuIdDate(),
          operationcode: 1
        }
        showLoading()
        DownloadSiChangeExcel(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            if (response.Data) {
              window.open(response.Data)
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '请选择导出的人员',
          type: 'warning'
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.social-security-officer-container {
  .search-bar {
    padding: 24px 24px 12px 24px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 12px;
      &:last-child {
        margin-right: 0;
      }
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
      margin-bottom: 16px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 20px;
    padding: 20px;
    border-radius: 0px 0px 0px 8px;
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