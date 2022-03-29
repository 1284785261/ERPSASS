//新建风险金页面
<template>
	<div class="tag-container">
		<el-dialog :close-on-click-modal="false" :title="title" class="dialog-box dialog-account" append-to-body
			:visible.sync="showAccount" :show-close="false" :destroy-on-close="true" width="600px" @close="close">
			<i class="el-icon-circle-close closeButton" @click="close"></i>
			<el-form ref="ruleForm" :model="searchObject" :rules="Formrules" class="forms-Account">
				<el-form-item label="启用公司" prop="CompanyId">
					<el-select v-model="searchObject.CompanyId" clearable multiple placeholder="请选择启用公司"
						class="select-input">
						<el-option :label="item.Name" :value="item.Id" v-for="(item, index) in Companylist"
							:key="index"></el-option>
						<div v-if="Companylist.length > 99" class="search-keyword">
							<span>只显示前100条结果，请完善搜索关键字</span>
						</div>
					</el-select>
				</el-form-item>
				<el-form-item label="业务类型" prop="BusinessType">
					<el-select v-model="searchObject.BusinessType" clearable placeholder="请选择业务类型" class="select-input">
						<el-option v-for="(item, index) in BusinessList" :key="index" :label="item.describe"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="参保情况" prop="SiType">
					<el-select v-model="searchObject.SiType" clearable placeholder="请选择参保情况" class="select-input">
						<el-option :label="item.describe" :value="item.value" v-for="(item, index) in SiTypeEnumlist"
							:key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="风险承担方" prop="Undertaker">
					<el-select v-model="searchObject.Undertaker" clearable placeholder="请选择风险承担方" class="select-input">
						<el-option :label="item.describe" :value="item.value"
							v-for="(item, index) in UndertakerEnumlist" :key="index"></el-option>

					</el-select>
				</el-form-item>
				<el-form-item label="提成比例" prop="Scale">
					<el-input v-model.number="searchObject.Scale" clearable placeholder="请输入提成比例" size="small"
						type="number">
						<svg-icon slot="suffix" icon-class="baifen" class-name="way" />
					</el-input>
				</el-form-item>

				<el-form-item label="人均管理费" prop="MgrFee">
					<el-select v-model="searchObject.MgrFee" clearable placeholder="请选择人均管理费" class="select-input">
						<el-option :label="item.describe" :value="item.value" v-for="(item, index) in MgrFeeEnumlist"
							:key="index"></el-option>

					</el-select>
				</el-form-item>

				<el-form-item label="启用状态" prop="Status">
					<el-select v-model="searchObject.Status" clearable placeholder="请选择启用状态" class="select-input">
						<el-option v-for="item in StatusList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" prop="Remark" class="Compensation-header">
					<el-input type="textarea" v-model="searchObject.Remark" autosize show-word-limit
						class="select-input" placeholder="请输入内容" maxlength="100" size="small">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer-multiple">
				<el-button round class="erpbtn" size="small" @click="close">取消</el-button>
				<el-button round class="erpbtn" size="small" @click="Formsave('ruleForm')">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
	import {GetCompanyPageList} from "@/api/CustomerManagement.js";
	import {
		GetProjectMgrFeeEnum,
		GetProjectSiTypeEnum,
		GetProjectUndertakerEnum,
		GetProjectBusinessType
	} from "@/api/projectManagement.js"
	import {
		GetContractTemplateBusinessType,
		GetCommisionRuleAllEnum,
		AddCommisionRule,
		EditCommisionRule,
		GetCommisionRuleInfo,
		GetBfCompanyPageList
	} from '@/api/BusinessSet.js'
	import {
		GetRiskFundProportionRulePageList,
		AddRiskFundProportionRule,
		DeleteRiskFundProportionRule,
		EditRiskFundProportionRule,
		EditRiskFundProportionRuleStatus,
		GetRiskFundProportionRuleInfo
	} from '@/api/MarketingDataManagement.js'
	import {
		MenuIdDate,
		showLoading,
		hideLoading
	} from '@/utils/CustomValidation'
	import qs from 'qs'
	export default {
		name: 'addRiskCapital', 
		components: {},
		props: ['showAddRiskCapital', 'title', 'tempData'],
		data() {
			return {
				StatusList: [{
					value: '1',
					label: '是'
				}, {
					value: '0',
					label: '否'
				}],
				searchObject: {
					Id: '',
					CompanyId: [],
					SaleType: 0,
					BusinessType: '',
					SiType: '',
					Undertaker: '',
					MgrFee: '',
					Scale: '',
					RiskBase: 0,
					Status: '',
					Remark: ''
				},
				Formrules: {
					CompanyId: [{
						required: true,
						message: '请选择启用公司',
						trigger: 'blur'
					}],
					BusinessType: [{
						required: true,
						message: '请选择业务类型',
						trigger: 'change'
					}],
					SiType: [{
						required: true,
						message: '请选择参保情况',
						trigger: 'change'
					}],
					Undertaker: [{
						required: true,
						message: '请选择风险承担方',
						trigger: 'change'
					}],
					Scale: [{
						required: true,
						message: '请输入提成比例',
						trigger: 'blur'
					}],
					MgrFee: [{
						required: true,
						message: '人均管理费',
						trigger: 'change'
					}],
					Status: [{
						required: true,
						message: '请选择启用状态',
						trigger: 'blur'
					}],
				},
				Companylist: [], // 相关客户
				BusinessList: [], //业务类型
				CommisionId: '',
				CommisionRuleEnumCommisionType: [], //提成运算方式
				CommisionRuleEnumSaleType: [], //营销人员属性
				CommisionRuleEnumCommisionBase: [], //计提方式
				CommisionRuleEnumDecreaseType: [], //结算方式
				CommisionRuleEnumRiskBase: [],
				SiTypeEnumlist: [], // 参保情况列表
				UndertakerEnumlist: [], // 风险承担列表
				MgrFeeEnumlist: [], // 人均管理费列表
				showAddPhase: false,
				showAccount: false, //+
				PhaseTitle: ''
			}
		},
		watch: {
			showAddRiskCapital(newvalue, oldvalue) {
				this.showAccount = newvalue
				this.searchObject = this.$options.data().searchObject
				if (this.title == '创建风险金比例规则') {
				} else if (this.title == '修改风险金比例规则') {
				  this.searchObject = this.tempData
				  this.searchObject.Status = this.tempData.Status + ''
				  this.Companylist = this.tempData.Companys.map(item=>({
				      Id:item.BfCompanyId,
				     Name:item.CompanyName
				  }))
				 }
				 console.log('this.Companylist',this.Companylist);
			}
		},
		created() {
			this.getType()
			this.companyMethod("")
			this.getProjectSiTypeEnum()
			this.getProjectUndertakerEnum()
			this.getProjectMgrFeeEnum()
		},
		methods: {			
			//获取模板业务类型
			getType() {
				let data = {
					menuid: MenuIdDate(),
					operationcode: '1'
				}
				GetProjectBusinessType(qs.stringify(data)).then(response => {
					if (response) {
						this.BusinessList = response
					}else {
						this.$message({
							message: response.MessageContent,
							type: "error"
						});
					}

				})				
			},
			// 获取相关客户
			companyMethod(value) {
				let obj = {
					Name: value,
					SysUserName: "",
					ContactName: "",
					StartDate: "",
					EndDate: "",
					Type: -1,
					PageIndex: 1,
					PageSize: 100,
					Status: 1,
					menuid: MenuIdDate(),
					operationcode: "1"
				};
				GetBfCompanyPageList(qs.stringify(obj)).then(response => {
					if (response.IsSuccess) {
						this.Companylist = response.Data;
					} else {
						this.$message({
							message: response.MessageContent,
							type: "error"
						});
					}
				});
			},
			// 获取人均管理费列表
			getProjectMgrFeeEnum() {
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
			// 获取风险承担列表
			getProjectUndertakerEnum() {
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
			// 获取参保情况
			getProjectSiTypeEnum() {
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
			//保存
			Formsave(form) {
				// 调用接口,保存数据
				showLoading()
				const operating = JSON.parse(localStorage.getItem('operating')) || {}
				this.$refs[form].validate((valid) => {
					if (valid) {
						if (this.title == '修改风险金比例规则') {
							let obj = {
								Id: this.searchObject.Id,
								CompanyIds: this.searchObject.CompanyId,
								BusinessType: this.searchObject.BusinessType,
								Undertaker: this.searchObject.Undertaker,
								SiType: this.searchObject.SiType,
								MgrFee: this.searchObject.MgrFee,
								Scale: this.searchObject.Scale,
								Status: this.searchObject.Status,
								Remark: this.searchObject.Remark,
								menuid: operating.MenuId,
								operationcode: operating.OperationCode
							}
							console.log(obj)
							EditRiskFundProportionRule(qs.stringify(obj)).then((response) => {
								hideLoading()
								if (response.IsSuccess) {
									this.$message({
										type: 'success',
										message: '修改风险金比例规则成功!'
									})
									this.$emit('closeRisk', false)
									this.close()
								} else {
									this.$message({
										type: 'error',
										message: response.MessageContent
									})
								}
							})
						} else {
							let obj = {
								CompanyIds: this.searchObject.CompanyId,
								BusinessType: this.searchObject.BusinessType,
								Undertaker: this.searchObject.Undertaker,
								SiType: this.searchObject.SiType,
								MgrFee: this.searchObject.MgrFee,
								Scale: this.searchObject.Scale,
								Status: this.searchObject.Status,
								Remark: this.searchObject.Remark,
								menuid: operating.MenuId,
								operationcode: operating.OperationCode
							}
							console.log(obj)
							AddRiskFundProportionRule(qs.stringify(obj)).then((response) => {
								hideLoading()
								if (response.IsSuccess) {
									this.$message({
										type: 'success',
										message: '添加风险金比例规则成功!'
									})
										this.$emit('closeRisk', false)
										this.close()
								} else {
									this.$message({
										type: 'error',
										message: response.MessageContent
									})
								}
							})
						}

					} else {
						hideLoading()
						this.$message({
							message: '请按要求填写表单内容',
							type: 'error'
						})
						return false
					}
				})
			},
			//关闭弹窗
			close() { 
				this.$emit('closeRisk', false)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/styles/publicStyle.scss";

	.el-form-item {
		margin: 0 20px 18px 0;
		width: 240px;
		float: left;

		/deep/ .el-form-item__label {
			width: 50%;
			text-align: left;
			line-height: 24px;
			color: #666666;
			float: none !important;
		}

		/deep/.el-form-item__content {
			margin-left: 0;

			.el-select {
				display: block;
			}

			.el-textarea__inner {
				background: #F0F4FA;
				border: 1px solid #F0F4FA;
				padding: 5px 46px 5px 15px !important;
			}

			.el-input__count {
				background: transparent;
				bottom: -10px;
			}

		}

	}
</style>
