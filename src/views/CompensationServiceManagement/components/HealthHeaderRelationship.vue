<!-- 医保对应表头关系 -->
<template>
  <div class="table-content">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showHeaderRelation" :show-close="false" :destroy-on-close="true" width="800px" @close="closeAll">
      <i class="el-icon-circle-close closeButton" @click="closeAll"></i>
      <el-form class="forms">
        <div class="operate-table">
          <el-table ref="industrtTable" :data="systemFieldList" class="erp-table" tooltip-effect="dark">
            <el-table-column align="center" type="index" width="55" label="序号" />
            <el-table-column align="center" prop="SystemData" label="系统医保字段名称">
              <template slot-scope="scope">
                <div>
                  <el-select v-model="scope.row.SystemData" filterable clearable placeholder="请选择" class="select-input">
                    <el-option v-for="(item,index) in ErpStructuralData" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="ImportData" label="医保局社保字段名称">
              <template slot-scope="scope">
                <div>
                  <el-select v-model="scope.row.ImportData" filterable clearable placeholder="请选择" class="select-input">
                    <!-- 隐藏姓名字段 -->
                    <el-option v-for="(item,index) in ImportToExcelStructuralData" v-show="item.indexOf('姓名') === -1" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作">
              <template slot-scope="scope">
                <div class="button-a">
                  <a v-if="scope.$index == systemFieldList.length - 1" @click="AddData(scope.row)">添加字段</a>
                  <a v-if="systemFieldList.length > 1" @click="DelData(scope.row,scope.$index)">删除</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="dialogtrue">导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['showHeaderRelationship', 'headerData'],
  data () {
    return {
      systemFieldList: [],
      ErpStructuralData: [],
      ImportToExcelStructuralData: [],
      showHeaderRelation: false,
      title: '对应表头关系'
    }
  },
  created () {

  },
  watch: {
    showHeaderRelationship (newvalue, oldvalue) {
      this.showHeaderRelation = newvalue
      if (this.headerData) {
        this.ErpStructuralData = this.headerData.ErpStructuralData
        this.ImportToExcelStructuralData = this.headerData.ImportToExcelStructuralData
        if (this.ErpStructuralData.length > 0) {
          for (let i = 0; i < this.ErpStructuralData.length; i++) {
            this.AddData()
          }
          for (let i = 0; i < this.ErpStructuralData.length; i++) {
            this.systemFieldList[i].SystemData = this.ErpStructuralData[i]
          }
          this.ruleFunctions(this.systemFieldList)
        }
      }
    }
  },
  methods: {
    ruleFunctions (arr) {
      let publicRulse1 = '企业'
      let publicRulse2 = '单位'
      let publicRulse3 = '个人'
      let publicRulse4 = '基数'
      let publicRulse5 = '滞纳金'
      let publicRulse6 = '利息'
      let publicRulse7 = '补缴'
      let publicRulse8 = '退回'
      let rulse1 = '账户余额'
      let rulse2 = '医疗保险'
      let rulse3 = '大额'
      let rulse4 = '大额保险'
      let rulse5 = '所属年月'
      let rulse6 = '缴费类型'
      let rulse7 = '其他'
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < this.ImportToExcelStructuralData.length; j++) {
          if (arr[i].SystemData.length == 4 || arr[i].SystemData.length < 4) {
            if (this.ImportToExcelStructuralData[j].indexOf(arr[i].SystemData) >= 0) {
              arr[i].ImportData = this.ImportToExcelStructuralData[j]
            }
          }
          if (arr[i].SystemData == rulse6 && this.ImportToExcelStructuralData[j] == rulse6) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if (arr[i].SystemData.indexOf(rulse5) >= 0 && this.ImportToExcelStructuralData[j].indexOf('所属期') >= 0) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }

          //匹配医疗缴交基数
          if ((arr[i].SystemData.indexOf('医疗') >= 0 && arr[i].SystemData.indexOf(publicRulse4) >= 0) && (this.ImportToExcelStructuralData[j].indexOf('医疗') >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse4) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          //匹配医疗保险
          if ((arr[i].SystemData.indexOf('大') == -1 && arr[i].SystemData.indexOf(publicRulse5) == -1 && arr[i].SystemData.indexOf(publicRulse6) == -1 && arr[i].SystemData.indexOf(publicRulse7) == -1 && arr[i].SystemData.indexOf(publicRulse8) == -1) && (arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf('大') == -1 && arr[i].SystemData.indexOf(publicRulse5) == -1 && arr[i].SystemData.indexOf(publicRulse6) == -1 && arr[i].SystemData.indexOf(publicRulse7) == -1 && arr[i].SystemData.indexOf(publicRulse8) == -1) && (arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }

          //匹配医疗保险滞纳金
          if ((arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse5) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse5) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse5) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse5) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          //匹配医疗保险利息
          if ((arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse6) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse6) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse6) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse6) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }

          //匹配医疗保险补缴
          if ((arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse7) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse7) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse7) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse7) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          //匹配医疗保险退回
          if ((arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse8) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse8) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse2) >= 0 && arr[i].SystemData.indexOf(publicRulse8) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse8) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }


          //匹配大额医疗缴交基数
          if ((arr[i].SystemData.indexOf('大额医疗') >= 0 && arr[i].SystemData.indexOf(publicRulse4) >= 0) && (this.ImportToExcelStructuralData[j].indexOf('大额医疗') >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse4) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }

          //匹配大额医疗保险
          if ((arr[i].SystemData.indexOf(publicRulse5) == -1 && arr[i].SystemData.indexOf(publicRulse6) == -1 && arr[i].SystemData.indexOf(publicRulse7) == -1 && arr[i].SystemData.indexOf(publicRulse8) == -1) && (arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(publicRulse5) == -1 && arr[i].SystemData.indexOf(publicRulse6) == -1 && arr[i].SystemData.indexOf(publicRulse7) == -1 && arr[i].SystemData.indexOf(publicRulse8) == -1) && (arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }

          //匹配大额医疗保险滞纳金
          if ((arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse5) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse5) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse5) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse5) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          //匹配大额医疗保险利息
          if ((arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse6) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse6) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse6) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse6) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }

          //匹配大额医疗保险补缴
          if ((arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse7) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse7) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse7) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse7) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          //匹配大额医疗保险退回
          if ((arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse8) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse8) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse3) >= 0 && arr[i].SystemData.indexOf(publicRulse8) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(rulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(publicRulse8) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          //匹配其他合计
          if ((arr[i].SystemData.indexOf(rulse7) >= 0 && arr[i].SystemData.indexOf(publicRulse1) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(publicRulse2) >= 0 && this.ImportToExcelStructuralData[j].indexOf(rulse7) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }
          if ((arr[i].SystemData.indexOf(rulse7) >= 0 && arr[i].SystemData.indexOf(publicRulse3) >= 0) && (this.ImportToExcelStructuralData[j].indexOf(publicRulse3) >= 0 && this.ImportToExcelStructuralData[j].indexOf(rulse7) >= 0)) {
            arr[i].ImportData = this.ImportToExcelStructuralData[j]
          }

        }
      }
    },
    AddData () {
      this.systemFieldList.push({
        ImportData: '',
        SystemData: ''
      })
    },
    DelData (data, index) {
      this.systemFieldList.splice(index, 1)
    },
    dialogtrue () {
      let Showform = true
      // for (let i = 0; i < this.systemFieldList.length; i++) {
      //   if (!this.systemFieldList[i].ImportData || !this.systemFieldList[i].SystemData) {
      //     this.$message({
      //       type: 'error',
      //       message: '表头字段需填写完整对应，否则无法导入!'
      //     })
      //     return
      //   }
      // }
      for (let i = 0; i < this.systemFieldList.length; i++) {
        if (!this.systemFieldList[i].ImportData || !this.systemFieldList[i].SystemData) {
          this.systemFieldList.splice(i, 1)
          i --
        }
      }
      this.$emit('HeaderRelationshipSave', this.systemFieldList)
    },
    close () {
      this.systemFieldList = this.$options.data().systemFieldList
      this.$emit('closeHeaderRelationship', false)
    },
    closeAll () {
      this.systemFieldList = this.$options.data().systemFieldList
      this.$emit('closeAllHeaderRelationship', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.button-a {
  a {
    margin: 0 20px;
    color: #1588f8;
  }
}
</style>