//查看薪酬明细
<template>
  <div class="table-content">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="LookPayContrast" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" class="forms">
        <div class="operate-table">
          <el-table ref="industrtTable" :data="systemFieldList" class="erp-table" tooltip-effect="dark">
            <el-table-column align="center" prop="system" label="" />
            <el-table-column align="center" prop="ImportData" label="导入数据">
              <template slot-scope="scope">
                <div>
                  {{scope.row.ImportData | MoneyUnit}}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="SystemData" label="系统数据">
              <template slot-scope="scope">
                <div>
                  {{scope.row.SystemData | MoneyUnit}}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="difference" label="差值（绝对值）">
              <template slot-scope="scope">
                {{scope.row.difference | MoneyUnit}}
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button size="small" @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import filters from '@/utils/filters'
export default {
  name: 'LookPayContrast',
  props: {
    showLookPayContrast: {
      type: Boolean
    },
    tempData: {
      type: Object
    }
  },
  data () {
    return {
      systemFieldList: [{
        system: '工资所属年月',
        name: 'YearMonth',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '养老保险（企业部分）',
        name: 'EndowmentEnt',
        ImportData: '',
        SystemData: '',
        difference: ''

      }, {
        system: '医疗保险（企业部分）',
        name: 'MedicalEnt',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '失业保险（企业部分）',
        name: 'UnemploymentEnt',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '生育保险（企业部分）',
        name: 'BirthEnt',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '工伤保险（企业部分）',
        name: 'InjuryEnt',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '养老保险（个人部分）',
        name: 'EndowmentPers',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '医疗保险（个人部分）',
        name: 'MedicalPers',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '失业保险（个人部分）',
        name: 'UnemploymentPers',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '生育保险（个人部分）',
        name: 'BirthPers',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '工伤保险（个人部分）',
        name: 'InjuryPers',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '住房公积金（企业部分）',
        name: 'HouseFundEnt',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '住房公积金（个人部分）',
        name: 'HouseFundPers',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '企业社保部分合计',
        name: 'EntSiTotal',
        ImportData: '',
        SystemData: '',
        difference: ''
      }, {
        system: '个人部分社保合计',
        name: 'PerSiTotal',
        ImportData: '',
        SystemData: '',
        difference: ''
      }],
      LookPayContrast: false,
      objData: null,
      title: ''
    }
  },
  watch: {
    showLookPayContrast (newvalue, oldvalue) {
      this.LookPayContrast = newvalue
      this.objData = this.tempData
      this.title = `${this.objData.StaffName}${this.objData.Year}年${this.objData.Month}月份薪酬对比明细`
      for (let i = 0; i < this.systemFieldList.length; i++) {
        if (this.systemFieldList[i].name == 'YearMonth') {
          this.systemFieldList[i].ImportData = `${this.objData.Year}/${this.objData.Month < 10 ? '0' + this.objData.Month : this.objData.Month}`
          this.systemFieldList[i].SystemData = `${this.objData.Year}/${this.objData.Month < 10 ? '0' + this.objData.Month : this.objData.Month}`
        }
        if (this.systemFieldList[i].name == 'EndowmentEnt') {
          this.systemFieldList[i].ImportData = this.objData.EndowmentEnt
          this.systemFieldList[i].SystemData = this.objData.SysEndowmentEnt
          this.systemFieldList[i].difference = this.objData.EndowmentEntDeffience
        }
        if (this.systemFieldList[i].name == 'MedicalEnt') {
          this.systemFieldList[i].ImportData = this.objData.MedicalEnt
          this.systemFieldList[i].SystemData = this.objData.SysMedicalEnt
          this.systemFieldList[i].difference = this.objData.MedicalEntDeffience
        }
        if (this.systemFieldList[i].name == 'UnemploymentEnt') {
          this.systemFieldList[i].ImportData = this.objData.UnemploymentEnt
          this.systemFieldList[i].SystemData = this.objData.SysUnemploymentEnt
          this.systemFieldList[i].difference = this.objData.UnemploymentEntDeffience
        }
        if (this.systemFieldList[i].name == 'BirthEnt') {
          this.systemFieldList[i].ImportData = this.objData.BirthEnt
          this.systemFieldList[i].SystemData = this.objData.SysBirthEnt
          this.systemFieldList[i].difference = this.objData.BirthEntDeffience
        }
        if (this.systemFieldList[i].name == 'InjuryEnt') {
          this.systemFieldList[i].ImportData = this.objData.InjuryEnt
          this.systemFieldList[i].SystemData = this.objData.SysInjuryEnt
          this.systemFieldList[i].difference = this.objData.InjuryEntDeffience
        }
        if (this.systemFieldList[i].name == 'EndowmentPers') {
          this.systemFieldList[i].ImportData = this.objData.EndowmentPers
          this.systemFieldList[i].SystemData = this.objData.SysEndowmentPers
          this.systemFieldList[i].difference = this.objData.EndowmentPersDeffience
        }
        if (this.systemFieldList[i].name == 'MedicalPers') {
          this.systemFieldList[i].ImportData = this.objData.MedicalPers
          this.systemFieldList[i].SystemData = this.objData.SysMedicalPers
          this.systemFieldList[i].difference = this.objData.MedicalPersDeffience
        }
        if (this.systemFieldList[i].name == 'UnemploymentPers') {
          this.systemFieldList[i].ImportData = this.objData.UnemploymentPers
          this.systemFieldList[i].SystemData = this.objData.SysUnemploymentPers
          this.systemFieldList[i].difference = this.objData.UnemploymentPersDeffience
        }
        if (this.systemFieldList[i].name == 'BirthPers') {
          this.systemFieldList[i].ImportData = this.objData.BirthPers
          this.systemFieldList[i].SystemData = this.objData.SysBirthPers
          this.systemFieldList[i].difference = this.objData.BirthPersDeffience
        }
        if (this.systemFieldList[i].name == 'InjuryPers') {
          this.systemFieldList[i].ImportData = this.objData.InjuryPers
          this.systemFieldList[i].SystemData = this.objData.SysInjuryPers
          this.systemFieldList[i].difference = this.objData.InjuryPersDeffience
        }
        if (this.systemFieldList[i].name == 'HouseFundEnt') {
          this.systemFieldList[i].ImportData = this.objData.HouseFundEnt
          this.systemFieldList[i].SystemData = this.objData.SysHouseFundEnt
          this.systemFieldList[i].difference = this.objData.HouseFundEntDeffience
        }
        if (this.systemFieldList[i].name == 'HouseFundPers') {
          this.systemFieldList[i].ImportData = this.objData.HouseFundPers
          this.systemFieldList[i].SystemData = this.objData.SysHouseFundPers
          this.systemFieldList[i].difference = this.objData.HouseFundPersDeffience
        }
        if (this.systemFieldList[i].name == 'EntSiTotal') {
          this.systemFieldList[i].ImportData = this.objData.EntSiTotal
          this.systemFieldList[i].SystemData = this.objData.SysEntSiTotal
          this.systemFieldList[i].difference = this.objData.EntSiDeffience
        }
        if (this.systemFieldList[i].name == 'PerSiTotal') {
          this.systemFieldList[i].ImportData = this.objData.PerSiTotal
          this.systemFieldList[i].SystemData = this.objData.SysPerSiTotal
          this.systemFieldList[i].difference = this.objData.PerSiTotalDeffience
        }
      }
    }
  },
  created () {
  },
  methods: {
    close () {
      this.$emit('closeAddCardSave', false)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>