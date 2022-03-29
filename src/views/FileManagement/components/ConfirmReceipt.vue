<template>
  <div class="ConfirmReceipt-Box">
    <el-dialog :close-on-click-modal="false" title="请选择档案存档位置" class="dialog-box" append-to-body :visible.sync="showConfirmReceipt" :show-close="false" :destroy-on-close="true" width="1000px">
      <div class="search-bar clearfix">
        <div class="condition">
          <div class="search-name">档案柜编号</div>
          <el-input class="erpsearchinput" @input="searchTab" placeholder="请输入档案柜编号进行查询" clearable size="small" v-model="FilingCabinetId">
            <i class="el-icon-search el-input__icon" slot="suffix" />
          </el-input>
        </div>
        <div class="condition">
          <span class="search-name">档案类型</span>
          <el-select v-model="FileType" class="erpsearchinput" size="small" clearable>
            <el-option v-for="(item,index) in FileTypeList" :key="index" :value="item.Id" :label="item.ClassName">
            </el-option>
          </el-select>
        </div>
        <div class="condition">
          <div class="search-name">档案柜位置</div>
          <el-select v-model="FilingCabinetLocation" class="erpsearchinput" size="small" clearable>
            <el-option v-for="(item,index) in selectList" :key="index" :value="item.Id" :label="item.ClassName">
            </el-option>
          </el-select>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click="searchtable">搜索</el-button>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @select="dialogCheck">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" />
          <el-table-column align="center" prop="ArchivesCabinetCode" min-width="100" fixed label="档案柜编号" />
          <el-table-column align="center" prop="Position" label="仓位（排）" min-width="60" />
          <el-table-column align="center" prop="Queue" label="列" min-width="60" />
          <el-table-column align="center" prop="ArchivesTypeName" label="档案类型" min-width="60" />
          <el-table-column align="center" prop="CabinetNumber" label="柜号" min-width="60" />
          <el-table-column align="center" prop="MarkerColor" label="标志色系" min-width="60" show-overflow-tooltip />
          <el-table-column align="center" prop="CabinetPosition" label="档案柜位置" min-width="120" />
          <el-table-column align="center" prop="Remark" label="备注" min-width="120" />
          <el-table-column align="center" prop="Status" label="状态" min-width="60">
            <template slot-scope="scope">
              <span>{{scope.row.Status==1?'启用':'禁用'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <span slot="footer" class="dialog-footer three-footer">
        <el-button class="erpbtn" size="small" @click.native="closedialog">取 消</el-button>
        <el-button class="erpbtn" size="small" @click="save('operateform')">保 存</el-button>
      </span> -->
      <div class="Footer" style="text-align: center; margin:30px 0px">
        <el-button class="erpbtn" size="small" @click.native="closedialog">取 消</el-button>
        <el-button class="erpbtn" size="small" @click="save('operateform')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetArchivesCabinetPageList, GetCatagoryList, EditDocumentArchivesStatus, EditFinanceArchivesStatus, EditContractArchivesStatus } from '@/api/FileManagement.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
export default {
  props: ['showConfirmReceipt', 'sendId', 'sendIds', 'contractId'],
  data () {
    return {
      tableloading: false,
      FilingCabinetId: '',
      FileType: '',
      FilingCabinetLocation: '',
      FileTypeList: [],
      selectList: [],
      tableData: [],
      currentPage: 1,
      PageSize: 99,
      Ids: [],
      selected: {}
    }
  },
  created () {
    this.GetCatagoryList()
    this.GetArchivesCabinetPageList()
  },
  methods: {
    //获取档案柜信息
    GetArchivesCabinetPageList () {
      let obj = {
        ArchivesCabinetCode: this.FilingCabinetId,
        ArchivesType: this.FileType,
        CabinetPosition: this.FilingCabinetLocation,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Sign: "",
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetArchivesCabinetPageList(obj).then(res => {
        if (res.IsSuccess) {
          this.tableloading = false
          this.tableData = res.Data
        }
      })
    },
    //获取档案类型档案柜位置
    GetCatagoryList () {
      let obj = {
        ClassName: "",
        Status: 1,
        ClassType: 8,
        Sign: "",
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      let obj1 = {
        ClassName: "",
        Status: 1,
        ClassType: 9,
        Sign: "",
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryList(obj).then(res => {
        if (res.IsSuccess) {
          this.FileTypeList = res.Data
        } else {
          this.$message({
            type: 'wraring',
            message: res.MessageContent
          })
        }
      })
      GetCatagoryList(obj1).then(res => {
        if (res.IsSuccess) {
          this.selectList = res.Data
        } else {
          this.$message({
            type: 'warning',
            message: res.MessageContent
          })
        }
      })

    },
    save () {
      if (this.sendId) {
        let obj = {
          Id: this.sendId,
          ArchivesCabinetId: this.selected.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EditDocumentArchivesStatus(obj).then(res => {
          if (res.IsSuccess) {
            this.$message({
              type: 'success',
              message: '确认签收成功'
            })
            this.$emit('RefreshPage', false)
          } else {
            this.$message({
              type: 'warning',
              message: res.MessageContent
            })
          }
        })
      } else if (this.sendIds) {
        let obj = {
          Id: this.sendIds,
          ArchivesCabinetId: this.selected.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EditFinanceArchivesStatus(obj).then(res => {
          if (res.IsSuccess) {
            this.$message({
              type: 'success',
              message: '确认签收成功'
            })
            this.$emit('RefreshPage', false)
          } else {
            this.$message({
              type: 'warning',
              message: res.MessageContent
            })
          }
        })
      } else if (this.contractId) {
        let obj = {
          Id: this.contractId,
          ArchivesCabinetId: this.selected.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EditContractArchivesStatus(obj).then(res => {
          if (res.IsSuccess) {
            this.$message({
              type: 'success',
              message: '确认签收成功'
            })
            this.$emit('RefreshPage', false)
          } else {
            this.$message({
              type: 'warning',
              message: res.MessageContent
            })
          }
        })
      }

    },
    closedialog () {
      this.$emit('hideConfirmReceipt', false)
    },
    searchTab () {
      this.GetArchivesCabinetPageList()
    },
    searchtable () {
      this.GetArchivesCabinetPageList()
    },
    //单选
    dialogCheck (selection, row) {
      this.$refs.multipleTable.clearSelection()
      if (selection.length === 0) { // 判断selection是否有值存在
        return
      }
      if (row) {
        this.selected = row
        this.$refs.multipleTable.toggleRowSelection(row, true)
        // this.ischoose = this.selected.Id // 进度列表Id
        // this.StaffName = this.selected.StaffName
        // this.StaffStatus = this.selected.StaffStatus
        // this.projectId = this.selected.ProjectId
        // this.RecruitPipelineId = row.Id
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
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
      width: 140px;
      border: 1px solid #ccc;
      border-radius: 20px;
    }
    .erpsearchinput {
      width: 140px;
      border: 1px solid #ccc;
      border-radius: 7px;
    }
  }
  .operate-table {
    margin-bottom: 90px;
  }
}
</style>