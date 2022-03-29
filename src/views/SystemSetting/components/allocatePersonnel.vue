//配置人员
<template>
	<div class="tag-container">
		<el-dialog :close-on-click-modal="false" title="配置人员" class="dialog-box" append-to-body :visible.sync="showAddList"
			:show-close="false" :destroy-on-close="true" width="480px" @close="close">
			<!-- <h2>配置人员</h2> -->
			<i class="el-icon-circle-close closeButton" @click="close"></i>
			<el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
				<!-- <el-form-item>
        <span>选择分组成员：</span><div clearable size="small" class="smallIpt" ref="ipuValue">
          <el-tag
          :key="tag.id"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          ref="tags"
          @close="handleClose(tag)">
          {{tag.name}} 
          </el-tag>
        </div>
       <el-scrollbar style="height:400px;width:100%">
          <el-tree :props="props" :data="treeList" :current-node-key="keys" :node-key="treeList.orgId" render-after-expand :expand-on-click-node="true" show-checkbox  @check-change="handleCheckChange" empty-text="暂无数据" class="trees" ref="tree" >
        </el-tree>
       </el-scrollbar>
        </el-form-item> -->
				<el-form-item>
					<SelectTree size="small" :data="treeList" clearable checkStrictly :defaultKey="treeData"
						@getValue="setTreeMenu"></SelectTree>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-row>
					<el-button type="primary" @click="close"  class="clickBtn">取消</el-button>
					<el-button type="primary" @click="dialogtrue('ruleForm')" class="clickBtn">保存</el-button>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import SelectTree from './SelectTree.vue'
	// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
	import {
		GetSysGroup,
		GetSysOrgListAndUserInfoMerge
	} from '@/api/SystemSetting.js'
	import {
		copy,
		MenuIdDate,
		showLoading,
		hideLoading
	} from '@/utils/CustomValidation.js'
	import axios from 'axios'
	import qs from 'qs'
	export default {
		name: 'allocatePersonnel',
		props: {
			treeData: Array,
			treeList: Array,
			showAddList: Boolean
		},
		components: {
			SelectTree
		},
		watch: {
			treeList() {
				if (this.treeList.length > 0)
					console.log(this.treeList);
				this.newarray = this.upAndDown2(this.treeList)
			},
			showAddList() {
				if (this.showAddList == false) {
					this.UserIds = [],
						this.dynamicTags = []
				}
			},
		},
		data() {
			return {
				UserIdArr: [],
				newarray: [], // 处理过的数据树状图数据
				treeDatas: [],
				UserIds: [],
				// // 树状图对应数据
				// normalizer2(node) {
				//   return {
				//     id: node.userId,
				//     label: node.name,
				//     children: node.children
				//   }
				// },
				TreeData: [],
				SelectNode: false,
				dynamicTags: [],
				keys: '',
				dataObject: {
					Id: '',
					Name: '',
					RoleName: '',
					Remark: '',
					Sort: 0,
				},
				showData: '',
				props: {
					label: 'name',
					children: 'children',
					isLeaf: 'leaf'
				},
				treeshow: false,
				count: 1,
				SystemAppList: [],
				showList: false,
				Formrules: {
					// dynamicTags: [
					//   // { required: true, message: '请选择分组成员', trigger: 'change' }
					// ]
				}
			}
		},
		methods: {
			setTreeMenu(key, data) { //获取子组件值
				this.UserIds = key
			},
			// 删除数据的空children
			upAndDown2(arr) {
				arr.forEach(obj => {
					if (!obj.userId) {
						obj.userId = 'a' + obj.orgId
					}
					if (obj.children.length <= 0) {
						delete obj.children
						return
					} else {
						this.upAndDown2(obj.children)
					}

				})
			},
			lookinput(value, instanceId) {
				let array = copy(value)
				for (let i = 0; i < value.length; i++) {
					if ((value[i] + '').indexOf('a') > -1) {
						array.splice(i, 1)
					}
				}
				this.$nextTick(() => {
					this.customerform.UserIdArr = array
				})
			},


			dialogtrue() {
				// 调用接口,保存数据
				if (this.UserIds.length > 0) {
					let obj = {
						UserIds: this.UserIds
					}
					this.$emit('DialogSave', obj)
				} else {
					this.$message({
						message: '请先选择分组成员',
						type: 'error'
					})
					return false
				}
			},
			close() {
				this.dynamicTags = []
				this.$emit('exit', false)
			}
		}
	}
</script>
<style lang="scss" scoped>
	// @import "@/styles/publicStyle.scss";
	.forms {
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

			/deep/.el-form-item__content {
				// max-width: 336px;
				width: 100%;
				max-height: 50vh;
				overflow: auto;

				.el-input__inner {
					background-color: $erinputbgc;
				}

				.el-select {
					width: 100%;

					.el-input {
						.el-input__inner {
							height: 36px;
							line-height: 36px;
						}
					}

					.el-input__suffix {
						height: 40px;
						line-height: 40px;
					}
				}

				.el-input {
					font-size: 14px;

					.el-input__inner {
						height: 36px;
						line-height: 36px;
					}

					.el-input__suffix {
						height: 36px;
						line-height: 36px;
					}
				}
			}

			// vue-tree-input样式
			&.vue-tree {
				.el-form-item__content {
					.vue-treeselect {
						height: 36px;

						.vue-treeselect__control {
							height: 36px;
							border-color: #cfcfcf;

							&:hover {
								border-color: #cfcfcf !important;
							}

							background-color: $erinputbgc;

							.vue-treeselect__value-container {
								height: 36px;

								.vue-treeselect__placeholder {
									font-size: 14px;
									color: #a3b1cc;
									line-height: 34px;
									margin-left: 5px;
								}
							}

							.vue-treeselect__control-arrow-container {
								height: 36px;
							}
						}
					}
				}

				&.multiples {
					.el-form-item__content {
						.vue-treeselect {
							height: auto;
						}
					}
				}
			}

			// 添加客户关联关系样式
			&.addrelation {
				.el-form-item__content {
					>span {
						cursor: pointer;

						>.svg-icon {
							margin-right: 10px;

							&.add {
								color: #fff;
								vertical-align: text-top;
								font-size: 20px;
							}
						}
					}
				}
			}

			// // 底部添加按钮
			// &.bottom {
			//   .el-form-item__content {
			//     text-align: center;
			//     max-width: 100%;
			//     .el-button+.el-button {
			//       margin-left: 24px;
			//     }
			//   }
			// }
		}

		.smallIpt {
			height: 42px;
			width: 75% !important;
			display: inline-block;
			border: 1px solid #666666;
			overflow: hidden;
			// display: inline-block !important;
			float: right !important;
		}

		/deep/ .el-form-item {
			margin-bottom: 12px;

			.el-form-item__label {
				width: 50%;
				text-align: left;
				line-height: 24px;
				color: #666666;
			}

			.trees {
				width: 80% !important;
				float: right !important;
			}

			.el-form-item__content {
				margin-left: 0;
				width: 100%;

				.el-select {
					display: block;

					.el-input__suffix {
						height: 40px;
					}
				}
			}
		}
	}

	.dialog-footer {
		.clickBtn {
			width: 47% !important;
			line-height: 17px !important;
			text-align: center;
		}

		.clickBtn:first-child {
			float: left;
		}
	}
	
	
	
</style>
