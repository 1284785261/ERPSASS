/* 推荐明细审核 */
<template>
  <div class="RecommendationDetailsReview-Box">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">推荐项目</div>
        <el-input class="erpsearchinput" placeholder="请输入客户名称进行查询" size="small" v-model="searchform.entryName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">推荐人员</div>
        <el-input class="erpsearchinput" placeholder="请输入身份证号码进行查询" size="small" v-model="searchform.personnelID">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">计提类型</div>
        <el-input class="erpsearchinput" placeholder="请输入身份证号码进行查询" size="small" v-model="searchform.AccrualType">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
      <!-- <el-button class="operation-button tableHeader-button" size="small" type="primary" v-if="$operatebtn(operates, 'Add')" @click="AddProject('Add')">新建项目</el-button> -->
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn">生成提成汇总表</el-button>
        <el-button size="small" class="addmenu erpbtn">导出入职推荐奖金明细</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" />
          <el-table-column align="center" prop="userName" min-width="120" fixed label="入职员工姓名" />
          <el-table-column align="center" prop="UserName" label="推荐岗位" min-width="120">
            <template slot-scope="scope">
              <!-- <a v-if="$operatebtn(operates, 'View')" class="watchcode" @click="watchtalent(scope.row)">{{scope.row.UserName}}</a> -->
              <span>{{scope.row.UserName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Sex" label="推荐人员" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Sex | Sex}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Mobile" label="入职日期" min-width="120" />
          <el-table-column align="center" prop="AreaId" label="计提类型" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AreaName | AddressFiltering}}{{scope.row.Address}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="DiplomaText" label="在职情况" min-width="120" />
          <el-table-column align="center" prop="SysUserName" label="离职时间" min-width="120" />
          <el-table-column align="center" prop="StatusText" label="上班天数" min-width="120" />
          <el-table-column align="center" prop="UpdateTime" label="奖金" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.UpdateTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AddTime" label="录入时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SysUserName" label="审核状态" min-width="120" />
          <el-table-column align="center" prop="StatusText" label="发放状态" min-width="120" />
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item :value="scope.row">查看</el-dropdown-item>
                    <el-dropdown-item>标记为已审批</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="addmenu erpbtn">提交钉钉审核</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchform: {
        entryName: '',
        personnelID: '',
        AccrualType: '',
      },
      tablist: [{
        value: 1,
        describe: "全部"
      }],
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      tabidx: 0,
      tableloading: false,
      Ids: [],
      allchecked: false,
    }
  },
  methods: {
    searchtable () {
      console.log(111);
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
    // 全选
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
    },
  },
}
</script>
<style lang="scss" scoped>
.RecommendationDetailsReview-Box /deep/ {
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
    margin-left: 20px;
    padding: 20px;
    border-radius: 0;
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