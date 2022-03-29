<!-- 渠道管理 -->
<template>
  <div class="recruitment-detail-management-container">
    <!-- 查询头部 -->
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">渠道简称</div>
        <el-input class="erpsearchinput" placeholder="请输入渠道简称" clearable size="small" v-model="searchform.ChannelName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">联系电话</div>
        <el-input class="erpsearchinput" placeholder="请输入联系电话" clearable size="small" v-model="searchform.Tel">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <div class="operate-top">
        <!-- <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="addmenu erpbtn" @click="AddRecommended('Add')">添加渠道</el-button> -->
        <el-button size="small" class="addmenu erpbtn" @click="AddChannel('Add')">添加渠道</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="ChannelList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" min-width="55" fixed label="序号" />
          <el-table-column align="center" v-if="$getColumsFlag('ChannelName',checkboxVal)" prop="ChannelName" label="渠道名称" min-width="120">
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'View')" @click="LookDetails(scope.row)" style="color:#1588f8;">{{scope.row.ChannelName}}</a>
              <span v-else>{{scope.row.ChannelName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Contacts',checkboxVal)" prop="Contacts" label="渠道联系人" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Tel',checkboxVal)" prop="Tel" label="渠道联系电话" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('AreaName',checkboxVal)" prop="AreaName" label="渠道地址" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AreaName | AddressFiltering}}{{scope.row.Address}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('SysUserName',checkboxVal)" prop="SysUserName" label="渠道负责人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('DeveloperName',checkboxVal)" prop="DeveloperName" label="渠道开发人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('QualityText',checkboxVal)" prop="QualityText" label="渠道质量" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Recommend',checkboxVal)" prop="Recommend" label="渠道推荐总人数" min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('Effective',checkboxVal)" prop="Effective" label="渠道推荐有效人数" min-width="160" />
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="录入时间" min-width="200">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('UpdateTime',checkboxVal)" prop="UpdateTime" label="更新时间" min-width="200">
            <template slot-scope="scope">
              <span>{{scope.row.UpdateTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <!-- v-if="($operatebtns(operates,['Modify','Delete']))" -->
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <!-- v-if="$operatebtn(operates, 'Modify')" -->
                    <el-dropdown-item @click.native="EditChannel(scope.row,'Modify')">编辑</el-dropdown-item>
                    <el-dropdown-item @click.native="DelChannel(scope.row,'Delete')">删除</el-dropdown-item>
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
      <!-- 添加修改渠道信息 -->
      <EditChannel :ChannelVisible="ChannelVisible" :ChannelTitle="ChannelTitle" :ChannelData="ChannelData" @ChannelSave="ChannelSave" @ChanneClose="ChanneClose"></EditChannel>
    </div>
  </div>
</template>
<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import EditChannel from './components/EditChannel.vue'
import { GetRecruitChannelPageList, GetChannelChannel, AddRecruitChannel, EditRecruitChannel, DeleteRecruitChannel } from '@/api/RecruitmentManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    EditChannel,
    ScreeningComponent
  },
  data () {
    return {
      searchform: {
        ChannelName: '',
        Tel: '',
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "Id" },
        { label: "渠道名称", prop: "ChannelName" },
        { label: "渠道联系人", prop: "Contacts" },
        { label: "渠道联系电话", prop: "Tel" },
        { label: "渠道地址", prop: "AreaName" },
        { label: "渠道负责人", prop: "SysUserName" },
        { label: "渠道开发人", prop: "DeveloperName" },
        { label: "渠道质量", prop: "QualityText" },
        { label: "渠道推荐总人数", prop: "Recommend" },
        { label: "渠道推荐有效人数", prop: "Effective" },
        { label: "录入时间", prop: "AddTime" },
        { label: "更新时间", prop: "UpdateTime" },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      ChannelList: [],
      tableloading: false, // 加载动画
      ChannelVisible: false,//渠道弹窗是否显示
      ChannelTitle: '',//渠道弹窗name
      ChannelData: {},//修改时回填渠道数据
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    console.log(this.$route)
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      console.log(this.operates);
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId

    }
    this.GetChannel(this.operatiOBj)
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
    searchtable () {
      this.currentPage = 1
      this.GetChannel(this.operatiOBj)
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.GetChannel(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetChannel(this.operatiOBj)
    },
    //获取渠道列表数据
    GetChannel (operat) {
      this.tableloading = true
      let data = this.searchform
      data.ChannelType=-1
      data.PageIndex = this.currentPage || 1
      data.PageSize = this.PageSize || 1
      // data.menuid = operat.menuid
      // data.operationcode = operat.OperationCode
      data.menuid = MenuIdDate(),
        data.operationcode = '1'
      GetRecruitChannelPageList(qs.stringify(data)).then(response => {
        console.log(response)
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ChannelList = response.Data
            this.total = response.Total
          } else {
            this.ChannelList = []
            this.total = 0
          }
        } else {
          this.ChannelList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //打开添加渠道弹窗
    AddChannel (str) {
      // const operating = this.$operatedata(this.operates, str)
      // localStorage.setItem('operating', JSON.stringify(operating))
      this.ChannelTitle = '添加渠道'
      this.ChannelVisible = true
    },
    //打开修改渠道
    EditChannel (data, op) {
      // const operating = this.$operatedata(this.operates, op)
      // window.localStorage.setItem('operating', JSON.stringify(operating))
      this.ChannelTitle = '修改渠道';
      this.ChannelData = data
      this.ChannelVisible = true
    },
    //删除渠道
    DelChannel (data, op) {
      this.$confirm('此操作将删除该渠道, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const operating = this.$operatedata(this.operates, op) || {}
        let obj = {
          Id: data.Id,
          menuid: MenuIdDate(),// operating.MenuId,
          operationcode: '1' // operating.OperationCode
        }
        DeleteRecruitChannel(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: response.MessageContent,
              type: 'success'
            })
            this.GetChannel(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //关闭添加渠道
    ChanneClose (val) {
      this.ChannelVisible = val
    },
    //保存渠道数据
    ChannelSave (data) {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      data.menuid = MenuIdDate() // operating.MenuId
      data.operationcode = '1' // operating.OperationCode
      if (data.Id) {
        EditRecruitChannel(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改渠道数据成功!'
            })
            this.ChannelVisible = false
            this.GetChannel(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        AddRecruitChannel(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '添加渠道数据成功!'
            })
            this.ChannelVisible = false
            this.GetChannel(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.recruitment-detail-management-container {
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
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
  .operate-table {
    margin-bottom: 20px;
  }
  .content {
    background-color: #fff;
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
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