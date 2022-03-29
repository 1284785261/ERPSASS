<!-- 结算单 -->
<template>
  <div class="final-statement-container">
    <div class="search-bar clearfix">
      <div class="condition" v-show="tabidx === 0">
        <div class="search-name">客户单位</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入客户单位进行查询"
          size="small"
          v-model="searchform.CompanyName"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx === 0">
        <div class="search-name">就职项目</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入就职项目进行查询"
          size="small"
          v-model="searchform.ProjectName"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx === 0">
        <div class="search-name">入账年月</div>
        <el-date-picker
          v-model="month"
          class="erpsearchinput"
          size="small"
          type="month"
          placeholder="选择入账年月"
        ></el-date-picker>
      </div>
      <div class="condition" v-show="tabidx === 1">
        <div class="search-name">所属项目</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入就职项目进行查询"
          size="small"
          v-model="searchform.ProjectName"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx === 1">
        <div class="search-name">企业社保账号</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入企业社保账号查询"
          size="small"
          v-model="searchform.Account"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx === 2">
        <div class="search-name">所属项目</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入就职项目进行查询"
          size="small"
          v-model="searchform.ProjectName"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx === 2">
        <div class="search-name">企业公积金账号</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入企业社保账号查询"
          size="small"
          v-model="searchform.Account"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx === 3">
        <div class="search-name">所属项目</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入就职项目进行查询"
          size="small"
          v-model="searchform.ProjectName"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx === 3">
        <div class="search-name">企业医保账号</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入企业医保账号查询"
          size="small"
          v-model="searchform.Account"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx != 4">
        <div class="search-name">结算维度</div>
        <el-select
          v-model="searchform.Type"
          class="selet erpselect"
          size="small"
          clearable
          placeholder="请选择结算维度"
        >
          <el-option
            v-for="item in dimensionDate"
            :key="item.value"
            :label="item.describe"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="condition" v-show="tabidx == 4">
        <div class="search-name">结算单编号</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入项目名称查询"
          size="small"
          v-model="searchform.SettlementSheetNo"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx == 4">
        <div class="search-name">所属客户</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入所属客户查询"
          size="small"
          v-model="searchform.CompanyId"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx == 4">
        <div class="search-name">所属项目</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入项目名称查询"
          size="small"
          v-model="searchform.ProjectId"
          @keyup.enter.native="searchtable"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchtable"
          />
        </el-input>
      </div>
      <div class="condition" v-show="tabidx == 4">
        <div class="search-name">项目类型</div>
        <el-select
          v-model="searchform.ProjectType"
          class="selet erpselect"
          size="small"
          clearable
          placeholder="请选择项目类型"
        >
          <el-option
            v-for="item in ProjectTypeList"
            :key="item.value"
            :label="item.describe"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="condition" v-show="tabidx == 4">
        <div class="search-name">付款状态</div>
        <el-select
          v-model="searchform.PaymentStatus"
          class="selet erpselect"
          size="small"
          clearable
          placeholder="请选择付款状态"
        >
          <el-option
            v-for="item in PaymentStatusList"
            :key="item.value"
            :label="item.describe"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="condition" v-show="tabidx == 4">
        <div class="search-name">所属年月</div>
        <el-date-picker
          v-model="searchform.YearMonth"
          value-format="yyyy-MM"
          class="erpsearchinput"
          size="small"
          type="month"
          placeholder="选择所属年月"
        ></el-date-picker>
      </div>
      <!-- <div class="condition" v-show="tabidx===3">
        <div class="search-name">入账年月</div>
        <el-date-picker v-model="month" class="erpsearchinput" size="small" type="month" placeholder="选择入账年月"></el-date-picker>
      </div> -->
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable"
          >查询</el-button
        >
      </div>
    </div>
    <div class="tab2 clearfix">
      <div
        class="tab-name"
        :class="{ active: tabidx == item.value }"
        @click="choosetab(item)"
        v-for="(item, index) in tablist"
        :key="index"
      >
        {{ item.describe }}
      </div>
    </div>
    <div class="final-content">
      <!-- 工资结算单列表 -->
      <el-table
        ref="finalTable"
        v-if="tabidx === 0"
        key="0"
        v-loading="tableloading"
        :data="tableData"
        class="erp-table"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          min-width="55"
          fixed
          label="全选"
        />
        <el-table-column
          align="center"
          prop="Code"
          label="工资结算单编号"
          min-width="150"
        />
        <el-table-column
          align="center"
          prop="Title"
          label="结算单名称"
          min-width="150"
        >
          <template slot-scope="scope">
            <span
              class="watchcode"
              v-if="scope.row.Title"
              @click="watchcustom(scope.row, 'InitiatePaymentRequest')"
              >{{ scope.row.Title }}</span
            >
            <span class="watchcode" v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="CompanyName"
          label="所属客户"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="ProjectName"
          label="所属项目"
          min-width="150"
          show-overflow-tooltip
        />
         <!-- <el-table-column
          align="center"
          prop=""
          label="项目类型"
          min-width="150"
          show-overflow-tooltip
        /> -->
        <el-table-column
          align="center"
          prop="SalaryYear"
          label="所属年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.SalaryYear"
              >{{ scope.row.SalaryYear }}年{{ scope.row.SalaryMonth }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="PeriodYear"
          label="入账年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.PeriodYear"
              >{{ scope.row.PeriodYear }}年{{ scope.row.PeriodMonth }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="StatusText" label="付款状态" />
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-dropdown
              trigger="click"
              v-if="$operatebtns(operates, ['Delete'])"
            >
              <span class="el-dropdown-link" title="编辑">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <!-- <el-dropdown-item v-if="$operatebtn(operates, 'InitiatePaymentRequest')" @click.native="wagepaymentapplication(scope.row,'InitiatePaymentRequest')">发起工资付款申请</el-dropdown-item> -->
                  <!-- <el-dropdown-item v-if="scope.row.Status===0" @click.native="submitinvoice(scope.row,'Modify')">提交审核</el-dropdown-item> -->
                  <!-- <el-dropdown-item @click.native="amend(scope.row,'SetRights')">修改</el-dropdown-item> -->
                  <el-dropdown-item
                    v-if="
                      scope.row.Status === 0 && $operatebtn(operates, 'Delete')
                    "
                    @click.native="cancellation(scope.row, 'Delete')"
                    >删除</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 社保结算单列表 -->
      <el-table
        ref="finalTable"
        v-if="tabidx === 1"
        key="1"
        v-loading="tableloading"
        :data="tableData"
        class="erp-table"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          min-width="55"
          fixed
          label="全选"
        />
         <el-table-column
          align="center"
          prop="Code"
          label="社保结算单编号"
          min-width="150"
        />
        <el-table-column
          align="center"
          prop="Title"
          label="结算单名称"
          min-width="150"
        >
          <template slot-scope="scope">
            <span
              class="watchcode"
              v-if="scope.row.Title"
              @click="watchcustom(scope.row, 'View')"
              >{{ scope.row.Title }}</span
            >
            <span class="watchcode" v-else>--</span>
          </template>
        </el-table-column>
         <!-- <el-table-column
          align="center"
          prop=""
          label="结算单类型"
          min-width="150"
          show-overflow-tooltip
        /> -->
         <el-table-column
          align="center"
          prop="CompanyName"
          label="所属客户"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="ProjectName"
          label="所属项目"
          min-width="150"
          show-overflow-tooltip
        />
         <!-- <el-table-column
          align="center"
          prop="ProjectName"
          label="项目类型"
          min-width="150"
          show-overflow-tooltip
        /> -->
         <el-table-column
          align="center"
          prop="Code"
          label="工资结算单编号"
          min-width="150"
          show-overflow-tooltip
        />
        <!-- <el-table-column align="center" prop="Year" label="社保所属年月">
          <template slot-scope="scope">
            <span v-if="scope.row.Year">{{scope.row.Year}}年{{scope.row.Month}}月</span>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          prop="SalaryYear"
          label="所属年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.Year"
              >{{ scope.row.Year }}年{{ scope.row.Month }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="PeriodYear"
          label="入账年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.PeriodYear"
              >{{ scope.row.PeriodYear }}年{{ scope.row.PeriodMonth }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="StatusText"
          label="付款状态"
          min-width="120"
        />
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-dropdown
              trigger="click"
              v-if="
                $operatebtns(operates, ['InitiatePaymentRequest', 'Delete'])
              "
            >
              <span class="el-dropdown-link" title="编辑">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item
                    v-if="$operatebtn(operates, 'InitiatePaymentRequest')"
                    @click.native="
                      socialpaymentapplication(
                        scope.row,
                        'InitiatePaymentRequest'
                      )
                    "
                    >发起社保付款申请</el-dropdown-item
                  >
                  <!-- <el-dropdown-item v-if="scope.row.Status===0" @click.native="submitinvoice(scope.row,'Modify')">提交审核</el-dropdown-item> -->
                  <!-- <el-dropdown-item @click.native="amend(scope.row,'SetRights')">修改</el-dropdown-item> -->
                  <el-dropdown-item
                    v-if="
                      scope.row.Status === 0 && $operatebtn(operates, 'Delete')
                    "
                    @click.native="cancellationsocial(scope.row, 'Delete')"
                    >删除</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 公积金结算单列表 -->
      <el-table
        ref="finalTable"
        v-if="tabidx === 2"
        key="2"
        v-loading="tableloading"
        :data="tableData"
        class="erp-table"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          min-width="55"
          fixed
          label="全选"
        />
         <el-table-column
          align="center"
          prop="code"
          label="公积金结算单编号"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="Title"
          label="结算单名称"
          min-width="150"
        >
          <template slot-scope="scope">
            <span
              class="watchcode"
              v-if="scope.row.Title"
              @click="watchcustom(scope.row, 'View')"
              >{{ scope.row.Title }}</span
            >
            <span class="watchcode" v-else>--</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          prop=""
          label="结算单类型"
          min-width="150"
          show-overflow-tooltip
        /> -->
        <el-table-column
          align="center"
          prop="CompanyName"
          label="所属客户"
          min-width="150"
          show-overflow-tooltip
        />
         <el-table-column
          align="center"
          prop="ProjectName"
          label="所属项目"
          min-width="150"
          show-overflow-tooltip
        />
         <!-- <el-table-column
          align="center"
          prop=""
          label="项目类型"
          min-width="150"
          show-overflow-tooltip
        /> -->
         <el-table-column
          align="center"
          prop="Code"
          label="工资结算单编号"
          min-width="150"
          show-overflow-tooltip
        />
        <!-- <el-table-column align="center" prop="Year" label="所属年月">
          <template slot-scope="scope">
            <span v-if="scope.row.Year">{{scope.row.Year}}年{{scope.row.Month}}月</span>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          prop="SalaryYear"
          label="所属年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.SalaryYear"
              >{{ scope.row.SalaryYear }}年{{ scope.row.SalaryMonth }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="PeriodYear"
          label="入账年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.PeriodYear"
              >{{ scope.row.PeriodYear }}年{{ scope.row.PeriodMonth }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="StatusText"
          label="付款状态"
          min-width="120"
        />
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-dropdown
              trigger="click"
              v-if="
                $operatebtns(operates, ['InitiatePaymentRequest', 'Delete'])
              "
            >
              <span class="el-dropdown-link" title="编辑">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item
                    v-if="$operatebtn(operates, 'InitiatePaymentRequest')"
                    @click.native="
                      Provident(scope.row, 'InitiatePaymentRequest')
                    "
                    >发起公积金付款申请</el-dropdown-item
                  >
                  <!-- <el-dropdown-item v-if="scope.row.Status===0" @click.native="submitinvoice(scope.row,'Modify')">提交审核</el-dropdown-item> -->
                  <!-- <el-dropdown-item @click.native="amend(scope.row,'SetRights')">修改</el-dropdown-item> -->
                  <el-dropdown-item
                    v-if="$operatebtn(operates, 'Delete')"
                    @click.native="cancellationProvident(scope.row, 'Delete')"
                    >删除</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 医保结算单列表 -->
      <el-table
        ref="finalTable"
        v-if="tabidx === 3"
        key="3"
        v-loading="tableloading"
        :data="tableData"
        class="erp-table"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          min-width="55"
          fixed
          label="全选"
        />
         <el-table-column
          align="center"
          prop="Code"
          label="医保结算单编号"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="Title"
          label="结算单名称"
          min-width="150"
        >
          <template slot-scope="scope">
            <span
              class="watchcode"
              v-if="scope.row.Title"
              @click="watchcustom(scope.row, 'View')"
              >{{ scope.row.Title }}</span
            >
            <span class="watchcode" v-else>--</span>
          </template>
        </el-table-column>
         <!-- <el-table-column
          align="center"
          prop=""
          label="结算单类型"
          min-width="150"
          show-overflow-tooltip
        /> -->
        <el-table-column
          align="center"
          prop="CompanyName"
          label="所属客户"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="ProjectName"
          label="所属项目"
          min-width="150"
          show-overflow-tooltip
        />
         <!-- <el-table-column
          align="center"
          prop=""
          label="项目类型"
          min-width="150"
          show-overflow-tooltip
        /> -->
        <el-table-column
          align="center"
          prop="Code"
          label="工资结算单编号"
          min-width="150"
          show-overflow-tooltip
        />
        <!-- <el-table-column align="center" prop="Year" label="所属年月">
          <template slot-scope="scope">
            <span v-if="scope.row.Year">{{scope.row.Year}}年{{scope.row.Month}}月</span>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          prop="SalaryYear"
          label="所属年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.SalaryYear"
              >{{ scope.row.SalaryYear }}年{{ scope.row.SalaryMonth }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="PeriodYear"
          label="入账年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.PeriodYear"
              >{{ scope.row.PeriodYear }}年{{ scope.row.PeriodMonth }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="StatusText"
          label="付款状态"
          min-width="120"
        />
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-dropdown
              trigger="click"
              v-if="
                $operatebtns(operates, ['InitiatePaymentRequest', 'Delete'])
              "
            >
              <span class="el-dropdown-link" title="编辑">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item
                    v-if="$operatebtn(operates, 'InitiatePaymentRequest')"
                    @click.native="
                      healthapply(scope.row, 'InitiatePaymentRequest')
                    "
                    >发起医保付款申请</el-dropdown-item
                  >
                  <!-- <el-dropdown-item v-if="scope.row.Status===0" @click.native="submitinvoice(scope.row,'Modify')">提交审核</el-dropdown-item> -->
                  <!-- <el-dropdown-item @click.native="amend(scope.row,'SetRights')">修改</el-dropdown-item> -->
                  <el-dropdown-item
                    v-if="$operatebtn(operates, 'Delete')"
                    @click.native="cancellationHealth(scope.row, 'Delete')"
                    >删除</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!--其他费用结算单列表-->
      <el-table
        ref="finalTable"
        v-if="tabidx === 4"
        key="4"
        v-loading="tableloading"
        :data="tableData"
        class="erp-table"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          min-width="55"
          fixed
          label="全选"
        />
        <el-table-column
          align="center"
          prop="Code"
          label="其他费用结算单编号"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="Title"
          label="结算单名称"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              class="watchcode"
              @click="watchcustom(scope.row, 'InitiatePaymentRequest')"
              >{{
                scope.row.ProjectName +
                scope.row.EntryYear +
                "年" +
                scope.row.EntryMonth +
                "月其他费用结算单"
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="CompanyName"
          label="所属客户"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="ProjectName"
          label="所属项目"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="BusinessTypeName"
          label="项目类型"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="EntryYear"
          label="入账年月"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.EntryYear"
              >{{ scope.row.EntryYear }}年{{ scope.row.EntryMonth }}月</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="OtherExpenseStatusText"
          label="付款状态"
          min-width="120"
        />
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" title="编辑">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item
                    v-if="$operatebtn(operates, 'InitiatePaymentRequest')"
                    @click.native="
                      OtherApply(scope.row, 'InitiatePaymentRequest')
                    "
                    >发起付款申请</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click.native="OtherViewdetails(scope.row, 'SetRights')"
                    >查看详情</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="$operatebtn(operates, 'Delete')"
                    @click.native="OtherDelete(scope.row, 'Delete')"
                    >删除</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click.native="withdraw(scope.row, 'Modify')"
                    >撤回</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagina-fonter">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100, 500]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { GetProjectBusinessType } from "@/api/projectManagement.js";
import filtters from "@/utils/filters.js";
import {
  DeleteOtherExpense,
  GetSalarySettleList,
  DeleteSalarySettle,
  GetSiSettleList,
  GetHouseFundSettleList,
  DeleteSiSettle,
  DeleteHouseFundSettle,
  GetMedicalSettleList,
  DeleteMedicalSettle,
  OtherExpenseSettleStatusEnum,
} from "@/api/CompensationServiceManagement.js";
import {
  AddApplyPayExamine,
  GetApplyPayInfoByBusinessNoToLately,
  GetOtherExpensePageList,
} from "@/api/FinancialManagement.js";
import {
  showLoading,
  hideLoading,
  copy,
  MenuIdDate,
} from "@/utils/CustomValidation.js";
import qs from "qs";
export default {
  filters: {
    paytype(value) {
      if (value === 0) {
        return "项目";
      } else if (value === 1) {
        return "企业社保账户";
      } else {
        return "";
      }
    },
    healthpaytype(value) {
      if (value === 0) {
        return "项目";
      } else if (value === 1) {
        return "企业医保账户";
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      searchform: {
        CompanyId: "",
        SettlementSheetNo: "",
        ProjectId: "",
        ProjectType: "",
        PaymentStatus: "",
        YearMonth: "",
        CompanyName: "",
        ProjectName: "",
        // BFCompanyName: '',
        Account: "", // 企业社保账号
        // BatchId: '',
        Type: 0,
        Year: "", // 入账年
        Month: "", // 入账月
      },
      contentdata: {},
      dlgTitle: "发起其他费用付款申请",
      ProjectTypeList: [],
      month: "",
      tabidx: 0,
      tablist: [
        {
          value: 0,
          describe: "工资结算单",
        },
        {
          value: 1,
          describe: "社保结算单",
        },
        {
          value: 2,
          describe: "公积金结算单",
        },
        {
          value: 3,
          describe: "医保结算单",
        },
        {
          value: 4,
          describe: "其他费用结算单",
        },
      ],
      dimensionDate: [
        {
          value: 0,
          describe: "项目类型",
        },
        {
          value: 1,
          describe: "账号类型",
        },
      ],
      tableData: [],
      PaymentStatusList: [],
      tableloading: false,
      PageSize: 10,
      currentPage: 1,
      total: 0,
      allchecked: false,
      Ids: [], // 选中Id
      Year: "",
      Month: "",
      // 提交审核弹框
      audittitle: "提交审核",
      auditvisible: false,
      auditdata: {},
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query",
      },
    };
  },
  created() {
    // 获取页面权限
    if (this.$route.meta.operations) {
      console.log(this.$route.meta.operations);
      this.operates = this.$route.meta.operations;
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      this.GetProjectBusinessType();
      this.OtherExpenseSettleStatusEnum()
      if (this.tabidx == 0) {
        this.getSalarySettleList(this.operatiOBj);
      } else if (this.tabidx == 4) {
        this.GetOtherExpensePageList(this.operatiOBj);
      }
    }
  },
  methods: {
    OtherExpenseSettleStatusEnum(){
      let obj={
        menuid: MenuIdDate(),
        operationcode: "1",
      }
      OtherExpenseSettleStatusEnum(obj).then(res=>{
         if(res){
            this.PaymentStatusList=res
         }else{
            this.PaymentStatusList=[]
         }
      })
    },
    //撤回其他费用付款申请
    withdraw(e, str) {},
    //查看其他费用付款申请详情
    OtherViewdetails(e, str) {
      window.localStorage.setItem("payDetail", JSON.stringify(e));
      const { href } = this.$router.resolve({
        path: "/CompensationServiceManagement/OtherExpenseStatementDetails",
        query: {
          Id: e.Id,
          type: 3,
        },
      });
      window.open(href, "_blank");
    },
    //删除其他费用付款申请
    OtherDelete(e, str) {
      const operating = this.$operatedata(this.operates, str);
      this.$confirm("是否删除该结算单信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            Id: e.Id,
            Code: e.Code,
            menuid: operating.MenuId,
            operationcode: operating.OperationCode,
          };
          showLoading();
          DeleteOtherExpense(qs.stringify(obj)).then((response) => {
            hideLoading();
            if (response.MessageCode == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.GetOtherExpensePageList(this.operatiOBj);
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //其他费用付款申请
    OtherApply(e, str) {
      window.localStorage.setItem("payDetail", JSON.stringify(e));
      this.$router.push({
        path: "/CompensationServiceManagement/OtherExpensePaymentApplication",
        query: {
          type: 3,
          Id: e.Id,
        },
      });
    },
    //获取项目类型
    GetProjectBusinessType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetProjectBusinessType(qs.stringify(obj)).then((response) => {
        if (response) {
          this.ProjectTypeList = response;
        } else {
          this.ProjectTypeList = [];
        }
      });
    },
    //获取其他费用列表
    GetOtherExpensePageList(e) {
      if (this.searchform.YearMonth != null) {
        this.Year = Number(this.searchform.YearMonth.split("-")[0]);
        this.Month = Number(this.searchform.YearMonth.split("-")[1]);
      } else {
        this.Year = "";
        this.Month = "";
      }
      let obj = {
        Code: this.searchform.SettlementSheetNo,
        CompanyName: this.searchform.CompanyId,
        ProjectName: this.searchform.ProjectId,
        BusinessType: this.searchform.ProjectType,
        Year: this.Year,
        Month: this.Month,
        OtherExpenseStatus:this.searchform.PaymentStatus,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid || MenuIdDate(),
        operationcode: e.OperationCode || '1',
      };
      showLoading()
      GetOtherExpensePageList(obj).then((res) => {
        hideLoading()
        if (res.MessageCode == 0 && res.Data.length > 0) {
          this.tableData = res.Data;
          this.total = res.Total;
        } else {
          this.tableData = [];
        }
      });
    },
    // 获取工资结算列表
    getSalarySettleList(operat) {
      // 处理年月
      if (this.month) {
        this.searchform.Year = this.month.getFullYear();
        this.searchform.Month = this.month.getMonth() + 1;
      } else {
        this.searchform.Year = "";
        this.searchform.Month = "";
      }
      let obj = {
        CompanyName: this.searchform.CompanyName,
        ProjectName: this.searchform.ProjectName,
        Year: this.searchform.Year,
        Month: this.searchform.Month,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1',
      };
      this.tableloading = true;
      GetSalarySettleList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.total = response.Total;
            this.tableData = response.Data;
          } else {
            this.total = 0;
            this.tableData = [];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
        this.tableloading = false;
      });
    },
    // 获取社保结算列表
    getSiSettleList(operat) {
      let obj = {
        ProjectName: this.searchform.ProjectName,
        Account: this.searchform.Account,
        Type: this.searchform.Type,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid,
        operationcode: operat.OperationCode,
      };
      this.tableloading = true;
      GetSiSettleList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.total = response.Total;
            this.tableData = response.Data;
          } else {
            this.total = 0;
            this.tableData = [];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
        this.tableloading = false;
      });
    },
    // 获取公积金结算列表
    getHouseFundSettleList(operat) {
      let obj = {
        Account: this.searchform.Account,
        ProjectName: this.searchform.ProjectName,
        Year: this.searchform.Year,
        Month: this.searchform.Month,
        Type: this.searchform.Type,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid,
        operationcode: operat.OperationCode,
      };
      this.tableloading = true;
      GetHouseFundSettleList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.total = response.Total;
            this.tableData = response.Data;
          } else {
            this.total = 0;
            this.tableData = [];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
        this.tableloading = false;
      });
    },
    // 获取医保结算单列表
    getMedicalSettleList(operat) {
      let obj = {
        ProjectName: this.searchform.ProjectName,
        Account: this.searchform.Account,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Type: this.searchform.Type,
        menuid: operat.menuid,
        operationcode: operat.OperationCode,
      };
      this.tableloading = true;
      GetMedicalSettleList(qs.stringify(obj)).then((response) => {
        this.tableloading = false;
        if (response.IsSuccess) {
          if (response.Data) {
            this.total = response.Total;
            this.tableData = response.Data;
          } else {
            this.total = 0;
            this.tableData = [];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    searchtable() {
      this.currentPage = 1;
      if (this.tabidx == 0) {
        this.getSalarySettleList(this.operatiOBj);
      } else if (this.tabidx == 1) {
        this.getSiSettleList(this.operatiOBj);
      } else if (this.tabidx == 2) {
        this.getHouseFundSettleList(this.operatiOBj);
      } else if (this.tabidx == 3) {
        this.getMedicalSettleList(this.operatiOBj);
      } else if (this.tabidx == 4) {
        this.GetOtherExpensePageList(this.operatiOBj);
      }
    },
    choosetab(e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return;
      } else {
        // 切换到第一页
        this.currentPage = 1;
        this.tabidx = e.value;
        this.allchecked = false;
        if (e.value === 0) {
          this.getSalarySettleList(this.operatiOBj);
        } else if (e.value === 1) {
          this.getSiSettleList(this.operatiOBj);
        } else if (e.value === 2) {
          this.getHouseFundSettleList(this.operatiOBj);
        } else if (e.value === 3) {
          this.getMedicalSettleList(this.operatiOBj);
        } else if (this.tabidx == 4) {
          this.GetOtherExpensePageList(this.operatiOBj);
        }
      }
    },
    handleSelectionChange(value) {},
    watchcustom(e, op) {
      const operating = this.$operatedata(this.operates, op);
      window.localStorage.setItem("operating", JSON.stringify(operating));
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      console.log(breadpath);
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      // 存储回款单,在发起结算时展示
      if (e.MoneyRecords) {
        window.localStorage.setItem(
          "receivableList",
          JSON.stringify(e.MoneyRecords)
        );
      } else {
        window.localStorage.setItem("receivableList", JSON.stringify(""));
      }
      if (this.tabidx == 0) {
        const { href } = this.$router.resolve({
          path: "/CompensationServiceManagement/FinalStatementDetail",
          query: {
            id: e.Id,
            projectId: e.ProjectId,
            name: e.Title,
            code: e.Code,
          },
        });
        window.open(href, "_blank");
      } else if (this.tabidx == 1) {
        // 判断是根据项目还是根据账户
        const { href } = this.$router.resolve({
          path: "/CompensationServiceManagement/SocialDetail",
          query: {
            id: e.Id,
            type: e.Type,
          },
        });
        window.open(href, "_blank");
      } else if (this.tabidx == 2) {
        const { href } = this.$router.resolve({
          path: "/CompensationServiceManagement/AccumulationDetail",
          query: {
            id: e.Id,
            type: e.Type,
          },
        });
        window.open(href, "_blank");
      } else if (this.tabidx == 3) {
        const { href } = this.$router.resolve({
          path: "/CompensationServiceManagement/HealthDetail",
          query: {
            id: e.Id,
            type: e.Type,
          },
        });
        window.open(href, "_blank");
      } else if (this.tabidx == 4) {
        const { href } = this.$router.resolve({
          path: "/CompensationServiceManagement/OtherExpenseStatementDetails",
          query: {
            Id: e.Id,
          },
        });
        window.open(href, "_blank");
        window.localStorage.setItem("payDetail", JSON.stringify(e));
      }
    },
    // 发起工资付款申请 (作废)
    wagepaymentapplication(e) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));

      this.$router.push({
        path: "/CompensationServiceManagement/AddPaymentRequest",
        query: {
          type: 1,
          id: e.Id,
          name: e.Title,
        },
      });
    },
    // 发起社保付款申请
    socialpaymentapplication(e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      window.localStorage.setItem("operating", JSON.stringify(operating));
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      // 存储回款单,在发起结算时展示
      if (e.MoneyRecords) {
        window.localStorage.setItem(
          "receivableList",
          JSON.stringify(e.MoneyRecords)
        );
      } else {
        window.localStorage.setItem("receivableList", JSON.stringify(""));
      }
      this.$router.push({
        path: "/CompensationServiceManagement/AddPaymentRequest",
        query: {
          type: 2,
          id: e.Id,
          name: e.Title,
          projectId: e.ProjectId,
          Amount: e.SiTotal,
          code: e.Code,
        },
      });
    },
    // 发起公积金结算申请
    Provident(e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      window.localStorage.setItem("operating", JSON.stringify(operating));
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      window.localStorage.setItem(
        "receivableList",
        JSON.stringify(e.MoneyRecords)
      );
      this.$router.push({
        path: "/CompensationServiceManagement/AddPaymentRequest",
        query: {
          type: 3,
          id: e.Id,
          name: e.Title,
          projectId: e.ProjectId,
          Amount: e.TotalHouseFund,
          code: e.Code,
        },
      });
    },
    // 发起医保结算申请
    healthapply(e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      window.localStorage.setItem("operating", JSON.stringify(operating));
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      window.localStorage.setItem(
        "receivableList",
        JSON.stringify(e.MoneyRecords)
      );
      this.$router.push({
        path: "/CompensationServiceManagement/AddPaymentRequest",
        query: {
          type: 4,
          id: e.Id,
          name: e.Title,
          projectId: e.ProjectId,
          Amount: e.MedicalTotal,
          code: e.Code,
        },
      });
    },
    // 修改
    amend() {},
    // 作废
    cancellation(e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      // 判断付款申请单的状态,再进行删除
      let obj = {
        BusinessNo: e.Code,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      showLoading();
      GetApplyPayInfoByBusinessNoToLately(qs.stringify(obj)).then(
        (response) => {
          hideLoading();
          if (response.IsSuccess) {
            if (response.Data.Id !== 0 && response.Data.Status !== 6) {
              this.$message({
                message: "该结算单已发起付款申请, 不能删除, 请先删除付款申请单",
                type: "warning",
              });
              return;
            } else {
              this.$confirm("是否作废该条结算单?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  let obj = {
                    Id: e.Id,
                    menuid: operating.MenuId,
                    operationcode: operating.OperationCode,
                  };
                  showLoading();
                  DeleteSalarySettle(qs.stringify(obj)).then((response) => {
                    hideLoading();
                    if (response.IsSuccess) {
                      this.$message({
                        message: "作废成功",
                        type: "success",
                      });
                      this.getSalarySettleList(this.operatiOBj);
                    } else {
                      this.$message({
                        message: response.MessageContent,
                        type: "error",
                      });
                    }
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消删除",
                  });
                });
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error",
            });
          }
        }
      );
      // 再次判断是否是待审核状态
      // if (e.Status === 0) {
      //   this.$confirm('是否作废该条结算单?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     let obj = {
      //       Id: e.Id,
      //       menuid: operating.MenuId,
      //       operationcode: operating.OperationCode
      //     }
      //     showLoading()
      //     DeleteSalarySettle(qs.stringify(obj)).then(response => {
      //       hideLoading()
      //       if (response.IsSuccess) {
      //         this.$message({
      //           message: '作废成功',
      //           type: "success"
      //         })
      //         this.getSalarySettleList(this.operatiOBj)
      //       } else {
      //         this.$message({
      //           message: response.MessageContent,
      //           type: "error"
      //         })
      //       }
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });
      //   });
      // }
    },
    // 删除社保
    cancellationsocial(e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      if (e.Status === 0) {
        this.$confirm("是否删除该条社保结算单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let obj = {
              Id: e.Id,
              menuid: operating.MenuId,
              operationcode: operating.OperationCode,
            };
            showLoading();
            DeleteSiSettle(qs.stringify(obj)).then((response) => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                // this.getSalarySettleList()
                this.getSiSettleList(this.operatiOBj);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 删除公积金
    cancellationProvident(e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      if (e.Status === 0) {
        this.$confirm("是否删除该社保结算单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let obj = {
              Id: e.Id,
              menuid: operating.MenuId,
              operationcode: operating.OperationCode,
            };
            showLoading();
            DeleteHouseFundSettle(qs.stringify(obj)).then((response) => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.getHouseFundSettleList(this.operatiOBj);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 删除医保
    cancellationHealth(e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
      if (e.Status === 0) {
        this.$confirm("是否删除该医保结算单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let obj = {
              Id: e.Id,
              menuid: operating.MenuId,
              operationcode: operating.OperationCode,
            };
            showLoading();
            DeleteMedicalSettle(qs.stringify(obj)).then((response) => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.getMedicalSettleList(this.operatiOBj);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 选择分页
    handleSizeChange(val) {
      this.PageSize = val;
      if (this.tabidx == 0) {
        this.getSalarySettleList(this.operatiOBj);
      } else if (this.tabidx == 1) {
        this.getSiSettleList(this.operatiOBj);
      } else if (this.tabidx == 2) {
        this.getHouseFundSettleList(this.operatiOBj);
      } else if (this.tabidx == 3) {
        this.getMedicalSettleList(this.operatiOBj);
      } else if (this.tabidx == 4) {
        this.GetOtherExpensePageList(this.operatiOBj);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.tabidx == 0) {
        this.getSalarySettleList(this.operatiOBj);
      } else if (this.tabidx == 1) {
        this.getSiSettleList(this.operatiOBj);
      } else if (this.tabidx == 2) {
        this.getHouseFundSettleList(this.operatiOBj);
      } else if (this.tabidx == 3) {
        this.getMedicalSettleList(this.operatiOBj);
      } else if (this.tabidx == 4) {
        this.GetOtherExpensePageList(this.operatiOBj);
      }
    },

    // // 提交审核 废弃
    // submitinvoice(e, op) {
    //   // 操作码
    //   const operating = this.$operatedata(this.operates, op)
    //   window.localStorage.setItem('operating', JSON.stringify(operating))
    //   this.auditdata = copy(e)
    //   if (this.tabidx == 0) {
    //     this.audittitle = '薪酬提交审核'
    //   } else if (this.tabidx == 1) {
    //     this.audittitle = '社保提交审核'
    //   } else if (this.tabidx == 2) {
    //     this.audittitle = '公积金提交审核'
    //   }
    //   this.Id = e.Id
    //   this.auditvisible = true
    // },
    // closeauditdialog() {
    //   this.auditvisible = false
    // },
    // savecostaudit(e) {
    //   console.log(e)
    //   let obj = copy(e)
    //   obj.ApplyPayId = this.Id
    // },
  },
};
</script>

<style lang="scss" scoped>
.final-statement-container {
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
  .final-content {
    margin-left: 20px;
    background-color: #fff;
    border-radius: 0 0 0 8px;
    padding: 20px;
  }
}
</style>