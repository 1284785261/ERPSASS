// 营销提成规则
<template>
	<div class="industry-box">
		<div class="industry-box-header">
			<div class="industry-box-form">
				<el-form ref="form" class="filter-container">
					<el-form-item label="规则名称" label-width="100px" v-if="tabidx==1">
						<el-input v-model="searchObject.RuleName" clearable suffix-icon="el-icon-search"
							class="select-input" placeholder="请输入营销规则名称" />
					</el-form-item>
					<el-form-item label="营销人员属性" label-width="120px" v-if="tabidx==1">
						<el-select v-model="searchObject.SaleType" clearable placeholder="请选择营销人员属性" size="mini"
							class="select-input">
							<el-option v-for="item in CommisionRuleEnumSaleType" :key="item.describe"
								:label="item.describe" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="提成业务类型" label-width="120px" v-if="tabidx==1">
						<el-select v-model="searchObject.BusinessType" clearable placeholder="请选择提成业务类型" size="mini"
							class="select-input">
							<el-option v-for="item in CommisionRulebusinessTypeEnum" :key="item.describe"
								:label="item.describe" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="业务类型" label-width="120px" v-if="tabidx==2">
						<el-select v-model="searchObject.BusinessType" clearable placeholder="请选择业务类型" size="mini"
							class="select-input">
							<el-option v-for="item in CommisionRuleEnumBusinessType" :key="item.describe"
								:label="item.describe" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="启用状态" label-width="100px">
						<el-select v-model="searchObject.Status" placeholder="请选择" size="mini" class="select-input">
							<el-option v-for="item in statusList" :key="item.label" :label="item.label"
								:value="item.id" />
						</el-select>
					</el-form-item>
					<el-button class="search-button" size="mini" round @click="search">
						搜索
					</el-button>
				</el-form>

			</div>
		</div>
		<div class="tab2 clearfix">
			<div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)"
				v-for="(item, index) in tablist" :key="index">{{item.describe}}
			</div>
			
			<div class="tableHeader-operation">
				<!-- 筛选列组件 -->
				<ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
				<el-button class="operation-button" v-if="$operatebtn(operates, 'Add')  && tabidx==1" size="mini" round
					@click="handleCreate('Add')">
					新建提成规则
				</el-button>
				<el-button class="operation-button" v-if="$operatebtn(operates, 'Add') && tabidx==2" size="mini" round
					@click="handleRisk('Add')">
					创建风险金比例规则
				</el-button>
			</div>
		</div>
		<div class="table-content">
			<div>
				<el-table ref="industrtTable" v-loading="tableloading" :data="CommissionList" class="erp-table"
					style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark"
					@selection-change="handleSelectionChange" v-if="tabidx==1">
					<!-- <el-table-column align="center" type="selection" width="60" /> -->
					<el-table-column align="center" prop="Id" label="编号" />
					<el-table-column align="center" prop="RuleName" label="规则名称" v-if="$getColumsFlag('RuleName', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="BusinessTypeName" label="规则属性" v-if="$getColumsFlag('BusinessTypeName', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="BeginTime" label="规则启用周期" v-if="$getColumsFlag('BeginTime', checkboxVal)" min-width="160" >
                        <template slot-scope="scope">
						    <span>{{scope.row.BeginTime | Time}} - {{scope.row.AddTime | Time}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="Companys" label="启用公司" v-if="$getColumsFlag('Companys', checkboxVal)" min-width="180" show-overflow-tooltip >
						<template slot-scope="scope">
						    <span v-for="(val,index) in scope.row.Companys" :key="index" >{{val.CompanyName}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="RulebusinessTypeName" label="提成业务类型" v-if="$getColumsFlag('RulebusinessTypeName', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="RuleSaleTypeName" label="营销人员属性" v-if="$getColumsFlag('RuleSaleTypeName', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="Status" label="使用状态" v-if="$getColumsFlag('Status', checkboxVal)" min-width="120">
						<template slot-scope="scope">
							<span>{{scope.row.Status | usestatus}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-dropdown trigger="click"
								v-if="($operatebtns(operates,['View','Modify','Disabled','Enabled','Delete']))">
								<span class="el-dropdown-link">
									<svg-icon icon-class="setting" />
								</span>
								<el-dropdown-menu slot="dropdown">
									<ul class="popout-list">
										<el-dropdown-item v-if="$operatebtn(operates, 'View')"
											@click.native="lookCommission(scope.row,'View')">查看</el-dropdown-item>
										<el-dropdown-item v-if="$operatebtn(operates, 'Modify')"
											@click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
										<el-dropdown-item
											v-if="scope.row.Status == 1 && $operatebtn(operates, 'Disabled')"
											@click.native="UploadStatus(scope.row,'Disabled')">禁用</el-dropdown-item>
										<el-dropdown-item v-if="$operatebtn(operates, 'Delete')"
											@click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
										<el-dropdown-item
											@click.native="operationLogs(scope.row,'Enabled')">操作日志</el-dropdown-item>
									</ul>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>

				<el-table ref="industrtTable" v-loading="tableloading" :data="CommissionList" class="erp-table"
					style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark"
					@selection-change="handleSelectionChange" v-if="tabidx==2">
					<!-- <el-table-column align="center" type="selection" width="60" /> -->
					<el-table-column align="center" prop="Id" label="编号" />
					<el-table-column align="center" prop="BusinessTypeName" label="业务类型" v-if="$getColumsFlag('BusinessTypeName', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="SiTypeName" label="参保情况" v-if="$getColumsFlag('SiTypeName', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="UndertakerName" label="风险承担方" v-if="$getColumsFlag('UndertakerName', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="MgrFeeName" label="人均管理费" v-if="$getColumsFlag('MgrFeeName', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="Scale" label="提取比例" v-if="$getColumsFlag('Scale', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="Remark" label="备注" v-if="$getColumsFlag('Remark', checkboxVal)" min-width="120" />
					<el-table-column align="center" prop="Status" label="使用状态" v-if="$getColumsFlag('Status', checkboxVal)" min-width="120">
						<template slot-scope="scope">
							<span>{{scope.row.Status | usestatus}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-dropdown trigger="click"
								v-if="($operatebtns(operates,['View','Modify','Disabled','Enabled','Delete']))">
								<span class="el-dropdown-link">
									<svg-icon icon-class="setting" />
								</span>
								<el-dropdown-menu slot="dropdown">
									<ul class="popout-list">
										<!-- <el-dropdown-item v-if="$operatebtn(operates, 'View')"
											@click.native="lookCommission(scope.row,'View')">查看</el-dropdown-item> -->
										<el-dropdown-item v-if="$operatebtn(operates, 'Modify')"
											@click.native="handleEditRisk(scope.row,'Modify')">修改</el-dropdown-item>
										<el-dropdown-item
											v-if="scope.row.Status == 0 && $operatebtn(operates, 'Enabled')"
											@click.native="UploadStatus(scope.row,'Enabled')">启用</el-dropdown-item>
										<el-dropdown-item
											v-if="scope.row.Status == 1 && $operatebtn(operates, 'Disabled')"
											@click.native="UploadStatus(scope.row,'Disabled')">禁用</el-dropdown-item>
										<el-dropdown-item v-if="$operatebtn(operates, 'Delete')"
											@click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
									</ul>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!-- <div class="foot-operation" v-if="($operatebtns(operates,['Disabled','Enabled','Delete']))">
				<el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll">全选</el-checkbox>
				<el-button round class="operation-button" size="mini" v-if="$operatebtn(operates,'Enabled')"
					@click="AllStatus(0,'Enabled')">启用</el-button>
				<el-button round class="operation-button" size="mini" v-if="$operatebtn(operates,'Disabled')"
					@click="AllStatus(1,'Disabled')">禁用</el-button>
				<el-button round class="operation-button del-button" size="mini" v-if="$operatebtn(operates,'Delete')"
					@click="Alldelete('Delete')">批量删除</el-button>
			</div> -->
			<div class="pagina-fonter">
				<el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
					@current-change="handleCurrentChange" />
			</div>
		</div>
		<!-- //操作日志 -->
		<Operation_Log :rowList="rowList" :showOperationLogDetails="showOperationLogDetails"   @closeDialog="closeDialog"></Operation_Log>
		<AddRiskCapital :showAddRiskCapital="showAddRiskCapital" @closeRisk="closeRisk" :tempData="tempData"
			:title="RiskTile" ></AddRiskCapital>
	</div>
</template>
<script>
	import {
		GetCommisionRulePageList,
		EditCommisionRuleStatus,
		DelCommisionRule,
		GetCommisionRuleLogPageList,
		GetCommisionRuleAllEnum
	} from '@/api/BusinessSet.js'
	import {
		GetRiskFundProportionRulePageList,
		AddRiskFundProportionRule,
		DeleteRiskFundProportionRule,
		EditRiskFundProportionRule,
		EditRiskFundProportionRuleStatus,
		GetRiskFundProportionRuleInfo
	} from '@/api/MarketingDataManagement.js'
	import AddRiskCapital from "./components/addRiskCapital"
	import Operation_Log from './components/operationLog.vue'
	import filters from '@/utils/filters'
	import {
		MenuIdDate,
		showLoading,
		hideLoading
	} from '@/utils/CustomValidation'
	import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
	import qs from 'qs'
	export default {
		components: {
			AddRiskCapital,
			Operation_Log,
			ScreeningComponent
		},
		data() {
			return {
				tabidx: 1,
				tablist: [{
					describe: '提成规则',
					value: 1
				}, {
					describe: '风险金比例规则',
					value: 2
				}],

				OperationLogList:[],//操作日志数组
				showOperationLogDetails:false,//操作日志
				// OperationLogTotal:'',//操作日志
				tableloading: false,
				showAddRiskCapital: false, 
				RiskTile: '', 
				tempData: {}, 
				searchObject: {
					BusinessType: '',
					SaleType: '',
					CommisionBase: '',
					Status: -1,
					CommissionId:-1
				},
				currentPage: 1,
				PageSize: 10,
				total: 0,
				multipleSelection: [],
				checked: false,
				CommisionRuleEnumSaleType: [],
				CommisionRulebusinessTypeEnum:[],
				CommisionRuleEnumBusinessType:[],//业务类型
				statusList: [{
						id: -1,
						label: '全部'
					}, {
						id: 0,
						label: '禁用'
					},
					{
						id: 1,
						label: '启用'
					}
				],
				checkboxVal: [],
				formTheadOptions: [
				  { label: '规则名称', prop: 'RuleName' },
				  { label: '规则属性', prop: 'BusinessTypeName' },
				  { label: '规则启用周期', prop: 'BeginTime' },
				  { label: '启用公司', prop: 'Companys' },
				  { label: '提成业务类型', prop: 'RulebusinessTypeName' },
				  { label: '营销人员属性', prop: 'RuleSaleTypeName' },					
				  { label: '业务类型', prop: 'BusinessTypeName' },
				  { label: '参保情况', prop: 'SiTypeName' },
				  { label: '风险承担方', prop: 'UndertakerName' },
				  { label: '人均管理费', prop: 'MgrFeeName' },
				  { label: '提取比例', prop: 'Scale' },
				  { label: '备注', prop: 'Remark' },
				  { label: '使用状态', prop: 'Status' }
				],
				CommissionList: [],
				operates: [], // 获取页面权限
				operatiOBj: { // 父权限查看数据
					menuid: '',
					OperationCode: 'Query'
				},
				rowList:{}
			}
		},
		created() {
			this.getType()
			if (this.$route.meta.operations) {
				this.operates = this.$route.meta.operations
				this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
				this.getCommission(this.operatiOBj)
			}
			for (let i = 0; i < this.formTheadOptions.length; i++) {
			  this.checkboxVal.push(this.formTheadOptions[i].prop)
			}
		},
		methods: {
			//筛选项
			SelectCheck(val) {
			  this.tableloading = true
			  this.checkboxVal = val
			  this.tableloading = false
			},
			// 切换tab栏
			choosetab(e) {
				console.log(e.value)
				// 防止重复点击
				if (this.tabidx == e.value) {
					return
				}else{
					this.tabidx = e.value
					if(this.tabidx == 1){
						// 切换到第一页
						this.currentPage = 1
						this.getCommission(this.operatiOBj)						
					}else{
						this.currentPage = 1
						this.getRiskFund(this.operatiOBj)	
					}
					
				}
			},
			//搜索
			search() {
				this.currentPage = 1
				if (this.tabidx == 1) {
					this.getCommission(this.operatiOBj)
				} else{
					this.getRiskFund(this.operatiOBj)
				}
				
			},
			getType() {
				let data = {
					menuid: MenuIdDate(),
					operationcode: '1'
				}
				GetCommisionRuleAllEnum(qs.stringify(data)).then(response => {
					if (response) {
						this.CommisionRuleEnumSaleType = response.CommisionRuleEnumSaleType
						this.CommisionRulebusinessTypeEnum = response.CommisionRulebusinessTypeEnum
						this.CommisionRuleEnumBusinessType = response.CommisionRuleEnumBusinessType
					}
				})
			},
			//获取提成列表数据
			getCommission(operat) {
				this.tableloading = true
				const obj = {
					"RuleName": this.searchObject.RuleName,
					"RuleSaleType": this.searchObject.SaleType,
					"RulebusinessType": this.searchObject.BusinessType,
					"Status": this.searchObject.Status,
					// CommissionId: this.searchObject.CommissionId,
					PageIndex: this.currentPage || 1,
					PageSize: this.PageSize || 10,
					menuid: operat.menuid || MenuIdDate(),
					operationcode: operat.OperationCode || '1'
				}
				GetCommisionRulePageList(qs.stringify(obj)).then(response => {
					this.tableloading = false
					if (response.IsSuccess) {
						this.CommissionList = response.Data
						this.total = response.Total
					} else {
						this.CommissionList = []
						this.total = 0
						this.$message({
							message: response.MessageContent,
							type: 'error'
						})
					}
				})
			},
			//获取风险金比例列表数据
			getRiskFund(operat) {
				this.tableloading = true
				const obj = {
					BusinessType: this.searchObject.BusinessType || -1,
					Status: this.searchObject.Status,
					PageIndex: this.currentPage || 1,
					PageSize: this.PageSize || 10,
					menuid: operat.menuid || MenuIdDate(),
					operationcode: operat.OperationCode || '1'
				}
				GetRiskFundProportionRulePageList(qs.stringify(obj)).then(response => {
					this.tableloading = false
					if (response.IsSuccess) {
						console.log(response);
						this.CommissionList = response.Data
						this.total = response.Total
					} else {
						this.CommissionList = []
						this.total = 0
						this.$message({
							message: response.MessageContent,
							type: 'error'
						})
					}
				})
			},
			//修改状态
			UploadStatus(data, str) {
				const operating = this.$operatedata(this.operates, str)
				let param = {
					Id: data.Id,
					Status: '',
					menuid: operating.MenuId,
					operationcode: operating.OperationCode
				}
				let strPrompt = '',
					successPrompt = ''
				if (data.Status == '1') {
					param.Status = '0'
					strPrompt = '该规则正在应用中，确定是否禁用?'
					successPrompt = '禁用规则成功！'
				} else if (data.Status == '0') {
					param.Status = '1'
					strPrompt = '你确定启用此规则吗?'
					successPrompt = '启用规则成功！'
				}
				this.$confirm(strPrompt, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.tabidx == 1){
						EditCommisionRuleStatus(qs.stringify(param)).then(response => {
							if (response.IsSuccess) {
								this.$message({
									type: 'success',
									message: successPrompt
								})
								this.getCommission(this.operatiOBj)
							} else {
								this.$message({
									type: 'error',
									message: response.MessageContent
								})
							}
						})
					}else{
						EditRiskFundProportionRuleStatus(data.Id,param.Statusqs.stringify(param)).then(response => {
							if (response.IsSuccess) {
								this.$message({
									type: 'success',
									message: successPrompt
								})
								this.getRiskFund(this.operatiOBj)
							} else {
								this.$message({
									type: 'error',
									message: response.MessageContent
								})
							}
						})
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					})
				})
			},
			//关闭操作日志
			closeDialog(str){
			    this.showOperationLogDetails=str
			},
			operationLogs(row, str){
				this.rowList={Id:row.Id, str:str}
				this.showOperationLogDetails=true;
			},
			//批量启用禁用
			AllStatus(val, str) {
				if (this.multipleSelection.length) {
					for (let i = 0; i < this.multipleSelection.length; i++) {
						if (this.multipleSelection[i].Status != val) {
							this.$message({
								type: 'error',
								message: '不能操作相同状态的数据'
							})
							return
						}
					}
					let arr = []
					for (let i = 0; i < this.multipleSelection.length; i++) {
						arr.push(this.multipleSelection[i].Id)
					}
					const operating = this.$operatedata(this.operates, str)
					let param = {
						IdArr: arr.join(','),
						Status: '',
						menuid: operating.MenuId,
						operationcode: operating.OperationCode
					}
					let strPrompt = '',
						successPrompt = ''
					if (val == '1') {
						param.Status = '0'
						strPrompt = '你确定批量禁用此营销计算规则吗?'
						successPrompt = '批量禁用营销计算规则成功！'
					} else if (val == '0') {
						param.Status = '1'
						strPrompt = '你确定批量启用此营销计算规则吗?'
						successPrompt = '批量启用营销计算规则成功！'
					}
					this.$confirm(strPrompt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						EditCommisionRuleStatus(qs.stringify(param)).then(response => {
							if (response.IsSuccess) {
								this.$message({
									type: 'success',
									message: successPrompt
								})
								this.getCommission(this.operatiOBj)
							} else {
								this.$message({
									type: 'error',
									message: response.MessageContent
								})
							}
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消操作'
						})
					})
				} else {
					this.$message({
						type: 'warning',
						message: '请选择要操作的营销计算规则'
					})
				}
			},
			// 单个删除
			roledetele(value, str) {
				const operating = this.$operatedata(this.operates, str)
				const obj = {
					IdArr: value.Id,
					menuid: operating.MenuId,
					operationcode: operating.OperationCode
				}
				this.$confirm('该规则正在应用中，确定是否删除', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.tabidx == 1){
						DelCommisionRule(qs.stringify(obj)).then(response => {
							if (response.IsSuccess) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								})
								this.getCommission(this.operatiOBj)
							} else {
								this.$message({
									type: 'error',
									message: response.MessageContent
								})
							}
						})
					}else{
						DeleteRiskFundProportionRule(qs.stringify(obj)).then(response => {
							if (response.IsSuccess) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								})
								this.getRiskFund(this.operatiOBj)
							} else {
								this.$message({
									type: 'error',
									message: response.MessageContent
								})
							}
						})
					}
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			// 批量删除
			Alldelete(str) {
				if (this.multipleSelection.length) {
					let arr = []
					for (let i = 0; i < this.multipleSelection.length; i++) {
						arr.push(this.multipleSelection[i].Id)
					}
					const operating = this.$operatedata(this.operates, str)
					const obj = {
						IdArr: arr.join(','),
						menuid: operating.MenuId,
						operationcode: operating.OperationCode
					}
					this.$confirm('此操作将批量删除选中的营销计算规则', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						DelCommisionRule(qs.stringify(obj)).then(response => {
							if (response.IsSuccess) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								})
								this.getCommission(this.operatiOBj)
							} else {
								this.$message({
									type: 'error',
									message: response.MessageContent
								})
							}
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
				} else {
					this.$message({
						type: 'warning',
						message: '请选择要删除的营销计算规则'
					})
				}
			},
			// 表头多选
			handleSelectionChange(value) {
				this.checked = value.length == this.CommissionList.length
				this.multipleSelection = value
			},
			// 下方全选
			batchSelectAll() {
				this.$refs.industrtTable.toggleAllSelection(this.checked)
			},
			handleCreate(str) {
				const operating = this.$operatedata(this.operates, str)
				localStorage.setItem('operating', JSON.stringify(operating))
				this.$router.push({
					path: '/BusinessSet/addCommission'
				})
			},
			//+打开弹窗
			handleRisk(str) { 
				const operating = this.$operatedata(this.operates, str)
				localStorage.setItem('operating', JSON.stringify(operating))
				this.RiskTile = '创建风险金比例规则'
				this.showAddRiskCapital = true
			},
			closeRisk(value) {
				this.showAddRiskCapital = value
				this.getRiskFund(this.operatiOBj)
			},

			//查看营销规则
			lookCommission(data, str) {
				this.$router.push({
					path: '/BusinessSet/lookCommission',
					query: {
						Id: data.Id
					}
				})
			},
			//修改营销规则
			handleEdit(data, str) {
				const operating = this.$operatedata(this.operates, str)
				localStorage.setItem('operating', JSON.stringify(operating))
				this.$router.push({
					path: '/BusinessSet/addCommission',
					query: {
						Id: data.Id
					}
				})
			},
			//修改风险金规则
			handleEditRisk(data, str) {
				const operating = this.$operatedata(this.operates, str)
				localStorage.setItem('operating', JSON.stringify(operating))
				this.RiskTile = '修改风险金比例规则'
				const obj = {
				  Id: data.Id,
				  menuid: MenuIdDate(),
				  operationcode: '1'
				}
				GetRiskFundProportionRuleInfo(qs.stringify(obj)).then(response => {
				  if (response.IsSuccess) {
				    this.tempData = response.Data
					this.showAddRiskCapital = true
				  } else {
				    this.$message({
				      message: response.MessageContent,
				      type: 'error'
				    })
				  }
				})
			},
			handleSizeChange(val) {
				this.PageSize = val
				this.getCommission(this.operatiOBj)
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.getCommission(this.operatiOBj)
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/styles/publicStyle.scss";

	.industry-box {
		height: 100%;
	}
	
		.tableHeader-operation {
		text-align: right;
		margin-bottom: 20px;
		padding-right: 20px;
		
	/deep/	.Screen-box {
		  float: right !important;
		  margin-right: 5px;
		}
	}
</style>
