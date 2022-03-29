<template>
<!-- 项目审核流程设置 -->
  <div class="projectreviewset-container">
    <h2>项目审核流程设置</h2>
    <div class="search-bar">
      <div class="condition">
        <div class="search-name">流程名称</div>
        <el-input class="erpinput" clearable placeholder="请输入流程名称" size="small" v-model="searchform.name"></el-input>
      </div>
      <div class="condition">
        <div class="search-name">应用业务</div>
        <!-- <el-input class="erpinput" clearable size="small" v-model="searchform.name"></el-input> -->
        <el-select v-model="searchform.id" clearable  size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">应用功能</div>
        <!-- <el-input class="erpinput" clearable size="small" v-model="searchform.name"></el-input> -->
        <el-select v-model="searchform.id" clearable  size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">启用状态</div>
        <!-- <el-input class="erpinput" clearable size="small" v-model="searchform.name"></el-input> -->
        <el-select v-model="searchform.id" clearable  size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="operate-top">
      <el-button size="small" @click="addenumerate">新添加项目审核流程</el-button>
    </div>
    <div class="operate-table">
      <el-table ref="multipleTable" v-loading="tableloading" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="55" label="全选" />
        <el-table-column align="center" type="index" label="编号" />
        <el-table-column align="center" prop="address" label="审核流名称" />
        <el-table-column align="center" type="name" label="审核人"/>
        <el-table-column align="center" type="PositionName" label="适用对象"/>
        <el-table-column align="center" type="PositionName" label="应用业务"/>
        <el-table-column align="center" type="PositionName" label="应用功能"/>
        <el-table-column align="center" type="PositionName" label="启用状态"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item @click.native="view(scope.row)">查看</el-dropdown-item>
                  <el-dropdown-item @click.native="update(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="enable(scope.row)">启用</el-dropdown-item>
                  <el-dropdown-item @click.native="disable(scope.row)">禁用</el-dropdown-item>
                  <el-dropdown-item @click.native="invalid(scope.row)">作废</el-dropdown-item>
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="operate-bottom">
      <el-checkbox v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
      <el-button size="small" @click="alldeletes">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchform: {
        name: '',
        id: ''
      },
      value: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tableData: [{Id: 1, date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}, {Id: 2, date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}],
      tableloading: false,
      titlename: '', // 弹框名
      dialogvisible: false, // 是否显示弹框
      contentdata: {}, // 弹框内容
      issave: false,
      allchecked: false,
      Ids: [], // 多个选中id
    }
  },
  methods: {
    addenumerate() {
      this.titlename = '新增审核人'
      this.dialogvisible = true
      this.contentdata = {}
      this.issave = true
    },
    // 多选
    handleSelectionChange(value) {
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
    // 操作
    view() {},
    update() {
      this.titlename = '修改枚举'
      this.dialogvisible = true
      this.contentdata = {
        name: 'ceshi',
        id: '111'
      }
      this.issave = false
    },
    enable() {

    },
    disable() {

    },
    invalid() {

    },
    // 全选
    selectall() {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 多选删除
    alldeletes() {
    }
  },
}
</script>

<style lang="scss">
.projectreviewset-container {
  .search-bar {
    display: flex;
    .condition {
      display: inline-block;
      .search-name {
        display: inline-block;
      }
      .erpinput {
        display: inline-block;
        width: 200px;
      }
    }
  }
}
</style>