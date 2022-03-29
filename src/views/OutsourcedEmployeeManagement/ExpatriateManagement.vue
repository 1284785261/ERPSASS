<!-- 外派员工管理 -->
<template>
  <div class="expatriate-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" placeholder="请输入员工名称" size="small" v-model.trim="searchform.UserName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">身份证号码</div>
        <el-input class="erpsearchinput" placeholder="请输入身份证号码" size="small" v-model.trim="searchform.IdCode" @keyup.enter.native="searchtable">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">员工性别</div>
        <el-select v-model="searchform.Sex" size="small" class="selet erpselect" clearable placeholder="请选择员工性别" @keyup.enter.native="searchtable">
          <el-option label="女" :value="0" />
          <el-option label="男" :value="1" />
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">出生日期</div>
        <el-date-picker v-model="searchform.Birthday" class="selet erpselect" size="small" type="date" clearable placeholder="选择出生日期" @keyup.enter.native="searchtable" />
      </div>
      <div class="condition">
        <div class="search-name">就职项目</div>
        <el-input class="erpsearchinput" placeholder="请输入就职项目" size="small" v-model.trim="searchform.ProjectName" @keyup.enter.native="searchtable">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">用工单位</div>
        <el-input class="erpsearchinput" placeholder="请输入用工单位" size="small" v-model.trim="searchform.CompanyName" @keyup.enter.native="searchtable">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">社保/工资/公积金打款账号</div>
        <el-input class="erpsearchinput" placeholder="请输入社保/工资/公积金" size="small" v-model.trim="searchform.Comprehensive" @keyup.enter.native="searchtable">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">联系方式</div>
        <el-input class="erpsearchinput" placeholder="请输入联系方式" size="small" clearable v-model.trim="searchform.Mobile" @keyup.enter.native="searchtable">
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">员工状态</div>
        <el-select v-model="searchform.Status" size="small" class="selet erpselect" clearable placeholder="请选择员工状态" @keyup.enter.native="searchtable">
          <el-option v-for="item in StatusList" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">员工类型</div>
        <el-select v-model="searchform.Type" size="small" class="selet erpselect" clearable placeholder="请选择员工类型" @keyup.enter.native="searchtable">
          <el-option v-for="item in StaffEnumType" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">民族</div>
        <el-select v-model="searchform.Nation" size="small" class="selet erpselect" clearable placeholder="请选择民族" @keyup.enter.native="searchtable">
          <el-option v-for="item in Nationlist" :key="item.Id" :label="item.ClassName" :value="item.Id">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">是否退伍军人</div>
        <el-select v-model="searchform.ArmyMan" size="small" class="selet erpselect" clearable placeholder="请选择是否退伍军人" @keyup.enter.native="searchtable">
          <el-option label="否" :value="0" />
          <el-option label="是" :value="1" />
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">婚姻状态</div>
        <el-select v-model="searchform.Married" size="small" class="selet erpselect" clearable placeholder="请选择婚姻状态" @keyup.enter.native="searchtable">
          <el-option label="未婚" :value="0" />
          <el-option label="已婚" :value="1" />
          <el-option label="离异" :value="2" />
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">政治面貌</div>
        <el-select v-model="searchform.Politics" size="small" class="selet erpselect" clearable placeholder="请选择政治面貌" @keyup.enter.native="searchtable">
          <el-option label="党员" value="党员" />
          <el-option label="团员" value="团员" />
          <el-option label="群众" value="群众" />
          <el-option label="其他" value="其他" />
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">健康体检状态</div>
        <el-select v-model="searchform.HealthyExam" size="small" class="selet erpselect" clearable placeholder="请选择健康体检状态" @keyup.enter.native="searchtable">
          <el-option v-for="item in StaffEnumHealthyExam" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">人员补贴属性</div>
        <el-select v-model="StatusType" size="small" class="selet erpselect" multiple clearable placeholder="请选择人员补贴属性" @keyup.enter.native="searchtable">
          <el-option label="非农业人口(农民工)" :value="0" />
          <el-option label="残疾人" :value="1" />
          <el-option label="建档立卡贫困户" :value="2" />
          <el-option label="40/50失业重新安置" :value="3" />
          <el-option label="城镇登记失业人员" :value="4" />
        </el-select>
      </div>
      <div class="condition practice">
        <div class="search-name">籍贯</div>
        <el-select v-model="nativeprovince" size="small" class="selet erpselect" filterable placeholder="选择省份" key="1" clearable>
          <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in nativeprovincelist" :key="index"></el-option>
        </el-select>
        <el-select v-model="nativecity" size="small" class="selet erpselect" filterable placeholder="选择城市" key="2" clearable>
          <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in nativecitylist" :key="index"></el-option>
        </el-select>
        <el-select v-model="searchform.OriginAreaId" class="selet erpselect" size="small" filterable placeholder="选择区县" key="3" clearable>
          <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in nativearealist" :key="index"></el-option>
        </el-select>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="exportemployees">导出员工</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Import')" class="addmenu erpbtn" @click="Importemployees('Import')">导入员工</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'ProveOpens')" class="addmenu erpbtn" @click="issuecertificate('ProveOpens')">证明开具</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="addmenu erpbtn" @click="onboarding('Add')">添加员工</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'EntryProcessing')" class="addmenu erpbtn" @click="Induction('EntryProcessing')">入职办理</el-button>
        <!-- <el-button size="small" class="addmenu erpbtn" @click="resignation">离职办理</el-button> -->
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed label="全选" />
          <el-table-column align="center" v-if="$getColumsFlag('Code',checkboxVal)" prop="Code" min-width="150" fixed label="员工编码" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('UserName',checkboxVal)" prop="UserName" fixed label="员工姓名" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchstaff(scope.row, 'View')">{{scope.row.UserName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Sex',checkboxVal)" prop="Sex" label="性别" min-width="55">
            <template slot-scope="scope">
              {{scope.row.Sex | Sex}}
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('IdCode',checkboxVal)" prop="IdCode" label="身份证号码" min-width="160" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Mobile',checkboxVal)" prop="Mobile" label="联系电话" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Email',checkboxVal)" prop="Email" label="电子邮件" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('ResidenceAreaName',checkboxVal)" prop="ResidenceAreaName" label="户口所在地" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Politics',checkboxVal)" prop="Politics" label="政治面貌" min-width="100" />
          <el-table-column align="center" v-if="$getColumsFlag('DiplomaText',checkboxVal)" prop="DiplomaText" label="最高学历" min-width="100" />
          <el-table-column align="center" v-if="$getColumsFlag('DegreeText',checkboxVal)" prop="DegreeText" label="最高学位" min-width="100" />
          <el-table-column align="center" v-if="$getColumsFlag('HealthyExamText',checkboxVal)" prop="HealthyExamText" label="健康体检状态" min-width="140" />
          <el-table-column align="center" v-if="$getColumsFlag('EmergencyTel',checkboxVal)" prop="EmergencyTel" label="紧急联系电话" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('EmergencyPerson',checkboxVal)" prop="EmergencyPerson" label="紧急联系人" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BankAccount',checkboxVal)" prop="BankAccount" label="工资卡账号" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BankNameStr',checkboxVal)" prop="BankNameStr" label="工资卡开户行" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SiAccount',checkboxVal)" prop="SiAccount" label="社保账号" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SiProgressText',checkboxVal)" prop="SiProgressText" label="社保卡进度" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('SiAreaName',checkboxVal)" prop="SiAreaName" label="社保参保地" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('FundAccount',checkboxVal)" prop="FundAccount" label="公积金账号" min-width="120" show-overflow-tooltip />
          <!-- <el-table-column align="center" prop="BfBankId" label="工资发放规则 !!" /> -->
          <!-- <el-table-column align="center" prop="BfBankId" label="社保扣除规则 !!" /> -->
          <el-table-column align="center" v-if="$getColumsFlag('PersonalTaxRuleName',checkboxVal)" prop="PersonalTaxRuleName" label="个税扣除规则" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('ProjectNumber',checkboxVal)" prop="ProjectNumber" label="就职项目" min-width="120">
            <template slot-scope="scope">
              <el-popover ref="popover" placement="bottom" width="800" trigger="click">
                <el-table :data="popovertable" class="projecttable" v-loading="popoverloading">
                  <el-table-column align="center" property="CompanyName" label="用工单位"></el-table-column>
                  <el-table-column align="center" property="ProjectName" label="就职项目"></el-table-column>
                  <el-table-column align="center" property="PositionName" label="就职岗位"></el-table-column>
                </el-table>
                <span slot="reference" class="watchcode" @click="watchcompany(scope.row)">{{ scope.row.ProjectNumber }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="ProjectName" label="就职项目" /> -->
          <!-- <el-table-column align="center" prop="Position" label="就职岗位" /> -->
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="入职公司" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('JoinTime',checkboxVal)" prop="JoinTime" label="入职时间" min-width="120">
            <template slot-scope="scope">
              {{scope.row.JoinTime | Time}}
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('LastQuitCert',checkboxVal)" prop="LastQuitCert" label="原公司离职证明状态" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.LastQuitCert | LastQuitCert}}
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StatusText',checkboxVal)" prop="StatusText" label="目前就职状态" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('StaffContractTypeText',checkboxVal)" prop="StaffContractTypeText" label="合同类型" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('StaffContractSignType',checkboxVal)" prop="StaffContractSignType" label="合同签订模式" min-width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.StaffContractSignType | StaffContractSignType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StaffContractStartDate',checkboxVal)" prop="StaffContractStartDate" label="合同起始日期" min-width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.StaffContractStartDate | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StaffContractExpireDate',checkboxVal)" prop="StaffContractExpireDate" label="合同终止日期" min-width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.StaffContractExpireDate | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StaffContractStatus',checkboxVal)" prop="StaffContractStatus" label="合同签署状态" min-width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.StaffContractStatus | StaffContractStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" min-width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="update(scope.row, 'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'RelatedProject')" @click.native="relateditem(scope.row, 'RelatedProject')">关联项目</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Dimission')" @click.native="leave(scope.row, 'Dimission',1)">从入职公司离职办理</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Dimission')" @click.native="leave(scope.row, 'Dimission',2)">从用工单位离职办理</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'SocialSecurityPayment')" @click.native="Socialpayment(scope.row, 'SocialSecurityPayment')">社保缴纳</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'SocialSecurityStop')" @click.native="Socialstop(scope.row, 'SocialSecurityStop')">社保停缴</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'ProvidentPayment')" @click.native="accumulationpayment(scope.row, 'ProvidentPayment')">公积金缴纳</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'ProvidentStop')" @click.native="accumulationstop(scope.row, 'ProvidentStop')">公积金停缴</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'healthcarePayment')" @click.native="healthcarepayment(scope.row, 'healthcarePayment')">医保缴纳</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'healthcareStop')" @click.native="healthcarestop(scope.row, 'healthcareStop')">医保停缴</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddRemind')" @click.native="addremind(scope.row, 'AddRemind')">添加提醒</el-dropdown-item>
                    <el-dropdown-item @click.native="AddCommunicationRecord(scope.row, 'Add')">添加外包员工沟通记录</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <!-- <el-button size="small" class="addmenu erpbtn" @click="salarycalculationrules">更改薪酬计算规则</el-button> -->
        <el-button size="small" v-if="$operatebtn(operates, 'RelatedProject')" class="addmenu erpbtn" @click="relateditems('RelatedProject')">关联项目</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Blacklist')" class="addmenu erpbtn" @click="JoinBlacklist('Blacklist')">加入黑名单</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'SocialSecurityPayment')" class="addmenu erpbtn" @click="Socialpayments('SocialSecurityPayment')">社保缴纳</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'SocialSecurityStop')" class="addmenu erpbtn" @click="Socialstops('SocialSecurityStop')">社保停缴</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'ProvidentPayment')" class="addmenu erpbtn" @click="accumulationpayments('ProvidentPayment')">公积金缴纳</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'ProvidentStop')" class="addmenu erpbtn" @click="accumulationstops('ProvidentStop')">公积金停缴</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'healthcarePayment')" class="addmenu erpbtn" @click="healthcarepayments('healthcarePayment')">医保缴纳</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'healthcareStop')" class="addmenu erpbtn" @click="healthcarestops('healthcareStop')">医保停缴</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Delete')" class="addmenu erpbtn" @click="Delpayments('Delete')">删除</el-button>
        <!-- <el-button size="small" class="addmenu erpbtn" @click="enables">证明开具</el-button> -->
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 500]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <!-- 离职办理 -->
      <dialogresignation :title="resignationname" :visible="resignationvisible" :contentdata="resignationdata" :searchIDobj="searchIDobj" @closedialog="closedialog" @saveresignation="saveresignation"></dialogresignation>
      <!-- 关联项目 -->
      <RelatedItems :title="relatename" :visible="relatevisible" :contentdata="relatedata" @closedialog="closedialog" @saverelate="saverelate"></RelatedItems>
      <el-dialog :close-on-click-modal="false" title="导入员工" :visible.sync="importvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <div class="file-box">
          <div class="title">选择文件</div>
          <div class="file">
            <div class="img-box-list" v-if="!files">
              <!-- 未上传样式 -->
              <input type="file" ref="upload" accept=".xls,.xlsx" name="" id="" @change="uploadfile">
              <div class="img-box">
                <img src="@/assets/down.png" alt="">
              </div>
            </div>
            <div class="img-box-list" v-if="files" @mouseenter="filterdata.visible=!filterdata.visible" @mouseleave="filterdata.visible=!filterdata.visible">
              <div class="img-box">
                <span class="filetype">{{filterdata.type}}</span>
                <div class="filename" :title="filterdata.name">{{filterdata.name}}</div>
              </div>
              <div class="img-box-hover" v-show="filterdata.visible==true">
                <div class="btn">
                  <input type="file" accept=".xls,.xlsx" name="" id="" @change="uploadfile($event)">
                  <svg-icon icon-class="replace" class-name="svg-a" />
                  <span>替换</span>
                </div>
                <div class="btn" @click="deletefile()">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div>
              </div>
            </div>
            <div class="downimport" @click="downemployees">点击下载导入模板</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveimport">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="部分导入失败提示" :visible.sync="reportvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closereport">
        <div class="error-box">
          <div class="error-top">
            <div class="success-total">成功 {{errordata.Successes}}</div>
            <div class="error-total">文件导入失败 <span>{{errordata.Errors}}</span> 条</div>
          </div>
          <div class="error-content erpscroll">
            <div class="row" v-for="(item, index) in errordata.ImportToExcelErrorList" :key="index">
              <div class="index">第{{item.Rows}}条</div>
              <div class="con">{{item.Message}}</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="reportvisible=!reportvisible">修改后重新导入</el-button>
        </span>
      </el-dialog>
      <!-- 缴纳状态 -->
      <payment :title="paymentname" :visible="paymentvisible" :contentdata="paymentdata" :isstop="isstop" @closepayment="closepayment" @savepayment="savepayment"></payment>
    </div>
    <!-- 证明开具 -->
    <ProveOpens :showAddProve="showAddProve" :title="ProveTitle" :tempData="tempData" @ProveSave="ProveSave" @closeProve="closeProve"></ProveOpens>
    <!-- 添加到黑名单 -->
    <BlackContent :showBlackContent="showBlackContent" :title="BlackTitle" :itemMap="itemMap" @BlackContentSave="BlackContentSave" @closeBlackContent="closeBlackContent"></BlackContent>
    <!-- 添加提醒 -->
    <AddRemind :showRemind="showRemind" :title="remindtitle" @closeshowAddRemind="closeshowAddRemind" @AddRemindSave="AddRemindSave"></AddRemind>
    <!-- 入职办理 -->
    <dialogInduct :showInduct="showInduct" :title="InductTitle" @CloseInduct="CloseInduct" @SuccInduct="SuccInduct"></dialogInduct>
    <!-- 添加外包员工沟通记录 -->
    <EmployeeCommunicationRecord :addVisible="addVisible" @SaveCommunicationRecord="SaveCommunicationRecord" @CloseDialog="CloseDialog"></EmployeeCommunicationRecord>
  </div>
