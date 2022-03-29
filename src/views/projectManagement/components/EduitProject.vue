<!-- 修改项目 -->
<template>
  <div class="add-project-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="projectform" label-position="top" :model="projectform" :rules="rules" label-width="140px" class="projectform">
        <div class="form-title">基本信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Name" label="项目名称" prop="Name">
                <el-input v-model="projectform.Name" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Account" label="项目金额" prop="Account">
                <el-input v-model="projectform.Account" clearable>
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="CompanyId" label="所属客户" prop="CompanyId">
                <el-select v-model="projectform.CompanyId" filterable clearable remote placeholder="搜索或选择所属客户" :remote-method="companyMethod" @clear="companyMethod('')">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in Companylist" :key="index"></el-option>
                  <div v-if="Companylist.length > 99" class="search-keyword">
                    <span>只显示前100条结果，请完善搜索关键字</span>
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="BusinessType" label="项目业务类型" prop="BusinessType">
                <el-select v-model="projectform.BusinessType" filterable placeholder="搜索或选择项目业务类型" @change="RiskFeeType1">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in ProjectBusinesslist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目优先级" prop="Priority">
                <el-select v-model="projectform.Priority" filterable placeholder="选择项目优先级">
                  <el-option label="低" :value="0"></el-option>
                  <el-option label="中" :value="1"></el-option>
                  <el-option label="高" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目跟单员" prop="Owner">
                <el-select v-model="projectform.Owner" filterable clearable remote placeholder="搜索或选择业务负责人" :remote-method="OwnerMethod" @clear="OwnerMethod('')">
                  <el-option :label="item.UserName" :value="item.Id" v-for="(item, index) in Ownerlist" :key="index"></el-option>
                  <div v-if="Ownerlist.length > 99" class="search-keyword">
                    <span>只显示前100条结果，请完善搜索关键字</span>
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="发票类型">
                <el-radio-group v-model="projectform.InvoiceType">
                  <el-radio :label="0">增值税专用发票</el-radio>
                  <el-radio :label="1">增值税普通发票</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="履约保证金" class="double">
                <el-radio-group v-model="projectform.NeedBond">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <el-input v-if="projectform.NeedBond === 1" @blur="needboodblur(projectform.Bond)" v-model="projectform.Bond" clearable>
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否需要招投标" prop="Tender">
                <el-radio-group v-model="projectform.Tender">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="MgrFee" label="人均管理费" prop="MgrFee">
                <el-select v-model="projectform.MgrFee" filterable clearable placeholder="选择人均管理费" @change="RiskFeeType2">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in MgrFeeEnumlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="SiType" label="参保情况" prop="SiType">
                <el-select v-model="projectform.SiType" filterable clearable placeholder="选择参保情况" @change="RiskFeeType3">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in SiTypeEnumlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Undertaker" label="风险承担方" prop="Undertaker">
                <el-select v-model="projectform.Undertaker" filterable clearable placeholder="选择风险承担方" @change="RiskFeeType4">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in UndertakerEnumlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="RiskScaleShow">
              <el-form-item label="风险金比例">
                <el-input v-model="projectform.RiskScale" disabled>
                  <svg-icon slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Recruit" label="是否需招聘" prop="Recruit">
                <el-radio-group v-model="projectform.Recruit">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Advance" label="是否垫资" prop="Advance">
                <el-radio-group v-model="projectform.Advance">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="MgrPrice" label="管理费单价" prop="MgrPrice" :rules="Addrules.MgrPrice">
                <el-input v-model="projectform.MgrPrice" placeholder="单位管理费无单位, 手动填写单位" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="FirstSign" label="首次签订协议时间" prop="FirstSign" :rules="Addrules.FirstSign">
                <el-date-picker v-model="projectform.FirstSign" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Yearth" label="协议执行年度" prop="Yearth" :rules="Addrules.Yearth">
                <el-select v-model="projectform.Yearth" filterable clearable placeholder="选择人协议执行年度">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in Yearthlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="MarketType" label="营销模式" prop="MarketType" :rules="Addrules.MarketType">
                <el-select v-model="projectform.MarketType" filterable clearable placeholder="选择营销模式">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in Marketlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="PositionName" label="岗位" prop="PositionName" :rules="Addrules.PositionName">
                <el-input v-model="projectform.PositionName" placeholder="请输入岗位" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="FirstMonthNum" label="首月人数" prop="FirstMonthNum" :rules="Addrules.FirstMonthNum">
                <el-input v-model="projectform.FirstMonthNum" placeholder="请输入首月人数" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="FirstMonthIncome" label="首月收入" prop="FirstMonthIncome" :rules="Addrules.FirstMonthIncome">
                <el-input v-model="projectform.FirstMonthIncome" placeholder="请输入首月收入" @blur="FirstMonthIncomeblur(projectform.FirstMonthIncome)" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="FirstMonthMgrFee" label="首月管理费" prop="FirstMonthMgrFee" :rules="Addrules.FirstMonthMgrFee">
                <el-input v-model="projectform.FirstMonthMgrFee" placeholder="请输入首月管理费" @blur="FirstMonthMgrFeeblur(projectform.FirstMonthMgrFee)" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="年度毛利润（元）">
                <el-input v-model="projectform.AnnualGrossProfit" placeholder="请输入年度毛利润（元）" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="月毛利润（元）">
                <el-input v-model="projectform.MonthlyGrossProfit" placeholder="请输入月毛利润（元）" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开发形式">
                <el-select v-model="projectform.DevelopmentForm" filterable clearable placeholder="请选择开发形式">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in Developmentlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="业务单价（元/人/月）">
                <el-input v-model="projectform.BusinessUnitPrice" placeholder="请输入业务单价（元/人/月）" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-row :gutter="64">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="是否需分公司服务">
                    <el-radio-group v-model="projectform.Assist" @change="chooseAssist">
                      <el-radio :label="0">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="projectform.Assist===1">
                  <el-form-item label="选择需要协助分公司(多选)">
                    <el-select v-model="OrgId" multiple filterable clearable placeholder="搜索或选择分公司">
                      <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in orgList" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="项目详细描述" class="text">
                <el-input type="textarea" :rows="6" v-model="projectform.Description" maxlength="4000" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="项目特别说明" class="text">
                <el-input type="textarea" :rows="6" v-model="projectform.Special" maxlength="4000" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 业务信息 -->
        <div class="form-title" v-if="projectform.BusinessType==1 || projectform.BusinessType==2 || projectform.BusinessType==3">业务信息
          <!-- <div class="operate cursor-pointer" @click="addpost()">
            <svg-icon icon-class="money" />
            <span>添加</span>
          </div> -->
        </div>
        <!-- <div class="form-cont" v-for="(item, index) in postlist" :key="index"> -->
        <div class="form-cont" v-if="projectform.BusinessType==1 || projectform.BusinessType==2 || projectform.BusinessType==3">
          <el-row class="post-list" :gutter="64">
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="岗位名称">
                <el-input v-model="projectform.Outsource.Name"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="参保险种">
                <!-- <el-input v-model="projectform.Outsource.Insurance"></el-input> -->
                <el-select v-model="projectform.Outsource.Insurance" filterable placeholder="搜索选择参保险种">
                  <el-option :label="item.ClassName" :value="item.Id" v-for="(item, index) in Insuredlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="管理费">
                <el-input v-model="projectform.Outsource.MgrFee"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="协议期限" class="dategroup">
                <!-- <el-input v-model="projectform.Outsource.CoordinateStart"></el-input> -->
                <!-- <div> -->
                <el-date-picker v-model="projectform.Outsource.CoordinateStart" type="date" placeholder="选择日期"></el-date-picker>
                <el-date-picker v-model="projectform.Outsource.CoordinateEnd" type="date" placeholder="选择日期"></el-date-picker>
                <!-- </div> -->
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="结算方式">
                <el-input v-model="projectform.Outsource.Name"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="结算日期" class="datetime">
                <!-- <el-input v-model="projectform.Outsource.SalaryDay"></el-input> -->
                <el-date-picker v-model="projectform.Outsource.SalaryDay" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="发票要求">
                <!-- <el-input v-model="projectform.Outsource.InvoiceDemand"></el-input> -->
                <el-radio-group v-model="projectform.Outsource.InvoiceDemand">
                  <el-radio :label="0">增值税专用发票</el-radio>
                  <el-radio :label="1">增值税普通发票</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票比例">
                <el-input v-model="projectform.Outsource.Name"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="税金">
                <el-input v-model="projectform.Outsource.Tax"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="单位量工资">
                <el-input v-model="projectform.Outsource.Name"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="员工合同年限" class="datetime">
                <!-- <el-input v-model="projectform.Outsource.StaffContract"></el-input> -->
                <el-date-picker v-model="projectform.Outsource.StaffContract" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="客户公司地址" class="path">
                <el-select v-model="customprovince" filterable placeholder="选择省份" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in customprovincelist" :key="index"></el-option>
                </el-select>
                <el-select v-model="customcity" filterable placeholder="选择城市" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in customcitylist" :key="index"></el-option>
                </el-select>
                <el-select v-model="projectform.Outsource.AreaId" filterable placeholder="选择区县" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in customarealist" :key="index"></el-option>
                </el-select>
                <!-- <el-input v-model="item.Addr" placeholder="请输入详情地址" clearable></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
              <el-form-item label="岗位要求" class="text">
                <el-input type="textarea" :rows="6" v-model="projectform.Outsource.Description" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col>
              <div class="operate-btn">
                <div class="btn" @click="updatepost(item, index)">
                  <svg-icon icon-class="money" />
                  <span>编辑</span>
                </div>
                <div class="btn" @click="deletepost(index, item)">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div>
              </div>
            </el-col> -->
          </el-row>
        </div>

        <!-- 招聘业务信息 -->
        <!-- 两种展示状态 1: 当没有值并且当前数据状态为(待服务和服务中)且业务类型为1~5的类型时展示; 2: 当没有值且(业务类型为4和5)时展示 -->
        <div class="form-title" v-if="(!Recruitlist.length && (projectform.Status == '7' || projectform.Status == '8') && (projectform.BusinessType == '1' || projectform.BusinessType == '2' || projectform.BusinessType == '3' || projectform.BusinessType == '4' || projectform.BusinessType == '5')) || (!Recruitlist.length && (projectform.BusinessType == '4' || projectform.BusinessType == '5'))">
          <span>招聘业务信息</span>
          <div class="operate">
            <svg-icon class="cursor-pointer" icon-class="money" @click="addRecruit()" />
            <span class="cursor-pointer" @click="addRecruit()">添加</span>
          </div>
        </div>
        <div v-for="(item, index) in Recruitlist" :key="index" v-if="Recruitlist.length">
          <div class="form-title">
            <span>招聘业务信息</span>
            <div class="operate">
              <svg-icon class="cursor-pointer" icon-class="money" @click="deleteRecruit(item)" />
              <span class="cursor-pointer" @click="deleteRecruit(item)">删除</span>
            </div>
            <div class="operate">
              <svg-icon class="cursor-pointer" icon-class="money" @click="editRecruit(item)" />
              <span class="cursor-pointer" @click="editRecruit(item)">修改</span>
            </div>
            <div class="operate">
              <svg-icon class="cursor-pointer" icon-class="money" @click="addRecruit()" />
              <span class="cursor-pointer" @click="addRecruit()">添加</span>
            </div>
          </div>
          <div class="form-cont">
            <el-row :gutter="64">
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="接单人??">
                  <el-input v-model="recruitform.Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="提交人??">
                  <el-select v-model="item.value" placeholder="请选择提交人">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="招聘岗位">
                  <el-input disabled v-model="item.PositionName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="岗位人数">
                  <el-input disabled v-model="item.NeedNum"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="管理费">
                  <el-input disabled v-model="item.MgrFee"></el-input>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="是否已签合同??">
                  <el-input v-model="item.Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="合同期限??">
                  <el-input v-model="item.Name"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="上岗地址" class="path" :key="item.index + item.Id">
                  <!-- <el-select v-model="postprovince[index]" filterable placeholder="选择省份" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postprovincelist[index]" :key="index"></el-option>
                  </el-select> -->
                  <el-input class="input" disabled v-model="item.postprovinceName"></el-input>
                  <!-- <el-select v-model="postcity[index]" filterable placeholder="选择城市" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postcitylist[index]" :key="index"></el-option>
                  </el-select> -->
                  <el-input class="input" disabled v-model="item.postcityName"></el-input>
                  <!-- <el-select v-model="item.AreaId" filterable placeholder="选择区县" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postarealist[index]" :key="index"></el-option>
                  </el-select> -->
                  <el-input class="input" disabled v-model="item.AreaIdName"></el-input>
                  <el-input disabled v-model="item.Address" placeholder="请输入详情地址" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="上班时间" class="datetime">
                  <!-- <el-input v-model="item.WorkTime"></el-input> -->
                  <el-date-picker disabled v-model="item.WorkTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="到岗时间" class="datetime">
                  <!-- <el-input v-model="item.OnBoardTime"></el-input> -->
                  <el-date-picker disabled v-model="item.OnBoardTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="倒班时时间">
                  <el-input disabled v-model="item.ChangeTime"></el-input>
                  <!-- <el-date-picker v-model="item.ChangeTime" type="date" placeholder="选择日期"></el-date-picker> -->
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="休息时间">
                  <el-input disabled v-model="item.RestTime"></el-input>
                  <!-- <el-date-picker v-model="item.RestTime" type="date" placeholder="选择日期"></el-date-picker> -->
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                <el-form-item label="岗位要求" class="text">
                  <el-input disabled type="textarea" :rows="6" v-model="item.Skills" maxlength="500" show-word-limit></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                <el-form-item label="工作内容及职责" class="text">
                  <el-input disabled type="textarea" :rows="6" v-model="item.Description" maxlength="500" show-word-limit></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="试用期薪资">
                  <el-input disabled v-model="item.SalaryTry">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="试用期限">
                  <el-input v-model="item.TryTime" disabled placeholder="请输入试用期限"></el-input>
                  <!-- <el-date-picker
                    disabled
                    v-model="item.TryTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="-"
                    clearable
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker> -->
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="综合薪资">
                  <el-input disabled v-model="item.Salary">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="五险一金">
                  <el-radio-group disabled v-model="item.SiFund">
                    <el-radio disabled label="1">有</el-radio>
                    <el-radio disabled label="0">无</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="是否包吃包住" class="text2">
                  <el-input type="textarea" disabled :rows="5" maxlength="100" show-word-limit v-model="item.LiveEat"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="培训要求??">
                  <el-radio-group v-model="item.Sex">
                    <el-radio label="1">有</el-radio>
                    <el-radio label="0">无</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="培训薪资" class="text2">
                  <el-input type="textarea" disabled :rows="5" maxlength="100" show-word-limit v-model="item.TrainSalary"></el-input>
                  <!-- <el-input v-model="item.Name"></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="五险一金" class="text">
                  <!-- <el-radio-group v-model="recruitform.SiFund">
                    <el-radio label="1">有</el-radio>
                    <el-radio label="0">无</el-radio>
                  </el-radio-group> -->
                  <el-input type="textarea" disabled :rows="5" maxlength="100" show-word-limit v-model="item.SiFund"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="岗位补贴" class="text2">
                  <!-- <el-input v-model="item.PostSupport"></el-input> -->
                  <el-input disabled type="textarea" :rows="5" maxlength="200" show-word-limit v-model="item.PostSupport"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="加班补贴" class="text2">
                  <!-- <el-input v-model="item.OverTimeSupport"></el-input> -->
                  <el-input disabled type="textarea" :rows="5" maxlength="200" show-word-limit v-model="item.OverTimeSupport"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="全勤奖" class="text2">
                  <!-- <el-input v-model="item.FullTudy"></el-input> -->
                  <el-input disabled type="textarea" :rows="5" maxlength="200" show-word-limit v-model="item.FullTudy"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="提成说明" class="text2">
                  <!-- <el-input v-model="item.Commision"></el-input> -->
                  <el-input disabled type="textarea" :rows="5" maxlength="200" show-word-limit v-model="item.Commision"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="其他补贴/福利" class="text2">
                  <!-- <el-input v-model="item.OtherWelfare"></el-input> -->
                  <el-input disabled type="textarea" :rows="5" maxlength="200" show-word-limit v-model="item.OtherWelfare"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="晋升空间" class="text2">
                  <!-- <el-input v-model="item.Promotion"></el-input> -->
                  <el-input disabled type="textarea" :rows="5" maxlength="200" show-word-limit v-model="item.Promotion"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                <el-form-item label="应聘者需要提供的资料" class="text">
                  <el-input disabled type="textarea" :rows="6" v-model="item.NeedMaterial" maxlength="500" show-word-limit></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- <div class="form-title">福利待遇</div>
          <div class="form-cont">
            
          </div> -->
        </div>

        <!-- 项目沟通记录 -->
        <div class="form-title right" v-if="isupdate">项目沟通记录
          <div class="operate">
            <svg-icon class="cursor-pointer add" icon-class="add" @click="addrecord()" />
            <span class="cursor-pointer" @click="addrecord()">添加</span>
          </div>
        </div>
        <div class="form-cont" v-if="isupdate">
          <el-row :gutter="64" class="post-list" v-for="(item, index) in recordlist" :key="index">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="沟通人" class="select">
                <!-- <el-select disabled v-model="item.SysUserId" filterable remote clearable placeholder="搜索选择跟进人" >
                  <el-option
                    v-for="item in useroptions"
                    :key="item.Id"
                    :label="item.UserName"
                    :value="item.Id">
                  </el-option>
                  <div v-if="useroptions.length > 99"  class="search-keyword">
                    <span>只显示前100条结果，请完善搜索关键字</span>
                  </div>
                </el-select> -->
                <el-input v-model="item.SysUserName" disabled placeholder="搜索选择跟进人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="跟进时间" class="datetime">
                <el-date-picker disabled v-model="item.FollowTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="沟通内容" class="text">
                <el-input disabled type="textarea" :rows="6" v-model="item.Content" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="沟通阶段" class="select">
                <el-select disabled v-model="item.Progress" placeholder="请选择跟进阶段">
                  <el-option v-for="item in recordoptions" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="关联提醒" class="select">
                <el-select disabled v-model="item.TaskId" placeholder="请选择关联提醒">
                  <el-option v-for="item in recordoptions" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col>
              <div class="operate-btn">
                <div class="btn" @click="updaterecord(item, index)">
                  <svg-icon icon-class="update" />
                  <span>编辑</span>
                </div>
                <!-- <div class="btn" @click="deleterecord(index, item)">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div> -->
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 项目联系人 -->
        <div class="form-title">项目联系人
          <div class="operate">
            <svg-icon class="cursor-pointer add" icon-class="add" @click="addpost()" />
            <span class="cursor-pointer" @click="addpost()">添加</span>
          </div>
        </div>
        <div class="form-cont" v-for="(item, index) in projectform.Contacts" :key="index + item.Tel">
          <el-row class="post-list" :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="单位名称">
                <el-input disabled v-model="item.CompanyName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="单位类型">
                <el-input disabled v-model="item.NatureText"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="所属行业">
                <el-input disabled v-model="item.IndustryName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="地址">
                <el-input disabled v-model="item.Addr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目联系人">
                <el-input disabled v-model="item.UserName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目联系人职务">
                <el-input disabled v-model="item.PositionName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="联系人电话">
                <el-input disabled v-model="item.Tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="备注" class="text">
                <el-input disabled type="textarea" :rows="6" v-model="item.Remark" maxlength="200" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <div class="operate-btn">
                <div class="btn" @click="updatelinkname(item, index)">
                  <svg-icon icon-class="update" />
                  <span>编辑</span>
                </div>
                <div class="btn" @click="deletepost(item, index)">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="form-title">附件</div>
        <div class="tip">上传格式为PNG、JPG、Word、PDF、XLS</div>
        <div class="file-cont" v-loading="fileloading">
          <div class="img-box-list" v-if="filterlist.length!=0" v-for="(item, index) in filterlist" :key="index" @mouseenter="item.visible=!item.visible" @mouseleave="item.visible=!item.visible">
            <!-- 上传文件成功后展示 -->
            <div class="img-box">
              <span class="filetype">{{item.name}}</span>
              <div class="filename" :title="item.Url">{{item.Url}}</div>
            </div>
            <div class="img-box-hover" v-show="item.visible==true">
              <!-- <div class="btn" @click="watch(item)">
                  <svg-icon icon-class="money" />
                  <span>预览</span>
                </div>
                <div class="btn" @click="down(item)">
                  <svg-icon icon-class="money" />
                  <span>下载</span>
                </div> -->
              <div class="btn">
                <input type="file" accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx" name="" id="" @change="uploadfile($event, index)">
                <svg-icon icon-class="replace" class-name="svg-a" />
                <span>替换</span>
              </div>
              <div class="btn" @click="deletefile(index)">
                <svg-icon icon-class="del" class-name="svg-a" />
                <span>删除</span>
              </div>
            </div>
          </div>
          <div class="img-box-list">
            <!-- 未上传样式 -->
            <input type="file" ref="upload" accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx" name="" id="" @change="uploadfile">
            <div class="img-box">
              <img src="@/assets/down.png" alt="">
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <!-- 添加 -->
      <el-button class="erpbtn" size="small" @click="$router.go(-1)">取消</el-button>
      <el-button class="erpbtn" size="small" v-if="!isupdate" @click="onSubmit">立即创建</el-button>
      <el-button class="erpbtn" size="small" v-if="isupdate" @click="updateform">保存</el-button>
    </div>
    <div class="dialog">
      <!-- 联系人弹框 -->
      <el-dialog :close-on-click-modal="false" :title="postnametitle" :visible.sync="linknameVisible" width="480px" :lock-scroll="false" destroy-on-close @close="closedialog" custom-class="erpdialog">
        <el-form :model="linknamedata" label-position="top" :rules="rules" ref="linknamedata" label-width="100px" class="linknamedata">
          <el-form-item label="单位名称">
            <el-input v-model="linknamedata.CompanyName" clearable></el-input>
          </el-form-item>
          <el-form-item label="单位类型">
            <el-select v-model="linknamedata.Nature" style="width: 100%;" filterable clearable placeholder="请选择单位类型" @change="selectNature">
              <el-option :label="item.describe" :value="item.value" v-for="(item, index) in EnumNaturelist" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行业" class="vue-tree">
            <treeselect ref="trees3" v-model="linknamedata.IndustryId" :normalizer="normalizer" placeholder="搜索或选择行业" :default-expand-level="1" :disable-branch-nodes="true" :options="getIndustrtList" @select="selectIndustryId" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="linknamedata.Addr" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目联系人">
            <el-input v-model="linknamedata.UserName"></el-input>
          </el-form-item>
          <el-form-item label="项目联系人职务">
            <el-input v-model="linknamedata.PositionName"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input v-model="linknamedata.Tel"></el-input>
          </el-form-item>
          <el-form-item label="备注" class="text textInput">
            <!-- <el-input v-model="linknamedata.Content"></el-input> -->
            <el-input type="textarea" :rows="10" maxlength="200" show-word-limit v-model="linknamedata.Remark" size="small" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="linknamesave(linknamedata)">保 存</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加沟通记录 -->
    <AddCommunication :title="communicatetitle" :AddCommunication="AddCommunication" :showAddCommunication="showAddCommunication" @closeAddCommunication="closeAddCommunication" @CommunicationSave="ContractSave"></AddCommunication>
    <!-- 添加招聘信息 -->
    <recruitment :title="recruitmenttitle" :visible="recruitmentvisible" :contentdata="recruitmentdata" @closerecruitment="closerecruitment" @saverecruitment="saverecruitment"></recruitment>
  </div>
