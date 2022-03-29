<!-- 法大大账号管理 -->
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <div class="search-bar clearfix">
        <div class="condition" v-if="tabidx == 2">
          <div class="search-name">账户类型</div>
          <el-select class="erpsearchinput" size="small" clearable v-model="SelectData.type">
            <el-option v-for="(item,idx) in AccountType" :key="idx" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="condition">
          <div class="search-name">认证状态</div>
          <el-select class="erpsearchinput" size="small" clearable v-model="SelectData.authenStatus">
            <el-option v-for="(item,idx) in authenStatusList" :key="idx" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="condition">
          <!-- <div class="search-name">所属年月</div> -->
          <el-input class="erpsearchinput" placeholder="请输入员工编号/姓名/客户编号进行查询" clearable size="small" v-model="SelectData.key" style="width:300px;"></el-input>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click.native="querySelect">查询</el-button>
        </div>
      </div>
      <div class="tab2 clearfix tabs">
        <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
      </div>
      <div class="content">
        <div class="operate-top" v-if="tabidx == 1">
          <el-button size="small" class="erpbtn" @click="OpenApplicationRegistration('Add')">申请注册</el-button>
        </div>
        <div class="operate-table">
          <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="batchtable" max-height="600" tooltip-effect="dark">
            <el-table-column align="center" prop="Id" min-width="100" fixed label="编号" />
            <el-table-column align="center" prop="ObjCode" min-width="150" label="ERP账号" v-if="tabidx == 1" />
            <el-table-column align="center" prop="ObjCode" min-width="150" label="员工编号" v-if="tabidx == 2" />
            <el-table-column align="center" prop="ObjName" label="姓名" min-width="200" />
			<el-table-column align="center" prop="BfCompanyName" label="认证公司" min-width="200" v-if="tabidx == 1"/>
            <el-table-column align="center" label="账户类型" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.Type | Type}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="CustomerId" label="客户编号" min-width="200" show-overflow-tooltip />
			<el-table-column align="center" prop="Mobile" label="认证手机号" min-width="200" show-overflow-tooltip />
            <el-table-column align="center" prop="AuthenUrl" label="认证链接" min-width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                <a @click="OpenAuthen(scope.row)" style="color:#1588F8;" v-if="scope.row.AuthenUrl">点击跳转链接</a>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="TransactionNo" label="交易号" min-width="120" show-overflow-tooltip />
            <el-table-column align="center" prop="AuthenStatus" label="认证状态" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.AuthenStatus | AuthenStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="AuthenResult" label="认证失败原因" min-width="150">
              <template slot-scope="scope">
                <span>{{scope.row.AuthenResult}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="NotifyTime" label="认证时间" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.NotifyTime | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="80" v-if="tabidx == 1">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="setting" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <el-dropdown-item v-if="$operatebtn(operates, 'Query') && scope.row.AuthenStatus == 1" @click.native="RealNameAuthentication(scope.row,'Query')">发送认证短信</el-dropdown-item>
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagina-fonter">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile> -->
    <!-- 申请注册 -->
    <ApplicationRegistration :showRegistration="showRegistration" @RegistrationSave="RegistrationSave" @CloseRegistration="CloseRegistration"></ApplicationRegistration>
  </div>
</template>
<script>
import { GetFDDAccount, AddSubstituteCushionProjectMoneyDraw } from '@/api/CompensationServiceManagement.js'
import { AddFDDAccount, GetFDDAccountList } from '@/api/SystemSetting.js'
import { SendPhoneVerification } from '@/api/Public.js'
import ApplicationRegistration from './components/ApplicationRegistration.vue'
import { MenuIdDate, uuid, showLoading, hideLoading, } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    ApplicationRegistration
  },
  data () {
    return {
      SelectData: {
        key: '',
        type: '',
        authenStatus: '',
        objType: '',
      },
      tablist: [{
        value: 1,
        describe: '内部账号'
      }, {
        value: 2,
        describe: '外部账号'
      }],
      AccountType: [{
        value: 1,
        describe: '个人'
      }, {
        value: 2,
        describe: '企业'
      }],
      authenStatusList: [{
        value: 1,
        describe: '待认证'
      }, {
        value: 2,
        describe: '认证通过'
      }, {
        value: 3,
        describe: '认证不通过'
      }],
      batchtable: [],
      tableloading: false,
      currentPage: 1,
      PageSize: 10,
      total: 0,
      tabidx: 1,
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
      dynamicValidateForm: {
        domains: [{
          value: '',
          Id: '',
          fileUrl: ''
        }],
      },
      showRegistration: false,
      SubstituteCushionId: ''
    }
  },
  filters: {
    Type (value) {
      let msg = ''
      switch (value) {
        case 1: msg = '个人'; break
        case 2: msg = '企业'; break
      }
      return msg
    },
    AuthenStatus (value) {
      let msg = ''
      switch (value) {
        case 1: msg = '待认证'; break
        case 2: msg = '认证通过'; break
        case 3: msg = '认证不通过'; break
      }
      return msg
    }
  },
  created () {
    if (this.$route.meta.operations) {
      console.log(this.$route.meta)
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetFDDAccount()
    }
  },
  methods: {
    //保存
    RegistrationSave (data) {
      console.log(data)
      let obj = data
      obj.menuid = MenuIdDate()
      obj.operationcode = '1'
      showLoading()
      AddFDDAccount(qs.stringify(obj)).then(res => {
        hideLoading()
        if (res.MessageCode == 0) {
          this.$message({
            type: 'success',
            message: '申请注册法大大成功!'
          })
          this.showRegistration = false
          this.GetFDDAccount()
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent
          })
        }
      })
    },
    CloseRegistration (e) {
		console.log(e)
      this.showRegistration = false
    },
    //打开认证链接
    OpenAuthen (e) {
		console.log(e)
      window.open(e.AuthenUrl)
    },
    choosetab (e) {
      // 防止重复点击
	  console.log(e)
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.GetFDDAccount()
      }
    },
    //搜索
    querySelect () {
      this.currentPage = 1
      this.GetFDDAccount()
    },
    //申请注册
    OpenApplicationRegistration (data, str) {
      this.showRegistration = true
    },
    //实名认证
    RealNameAuthentication (data, str) {
      console.log(data)
      let param = {
        Mobile: data.Mobile,
        Type: 2,
        Content: data.AuthenUrl,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      SendPhoneVerification(qs.stringify(param)).then(response => {
        hideLoading()
        if (response.IsSuccess && response.MessageCode == 0) {
          this.$message({
            type: 'success',
            message: '申请实名认证的链接已发送至账号绑定的手机号上!'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    GetFDDAccount () {
      let obj = {
        key: this.SelectData.key,
        type: this.SelectData.type,
        authenStatus: this.SelectData.authenStatus,
        objType: this.tabidx,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Sign: "",
        menuid: this.operatiOBj.menuid || MenuIdDate(),
        operationcode: this.operatiOBj.OperationCode || '1'
      }
      this.tableloading = true
      GetFDDAccountList(obj).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data != null) {
            this.batchtable = response.Data
            this.total = response.Total
			console.log('batchtable',this.batchtable)
          } else {
            this.batchtable = []
            this.total = 0
          }
        }
      })
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      // this.GetFinanceInvoiceTitlePageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      // this.GetFinanceInvoiceTitlePageList()
    },
  }
}
</script>
<style lang="scss">
@import "@/styles/publicStyle.scss";
.search-bar {
  padding: 24px 24px 12px 24px;
  // height: 80px;
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
.content {
  background-color: #fff;
  margin-left: 20px;
  padding: 20px;
  border-radius: 8px 0px 0px 8px;
  .tabs {
    float: left;
  }
}
.operate-top {
  float: right;
  margin-bottom: 16px;
}
</style>