</template>

<script>
import { AddStaffCommunication } from '@/api/OutsourcedEmployeeManagement.js'
import EmployeeCommunicationRecord from './components/EmployeeCommunicationRecord.vue'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import dialogresignation from './components/dialog-resignation'
import RelatedItems from '@/components/OutsourcedEmployeeManagement/RelatedItems.vue'
import { GetStaffPageList, AddStaffLeave, ImportToStaffExcel, GetStaffExcelModel, AddProveApply, EditStaffProject, AddStaffBlack, EditStaffSiFunStatus, DeleteStaff, AddStaffProjectLeave, DownloadStaffExcel, EntryProcessing } from '@/api/OutsourcedEmployeeManagement.js'
import { AddProjectStaff, GetProjectListByStaffId } from '@/api/projectManagement.js'
import { GetStaffEnum, GetCatagoryList, GetAreaList } from '@/api/Public.js'
import payment from './components/dialog-payment.vue'
import filters from '@/utils/filters'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import ProveOpens from '@/components/OutsourcedEmployeeManagement/ProveOpens.vue'
import BlackContent from './components/BlackContent.vue'
import dialogInduct from './components/dialog-Induct.vue'
import AddRemind from '@/components/publicComponents/AddRemind'
import { AddReminds } from '@/api/Remind.js'
import qs from 'qs'
import { black } from 'color-name'
export default {
  components: {
    dialogresignation,
    RelatedItems,
    ProveOpens,
    BlackContent,
    AddRemind,
    payment,
    dialogInduct,
    ScreeningComponent,
    EmployeeCommunicationRecord
  },
  filters: {
    LastQuitCert (value) {
      if (value == 0) {
        return '未提交'
      } else if (value == 1) {
        return '已提交'
      } else {
        return ''
      }
    },
    StaffContractSignType (value) {
      if (value == 0) {
        return '电子版'
      } else if (value == 1) {
        return '纸质版'
      } else {
        return ''
      }
    },
    StaffContractStatus (value) {
      if (value == 0) {
        return '待存档'
      } else if (value == 1) {
        return '已存档'
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      searchform: {
        UserName: '',
        Sex: '',
        Birthday: '',
        IdCode: '',
        CompanyName: '',
        ProjectName: '',
        Comprehensive: '',
        Mobile: '',
        Status: '',
        Nation: '',
        Type: '',
        ArmyMan: '',
        Married: '',
        Politics: '',
        HealthyExam: '',
        OriginAreaId: ''
      },
      StaffId: 0,
      addVisible: false,
      checkboxVal: [],
      formTheadOptions: [
        { label: "员工编码", prop: "Code" },
        { label: "员工姓名", prop: "UserName" },
        { label: "性别", prop: "Sex" },
        { label: "身份证号码", prop: "IdCode" },
        { label: "联系电话", prop: "Mobile" },
        { label: "电子邮件", prop: "Email" },
        { label: "户口所在地", prop: "ResidenceAreaName" },
        { label: "政治面貌", prop: "Politics" },
        { label: "最高学历", prop: "DiplomaText" },
        { label: "最高学位", prop: "DegreeText" },
        { label: "健康体检状态", prop: "HealthyExamText" },
        { label: "紧急联系电话", prop: "EmergencyTel" },
        { label: "紧急联系人", prop: "EmergencyPerson" },
        { label: "工资卡账号", prop: "BankAccount" },
        { label: "工资卡开户行", prop: "BankNameStr" },
        { label: "社保账号", prop: "SiAccount" },
        { label: "社保卡进度", prop: "SiProgressText" },
        { label: "社保参保地", prop: "SiAreaName" },
        { label: "公积金账号", prop: "FundAccount" },
        { label: "个税扣除规则", prop: "PersonalTaxRuleName" },
        { label: "就职项目", prop: "ProjectNumber" },
        { label: "入职公司", prop: "BfCompanyName" },
        { label: "入职时间", prop: "JoinTime" },
        { label: "原公司离职证明状态", prop: "LastQuitCert" },
        { label: "目前就职状态", prop: "StatusText" },
        { label: "合同类型", prop: "StaffContractTypeText" },
        { label: "合同签订模式", prop: "StaffContractSignType" },
        { label: "合同起始日期", prop: "StaffContractStartDate" },
        { label: "合同终止日期", prop: "StaffContractExpireDate" },
        { label: "合同签署状态", prop: "StaffContractStatus" },
      ],
      StatusType: [], // 人员补贴属性
      StatusList: [], // 员工状态
      StaffEnumType: [], // 员工类型
      Nationlist: [], // 民族列表
      StaffEnumHealthyExam: [], // 健康体检状态
      nativeprovince: '',
      nativecity: '',
      nativeprovincelist: [],
      nativecitylist: [],
      nativearealist: [],
      paymentmessage: '', // 成功提示

      resignationname: '入职公司离职办理',
      resignationvisible: false, // 离职弹框
      resignationdata: {}, // 离职弹框内容

      relatename: '关联项目',
      relatevisible: false,
      relatedata: [], // 关联弹框内容

      showAddProve: false, // 证明弹框
      ProveTitle: '', // 证明标题
      tempData: {}, // 证明弹框内容

      importvisible: false, // 导入员工弹框
      filterdata: { // 上传的文件
        type: '',
        name: '',
        visible: false
      },
      files: null, // 文件
      reportvisible: false, // 上传报告
      errordata: {}, // 错误信息

      tableloading: false, // 表格加载
      allchecked: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Ids: [],
      Id: '',
      searchIDobj: {
        resignatType: 1,
        staffId: '',
        ProjectId: ''
      },
      BlackTitle: '加入黑名单',
      itemMap: {
        Id: '',
        Remark: ''
      },
      showBlackContent: false,
      selectitem: [], // 多选数组有详细数据
      showInduct: false,
      InductTitle: '入职办理',
      showRemind: false,
      remindtitle: '添加客户提醒',
      paymentname: '',
      paymentvisible: false,
      paymentdata: {},
      paymentType: 0, // 0 社保 1 公积金
      bath: false, // 是否批量操作
      isstop: false, // 是否停缴
      index: 0,
      popovertable: [],
      popoverloading: false,
      Comwork: false,
      IdArr: '',
      operates: [] // 获取页面权限
    }
  },
  watch: {
    // 籍贯省变化
    nativeprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.nativecitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.nativecitylist.find(v => {
              return v.Id == this.nativecity
            })
            if (isclear) {
            } else {
              this.nativecity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.nativecity = ''
        this.searchform.OriginAreaId = ''
        this.nativecitylist = []
        this.nativearealist = []
      }
    },
    // 籍贯市变化
    nativecity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.nativearealist = response.Data
            let isclear = this.nativearealist.find(v => {
              return v.Id == this.searchform.OriginAreaId
            })
            if (isclear) {
            } else {
              this.searchform.OriginAreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.nativearealist = []
        this.searchform.OriginAreaId = ''
      }
    },
    // 监听批量操作关闭弹框和加载动画
    index (newvalue, oldvalue) {
      console.log(this.Ids)
      console.log(newvalue)
      if (this.Ids.length == newvalue) {
        hideLoading()
        this.$message({
          message: this.paymentmessage,
          type: "success"
        })
        this.paymentvisible = false
      }
    }
  },
  created () {
    // 获取页面权限
    this.operates = this.$route.meta.operations
    console.log(this.operates)
    console.log(JSON.parse(JSON.stringify(this.operates)));
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
    if (this.$route.query && this.$route.query.IdArr) {
      this.PageSize = 200
      this.Comwork = true
      this.IdArr = this.$route.query.IdArr
      this.getStaffPageList()
    } else {
      this.IdArr = ''
      this.PageSize = 10
      this.Comwork = false
      this.getStaffPageList()
    }
    this.getStaffEnum()
    this.getCatagoryList()
    this.getAreaList()
  },
  methods: {
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    CloseDialog (e) {
      this.addVisible = e
    },
    //保存外包员工沟通记录
    SaveCommunicationRecord (Communicator, CommunicationTime, CommunicationContent, enclosure) {
      let obj = {
        StaffId: this.StaffId,
        CommunicationId: Communicator,
        CommunicationTime: CommunicationTime,
        Content: CommunicationContent,
        AttachUrl: enclosure,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      AddStaffCommunication(obj).then(res => {
        if (res.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加外包员工沟通记录成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent,
          })
        }
      })

    },
    //添加外包员工沟通记录
    AddCommunicationRecord (e, str) {
      console.log(e);
      this.StaffId = e.Id
      this.addVisible = true
    },
    // 获取外包员工信息
    getStaffPageList () {
      let obj = {
        IdArr: this.IdArr,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        UserName: this.searchform.UserName,
        IdCode: this.searchform.IdCode,
        CompanyName: this.searchform.CompanyName,
        ProjectName: this.searchform.ProjectName,
        Comprehensive: this.searchform.Comprehensive,
        Mobile: this.searchform.Mobile,
        Sex: this.searchform.Sex,
        Birthday: this.searchform.Birthday,
        Type: this.searchform.Type,
        Nation: this.searchform.Nation,
        ArmyMan: this.searchform.ArmyMan,
        Married: this.searchform.Married,
        HealthyExam: this.searchform.HealthyExam,
        Politics: this.searchform.Politics,
        Diploma: -1,
        Status: this.searchform.Status,
        OriginAreaId: this.searchform.OriginAreaId || this.nativecity || this.nativeprovince || '',
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      // 处理数据
      if (this.StatusType.length > 0) {
        obj.Peasant = false
        obj.Disabled = false
        obj.Poor = false
        obj.Reset = false
        obj.CityLostWork = false
        for (let i = 0; i < this.StatusType.length; i++) {
          if (this.StatusType[i] === 0) {
            obj.Peasant = true
          } else if (this.StatusType[i] === 1) {
            obj.Disabled = true
          } else if (this.StatusType[i] === 2) {
            obj.Poor = true
          } else if (this.StatusType[i] === 3) {
            obj.Reset = true
          } else if (this.StatusType[i] === 4) {
            obj.CityLostWork = true
          }
        }
      }
      this.tableloading = true
      GetStaffPageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
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
    // 获取员工状态
    getStaffEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.StatusList = response.StaffEnumStatus
          this.StaffEnumType = response.StaffEnumType
          this.StaffEnumHealthyExam = response.StaffEnumHealthyExam
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取民族列表
    getCatagoryList () {
      let obj1 = {
        ClassName: '',
        Status: 1,
        ClassType: 4,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryList(qs.stringify(obj1)).then(response => {
        if (response.IsSuccess) {
          this.Nationlist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取一级地区
    getAreaList () {
      let obj = {
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetAreaList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.nativeprovincelist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 查询用工单位
    watchcompany (e) {
      let obj = {
        StaffId: e.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.popoverloading = true
      GetProjectListByStaffId(qs.stringify(obj)).then(response => {
        this.popoverloading = false
        if (response.IsSuccess) {
          this.popovertable = response.Data
        } else {
          this.popovertable = []
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
      this.IdArr = ''
      this.getStaffPageList()


    },
    //加入黑名单
    JoinBlacklist (op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (this.Ids.length == 0) {
        this.$message({
          message: '请勾选要加入黑名单的员工！',
          type: 'warning'
        })
        return
      }
      this.showBlackContent = true
    },
    //加入黑名单
    BlackContentSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      if (!data.Id) {
        let obj = {
          StaffIdArr: this.Ids.join(','),
          Remark: data.Remark,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        AddStaffBlack(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '加入黑名单成功',
              type: 'success'
            })
            this.showBlackContent = false
            this.getStaffPageList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }

    },
    //关闭黑名单框
    closeBlackContent (val) {
      this.showBlackContent = val
    },
    // 导出员工
    exportemployees (op) {
      const operating = this.$operatedata(this.operates, op)
      if (!this.Ids.length) {
        this.$message({
          type: 'warning',
          message: '请选择要导出的员工'
        });
        return
      }
      let obj = {
        IdArr: this.Ids.join(','),
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      DownloadStaffExcel(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          console.log(response);
          window.open(response.Data)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 打开导入员工弹框
    Importemployees (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.importvisible = true
    },
    // 下载导入模板
    downemployees () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetStaffExcelModel(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          window.open('http://' + response.Data)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    uploadfile (e) {
      this.files = e.target.files[0]
      this.filterdata = {
        type: 'Excel',
        name: this.files.name,
        visible: false
      }
    },
    // 删除
    deletefile () {
      this.files = null
      this.filterdata = {
        type: '',
        name: '',
        visible: false
      }
    },
    // 导入员工
    saveimport () {
      if (this.files) {
        const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
        var obj = new FormData()
        obj.append('file', this.files)
        obj.append('Type', '0')
        obj.menuid = operating.MenuId
        obj.operationcode = operating.OperationCode
        showLoading()
        ImportToStaffExcel(obj).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
              this.getStaffPageList()

            } else {
              this.errordata = response.Data
              this.reportvisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }

        })
      } else {
        this.$message({
          message: '请选择文件',
          type: 'warning'
        })
      }
    },
    // 证明开具
    issuecertificate (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.ProveTitle = '新增证明开具';
      this.showAddProve = true
    },
    // 保存证明
    ProveSave (e) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      e.menuid = operating.MenuId
      e.operationcode = operating.OperationCode
      showLoading()
      AddProveApply(qs.stringify(e)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '当前申请已提交至OA，后续状态跟进请移步证明开具管理!'
          })
          this.showAddProve = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    // 关闭证明弹框
    //关闭证明开具窗口
    closeProve (val) {
      this.showAddProve = val;
    },
    // 打开入职办理弹窗
    Induction (op) {
      if (this.selectitem.length > 0) {
        let goInduct = true
        for (let i = 0; i < this.selectitem.length; i++) {
          if (this.selectitem[i].Status != 0) {
            goInduct = false
            this.$message({
              message: '请选择待入职的员工！',
              type: 'warning'
            })
            return
          }
        }
        if (goInduct) {
          const operating = this.$operatedata(this.operates, op)
          window.localStorage.setItem('operating', JSON.stringify(operating))
          this.InductTitle = '入职办理';
          this.showInduct = true
        }

      } else {
        this.$message({
          message: '请勾选要入职办理的员工！',
          type: 'warning'
        })
        return
      }

    },
    //保存入职办理弹窗
    SuccInduct (e) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      let obj = {
        IdArr: this.Ids.join(','),
        BfCompanyId: e.BfCompanyId,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      EntryProcessing(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '入职办理成功',
            type: 'success'
          })
          this.getStaffPageList()
          this.showInduct = false
        } else {
          this.$message({
            message: response.Data,
            type: 'warning'
          })
        }
      })
    },
    //关闭入职办理弹窗
    CloseInduct (val) {
      this.showInduct = val;
    },
    // 关闭导入信息
    closereport () {
      this.reportvisible = false
      if (this.errordata.Successes) {
        this.getStaffPageList()
      }
    },
    // 入职办理
    onboarding (op) {
      window.localStorage.removeItem('multipleBreadpath')
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))

      this.$router.push({
        path: '/OutsourcedEmployeeManagement/AddExpatriateEmployees'
      })
    },
    // 离职办理
    resignation () {
      this.resignationvisible = true
    },
    // 员工详情
    watchstaff (e, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (!operating.MenuId) {
        this.$message({
          message: '没有权限查看',
          type: 'warning'
        })
        return
      }
      const { href } = this.$router.resolve({
        path: '/OutsourcedEmployeeManagement/ExpatriateEmployeesDeatil',
        query: {
          id: e.Id
        }
      })
      window.open(href, '_blank')
    },
    // 修改
    update (e, op) {
      window.localStorage.removeItem('multipleBreadpath')
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))

      this.$router.push({
        path: '/OutsourcedEmployeeManagement/AddExpatriateEmployees',
        query: {
          id: e.Id
        }
      })
    },
    //获取选中项目
    GetProjectList(datas){
       let obj = {
          StaffId: datas.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetProjectListByStaffId(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.relatedata = response.Data
          } else {
            this.popovertable = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
    },
    // 关联项目
    relateditem (e, op) {
      this.GetProjectList(e)
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      // 判断该条数据是否在黑名单中
      if (e.IsStaffBlack == 1) {
        this.$confirm('该员工已被列为黑名单, 是否继续关联项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Id = e.Id + ''
          this.relatevisible = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          })
        })
      } else {
        this.Id = e.Id + ''
        this.relatevisible = true
      }
    },
    // 保存关联项目
    saverelate (e, datetime) {
      // console.log(e);
      // let obj = {
      //   StaffId: this.Id,
      //   ProjectId: e.Id,
      // }
      // console.log(this.Id);
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      let array = this.Id.split(',')
      let AddProjectStaffList = []
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < e.length; j++) {
          AddProjectStaffList.push({
            StaffId: array[i],
            ProjectId: e[j].ProjectId,
            PositionName: e[j].PositionName,
            ProjectRecruitId: e[j].ProjectRecruitId,
            EntryTime: datetime
          })
        }
      }
      // for (let i = 0; i < array.length; i++) {
      //   AddProjectStaffList.push({
      //     StaffId: array[i],
      //     ProjectId: e.Id,
      //     CompanyId: e.CompanyId,
      //     PositionName: PositionName
      //   })
      // }
      let obj = {
        AddProjectStaffList: AddProjectStaffList,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      AddProjectStaff(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          if (response.Data.ErrorMsg == '') {
            this.$message({
              message: '关联项目成功',
              type: 'success'
            })
            this.getStaffPageList()
          } else {
            this.$message({
              message: response.Data.ErrorMsg,
              type: 'error'
            })
          }
          this.relatevisible = false
        } else {
          this.$message({
            message: response.Data,
            type: 'warning'
          })
        }
      })
    },
    // 离职办理
    leave (e, op, type) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (type == 1) {
        this.resignationname = '入职公司离职办理'
      } else {
        this.resignationname = '用工单位离职办理'
      }
      this.Id = e.Id
      this.searchIDobj.resignatType = type
      this.searchIDobj.staffId = this.Id
      this.resignationvisible = true
    },
    // 保存离职弹框
    saveresignation (e, type) {
      console.log(e, type)
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      if (type == 1) {
        let obj = {
          StaffId: this.Id,
          LeaveTime: e.LeaveTime,
          LeaveReason: e.LeaveReason,
          LeaveAgree: e.LeaveAgree,
          AgreeUrl: e.AgreeUrl,
          Remark: e.Remark,
          SiStatus: e.SiStatus,
          SiEndYear: e.SiEndYear,
          SiEndMonth: e.SiEndMonth,
          FundStatus: e.FundStatus,
          FundEndYear: e.FundEndYear,
          FundEndMonth: e.FundEndMonth,
          MedicalStatus: e.MedicalStatus,
          MedicalEndYear: e.MedicalEndYear,
          MedicalEndMonth: e.MedicalEndMonth,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        AddStaffLeave(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '从入职公司离职成功',
              type: 'success'
            })
            this.resignationvisible = false
            this.getStaffPageList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      } else {
        let obj = {
          StaffId: this.Id,
          LeaveTime: e.LeaveTime,
          LeaveReason: e.LeaveReason,
          LeaveAgree: e.LeaveAgree,
          AgreeUrl: e.AgreeUrl,
          ProjectId: e.ProjectId,
          Remark: e.Remark,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        AddStaffProjectLeave(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '从用工单位离职成功',
              type: 'success'
            })
            this.resignationvisible = false
            this.getStaffPageList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      }


    },
    // 弹窗关闭
    closedialog () {
      this.resignationvisible = false
      this.relatevisible = false
      this.resignationvisible = false
      this.files = null
    },
    handleSelectionChange (value) {
      this.Ids = []
      this.selectitem = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
        this.selectitem.push(value[i])
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
    // 更改薪酬 计算规则
    salarycalculationrules () {

    },
    // 批量修改关联项目
    relateditems (op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      var array = ''
      if (this.Ids.length === 0) {
        this.$message({
          message: '你未选中人员！',
          type: 'warning'
        })
        return
      }
      // console.log(this.selectitem);
      let messagename = ''
      for (let i = 0; i < this.selectitem.length; i++) {
        if (this.selectitem[i].IsStaffBlack === 1) {
          messagename += "'" + this.selectitem[i].UserName + "'" + ' '
        }
      }
      if (messagename) {
        this.$confirm(`${messagename}已被列为黑名单, 是否继续关联项目?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Id = this.Ids.join(',')
          this.relatevisible = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          })
        })
      } else {
        this.Id = this.Ids.join(',')
        this.relatevisible = true
      }
    },

    // 证明开具
    enables () {

    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getStaffPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getStaffPageList()
    },

    // 添加提醒
    addremind (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.showRemind = true
    },
    // 关闭提醒
    closeshowAddRemind () {
      this.showRemind = false
    },
    // 保存提醒
    AddRemindSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.Type = 4
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      showLoading()
      AddReminds(qs.stringify(data)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加项目提醒成功!'
          })
          this.showRemind = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    // 社保缴纳
    Socialpayment (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.Id = e.Id
      this.paymentType = 0
      this.paymentname = '社保缴纳'
      this.paymentvisible = true
      this.bath = false // 批量
      this.isstop = false // 停缴
    },
    Socialpayments (op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      // 判断是否选中人员
      if (this.Ids && this.Ids.length) {
        this.paymentType = 0
        this.paymentname = '社保缴纳'
        this.paymentvisible = true
        this.bath = true // 批量
        this.isstop = false // 停缴
      } else {
        this.$message({
          message: '你未选中人员！',
          type: 'warning'
        })
        return
      }
    },
    // 社保停缴
    Socialstop (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.Id = e.Id
      this.paymentType = 0
      this.paymentname = '社保停缴'
      this.paymentvisible = true
      this.bath = false // 批量
      this.isstop = true // 停缴
    },
    Socialstops (op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      // 判断是否选中人员
      if (this.Ids && this.Ids.length) {
        this.paymentType = 0
        this.paymentname = '社保停缴'
        this.paymentvisible = true
        this.bath = true // 批量
        this.isstop = true // 停缴
      } else {
        this.$message({
          message: '你未选中人员！',
          type: 'warning'
        })
        return
      }
    },
    // 公积金缴纳
    accumulationpayment (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.Id = e.Id
      this.paymentType = 1
      this.paymentname = '公积金缴纳'
      this.paymentvisible = true
      this.bath = false // 批量
      this.isstop = false // 停缴
    },
    accumulationpayments (op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (this.Ids && this.Ids.length) {
        this.paymentType = 1
        this.paymentname = '公积金缴纳'
        this.paymentvisible = true
        this.bath = true // 批量
        this.isstop = false // 停缴
      } else {
        this.$message({
          message: '你未选中人员！',
          type: 'warning'
        })
        return
      }
    },
    // 公积金停缴
    accumulationstop (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.Id = e.Id
      this.paymentType = 1
      this.paymentname = '公积金停缴'
      this.paymentvisible = true
      this.bath = false // 批量
      this.isstop = true // 停缴
    },
    accumulationstops (op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (this.Ids && this.Ids.length) {
        this.paymentname = '公积金停缴'
        this.paymentType = 1
        this.paymentvisible = true
        this.bath = true // 批量
        this.isstop = true // 停缴
      } else {
        this.$message({
          message: '你未选中人员！',
          type: 'warning'
        })
        return
      }
    },
    //医保缴纳
    healthcarepayment (e, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.Id = e.Id
      this.paymentType = 2
      this.paymentname = '医保缴纳'
      this.paymentvisible = true
      this.bath = false // 批量
      this.isstop = false // 停缴
    },
    //批量医保缴纳
    healthcarepayments (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (this.Ids && this.Ids.length) {
        this.paymentType = 2
        this.paymentname = '医保缴纳'
        this.paymentvisible = true
        this.bath = true // 批量
        this.isstop = false // 停缴
      } else {
        this.$message({
          message: '你未选中人员！',
          type: 'warning'
        })
        return
      }
    },
    //医保停缴
    healthcarestop (e, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.Id = e.Id
      this.paymentType = 2
      this.paymentname = '医保停缴'
      this.paymentvisible = true
      this.bath = false // 批量
      this.isstop = true // 停缴
    },
    //批量医保停缴
    healthcarestops (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (this.Ids && this.Ids.length) {
        this.paymentname = '医保停缴'
        this.paymentType = 2
        this.paymentvisible = true
        this.bath = true // 批量
        this.isstop = true // 停缴
      } else {
        this.$message({
          message: '你未选中人员！',
          type: 'warning'
        })
        return
      }
    },
    // 关闭缴纳状态弹框
    closepayment () {
      this.paymentvisible = false
    },
    //删除人员
    Delpayments (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (this.Ids && this.Ids.length) {
        this.$confirm('此操作将删除选中的外派人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = {
            IdArr: this.Ids.join(','),
            menuid: operating.MenuId,
            operationcode: operating.OperationCode
          }
          DeleteStaff(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: response.MessageContent,
                type: 'success'
              })
              this.getStaffPageList()
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: '你未选中人员！',
          type: 'warning'
        })
        return
      }
    },
    // 保存缴纳状态弹框
    savepayment (e) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      if (this.bath) {
        // 批量
        this.index = 0
        showLoading()
        for (let i = 0; i < this.Ids.length; i++) {
          let obj = {
            Id: this.Ids[i],
            Type: this.paymentType,
            Status: e.Status,
            Year: e.Year,
            Month: e.Month,
            menuid: operating.MenuId,
            operationcode: operating.OperationCode
          }
          EditStaffSiFunStatus(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.paymentmessage = response.MessageContent
              console.log(this.index);
              this.index++
            } else {
              this.$message({
                message: 'Id为' + this.Ids[i] + response.MessageContent,
                type: "error"
              });
              hideLoading()
              return
            }
          })
        }
      } else {
        // 单个
        let obj = {
          Id: this.Id,
          Type: this.paymentType,
          Status: e.Status,
          Year: e.Year,
          Month: e.Month,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        EditStaffSiFunStatus(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: response.MessageContent,
              type: "success"
            })
            this.paymentvisible = false
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
.expatriate-management-container {
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
      &.practice {
        .selet {
          margin-right: 10px;
        }
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
    .screening-compent {
      float: right;
      margin-bottom: 10px;
    }
    // .operate-table {
    //   // 右侧菜单栏固定的样式
    //   th.is-leaf {
    //     background: $tableHeader;
    //     font-weight: 700;
    //     color: $erp333;
    //     font-size: $f16;
    //   }
    //   .el-table__header-wrapper {
    //     // height: 56px;
    //     border-radius: 8px;
    //     overflow: hidden;
    //     .has-gutter {
    //       // height: 56px;
    //       th {
    //         line-height: 33px;
    //         background-color: $tableHeader;
    //         font-size: $f16;
    //         color: $erp333;
    //         .cell {
    //           .el-checkbox {
    //             .el-checkbox__inner {
    //               width: 16px;
    //               height: 16px;
    //               border: none;
    //               background-color: #A3B1CC;
    //               &::after {
    //                 border: 2px solid #FFF;
    //                 border-left: 0;
    //                 border-top: 0;
    //                 height: 10px;
    //                 left: 6px;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   .el-table__body-wrapper {
    //     tr {
    //       td {
    //         .cell {
    //           .el-checkbox {
    //             .el-checkbox__inner {
    //               width: 16px;
    //               height: 16px;
    //               border: none;
    //               background-color: #A3B1CC;
    //               &::after {
    //                 border: 2px solid #FFF;
    //                 border-left: 0;
    //                 border-top: 0;
    //                 height: 10px;
    //                 left: 6px;
    //               }
    //             }
    //           }
    //           .watchcode {
    //             cursor: pointer;
    //             color: $erpcolor;
    //           }
    //         }
    //         &:first-child {
    //           border-radius: 8px 0 0 8px;
    //         }
    //         &:last-child {
    //           border-radius: 0 8px 8px 0;
    //         }
    //       }
    //     }
    //   }
    //   // 右侧固定样式
    //   .el-table__fixed-right {
    //     &::before {
    //       background-color: transparent;
    //     }
    //   }
    //   // 表格取消线条
    //   .el-table td {
    //     border-bottom: none;
    //   }
    // }
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
      .el-button {
        margin-bottom: 12px;
      }
    }
    .pagina-fonter {
      margin-top: 10px;
    }
  }
}
.erpdialog {
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
            width: 110px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            transform: translate(-50%, -50%);
          }
        }
        > .img-box-hover {
          position: absolute;
          width: 100%;
          height: 30px;
          background-color: #909198;
          bottom: 0;
          display: flex;
          justify-content: center;
          border-radius: 0 0 8px 8px;
          .btn {
            position: relative;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            width: 50%;
            > input {
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              cursor: pointer;
            }
            .svg-icon {
              color: #fff;
              margin-right: 10px;
              font-size: $f14;
            }
            > span {
              font-size: $f14;
              color: #fff;
              cursor: pointer;
            }
            &:hover {
              .svg-icon {
                color: #1588f8;
              }
              span {
                color: #1588f8;
              }
            }
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
      max-height: calc(100vh - 600px);
      overflow-y: auto;
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
</style>