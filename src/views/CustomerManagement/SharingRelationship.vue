// 共享关系处理
<template>
  <div class="createStateFilter">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">客户名称</div>
        <el-input class="erpsearchinput" placeholder="请输入客户名称进行查询" size="small" v-model="searchform.Name">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">负责人名称</div>
        <el-input class="erpsearchinput" placeholder="请输入负责人名称进行查询" size="small" v-model="searchform.SysUserName">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">日期范围</div>
        <el-date-picker v-model="searchform.StartDate" type="date" size="small" placeholder="开始日期">
        </el-date-picker>
        <el-date-picker v-model="searchform.EditDate" type="date" size="small" placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="receivecustomer">接收客户</el-button>
        <el-button size="small" class="addmenu erpbtn" @click="refusereceivecustomer">拒绝接收客户</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" type="index" width="55" label="编号" />
          <el-table-column align="center" prop="Name" label="客户名称">
            <template slot-scope="scope">
              <span class="watchcode" @click="watchcustom(scope.row)">{{scope.row.Name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Code" label="组织机构代码">
            <template slot-scope="scope">
              <span v-if="!scope.row.isview" class="watchcode" @click="scope.row.isview=!scope.row.isview">查看</span>
              <span v-if="scope.row.isview">{{scope.row.Code}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="name" label="客户等级" /> -->
          <el-table-column align="center" prop="SysUserName" label="业务类型" />
          <el-table-column align="center" prop="SysUserName" label="客户等级" />
          <el-table-column align="center" prop="SysUserName" label="负责人" />
          <el-table-column align="center" prop="TypeText" label="共享状态" />
          <el-table-column align="center" prop="AddTime" label="录入时间" />
          <el-table-column align="center" prop="UpdateTime" label="最近跟进时间" />
          <el-table-column align="center" prop="ProjectNumber" label="相关项目数量" />
          <el-table-column align="center" prop="FollowNumber" label="跟进信息（条）" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="receive(scope.row)">接收共享</el-dropdown-item>
                    <el-dropdown-item @click.native="refusereceive(scope.row)">拒绝接受共享</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="addmenu erpbtn" @click="receivecustomer">接收客户</el-button>
        <el-button size="small" class="addmenu erpbtn" @click="refusereceivecustomer">拒绝接收客户</el-button>
      </div>
      <!-- <div class="pagina-fonter">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableloading: false,
      allchecked: false,
      searchform: {
        Name: '',
        SysUserName: '',
        StartDate: '',
        EditDate: ''
      },
      tableData: [{ Id: 1, date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { Id: 2, date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }],

    }
  },
  methods: {
    // 查询
    searchtable () {

    },
    // 选择
    handleSelectionChange () {

    },
    // 接收客户
    receive () {

    },
    // 拒绝接收客户
    refusereceive () {

    },
    // 接收客户
    receivecustomer () {

    },
    // 拒绝接收客户
    refusereceivecustomer () {

    },
    // 打开客户详情
    watchcustom () {

    },
  },
}
</script>

<style lang="scss">
.createStateFilter {
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
      .el-table__header-wrapper {
        // height: 56px;
        border-radius: 8px;
        overflow: hidden;
        .has-gutter {
          // height: 56px;
          th {
            line-height: 33px;
            background-color: #e5e5e5;
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
            }
            .watchcode {
              cursor: pointer;
              color: $erpcolor;
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