</template>

<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import AddCommunication from './AddCommunication'
import recruitment from './dialog-recruitment'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetYearthEnum, GetMarketTypeEnum, GetProjectBusinessType, AddProject, EditdProject, GetProject, GetProjectFollowList, GetProjectProgressEnum, AddProjectFollow, EditdProjectFollow, AddProjectRecruit, EditdProjectRecruit, GetProjectRecruit, DeleteProjectRecruitStatus, GetProjectSiTypeEnum, GetProjectUndertakerEnum, GetProjectMgrFeeEnum, GetDevelopmentFormEnum } from '@/api/projectManagement.js'
import { GetSysUserList, GetSysUserById } from '@/api/SystemSetting.js'
import { GetAreaList, GetCatagoryList, CompanyEnumNature } from '@/api/Public.js'
import SupperUploader from '@/utils/SupperUploader'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { uuid, showLoading, hideLoading, copy, MenuIdDate,debounce } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    AddCommunication,
    recruitment,
    Treeselect
  },
  data () {
    var checkMoney = (rule, value, callback) => {
      var reg = /^[0-9]+(\.?[0-9]{1,2})?$/
      if (!value) {
        return callback(new Error('项目金额不能为空'));
      }
      if (reg.test(value)) {
        if (Number(value) >= 100000000) {
          return callback(new Error('项目金额不能到亿'));
        } else {
          callback();
        }
      } else {
        return callback(new Error('金额只能为数字且小数点后保留两位'));
      }
    }
    return {
      urlList: [{
        name: '项目管理',
        router: '/CustomerManagement/MyCustomer'
      }, {
        name: '修改项目',
        router: ''
      }],
      Id: '',
      projectId: '', // 添加招聘需求需要的项目ID,在编辑界面时和Id一样
      isupdate: true,
      RiskScaleShow: false,
      projectform: {
        Advance: 1,
        InvoiceType: 0,
        NeedBond: 0,
        Tender: '',
        RiskScale: '',
        Owner:'',
        Outsource: {
          AreaId: ''
        }, // 业务信息
        Contacts: [],
        Assist: 0,
        Recruit: ''
      },
      isrecruit: false,
      recruitform: {
        AreaId: ''
      },

      OrgId: [], // 选择的分公司
      orgList: [{
        Name: '百色分公司',
        Id: 147,
      }, {
        Name: '桂林分公司',
        Id: 160,
      }, {
        Name: '玉林分公司',
        Id: 157,
      }, {
        Name: '贵港分公司',
        Id: 156,
      }, {
        Name: '钦州分公司',
        Id: 145,
      }, {
        Name: '北海分公司',
        Id: 146,
      }, {
        Name: '梧州分公司',
        Id: 151,
      }, {
        Name: '贺州分公司',
        Id: 150,
      }, {
        Name: '东兴分公司',
        Id: 141,
      }, {
        Name: '河池分公司',
        Id: 143,
      }, {
        Name: '贵州分公司',
        Id: 62,
      },{
        Name: '兴黔锦绣',
        Id: 258,
      }], // 分公司列表

      // 客户公司地址
      customprovince: '',
      customprovincelist: [],
      customcity: '',
      customcitylist: [],
      customarealist: [],

      // 上岗地址
      postprovince: [],
      postprovincelist: [],
      postcity: [],
      postcitylist: [],
      postarealist: [],

      province: '',
      provincelist: [],
      city: '',
      citylist: [],
      arealist: [],

      options: [],

      Companylist: [], // 相关客户
      Insuredlist: [], // 参保险种
      ProjectBusinesslist: [], // 项目类型
      Ownerlist: [], // 负责人
      SiTypeEnumlist: [], // 参保情况列表
      UndertakerEnumlist: [], // 风险承担列表
      MgrFeeEnumlist: [], // 人均管理费列表
      Yearthlist: [], // 协议执行年度列表
      Marketlist: [], // 营销模式列表
      EnumNaturelist: [], // 单位类型
      getIndustrtList: [], // 行业分类列表
      Developmentlist: [],//分发方式列表
      // postlist: [{}], // 业务信息
      // 树状图对应数据
      normalizer (node) {
        return {
          id: node.Id,
          label: node.ClassName,
          children: node.children
        }
      },
      // 联系人列表
      linknamedata: {},
      linkisupdate: false, // 是否编辑
      linknameIndex: 0, // 第几个联系人
      postnametitle: '添加联系人',
      linknameVisible: false,

      // 沟通记录
      recordlist: [],
      useroptions: [], // 沟通人
      recordoptions: [], // 沟通阶段
      recorddata: {}, // 沟通表单
      communicatetitle: '添加沟通记录', // 弹框标题
      showAddCommunication: false, // 是否打开沟通记录弹框
      AddCommunication: null, // 沟通记录内容

      // 招聘信息
      Recruitlist: [], // 招聘列表

      fileloading: false,
      filterlist: [],

      recruitmenttitle: '添加招聘',
      recruitmentvisible: false,
      recruitmentdata: {},

      rules: {
        Name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        Account: [
          { required: true, validator: checkMoney, trigger: 'blur' }
        ],
        BusinessType: [
          { required: true, message: '请选择项目业务类型', trigger: 'change' },
        ],
        CompanyId: [
          { required: true, message: '请选择所属客户', trigger: 'change' },
        ],
        Advance: [
          { required: true, message: '请选择是否垫资', trigger: 'change' },
        ],
        Tender: [
          { required: true, message: '请选择是否需要招投标', trigger: 'blur' },
        ],
        Recruit: [
          { required: true, message: '请选择是否需招聘', trigger: 'blur' },
        ],
        MgrFee: [
          { required: true, message: '请输入人均管理费', trigger: 'blur' },
        ],
        SiType: [
          { required: true, message: '请选择参保情况', trigger: 'change' },
        ],
        Undertaker: [
          { required: true, message: '请选择风险承担方', trigger: 'change' },
        ]
      },
      Addrules: {
        // MgrPrice: [
        //   { required: true, message: '请输入管理费单价', trigger: 'blur' }
        // ]
      },
      operating: {}, // 操作码
    }
  },
  watch: {
    // 客户省变化
    customprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.customcitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.customcitylist.find(v => {
              return v.Id == this.customcity
            })
            if (isclear) {
            } else {
              this.customcity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.customcity = ''
        this.projectform.Outsource.AreaId = ''
        this.customcitylist = []
        this.customarealist = []
      }
    },
    // 客户市变化
    customcity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.customarealist = response.Data
            let isclear = this.customarealist.find(v => {
              return v.Id == this.projectform.Outsource.AreaId
            })
            if (isclear) {
            } else {
              this.projectform.Outsource.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.customarealist = []
        this.projectform.Outsource.AreaId = ''
      }
    },
    // 客户反推
    "projectform.Outsource.AreaId" (newvalue, oldvalue) {
      const str = this.customarealist.find(v => {
        return v.Id == newvalue
      })
      if (!str && !!newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var select = response.Data.filter(v => {
              return v.isselect
            })
            if (select.find(v => v.Level == 1) !== undefined) {
              this.customprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.customcity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.projectform.Outsource.AreaId = select.find(v => v.Level == 3).Id
            } else {
              this.projectform.Outsource.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    // 深度监听
    // postprovince: {
    //   handler(newvalue, oldvalue) {
    //     console.log(newvalue);

    //     // 判断数组长度等于数据长度的时候再处理数据
    //     if (newvalue.length == this.Recruitlist.length) {
    //       for (let i = 0; i < newvalue.length; i++) {
    //         if (newvalue[i]) {
    //           let obj = {
    //             AreaId: '',
    //             ParentId: newvalue[i]
    //           }
    //           GetAreaList(qs.stringify(obj)).then(response => {
    //             if (response.IsSuccess) {
    //                 // this.postcitylist[i] = response.Data
    //                 this.postcitylist.splice(i, 1, response.Data)
    //                 console.log(response.Data);

    //                 // 判断如果下拉里面没有这个Id就清空子集选项
    //                 let isclear = this.postcitylist[i].find(v => {
    //                   return v.Id == this.postcity[i]
    //                 })
    //                 if (isclear) {
    //                 } else {
    //                   this.postcity[i] = ''
    //                 }
    //             } else {
    //                 this.$message({
    //                   message: response.MessageContent,
    //                   type: 'error'
    //                 })
    //             }
    //           })
    //         } else {
    //           this.postcity[i] = ''
    //           this.Recruitlist[i].AreaId = ''
    //           this.postcitylist[i] = []
    //           this.postarealist[i] = []
    //         }
    //       }
    //     }
    //   },
    //   deep:true
    // },
    // postcity: {


    //   handler(newvalue, oldvalue) {
    //     console.log(newvalue);
    //     if (newvalue.length == this.Recruitlist.length) {
    //       for (let i = 0; i < newvalue.length; i++) {
    //         if (newvalue[i]) {
    //           let obj = {
    //             AreaId: '',
    //             ParentId: newvalue[i]
    //           }
    //           GetAreaList(qs.stringify(obj)).then(response => {
    //             if (response.IsSuccess) {
    //               // this.postarealist[i] = response.Data
    //               this.postarealist.splice(i, 1, response.Data)
    //               let isclear = this.postarealist[i].find(v => {
    //                 return v.Id == this.Recruitlist[i].AreaId
    //               })
    //               if (isclear) {
    //               } else {
    //                 this.Recruitlist[i].AreaId = ''
    //               }
    //             } else {
    //               this.$message({
    //                 message: response.MessageContent,
    //                 type: 'error'
    //               })
    //             }
    //           })
    //         } else {
    //           this.postarealist[i] = []
    //           this.Recruitlist[i].AreaId = ''
    //         }
    //       }
    //     }
    //   },
    //   deep: true
    // },
    // Recruitlist: {
    //   async handler(newvalue, oldvalue) {
    //     var that = this
    //     for (let i = 0; i < newvalue.length; i++) {
    //       setTimeout(test,1000,i)
    //       function test(i) {
    //         let str = that.postarealist[i].find(v => {
    //           return v.Id == newvalue[i].AreaId
    //         })
    //         if (!str && !!newvalue[i].AreaId) {
    //           let obj = {
    //             AreaId: newvalue[i].AreaId
    //           }
    //           GetAreaList(qs.stringify(obj)).then(response => {
    //             if (response.IsSuccess) {
    //               var select = response.Data.filter(v => {
    //                 return v.isselect
    //               })
    //               if (select.find(v => v.Level == 1) !== undefined) {
    //                 that.postprovince.splice(i, 1, select.find(v => v.Level == 1).Id)
    //               }
    //               if (select.find(v => v.Level == 2) !== undefined) {
    //                 that.postcity.splice(i, 1, select.find(v => v.Level == 2).Id)
    //               }
    //               if (select.find(v => v.Level == 3) !== undefined) {
    //                 that.Recruitlist[i].AreaId = select.find(v => v.Level == 3).Id
    //                 // that.$set(that.Recruitlist[i], 'AreaId', select.find(v => v.Level == 3).Id)
    //               } else {
    //                 that.Recruitlist[i].AreaId = ''
    //               }
    //             } else {
    //               that.$message({
    //                 message: response.MessageContent,
    //                 type: 'error'
    //               })
    //             }
    //           })
    //         }
    //       }
    //       // 未能解决请求过快的而出现undefined
    //       // let str = this.postarealist[i].find(v => {
    //       //   return v.Id == newvalue[i].AreaId
    //       // })
    //       // console.log(newvalue);

    //       // if (!str && !!newvalue[i].AreaId) {
    //       //   let obj = {
    //       //     AreaId: newvalue[i].AreaId
    //       //   }
    //       //   GetAreaList(qs.stringify(obj)).then(response => {
    //       //     if (response.IsSuccess) {
    //       //       var select = response.Data.filter(v => {
    //       //         return v.isselect
    //       //       })
    //       //       if (select.find(v => v.Level == 1) !== undefined) {
    //       //         this.postprovince.splice(i, 1, select.find(v => v.Level == 1).Id)
    //       //       }
    //       //       if (select.find(v => v.Level == 2) !== undefined) {
    //       //         this.postcity.splice(i, 1, select.find(v => v.Level == 2).Id)
    //       //       }
    //       //       if (select.find(v => v.Level == 3) !== undefined) {
    //       //         this.Recruitlist[i].AreaId = select.find(v => v.Level == 3).Id
    //       //         // this.$set(this.Recruitlist[i], 'AreaId', select.find(v => v.Level == 3).Id)
    //       //       } else {
    //       //         this.Recruitlist[i].AreaId = ''
    //       //       }
    //       //       console.log(this.postprovince[i]);
    //       //       console.log(this.postcity[i]);

    //       //     } else {
    //       //       this.$message({
    //       //         message: response.MessageContent,
    //       //         type: 'error'
    //       //       })
    //       //     }
    //       //   })
    //       // }
    //     }
    //   },
    //   deep: true
    // }
  },
  created () {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    this.Id = this.$route.query.Id
    this.getAreaList()
    // 获取面包屑
    let breadpath = JSON.parse(window.localStorage.getItem('breadpath')) || {}
    if (breadpath.router) {
      this.urlList[0] = breadpath
    }
    // 判断是添加还是修改
    if (this.Id) {
      // 修改
      this.isupdate = true
      this.projectId = this.Id
      this.getProject()
      this.getProjectFollowList()
      this.getProjectProgressEnum()
    } else {
      // 添加
      this.isupdate = false
      this.OwnerMethod('')
    }
    if (this.$route.query.IsCheck) {
      this.Addrules = {
        MgrPrice: [
          { required: true, message: '请输入管理费单价', trigger: 'blur' }
        ],
        FirstSign: [
          { required: true, message: '请选择首次签订协议时间', trigger: 'change' }
        ],
        Yearth: [
          { required: true, message: '请选择协议执行年度', trigger: 'change' }
        ],
        PositionName: [
          { required: true, message: '请输入岗位', trigger: 'blur' }
        ],
        MarketType: [
          { required: true, message: '请选择营销模式', trigger: 'change' }
        ],
        FirstMonthIncome: [
          { required: true, message: '请输入首月收入', trigger: 'blur' }
        ],
        FirstMonthNum: [
          { required: true, message: '请输入首月人数', trigger: 'blur' }
        ],
        FirstMonthMgrFee: [
          { required: true, message: '请输入首月管理费', trigger: 'blur' }
        ]
      }
    }
    // this.companyMethod('')
    this.getProjectBusinessType('')
    this.getIndustryList()
    this.getCatagoryList()
    this.getProjectMgrFeeEnum()
    this.getProjectSiTypeEnum()
    this.getProjectUndertakerEnum()
    this.getYearthEnum()
    this.getMarketTypeEnum()
    this.companyEnumNature()
    this.GetDevelopmentFormEnum()
  },
  // mounted () {
  //   if (this.$route.query.IsCheck) {
  //     this.$refs.projectform.validateField(['MgrPrice', 'FirstSign', 'Yearth', 'PositionName', 'MarketType', 'FirstMonthIncome', 'FirstMonthNum', 'FirstMonthMgrFee'])
  //   }
  // },
  methods: {
    // 获取单位类型
    companyEnumNature () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      CompanyEnumNature(qs.stringify(obj)).then(response => {
        if (response) {
          this.EnumNaturelist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //选择单位类型
    selectNature (e) {
      console.log(e)
      if (e) {
        this.linknamedata.NatureText = this.EnumNaturelist[this.EnumNaturelist.findIndex(item => item.value == e)].describe
      } else {
        this.linknamedata.NatureText = ''
      }

    },
    // 选择所属行业 vue-tree-select 事件
    selectIndustryId (e) {
      this.linknamedata.IndustryName = e.ClassName
      console.log(e, this.linknamedata)
    },
    //选择业务类型分类风险金比例
    RiskFeeType1 (e) {
      if (this.Recruitlist && this.Recruitlist.length) {

      } else {
        if (e == 1 || e == 2 || e == 3 || e == 4 || e == 5) {
          this.getProjectRecruit()
        }
      }
      if (this.projectform.BusinessType == 1) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '1' && this.projectform.Undertaker == '0' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '2' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 4
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '1') {
          this.projectform.RiskScale = 6
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '2') {
          this.projectform.RiskScale = 5
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 2 || this.projectform.BusinessType == 3 || this.projectform.BusinessType == 4) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '1' && this.projectform.Undertaker == '0' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '1') {
          this.projectform.RiskScale = 6
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '2') {
          this.projectform.RiskScale = 5
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '2' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 4
        } else if (this.projectform.SiType == '2' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 10
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 11) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '0' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 12) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '0' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else {
        this.RiskScaleShow = false
        this.projectform.RiskScale = ''
      }
    },
    //选择人均管理费分类风险金比例
    RiskFeeType2 (e) {
      if (this.projectform.BusinessType == 1) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '1' && this.projectform.Undertaker == '0' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '2' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 4
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '1') {
          this.projectform.RiskScale = 6
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '2') {
          this.projectform.RiskScale = 5
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 2 || this.projectform.BusinessType == 3 || this.projectform.BusinessType == 4) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '1' && this.projectform.Undertaker == '0' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '1') {
          this.projectform.RiskScale = 6
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '2') {
          this.projectform.RiskScale = 5
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '2' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 4
        } else if (this.projectform.SiType == '2' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 10
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 11) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '0' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 12) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '0' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else {
        this.RiskScaleShow = false
        this.projectform.RiskScale = ''
      }
    },
    //选择参保情况分类风险金比例
    RiskFeeType3 (e) {
      if (this.projectform.BusinessType == 1) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '1' && this.projectform.Undertaker == '0' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '2' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 4
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '1') {
          this.projectform.RiskScale = 6
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '2') {
          this.projectform.RiskScale = 5
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 2 || this.projectform.BusinessType == 3 || this.projectform.BusinessType == 4) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '1' && this.projectform.Undertaker == '0' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '1') {
          this.projectform.RiskScale = 6
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '2') {
          this.projectform.RiskScale = 5
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '2' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 4
        } else if (this.projectform.SiType == '2' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 10
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 11) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '0' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 12) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '0' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else {
        this.RiskScaleShow = false
        this.projectform.RiskScale = ''
      }
    },
    //选择风险承担方分类风险金比例
    RiskFeeType4 (e) {
      if (this.projectform.BusinessType == 1) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '1' && this.projectform.Undertaker == '0' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '2' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 4
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '1') {
          this.projectform.RiskScale = 6
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '2') {
          this.projectform.RiskScale = 5
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 2 || this.projectform.BusinessType == 3 || this.projectform.BusinessType == 4) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '1' && this.projectform.Undertaker == '0' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '1') {
          this.projectform.RiskScale = 6
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '2') {
          this.projectform.RiskScale = 5
        } else if (this.projectform.SiType == '1' && this.projectform.Undertaker == '2' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 4
        } else if (this.projectform.SiType == '2' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 10
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 11) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '0' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else if (this.projectform.BusinessType == 12) {
        this.RiskScaleShow = true
        if (this.projectform.SiType == '0' && this.projectform.Undertaker == '1' && this.projectform.MgrFee == '0') {
          this.projectform.RiskScale = 1
        } else {
          this.RiskScaleShow = false
          this.projectform.RiskScale = ''
        }
      } else {
        this.RiskScaleShow = false
        this.projectform.RiskScale = ''
      }
    },
    // 获取项目信息
    getProject () {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetProject(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          // 金额数字转字符串
          response.Data.Account = response.Data.Account + ''
          // 处理业务信息为null
          if (!response.Data.Outsource) {
            response.Data.Outsource = {
              AreaId: ''
            }
          } else {
            // 处理地址
            if (response.Data.Outsource.AreaId == 0) {
              response.Data.Outsource.AreaId = ''
            }
          }
          // 处理违约保证金
          if (response.Data.Bond) {
            response.Data.NeedBond = 1
          } else {
            response.Data.NeedBond = 0
          }
          // 处理联系人为null
          if (!response.Data.Contacts) {
            response.Data.Contacts = []
          }
          // 判断业务类型调用不同的详情数据, 选择劳务派遣、劳务外包、业务外包
          if (response.Data.BusinessType == 1 || response.Data.BusinessType == 2 || response.Data.BusinessType == 3) {
            this.isRecruit = false // 如果没有数据就全部不显示
            this.getProjectRecruit()
          } else if (response.Data.BusinessType == 4 || response.Data.BusinessType == 5) {
            this.isRecruit = true // 如果没有数据就显示
            this.getProjectRecruit()
          }
          // 处理分公司数据
          if (response.Data.Assists && response.Data.Assists.length) {
            this.OrgId = []
            for (let i = 0; i < response.Data.Assists.length; i++) {
              this.OrgId.push(response.Data.Assists[i].OrgId)
            }
          }
          // 处理参保险种
          if (response.Data.Outsource.Insurance) {
            response.Data.Outsource.Insurance = Number(response.Data.Outsource.Insurance)
          }
          // 处理附件
          this.filterlist = []
          if (response.Data.AttachUrl) {
            var arry = response.Data.AttachUrl.split(';')
            for (let i = 0; i < arry.length; i++) {
              var namelist = arry[i].split('.')
              this.filterlist.push({
                name: namelist[namelist.length - 1],
                Url: arry[i],
                visible: false
              })
            }
          }
          //处理风险金比例
          if (response.Data.RiskScale > 0) {
            this.RiskScaleShow = true
          }
          this.projectform = response.Data
          if (this.$route.query && this.$route.query.IsCheck) {
            let ArrCheck = []
            this.projectform.MgrPrice ? true : ArrCheck.push('MgrPrice')
            this.projectform.FirstSign ? true : ArrCheck.push('FirstSign')
            this.projectform.Yearth > '-1' ? true : ArrCheck.push('Yearth')
            this.projectform.PositionName ? true : ArrCheck.push('PositionName')
            this.projectform.MarketType > '-1' ? true : ArrCheck.push('MarketType')
            this.projectform.FirstMonthIncome ? true : ArrCheck.push('FirstMonthIncome')
            this.projectform.FirstMonthNum ? true : ArrCheck.push('FirstMonthNum')
            this.projectform.FirstMonthMgrFee ? true : ArrCheck.push('FirstMonthMgrFee')
            this.$refs.projectform.validateField(ArrCheck)
          }
          // 相关客户数据处理
          if (response.Data.CompanyId) {
            this.Companylist = [{
              Name: response.Data.CompanyName,
              Id: response.Data.CompanyId
            }]
          } else {
            this.companyMethod('')
          }
          // 业务负责人数组处理
          if (response.Data.Owner) {
            let obj1 = {
              Id: response.Data.Owner,
              menuid: MenuIdDate(),
              operationcode: '1'
            }
            GetSysUserById(qs.stringify(obj1)).then(res => {
              if (res.IsSuccess) {
                if (res.Data) {
                  this.Ownerlist = [{
                    Id: res.Data.Id,
                    UserName: res.Data.UserName
                  }]
                }
              } else {
                this.$message({
                  message: res.MessageContent,
                  type: 'error'
                })
              }
            })
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取招聘信息
    getProjectRecruit () {
      let obj = {
        ProjectId: this.projectId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectRecruit(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // 判断是否添加过招聘信息
            for (let i = 0; i < response.Data.length; i++) {
              // if (response.Data[i].TryTime) {
              //   // response.Data[i].TryTime = JSON.parse(response.Data[i].TryTime)
              //   response.Data[i].TryTime = response.Data[i].TryTime.split(',')
              // }
              if (response.Data[i].AreaId) {
                let obj = {
                  AreaId: response.Data[i].AreaId,
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                GetAreaList(qs.stringify(obj)).then(response => {
                  if (response.IsSuccess) {
                    var select = response.Data.filter(v => {
                      return v.isselect
                    })
                    if (select.find(v => v.Level == 1) !== undefined) {
                      // this.postprovinceName = select.find(v => v.Level == 1).Name
                      this.$set(this.Recruitlist[i], 'postprovinceName', select.find(v => v.Level == 1).Name)
                    }
                    if (select.find(v => v.Level == 2) !== undefined) {
                      // this.postcityName = select.find(v => v.Level == 2).Name
                      this.$set(this.Recruitlist[i], 'postcityName', select.find(v => v.Level == 2).Name)
                    }
                    if (select.find(v => v.Level == 3) !== undefined) {
                      // this.recruitform.AreaIdName = select.find(v => v.Level == 3).Name
                      this.$set(this.Recruitlist[i], 'AreaIdName', select.find(v => v.Level == 3).Name)
                    } else {
                      this.recruitform.AreaIdName = ''
                    }
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                })
              }
            }
            this.Recruitlist = response.Data
          } else {
            this.Recruitlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取沟通记录列表
    getProjectFollowList () {
      let obj = {
        ProjectId: this.Id,
        PageIndex: 1,
        PageSize: 9999,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectFollowList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.recordlist = response.Data
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取协议执行年度
    getYearthEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetYearthEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.Yearthlist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //获取开发方式
    GetDevelopmentFormEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetDevelopmentFormEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.Developmentlist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取营销模式
    getMarketTypeEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetMarketTypeEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.Marketlist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取相关客户
    companyMethod (value) {
      let obj = {
        Name: value,
        SysUserName: '',
        ContactName: '',
        StartDate: '',
        EndDate: '',
        Type: -1,
        PageIndex: 1,
        PageSize: 100,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.Companylist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取项目类型
    getProjectBusinessType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.ProjectBusinesslist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索获取负责人
    OwnerMethod (value) {
      let obj = {
        UserId: '',
        UserName: value,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      debounce(
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
           if(response.Data && response.Data.length > 0){
            this.Ownerlist = response.Data;
          }else{
            this.Ownerlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      }))
    },
    // 获取项目进度
    getProjectProgressEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectProgressEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.recordoptions = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取省地址列表
    getAreaList () {
      let obj = {
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetAreaList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.customprovincelist = response.Data
          // this.postprovincelist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取所属行业分类
    getIndustryList () {
      let obj = {
        ClassName: '',
        Status: 1,
        ClassType: 1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.getIndustrtList = response.Data
          this.upAndDown(this.getIndustrtList)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 删除数据的空children
    upAndDown (arr) {
      arr.forEach(obj => {
        if (obj.children.length <= 0) {
          delete obj.children
          return
        } else {
          this.upAndDown(obj.children)
        }
      })
    },
    // 获取参保险种
    getCatagoryList () {
      let obj = {
        ClassName: '',
        Status: 1,
        ClassType: 7,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.Insuredlist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取参保情况
    getProjectSiTypeEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectSiTypeEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.SiTypeEnumlist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取风险承担列表
    getProjectUndertakerEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectUndertakerEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.UndertakerEnumlist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取人均管理费列表
    getProjectMgrFeeEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectMgrFeeEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.MgrFeeEnumlist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 是否选择分公司服务
    chooseAssist (value) {
      this.OrgId = []
    },
    // 获取分公司
    orgMethod (value) {

    },

    // 添加招聘信息
    addRecruit () {
      this.recruitmenttitle = '添加招聘信息'
      this.recruitmentvisible = true
      this.recruitmentdata = {}
    },
    // 修改招聘信息
    editRecruit (e) {
      console.log(e);

      this.recruitmenttitle = '修改招聘信息'
      this.recruitmentdata = copy(e)
      this.recruitmentvisible = true
    },
    // 删除招聘信息
    deleteRecruit (e) {
      console.log(e);
      let obj = {
        Id: e.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      DeleteProjectRecruitStatus(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getProjectRecruit()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 关闭弹框
    closerecruitment () {
      this.recruitmentvisible = false
      this.recruitmentdata = {}
    },
    // 保存弹框
    saverecruitment (e) {
      console.log(e);
      if (e.Id) {
        // 修改
        let obj = e
        obj.menuid = MenuIdDate(),
          obj.operationcode = '1'
        EditdProjectRecruit(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.recruitmentvisible = false
            this.getProjectRecruit()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        // 添加
        let obj = e
        obj.ProjectId = this.projectId
        obj.menuid = MenuIdDate(),
          obj.operationcode = '1'
        AddProjectRecruit(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.recruitmentvisible = false
            this.getProjectRecruit()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },

    // 添加联系人
    addpost () {
      // 判断是添加页面还是修改页面
      if (this.isupdate) {
        // 修改页面
        this.linkisupdate = false
        this.linknameVisible = true
      } else {
        // 添加页面
        // 打开弹框,标记为添加弹框
        this.postnametitle = '添加联系人'
        this.linkisupdate = false
        this.linknameVisible = true
      }
    },
    // 修改联系人
    updatelinkname (e, i) {
      // 判断是添加页面还是修改页面
      if (this.isupdate) {
        // 修改页面
        let data = copy(e)
        this.linknamedata = {
          UserName: data.UserName,
          PositionName: data.PositionName,
          Tel: data.Tel,
          Remark: data.Remark,
          CompanyName: e.CompanyName,
          Nature: e.Nature,
          NatureText: e.NatureText,
          IndustryId: e.IndustryId,
          IndustryName: e.IndustryName,
          Addr: e.Addr
        }
        this.linknameIndex = i
        this.postnametitle = '编辑联系人'
        this.linkisupdate = true
        this.linknameVisible = true
      } else {
        // 添加页面
        let data = copy(e)
        this.linknamedata = {
          UserName: data.UserName,
          PositionName: data.PositionName,
          Tel: data.Tel,
          Remark: data.Remark,
          CompanyName: e.CompanyName,
          Nature: e.Nature,
          NatureText: e.NatureText,
          IndustryId: e.IndustryId,
          IndustryName: e.IndustryName,
          Addr: e.Addr
        }
        this.linknameIndex = i
        this.linkisupdate = true
        this.linknameVisible = true
      }

    },
    deletepost (e, i) {
      this.projectform.Contacts.splice(i, 1)
    },
    // 保存弹框
    linknamesave (e) {
      // 判断是添加还是编辑
      if (this.linkisupdate) {
        // 编辑
        this.projectform.Contacts.splice(this.linknameIndex, 1, e)
        this.linknameVisible = false
      } else {
        this.projectform.Contacts.push({
          UserName: e.UserName,
          PositionName: e.PositionName,
          Tel: e.Tel,
          Remark: e.Remark
        })
        this.linknameVisible = false
      }
    },

    // 数据长度限制
    needboodblur (value) {
      if (value && Number(value) > 100000000) {
        this.$message({
          message: '履约保证金最大值不能超过1亿',
          type: 'warning'
        })
        this.projectform.Bond = ''
      }
    },
    FirstMonthIncomeblur (value) {
      if (value && Number(value) > 1000000) {
        this.$message({
          message: '首月收入最大值不能超过100万',
          type: 'warning'
        })
        this.projectform.FirstMonthIncome = ''
      }
    },
    FirstMonthMgrFeeblur (value) {
      if (value && Number(value) > 1000000) {
        this.$message({
          message: '首月管理费最大值不能超过100万',
          type: 'warning'
        })
        this.projectform.FirstMonthMgrFee = ''
      }
    },

    // 沟通记录
    addrecord () {
      this.showAddCommunication = true
      this.AddCommunication = {}
    },
    // 编辑沟通记录
    updaterecord (e) {
      console.log(e);
      this.showAddCommunication = true
      this.AddCommunication = copy(e)
    },
    // // 删除沟通记录
    // deleterecord() {

    // },
    // 关闭沟通记录弹框
    closeAddCommunication () {
      this.showAddCommunication = false
    },
    // 保存沟通记录
    ContractSave (e) {
      console.log(e);

      if (e.Id) {
        // 修改
        let obj = {
          Id: e.Id,
          SysUserId: e.SysUserId,
          // ProjectId: e.ProjectId,
          Content: e.Content,
          FollowTime: e.FollowTime,
          Progress: e.Progress,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EditdProjectFollow(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.showAddCommunication = false
            this.getProjectFollowList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        // 添加
        let obj = {
          SysUserId: e.SysUserId,
          ProjectId: this.Id,
          Content: e.Content,
          FollowTime: e.FollowTime,
          Progress: e.Progress,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        AddProjectFollow(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.showAddCommunication = false
            this.getProjectFollowList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },

    // 关闭弹框
    closedialog () {
      this.linknamedata = {
        UserName: '',
        PositionName: '',
        Tel: '',
        menuid: MenuIdDate(),
        operationcode: '1'
      }
    },
    // 添加招聘需求
    addProjectRecruit (message) {
      let obj = this.recruitform
      // 处理上岗地址
      obj.AreaId = this.recruitform.AreaId || this.postcity || this.postprovince
      // obj.TryTime = JSON.stringify(obj.TryTime)
      // obj.TryTime = this.recruitform.TryTime.join(',')
      obj.ProjectId = this.projectId
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      AddProjectRecruit(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: message,
            type: 'success'
          })
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 编辑招聘需求
    editdProjectRecruit (message) {
      let obj = this.recruitform
      obj.AreaId = this.recruitform.AreaId || this.postcity || this.postprovince
      // obj.TryTime = JSON.stringify(this.recruitform.TryTime)
      // obj.TryTime = this.recruitform.TryTime.join(',')
      obj.ProjectId = this.projectId
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      EditdProjectRecruit(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: message,
            type: 'success'
          })
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 提交 废弃
    onSubmit () {
      this.$refs.projectform.validate((v, object) => {
        if (v) {
          let obj = this.projectform
          // 处理客户公司地址
          if (this.projectform.BusinessType == 1 || this.projectform.BusinessType == 2 || this.projectform.BusinessType == 3) {
            obj.Outsource.AreaId = this.projectform.Outsource.AreaId || this.customcity || this.customprovince
          }
          // 附件上传处理AttachUrl
          var fils = this.filterlist.map(v => {
            return v.Url
          })
          obj.AttachUrl = fils.join(';')
          console.log(obj);
          // 判断联系人是否为空
          obj.menuid = this.operating.MenuId
          obj.operationcode = this.operating.OperationCode
          // return
          AddProject(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.projectId = response.Data
              if (this.projectform.BusinessType == 4 || this.projectform.BusinessType == 5) {
                let message = '添加成功'
                // 添加招聘信息
                this.addProjectRecruit(message)
              } else {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.go(-1)
              }
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          for (const i in object) {
            this.$refs[i].$el.scrollIntoView({　　// 滚动到指定节点
              block: 'center',　　　　　// 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: 'smooth'　　　　// 值有auto、instant,smooth，缓动动画（当前是慢速的）
            })
            break
          }
        }
      })
    },
    // 修改
    updateform () {
      this.$refs.projectform.validate((v, object) => {
        if (v) {
          let obj = this.projectform
          // 处理客户公司地址
          console.log(this.projectform.Outsource);

          if (this.projectform.BusinessType == 1 || this.projectform.BusinessType == 2 || this.projectform.BusinessType == 3) {
            obj.Outsource.AreaId = this.projectform.Outsource.AreaId || this.customcity || this.customprovince
          }
          // 处理履约保证金
          if (this.projectform.NeedBond === 0) {
            obj.Bond = ''
          } else {
            obj.Bond = this.projectform.Bond
          }
          // 处理分公司数据
          if (this.OrgId && this.OrgId.length) {
            obj.OrgId = this.OrgId.join(',')
          }
          // 附件上传处理AttachUrl
          var fils = this.filterlist.map(v => {
            return v.Url
          })
          obj.AttachUrl = fils.join(';')
          console.log(JSON.stringify(obj));
          obj.Id = this.Id
          obj.menuid = this.operating.MenuId
          obj.operationcode = this.operating.OperationCode
          EditdProject(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              // if (this.projectform.BusinessType == 4 || this.projectform.BusinessType == 5) {
              //   // 编辑还是添加接口
              //   if (this.isrecruit) {
              //     let message = '修改成功'
              //     this.editdProjectRecruit(message)
              //   } else {
              //     let message = '修改成功'
              //     this.addProjectRecruit(message)
              //   }
              // } else {
              //   this.$message({
              //     message: '修改成功',
              //     type: 'success'
              //   })
              // }
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.go(-1)
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          for (const i in object) {
            this.$refs[i].$el.scrollIntoView({　　// 滚动到指定节点
              block: 'center',　　　　　// 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: 'smooth'　　　　// 值有auto、instant,smooth，缓动动画（当前是慢速的）
            })
            break
          }
        }
      })
    },
    // 上传文件
    uploadfile (e, index) {
      var uploader
      this.fileloading = true
      const files = e.target.files[0]
      var path = process.env.VUE_APP_BASE_API_UPLOAD
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext !== 'doc' && ext !== 'docx' && ext !== 'pdf' && ext !== 'png' && ext !== 'jpg' && ext !== 'xls' && ext !== 'xlsx') {
          this.$message({
            message: '不支持该格式',
            type: 'warning'
          })
          this.fileloading = false
          e.target.value = []
          return false
        }
        if (files.size > (50 * 1024 * 1024)) {
          this.$message({
            message: '文件大小超过最大限制',
            type: 'warning'
          })
          this.fileloading = false
          return
        }
        if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'xls' || ext == 'xlsx') {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              const obj = {
                'name': ext.toUpperCase(),
                'Url': uploader.urlResult.VideoUrl,
                'visible': false
              }
              if (index == undefined) {
                this.filterlist.push(obj)
              } else {
                this.filterlist.splice(index, 1, obj)
              }
            }
            this.fileloading = false
            this.$refs.upload.value = null
          })
        } else {
          // 图片上传
          console.log('上传图片');
          let datas = new FormData();
          datas.append('file', files)
          datas.append('message', "{ImageStreamName:'file',BussinessType:0}");
          axios.post(path, datas)
            .then(res => {
              if (res.data.State) {
                const obj1 = {
                  'name': ext.toUpperCase(),
                  'Url': res.data.ImageUrl,
                  'visible': false
                }
                if (index == undefined) {
                  this.filterlist.push(obj1)
                } else {
                  this.filterlist.splice(index, 1, obj1)
                }
              }
              this.fileloading = false
            }).catch(() => {
              this.fileloading = false
            })
        }
      } else {
        this.fileloading = false
      }
    },
    deletefile (index) {
      this.filterlist.splice(index, 1)
    }
  },
}
</script>

<style lang="scss">
.add-project-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .projectform {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
    .form-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      > span {
        flex: 1;
      }
      > .operate {
        font-size: $f14;
        color: $erpplaceholder;
        width: 11%;
        text-align: right;
        .svg-icon {
          margin-right: 8px;
          font-size: $f16;
          &.add {
            color: #fff;
          }
        }
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 16px;
        background-color: $erpcolor;
      }
    }
    // 表格样式
    .el-form-item {
      margin-bottom: 24px;
      .el-form-item__label {
        line-height: 14px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding-bottom: 8px;
      }
      .el-form-item__content {
        // max-width: 336px;
        // width: calc(100% - 64px);
        width: 100%;
        .el-input__inner {
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
        }
        .el-date-editor {
          width: 100%;
          span {
            width: 8%;
          }
          .el-range-input {
            background-color: #f0f4fa;
          }
        }
      }
      // 地址样式
      &.path {
        .el-form-item__content {
          max-width: 100%;
          .el-select {
            max-width: 240px;
            margin-right: 24px;
            margin-bottom: 24px;
          }
          .el-input {
            max-width: 336px;
            &.input {
              max-width: 240px;
              margin-right: 24px;
              margin-bottom: 24px;
            }
          }
        }
      }
      // 文本框样式
      &.text {
        .el-form-item__content {
          max-width: 100%;
          .el-textarea__inner {
            background-color: $erinputbgc;
          }
          .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
      }
      &.text2 {
        .el-form-item__content {
          .el-textarea__inner {
            background-color: $erinputbgc;
          }
          .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
      }
      // 两个时间
      &.dategroup {
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .el-date-editor {
            width: 100%;
            display: inline-block;
          }
        }
      }
      // 时间选择器样式
      &.datetime {
        .el-form-item__content {
          .el-date-editor {
            width: 100%;
          }
        }
      }
      &.double {
        .el-form-item__content {
          height: 40px;
          display: flex;
          align-items: center;
          .el-radio-group {
            flex: 1;
          }
          .el-input {
            flex: 1;
          }
        }
      }
      // vue-tree-input样式
      &.vue-tree {
        .el-form-item__content {
          .vue-treeselect {
            // min-height: 40px;
            height: 40px;
            .vue-treeselect__control {
              height: 40px;
              background-color: $erinputbgc;
              .vue-treeselect__value-container {
                height: 40px;
              }
              .vue-treeselect__control-arrow-container {
                height: 40px;
              }
            }
          }
        }
      }
      // 添加客户关联关系样式
      &.addrelation {
        .el-form-item__content {
          > span {
            cursor: pointer;
            > .svg-icon {
              margin-right: 10px;
            }
          }
        }
      }
    }
    // 循环的样式
    .form-cont {
      padding-bottom: 16px;
      margin-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      &:last-child {
        // border-bottom: none;
      }
      .post-list {
        position: relative;
        margin-bottom: 40px;
        padding-bottom: 16px;
        border-bottom: 1px solid $erpBK;
        // 最后一个添加联系人样式
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
          .operate-btn {
            bottom: 24px;
          }
        }
        // 底部操作按钮
        .operate-btn {
          // position: absolute;
          // right: 0;
          // bottom: 0px;
          justify-content: flex-end;
          display: flex;
        }
        .btn {
          cursor: pointer;
          margin-left: 64px;
          font-size: $f14;
          color: $erpplaceholder;
          .svg-icon {
            margin-right: 8px;
            font-size: $f16;
            &.add {
              color: #fff;
            }
          }
        }
        // 顶部编辑按钮
        .operate-top {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    // 附件上传样式
    .file-cont {
      display: flex;
      flex-wrap: wrap;
      .img-box-list {
        width: 160px;
        height: 120px;
        position: relative;
        margin-bottom: 40px;
        > input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 10;
          cursor: pointer;
        }
        > .img-box {
          width: 100%;
          height: 100%;
          position: absolute;
          background-color: #f0f4fa;
          border-radius: 8px;
          > .filetype {
            display: inline-block;
            background-color: $erpcolor;
            padding: 10px 12px;
            font-size: $f14;
            line-height: 14px;
            color: #fff;
            border-radius: 8px;
          }
          > .filename {
            font-size: $f14;
            color: $erp666;
            height: 40px;
            width: 110px;
            margin: 12px 24px 0 24px;
            letter-spacing: 0;
            word-break: break-all;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2; /*要显示的行数*/
            -webkit-box-orient: vertical;
          }
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        > .img-box-hover {
          position: absolute;
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 1);
          opacity: 0.4;
          bottom: 0;
          display: flex;
          justify-content: center;
          border-radius: 0 0 8px 8px;
          .btn {
            position: relative;
            cursor: pointer;
            line-height: 30px;
            > input {
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              cursor: pointer;
            }
            .svg-icon {
              font-size: $f14;
              color: #fff;
              margin-right: 4px;
            }
            > span {
              font-size: $f14;
              color: #fff;
              vertical-align: middle;
              padding-left: 4px;
            }
          }
          .btn + .btn {
            margin-left: 24px;
          }
        }
      }
      .img-box-list + .img-box-list {
        margin-left: 24px;
      }
    }
    .tip {
      font-size: $f14;
      color: $erp999;
      margin-bottom: 16px;
    }
  }
  // 底部添加按钮
  .bottom {
    position: fixed;
    box-shadow: 0px 0px 20px 0px rgba(21, 136, 248, 0.1);
    bottom: 0;
    right: 0;
    margin-bottom: 0;
    text-align: center;
    width: calc(100% - 224px);
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    z-index: 999;
    .el-button + .el-button {
      margin-left: 24px;
    }
  }
}
.textInput {
  .el-form-item__content {
    height: 100% !important;
  }
}
</style>