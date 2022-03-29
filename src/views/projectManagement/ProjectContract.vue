<!-- 项目合同管理  -->
<template>
  <div class="project-contract-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">项目名称</div>
        <el-input class="erpsearchinput" placeholder="请输入所属项目名称进行查询" size="small" v-model="searchform.ProjectName" @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">合同编号</div>
        <el-input class="erpsearchinput" placeholder="请输入合同编号进行查询" size="small" v-model="searchform.Code" @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">合同名称</div>
        <el-input class="erpsearchinput" placeholder="请输入合同名称进行查询" size="small" v-model="searchform.Name" @keyup.enter.native="searchtable">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
      <!-- <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="reportcustomer">客户报备</el-button>
      </div> -->
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" prop="Id" width="55" label="编号" />
          <el-table-column align="center" prop="ProjectName" label="项目名称">
            <template slot-scope="scope">
              <span class="watchcode">{{scope.row.ProjectName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Code" label="合同编号" />
          <el-table-column align="center" prop="Name" label="合同名称" />
          <el-table-column align="center" prop="Amount" label="合同金额" />
          <el-table-column align="center" prop="StartDate" label="起始日期" />
          <el-table-column align="center" prop="SignDate" label="签订日期" />
          <el-table-column align="center" prop="SysUserName" label="创建人" />
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="update(scope.row)">修改</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <!-- <el-button size="small" class="erpdelete" @click="alldeletes">删除</el-button> -->
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { GetProjectContractPageList } from '@/api/projectManagement.js'
import filters from '@/utils/filters'
import { showLoading, hideLoading, copy, uuid } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  data () {
    return {
      searchform: {
        Code: '',
        Name: '',
        ProjectName: ''
      },
      tableloading: false,
      tableData: [],
      allchecked: false,
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Ids: [],
      Id: '',
    }
  },
  created () {
    this.getProjectContractPageList()
  },
  methods: {
    // 获取项目合同
    getProjectContractPageList () {
      let obj = {
        ProjectName: this.searchform.ProjectName,
        Code: this.searchform.Code,
        Name: this.searchform.Name,
        PageIndex: this.currentPage,
        PageSize: this.PageSize
      }
      GetProjectContractPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tableData = response.Data
          this.total = response.Total
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getProjectContractPageList()
    },
    // 修改
    update () {

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
      this.getProjectContractPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProjectContractPageList()
    },
  },
}
</script>

<style lang="scss">
.project-contract-container {
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
      width: 96px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-table {
      // 右侧菜单栏固定的样式
      .el-table__header-wrapper {
        // height: 56px;
        border-radius: 8px;
        overflow: hidden;
        .has-gutter {
          // height: 56px;
          th {
            line-height: 33px;
            background-color: $tableHeader;
            font-size: $f16;
            color: $erp333;
            .cell {
              .el-checkbox {
                .el-checkbox__inner {
                  width: 16px;
                  height: 16px;
                  border: none;
                  background-color: #a3b1cc;
                  &::after {
                    border: 2px solid #fff;
                    border-left: 0;
                    border-top: 0;
                    height: 10px;
                    left: 6px;
                  }
                }
              }
            }
          }
        }
      }
      .el-table__body-wrapper {
        tr {
          td {
            .cell {
              .el-checkbox {
                .el-checkbox__inner {
                  width: 16px;
                  height: 16px;
                  border: none;
                  background-color: #a3b1cc;
                  &::after {
                    border: 2px solid #fff;
                    border-left: 0;
                    border-top: 0;
                    height: 10px;
                    left: 6px;
                  }
                }
              }
              .watchcode {
                cursor: pointer;
                color: $erpcolor;
              }
            }
            &:first-child {
              border-radius: 8px 0 0 8px;
            }
            &:last-child {
              border-radius: 0 8px 8px 0;
            }
          }
        }
      }
      // 右侧固定样式
      .el-table__fixed-right {
        &::before {
          background-color: transparent;
        }
      }
      // 表格取消线条
      .el-table td {
        border-bottom: none;
      }
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
</style>
