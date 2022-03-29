<!-- 离职人员管理 -->
<template>
  <div class="expatriate-management-history">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入员工名称进行查询"
          size="small"
          v-model="searchform.UserName"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">身份证号码</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入身份证号码进行查询"
          size="small"
          v-model="searchform.IdCode"
        >
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition" v-if="tabidx == 1">
        <div class="search-name">就职项目</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入就职项目进行查询"
          size="small"
          v-model="searchform.ProjectName"
        >
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition" v-if="tabidx == 1">
        <div class="search-name">员工单位</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入员工单位进行查询"
          size="small"
          v-model="searchform.CompanyName"
        >
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition" v-if="tabidx == 2">
        <div class="search-name">原就职项目</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入原就职项目进行查询"
          size="small"
          v-model="searchform.ProjectName"
        >
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition" v-if="tabidx == 2">
        <div class="search-name">原就职岗位</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入原就职岗位进行查询"
          size="small"
          v-model="searchform.PositionName"
        >
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable"
          >查询</el-button
        >
      </div>
    </div>
    <div class="content">
      <div>
        <div class="operate-top">
          <el-button
            v-if="$operatebtn(operates, 'BackEntry') && tabidx == 1"
            size="small"
            class="addmenu erpbtn"
            @click="Rejoins('BackEntry')"
            >重新入职</el-button
          >
          <div class="screening-compent">
            <!-- 筛选列组件 -->
            <ScreeningComponent
              v-if="tabidx == 1"
              :formTheadOptions="formTheadOptions"
              :checkboxVal="checkboxVal"
              @SelectCheck="SelectCheck"
            ></ScreeningComponent>
          </div>
        </div>
        <div class="tab clearfix">
          <div
            class="tab-name"
            :class="{ active: tabidx == item.value }"
            @click="choosetab(item)"
            v-for="(item, index) in tablist"
            :key="index"
          >
            {{ item.describe }}
          </div>
        </div>
        <div class="operate-table" v-if="tabidx == 1">
          <el-table
            ref="multipleTable1"
            class="erp-table"
            key="1"
            v-loading="tableloading"
            :data="tableData"
            max-height="600"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column align="center" type="selection" width="55" label="全选" /> -->
            <el-table-column
              align="center"
              prop="Id"
              min-width="80"
              fixed
              label="单选"
            >
              <template slot-scope="scope">
                <el-radio
                  v-model="radio"
                  :label="scope.row"
                  :key="scope.row.Id"
                  >{{ scope.row.Id }}</el-radio
                >
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" type="index" width="55" label="编号" /> -->
            <el-table-column
              align="center"
              v-if="$getColumsFlag('UserName', checkboxVal)"
              prop="UserName"
              fixed
              label="员工姓名"
              min-width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span
                  class="watchcode"
                  @click="watchstaff(scope.row.Id, 'View')"
                  >{{ scope.row.UserName }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="$getColumsFlag('Sex', checkboxVal)"
              prop="Sex"
              label="性别"
              min-width="55"
            >
              <template slot-scope="scope">
                {{ scope.row.Sex | Sex }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="$getColumsFlag('IdCode', checkboxVal)"
              prop="IdCode"
              label="身份证号码"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('Mobile', checkboxVal)"
              prop="Mobile"
              label="联系电话"
              min-width="140"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('BankAccount', checkboxVal)"
              prop="BankAccount"
              label="工资卡账号"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('BankNamestr', checkboxVal)"
              prop="BankNamestr"
              label="工资卡开户行"
              min-width="140"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('SiAccount', checkboxVal)"
              prop="SiAccount"
              label="社保账号"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('SiAreaName', checkboxVal)"
              prop="SiAreaName"
              label="原参保地"
              min-width="140"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('FundAccount', checkboxVal)"
              prop="FundAccount"
              label="公积金账号"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('PersonalTaxRuleId', checkboxVal)"
              prop="PersonalTaxRuleId"
              label="原个税扣除规则"
              min-width="140"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('CompanyName', checkboxVal)"
              prop="CompanyName"
              label="曾用工单位"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('ProjectName', checkboxVal)"
              prop="ProjectName"
              label="曾就职项目"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('Position', checkboxVal)"
              prop="Position"
              label="就职岗位"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('BfCompanyName', checkboxVal)"
              prop="BfCompanyName"
              label="入职公司"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('JoinTime', checkboxVal)"
              prop="JoinTime"
              label="入职时间"
              min-width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.JoinTime | Time }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="$getColumsFlag('LastQuitCert', checkboxVal)"
              prop="LastQuitCert"
              label="原公司离职证明状态"
              min-width="180"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.LastQuitCert | LastQuitCert }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="$getColumsFlag('StatusText', checkboxVal)"
              prop="StatusText"
              label="目前就职状态"
              min-width="140"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('LeaveSysUserName', checkboxVal)"
              prop="LeaveSysUserName"
              label="离职办理人"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              v-if="$getColumsFlag('AddTime', checkboxVal)"
              prop="AddTime"
              label="添加时间"
              min-width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.AddTime | Time }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="$getColumsFlag('LeaveTime', checkboxVal)"
              prop="LeaveTime"
              label="离职时间"
              min-width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.LeaveTime | Time }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="80"
            >
              <template slot-scope="scope">
                <el-dropdown
                  trigger="click"
                  v-if="$operatebtn(operates, 'BackEntry')"
                >
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="setting" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <el-dropdown-item
                        v-if="$operatebtn(operates, 'BackEntry')"
                        @click.native="Rejoin(scope.row, 'BackEntry')"
                        >重新入职</el-dropdown-item
                      >
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="operate-table" v-if="tabidx == 2">
          <el-table
            ref="multipleTable2"
            class="erp-table"
            key="2"
            v-loading="tableloading"
            :data="tableData"
            max-height="600"
            tooltip-effect="dark"
          >
            <el-table-column
              align="center"
              prop="StaffName"
              fixed
              label="员工姓名"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span
                  class="watchcode"
                  @click="watchstaff(scope.row.StaffId, 'View')"
                  >{{ scope.row.StaffName }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="IdCode"
              label="身份证号码"
              min-width="160"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="CompanyName"
              label="曾用工单位"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="ProjectName"
              label="曾就职项目"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="PositionName"
              label="就职岗位"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="LeaveAgree"
              label="原公司离职证明状态"
              width="180"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.LeaveAgree | LastQuitCert }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="SysUserName"
              label="离职办理人"
              width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="AddTime"
              label="添加时间"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.AddTime | Time }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="LeaveTime"
              label="离职时间"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.LeaveTime | Time }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagina-fonter">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <dialogresignation
        :title="resignationname"
        :visible="resignationvisible"
        :contentdata="resignationdata"
        @closedialog="closedialog"
        @saveresignation="saveresignation"
      ></dialogresignation>
    </div>
  </div>
