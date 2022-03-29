客户合同管理
<!-- <el-form ref="ruleForm" class="forms" :model="dynamicValidateForm">
              <div class="BlockBox" v-for="(domain, index) in dynamicValidateForm.domains" :value="domain.value" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
       required: true, message: '金额不能为空', trigger: 'blur'
       }">
                <el-form-item label="选择已认领回款流水" class="Date" style="display:inline-block;">
                  <el-select remote filterable class="texts" v-model="domain.Id" @change="SelectChange(index,domain.Id)" clearable>
                    <el-option v-for="item in optionList" :key="item.Id" :disabled="item.disabled" :value="item.Id" :label="item.ProjectName"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="Date" label="可使用回款流水金额" style="display:inline-block;">
                  <el-input v-model="domain.value" class="texts" @blur="moneyChanges(domain)"></el-input>
                </el-form-item>
                <el-form-item label="发票附件" clearable class="File-item" style="display:inline-block">
                  <el-button type="primary" class="upload-bts" :loading="uploadLoading">上传文件</el-button>
                  <input type="file" accept=".png,.jpg," name="fileUrl" class="FileButton" @change="uploadFile($event,index)">
                </el-form-item>
                <div class="pstBox">
                  <i class="el-icon-circle-plus-outline AddIpt" v-if="index==0" @click="addDomain(index)"></i>
                  <i class="el-icon-remove-outline AddIpt" v-if="index>0" @click="reduceDomain(index)"></i>
                </div>
              </div>
              <div style="margin-left: 10px;font-size: 12px;">上传格式jpg、png格式文件，文件大小不超过5M</div>
            </el-form> -->