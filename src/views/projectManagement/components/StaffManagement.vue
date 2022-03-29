<!-- 员工管理 -->
<template>
  <div class="staff-management-container" :class="{active: isShow}">
    <el-button v-show="isShow" class="erpbtn callback" size="small" @click="isShow=!isShow">返回</el-button>
    <div class="title-name">员工信息管理</div>
    <!-- 时间选择 -->
    <el-date-picker v-if="!isShow" class="lucencydate" size="mini" ref="yeardate" align="center" :clearable="false" v-model="yeartime" type="year" value-format="yyyy" placeholder="选择年" @change="getProjectStaffStatisticsInfo" />
    <div class="time-table" v-show="!isShow">
      <div @click="nextyear(1)">
        <i class="el-icon-d-arrow-left" />
      </div>
      <span @click="chooseyear">{{ yeartime | year }}</span>
      <div @click="nextyear(-1)">
        <i class="el-icon-d-arrow-right" />
      </div>
    </div>
    <!-- 月历 -->
    <div class="month-grid" v-show="!isShow" v-loading="gridloading">
      <div v-for="(item, index) in monthdata" :key="index" class="grid-box erpscroll cursor-pointer" :class="{active: item.active, isdisabled: !item.isown}" @click="selectmonth(item)">
        <div class="grid-top">
          <div class="date-title">{{ item.Month }}月份</div>
        </div>
        <div class="grid-content" v-show="item.isown">
          <div class="item">
            <div class="item-name">新增</div>
            <div class="item-number">{{ item.NewStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">离职</div>
            <div class="item-number">{{ item.LeaveStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">已发工资</div>
            <div class="item-number">{{ item.PaidStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">未发工资</div>
            <div class="item-number">{{ item.UnpaidStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">未缴纳社保</div>
            <div class="item-number">{{ item.UnpaymentSiStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">社保停缴</div>
            <div class="item-number">{{ item.StoppaymentSiStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">未缴纳医保</div>
            <div class="item-number">{{ item.UnpaymentMedicalStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">医保停缴</div>
            <div class="item-number">{{ item.StoppaymentMedicalStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">未缴纳公积金</div>
            <div class="item-number">{{ item.UnpaymentHouseFundStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">公积金停缴</div>
            <div class="item-number">{{ item.StoppaymentHouseFundStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">未上传合同</div>
            <div class="item-number">{{ item.UnUpContractStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
          <div class="item">
            <div class="item-name">合同过期</div>
            <div class="item-number">{{ item.ExpireContractStaffNum }}</div>
            <div class="item-unit">人</div>
          </div>
        </div>
        <div class="sum" v-show="item.isown">
          <span>共计: </span>
          <span>{{ item.AllStaffNum }}</span>
          <span>人</span>
        </div>
        <div v-show="!item.isown" class="nodata">暂无数据</div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="search-bar clearfix" v-show="isShow">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" placeholder="请输入员工名称进行查询" size="small" v-model="searchform.UserName" clearable @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">身份证号码</div>
        <el-input class="erpsearchinput" placeholder="请输入身份证号码进行查询" size="small" v-model="searchform.IdCode" clearable @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">社保/工资/公积金打款账号</div>
        <el-input class="erpsearchinput" placeholder="请输入社保/工资/公积金打款账号查询" size="small" v-model="searchform.Comprehensive" clearable @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="alltab clearfix" v-show="isShow">
      <div class="tab-name" :class="{active: alltabidx==item.index}" @click="choosealltab(item)" v-for="(item, index) in alltablist" :key="index">{{item.name}}</div>
    </div>
    <div class="table-content" v-show="isShow">
      <div class="tab clearfix">
        <div class="tab-name" :class="{active: tabidx==item.index}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.name}}</div>
      </div>
      <div class="content">
        <div class="operate-top" v-show="isupdate">
          <el-button size="small" class="addmenu erpbtn" @click="addemployees">添加员工</el-button>
          <el-button size="small" class="addmenu erpbtn" @click="Importemployees">导入员工</el-button>
          <!-- <el-button size="small" class="addmenu erpbtn" @click="exportemployees">导出员工</el-button> -->
          <!-- <el-button size="small" class="addmenu erpbtn" @click="issuecertificate">证明开具</el-button> -->
          <el-button size="small" class="addmenu erpbtn" @click="onboarding">入职办理</el-button>
          <!-- <el-button size="small" class="addmenu erpbtn" @click="resignation">离职办理</el-button> -->
        </div>
        <div class="operate-table">
          <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="55" fixed label="全选" />
            <el-table-column align="center" prop="StaffCode" width="150" fixed label="员工编码" />
            <el-table-column align="center" prop="UserName" fixed width="100" label="员工姓名" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="watchcode" @click="watchstaff(scope.row)">{{scope.row.UserName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Sex" width="80" label="性别">
              <template slot-scope="scope">
                {{scope.row.Sex | Sex}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="IdCode" width="170" label="身份证号码" />
            <el-table-column align="center" prop="Mobile" width="120" label="联系电话" />
            <el-table-column align="center" prop="Email" width="120" label="电子邮件" show-overflow-tooltip />
            <el-table-column align="center" prop="ResidenceAreaName" min-width="160" label="户口所在地" show-overflow-tooltip />
            <el-table-column align="center" prop="Politics" width="100" label="政治面貌" />
            <el-table-column align="center" prop="DiplomaText" width="100" label="最高学历" />
            <el-table-column align="center" prop="DegreeText" width="100" label="最高学位" />
            <el-table-column align="center" prop="HealthyExamText" width="120" label="健康体检状态" />
            <el-table-column align="center" prop="EmergencyTel" width="120" label="紧急联系电话" show-overflow-tooltip />
            <el-table-column align="center" prop="EmergencyPerson" width="100" label="紧急联系人" show-overflow-tooltip />
            <el-table-column align="center" prop="BankAccount" min-width="140" label="工资卡账号" show-overflow-tooltip />
            <el-table-column align="center" prop="BankNameStr" width="120" label="工资卡开户行" show-overflow-tooltip />
            <el-table-column align="center" prop="SiAccount" width="140" label="社保账号" show-overflow-tooltip />
            <el-table-column align="center" prop="SiProgressText" width="100" label="社保卡进度" />
            <el-table-column align="center" prop="SiAreaName" width="160" label="参保地" show-overflow-tooltip />
            <el-table-column align="center" prop="FundAccount" width="140" label="公积金账号" show-overflow-tooltip />
            <!-- <el-table-column align="center" prop="BfBankId" label="工资发放规则 !!" /> -->
            <!-- <el-table-column align="center" prop="BfBankId" label="社保扣除规则 !!" /> -->
            <el-table-column align="center" prop="PersonalTaxRuleName" width="120" label="个税扣除规则" show-overflow-tooltip />
            <!-- <el-table-column align="center" prop="CompanyName" label="用工单位" /> -->
            <!-- <el-table-column align="center" prop="ProjectName" width="160" label="就职项目" /> -->
            <el-table-column align="center" prop="Position" width="120" label="就职岗位" show-overflow-tooltip />
            <el-table-column align="center" prop="BfCompanyName" min-width="140" label="入职公司" show-overflow-tooltip />
            <el-table-column align="center" prop="ProjectStaffEntryTime" width="140" label="入职项目时间">
              <template slot-scope="scope">
                {{scope.row.ProjectStaffEntryTime | Time}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="LastQuitCert" width="170" label="原公司离职证明状态">
              <template slot-scope="scope">
                {{scope.row.LastQuitCert | LastQuitCert}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StatusText" width="120" label="目前就职状态" />
            <el-table-column align="center" prop="StaffContractTypeText" width="120" label="合同类型" show-overflow-tooltip />
            <el-table-column align="center" prop="StaffContractSignType" width="120" label="合同签订模式" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.StaffContractSignType | StaffContractSignType}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StaffContractStartDate" width="140" label="合同起始日期">
              <template slot-scope="scope">
                <span>{{scope.row.StaffContractStartDate | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StaffContractExpireDate" width="140" label="合同终止日期">
              <template slot-scope="scope">
                <span>{{scope.row.StaffContractExpireDate | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StaffContractStatus" width="140" label="合同签署状态">
              <template slot-scope="scope">
                <span>{{scope.row.StaffContractStatus | StaffContractStatus}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" prop="StatusText" label="添加时间 !!">
              <template slot-scope="scope">
                <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StatusText" label="更新时间 !!">
              <template slot-scope="scope">
                <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
              </template>
            </el-table-column> -->
            <el-table-column align="center" width="120" fixed="right" label="工资发放状态">
              <template slot-scope="scope">
                <span>{{scope.row.SalaryStatus | SalaryStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" fixed="right" label="社保缴纳状态">
              <template slot-scope="scope">
                <span>{{scope.row.SiStatus | SiStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" fixed="right" label="公积金缴纳状态">
              <template slot-scope="scope">
                <span>{{scope.row.HouseFundStatus | SiStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" fixed="right" label="医保缴纳状态">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalStatus | SiStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="isupdate" align="center" fixed="right" width="80" label="操作">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="setting" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <el-dropdown-item @click.native="update(scope.row)">修改</el-dropdown-item>
                      <el-dropdown-item @click.native="leave(scope.row)">从用工单位离职办理</el-dropdown-item>
                      <el-dropdown-item @click.native="rmoveproject(scope.row)">移出项目</el-dropdown-item>
                      <el-dropdown-item @click.native="gothrough(scope.row)">医保办理</el-dropdown-item>
                      <el-dropdown-item @click.native="gothrough(scope.row)">公积金办理</el-dropdown-item>
                      <el-dropdown-item @click.native="gothrough(scope.row)">社保办理</el-dropdown-item>
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="isupdate" class="operate-bottom">
          <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
          <el-button size="small" class="addmenu erpbtn" @click="rmoveprojects">移出项目</el-button>
        </div>
        <div class="pagina-fonter">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="dialog">
      <dialogresignation :title="resignationname" :visible="resignationvisible" :contentdata="resignationdata" :searchIDobj="searchIDobj" @closedialog="closedialog" @saveresignation="saveresignation"></dialogresignation>
      <!-- 导入员工信息 -->
      <el-dialog :close-on-click-modal="false" title="导入员工" :visible.sync="importvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
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
            <div class="success-total">成功 {{errordata.Successes}}</div>
            <div class="error-total">文件导入失败 <span>{{errordata.Errors}}</span> 条</div>
          </div>
          <div class="error-content erpscroll">
            <div class="row" v-for="(item, index) in errordata.ImportToExcelErrorList" :key="index">
              <div class="index">第{{item.Rows}}条</div>
              <div class="con">{{item.Message}}</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="reportvisible=!reportvisible">修改后重新导入</el-button>
        </span>
      </el-dialog>
      <!-- 添加员工 -->
      <dialogemployees :title="employeestitle" :visible="employeesvisible" :contentdata="employeesdata" @closedialog="closedialog" @saveemployees="saveemployees"></dialogemployees>
    </div>
    <ProveOpens :showAddProve="showAddProve" :title="ProveTitle" :tempData="tempData" @ProveSave="ProveSave" @closeProve="closeProve"></ProveOpens>
  </div>
</template>

<script>
// import dialogresignation from '../../OutsourcedEmployeeManagement/components/dialog-resignation'
import dialogresignation from '@/views/OutsourcedEmployeeManagement/components/dialog-resignation'
import dialogemployees from './dialog-employees.vue'
import { GetStaffPageList, AddStaffLeave, ImportToStaffExcel, GetStaffExcelModel, AddProveApply, EditStaffProject, DownloadStaffExcel, AddStaffProjectLeave } from '@/api/OutsourcedEmployeeManagement.js'
import { GetProjectStaffInfoPageList, AddProjectStaff, DeleteProjectStaff, GetProjectRecruit, GetProjectStaffStatisticsInfo } from '@/api/projectManagement.js'
import ProveOpens from '@/components/OutsourcedEmployeeManagement/ProveOpens.vue'
import filters from '@/utils/filters'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    dialogresignation,
    dialogemployees,
    ProveOpens,
  },
  filters: {
    LastQuitCert (value) {
      if (value == 0) {
        return '未提交'
      } else if (value == 1) {
        return '已提交'
      } else {
        return ''
      }
    },
    StaffContractSignType (value) {
      if (value == 0) {
        return '电子版'
      } else if (value == 1) {
        return '纸质版'
      } else {
        return ''
      }
    },
    StaffContractStatus (value) {
      if (value == 0) {
        return '待存档'
      } else if (value == 1) {
        return '已存档'
      } else {
        return ''
      }
    },
    year (value) {
      if (value) {
        return value + '年'
      } else {
        return ''
      }
    },
    SalaryStatus (value) {
      if (value === 0) {
        return '待发放'
      } else if (value === 1) {
        return '已部分发放'
      } else if (value === 2) {
        return '已全部分发放'
      } else {
        return ''
      }
    },
    SiStatus (value) {
      if (value === 0) {
        return '待缴交'
      } else if (value === 1) {
        return '已缴交'
      } else {
        return ''
      }
    },
  },
  data () {
    return {
      ProjectId: '',
      searchform: {
        UserName: '',
        IdCode: '',
        // CompanyName: '',
        // ProjectName: '',
        Comprehensive: '',
      },
      resignationname: '用工单位离职办理',
      resignationvisible: false, // 离职弹框
      resignationdata: {}, // 离职弹框内容

      showAddProve: false, // 证明弹框
      ProveTitle: '', // 证明标题
      tempData: {}, // 证明弹框内容

      importvisible: false, // 导入员工弹框
      filterdata: { // 上传的文件
        type: '',
        name: '',
        visible: false
      },
      files: null, // 文件
      reportvisible: false, // 上传报告
      errordata: {}, // 错误信息

      employeestitle: '添加员工到项目',
      employeesvisible: false, // 弹框是否显示
      employeesdata: {}, // 添加员工数据

      tableloading: false, // 表格加载
      allchecked: false,
      Recruitlist: [], // 招聘列表
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Ids: [],
      staffId: [],
      Id: '',
      searchIDobj: {
        resignatType: 2,
        staffId: '',
        ProjectId: ''
      },

      // 月历
      gridloading: false,
      isShow: false,
      yeartime: '',
      monthtime: '',
      monthdata: [],
      isupdate: false, // 是否能进行操作
      tabidx: 0,
      tablist: [{
        index: 0,
        name: '全部'
      }, {
        index: 1,
        name: '正常'
      }, {
        index: 2,
        name: '工资异常'
      }, {
        index: 3,
        name: '社保异常'
      }, {
        index: 4,
        name: '医保异常'
      }, {
        index: 5,
        name: '公积金异常'
      }, {
        index: 6,
        name: '离职人员'
      }],
      alltabidx: 0,
      alltablist: [{
        index: 0,
        name: '全部'
      }, {
        index: 1,
        name: '已签合同'
      }, {
        index: 2,
        name: '未签合同'
      }, {
        index: 3,
        name: '待续签'
      }]
    }
  },
  created () {
    this.$nextTick(() => {
      this.ProjectId = this.$route.query.Id
      this.getProjectRecruit()
      // this.getStaffPageList()
      const datetime = new Date()
      this.yeartime = datetime.getFullYear() + ''
      this.getProjectStaffStatisticsInfo()
    })
  },
  methods: {
    // 获取岗位信息
    getProjectRecruit () {
      let obj = {
        ProjectId: this.ProjectId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectRecruit(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.Recruitlist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取项目每月的统计数据
    getProjectStaffStatisticsInfo () {
      let obj = {
        Year: this.yeartime,
        ProjectId: this.ProjectId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.gridloading = true
      GetProjectStaffStatisticsInfo(qs.stringify(obj)).then(response => {
        this.gridloading = false
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              response.Data[i].isown = true
              // 判断搜索年份是否是今年, 给最后一个月份添加选中状态
              if (this.yeartime == new Date().getFullYear() && i === response.Data.length - 1) {
                response.Data[i].active = true
              }
            }
          }
          this.monthdata = response.Data
          if (response.Data && response.Data.length < 12) {
            console.log(response.Data.length);
            let index = response.Data.length
            for (let i = 0; i <= (12 - index); i++) {
              this.monthdata.push({
                Month: ++index,
                isown: false
              })
            }
          } else if (response.Data && response.Data.length === 12) {

          } else {
            let index = 0
            this.monthdata = []
            for (let i = 0; i < 12; i++) {
              this.monthdata.push({
                Month: ++index,
                isown: false
              })
            }
          }
          console.log(this.monthdata)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 选择月份信息
    selectmonth (data) {
      this.monthtime = data.Month
      if (data.isown) {
        this.isShow = true
        this.getStaffPageList()
        // 判断能否操作
        if (data.active) {
          this.isupdate = true
        } else {
          this.isupdate = false
        }
      }
    },
    // 获取外包员工信息
    getStaffPageList () {
      let obj = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        UserName: this.searchform.UserName,
        IdCode: this.searchform.IdCode,
        // CompanyName: this.searchform.CompanyName,
        // ProjectName: this.searchform.ProjectName,
        Comprehensive: this.searchform.Comprehensive,
        ProjectId: this.ProjectId,
        ContractStatus: this.alltabidx,
        Type: this.tabidx,
        Year: this.yeartime,
        Month: this.monthtime,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetProjectStaffInfoPageList(qs.stringify(obj)).then(response => {
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
    // 切换tab栏
    choosealltab (e) {
      // 防止重复点击
      if (this.alltabidx == e.index) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.alltabidx = e.index
        this.getStaffPageList()
      }
    },
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.index) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.index
        this.getStaffPageList()
      }
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getStaffPageList()
    },
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      this.staffId = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
        this.staffId.push(value[i].StaffId)
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    // 全选
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    addemployees () {
      // 获取这个项目的岗位
      this.employeesdata = {
        Recruitlist: this.Recruitlist,
        Id: this.ProjectId
      }
      this.employeesvisible = true
      this.employeestitle = '添加员工到项目'
    },
    // 保存添加员工
    saveemployees (e, job, datetime) {
      let AddProjectStaffList = []
      const projectdetail = JSON.parse(window.localStorage.getItem('projectdetail'))
      console.log(projectdetail);

      for (let i = 0; i < e.length; i++) {
        AddProjectStaffList.push({
          StaffId: e[i].Id,
          ProjectId: this.ProjectId,
          PositionName: job,
          EntryTime: datetime
        })
      }
      let obj = {
        AddProjectStaffList: AddProjectStaffList,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      AddProjectStaff(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          // this.$message({
          //   message: '关联项目成功',
          //   type: 'success'
          // })
          if (response.Data.ErrorMsg == '') {
            this.$message({
              message: '添加员工成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: response.Data.ErrorMsg,
              type: 'error'
            })
          }
          this.employeesvisible = false
          this.getStaffPageList()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'warning'
          })
        }
      })
    },

    // 查看详情
    watchstaff (e) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.fullPath
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

      const { href } = this.$router.resolve({
        path: '/OutsourcedEmployeeManagement/ExpatriateEmployeesDeatil',
        query: {
          id: e.StaffId,
        }
      })
      window.open(href, '_blank')
    },
    // 导出员工
    exportemployees () {
      if (!this.Ids.length) {
        this.$message({
          type: 'warning',
          message: '请选择要导出的员工'
        });
        return
      }
      let obj = {
        IdArr: this.staffId.join(','),
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      DownloadStaffExcel(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          console.log(response);
          window.open(response.Data)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 关闭导入信息
    closereport () {
      this.reportvisible = false
      if (this.errordata.Successes) {
        this.getStaffPageList()
      }
    },
    // 打开导入员工弹框
    Importemployees () {
      this.importvisible = true
    },
    // 下载导入模板
    downemployees () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetStaffExcelModel(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          window.open('http://' + response.Data)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
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
    // 导入员工
    saveimport () {
      if (this.files) {
        var obj = new FormData()
        obj.append('file', this.files)
        obj.append('Type', '1')
        obj.menuid = MenuIdDate()
        obj.operationcode = '1'
        showLoading()
        ImportToStaffExcel(obj).then(response => {
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              // this.$message({
              //   message: '导入数据成功',
              //   type: 'success'
              // })
            } else {
              this.errordata = response.Data
              this.reportvisible = true
            }
            let AddProjectStaffList = []
            const projectdetail = JSON.parse(window.localStorage.getItem('projectdetail')) || {}
            if (response.Data && response.Data.ImportToExcelSuccessList && response.Data.ImportToExcelSuccessList.length) {
              for (let i = 0; i < response.Data.ImportToExcelSuccessList.length; i++) {
                AddProjectStaffList.push({
                  StaffId: response.Data.ImportToExcelSuccessList[i].Id,
                  ProjectId: this.ProjectId,
                  EntryTime: response.Data.ImportToExcelSuccessList[i].ProjectStaffDate
                })
              }
              let obj = {
                AddProjectStaffList: AddProjectStaffList,
                menuid: MenuIdDate(),
                operationcode: '1'
              }
              AddProjectStaff(qs.stringify(obj)).then(response => {
                hideLoading()
                if (response.IsSuccess) {
                  if (response.Data.ErrorMsg == '') {
                    this.$message({
                      message: '导入员工成功',
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      message: response.Data.ErrorMsg,
                      type: 'error'
                    })
                  }
                  this.importvisible = false
                  this.getStaffPageList()
                } else {
                  this.$message({
                    message: response.MessageContent,
                    type: 'warning'
                  })
                }
              })
            } else {
              hideLoading()
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      } else {
        this.$message({
          message: '请选择文件',
          type: 'warning'
        })
      }
    },

    // 证明开具
    issuecertificate () {
      this.ProveTitle = '新增证明开具';
      this.showAddProve = true
    },
    // 保存证明
    ProveSave (e) {
      console.log(e);
      e.menuid = MenuIdDate(),
        e.operationcode = '1'
      showLoading()
      AddProveApply(qs.stringify(e)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '当前申请已提交至OA，后续状态跟进请移步证明开具管理!'
          })
          this.showAddProve = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭证明开具窗口
    closeProve (val) {
      this.showAddProve = val;
    },

    // 入职办理
    onboarding () {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.fullPath
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

      this.$router.push({
        path: '/OutsourcedEmployeeManagement/AddExpatriateEmployees',
        query: {
          projectId: this.ProjectId
        }
      })
    },
    // 修改
    update (e) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.fullPath
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

      this.$router.push({
        path: '/OutsourcedEmployeeManagement/AddExpatriateEmployees',
        query: {
          id: e.StaffId
        }
      })
    },
    // 离职办理
    leave (e) {
      this.Id = e.StaffId
      this.searchIDobj.staffId = e.StaffId
      this.searchIDobj.ProjectId = this.ProjectId
      this.resignationvisible = true
    },
    // 单个移除员工
    rmoveproject (e) {
      this.$confirm('确定把该员工从项目中移出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        DeleteProjectStaff(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '移出成功!',
              type: 'success'
            })
            this.getStaffPageList()
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
          message: '移出已取消'
        });
      });
    },
    // 批量移除员工
    rmoveprojects () {
      console.log(this.Ids);
      if (!this.Ids.length) {
        this.$message({
          type: 'warning',
          message: '请选择要移出的员工'
        });
        return
      }
      this.$confirm('确定把选中的员工从项目中移出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          IdArr: this.Ids.join(','),
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        DeleteProjectStaff(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '移出成功!',
              type: 'success'
            })
            this.getStaffPageList()
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
          message: '移出已取消'
        });
      });
    },
    // 办理跳转
    gothrough (e) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.fullPath
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

      this.$router.push({
        path: '/OutsourcedEmployeeManagement/AddExpatriateEmployees',
        query: {
          id: e.StaffId,
          gothrough: true
        }
      })
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getStaffPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getStaffPageList()
    },
    // 弹窗关闭
    closedialog () {
      this.resignationvisible = false
      this.relatevisible = false
      this.resignationvisible = false
      this.files = null
      this.employeesvisible = false
    },
    // 保存离职弹框
    saveresignation (e, type) {
      let obj = {
        StaffId: this.Id,
        LeaveTime: e.LeaveTime,
        LeaveReason: e.LeaveReason,
        LeaveAgree: e.LeaveAgree,
        AgreeUrl: e.AgreeUrl,
        ProjectId: e.ProjectId,
        Remark: e.Remark,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      AddStaffProjectLeave(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '从用工单位离职成功',
            type: 'success'
          })
          this.getStaffPageList()
          this.resignationvisible = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },

    // 改变年
    nextyear (value) {
      this.yeartime = Number(this.yeartime) - value + ''
      this.getProjectStaffStatisticsInfo()
    },
    // 选择年
    chooseyear () {
      this.$refs.yeardate.handleFocus()
    }
  },
}
</script>

<style lang="scss" scoped>
.staff-management-container.active {
  padding: 10px;
}
.staff-management-container /deep/ {
  padding: 10px 50px;
  .callback {
    margin-bottom: 24px;
  }
  .search-bar {
    padding: 0 24px 12px 24px;
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
        .el-input__inner {
          // border-color: $erpplaceholder !important;
          background-color: $erpbgcolor;
        }
      }
    }
  }
  .table-content {
    margin: 0;
    border-radius: 0 8px 8px 8px;
    background-color: #f0f4fa;
    .content {
      background-color: #fff;
      padding: 24px 16px;
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
      width: 96px;
    }
  }
  .operate-bottom {
    margin-top: 32px;
    padding-left: 16px;
    .allcheck {
      margin-right: 16px;
    }
    .el-button {
      margin-bottom: 12px;
    }
  }
  .pagina-fonter {
    margin-top: 24px;
  }
}
/deep/ .erpdialog {
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
              font-size: $f14;
              margin-right: 10px;
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
        margin-top: 10px;
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
      max-height: calc(100vh - 600px);
      overflow-y: auto;
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

/deep/ .time-table {
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 0 24px;
  margin-bottom: 24px;
  > div {
    width: 40px;
    cursor: pointer;
    text-align: center;
  }
  > span {
    display: inline-block;
    width: 300px;
    text-align: center;
    font-weight: 700;
  }
  i {
    font-size: 16px;
    color: #a3b1cc;
    font-weight: 700;
  }
}
.month-grid {
  display: flex;
  flex-wrap: wrap;
  .grid-box {
    width: 25%;
    height: calc((100vw - 240px) / 4);
    border: 1px solid $erpBK;
    padding: 24px;
    overflow: auto;
    margin: 0 -1px -1px 0;
    &.active {
      background-color: #f3f9ff;
    }
    &.isdisabled {
      position: relative;
      .date-title {
        color: #cccccc !important;
      }
      .nodata {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #cccccc;
        font-size: 20px;
      }
    }
    &:hover {
      background-color: #f3f9ff;
    }
    .grid-top {
      display: flex;
      line-height: 20px;
      justify-content: space-between;
      margin-bottom: 30px;
      .date-title {
        font-size: 16px;
        font-weight: 700;
      }
    }
    .grid-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 14px;
      margin-bottom: 30px;
      color: $erpplaceholder;
      .item {
        width: 50%;
        font-size: 14px;
        &:nth-child(2n) {
          color: $erp999;
          .item-number {
            color: #ff8e34;
          }
        }
        > div {
          display: inline-block;
          line-height: 28px;
        }
      }
    }
    .sum {
      font-size: 16px;
      color: $erp666;
      font-weight: 700;
    }
  }
}
.lucencydate {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
}
.alltab {
  .tab-name {
    float: left;
    height: 40px;
    line-height: 40px;
    text-align: center;
    // width: 128px;
    padding: 0 40px;
    font-size: $f14;
    color: #fff;
    background-color: $erpplaceholder;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    &.active {
      color: $erp333;
      background-color: #f0f4fa;
    }
  }
  .tab-name + .tab-name {
    margin-left: 8px;
  }
}
</style>