</template>

<script>
import ScreeningComponent from "@/components/publicComponents/ScreeningComponent";
import dialogresignation from "./components/dialog-resignation";
import {
  GetStaffHistoryPageList,
  GetStaffProjectLeaveList,
} from "@/api/OutsourcedEmployeeManagement.js";
import filters from "@/utils/filters";
import {
  showLoading,
  hideLoading,
  copy,
  MenuIdDate,
} from "@/utils/CustomValidation";
import qs from "qs";
export default {
  components: {
    dialogresignation,
    ScreeningComponent,
  },
  filters: {
    LastQuitCert(value) {
      if (value == 0) {
        return "未提交";
      } else if (value == 1) {
        return "已提交";
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      searchform: {
        UserName: "",
        IdCode: "",
        CompanyName: "",
        ProjectName: "",
        PositionName: "",
        Comprehensive: "",
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "员工姓名", prop: "UserName" },
        { label: "性别", prop: "Sex" },
        { label: "身份证号码", prop: "IdCode" },
        { label: "联系电话", prop: "Mobile" },
        { label: "工资卡账号", prop: "BankAccount" },
        { label: "工资卡开户行", prop: "BankNamestr" },
        { label: "社保账号", prop: "SiAccount" },
        { label: "原参保地", prop: "SiAreaName" },
        { label: "公积金账号", prop: "FundAccount" },
        { label: "原个税扣除规则", prop: "PersonalTaxRuleId" },
        { label: "曾用工单位", prop: "CompanyName" },
        { label: "曾就职项目", prop: "ProjectName" },
        { label: "入职公司", prop: "BfCompanyName" },
        { label: "入职时间", prop: "JoinTime" },
        { label: "就职岗位", prop: "Position" },
        { label: "原公司离职证明状态", prop: "LastQuitCert" },
        { label: "目前就职状态", prop: "StatusText" },
        { label: "离职办理人", prop: "LeaveSysUserName" },
        { label: "添加时间", prop: "AddTime" },
        { label: "离职时间", prop: "LeaveTime" },
      ],
      resignationname: "离职办理",
      resignationvisible: false, // 离职弹框
      resignationdata: {}, // 离职弹框内容
      tableloading: false, // 表格加载
      allchecked: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      radio: "",
      Ids: [],
      Id: "",
      tabidx: 1,
      tablist: [
        {
          value: 1,
          describe: "离职人员信息管理",
        },
        {
          value: 2,
          describe: "离职项目管理",
        },
      ],
      operates: [], // 获取页面权限
    };
  },
  created() {
    // 获取页面权限
    this.operates = this.$route.meta.operations;
    this.getStaffHistoryPageList();
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop);
    }
  },
  methods: {
    //筛选项
    SelectCheck(val) {
      this.tableloading = true;
      this.checkboxVal = val;
      this.tableloading = false;
    },
    // 切换tab栏
    choosetab(e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return;
      } else {
        // 切换到第一页
        this.currentPage = 1;
        this.tabidx = e.value;
        if (this.tabidx == 1) {
          this.getStaffHistoryPageList();
          this.checked = false;
          this.multipleSelection = [];
        } else {
          this.getStaffProjectLeaveList();
        }
      }
    },
    // 获取外包员工信息
    getStaffHistoryPageList() {
      let obj = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        UserName: this.searchform.UserName,
        IdCode: this.searchform.IdCode,
        CompanyName: this.searchform.CompanyName,
        ProjectName: this.searchform.ProjectName,
        Comprehensive: this.searchform.Comprehensive,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      this.tableloading = true;
      GetStaffHistoryPageList(qs.stringify(obj)).then((response) => {
        this.tableloading = false;
        if (response.IsSuccess) {
          this.tableData = response.Data;
          this.total = response.Total;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    // 获取项目离职信息
    getStaffProjectLeaveList() {
      let obj = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        StaffName: this.searchform.UserName,
        IdCode: this.searchform.IdCode,
        ProjectName: this.searchform.ProjectName,
        PositionName: this.searchform.PositionName,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      this.tableloading = true;
      GetStaffProjectLeaveList(qs.stringify(obj)).then((response) => {
        this.tableloading = false;
        if (response.IsSuccess) {
          this.tableData = response.Data;
          this.total = response.Total;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    // 搜索
    searchtable() {
      this.currentPage = 1;
      if (this.tabidx == 1) {
        this.getStaffHistoryPageList();
      } else {
        this.getStaffProjectLeaveList();
      }
    },
    // 入职办理
    onboarding() {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));

      this.$router.push({
        path: "/OutsourcedEmployeeManagement/AddExpatriateEmployees",
      });
    },
    // 离职办理
    resignation() {},
    // 员工详情
    watchstaff(ID, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      window.localStorage.setItem("operating", JSON.stringify(operating));
      if (!operating.MenuId) {
        this.$message({
          message: '没有权限查看',
          type: 'warning'
        })
        return
      }
      if (this.tabidx == 1) {
        const { href } = this.$router.resolve({
          path: "/OutsourcedEmployeeManagement/ExpatriateEmployeesDeatil",
          query: {
            id: ID,
            type: true,
          },
        });
        window.open(href, "_blank");
      } else {
        const { href } = this.$router.resolve({
          path: "/OutsourcedEmployeeManagement/ExpatriateEmployeesDeatil",
          query: {
            id: ID,
          },
        });
        window.open(href, "_blank");
      }
    },
    // 修改
    // update(e) {
    //   let breadpath = {
    //     name: this.$route.name,
    //     router: this.$route.path
    //   }
    //   window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

    //   this.$router.push({
    //     path: '/OutsourcedEmployeeManagement/AddExpatriateEmployees',
    //     query: {
    //       id: e.Id
    //     }
    //   })
    // },
    // 关联项目
    relateditem(e) {},
    // 离职办理
    leave() {},
    // 保存离职弹框
    saveresignation(e) {},
    // 弹窗关闭
    closedialog() {
      this.resignationvisible = false;
    },
    handleSelectionChange(value) {
      this.Ids = [];
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id);
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
    },
    // 全选
    selectall() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    // 更改薪酬 计算规则
    salarycalculationrules() {},
    // 批量修改关联项目
    relateditems() {},
    // 证明开具
    enables() {},
    // 批量重新入职
    Rejoins(op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      window.localStorage.setItem("operating", JSON.stringify(operating));
      if (!this.radio) {
        this.$message({
          message: "请选择要重新入职的人",
          type: "warning",
        });
        return;
      } else {
        window.localStorage.removeItem("multipleBreadpath");
        console.log(this.radio);
        if (this.radio.IsStaffBlack === 1) {
          this.$confirm("该员工已被列为黑名单, 是否继续关联项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              window.localStorage.removeItem("multipleBreadpath");
              let breadpath = {
                name: this.$route.name,
                router: this.$route.path,
              };
              window.localStorage.setItem(
                "breadpath",
                JSON.stringify(breadpath)
              );

              this.$router.push({
                path: "/OutsourcedEmployeeManagement/AddExpatriateEmployees",
                query: {
                  id: this.radio.StaffId,
                  type: true,
                },
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "操作已取消",
              });
            });
        } else {
          let breadpath = {
            name: this.$route.name,
            router: this.$route.path,
          };
          window.localStorage.setItem("breadpath", JSON.stringify(breadpath));

          this.$router.push({
            path: "/OutsourcedEmployeeManagement/AddExpatriateEmployees",
            query: {
              id: this.radio.StaffId,
              type: true,
            },
          });
        }
        return;
      }
    },
    // 重新入职
    Rejoin(e, op) {
      window.localStorage.removeItem("multipleBreadpath");
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      window.localStorage.setItem("operating", JSON.stringify(operating));
      if (e.IsStaffBlack === 1) {
        this.$confirm("该员工已被列为黑名单, 是否继续关联项目?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push({
              path: "/OutsourcedEmployeeManagement/AddExpatriateEmployees",
              query: {
                id: this.radio.StaffId,
                type: true,
              },
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "操作已取消",
            });
          });
      } else {
        this.$router.push({
          path: "/OutsourcedEmployeeManagement/AddExpatriateEmployees",
          query: {
            id: e.StaffId,
            type: true,
          },
        });
      }
    },
    // 选择分页大小
    handleSizeChange(val) {
      this.PageSize = val;
      if (this.tabidx == 1) {
        this.getStaffHistoryPageList();
      } else {
        this.getStaffProjectLeaveList();
      }
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.tabidx == 1) {
        this.getStaffHistoryPageList();
      } else {
        this.getStaffProjectLeaveList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.expatriate-management-history {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
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
  // .operate-top {
  //   padding-top: 32px;
  //   .tab-name {
  //     float: left;
  //     height: 48px;
  //     line-height: 48px;
  //     text-align: center;
  //     width: 140px;
  //     font-size: $f14;
  //     color: #fff;
  //     background-color: $erpplaceholder;
  //     border-radius: 8px 8px 0 0;
  //     cursor: pointer;
  //     &.active {
  //       color: $erp333;
  //       background-color: #fff;
  //     }
  //     margin-right: 8px;
  //   }
  // .addmenu {
  //   float: right;
  //   margin: 0 20px 0 0;
  //   width: 96px;
  // }
  // }
  .content {
    background-color: #fff;
    margin-left: 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-top {
      margin: 26px 24px 0 24px;
      float: right;
      .screening-compent {
        float: right;
        margin-right: 5px;
      }
    }
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
    }
    .operate-table {
      background: #fff;
      padding: 20px;
    }
    .pagina-fonter {
      margin: 0;
      background-color: #fff;
      padding-bottom: 30px;
    }
  }
}
// .operate-table {
//   /deep/ .cell {
//     padding-right: 0;
//     overflow: inherit;
//   }
// }
</style>