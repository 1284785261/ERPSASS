/* Pipeline */
<template>
  <div class="app-container">
    <!-- 查询开始 -->
    <div class="search-bar clearfix">
      <div class="condition">
        <!-- <div class="search-name">渠道简称</div> -->
        <el-input class="erpsearchinput" placeholder="请输入人才姓名/电话号码进行查询" clearable size="small" v-model="SearchText">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <!-- <div class="condition">
        <div class="search-name">联系电话</div>
        <el-input class="erpsearchinput" placeholder="请输入联系电话" clearable size="small" v-model="searchform.Tel">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div> -->
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <!-- 查询结束 -->
    <!-- 高级搜索开始 -->
    <!-- <div v-show="showAdvanced" class="advanced-search"> -->
    <!-- <advancedform @onSubmit="Submit" /> -->
    <!-- </div> -->
    <!-- 高级搜索结束 -->
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="update">更新进度</el-button>
      </div>
      <div class="tab2 clearfix">
        <div class="tab-name" v-for="(item, index) in schedules" :key="index" :class="{active:tabidx==item.value}" @click="chooseschedule(item.value)">{{ item.describe }}</div>
      </div>
      <!-- <pipelinetable hidenname="pipeline" :schei="scheIndex" :tableloading="tableloading" :tableList="tableList" :phidenIndex="phidenIndex" :scheIndex="scheIndex" :conceal="false" :ischoose="ischoose" :radio="true" :dropstyle="dropstyle" @onScreening="onScreening" @onchooseradio="chooseradio" @refreshBack="refreshBack" @ondialogFormVisible="opendialog" /> -->
      <div class="operate-table">

        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableList" max-height="600" tooltip-effect="dark" @select="dialogCheck">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" />
          <el-table-column align="center" prop="Id" min-width="120" fixed label="简历ID" />
          <el-table-column align="center" prop="StaffName" label="姓名" min-width="120">
            <template slot-scope="scope">
              <a class="watchcode" @click="GetEmployeeDetails(scope.row)">{{scope.row.StaffName}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PositionName" label="项目名称" min-width="120">
            <template slot-scope="scope">
              <a class="watchcode" @click="watchtalent(scope.row)">{{scope.row.PositionName}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PositionName" label="职位" min-width="120" />
          <el-table-column align="center" prop="Mobile" label="电话号码" min-width="200" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              <span>{{scope.row.AreaName | AddressFiltering}}{{scope.row.Address}}</span>
            </template> -->
          </el-table-column>
          <el-table-column align="center" prop="ProjectName" label="客户名称" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="SysUserName" label="录入人" min-width="120" />
          <el-table-column align="center" prop="userStatusText" label="在职状态" min-width="120" />
          <el-table-column align="center" prop="AddTime" label="录入时间" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link" @click="selectStatus(scope.row)">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-for="(item,index) in statusList" :key="index" @click.native="changeEmployeeStatus(item)">{{item.describe}}</el-dropdown-item>
                    <el-dropdown-item @click.native="addRemarks(scope.row)">添加备注</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagina-fonter">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-drawer :title="StaffName" :visible.sync="updateShow" direction="rtl" class="schedule-drawer" @close="closedrawer">
      <!-- <h3>{{StaffName}}</h3> -->
      <el-steps :space="203" :active="actives" align-center finish-status="success" class="steps-Box">
        <el-step title="推荐入职"></el-step>
        <el-step title="面试通过"></el-step>
        <el-step title="试岗中"></el-step>
        <el-step title="入职"></el-step>
      </el-steps>
      <ul class="saas-project-plan sassscroll">
        <div class="RecruitmentStatus-Box">
          <li v-for="(item, index) in Allrate" class="RecruitmentStatus" :key="index" :class="{nowbtn:index===Allrate.length-1}" @click="changeStatus(item)">
            <div class="span">{{ item.describe }}</div>
          </li>
        </div>

        <!-- <li v-for="(item2, idx) in operateList" :key="idx + 99" class="active">
          <div>
            <div class="ring">
              <div class="small" />
            </div>
            <div class="line" />
            <div class="dotted-lie">
              <div v-if="item2 && item2.describe" class="span" @click="updateResumePipeline(item2.value)">{{ item2.describe }}</div>
            </div>
          </div>
        </li> -->
      </ul>
      <!-- <el-timeline :reverse="reverse">
      <el-timeline-item
      v-for="(activity, index) in MgrLogPageList"
      :key="index"
      :timestamp="activity.AddTime">
      {{activity.content}}
    </el-timeline-item>
    </el-timeline> -->
      <ul class="saas-schedule sassscroll">
        <li v-for="(item, indexm) in MgrLogPageList" :key="indexm">
          <div class="log-plan">
            <div class="ring" />
            <div class="line" />
          </div>
          <div class="center">
            <!-- <div class="center-name">{{ item.SysUserName }}</div> -->
            <div class="center-time">{{ item.AddTime.split('T').toString().replace(/-/g,'/').replace(/,/g,' ')+'    '+item.SysUserName}}</div>
            <div v-if="item.Status==-1" class="center-operation2">{{item.RecruitProvisionTypeStatusText+':'+item.Remark}}</div>
            <div v-else class="center-operation2">将人才状态变更为<span class="ProjectName">{{"["+item.RecruitProvisionTypeStatusText+"]"}}</span></div>
            <div>关联项目为<span class="ProjectName">{{"["+item.ProjectName+"]"}}</span></div>
          </div>
        </li>
      </ul>
    </el-drawer>
    <el-dialog :close-on-click-modal="false" title="添加备注" :visible.sync="addVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <div class="select-box">
        <el-input class="AddRemark" type="textarea" size="small" style="font-size:15px;" v-model="remarks" resize="none" maxlength="100" :rows="5" show-word-limit></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveimport">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import simplesearch from '../../compontents/doubleSelect'
// import advancedform from '../../compontents/advancedForm'
// import pipelinetable from '../../compontents/pipeline-table'
// import remarkdialog from '../../compontents/dialog-remark'
// import tagdialog from '../../compontents/dialog-tag'
// import reminddialog from '../../compontents/dialog-remind'
// import groupdialog from '../../compontents/dialog-group'
// import emaildialog from '../../compontents/dialog-email'
// import pmdlialog from '../../compontents/dialog-pm'
// import filedialog from '@/components/publicComponents/dialog-file.vue'
import { GetRecruitPipelinePageList, AddRecruitPipelineRemarks, GetRecruitPipelineHistoryPageList, GetRecruitPipelineById, EditRecruitPipelineStatus, GetRecruitPipelineEnumRecruitType, GetRecruitPipelineEnumStatus, GetRecruitPipelineEnumRecruitProvisionType } from '@/api/RecruitmentManagement.js'
import filters from '@/utils/filters'
import { MenuIdDate, copy, showLoading, hideLoading, IsJsonString } from '@/utils/CustomValidation.js'
// import { GetResumeProjectInfoList } from '@/api/TalentPool.js'
// import { GetResumePipelineStatusType, GetResumePipelineList, GetResumePipelineSeniorQuerys, EditResumePipelineStatus, GetResumePipelineStatusHistory, EditResumeAttachment, GetResumeAttachment } from '@/api/pipeline.js'
// import { AddProjectResumeCheck } from '@/api/project.js'
import qs from 'qs'
export default {
  // components: {
  //   simplesearch,
  //   advancedform,
  //   pipelinetable,
  //   remarkdialog,
  //   tagdialog,
  //   reminddialog,
  //   groupdialog,
  //   emaildialog,
  //   pmdlialog,
  //   filedialog
  // },
  filters: {
    Time2 (val) {
      if (val == '0001-01-01T00:00:00') {
        return '——'
      } else {
        return new Date(val).Format('yyyy-MM-dd hh:mm:ss')
      }
    },
  },
  data () {
    return {
      addVisible: false,
      remarks: '',
      userId: -1,
      SearchText: '',
      actives: -1,
      dropstyle: 6, // 下拉框样式 8=>eight-drop组件
      tableloading: false,
      conceal: false, // 隐藏一些值
      // 进度条
      schedules: [],
      operateList: [],
      // 默认选中
      initalValue: [],
      chooseRate: [], // 进度数组
      Allrate: [], // 整体进度
      isproject: '', // 是否关联项目
      staId: '', // 更新进度时传的Id
      // 日志进度条
      scheIndex: '-1', // 开始时选中callist状态
      form: {
        Key: '',
        Fields: 0,
        condition: ''
      },
      // 我的筛选条件
      myvalue: [],
      myoptions: [{
        value: '1',
        label: '条件一'
      },
      {
        value: '2',
        label: '条件二'
      }],
      reverse: true,
      tabidx: -1,
      showAdvanced: true, // 是否打开高级搜索
      dialogFormVisible: false, // 是否打开对备注对话框
      tagVisible: false, // 是否打开标签对话框
      remindVisible: false, // 是否打开提醒对话框
      groupVisible: false, // 是否打开分组弹框
      emailVisible: false, // 是否打开邮箱弹框
      pmVisible: false, // 是否打开项目弹框
      fileVisible: false, // 是否打开上传弹框
      updateShow: false, // 是否打开更新进度
      Name: 'XXX', // 进度框的名字
      ischoose: null, // 单选框选中的id
      phidenIndex: [0, 3, 5, 7],
      ID: '', // 简历ID,
      currentPage: 1,
      total: 0,
      PageSize: 10,
      tableList: [],
      advancedIstrue: true, // 判断是高级搜索还是简单搜索
      advancedData: {
        Key: '',
        PositionName: '',
        PositionType: '0',
        CompanyName: '',
        CompanyType: '0',
        Mobile: '',
        Diploma: '0',
        SchoolTypeTrue: false,
        SchoolType: 0,
        FormTrue: false,
        Form: 0,
        OverseasStudyTrue: false,
        OverseasStudy: 0,
        WorkYears: '0',
        MinAge: '',
        MaxAge: '',
        Sex: '',
        CompanyFeature: '',
        OwnerType: '',
        UserName: '',
        OriginAreaId: '',
        SalaryType: '',
        StartSalary: '',
        EndSalary: '',
        IndustryIdArr: [],
        IndustryIds: '',
        CareerId: null,
        CompanySize: '',
        SkillIds: '',
        SchoolName: '',
        Major: '',
        MemberIds: '',
        WorkStatus: '',
        Email: '',
        LabelIds: '',
        LanageIds: '',
        ResumeId: '',
        UpdateStartTime: '',
        UpdateEndTime: '',
        AreaId: '',
        TargetAreaId: '',
        MoreWhere: 0
      }, // 高级搜索参数
      selected: {},
      projectId: '', // 项目Id
      ResumeId: '', // 简历ResumeId
      StaffStatus: -1,
      StaffId: 0,
      RecruitPipelineId: 0,
      StaffName: '',
      Num: 0,
      MgrLogPageList: [],
      operates: [], // 操作权限
      pmUserName: '',
      oldschedule: [], // 弹框的操作按钮列表
      filterList: [], // 附件
      EmployeeStatus: [{
        value: 0,
        describe: '推荐入职'
      }, {
        value: 1,
        describe: '未面试'
      }, {
        value: 2,
        describe: '已面试'
      }, {
        value: 3,
        describe: '面试通过'
      }, {
        value: 4,
        describe: '试岗中'
      }, {
        value: 5,
        describe: '入职'
      }, {
        value: 6,
        describe: '面试未通过'
      }, {
        value: 7,
        describe: '试岗离职'
      }, {
        value: 8,
        describe: '离职'
      }, {
        value: 9,
        describe: '再次推荐'
      }],
      statusList: [],
      PipelineId: 0,
    }
  },
  created () {
    // 获取操作权限
    console.log(this.$route)
    // this.operates = this.$route.meta.operations
    // console.log(this.$route.meta.operations);
    // console.log(this.operates);
    // this.$store.dispatch('app/getSchedules', this.schedules)
    // console.log(this.$route.query.type);
    if (this.$route.query.type) {
      this.scheIndex = Number(this.$route.query.type)
    }
    if (this.$route.query.type1) {
      this.scheIndex = Number(this.$route.query.type1)
    }
    this.getResumePipelineStatusType()
    this.gettableList('Query')
  },
  methods: {
    saveimport () {
      let obj = {
        PipelineId: this.PipelineId,
        Remark: this.remarks,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      AddRecruitPipelineRemarks(obj).then(res => {
        if (res.IsSuccess) {
          this.$message({
            type: 'success',
            message: "添加备注成功"
          })
          this.addVisible = false
          this.remarks = ''
        } else {
          this.$message({
            type: 'danger',
            message: res.MessageContent
          })
        }
      })
    },
    closedialog () {
      this.addVisible = false
      this.remarks = ''
    },
    addRemarks (e) {
      this.PipelineId = e.Id
      this.addVisible = true
    },
    selectStatus (e) {
      this.statusList = []
      if (e != null && e.Status >= 0 && e.Id != -1) {
        this.userId = e.Id
        console.log(e.Status);
        this.EmployeeStatus.forEach(data => {
          if (e.Status == 0) {
            if (data.value == 1 || data.value == 2 || data.value == 6) {
              this.statusList.push(data)
            }
          } else if (e.Status == 1) {
            if (data.value == 9 || data.value == 6) {
              this.statusList.push(data)
            }
          } else if (e.Status == 2) {
            if (data.value == 3 || data.value == 6) {
              this.statusList.push(data)
            }
          } else if (e.Status == 3) {
            if (data.value == 4 || data.value == 5 || data.value == 6) {
              this.statusList.push(data)
            }
          } else if (e.Status == 4) {
            if (data.value == 6) {
              this.statusList.push(data)
            }
          } else if (e.Status == 6 || e.Status == 7 || e.Status == 8) {
            if (data.value == 9) {
              this.statusList.push(data)
            }
          }
        })
      } else {
        this.statusList = []
      }

    },
    changeEmployeeStatus (e) {
      let num = e.value
      if (num == 9) {
        num = 0
      }
      let obj = {
        Id: this.userId,
        Status: num,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      EditRecruitPipelineStatus(obj).then(res => {
        if (res.IsSuccess) {
          showLoading()
          this.gettableList()
          hideLoading()
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      })

    },
    searchtable () {
      this.gettableList()
    },
    GetEmployeeDetails (data) {
      const { href } = this.$router.resolve({
        path: '/RecruitmentManagement/InformationDetail',
        query: {
          id: data.StaffId
        }
      })
      window.open(href, '_blank')
    },
    watchtalent (data) {
      const { href } = this.$router.resolve({
        path: '/RecruitmentManagement/RecruitmentRrequirementDetails',
        query: {
          Id: data.PositionId
        }
      })
      window.open(href, '_blank')
    },
    changeStatus (e) {
      this.$confirm('是否修改员工状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: this.ischoose,
          Status: e.value,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EditRecruitPipelineStatus(obj).then(res => {
          if (res.IsSuccess) {
            showLoading()
            this.update()
            hideLoading()
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            this.$message({
              type: 'danger',
              message: res.MessageContent
            })
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    dialogCheck (selection, row) {
      this.$refs.multipleTable.clearSelection()
      if (selection.length === 0) { // 判断selection是否有值存在
        return
      }
      if (row) {
        console.log(row);
        this.selected = row
        this.$refs.multipleTable.toggleRowSelection(row, true)
        this.ischoose = this.selected.Id // 进度列表Id
        this.StaffName = this.selected.StaffName
        this.StaffStatus = this.selected.StaffStatus
        this.projectId = this.selected.ProjectId
        this.RecruitPipelineId = row.Id
      }
    },
    handleSelectionChange (val) {
      console.log(val);
    },
    onScreening (Arr) {
      if (Arr.OwnerName.length == 0) {
        this.advancedData.OwnerType = ''
      } else {
        this.advancedData.OwnerType = Arr.OwnerName[0]
      }
      this.gettableList('Query')
    },
    // 获取table表格数据
    gettableList () {
      this.tableloading = true
      // let data = this.advancedData
      // console.log(data);
      // data.PageIndex = this.currentPage || 1;
      // data.PageSize = this.PageSize || 10;
      // data.Type = 1;
      // if (this.scheIndex == '-1') {
      //   data.Status = ''
      // } else {
      //   data.Status = this.scheIndex;
      // }
      let obj = {
        QueryStr: this.SearchText,
        Status: this.tabidx,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Sign: "",
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      // data.MenuId = this.$operatedata(this.operate, code).MenuId;
      // data.OperationCode = this.$operatedata(this.operate, code).OperationCode
      GetRecruitPipelinePageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            console.log(response.Data);
            // for (let i = 0; i < response.Data.length; i++) {
            //   response.Data[i].visible = false
            // }
            this.tableList = response.Data
            for (var i = 0; i < this.tableList.length; i++) {
              this.EmployeeStatus.forEach(data => {
                if (this.tableList[i].Status == data.value) {
                  this.tableList[i].userStatusText = data.describe
                }
              })
            }
            this.total = response.Total
          } else {
            this.tableList = []
          }
          setTimeout(() => {
            this.tableloading = false
          }, 500);
        } else {
          this.$message({
            message: '搜索失败',
            type: 'error'
          })
        }
      })
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.gettableList('Query')
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.gettableList('Query')
    },
    // 高级搜索
    Submit (obj) {
      this.currentPage = 1
      this.advancedData = obj
      this.gettableList('Query')
    },
    // 更新进度
    update () {
      // console.log(window.localStorage.setItem('operate', JSON.stringify(e)));
      // 判断是否选中值
      if (this.ischoose) {
        let Obj = {
          Id: this.ischoose,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetRecruitPipelineById(Obj).then(res => {
          if (res.IsSuccess && res.Data != null) {
            let Status = res.Data.Status
            this.StaffId = res.Data.StaffId
            console.log(res.Data);
            if (Status >= 0 && Status < 3) {
              this.actives = 1
            } else if (Status >= 3 && Status < 4) {
              this.actives = 2
            } else if (Status >= 4 && Status < 5) {
              this.actives = 3
            } else if (Status == 5) {
              this.actives = 4
            } else {
              this.actives = -1
            }
          }
        })
        this.updateShow = true
        if (this.projectId) {
          // console.log(this.StaffStatus);
          let obj = {
            // ResumeId: this.ResumeId,
            // ProjectId: this.projectId,
            MenuId: MenuIdDate(),
            operationcode: '1'
          }
          let obj2 = {
            RecruitPipelineId: this.RecruitPipelineId,
            PageIndex: this.currentPage,
            PageSize: this.PageSize,
            Sign: '',
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          GetRecruitPipelineEnumStatus(qs.stringify(obj)).then(response => {
            if (response.length > 0) {
              this.Allrate = response
              // if (response.Data.length) {
              //   this.Allrate = response.Data[0].StatusList
              // } else {
              //   this.Allrate = []
              // }
              console.log(this.Allrate);
            } else {
              this.Allrate = []
            }
          })
          GetRecruitPipelineHistoryPageList(obj2).then(res => {
            if (res.IsSuccess && res.Data != null) {
              this.MgrLogPageList = res.Data
              console.log(this.MgrLogPageList);
            } else {
              this.MgrLogPageList = []
            }
          })
        } else {
          this.Allrate = []
        }
      } else {
        this.$message({
          message: '请先选择简历',
          type: 'warning'
        })
      }
    },
    // 刷新table
    refreshBack () {
      this.gettableList('Query')
    },
    // 选择进度
    chooseschedule (e) {
      this.tabidx = e
      this.currentPage = 1
      // if (e == 0 || e == 9 || e == 10 || e == 11 || e == 12) {
      //   this.phidenIndex = [0, 3, 5, 7]
      // } else if (e == 1 || e == 2 || e == 3 || e == 4 || e == 5 || e == 6 || e == 7) {
      //   this.phidenIndex = [0, 3, 5, 6, 7]
      // } else if (e == 8) {
      //   this.phidenIndex = [0, 3, 5]
      // }
      this.gettableList()
      // if (e == 0) {
      //   // calllist
      //   this.chooseRate = [0]
      //   this.getList([1, 2, 3, 4, 9, 10, 11])
      // } else if (e == 1) {
      //   // 推荐面试
      //   this.chooseRate = [0, 1]
      //   this.getList([2, 3, 4, 9, 11])
      // } else if (e == 2) {
      //   // 面试一轮
      //   this.chooseRate = [0, 1, 2]
      //   this.getList([3, 5, 9, 10, 11])
      // } else if (e == 3) {
      //   // 面试二轮
      //   this.chooseRate = [0, 1, 2, 3]
      //   this.getList([4, 5, 9, 10, 11])
      // } else if (e == 4) {
      //   // 面试三轮
      //   this.chooseRate = [0, 1, 2, 3, 4]
      //   this.getList([5, 9, 10, 11])
      // } else if (e == 5) {
      //   // offer
      //   this.chooseRate = [0, 1, 2, 3, 4, 5]
      //   this.getList([6, 7, 9, 10, 11])
      // } else if (e == 6) {
      //   // 背调
      //   this.chooseRate = [0, 1, 2, 3, 4, 5, 6]
      //   this.getList([7, 9, 10, 11])
      // } else if (e == 7) {
      //   // 入职
      //   this.chooseRate = [0, 1, 2, 3, 4, 5, 6, 7]
      //   this.getList([8, 9, 10, 11, 12])
      // } else if (e == 8) {
      //   // 过保
      //   this.chooseRate = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      //   this.getList([0])
      // } else if (e == 9) {
      //   // 不合适
      //   this.chooseRate = []
      //   this.getList([0])
      // } else if (e == 10) {
      //   // 停止推荐
      //   this.chooseRate = []
      //   this.getList([0])
      // } else if (e == 11) {
      //   // 不接受offer
      //   this.chooseRate = []
      //   this.getList([0])
      // } else if (e == 12) {
      //   // 未能过保
      //   this.chooseRate = []
      //   this.getList([0])
      // }
    },
    // 获取相对应的列表
    getList (arr) {
      this.operateList = []
      for (let i = 0; i < arr.length; i++) {
        var test = this.oldschedule[this.oldschedule.findIndex(item => item.value == arr[i])]
        this.operateList.push(test)
      }
    },
    // 打开对话框
    opendialog (e, dom, id, userName) {
      this.ID = id
      this.Name = userName
      if (dom === 'fileVisible') {
        // 获取简历附件详情
        let obj = {
          Id: id,
          MenuId: MenuIdDate(),
          OperationCode: '1'
        }
        showLoading()
        GetResumeAttachment(qs.stringify(obj)).then(response => {
          hideLoading()
          this[dom] = e
          if (response.IsSuccess) {
            if (response.Data && response.Data != '0') {
              // 判断是否是JSON格式
              if (IsJsonString(response.Data)) {
                this.filterList = JSON.parse(response.Data)
              } else {
                this.filterList = [{
                  name: '附件一',
                  Url: response.Data,
                  visible: false
                }]
              }
            } else {
              this.filterList = []
            }
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        this[dom] = e
      }
    },
    // 关闭备注框
    onremark (e, refresh) {
      this.dialogFormVisible = e
      if (refresh) {
        this.gettableList('Query')
      }
    },
    // 关闭标签弹框
    ontag (e, refresh) {
      this.tagVisible = e
      if (refresh) {
        this.gettableList('Query')
      }
    },
    onremind (e) {
      this.remindVisible = e
    },
    ongroup (e) {
      this.groupVisible = e
    },
    onemail (e) {
      this.emailVisible = e
    },
    onpm (e, refresh) {
      this.pmVisible = e
      if (refresh) {
        this.gettableList('Query')
      }
    },
    // 关闭弹框
    closefile () {
      this.fileVisible = false
    },
    // 单选框选中的Id
    // chooseradio(e) {
    //   if(e!=[]){
    //     console.log(this.selected);
    //     this.selected=e[0];
    //     console.log(this.selected);
    //   // 获取选中Id,
    //   // this.isproject = isselect
    //   if(this.selected!=''){
    //   // this.Name = e[0].UserName
    //   // this.ResumeId = e[0].ResumeId // 简历Id
    //   this.ischoose = this.selected.Id // 进度列表Id
    //   // this.staId = e[0].Id
    //   this.StaffName=this.selected.StaffName
    //   this.StaffStatus=this.selected.StaffStatus
    //   this.projectId = this.selected.ProjectId // 项目Id
    //   // this.Num =e[0].Num
    //   }
    //   }

    //   if (e.Status === 0) {
    //     // calllist
    //     this.getList([1, 2, 3, 4, 9, 10, 11])
    //   } else if (e.Status === 1) {
    //     // 推荐面试
    //     this.getList([2, 3, 4, 9, 11])
    //   } else if (e.Status === 2) {
    //     // 面试一轮
    //     this.getList([3, 5, 9, 10, 11])
    //   } else if (e.Status === 3) {
    //     // 面试二轮
    //     this.getList([4, 5, 9, 10, 11])
    //   } else if (e.Status === 4) {
    //     // 面试三轮
    //     this.getList([5, 9, 10, 11])
    //   } else if (e.Status === 5) {
    //     // offer
    //     this.getList([6, 7, 9, 10, 11])
    //   } else if (e.Status === 6) {
    //     // 背调
    //     this.getList([7, 9, 10, 11])
    //   } else if (e.Status === 7) {
    //     // 入职
    //     this.getList([8, 9, 10, 11, 12])
    //   } else if (e.Status === 8) {
    //     // 过保
    //     this.getList([0])
    //   } else if (e.Status === 9) {
    //     // 不合适
    //     this.getList([0])
    //   } else if (e.Status === 10) {
    //     // 停止推荐
    //     this.getList([0])
    //   } else if (e.Status === 11) {
    //     // 不接受offer
    //     this.getList([0])
    //   } else if (e.Status === 12) {
    //     // 未能过保
    //     this.getList([0])
    //   }
    // },
    closedrawer () {
      this.ischoose = null
      this.gettableList()
    },
    // 获取候选人类型
    getResumePipelineStatusType () {
      // let obj={
      //   QueryStr: "",
      //   Status: -1,
      //   PageIndex: this.currentPage,
      //   PageSize: this.PageSize,
      //   Sign: "",
      //   menuid: MenuIdDate(),
      //   operationcode: '1'
      // }
      GetRecruitPipelineEnumRecruitProvisionType({ menuid: MenuIdDate(), operationcode: '1' }).then(response => {
        this.schedules = response
        this.oldschedule = copy(response)
        // this.$store.dispatch('app/getSchedules', this.schedules)
        this.schedules.unshift({
          describe: "全部",
          value: '-1'
        })
        // this.getList([1, 2, 3, 4, 9, 10, 11])
        // this.Allrate = JSON.stringify(this.schedules)
        // this.Allrate = JSON.parse(this.Allrate).reverse().splice(4).reverse()
        this.chooseRate = [0]
        // this.rate = this.schedules.slice(1)
        // console.log(this.rate)
      })
    },
    // 更新进度
    updateResumePipeline (sta) {
      let operate = JSON.parse(window.localStorage.getItem('operate')) || {}
      if (this.isproject) {
        if (sta == 1) {
          let obj = {
            ProjectId: this.projectId,
            ResumeId: this.ResumeId,
            Status: 0,
            MenuId: operate.MenuId,
            OperationCode: operate.OperationCode
          }
          AddProjectResumeCheck(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '审核中',
                type: 'success'
              })
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          let obj = {
            Id: this.staId,
            Status: sta,
            MenuId: operate.MenuId,
            OperationCode: operate.OperationCode
          }
          EditResumePipelineStatus(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.gettableList('Query')
              this.updateShow = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      } else if (sta == 9 || sta == 10 || sta == 11 || sta == 0) {
        let obj = {
          Id: this.staId,
          Status: sta,
          MenuId: operate.MenuId,
          OperationCode: operate.OperationCode
        }
        EditResumePipelineStatus(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.gettableList('Query')
            this.updateShow = false
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '请先关联到项目',
          type: 'warning'
        })
      }
    },

    // 上传附件
    addfile (e) {
      const operate = JSON.parse(window.localStorage.getItem('operate')) || {}
      this.filterList.push(e)
      let obj = {
        Id: this.ID,
        UserName: this.Name,
        Attachment: JSON.stringify(this.filterList),
        MenuId: operate.MenuId,
        OperationCode: operate.OperationCode
      }
      showLoading()
      EditResumeAttachment(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.fileVisible = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.advanced-search {
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
  position: relative;
  z-index: 10;
  // &::before {
  //   content: "";
  //   width: 0px;
  //   height: 0px;
  //   border: 24px solid transparent;
  //   border-bottom: 38px solid #fff;
  //   position: absolute;
  //   right: 21px;
  //   top: -47px;
  // }
}
.content {
  .operate-top {
    float: right;
    margin-top: 20px;
    .addmenu {
      margin: 0px 20px 0px 0px;
    }
    .el-button + .el-button {
      margin-left: 16px;
    }
  }
  .operation-bar {
    .resume-parsing {
      float: right;
      border: 1px solid #638df8;
      color: #638df8;
    }
    .saas-tabs {
      margin-top: 24px;
    }
    .import-talent {
      float: right;
      border: 1px solid #638df8;
      color: #638df8;
      margin-left: 24px;
    }
    .update-plan {
      float: right;
      margin-left: 24px;
      margin-top: 24px;
      margin-right: 24px;
    }
  }
  .operate-table {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 20px;
    padding: 20px;
    border-radius: 0;
    .watchcode {
      color: #1588f8;
      cursor: pointer;
    }
  }
}
.saas-pagina {
  background-color: #fff;
  margin-left: 24px;
  padding: 24px;
}
// 抽屉进度样式
.schedule-drawer {
  .saas-schedule {
    // min-height: 600px;
    margin-left: 20px;
    overflow-y: auto;

    > li {
      display: flex;
      font-size: 14px;

      .log-plan {
        position: relative;
        padding-bottom: 32px;
        padding-top: 5px;
        width: 16px;

        .ring {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 8px;
          background-color: #ccdaff;

          &::after {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background-color: #1470cc;
            z-index: 999;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .line {
          height: 100%;
          position: absolute;
          width: 2px;
          background-color: #ccdaff;
          left: 8px !important;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .center {
        flex: 1;
        padding-left: 8px;
        padding-bottom: 32px;
        color: #999;

        .center-name {
          color: #1470cc;
          background-color: #ccddff;
          line-height: 14px;
          padding: 5px 10px;
          border-radius: 4px;
          display: inline-block;
        }

        .center-time {
          display: inline-block;
          color: #999;
          line-height: 30px;
          margin-left: 10px;
        }
        .ProjectName {
          color: #1588f8;
        }

        .center-operation2 {
          color: #333;
          font-weight: 700;
          line-height: 24px;
          margin: 14px 0;
        }
      }
    }
  }
  h3 {
    margin-left: 20px;
  }
  .steps-Box {
    margin-bottom: 20px;
  }
  .RecruitmentStatus-Box {
    margin: 0px 20px;
    padding: 10px 0;
    background-color: #e0edff;
    .RecruitmentStatus {
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      margin-left: 6px;
      background-color: #1588f8;
      color: #fff;
      text-align: center;
      margin-bottom: 5px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: #638df8;
      }
    }
  }
  .saas-schedule {
    max-height: calc(100vh - 300px);
    margin-top: 40px;
  }
}
</style>
