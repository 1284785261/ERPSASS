<!-- 人才信息管理 -->
<template>
  <div class="information-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" placeholder="请输入员工名称进行查询" size="small" v-model="searchform.UserName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">联系电话</div>
        <el-input class="erpsearchinput" placeholder="请输入联系电话进行查询" size="small" v-model="searchform.Mobile">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">最高学历</div>
        <el-select v-model="searchform.Diploma" class="erpsearchinput" size="small" clearable placeholder="请选择最高学历">
          <el-option v-for="item in StaffEnumDiploma" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="leadtalent">导入人才</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Query')" class="addmenu erpbtn" @click="entertalent('Add')">录入人才</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" />
          <el-table-column align="center" prop="Id" min-width="120" fixed label="员工工号" />
          <el-table-column align="center" prop="UserName" label="员工姓名" min-width="120">
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'View')" class="watchcode" @click="watchtalent(scope.row)">{{ scope.row.UserName }}</a>
              <span v-else>{{ scope.row.UserName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Sex" label="性别" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Sex | Sex }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Mobile" label="联系电话" min-width="120" />
          <el-table-column align="center" prop="AreaId" label="通讯地址" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.AreaName | AddressFiltering
                }}{{ scope.row.Address }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="DiplomaText" label="最高学历" min-width="120" />
          <el-table-column align="center" prop="SysUserName" label="录入人员" min-width="120" />
          <!-- <el-table-column align="center" prop="StatusText" label="在职状态" min-width="120" /> -->
          <el-table-column align="center" prop="AddTime" label="录入时间" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.AddTime | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="UpdateTime" label="更新时间" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.UpdateTime | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates, ['Modify', 'Delete'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="compile(scope.row, 'Modify')">编辑人才</el-dropdown-item>
                    <el-dropdown-item @click.native="AddRecommended(scope.row)">推荐入职</el-dropdown-item>
                    <!-- <el-dropdown-item @click.native="addpipeline(scope.row)">取消推荐</el-dropdown-item> -->
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="deletetalent(scope.row, 'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="addmenu erpbtn" @click="disables('Disabled')">推荐入职</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <el-dialog :close-on-click-modal="false" title="导入人才" :visible.sync="importvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <div>选择渠道</div>
        <el-select class="select-input" filterable placeholder="" v-model="ChooseChannel" @change="channel(SelectingChannelMembers)">
          <el-option v-for="item in SelectingChannelMembers" :key="item.Id" :value="item.ChannelName"></el-option>
        </el-select>

        <div class="selectFile">
          <div class="title">选择文件</div>
          <div class="input-Box">
            <el-input placeholder="未选择任何文件" :value="files" type="readonly"></el-input>
            <input type="file" ref="upload" accept=".xls,.xlsx" id="" @change="uploadfile" class="search-input" />
            <el-button size="small" type="primary" class="flieBtn">选择文件</el-button>
          </div>
          <div class="titleText">
            <span>当前位置仅支持导入Excel</span>
            <span style="color: #1588f8; float: right; cursor: pointer" @click="downemployees">点击下载导入模板</span>
          </div>
        </div>

        <!-- <div class="file-box">
          <div class="title">选择文件</div>
          <div class="file">
            <div class="img-box-list" v-if="!files">
               未上传样式 
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
                  <svg-icon icon-class="money" />
                  <span>重新上传</span>
                </div>
                <div class="btn" @click="deletefile()">
                  <svg-icon icon-class="money" />
                  <span>删除</span>
                </div>
              </div>
            </div>
            <div class="downimport" @click="downemployees">点击下载导入模板</div>
          </div>
        </div> -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveimport">开始导入</el-button>
        </span>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="部分导入失败提示" :visible.sync="reportvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closereport">
        <div class="error-box">
          <div class="error-top">
            <!-- <div class="success-total">成功 {{errordata.Successes}}</div> -->
            <div class="error-total">
              文件导入失败<span>{{ errordata.Errors }}</span> 条
            </div>
          </div>
          <div class="error-content">
            <div class="row" v-for="(item, index) in errordata.ImportToExcelErrorList" :key="index">
              <div class="index">第{{ item.Rows }}条</div>
              <div class="con">{{ item.Message }}</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="reportvisible = !reportvisible">修改后重新导入</el-button>
        </span>
      </el-dialog>
    </div>
    <EditRecommendedEntryDetails :Recommend="Recommend" @statused="statused" :ChannelTitle="ChannelTitle" :sendId="sendId" @closeDlg="closeDlg" @RecommendSave="RecommendSave"></EditRecommendedEntryDetails>
  </div>
</template>

<script>
import EditRecommendedEntryDetails from "./components/EditRecommendedEntryDetails.vue";
import { GetRecruitRecommendStaffList } from "@/api/RecruitmentManagement";
import {
  GetRecruitChannelPageList,
  ImportToStaffExcel,
  AddRecruitPipeline
} from "@/api/Public.js";
import {
  GetStaffPageList,
  DeleteStaff,
  GetRecruitStaffPageList
} from "@/api/OutsourcedEmployeeManagement.js";
import { GetStaffExcelModel } from "@/api/OutsourcedEmployeeManagement.js";
import { GetStaffEnum } from "@/api/Public.js";
import { MenuIdDate, showLoading, hideLoading } from "@/utils/CustomValidation";
import qs from "qs";
export default {
  components: {
    EditRecommendedEntryDetails
  },
  data() {
    return {
      param: "",
      ChannelId: 0,
      ChooseChannel: "",
      FileDatas: null,
      confoms: [
        {
          id: 1,
          username: "张三"
        },
        {
          id: 2,
          username: "李四"
        }
      ],
      searchform: {
        UserName: "",
        IdCode: "",
        CompanyName: "",
        ProjectName: "",
        Comprehensive: "",
        Mobile: "",
        Diploma: ""
      },
      StaffEnumDiploma: [], // 学历列表
      current: {},
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      ChannelTitle: "编辑推荐入职明细",
      importvisible: false,
      files: null, // 文件
      filterdata: {
        type: "",
        name: "",
        visible: false
      },
      Ids: [], //多选选中的数据ID
      allchecked: false, // 全选
      reportvisible: false,
      errordata: {},
      sendId: 0,
      SelectingChannelMembers: [],
      Recommend: false,
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query"
      }
    };
  },
  created() {
    // 获取当前登录信息
    this.current = JSON.parse(window.localStorage.getItem("Current"));
    if (this.$route.meta.operations) {
      console.log(this.$route.meta.operations);
      this.operates = this.$route.meta.operations;
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      console.log(this.operatiOBj);
      localStorage.setItem("looks", JSON.stringify(this.operatiOBj));
      if (this.current.currentId) {
        this.getStaffPageList(this.operatiOBj);
      }
    }
    this.getStaffEnum();
    this.GetRecruitChannelPageList();
  },
  methods: {
    RecommendSave(e) {
      AddRecruitPipeline(e).then(res => {
        if (res.MessageCode == 0) {
          this.$message({
            message: "添加推荐入职成功",
            type: "success"
          });
          this.getStaffPageList(this.operatiOBj);
          this.Recommend = false;
        } else {
          this.$message({
            message: res.MessageContent,
            type: "error"
          });
        }
      });
    },
    //关闭弹窗
    closeDlg(e) {
      this.Recommend = e;
    },
    channel(e) {
      for (var i in e) {
        if (e[i].ChannelName == this.ChooseChannel) {
          this.ChannelId = e[i].Id;
        }
      }
    },
    //获取渠道信息分页列表
    GetRecruitChannelPageList() {
      let obj = {
        OperationCode: this.operatiOBj.OperationCode,
        menuid: this.operatiOBj.menuid,
        ChannelName: "",
        Contacts: "",
        Tel: "",
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Sign: ""
      };
      GetRecruitChannelPageList(obj).then(res => {
        this.SelectingChannelMembers = res.Data;
      });
    },
    //多选推荐入职
    disables() {
      if (this.Ids.length > 0) {
        this.sendId = this.Ids.toString();
        this.Recommend = true;
        console.log(this.sendId);
      } else {
        this.$message({
          type: "error",
          message: "请选择员工信息后推荐入职"
        });
      }
    },
    clearIpt() {
      this.files = null;
    },
    statused(value) {
      this.Recommend = value;
    },
    //推荐入职
    AddRecommended(e) {
      this.Recommend = true;
      this.sendId = e.Id;
    },
    // 多选
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
    // 获取招聘列表
    getStaffPageList(operat) {
      let Diploma;
      if (this.searchform.Diploma === "") {
        Diploma = -1;
      } else {
        Diploma = this.searchform.Diploma;
      }
      let obj = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        UserName: this.searchform.UserName,
        Mobile: this.searchform.Mobile,
        Diploma: Diploma,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || "1"
      };
      this.tableloading = true;
      GetRecruitStaffPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tableData = response.Data;
          this.total = response.Total;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
        this.tableloading = false;
      });
    },
    // 获取外包员工信息枚举
    getStaffEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffEnum(qs.stringify(obj)).then(response => {
        if (response) {
          // this.StaffEnumMarried = response.StaffEnumMarried
          this.StaffEnumDiploma = response.StaffEnumDiploma;
          // this.StaffEnumDegree = response.StaffEnumDegree
          // this.StaffEnumHealthyExam = response.StaffEnumHealthyExam
          // this.StaffEnumSiProgress = response.StaffEnumSiProgress
          // this.StaffEnumStatus = response.StaffEnumStatus
          // this.StaffEnumType = response.StaffEnumType
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 查询
    searchtable() {
      this.currentPage = 1;
      this.getStaffPageList(this.operatiOBj);
    },
    // 导入人才
    leadtalent() {
      this.importvisible = true;
    },
    // 关闭弹框
    closedialog() {
      this.importvisible = false;
      this.ChooseChannel = "";
      this.files = "";
    },
    // 录入人才
    entertalent(str) {
      const operating = this.$operatedata(this.operates, str);
      localStorage.setItem("operating", JSON.stringify(operating));
      this.$router.push({
        path: "/RecruitmentManagement/AddInformation"
      });
    },
    // 编辑人才
    compile(e, str) {
      const operating = this.$operatedata(this.operates, str);
      localStorage.setItem("operating", JSON.stringify(operating));
      console.log(e);
      this.$router.push({
        path: "/RecruitmentManagement/AddInformation",
        query: {
          id: e.Id
        }
      });
    },
    // 查看人才详情
    watchtalent(e) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));

      const { href } = this.$router.resolve({
        path: "/RecruitmentManagement/InformationDetail",
        query: {
          id: e.Id
        }
      });
      window.open(href, "_blank");
    },

    // 删除招聘人才
    deletetalent(e, str) {
      this.$confirm("此操作将删除该招聘人, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const operating = this.$operatedata(this.operates, str) || {};
          let obj = {
            IdArr: e.Id,
            menuid: operating.MenuId,
            operationcode: operating.OperationCode
          };
          DeleteStaff(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: response.MessageContent,
                type: "success"
              });
              this.getStaffPageList(this.operatiOBj);
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 选择分页大小
    handleSizeChange(val) {
      this.PageSize = val;
      this.getStaffPageList(this.operatiOBj);
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStaffPageList(this.operatiOBj);
    },

    uploadfile(e) {
      const files = e.target.files[0];
      this.FileDatas = files;
      console.log(this.FileDatas);
      var ext = files.name.slice(files.name.lastIndexOf(".") + 1).toLowerCase();
      if (
        ext == "doc" ||
        ext == "docx" ||
        ext == "pdf" ||
        ext == "xls" ||
        ext == "xlsx"
      ) {
      } else {
        this.$message({
          message: "不支持该格式文件上传",
          type: "warning"
        });
        e.target.value = [];
        return false;
      }
      if (files.size > 20 * 1024 * 1024) {
        this.$message({
          message: "文件大小超过最大限制",
          type: "warning"
        });
        e.target.value = [];
        return false;
      } else {
        this.uploadLoading = true;
        this.param = new FormData();
        this.param.append("file", files);
        setTimeout(() => {
          this.files = this.FileDatas.name;
          this.uploadLoading = false;
        }, 500);
      }
    },
    // 删除
    deletefile() {
      this.files = null;
      this.filterdata = {
        type: "",
        name: "",
        visible: false
      };
    },
    // 导入
    saveimport() {
      //       let fromData={
      //         menuid: MenuIdDate(),
      //         operationcode: '1',
      //         Type:0,
      //         RecruitChannelId:this.ChannelId
      //       }
      //   ImportToStaffExcel(fromData).then(res=>{
      //   console.log(res);
      // })
      if (this.FileDatas && this.ChooseChannel && this.files) {
        const operating =
          JSON.parse(window.localStorage.getItem("operating")) || {};
        var obj = new FormData();
        obj.append("file", this.FileDatas);
        obj.append("Type", "0");
        obj.menuid = operating.MenuId;
        obj.operationcode = operating.OperationCode;
        obj.RecruitChannelId = this.ChannelId;
        showLoading();
        ImportToStaffExcel(obj).then(response => {
          hideLoading();
          if (response.IsSuccess) {
            this.importvisible = false;
            this.ChooseChannel = "";
            this.files = "";
            if (response.Data.Errors == 0) {
              this.$message({
                message: "导入数据成功",
                type: "success"
              });
              this.getStaffPageList();
            } else {
              this.errordata = response.Data;
              this.reportvisible = true;
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          message: "请选择文件",
          type: "warning"
        });
      }
    },
    // 下载导入模板
    downemployees() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      GetStaffExcelModel(qs.stringify(obj)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          window.open("http://" + response.Data);
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 关闭弹框
    closereport() {}
  }
};
</script>

<style lang="scss" scoped>
.information-management-container /deep/ {
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
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
    }
    .el-button + .el-button {
      margin-left: 16px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
  }
}
.erpdialog {
  .selectFile {
    position: relative;
    .titleText {
      margin-top: 16px;
    }
  }
  .input-Box {
    width: 400px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #f0f4fa;
    z-index: 0;
    position: relative;
    box-sizing: border-box;
    /deep/.el-input__inner {
      background-color: #f0f4fa;
      border: 0;
    }
    .flieBtn {
      position: absolute;
      right: 5px;
      top: 3px;
      z-index: 5;
      /deep/ .el-button--primary {
        border-color: #fff;
      }
    }
    .search-input {
      width: 80px;
      height: 28px;
      opacity: 0;
      z-index: 99;
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 3px;
    }
  }
  .select-input {
    width: 100%;
    height: auto;
    /deep/.el-input__inner {
      background-color: #f0f4fa;
    }
  }
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
            transform: translate(-50%, -50%);
          }
        }
        > .img-box-hover {
          position: absolute;
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 1);
          opacity: 0.4;
          bottom: 0;
          display: flex;
          justify-content: center;
          border-radius: 0 0 8px 8px;
          .btn {
            position: relative;
            line-height: 30px;
            cursor: pointer;
            > input {
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              cursor: pointer;
            }
            .svg-icon {
              font-size: $f14;
              color: #fff;
            }
            > span {
              font-size: $f14;
              color: #fff;
              cursor: pointer;
            }
          }
          .btn + .btn {
            margin-left: 24px;
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
.operate-bottom {
  margin-top: 32px;
  padding-left: 16px;
  .allcheck {
    margin-right: 16px;
  }
}
</style>