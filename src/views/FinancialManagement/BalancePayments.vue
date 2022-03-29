<!-- 收款管理 -->
<template>
  <div class="social-security-management-container">
    <div class="search-bar clearfix" v-if="!ShowclaimList">
      <div class="condition">
        <div class="search-name">打款客户</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入打款客户查询" size="small" v-model="searchform.CompanyName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">收款企业</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入收款企业查询" size="small" v-model="searchform.BfCompanyName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">添加流水人</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入添加流水人查询" size="small" v-model="searchform.SysUserName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">收款银行账号</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入收款银行账号查询" size="small" v-model="searchform.Account" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="search-bar clearfix" v-if="ShowclaimList">
      <div class="condition">
        <div class="search-name">查询</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入认领人/项目进行查询" size="small" v-model="searchform.Name">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchClaimSituation">查询</el-button>
      </div>
    </div>
    <!-- <div class="tab2 clearfix tabs" v-if="!ShowclaimList">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
    </div> -->
    <div class="content">
      <div class="operate-top" v-if="!ShowclaimList">
        <el-button size="small" v-if="$operatebtn(operates, 'Delete')" class="del-button" @click="Deletewater('Delete')">删除流水</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Import')" class="erpbtn" @click="importwater('Import')">导入流水</el-button>
        <el-button size="small" class="erpbtn" @click="OpenAddCollection('Add')">添加收款流水</el-button>
        <!-- <el-button size="small" class="erpbtn" @click="OpenAddMoneyRecord('Add')">添加补贴回款</el-button> -->
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-top" v-if="ShowclaimList">
        <el-button size="small" class="erpbtn" @click="returnSn">返回</el-button>
      </div>
      <div class="operate-table" v-if="!ShowclaimList">
        <el-table ref="multipleTable" class="erp-table" key="table1" v-loading="tableloading" :data="MoneyRecordList" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" min-width="55" label="全选" fixed="left" />
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" min-width="55" label="序号" />
          <el-table-column align="center" v-if="$getColumsFlag('Sn',checkboxVal)" prop="Sn" label="银行流水号" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.Sn}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Amount',checkboxVal)" prop="Amount" label="流水金额" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.Amount | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('CompanyAccount',checkboxVal)" prop="CompanyAccount" label="打款账号" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.CompanyAccount}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('CompanyName',checkboxVal)" prop="CompanyName" label="打款客户" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('CompanyBankName',checkboxVal)" prop="CompanyBankName" label="打款客户银行名称" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BankName',checkboxVal)" prop="BankName" label="收款银行名称" min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('Account',checkboxVal)" prop="Account" label="收款银行账号" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="收款企业" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Remark',checkboxVal)" prop="Remark" label="备注" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SysUserName',checkboxVal)" prop="SysUserName" label="添加人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('PayTime',checkboxVal)" prop="PayTime" label="到账时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.PayTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="添加时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StatusText',checkboxVal)" prop="StatusText" label="状态" min-width="120" />
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="scope.row.Status != '1' && $operatebtn(operates, 'Modify')" @click.native="EditAddCollection(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookClaimSituation(scope.row,'View')">查看认领情况</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-table" v-if="ShowclaimList">
        <el-table ref="multipleTable" class="erp-table" key="table2" v-loading="tableloading" :data="ClaimSituationList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Id" width="55" label="序号" />
          <el-table-column align="center" prop="ProjectName" label="所属项目" />
          <!-- <el-table-column align="center" prop="MoneyRecordAmount" label="领款金额">
            <template slot-scope="scope">
              <span>{{scope.row.Amount | MoneyUnit}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="Year" label="入账年月">
            <template slot-scope="scope">
              <span>{{scope.row.Year}}/{{scope.row.Month | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Amount" label="领款金额">
            <template slot-scope="scope">
              <span>{{scope.row.Amount | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Remark" label="备注说明" />
          <el-table-column align="center" prop="AddTime" label="领款时间">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AddSysUserName" label="领款人" />
          <el-table-column align="center" prop="Status" label="领款状态">
            <template slot-scope="scope">
              <span v-if="scope.row.Status == '0'">已领款</span>
              <span v-if="scope.row.Status == '1'">已撤销</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

      <!-- 添加回款 -->
      <AddCollection :showAddCollection="showAddCollection" :tempData="tempData" :CollectionTitle="CollectionTitle" @AddCollectionSave="AddCollectionSave" @closeAddCollection="closeAddCollection"></AddCollection>
    </div>
    <div class="dialog">
      <el-dialog :close-on-click-modal="false" title="导入流水" :visible.sync="importvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <div class="select-box">
          <el-select v-model="MoneyRecordType" placeholder="请选择导入模式">
            <el-option v-for="item in confirms" :key="item.MoneyRecordType" :label="item.title" :value="item.MoneyRecordType"></el-option>
          </el-select>
        </div>
        <div class="file-box">
          <div class="title">选择文件</div>
          <div class="file">
            <div class="img-box-list" v-if="!files">
              <!-- 未上传样式 -->
              <input type="file" ref="upload" accept=".xls,.xlsx" name="" id="" @change="uploadfile">
              <div class="img-box">
                <img src="@/assets/down.png" alt="">
              </div>
            </div>
            <div class="img-box-list" v-if="files" @mouseenter="filterdata.visible=!filterdata.visible" @mouseleave="filterdata.visible=!filterdata.visible">
              <div class="img-box">
                <span class="filetype">{{filterdata.type}}</span>
                <div class="filename" :title="filterdata.name">{{filterdata.name}}</div>
              </div>
              <div class="img-box-hover" v-show="filterdata.visible==true">
                <div class="btn">
                  <input type="file" accept=".xls,.xlsx" name="" id="" @change="uploadfile($event)">
                  <svg-icon icon-class="replace" class-name="svg-a" />
                  <span>替换</span>
                </div>
                <div class="btn" @click="deletefile()">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div>
              </div>
            </div>
            <div class="downimport" @click="downemployees">点击下载导入模板</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveimport">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="部分导入失败提示" :visible.sync="reportvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closereport">
        <div class="error-box">
          <div class="error-top">
            <!-- <div class="success-total">成功 {{errordata.Successes}}</div> -->
            <div class="error-total">文件导入失败 <span>{{errordata.Errors}}</span> 条</div>
          </div>
          <div class="error-content">
            <div class="row" v-for="(item, index) in errordata.ImportMoneyRecordErrorList" :key="index">
              <div class="index">第{{item.Rows}}条</div>
              <div class="con">{{item.Message}}</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="reportvisible=!reportvisible">修改后重新导入</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetMoneyRecordPageList, AddMoneyRecord, EditMoneyRecord, GetMoneyRecordInfo, GetMoneyRecordExcelModel, ImportMoneyRecordExcel, DeleteMoneyRecord ,GetMoneyRecordClaimList} from '@/api/FinancialManagement.js'
import { GetProjectMoneyDrawPageList } from '@/api/projectManagement.js'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import AddCollection from './components/AddCollection.vue'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    AddCollection,
    ScreeningComponent
  },
  data () {
    return {
      tablist: [{
        value: 0,
        describe: '全部'
      }, {
        value: 1,
        describe: '收款'
      }, {
        value: 2,
        describe: '补贴'
      }],
      searchform: {
        CompanyName: '',
        BfCompanyName: '',
        SysUserName: '',
        Name: '',
        MoneyRecordId: '',
        Account: ''
      },
      MoneyRecordType: null,
      confirms: [{
        title: '导入收款流水',
        MoneyRecordType: 1,
      }, {
        title: '导入补贴回款',
        MoneyRecordType: 2,
      }],
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "Id" },
        { label: "银行流水号", prop: "Sn" },
        { label: "流水金额", prop: "Amount" },
        { label: "打款账号", prop: "CompanyAccount" },
        { label: "打款客户", prop: "CompanyName" },
        { label: "打款客户银行名称", prop: "CompanyBankName" },
        { label: "收款银行名称", prop: "BankName" },
        { label: "收款银行账号", prop: "Account" },
        { label: "收款企业", prop: "BfCompanyName" },
        { label: "备注", prop: "Remark" },
        { label: "添加人", prop: "SysUserName" },
        { label: "到账时间", prop: "PayTime" },
        { label: "添加时间", prop: "AddTime" },
        { label: "状态", prop: "StatusText" },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      DetailId:'',
      MoneyRecordList: [],
      ClaimSituationList: [],
      tableloading: false, // 加载动画
      showAddCollection: false,
      CollectionTitle: '',
      tempData: {},
      ShowclaimList: false,
      tabidx: 0,
      MoneyRecordTypeIdx: 0,
      importvisible: false, // 导入员工弹框
      filterdata: { // 上传的文件
        type: '',
        name: '',
        visible: false
      },
      checked: false,
      multipleSelection: [],
      files: null, // 文件
      reportvisible: false, // 上传报告
      errordata: {}, // 错误信息
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    // 获取页面权限
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
	  console.log('获取页面权限',this.operates)
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getMoneyRecord(this.operatiOBj)
	  
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods: {
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    ChangeStatusAll () {
      this.getMoneyRecord(this.operatiOBj)
    },
    ChangeStatusCollection () {

    },
    searchtable () {
      this.currentPage = 1
      this.getMoneyRecord(this.operatiOBj)
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      if (this.ShowclaimList) {
        this.searchClaimSituation()
      } else {
        this.getMoneyRecord(this.operatiOBj)
      }

    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.ShowclaimList) {
        this.searchClaimSituation()
      } else {
        this.getMoneyRecord(this.operatiOBj)
      }
    },
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        if (e.value == 0) {
          this.MoneyRecordTypeIdx = 0
          this.getMoneyRecord(this.operatiOBj)
        } else if (e.value == 1) {
          this.MoneyRecordTypeIdx = 1
          this.getMoneyRecord(this.operatiOBj)
        } else if (e.value == 2) {
          this.MoneyRecordTypeIdx = 2
          this.getMoneyRecord(this.operatiOBj)
        }
      }
    },
    //获取收款列表数据
    getMoneyRecord (operat) {
      this.tableloading = true
      let data = {
        CompanyId: '',
        CompanyName: this.searchform.CompanyName,
        BfCompanyName: this.searchform.BfCompanyName,
        SysUserName: this.searchform.SysUserName,
        Account: this.searchform.Account,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        MoneyRecordType: this.MoneyRecordTypeIdx,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetMoneyRecordPageList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.MoneyRecordList = response.Data
            this.total = response.Total
			console.log('MoneyRecordList',this.MoneyRecordList)
			console.log('total',this.total)
          } else {
            this.MoneyRecordList = []
            this.total = 0
          }
        } else {
          this.MoneyRecordList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //打开添加收款流水
    OpenAddCollection (str) {
      this.CollectionTitle = '添加收款流水'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showAddCollection = true
    },
    //添加补贴回款
    OpenAddMoneyRecord (str) {
      this.CollectionTitle = '添加补贴回款'
	  console.log('operates',this.operates)
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showAddCollection = true
    },
    //修改收款流水
    EditAddCollection (data, str) {
      this.CollectionTitle = '修改收款流水'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetMoneyRecordInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showAddCollection = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存收款流水
    AddCollectionSave (data) {
      data.menuid = MenuIdDate(),
        data.operationcode = '1'
      // const operating = JSON.parse(localStorage.getItem('operating')) || {}
      // data.menuid = operating.MenuId
      // data.operationcode = operating.OperationCode
      if (data.Id) {
        showLoading()
        EditMoneyRecord(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改收款流水成功!'
            })
            this.showAddCollection = false
            this.getMoneyRecord(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        showLoading()
        AddMoneyRecord(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            if (data.MoneyRecordType == 1) {
              this.$message({
                type: 'success',
                message: '添加收款流水成功!'
              })
            } else {
              this.$message({
                type: 'success',
                message: '添加补贴回款成功!'
              })
            }
            this.showAddCollection = false
            this.getMoneyRecord(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    Deletewater (str) {
      if (this.multipleSelection.length) {
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].Id)
        }
        const operating = this.$operatedata(this.operates, str)
        const obj = {
          IdArr: arr.join(','),
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        this.$confirm('此操作将批量删除选中的收款流水', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteMoneyRecord(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getMoneyRecord(this.operatiOBj)
            } else {
              this.$message({
                type: 'error',
                dangerouslyUseHTMLString: true,
                // message: response.MessageContent
                message: '<div class="message-boxs">' + response.MessageContent + '</div>'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的收款流水'
        })
      }
    },
    // 关闭收款流水
    closeAddCollection (val) {
      this.showAddCollection = val
    },
    returnSn () {
      this.ShowclaimList = false
      this.currentPage = 1
      this.getMoneyRecord(this.operatiOBj)
    },
    searchClaimSituation () {
      this.GetMoneyRecordClaimList()
    },
    GetMoneyRecordClaimList(){
        let obj = {
        Id:this.DetailId,
        Name:this.searchform.Name,
        PageIndex:this.currentPage,
        PageSize:this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetMoneyRecordClaimList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ClaimSituationList = response.Data
            this.total = response.Total
            this.ShowclaimList = true
          } else {
            this.ClaimSituationList = []
            this.$message({
              message: '暂无认领情况记录',
              type: 'error'
            })
          }

        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //查看认领情况
    LookClaimSituation (data) {
      // this.searchform.MoneyRecordId = data.Id
      this.DetailId=data.Id
      this.GetMoneyRecordClaimList()
    },

    // 导入流水
    importwater (op) {
      // 操作码
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.importvisible = true
    },
    // 下载模板
    downemployees () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetMoneyRecordExcelModel(qs.stringify(obj)).then(response => {
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
    },
    closedialog () {
      this.importvisible = false
      this.files = null
    },
    uploadfile (e) {
      this.files = e.target.files[0]
      this.filterdata = {
        type: 'Excel',
        name: this.files.name,
        visible: false
      }
    },
    // 删除
    deletefile () {
      this.files = null
      this.filterdata = {
        type: '',
        name: '',
        visible: false
      }
    },
    // 导入流水
    saveimport () {
      let operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      if (this.files) {
        var obj = new FormData()
        obj.append('file', this.files)
        // obj.append('menuid', operating.MenuId)
        // obj.append('operationcode', operating.OperationCode)
        obj.menuid = operating.MenuId;
        obj.operationcode = operating.operationcode;
        obj.append("MoneyRecordType", this.MoneyRecordType)
        console.log(obj);
        showLoading()
        ImportMoneyRecordExcel(obj).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
              this.getMoneyRecord(this.operatiOBj)
            } else {
              this.errordata = response.Data
              this.reportvisible = true
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
          message: '请选择文件',
          type: 'warning'
        })
      }
    },
    // 关闭导入信息
    closereport () {
      this.reportvisible = false
      if (this.errordata.Successes) {
        this.getMoneyRecord(this.operatiOBj)
      }
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.MoneyRecordList.length
      this.multipleSelection = value
    }
  }
}
</script>
<style lang="scss">
.social-security-management-container {
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
    margin-bottom: 16px;
  }
  .content {
    background-color: #fff;
    margin-left: 20px;
    padding: 20px;
    border-radius: 8px 0px 0px 8px;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
    .tabs {
      float: left;
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
.erpdialog {
  .file-box {
    padding: 0 120px;
    .title {
      font-size: $f14;
      color: $erp333;
      line-height: 28px;
    }
    .file {
      .img-box-list {
        position: relative;
        > input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 99;
        }
        .img-box {
          width: 160px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
          background-color: $erinputbgc;
          position: relative;
          .filetype {
            position: absolute;
            background-color: $erpcolor;
            padding: 10px 12px;
            font-size: $f14;
            line-height: 14px;
            color: #fff;
            border-radius: 8px;
          }
          .filename {
            font-size: $f14;
            color: $erp666;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 110px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            transform: translate(-50%, -50%);
          }
        }
        > .img-box-hover {
          position: absolute;
          width: 100%;
          height: 30px;
          background-color: #909198;
          bottom: 0;
          display: flex;
          justify-content: center;
          border-radius: 0 0 8px 8px;
          .btn {
            position: relative;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            width: 50%;
            > input {
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              cursor: pointer;
            }
            .svg-icon {
              color: #fff;
              margin-right: 10px;
              font-size: $f14;
            }
            > span {
              font-size: $f14;
              color: #fff;
              cursor: pointer;
            }
            &:hover {
              .svg-icon {
                color: #1588f8;
              }
              span {
                color: #1588f8;
              }
            }
          }
        }
      }
      .downimport {
        font-size: $f14;
        color: $erpcolor;
        cursor: pointer;
      }
    }
  }
  .error-box {
    .error-top {
      margin-bottom: 24px;
      .error-total {
        font-size: $f14;
        color: $erp333;
        > span {
          color: $erpred;
        }
      }
    }
    .error-content {
      // margin-bottom: 24px;
      .row {
        line-height: 20px;
        margin-bottom: 24px;
        min-height: 20px;
        display: flex;
        color: $erp999;
        .index {
          width: 48px;
        }
        .con {
          color: $erp999;
          flex: 1;
        }
      }
    }
  }
}
.select-box {
  width: 100%;
  height: auto;
  text-align: center;
}
.message-boxs {
  line-height: 24px;
}
</style>