<template>
  <div class="FilingCabinetManagement-Box">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">档案柜编号</div>
        <el-input class="erpsearchinput" @input="searchTab" placeholder="请输入档案柜编号进行查询" clearable size="small" v-model="FilingCabinetId">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <span class="search-name">档案类型</span>
        <el-select  v-model="FileType" class="erpsearchinput" size="small" clearable>
            <el-option v-for="(item,index) in FileTypeList" :key="index" :value="item.Id" :label="item.ClassName">
            </el-option>
          </el-select>
      </div>
      <div class="condition">
        <div class="search-name">档案柜位置</div>
        <el-select  v-model="FilingCabinetLocation" class="erpsearchinput" size="small" clearable>
            <el-option v-for="(item,index) in selectList" :key="index" :value="item.Id" :label="item.ClassName">
            </el-option>
          </el-select>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="Reset">重置</el-button>
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
       <div class="content">
        <h3>档案柜编号规则：仓位（排）+列+-+档案类型+柜号</h3>
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" v-if="$operatebtn(operates, 'Add')" @click.native="addCabinetId">新增柜号</el-button>
        <!-- <el-button size="small"  class="addmenu erpbtn" @click.native="ImportCabinet">导入</el-button> -->
        <el-button size="small"  class="addmenu erpbtn">生成台账</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" />
          <el-table-column align="center" prop="ArchivesCabinetCode" min-width="120" fixed label="档案柜编号" />
          <el-table-column align="center" prop="Position" label="仓位（排）" min-width="120"/>
            <!-- <template slot-scope="scope"> -->
              <!-- <a v-if="$operatebtn(operates, 'View')" class="watchcode" @click="watchtalent(scope.row)">{{scope.row.UserName}}</a> -->
              <!-- <span>{{scope.row.UserName}}</span> -->
            <!-- </template> -->
          <!-- </el-table-column> -->
          <el-table-column align="center" prop="Queue" label="列" min-width="120"/>
            <!-- <template slot-scope="scope">
              <span>{{scope.row.Sex | Sex}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="CabinetNumber" label="柜号" min-width="120" />
          <el-table-column align="center" prop="MarkerColor" label="标志色系" min-width="200" show-overflow-tooltip/>
            <!-- <template slot-scope="scope">
              <span>{{scope.row.AreaName | AddressFiltering}}{{scope.row.Address}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="CabinetPosition" label="档案柜位置" min-width="120" />
          <el-table-column align="center" prop="Remark" label="备注" min-width="120" />
          <el-table-column align="center" prop="Status" label="状态" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Status==1?'启用':'禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item :value="scope.row" @click.native="modify(scope.row)">修改</el-dropdown-item>
                    <el-dropdown-item @click.native="GetOperationLog(scope.row)">操作日志</el-dropdown-item>
                    <el-dropdown-item @click.native="Delete(scope.row)">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="addmenu erpbtn delete" @click="DeleteAll">删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
      <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="TitleText" class="dialog-box" append-to-body :visible.sync="showDialog" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="仓位（排）" prop="WarehouseLocation" class="LineFeed">
          <el-input v-model="dataObject.WarehouseLocation"  size="small"  />
        </el-form-item>
        <el-form-item label="列" prop="column" class="LineFeed">
          <el-input v-model="dataObject.column"  size="small" />
        </el-form-item>
        <el-form-item label="档案类型" prop="FileType" class="LineFeed">
          <el-select  v-model="dataObject.FileType" style="width:100%;">
            <el-option v-for="(item,index) in FileTypeList" :key="index" :value="item.Id" :label="item.ClassName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="柜号" prop="CabinetId"  class="LineFeed">
          <el-input v-model="dataObject.CabinetId"  size="small"/>
        </el-form-item>
        <el-form-item label="档案柜位置" prop="FilingCabinetLocation" class="LineFeed">
          <el-select  v-model="dataObject.FilingCabinetLocation" style="width:100%;">
            <el-option v-for="(item,index) in selectList" :key="index" :value="item.Id" :label="item.ClassName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标志色系" prop="SymbolColorSystem" class="LineFeed">
            <el-input v-model="dataObject.SymbolColorSystem"  size="small"  />
        </el-form-item>
        <el-form-item label="备注" class="LineFeed">
          <el-input type="textarea" maxlength="150" :autosize="{minRows: 2, maxRows: 6}" resize="none" v-model="dataObject.remarks" size="small"  />
        </el-form-item>
        <el-form-item label="使用状态" prop="useStatus" class="LineFeed" >
          <el-radio-group v-model="dataObject.useStatus" style="width:100%;">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="Save('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
  <OperationLogDetails :OperationLogList="OperationLogList" :showOperationLogDetails="showOperationLogDetails" :Total="Total" @Modifier="Modifier" @closeDialog="closeDialog"></OperationLogDetails>
  </div>
</template>
<script>
import {GetArchivesCabinetPageList,GetCatagoryClassType,GetCatagoryList,EditArchivesCabinet,AddArchivesCabinet,DeleteArchivesCabinet,GetArchivesCabinetLogPageList} from '@/api/FileManagement.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import OperationLogDetails from './components/OperationLogDetails.vue'
export default {
  components:{
OperationLogDetails,
  },
  data() {
    return {
      EndTimes:'',
      StartTimes:'',
      Modifiers:'',
      ArchivesCabinetId:0,
      OperationLogList:[],
      IdArr:'',
      SysUserId:0,
      FileId:0,
      TitleText:'',
      FileTypeList:[],
      selectList:[],
      FilingCabinetId:'',
      FileType:'',
      FilingCabinetLocation:'',
      tableData:[],
      tableloading:false,
      allchecked:false,
      showDialog:false,
      currentPage:1,
      PageSize:10,
      Total:0,
      total:0,
      dataObject:{
        WarehouseLocation:'',
        column:'',
        FileType:'',
        CabinetId:'',
        FilingCabinetLocation:'',
        SymbolColorSystem:'',
        remarks:'',
        useStatus:-1
      },
       operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
      showOperationLogDetails:false,
      rules: {
        WarehouseLocation: [
          { required: true, message: '请输入仓位', trigger: 'blur' }
        ],
        column: [
          { required: true, message: '请输入列', trigger: 'blur' }
        ],
        FileType: [
          { required: true, message: '请选择档案类型', trigger: 'blur' }
        ],
        CabinetId: [
          { required: true, message: '请输入柜号', trigger: 'blur' }
        ],
        FilingCabinetLocation: [
          { required: true, message: '请选择档案柜位置', trigger: 'blur' }
        ],
        SymbolColorSystem: [
          { required: true, message: '请输入色系', trigger: 'blur' }
        ],
        useStatus: [
          { required: true, message: '请选择使用状态', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    if(this.$route.meta.operations){
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetCatagoryList()
      this.GetArchivesCabinetPageList()
      this.GetCatagoryClassType()
    }
  },
  methods:{
    Modifier(e,StartTime,EndTimes){
    this.Modifiers=e
    this.StartTimes=StartTime
    this.EndTimes=EndTimes
    this.GetArchivesCabinetLogPageList()
    },
    //多选删除
    DeleteAll(){
      if(this.Ids!=[]){
        let obj={
         IdArr:this.IdArr,
         menuid: MenuIdDate(),
         operationcode: '1'
        }
        this.DeleteArchivesCabinet(obj)
      }
    },
    //删除
    DeleteArchivesCabinet(obj){
      showLoading()
       DeleteArchivesCabinet(obj).then(res=>{
        if(res.IsSuccess){
          this.GetArchivesCabinetPageList()
          hideLoading()
           this.$message({
                 type:'success',
                 message:'删除成功'
          })
        }else{
           this.$message({
                 type:'warning',
                 message:res.MessageContent
          })
        }
      })
    },
    //单个删除
    Delete(e){
      this.$confirm('此操作将永久删除该信息，是否继续删除',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
      let obj={
        IdArr:(e.Id).toString(),
        menuid: MenuIdDate(),
        operationcode: '1'
      }
     this.DeleteArchivesCabinet(obj)
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });      
      })
    },
    //修改
    modify(e){
      this.TitleText="修改柜号"
      this.showDialog=true
      this.FileId=e.Id
      this.dataObject.WarehouseLocation=e.Position
      this.dataObject.column=e.Queue
      this.dataObject.FileType=e.ArchivesType
      this.dataObject.CabinetId=e.CabinetNumber
      this.dataObject.FilingCabinetLocation=e.CabinetPosition
      this.dataObject.SymbolColorSystem=e.MarkerColor
      this.dataObject.useStatus=e.Status
      this.dataObject.remarks=e.Remark
    },
    //搜索
    searchTab(){
      this.GetArchivesCabinetPageList()
    },
    //档案类型
    GetCatagoryClassType(){
     let obj={
       menuid: MenuIdDate(),
       operationcode: '1'
     }
     GetCatagoryClassType(obj).then(res=>{
       if(res!=[]){
        // this.FileTypeList=res
       }
     })
    },
    GetCatagoryList(){
      let obj={
        ClassName: "",
        Status: 1,
        ClassType: 8,
        Sign: "",
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      let obj1={
        ClassName: "",
        Status: 1,
        ClassType: 9,
        Sign: "",
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetCatagoryList(obj).then(res=>{
          if(res.IsSuccess){
            hideLoading()
            this.FileTypeList=res.Data
          }else{
            this.$message({
              type:'wraring',
              message:res.MessageContent
            })
          }
      })
      showLoading()
       GetCatagoryList(obj1).then(res=>{
         if(res.IsSuccess){
           hideLoading()
            this.selectList=res.Data
          }else{
            this.$message({
              type:'warning',
              message:res.MessageContent
            })
          }
      })

    },
    //获取档案分页列表
    GetArchivesCabinetPageList(){
      let obj={
           ArchivesCabinetCode: this.FilingCabinetId,
           ArchivesType: this.FileType,
           CabinetPosition:this.FilingCabinetLocation,
           PageIndex: this.currentPage,
           PageSize: this.PageSize,
           Sign: "",
           menuid: MenuIdDate(),
           operationcode: '1'
      }
      GetArchivesCabinetPageList(obj).then(res=>{
        if(res.IsSuccess){
           this.tableData=res.Data
           this.total=res.Total
        }
      })
    },
    //关闭弹窗
    closeDialog(str){
      this.EndTimes='',
      this.StartTimes='',
      this.Modifiers='',
   this.showOperationLogDetails=str
    },
    //操作日志
    GetOperationLog(e){
    this.ArchivesCabinetId=e.Id
    this.showOperationLogDetails=true
    this.GetArchivesCabinetLogPageList()
    },
    GetArchivesCabinetLogPageList(){
       let obj={
       ArchivesCabinetId: this.ArchivesCabinetId,
       SysUserName: this.Modifiers,
       StartTime: this.StartTimes,
       EndTime:this.EndTimes,
       PageIndex: this.currentPage,
       PageSize: this.PageSize,
       Sign: "",
       menuid: MenuIdDate(),
       operationcode: '1'
    }
    showLoading()
    GetArchivesCabinetLogPageList(obj).then(res=>{
      if(res.IsSuccess&&res.Data!=null){
        hideLoading()
        this.OperationLogList=res.Data
        this.Total=res.Total
      }else{
        this.OperationLogList=[]
      }
    })
    },
    //保存
    Save(ruleForm){
       this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if(this.TitleText=='修改柜号'){
              let obj={
               Id: this.FileId,
               Position: this.dataObject.WarehouseLocation,
               Queue: this.dataObject.column,
               ArchivesType: this.dataObject.FileType,
               CabinetNumber: this.dataObject.CabinetId,
               CabinetPosition: this.dataObject.FilingCabinetLocation,
               MarkerColor: this.dataObject.SymbolColorSystem,
               Remark: this.dataObject.remarks,
               Status: this.dataObject.useStatus,
               menuid: MenuIdDate(),
               operationcode: '1'
            }
            showLoading()
            EditArchivesCabinet(obj).then(res=>{
              if(res.IsSuccess){
                hideLoading()
                 this.$message({
                 type:'success',
                 message:'修改成功'
                })
                this.dataObject.WarehouseLocation=''
                this.dataObject.column=''
                this.dataObject.FileType=''
                this.dataObject.CabinetId=''
                this.dataObject.FilingCabinetLocation=''
                this.dataObject.SymbolColorSystem=''
                this.dataObject.useStatus=''
                this.dataObject.remarks=''
                this.FileId=0
                this.showDialog=false
                this.GetArchivesCabinetPageList()
              }else{
                 this.$message({
                 type:'warning',
                 message:res.MessageContent
                })
              }
            })
            }else{
              let obj={
                 Position: this.dataObject.WarehouseLocation,
                 Queue: this.dataObject.column,
                 ArchivesType: this.dataObject.FileType,
                 CabinetNumber: this.dataObject.CabinetId,
                 CabinetPosition: this.dataObject.FilingCabinetLocation,
                 MarkerColor: this.dataObject.SymbolColorSystem,
                 Remark: this.dataObject.remarks,
                 Status: this.dataObject.useStatus,
                 menuid: MenuIdDate(),
                 operationcode: '1'
              }
              showLoading()
              AddArchivesCabinet(obj).then(res=>{
                if(res.IsSuccess){
                  hideLoading()
                   this.$message({
                   type:'success',
                   message:'添加成功'
                  })
                this.dataObject.WarehouseLocation=''
                this.dataObject.column=''
                this.dataObject.FileType=''
                this.dataObject.CabinetId=''
                this.dataObject.FilingCabinetLocation=''
                this.dataObject.SymbolColorSystem=''
                this.dataObject.useStatus=''
                this.dataObject.remarks=''
                  this.showDialog=false
                  this.GetArchivesCabinetPageList()
                }else{
                   this.$message({
                   type:'warning',
                   message:res.MessageContent
                  })
                }
              })
            }
          } else {
           this.$message({
              type:'warning',
              message:'请完善信息后提交'
            })
            return false;
          }
        });
    },
    //新增柜号
    addCabinetId(){
      this.showDialog=true
      this.TitleText="新增柜号"
    },
    //关闭弹窗
    close(){
      this.showDialog=false
      this.dataObject.WarehouseLocation=''
      this.dataObject.column=''
      this.dataObject.FileType=''
      this.dataObject.CabinetId=''
      this.dataObject.FilingCabinetLocation=''
      this.dataObject.SymbolColorSystem=''
      this.dataObject.useStatus=''
      this.dataObject.remarks=''
    },
    //重置
    Reset(){
      this.FilingCabinetId=''
      this.FileType=''
      this.FilingCabinetLocation=''
    },
    //查询
    searchtable(){
      this.GetArchivesCabinetPageList()
    },
    //多选
     handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      console.log(this.Ids);
      this.IdArr=this.Ids.toString()
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
      this.GetArchivesCabinetPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetArchivesCabinetPageList()
    },
  }
  
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.FilingCabinetManagement-Box{
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
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius:0;
    h3{
      display: inline-block;
      color: red;
      margin: 10px 0;
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
  .operate-bottom{
    margin-left: 20px;
    margin-top: 16px;
    .delete{
    margin-left: 16px;
  }
  }
  }

}
</style>