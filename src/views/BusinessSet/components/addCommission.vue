//新建提成规则页面
<template>
	<div class="Compensation-box">
		<div class="From-box">
			<BreadCrumb :url-list="urlList" />
			<div class="From-box-content">
				<el-form ref="ruleForm" :model="searchObject" :rules="Formrules" class="forms-Compensation">
					<div class="form-cont">
						<el-row :gutter="64">
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="规则名称" prop="RuleName" class="Compensation-header">
									<el-input v-model="searchObject.RuleName" clearable size="small" placeholder="请选择规则名称" />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="规则属性" prop="RuleProperties" class="Compensation-header">
									<el-select v-model="searchObject.RuleProperties" clearable placeholder="请选择规则属性" size="mini"
										class="select-input">
										<el-option v-for="item in CommisionRulePropertiesEnum" :key="item.value"
											:label="item.describe" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="searchObject.RuleProperties=='1'">
								<el-form-item label="规则启用周期" prop="RuleEnablingPeriod" class="Compensation-header">
									<el-date-picker v-model="searchObject.RuleEnablingPeriod"  type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" class="select-picker">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="启用公司" prop="CompanyIds" class="Compensation-header">
									<el-select v-model="searchObject.CompanyIds" remote clearable multiple placeholder="请选择启用公司"
										size="mini" class="select-input"  >
										<el-option v-for="item in enableCompanyList" :key="item.Name" :label="item.Name" :value="item.Id" />
										<div v-if="enableCompanyList.length > 99" class="search-keyword">
											<span>只显示前100条结果，请完善搜索关键字</span>
										</div>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="提成业务类型" prop="RulebusinessType" class="Compensation-header">
									<el-select v-model="searchObject.RulebusinessType" clearable placeholder="请选择提成业务类型" size="mini"
										class="select-input">
										<el-option v-for="item in CommisionRulebusinessTypeEnum" :key="item.describe"
											:label="item.describe" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="营销人员属性" prop="RuleSaleType" class="Compensation-header">
									<el-select v-model="searchObject.RuleSaleType" clearable placeholder="请选择营销人员属性" size="mini"
										class="select-input">
										<el-option v-for="item in CommisionRuleEnumSaleType" :key="item.describe"
											:label="item.describe" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="是否为关联方客户" prop="IsRelation" class="Compensation-header">
									<el-select v-model="searchObject.IsRelation" clearable placeholder="请选择是否为关联方客户"
										class="select-input">
										<el-option v-for="item in relevancyList" :key="item.value"
											:label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row >  
					</div>
					<div class="form-cont" v-if="searchObject.RulebusinessType===0">
						<el-row :gutter="64">
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="招聘计提类型" prop="RecruitmentAccrualType" class="Compensation-header">
									<el-select v-model="searchObject.RecruitmentAccrualType" clearable placeholder="请选择是否为关联方客户"
										class="select-input">
										<el-option v-for="item in CommisionRuleEnumCommisionBase" :key="item.value"
											:label="item.describe" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="招聘渠道类型" prop="RecruitmentChannelType" class="Compensation-header">
									<el-select v-model="searchObject.RecruitmentChannelType" clearable placeholder="请选择是否为关联方客户"
										class="select-input">
										<el-option v-for="item in ditchList" :key="item.value"
											:label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="入职标准" prop="EntryCriteria" class="Compensation-header">
									<el-select v-model="searchObject.EntryCriteria" clearable placeholder="请选择是否为关联方客户"
										class="select-input">
										<el-option v-for="item in EntryCriteriaEnum" :key="item.value"
											:label="item.describe" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="招聘计提方式" prop="RecruitmentAccrualMethod" class="Compensation-header">
									<el-select v-model="searchObject.RecruitmentAccrualMethod" clearable placeholder="" class="select-input">
										<el-option v-for="item in RecruitmentAccrualTypeList" :key="item.value"
											:label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if='searchObject.RecruitmentAccrualMethod'>
								<el-form-item :label="searchObject.RecruitmentAccrualMethod == '0'?'按人天':'按人数'" prop="Person1People1Sky1" class="Compensation-header" >
									<div style="width:438px; display: flex;" >
										<el-select v-model="searchObject.AccrualOperation" clearable placeholder="请选择是否为关联方客户" style="width:200px; margin-right:10px" class="select-input tops">
											<el-option v-for="item in OperationEnum" :key="item.value"
												:label="item.describe" :value="item.value">
											</el-option>
										</el-select>
										<el-input v-model="searchObject.AccrualP" type="number"  size="small" placeholder="" style="width:105px;margin-right:10px"  ><i slot="suffix" style="font-style:normal;color:#000000">人</i></el-input>
										<el-input v-model="searchObject.AccrualD" type="number"  size="small" placeholder="" style="width:105px" v-if="searchObject.RecruitmentAccrualMethod == '0'" ><i slot="suffix" style="font-style:normal;color:#000000">天</i></el-input>
									</div>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="奖励金额" prop="RewardAmount" class="Compensation-header">
									<el-input v-model="searchObject.RewardAmount" type="number" clearable size="small" placeholder="" ><i slot="suffix" style="font-style:normal;color:#000000">元</i></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="是否设置奖励封顶" prop="RewardCapping" class="Compensation-header">
									<el-select v-model="searchObject.RewardCapping" clearable placeholder=""
										class="select-input">
										<el-option v-for="item in relevancyList" :key="item.value"
											:label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if='searchObject.RewardCapping=="1"'>
								<el-form-item :label="searchObject.RecruitmentAccrualMethod == '0'?'按人天':'按人数'" prop="Person2People2Sky2" class="Compensation-header">
									<div style="width:438px; display: flex;">
										<el-select v-model="searchObject.CappingOperation" clearable placeholder="" style="width:200px; margin-right:10px" class="select-input tops">
											<el-option v-for="item in OperationEnum" :key="item.value"
												:label="item.describe" :value="item.value">
											</el-option>
										</el-select>
										<el-input v-model="searchObject.CappingP" type="number"  size="small" placeholder="" style="width:105px;margin-right:10px"  ><i slot="suffix" style="font-style:normal;color:#000000">人</i></el-input>
										<el-input v-model="searchObject.CappingD" type="number"  size="small" placeholder="" style="width:105px" v-if="searchObject.RecruitmentAccrualMethod == '0'"><i slot="suffix" style="font-style:normal;color:#000000">天</i></el-input>
									</div>
								</el-form-item>
							</el-col>
							 <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
								<el-form-item label="备注" class="text">
									<el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="searchObject.Remark"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<div class="form-cont" v-if="searchObject.RulebusinessType!=0 && searchObject.RulebusinessType!=''">
						<el-row :gutter="64">
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="计提方式" prop="AccrualMethod" class="Compensation-header">
									<el-select v-model="searchObject.AccrualMethod" clearable placeholder="" class="select-input">
										<el-option v-for="item in CommisionRuleEnumCommisionBase" :key="item.value"
											:label="item.describe" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="提成运算方式" prop="CommissionCalculationMethod" class="Compensation-header">
									<el-select v-model="searchObject.CommissionCalculationMethod" clearable placeholder="" class="select-input">
										<el-option v-for="item in CommisionRuleEnumCommisionType" :key="item.value"
											:label="item.describe" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="提成比例/金额" prop="ProportionalOrAmount" class="Compensation-header">
									<el-input v-model="searchObject.ProportionalOrAmount" type="number" clearable size="small" placeholder="" ></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="提成结算方式" prop="CommissionSettlementMethod" class="Compensation-header">
									<el-select v-model="searchObject.CommissionSettlementMethod" clearable placeholder="" class="select-input">
										<el-option v-for="item in CommisionRuleEnumDecreaseType" :key="item.value"
											:label="item.describe" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<div v-if="searchObject.CommissionSettlementMethod=='1'">
								<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
									<el-form-item label="递减比例/金额" prop="DecreasingOrAmount" class="Compensation-header">
										<el-input v-model="searchObject.DecreasingOrAmount" clearable size="small" placeholder="" ></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
									<el-form-item label="递减最小比例/值" prop="DecreasingValue" class="Compensation-header">
										<el-input v-model="searchObject.DecreasingValue" clearable size="small" placeholder="" ></el-input>
									</el-form-item>
								</el-col>
							</div>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="预扣风险金计提方式" prop="WithdrawalMethod" class="Compensation-header">
									<el-select v-model="searchObject.WithdrawalMethod" clearable placeholder="" class="select-input">
										<el-option v-for="item in WithdrawalMethodEnum" :key="item.value"
											:label="item.describe" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="预扣风险金运算方式" prop="WithdrawalOperationMethod" class="Compensation-header">
									<el-select v-model="searchObject.WithdrawalOperationMethod" clearable placeholder="" class="select-input">
										<el-option v-for="item in CommisionRuleEnumCommisionType" :key="item.value"
											:label="item.describe" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
								<el-form-item label="预扣风险金比例/金额" prop="WithdrawalProportionalOrAmount" class="Compensation-header">
									<el-input v-model="searchObject.WithdrawalProportionalOrAmount" clearable size="small" placeholder="" ></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<div class="form-cont">
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item  label="启用状态" prop="Status">
								<el-radio-group v-model="searchObject.Status">
									<el-radio :label="1">启用</el-radio>
									<el-radio :label="0">禁用</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</div>

					
					<div class="footer-button">
						<el-button class="operation-button" type="primary" @click="cancel">取消</el-button>
						<el-button class="operation-button" type="primary" @click="Formsave('ruleForm')">保存</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
	import {
		GetBfCompanyPageList,
		GetContractTemplateBusinessType,
		GetCommisionRuleAllEnum,
		AddCommisionRule,
		EditCommisionRule,
		GetCommisionRuleInfo
	} from '@/api/BusinessSet.js'
	import {
		MenuIdDate,
		showLoading,
		hideLoading
	} from '@/utils/CustomValidation'
	import qs from 'qs'
	export default {
		components: {
			BreadCrumb
		},
		data() {
			var checkPerson1People1Sky1  = (rule, value, callback) => {
			    let {AccrualOperation,AccrualP,AccrualD,RecruitmentAccrualMethod}=this.searchObject
				if (AccrualOperation === "" || AccrualP=='' || AccrualD=='') {
					if(RecruitmentAccrualMethod=='0'){
                        callback(new Error("按人天"));
					}else{
						callback(new Error("按人天数"));
					}
				} else {
					callback();
				}
			};
			var checkPerson2People2Sky2 = (rule, value, callback) => {
				let {CappingOperation,CappingP,CappingD,RecruitmentAccrualMethod}=this.searchObject
				if (CappingOperation === "" || CappingP=='' || CappingD=='') {
					if(RecruitmentAccrualMethod=='0'){
                        callback(new Error("按人天"));
					}else{
						callback(new Error("按人天数"));
					}
				} else {
					callback();
				}
			};
		
			return {
				urlList: [{name: '营销提成规则设置',router: '/BusinessSet/MarketingCommissionRules'}, {name: '新建营销提成规则',router: ''}],
				searchObject: {
					RuleName: '',
                    RuleProperties:'',
					RuleEnablingPeriod:'',//规则启用周期
					CompanyIds:[],
					RulebusinessType:'',
					RuleSaleType:'',
					IsRelation:'',
					Status:'',
					
					// CommisionRuleId:'',
					RecruitmentAccrualType:'',
					RecruitmentChannelType:'',
					EntryCriteria:'',
					RecruitmentAccrualMethod:"",
					AccrualOperation:'',
					AccrualP:'',
					AccrualD:'',
					RewardAmount:'',
					RewardCapping:'',
					CappingOperation:'',
					CappingP:'',
					CappingD:'',
					Remark:'',

					AccrualMethod:'',//计提方式
					CommissionCalculationMethod:'',//提成运输方式
					ProportionalOrAmount:'',//提成比例
					CommissionSettlementMethod:'',//提成结算方式
					DecreasingOrAmount:'',//递减比例/金额
					DecreasingValue:'',//递减最小比例/值
					WithdrawalMethod :'',//预扣风险金计提方式
					WithdrawalOperationMethod:'',//预扣风险金运算方式
					WithdrawalProportionalOrAmount:'',//预扣风险金比例/金额

					Status:1,//启用状态
				},
				Formrules: {
					RuleName: [{required: true, message: '请输入规则名称', trigger: 'blur'} ],
					RuleProperties: [{required: true, message: '请选择规则属性', trigger: 'change'}],
					RuleEnablingPeriod: [{required: true, message: '请选择规则启用周期', trigger: 'change'}],
					CompanyIds: [{required: true, message: '请选择启用公司', trigger: 'blur'} ],
					RulebusinessType: [{required: true, message: '提成业务类型', trigger: 'change'}],
					RuleSaleType: [{required: true, message: '请选择营销人员属性', trigger: 'change'}],
					IsRelation: [{required: true, message: '是否为关联方客户', trigger: 'change'}],
                    
					AccrualMethod: [{required: true, message: '招聘计提类型', trigger: 'change'}],
					RecruitmentChannelType: [{required: true, message: '招聘渠道类型', trigger: 'change'}],
					EntryCriteria:[{required: true, message: '入职标准', trigger: 'change'}],
					RecruitmentAccrualMethod:[{required: true, message: '招聘计提方式', trigger: 'change'}],
					RewardAmount :[{required: true, message: '奖励金额', trigger: 'change'}],
					RewardCapping:[{required: true, message: '是否设置奖励封顶', trigger: 'change'}],
					Person1People1Sky1:[{required: true,  validator: checkPerson1People1Sky1, trigger: 'change'}],
					Person2People2Sky2:[{required: true,  validator: checkPerson2People2Sky2, trigger: 'change'}],

					provisionType:[{required: true, message: '计提方式', trigger: 'change'}],
					CommissionCalculationMethod:[{required: true, message: '提成运输方式', trigger: 'change'}],
					ProportionalOrAmount:[{required: true, message: '提成比例/金额', trigger: 'change'}],
					CommissionSettlementMethod:[{required: true, message: '提成结算方式', trigger: 'change'}],
					DecreasingOrAmount:[{required: true, message: '递减比例金额', trigger: 'change'}],
					DecreasingValue:[{required: true, message: '递减最小比例/值', trigger: 'change'}],
					WithdrawalMethod:[{required: true, message: '预扣风险金计提方式', trigger: 'change'}],
					WithdrawalOperationMethod:[{required: true, message: '预扣风险金运算方式', trigger: 'change'}],
					WithdrawalProportionalOrAmount:[{required: true, message: '预扣风险金比例/金额', trigger: 'change'}],

                    Status:[{required: true, message: '启用状态', trigger: 'change'}],
				},
				
				CommisionRuleId:'',
				ditchList:[{label:'内部全员招聘', value:0},{label:'外部招聘渠道', value:1}],
				RecruitmentAccrualTypeList:[{label:'按人天(人/天)', value:'0'},{label:'按人数(人)', value:'1'}],
				relevancyList: [{value: 0,label: '否'}, {value: 1,label: '是'}],
				period: [new Date(), new Date()],
				enableCompanyList: [],//启用公司

				CommisionId: '',
				CommisionRuleEnumCommisionType: [], //提成运算方式
				CommisionRuleEnumSaleType: [], //营销人员属性
				CommisionRuleEnumCommisionBase: [], //计提方式
				CommisionRuleEnumDecreaseType: [{describe:'固定比例持续性结算', value:0},{describe:'逐年递减结算', value:1}], //结算方式
				CommisionRuleEnumRiskBase: [],
				CommisionRuleEnumRiskType:[],
				CommisionRulePropertiesEnum:[],
				CommisionRulebusinessTypeEnum:[],
				EntryCriteriaEnum:[],//入职标准
				WithdrawalMethodEnum:[],//
				OperationEnum:[],//按人天

				showAddPhase: false,
				PhaseTitle: ''
			}
		},
		created() {
			this.getType()
			this.CompanyMethod()
			if (this.$route.query && this.$route.query.Id) {
				this.urlList[1].name = '修改营销提成规则'
				this.CommisionId = this.$route.query.Id
				this.getCommisionDetal(this.CommisionId)
			} else {
				this.urlList[1].name = '新建营销提成规则'
			}
		},
		methods: {
			
			//启用公司
			CompanyMethod() {
				let obj = {
					Name: '',
					Status: 1,
					PageIndex: 1,
					PageSize: 100,
					Level: -1,
					menuid: MenuIdDate(),
					operationcode: "1"
				};
				GetBfCompanyPageList(qs.stringify(obj)).then(response => {
					if (response.IsSuccess) {
					this.enableCompanyList = response.Data;
					} else {
					this.$message({
						message: response.MessageContent,
						type: "error"
					});
					}
				});
			},
			//获取模板业务类型
			getType() {
				let data = {
					menuid: MenuIdDate(),
					operationcode: '1'
				}
				GetCommisionRuleAllEnum(qs.stringify(data)).then(response => {
					if (response) {
						// this.enableCompanyList = response.CommisionRuleEnumBusinessType
						this.CommisionRuleEnumCommisionBase = response.CommisionRuleEnumCommisionBase
						this.CommisionRuleEnumSaleType = response.CommisionRuleEnumSaleType
						this.CommisionRuleEnumCommisionType = response.CommisionRuleEnumCommisionType
						// this.CommisionRuleEnumDecreaseType = response.CommisionRuleEnumDecreaseType
						this.CommisionRuleEnumRiskBase = response.CommisionRuleEnumRiskBase;
						this.CommisionRuleEnumRiskType = response.CommisionRuleEnumRiskType;
						this.CommisionRulePropertiesEnum = response.CommisionRulePropertiesEnum;
						this.CommisionRulebusinessTypeEnum = response.CommisionRulebusinessTypeEnum;
						this.EntryCriteriaEnum = response.EntryCriteriaEnum;
						this.WithdrawalMethodEnum = response.WithdrawalMethodEnum;
						this.OperationEnum = response.OperationEnum
					}

				})
			},
			//编辑获取数据
			getCommisionDetal(Id) {
				let data = {
					Id: Id,
					menuid: MenuIdDate(),
					operationcode: '1'
				}
				GetCommisionRuleInfo(qs.stringify(data)).then(response => {
					if (response.IsSuccess && response.Data) {
					    var data=response.Data.CommisionRuleInfo, CompanyList=[];
						data.Companys.map(v=>{
							CompanyList.push(v.BfCompanyId)
						})
						
						this.searchObject={
                            RuleName: data.RuleName,
							RuleProperties:data.RuleProperties,
							RuleEnablingPeriod:[data.AddTime, data.BeginTime],
							CompanyIds:CompanyList,
							RulebusinessType:data.RulebusinessType,
							RuleSaleType:data.RuleSaleType,
							IsRelation:data.IsRelation,
							Status:data.Status,//启用状态

							RecruitmentAccrualType:data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.RecruitmentAccrualType:'',
							RecruitmentChannelType:data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.RecruitmentChannelType:'',//招聘渠道类型
							EntryCriteria : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.EntryCriteria:'',//入职标准
							RewardAmount : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.RewardAmount:'',//奖励金额
							RecruitmentAccrualMethod : data.CommisionRuleFullRecruitment?String(data.CommisionRuleFullRecruitment.RecruitmentAccrualMethod):'', //是否设置奖励封顶
							AccrualOperation : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.AccrualOperation:'',//安人天
							AccrualP : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.AccrualP:'',
							AccrualD : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.AccrualD:'',//天
							CappingOperation : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.CappingOperation:'',
							CappingP : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.CappingP:'',
							CappingD : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.CappingD:'',
							RewardCapping : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.RewardCapping:'',
							Remark : data.CommisionRuleFullRecruitment?data.CommisionRuleFullRecruitment.Remark:'',//备注

							AccrualMethod : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.AccrualMethod:'',
							CommissionCalculationMethod : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.CommissionCalculationMethod:'',
							ProportionalOrAmount : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.ProportionalOrAmount:'',
							CommissionSettlementMethod : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.CommissionSettlementMethod:'',
							DecreasingOrAmount : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.DecreasingOrAmount:'',
							DecreasingValue : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.DecreasingValue:'',
							WithdrawalMethod : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.WithdrawalMethod:'',
							WithdrawalOperationMethod : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.WithdrawalOperationMethod:'',
							WithdrawalProportionalOrAmount : data.CommisionRuleOtherBusinessType?data.CommisionRuleOtherBusinessType.WithdrawalProportionalOrAmount:''
						}
						if(data.CommisionRuleFullRecruitment){
							this.CommisionRuleId=data.CommisionRuleFullRecruitment.CommisionRuleId		
						}
						if(data.CommisionRuleOtherBusinessType){
							this.CommisionRuleId=data.CommisionRuleOtherBusinessType.CommisionRuleId		
						}
						
						// this.searchObject = response.Data.CommisionRuleInfo
						// this.searchObject.Status += ''
					} else {
						this.$message({
							type: 'error',
							message: response.MessageContent
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
						let {RuleName, RuleProperties, RuleEnablingPeriod, CompanyIds, RulebusinessType, RuleSaleType,
						IsRelation, Status, RecruitmentAccrualType, RecruitmentChannelType, EntryCriteria, RecruitmentAccrualMethod, 
						AccrualOperation, AccrualP, AccrualD, RewardAmount, RewardCapping, CappingOperation, CappingP, CappingD,
						Remark, AccrualMethod, CommissionCalculationMethod, ProportionalOrAmount, CommissionSettlementMethod, 
						DecreasingOrAmount, DecreasingValue, WithdrawalMethod, WithdrawalOperationMethod, WithdrawalProportionalOrAmount}=this.searchObject, CommisionRuleFullRecruitment={}, CommisionRuleOtherBusinessType={};
						console.log(this.searchObject)
						if(!RecruitmentAccrualMethod){
							AccrualOperation='';
							AccrualP='';
							AccrualD=''	
						}else if(RecruitmentAccrualMethod != '0'){
							AccrualD=''
							CappingD=''
						}
						if(RewardCapping!="1"){
							CappingOperation='';
							CappingP='';
							CappingD=''
						}else if(RecruitmentAccrualMethod != '0'){
							AccrualD=''
							CappingD=''
						}
						if(RulebusinessType=='0'){
							CommisionRuleFullRecruitment={
								"CommisionRuleId": this.CommisionRuleId,
								"RecruitmentAccrualType": RecruitmentAccrualType,
								"RecruitmentChannelType": RecruitmentChannelType,
								"EntryCriteria": EntryCriteria,
								"RecruitmentAccrualMethod": RecruitmentAccrualMethod,
								"AccrualOperation": AccrualOperation,
								"AccrualP": AccrualP,
								"AccrualD": AccrualD,
								"RewardAmount": RewardAmount,
								"RewardCapping": RewardCapping,
								"CappingOperation": CappingOperation,
								"CappingP": CappingP,
								"CappingD":CappingD,
								"Remark":  Remark
							}
						}else{
							CommisionRuleOtherBusinessType={
								"CommisionRuleId": this.CommisionRuleId,
								"AccrualMethod": AccrualMethod,
								"CommissionCalculationMethod": CommissionCalculationMethod,
								"ProportionalOrAmount": ProportionalOrAmount,
								"CommissionSettlementMethod":CommissionSettlementMethod,
								"DecreasingOrAmount":DecreasingOrAmount,
								"DecreasingValue": DecreasingValue,
								"WithdrawalMethod": WithdrawalMethod,
								"WithdrawalOperationMethod": WithdrawalOperationMethod,
								"WithdrawalProportionalOrAmount": WithdrawalProportionalOrAmount
							}
						}
						let obj={
							"RuleName": RuleName,
							"RuleProperties": RuleProperties,
							"BeginTime": RuleEnablingPeriod[0] || '',
							"EndTime":RuleEnablingPeriod[1] || '',
							"CompanyIds": CompanyIds,
							"RulebusinessType": RulebusinessType,
							"RuleSaleType": RuleSaleType,
							"IsRelation": IsRelation,
							"IsDelete": 0,
							"SysUserId": 0,
							"Status": Status,
							"CommisionRuleFullRecruitment": CommisionRuleFullRecruitment || null,
							"CommisionRuleOtherBusinessType": CommisionRuleOtherBusinessType || null,
							'menuid': operating.MenuId,
							'operationcode': operating.OperationCode
						}
						console.log(JSON.stringify(obj))
						//return
						if (this.CommisionId) {
							// let obj = {
							// 	'EditCommisionRuleDtoInfo': this.searchObject,
							// 	'menuid': operating.MenuId,
							// 	'operationcode': operating.OperationCode
							// }
							EditCommisionRule(qs.stringify(obj)).then((response) => {
								hideLoading()
								if (response.IsSuccess) {
									this.$message({
										type: 'success',
										message: '修改营销提成计算规则成功!'
									})
									setTimeout(() => {
										this.$router.push('/BusinessSet/MarketingCommissionRules')
									}, 2000)
								} else {
									this.$message({
										type: 'error',
										message: response.MessageContent
									})
								}
							})
						} else {
							// let obj = {
							// 	'AddCommisionRuleDtoInfo': this.searchObject,
							// 	'menuid': operating.MenuId,
							// 	'operationcode': operating.OperationCode
							// }
							AddCommisionRule(qs.stringify(obj)).then((response) => {
								hideLoading()
								if (response.IsSuccess) {
									this.$message({
										type: 'success',
										message: '新增营销提成计算规则成功!'
									})
									setTimeout(() => {
										this.$router.push('/BusinessSet/MarketingCommissionRules')
									}, 2000)
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
			//取消操作
			cancel() {
				this.$router.go(-1)
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/styles/publicStyle.scss";
	.tops /deep/ .el-input__suffix{
		top:0px !important;
	}
	.tops /deep/ .el-input{width: 200px;}
	/deep/ .el-select__tags{margin-top: 20px;}
	 // 文本框样式
    .text {
        /deep/ .el-form-item__content {
          max-width: 100%;
        /deep/ .el-textarea__inner {
            background-color: $erinputbgc;
          }
        /deep/ .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
    }
    .flex{
		display: flex;
		align-items: center;
	}
	.Compensation-box {
		margin-left: 24px;
	}

	.From-box-content {
		margin-top: 24px;
		background: #fff;
		overflow: hidden;

		.forms-Compensation {
			margin: 40px;

			/deep/ .Compensation-header {
				display: inline-block;
				.select-picker{
					background-color: $erinputbgc;
					border: none;
					width: inherit;
				}
				input {
					background: $erinputbgc;
					border: none;
					height: 40px;
					line-height: 40px;
				}
			}

			.el-form-item {
				min-width: 435px;
				margin: 0 50px;
				margin-bottom: 15px;

				.el-form-item__label {
					width: 50%;
					text-align: left;
					line-height: 24px;
					color: #666666;
				}

				.el-form-item__content {
					margin-left: 0;
					width: 435px;

					.el-select {
						display: block;

						/deep/ .el-input__suffix {
							top: 20px;
						}
					}
				}
			}

			/deep/ .State {
				display: inline-block;

				.el-radio-group {
					display: block;
					margin-top: 50px;

					label {
						display: inline-block;
					}
				}
			}

			.footer-button {
				margin: 100px 0 200px 0;
				text-align: center;

				button {
					margin: 0 12px;
				}
			}
		}
	}
</style>
