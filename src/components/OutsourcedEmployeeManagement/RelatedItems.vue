<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="880px" custom-class="erpdialog" @close="closedialog">
      <div class="search-item">
        <div class="label">选择入职项目时间</div>
        <el-date-picker v-model="jobdate" class="select" size="small" type="date" placeholder="选择入职项目时间" />
      </div>
      <div class="project-contents">
        <div class="content-left">
          <div class="project-title">选择要关联的项目</div>
          <div class="project-box">
            <el-input class="erpsearchinput" v-model="input" size="small" placeholder="请输入查询您要关联的项目" @keyup.enter.native="searchproject">
              <i class="el-icon-search el-input__icon" slot="suffix" @click="searchproject" />
            </el-input>
            <div v-loading="radioloading" class="erpscroll">
              <!-- <el-checkbox-group v-model="checkList" class="erpscroll" @change="chooseproject">
                <el-checkbox v-for="(item, index) in projectlist" :key="index" :label="item.Id" :true-label="item" class="erpcheck">{{ item.Name }}</el-checkbox>
              </el-checkbox-group> -->
              <div v-for="(item, index) in projectlist" :key="index">
                <el-checkbox v-model="checkList" :label="item.Id" class="erpcheck" @change="chooseproject(item, $event)">{{ item.Name }}</el-checkbox>
              </div>
            </div>
            <el-pagination background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :pager-count="pagercount" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="content-right">
          <div class="project-title">已选择的项目</div>
          <div class="project-box erpscroll" v-loading="projectloading">
            <div v-for="(item, index) in chooseProjectList" :key="index" class="select-box">
              <el-checkbox v-model="item.ischeck" @change="checkdelete(item)">{{ item.ProjectName }}</el-checkbox>
              <el-select v-model="item.PositionName" class="select erpselect" size="small" clearable placeholder="请选择岗位" @change="selectvalue(item.PositionName,index)">
                <el-option v-for="pos in item.PositionList" :key="pos.Id" :label="pos.PositionName" :value="pos.PositionName">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="project-title">已选择(每人仅可关联一个项目)</div>
      <div class="project-box">
        <div class="tip" v-if="radio.Name">{{radio.Name}}
          <svg-icon class="cursor-pointer" icon-class="Close" @click.stop="checkdelete(radio)" />
        </div>
      </div> -->
      <!-- <div class="project-title" v-show="options && options.length">选择岗位</div>
      <div class="project-box" v-show="options && options.length">
        <el-select v-model="value" class="select erpselect" size="small" clearable placeholder="请选择岗位">
          <el-option v-for="item in options" :key="item.Id" :label="item.PositionName" :value="item.PositionName">
          </el-option>
        </el-select>
      </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetProjectList, GetProjectRecruit } from '@/api/projectManagement.js'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  props: ['title', 'visible', 'contentdata'],
  data () {
    return {
      dialogVisible: false,
      input: '',
      // radio: '',
      checkList: [], // 左侧选中的项目
      chooseProjectList: [], // 右侧已经选中的项目
      // PositionList: [], // 岗位列表
      projectlist: [],
      currentPage: 1,
      pagercount: 5,
      total: 0,
      radioloading: false,
      projectloading: false,
      jobdate: new Date()
      // value: '',
      // options: []
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        setTimeout(()=>{
           this.searchproject()
        }, 300)
        // this.operateform = this.contentdata
      } else {

      }
    }
  },
  created () {
    this.searchproject()
  },
  methods: {
    
    // 获取项目
    // 搜索项目
    searchproject () {
      let obj = {
        Name: this.input,
        SysUserName: '',
        Status: -1,
        BusinessType: -1,
        Priority: -1,
        PageIndex: this.currentPage,
        PageSize: 10,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.radioloading = true
      GetProjectList(qs.stringify(obj)).then(response => {
        this.radioloading = false
        if (response.IsSuccess) {
          this.projectlist = response.Data
          this.total = response.Total
          this.projectlist.forEach(item=>{
            this.contentdata.map(val => {
              if(item.Id===val.ProjectId){
                this.checkList.push(item.Id)
                this.chooseProjectList.push({
                  ProjectId: item.Id,
                  ProjectName: item.Name,
                  StaffId: '',
                  PositionName: '',
                  ProjectRecruitId: '',
                  CompanyId: item.CompanyId,
                  PositionList: response.Data,
                  ischeck: true
                })
              }
            });
          })
          console.log(this.projectlist)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 选择项目
    chooseproject (item, e) {
      console.log(this.checkList, item, e)
      if (e) {
        // 获取岗位信息
        let obj = {
          ProjectId: item.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        this.projectloading = true
        GetProjectRecruit(qs.stringify(obj)).then(response => {
          this.projectloading = false
          console.log(response)
          if (response.IsSuccess) {
            // 选中 添加
            this.chooseProjectList.push({
              ProjectId: item.Id,
              ProjectName: item.Name,
              StaffId: '',
              PositionName: '',
              ProjectRecruitId: '',
              CompanyId: item.CompanyId,
              PositionList: response.Data,
              ischeck: true
            })
          } else {
            // 选中 添加
            this.chooseProjectList.push({
              ProjectId: item.Id,
              ProjectName: item.Name,
              StaffId: '',
              PositionName: '',
              ProjectRecruitId: '',
              CompanyId: item.CompanyId,
              PositionList: [],
              ischeck: true
            })
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        // 取消选中 删除
        let chooseindex = this.chooseProjectList.findIndex(v => {
          return item.Id === v.ProjectId
        })
        if (chooseindex !== -1) {
          this.chooseProjectList.splice(chooseindex, 1)
        }
      }
    },
    //选中岗位
    selectvalue (e, index) {
      for (let i = 0; i < this.chooseProjectList[index].PositionList.length; i++) {
        if (e === this.chooseProjectList[index].PositionList[i].PositionName) {
          this.chooseProjectList[index].ProjectRecruitId = this.chooseProjectList[index].PositionList[i].Id
        }
      }
    },
    // 取消选中项目
    checkdelete (item) {
      // 清除左边选中
      let chooseindex = this.checkList.findIndex(v => {
        return item.ProjectId === v
      })
      if (chooseindex !== -1) {
        this.checkList.splice(chooseindex, 1)
      }
      // 清除右边选中
      let index = this.chooseProjectList.findIndex(v => {
        return item.ProjectId === v.ProjectId
      })
      if (index !== -1) {
        this.chooseProjectList.splice(index, 1)
      }
    },
    // chooseradio(e) {
    //   console.log(e);
    //   this.value = ''
    //   // 获取岗位信息
    //   // 获取岗位信息
    //   let obj = {
    //     ProjectId: e.Id,
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetProjectRecruit(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       this.options = response.Data
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: 'error'
    //       })
    //     }
    //   })
    // },
    // 选择页
    handleCurrentChange (val) {
      this.currentPage = val
      this.searchproject()
    },
    closedialog () {
      this.checkList = []
      this.chooseProjectList = []
      this.radio = {}
      this.$emit('closedialog')
    },
    save () {
      // if (this.radio) {
      //   this.$emit('saverelate', this.radio, this.value)
      // } else {
      //   this.$message({
      //     message: '请选择项目',
      //     type: 'warning'
      //   })
      // }
      if (!this.jobdate) {
        this.$message({
          type: 'warning',
          message: '请选择入职时间'
        })
        return
      }
      if (this.chooseProjectList.length > 0) {
        this.$emit('saverelate', this.chooseProjectList, this.jobdate)
      } else {
        this.$message({
          message: '请选择项目',
          type: 'warning'
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search-item /deep/ {
  margin-bottom: 10px;
  .label {
    margin-bottom: 7px;
  }
  .select {
    width: 100%;
    .el-input__inner {
      background-color: $erinputbgc;
    }
  }
}
.project-contents /deep/ {
  display: flex;
  .content-left {
    width: 400px;
    margin-right: 24px;
    .erpscroll {
      overflow: auto;
      padding: 14px 0;
      .erpcheck {
        display: block;
        line-height: 28px;
      }
    }
  }
  .content-right {
    flex: 1;
    .select-box {
      line-height: 38px;
    }
  }
}
.project-title /deep/ {
  font-size: $f14;
  color: $erp666;
  line-height: 28px;
}
.project-box /deep/ {
  padding: 16px;
  background-color: $erinputbgc;
  height: 412px;
  overflow: auto;
  .select {
    width: 100%;
  }
}
.el-pagination /deep/ {
  text-align: center;
}
</style>