    <!-- 设置计算公式窗口 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="BigCalculationFormulaTitle" class="dialog-box" append-to-body :visible.sync="showFormula" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <div class="formulaResults">
        <div class="ResultsitemTitle">
          {{CalculationFormulaTitle}} =
        </div>
        <div class="Resultsitem-box">
          <div class="tag-item" v-for="(item,index) in ContentArray" :key="index">
            <span class="symbol" v-if="index > 0">{{item.symbol}}</span>
            <span class="tagxm" v-if="item.title">
              <span class="tiele">{{item.title}}</span>
              <i class="el-icon-close" @click="DelectResultson(index)"></i>
            </span>
            <span v-if="!item.title" class="NOtitle">

            </span>
          </div>
        </div>
      </div>
      <div class="listConter">
        <div class="list-box">
          <div class="list-item erpscroll">
            <el-button @click="ChooseResults(item,index)" class="btn" :title="item.title" v-for="(item,index) in DataList" :key="index" :disabled="item.IsSelect">{{item.title}}</el-button>
          </div>
        </div>
        <div class="buttons">
          <el-button class="button-item" :disabled="btndisabled" @click="DelectResults">x</el-button>
          <el-button class="button-item" :disabled="btndisabled" @click="DelectAll">清空</el-button>
          <el-button class="button-item" :disabled="btndisabled" @click="AddResults">+</el-button>
          <el-button class="button-item" :disabled="btndisabled" @click="NegativeResults">-</el-button>
          <el-button class="button-item savase" @click="saves">保存配置</el-button>
        </div>
      </div>
      <div class="foter-title">
        *使用说明:当前位置的字段仅对应计算的所属模块的字段，若您导入的表格中有需要参与计算的字段，请将改字段加到对应的模块中，以便于您计算
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'CalculationFormula',
  props: {
    ImportToExcelStructuralData: {
      type: Array,
    },
    CalculationFormulaTitle: {
      type: String,
    },
    showCalculationFormula: {
      type: Boolean,
    },
    ContentArrays: {
      type: Array,
    },
  },
  data () {
    return {
      btndisabled: true,
      showFormula: false,
      DataList: [],
      ContentArray: [],
      BigCalculationFormulaTitle: '标题'
    }
  },
  watch: {
    showCalculationFormula (newvalue, oldvalue) {
      this.showFormula = newvalue
      this.BigCalculationFormulaTitle = '设置' + this.CalculationFormulaTitle + '计算公式'
      this.ContentArray = this.ContentArrays
      if (this.ContentArray.length > 0) {
        this.btndisabled = false
      } else {
        this.btndisabled = true
      }
      // 设置计算公式
      this.DataList = []
      for (let i = 0; i < this.ImportToExcelStructuralData.length; i++) {
        this.DataList.push({ 'title': this.ImportToExcelStructuralData[i], 'IsSelect': false })
      }
      for (let i = 0; i < this.DataList.length; i++) {
        for (let j = 0; j < this.ContentArray.length; j++) {
          if (this.ContentArray[j].title == this.DataList[i].title) {
            this.$set(this.DataList[i], 'IsSelect', true)
          }
        }
      }
      // console.log(this.ImportToExcelStructuralData)
    }
  },
  created () {

  },
  methods: {
    //选择单项
    ChooseResults (item, index) {
      if (this.ContentArray.length > 0 && this.ContentArray[this.ContentArray.length - 1].title == '') {
        this.ContentArray[this.ContentArray.length - 1].title = item.title
      } else {
        this.ContentArray.push({
          'title': item.title,
          'symbol': '+'
        })
      }

      this.$set(this.DataList[index], 'IsSelect', true)
      if (this.ContentArray.length > 0) {
        this.btndisabled = false
      }
    },
    //上面删除项
    DelectResultson (index) {
      for (let i = 0; i < this.DataList.length; i++) {
        if (this.ContentArray[index].title == this.DataList[i].title) {
          this.$set(this.DataList[i], 'IsSelect', false)
        }
      }
      this.ContentArray.splice(index, 1)
    },
    //右边删除项
    DelectResults () {
      for (let i = 0; i < this.DataList.length; i++) {
        if (this.ContentArray[this.ContentArray.length - 1].title == this.DataList[i].title) {
          this.$set(this.DataList[i], 'IsSelect', false)
        }
      }
      this.ContentArray.pop()
      if (this.ContentArray.length == 0) {
        this.btndisabled = true
      }
    },
    //清空所有
    DelectAll () {
      this.ContentArray = []
      for (let i = 0; i < this.DataList.length; i++) {
        this.$set(this.DataList[i], 'IsSelect', false)
      }
      this.btndisabled = true
    },
    //+
    AddResults () {
      if (this.ContentArray[this.ContentArray.length - 1].title == '') {
        this.ContentArray.pop()
      }
      this.ContentArray.push({
        'title': '',
        'symbol': '+'
      })
    },
    //-
    NegativeResults () {
      if (this.ContentArray[this.ContentArray.length - 1].title == '') {
        this.ContentArray.pop()
      }
      this.ContentArray.push({
        'title': '',
        'symbol': '-'
      })
    },
    //保存
    saves () {
      for (let j = 0; j < this.ContentArray.length; j++) {
        if (this.ContentArray[j].title == '') {
          this.ContentArray.pop()
        }

      }
      this.$emit('AddCalculationFormula', this.ContentArray)
      console.log(111)
    },
    close () {
      this.$emit('closeCalculationFormula', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.formulaResults {
  display: flex;
  align-items: center;
  .ResultsitemTitle {
    width: 20%;
  }
  .Resultsitem-box {
    width: 80%;
    background: #eaeaea;
    border-radius: 5px;
    min-height: 40px;
    padding: 5px 10px;
    .tag-item {
      display: inline-block;
      margin-top: 5px;
      margin-bottom: 5px;
      .tagxm {
        padding: 0 10px 0 5px;
        min-width: 60px;
        max-width: 180px;
        background: #f4f6f9;
        border-radius: 5px;
        text-align: left;
        height: 30px;
        display: inline-block;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        .tiele {
          padding: 0 10px 0 5px;
        }
        i {
          margin-left: 10px;
          position: absolute;
          right: 5px;
          top: 8px;
          &:hover {
            color: #1588f8;
            cursor: pointer;
          }
        }
      }
      .NOtitle {
        width: 30px;
        display: inline-block;
        height: 30px;
      }
      .symbol {
        line-height: 30px;
        margin: 0 5px;
        vertical-align: top;
      }
    }
  }
}
.listConter {
  margin-top: 30px;
  display: flex;
  border: 1px solid #e3e3e6;
  .list-box {
    width: 80%;
    .list-item {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      max-height: 300px;
      overflow-y: scroll;
      .btn {
        width: 140px;
        height: 60px;
        font-size: 14px;
        text-align: center;
        display: inline-block;
        border-right: 1px solid #e3e3e6;
        border-bottom: 1px solid #e3e3e6;
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 0;
        margin-left: 0;
        span {
          width: 50px;
        }
      }
    }
  }
  .buttons {
    flex: 1;
    box-sizing: border-box;
    .button-item {
      width: 100%;
      height: 60px;
      font-size: 18px;
      display: inline-block;
      text-align: center;
      border-left: 1px solid #e3e3e6;
      border-bottom: 1px solid #e3e3e6;
      background: #eff4fa;
      border-radius: 0px;
      box-sizing: border-box;
      margin-left: 0;
    }
    .savase {
      color: #fff;
      background: #ff8040;
    }
  }
}
.foter-title {
  font-size: 14px;
  color: #979799;
  margin-top: 20px;
  line-height: 20px;
  width: 70%;
  padding-bottom: 40px;
}
</style>