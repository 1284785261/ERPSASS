<!-- 代垫管理 -->
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <div class="search-bar clearfix">
        <div class="condition">
          <div class="search-name">所属年月</div>
          <el-date-picker @change="TimeChange(Datas)" value-format="yyyy-MM-dd HH:mm:ss" v-model="Datas" type="month" size="small" class="erpsearchinput" placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="condition">
          <div class="search-name">项目名称</div>
          <el-input class="erpsearchinput" placeholder="请输入所属项目名称" clearable v-model="projectName" size="small">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="querySelect" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">抵扣状态</div>
          <el-select class="erpsearchinput" size="small" clearable v-model="PaymentStatus">
            <el-option v-for="(item,idx) in PaymentCollectionStatus" :key="idx" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="condition">
          <!-- <el-input class="erpsearchinput" placeholder="请输入发票抬头/开户行账号/税务登记证号码进行查询" clearable size="small" v-model="ApplyUserName"></el-input> -->
          <el-button size="small" class="erpbtn" @click.native="querySelect">查询</el-button>
          <!-- @click="searchtable" -->
        </div>
      </div>
      <div class="tab2 clearfix">
        <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
      </div>
      <div class="table-content">

        <div class="operate-table">
          <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="batchtable" max-height="600" tooltip-effect="dark">
            <el-table-column align="center" prop="Id" min-width="100" fixed label="结算单号" />
            <el-table-column align="center" prop="ProjectName" min-width="150" label="所属项目" show-overflow-tooltip />
            <el-table-column align="center" prop="SettleName" label="对应结算单名称" min-width="200" show-overflow-tooltip />
            <el-table-column align="center" label="所属年月" min-width="110" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.Year}}年{{scope.row.Month}}月</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="TotalStaff" label="人数" min-width="55" />
            <el-table-column align="center" prop="ApplySysUserName" label="申请人" min-width="80" />
            <el-table-column align="center" prop="ApplyTime" label="申请时间" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.ApplyTime | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Amount" label="代垫金额" min-width="120">
              <template slot-scope="scope">
                <span>￥{{scope.row.Amount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="AmountCashed" label="已抵扣金额" min-width="120">
              <template slot-scope="scope">
                <span>￥{{scope.row.AmountCashed}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="NodeductionAmount" label="未抵扣金额" min-width="120">
              <template slot-scope="scope">
                <span>￥{{scope.row.NodeductionAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="OverdueInterest" label="资金占用费" min-width="120">
              <template slot-scope="scope">
                <span>￥{{scope.row.OverdueInterest}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="EstimatedCollectionTime" label="预计回款时间" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.EstimatedCollectionTime | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Status" label="抵扣状态" min-width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.Status==0">未抵扣</span>
                <span v-if="scope.row.Status==1">部分抵扣</span>
                <span v-if="scope.row.Status==2">已抵扣</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Agreement" label="代垫协议" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <a class="watchcode" @click="ShowAttachUrl(scope.row.Agreement)" target="_blank">{{scope.row.Agreement}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" @click="changeStatus(scope.row)">
                    <svg-icon icon-class="setting" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <!-- <el-dropdown-item v-if="StateReceivable==0?true:false" @click.native="AssociatedCollectionFlow(scope.row)">关联回款流水</el-dropdown-item> -->
                      <el-dropdown-item v-if="$operatebtn(operates, 'Query')" @click.native="ViewingAssociatedRecords(scope.row,'Query')">代垫抵扣记录</el-dropdown-item>
                      <!-- <el-dropdown-item v-if="$operatebtn(operates, 'Query')"  @click.native="CalculateCapitalOccupancyCharges(scope.row,'View')">查看资金占用费</el-dropdown-item> -->
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagina-fonter">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import {
  AddSubstituteCushion,
  GetSubstituteCushionPageList,
  GetSubstituteCushionEnumSettleType,
  AddSubstituteCushionProjectMoneyDraw,
  GetSubstituteCushionProjectMoneyDrawList,
  RevokeSubstituteCushionProjectMoneyDraw,
} from '@/api/CompensationServiceManagement.js'
import { GetAvailableProjectMoneyDrawPageList } from '@/api/projectManagement.js'
import axios from 'axios'
import qs from 'qs'
import {
  MenuIdDate,
  uuid,
  showLoading,
  hideLoading,
} from '@/utils/CustomValidation'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import filters from '@/utils/filters'
export default {
  components: {
    PreviewFile,
  },
  data() {
    return {
      tablist: [
        {
          value: 0,
          describe: '全部',
        },
      ],
      PaymentCollectionStatus: [
        {
          value: -1,
          describe: '全部',
        },
        {
          value: 0,
          describe: '未抵扣',
        },
        {
          value: 1,
          describe: '部分抵扣',
        },
        {
          value: 2,
          describe: '已抵扣',
        },
      ],
      PaymentStatus: -1,
      ApplyUserName: '',
      StateReceivable: 0,
      tableloading: false,
      projectName: '',
      Datas: '',
      receivableState: '',
      IptStatus: -1,
      batchtable: [],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      tabidx: 0,
      optionList: [],
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: '',
        OperationCode: 'Query',
      },
      showSixtoDeduct: true,
      moneys: [],
      dynamicValidateForm: {
        domains: [
          {
            value: '',
            Id: '',
            fileUrl: '',
          },
        ],
      },
      isImg: 1,
      previewFileUrl: '',
      titlename: '代垫协议预览',
      iframeShow: false,
      IptText: '',
      SubstituteCushionId: '',
      filestype: '',
      Files: '',
    }
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      console.log(this.$route)
      if (this.$route.query.ProjectName) {
        this.projectName = this.$route.query.ProjectName
        this.tabidx = this.$route.query.Type
        this.GetSubstituteCushionPageList()
      } else {
        this.GetSubstituteCushionPageList()
      }

      this.GetSubstituteCushionEnumSettleType()
    }
  },
  methods: {
    //添加输入框
    addDomain() {
      let money = ''
      let id = ''
      this.dynamicValidateForm.domains.forEach((data) => {
        money = data.value
        id = data.Id
        // if(data.value==''|| data.Id=='' || data.value==0){
        //    this.$message({
        //      type:'warning',
        //      message:'请完善信息后再次添加'
        //    })
        // }else{
        //   money=data.value
        //   id=data.Id
        // }
      })
      if (money == '' || money == 0 || id == '') {
        this.$message({
          type: 'warning',
          message: '请完善信息后添加',
        })
      } else if (
        this.dynamicValidateForm.domains.length < this.optionList.length
      ) {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now(),
          Id: '',
          fileUrl: '',
        })
      }
    },
    //输入金额
    moneyChanges(e) {
      let MaxNum = 0
      let total = 0
      let lastIdx = null
      this.optionList.forEach((data) => {
        if (data.Id == e.Id) {
          MaxNum = data.AvailableAmount
        }
      })
      console.log(MaxNum)
      if (this.dynamicValidateForm.domains) {
        this.dynamicValidateForm.domains.forEach((data) => {
          if (data.Id == e.Id) {
            total += Number(data.value)
            if (this.dynamicValidateForm.domains.lastIndexOf(e) != -1) {
              lastIdx = e
            }
          }
        })
        if (e.Id != '') {
          if (e.value <= 0) {
            e.value = 1
            this.$message({
              message: '最小的输入金额为1',
              type: 'warning',
            })
          }
          if (MaxNum < total) {
            this.$message({
              message: '输入金额不能大于代垫金额',
              type: 'warning',
            })
            lastIdx.value = Number(lastIdx.value) + (MaxNum - total)
            console.log(lastIdx.value)
          }
        } else {
          this.$message({
            message: '请先选择已认领回款流水',
            type: 'warning',
          })
        }
      }
      //   let num=0
      //  if(this.dynamicValidateForm.domains!=null){
      //     this.dynamicValidateForm.domains.forEach(data=>{
      //        num+=Number(data.value)
      //     })
      //       console.log(num);
      //       console.log(this.IptText);
      //  }
      //  if(num>this.IptText){
      //    let sum=0
      //    let ask=this.IptText
      //   this.dynamicValidateForm.domains.forEach(data=>{
      //      sum=(ask-=data.value)
      //      if(sum<=0){
      //    let lng=this.dynamicValidateForm.domains.length
      //    let aaa= Number(this.dynamicValidateForm.domains[lng-1].value)+Number(sum)
      //    if(aaa<0){
      //      this.dynamicValidateForm.domains.pop()
      //    }
      //    let leng=this.dynamicValidateForm.domains.length
      //    this.dynamicValidateForm.domains[leng-1].value=aaa
      //      }
      //    })
      //     this.$message({
      //       message: '输入金额不能大于可用金额',
      //       type: 'warning'
      //     })
      //  }else{

      //  }
    },
    //切换项目
    SelectChange(idx, id) {
      this.optionList.forEach((data) => {
        data.disabled = false
        for (var i = 0; i < this.dynamicValidateForm.domains.length; i++) {
          if (this.dynamicValidateForm.domains[i].Id == data.Id) {
            data.disabled = true
          }
        }
      })
      console.log(this.optionList)
    },
    //获取可用项目回款认领分页列表
    GetAvailableProjectMoneyDrawPageList(data) {
      let obj = {
        ProjectId: data.ProjectId,
        Year: 0,
        Month: 0,
        PageIndex: 1,
        PageSize: 99,
        Sign: '',
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode,
      }
      GetAvailableProjectMoneyDrawPageList(obj).then((res) => {
        if (res.IsSuccess) {
          if (res.Data != '') {
            this.optionList = res.Data
          } else {
            this.optionList = []
          }
        }
      })
    },
    ShowAttachUrl(e) {
      if (e) {
        const ext = e.slice(e.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = e
        } else if (
          ext == 'doc' ||
          ext == 'docx' ||
          ext == 'xlsx' ||
          ext == 'xls'
        ) {
          this.isImg = 3
          this.previewFileUrl =
            'https://view.officeapps.live.com/op/view.aspx?src=' + e
        } else {
          this.isImg = 1
          this.previewFileUrl = e
        }
        this.iframeShow = true
      }
    },
    //关闭预览
    closeFileShow(val) {
      this.iframeShow = val
    },
    //保存
    dialogtrue() {
      let str = 0
      this.dynamicValidateForm.domains.forEach((data) => {
        let obj = {
          SubstituteCushionId: this.SubstituteCushionId,
          ProjectMoneyDrawId: data.Id,
          AmountCashed: data.value,
          Annex: data.fileUrl,
          menuid: MenuIdDate(),
          operationcode: '1',
        }
        if (data.Id != '' && data.value != '' && data.value != 0) {
          str++
        } else {
          str--
        }
        if (str == this.dynamicValidateForm.domains.length) {
          AddSubstituteCushionProjectMoneyDraw(obj).then((res) => {
            if (res.IsSuccess) {
              this.showSixtoDeduct = false
              this.dynamicValidateForm = {
                domains: [
                  {
                    value: '',
                    Id: '',
                    fileUrl: '',
                  },
                ],
              }
              this.$message({
                type: 'success',
                message: '添加成功',
              })
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请完善信息后保存',
          })
        }
      })
    },
    //改变状态
    changeStatus(e) {
      this.StateReceivable = e.Status
      this.SubstituteCushionId = e.Id
    },
    choosetab(e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.GetSubstituteCushionPageList()
      }
    },
    //搜索
    querySelect() {
      this.currentPage = 1
      let str = '未回款'
      let str1 = '已回款'
      if (this.receivableState != '') {
        if (str.indexOf(this.receivableState) != -1) {
          this.IptStatus = 0
        } else if (str1.indexOf(this.receivableState) != -1) {
          this.IptStatus = 1
        } else {
          this.IptStatus = -2
        }
      } else {
        this.IptStatus = -1
      }
      showLoading()
      this.GetSubstituteCushionPageList()
      hideLoading()
    },
    // 搜索批次列表
    // sratchbatch () {
    //   this.currentPage = 1
    // },
    //选择日期
    TimeChange(data) {
      console.log(data)
    },
    //关联回款流水
    AssociatedCollectionFlow(data) {
      this.showSixtoDeduct = true
      this.GetAvailableProjectMoneyDrawPageList(data)
    },
    //查看关联记录
    ViewingAssociatedRecords(data, str) {
      this.$router.push({
        path: '/CompensationServiceManagement/CollectionFlowRecord',
        query: {
          Id: data.Id,
        },
      })
    },
    //计算资金占用费
    // CalculateCapitalOccupancyCharges(data,str){
    //    const operating = this.$operatedata(this.operates, str)
    //   localStorage.setItem('operating', JSON.stringify(operating))
    //   this.$router.push({
    //     path: '/CompensationServiceManagement/DetailsCapitalCupancyExpenses',
    //     query: {
    //       Id: data.Id
    //     }
    //   })
    // },
    //获取代垫结算类型
    GetSubstituteCushionEnumSettleType() {
      let obj = {
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode,
      }
      GetSubstituteCushionEnumSettleType(obj).then((res) => {
        if (res) {
          res.map((data) => {
            this.tablist.push(data)
          })
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent,
          })
        }
      })
    },
    GetSubstituteCushionPageList() {
      let obj = {
        YearMonth: this.Datas,
        ProjectName: this.projectName,
        Status: this.PaymentStatus,
        SettleType: this.tabidx,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Sign: '',
        menuid: this.operatiOBj.menuid || MenuIdDate(),
        operationcode: this.operatiOBj.OperationCode || '1',
      }
      GetSubstituteCushionPageList(obj).then((response) => {
        if (response.IsSuccess) {
          if (response.Data != null) {
            this.batchtable = response.Data
            for (let i = 0; i < this.batchtable.length; i++) {
              this.batchtable[i].NodeductionAmount = parseFloat(
                this.batchtable[i].Amount - this.batchtable[i].AmountCashed
              )
            }
            this.total = response.Total
          } else {
            this.batchtable = []
            this.total = 0
          }
        }
      })
    },
    // 选择分页大小
    handleSizeChange(val) {
      this.PageSize = val
      // this.GetFinanceInvoiceTitlePageList()
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.currentPage = val
      // this.GetFinanceInvoiceTitlePageList()
    },
  },
}
</script>
<style lang="scss">
@import '@/styles/publicStyle.scss';
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
.table-content {
  .forms {
    /deep/ .el-form-item {
      .el-form-item__label {
        width: 50%;
        text-align: left;
        line-height: 24px;
        color: #666666;
      }
      /deep/.el-form-item__content {
        margin-left: 10px !important;
        font-size: 12px !important;

        .el-select {
          display: block;
          width: 400px;
          .el-input__suffix {
            top: 24px;
            height: 40px;
          }
        }
      }
    }
    /deep/ .State {
      .el-radio-group {
        display: block;
        margin-top: 40px;
        label {
          &:nth-child(1) {
            margin-right: 60px;
          }
        }
      }
    }
    /deep/ .Date {
      .el-date-editor {
        width: 100%;
      }
      .el-input__inner {
        border: none;
        background: $erinputbgc;
      }
    }
    .upload-bts {
      position: absolute;
      right: 0;
      top: 24px;
      z-index: 10;
      background: #1588f8;
      button {
        padding: 12px 19px;
      }
    }
    .downloadBtn {
      color: #1588f8;
    }
  }
}
.dialog-box {
  // 附件上传样式
  .file {
    .upload {
      position: relative;
      height: 120px;
      img {
        position: absolute;
        left: 0;
        top: 0;
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 160px;
        height: 120px;
        opacity: 0;
        cursor: pointer;
        &::-webkit-file-upload-button {
          height: 0;
        }
      }
      .files {
        width: 160px;
        height: 120px;
        background: #f2f3fb;
        border-radius: 8px;
        text-align: center;
        position: relative;
        float: left;
        margin-right: 24px;
        margin-bottom: 24px;
        .filestype {
          display: inline-block;
          width: 56px;
          height: 32px;
          background: #1588f8;
          font-size: 14px;
          color: #fff;
          border-radius: 8px;
          text-align: center;
          line-height: 32px;
          position: absolute;
          left: 0;
          top: 0;
        }
        p {
          width: 110px;
          position: absolute;
          top: 38%;
          left: 50%;
          font-size: 14px;
          line-height: 18px;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
          text-align: center;
        }
        .option-button {
          width: 100%;
          height: 30px;
          position: absolute;
          bottom: 0;
          left: 0;
          background: #909198;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          a {
            cursor: pointer;
            width: 50%;
            display: inline-block;
            line-height: 30px;
            text-align: center;
            height: 30px;
            font-size: 14px;
            color: #fff;
            vertical-align: top;
            &:hover {
              color: #1588f8;
            }
            .replaceFile {
              width: 80px;
              height: 30px;
            }
          }
        }
      }
      .prompt {
        float: left;
        width: 300px;
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
        margin-left: 17px;
      }
    }
  }
}
.tip {
  width: 600px;
  font-size: $f14;
  color: $erp999;
}
</style>