<!-- 添加客户 -->
<template>
  <div class="update-customer-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="customerform" label-position="top" :model="customerform" :rules="rules" label-width="140px" class="customerform">
        <div class="form-title">基本信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Name" label="客户单位名称" prop="Name">
                <el-input v-model="customerform.Name" clearable></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item :label="CodeName" prop="Code">
                <el-select v-model="customerform.Code" :disabled="isupdate" remote filterable clearable placeholder="搜索或选择客户所属公司" :remote-method="CompanyMethod" @clear="CompanyMethod('')">
                  <el-option :label="item.Name" :value="item.Code" v-for="(item, index) in Companylist" :key="index"></el-option>
                  <div v-if="Companylist.length > 99" class="search-keyword">
                    <span>只显示前100条结果，请完善搜索关键字</span>
                  </div>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户单位简称">
                <el-input v-model="customerform.ShortName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="CertNo" label="统一社会信用代码" prop="CertNo">
                <el-input v-model="customerform.CertNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="IsRelation" label="是否为关联方客户" prop="IsRelation">
                <el-select v-model="customerform.IsRelation" clearable placeholder="请选择是否为关联方客户">
                  <el-option :label="item.Name" :value="item.value" v-for="(item, index) in IsRelationList" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="BusinessTypeArr" label="业务报备类型" prop="BusinessTypeArr">
                <el-select v-model="customerform.BusinessTypeArr" multiple clearable filterable placeholder="请选择业务报备类型">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in BusinessTypelist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="合作类型">
                <el-select v-model="customerform.CorpType" clearable filterable placeholder="请选择合作类型">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in EnumCorpTypelist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="单位性质">
                <el-select v-model="customerform.Nature" filterable clearable placeholder="请选择单位性质">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in EnumNaturelist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="所属行业" class="vue-tree">
                <treeselect ref="trees3" v-model="customerform.IndustryId" :normalizer="normalizer1" placeholder="搜索或选择行业" :default-expand-level="1" :disable-branch-nodes="true" :options="getIndustrtList" @input="selectIndustryId" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户公司规模">
                <el-select v-model="customerform.Size" filterable clearable placeholder="搜索或选择客户公司规模">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in EnumSizelist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户等级">
                <el-select v-model="customerform.Level" placeholder="请选择客户等级" clearable>
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in EnumLevellist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公司电话">
                <el-input v-model="customerform.Tel" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户拥有者">
                <el-select v-model="customerform.SysUserId" remote filterable clearable placeholder="搜索或选择客户拥有者" :remote-method="SysUserMethod" @clear="SysUserMethod('')">
                  <el-option :label="item.UserName" :value="item.Id" v-for="(item, index) in SysUserlist" :key="index"></el-option>
                  <div v-if="SysUserlist.length > 99" class="search-keyword">
                    <span>只显示前100条结果，请完善搜索关键字</span>
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户公司邮箱">
                <el-input v-model="customerform.Email" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户公司传真">
                <el-input v-model="customerform.Fax" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户公司邮编">
                <el-input v-model="customerform.Zip" clearable></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="NC客户编码">
                <el-input v-model="customerform.NCCode" clearable></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="客户公司地址" class="path">
                <el-select v-model="province" filterable placeholder="选择省份" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in provincelist" :key="index"></el-option>
                </el-select>
                <el-select v-model="city" filterable placeholder="选择城市" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in citylist" :key="index"></el-option>
                </el-select>
                <el-select v-model="customerform.AreaId" filterable placeholder="选择区县" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in arealist" :key="index"></el-option>
                </el-select>
                <el-input v-model="customerform.Addr" placeholder="请输入详情地址" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="管理执行权">
                <el-radio-group v-model="customerform.MgrRight">
                  <el-radio :label="item.value" v-for="(item, index) in MgrRightlist" :key="index">{{item.describe}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="relationlist.length == 0">
              <el-form-item label="客户关联公司" class="addrelation">
                <span @click="addrelation()">
                  <svg-icon icon-class="add" class="add" />
                  <span>添加客户关联关系</span>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="64" class="relation" v-for="(item, index) in relationlist" :key="index">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户关联公司">
                <!-- <el-select disabled v-model="item.RelationType" filterable>
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select> -->
                <el-input disabled v-model="item.RelationCompanyName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="关联关系">
                <el-radio-group v-model="item.RelationType">
                  <el-radio disabled :label="list.value" v-for="(list, indexs) in RelationTypelist" :key="indexs">{{list.describe}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col>
              <div class="operate-btn">
                <div class="btn" @click="updaterelation(item, index)">
                  <svg-icon icon-class="update" />
                  <span>编辑</span>
                </div>
                <div class="btn" @click="deleterelation(index, item)">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div>
                <div class="btn" @click="addrelation()" v-if="relationlist.length-1==index">
                  <svg-icon icon-class="add" class="add" />
                  <span>添加</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="客户介绍" class="text">
                <el-input type="textarea" :rows="6" v-model="customerform.Intro" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-title">客户NC信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户NC编码">
                <el-input v-model="customerform.NCCode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="!this.Id">
              <el-form-item label="相关执行人" class="vue-tree multiples">
                <treeselect ref="trees4" v-model="customerform.UserIdArr" :normalizer="normalizer2" placeholder="相关执行人" :multiple="true" value-consists-of="LEAF_PRIORITY" :options="newarray" @input="
lookinput" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div ref="customLink" class="form-title">客户联系人信息
          <div class="operate cursor-pointer" @click="addContact()">
            <svg-icon icon-class="add" />
            <span>添加</span>
          </div>
        </div>
        <div class="form-cont">
          <el-row :gutter="64" class="contact-list" v-for="(item, index) in customerform.contactlist" :key="index">
            <el-col :ref="'contact' + index" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item :ref="'contactlist.' + index + '.UserName'" :prop="'contactlist.' + index + '.UserName'" :rules="{
                required: true, message: '客户联系人不能为空', trigger: 'blur'
              }" label="客户联系人">
                <el-input v-model="item.UserName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item :ref="'contactlist.' + index + '.Tel'" :prop="'contactlist.' + index + '.Tel'" :rules="{
                required: true, message: '联系电话不能为空', trigger: 'blur'
              }" label="联系电话">
                <el-input v-model="item.Tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item :ref="'contactlist.' + index + '.PositionName'" :prop="'contactlist.' + index + '.PositionName'" :rules="{
                required: true, message: '联系人职务不能为空', trigger: 'blur'
              }" label="联系人职务">
                <el-input v-model="item.PositionName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="联系人邮箱">
                <el-input v-model="item.Email"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <div v-if="customerform.contactlist.length !== 1" class="operate-btn">
                <div class="btn" @click="deleteContact(index, item)">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 编辑显示客户跟进信息，添加不显示 -->
        <div class="form-title">客户跟进信息
          <div class="operate cursor-pointer" @click="addFllowUpPerson()">
            <svg-icon icon-class="add" />
            <span>添加</span>
          </div>
        </div>
        <div class="form-cont">
          <el-row :gutter="64" class="contact-list" v-for="(item, index) in customerform.followuplist" :key="index">
            <el-col :ref="'fllowup' + index" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item :ref="'followuplist.' + index + '.FollowTime'" :prop="'followuplist.' + index + '.FollowTime'" :rules="{
                required: true, message: '跟进时间不能为空', trigger: 'change'
              }" label="跟进时间" class="datetime">
                <el-date-picker v-model="item.FollowTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item :ref="'followuplist.' + index + '.SysUserId'" :prop="'followuplist.' + index + '.SysUserId'" :rules="{
                required: true, message: '跟进人不能为空', trigger: 'change'
              }" label="跟进人" class="select">
                <el-select v-model="item.SysUserId" filterable remote clearable placeholder="搜索选择跟进人" :remote-method="SysUserSearch" @clear="SysUserSearch('')">
                  <el-option v-for="item in useroptions" :key="item.Id" :label="item.UserName" :value="item.Id">
                  </el-option>
                  <div v-if="useroptions.length > 49" class="search-keyword">
                    <span>只显示前50条结果，请完善搜索关键字</span>
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item :ref="'followuplist.' + index + '.Content'" :prop="'followuplist.' + index + '.Content'" :rules="{
                required: true, message: '跟进内容不能为空', trigger: 'blur'
              }" label="跟进内容" class="text">
                <el-input type="textarea" :rows="6" v-model="item.Content" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item :ref="'followuplist.' + index + '.Step'" :prop="'followuplist.' + index + '.Step'" :rules="{
                required: true, message: '跟进阶段不能为空', trigger: 'change'
              }" label="跟进阶段" class="select">
                <el-select v-model="item.Step" placeholder="请选择跟进阶段">
                  <el-option v-for="item in followoptions" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="关联待办任务" class="select">
                <el-select v-model="item.TaskId" clearable placeholder="请选择关联待办任务" @change="SelectTask()">
                  <el-option v-for="ite in toDoList" :key="ite.Id" :label="ite.Content" :value="ite.Id" :disabled="ite.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <div v-if="customerform.followuplist.length !== 1" class="operate-btn">
                <div class="btn" @click="deleteFllowUpPerson(index, item)">
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
                <span>重新上传</span>
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
      <!-- 客户联系人添加窗口 -->
      <el-dialog :close-on-click-modal="false" :title="linknametitle" :visible.sync="linknameVisible" width="480px" :lock-scroll="false" destroy-on-close @close="closedialog" custom-class="erpdialog">
        <el-form :model="linknameform" label-position="top" :rules="dialogRules" ref="linknameform" label-width="100px" class="linknameform">
          <el-form-item label="客户联系人" prop="UserName">
            <el-input v-model="linknameform.UserName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="Tel">
            <el-input v-model="linknameform.Tel"></el-input>
          </el-form-item>
          <el-form-item label="联系人职务" prop="PositionName">
            <el-input v-model="linknameform.PositionName"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱">
            <el-input v-model="linknameform.Email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="linknamesave(linknameform)">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 客户管理 -->
      <el-dialog :close-on-click-modal="false" :title="relationtitle" :visible.sync="relationVisible" width="480px" :lock-scroll="false" @close="closedialog" custom-class="erpdialog">
        <el-form :model="relationform" label-position="top" :rules="rules" ref="relationform" label-width="100px" class="relationform">
          <el-form-item label="客户关联公司" class="select">
            <el-select ref="searchselect" v-model="relationform.RelationCompanyId" filterable remote clearable placeholder="搜索选择客户" :loading="selectloading" :remote-method="remoteMethod" @clear="remoteMethod('')">
              <el-option v-for="item in companylist" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
              <div v-if="companylist.length > 99" class="search-keyword">
                <span>只显示前100条结果，请完善搜索关键字</span>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="关联关系">
            <el-radio-group v-model="relationform.RelationType">
              <el-radio :label="list.value" v-for="(list, indexs) in RelationTypelist" :key="indexs">{{list.describe}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="relationsave(relationform)">保 存</el-button>
        </span>
      </el-dialog>
      <dialogfollow :title="followuptitle" :visible="followupVisible" :contentdata="followupform" @closedialog="closedialog" @savedialog="savedialog"></dialogfollow>
    </div>
  </div>
</template>

<script>
import dialogfollow from "./components/dialog-follow";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import { GetRelatedAgencyTask } from "@/api/Remind.js";
import {
  AddCompany,
  GetCompanyInfo,
  EditCompanyInfo,
  AddCompanyContact,
  GetCompanyRelationEnumRelationType,
  GetCompanyRelationList,
  GetCompanyPageList,
  AddCompanyRelation,
  DelCompanyRelation,
  GetCompanyContactList,
  EditCompanyContact,
  DeleteCompanyContact,
  GetCompanyFollowList,
  AddCompanyFollow,
  EditCompanyFollow,
  DeleteCompanyFollow,
  CompanyEnumCorpType,
  BatchAddCompanyFollow,
  BatchAddCompanyContact
} from "@/api/CustomerManagement.js";
import {
  GetAreaList,
  GetCatagoryList,
  GetCatagoryClassType,
  CompanyEnumSize,
  BfCompanyLevelEnum,
  CompanyEnumLevel,
  CompanyEnumNature,
  CompanyEnumMgrRight,
  GetCompanyFollowEnumStep,
  CompanyBusinessRegEnumBusinessType
} from "@/api/Public.js";
import {
  showLoading,
  hideLoading,
  copy,
  uuid,
  checkEngNumber,
  MenuIdDate,
  unique
} from "@/utils/CustomValidation.js";
import { GetBfCompanyPageList } from "@/api/BusinessSet.js";
import {
  GetSysUserList,
  GetSysOrgListAndUserInfoMerge
} from "@/api/SystemSetting.js";
import SupperUploader from "@/utils/SupperUploader";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapGetters } from "vuex";
import axios from "axios";
import qs from "qs";
export default {
  components: {
    BreadCrumb,
    Treeselect,
    dialogfollow
  },
  data() {
    return {
      urlList: [
        {
          name: "我的客户",
          router: "/CustomerManagement/MyCustomer"
        },
        {
          name: "新增客户",
          router: ""
        }
      ],
      Id: "",
      isupdate: false,
      // contactlist: [{
      //   CompanyId: '',
      //   UserName: '',
      //   PositionName: '',
      //   Tel: '',
      //   Email: ''
      // }], // 客户联系人信息列表
      IsRelationList: [
        { Name: "否", value: 0 },
        { Name: "是", value: 1 }
      ], //是否为关联方客户
      RelationTypelist: [], // 客户关联关系
      companylist: [], // 客户关联公司列表
      EnumSizelist: [], // 公司规模列表
      LevelEnumlist: [], // 客户级别
      EnumLevellist: [], // 公司等级
      EnumNaturelist: [], // 公司性质
      MgrRightlist: [], // 管理执行权列表
      useroptions: [], // 跟进人信息列表
      followoptions: [], // 跟进阶段
      BusinessTypelist: [], // 公司报备类型
      EnumCorpTypelist: [], // 合作类型

      updateadd: false, // 修改页面是否调用添加接口
      updateId: "", // 修改页面修改的Id

      contactlist: [], // 联系人列表
      isreplace: false, // 是否替换原来的值
      linknametitle: "添加客户联系人",
      linknameVisible: false,
      linknameform: {
        UserName: "",
        Tel: "",
        PositionName: "",
        Email: ""
      },

      relationlist: [], // 关联公司列表
      relationtitle: "添加客户关系",
      relationVisible: false,
      relationform: {
        RelationType: "",
        RelationCompanyId: "",
        RelationCompanyName: ""
      },

      followuplist: [], // 客户跟进信息列表
      followuptitle: "添加客户跟进信息",
      followupVisible: false,
      followupform: {
        SysUserId: "",
        SysUserName: "",
        Content: "",
        Step: "",
        TaskId: "",
        FollowTime: ""
      },
      selectloading: false,
      toDoList: [], // 代办任务列表

      // 上传文件
      filterlist: [],
      fileloading: false,

      customerform: {
        Name: "", // 企业全称
        ShortName: "", // 企业简称
        Code: "", //所属公司
        Type: "", // 客户类型
        CorpType: "", // 合作类型
        Nature: "", // 公司性质
        Size: "", // 公司规模
        IndustryId: null, // 所属行业Id
        BusinessTypeArr: [], // 业务报备类型
        MgrRight: "", // 管理执行权
        Level: "", // 客户等级
        AreaId: "", // 公司所在地区Id
        Addr: "", // 公司地址
        Zip: "", // 公司邮编
        Tel: "", // 公司电话
        Email: "", // 公司邮箱
        Fax: "", // 公司传真
        // SiteUrl: '',
        Intro: "", // 公司介绍
        CertNo: "", // 营业执照号码
        IsRelation: "", //是否为关联方客户
        CertPic: "", // 营业执照电子照片
        LawPerson: "", // 法人姓名
        LawPersonID: "", // 法人身份证号码
        // BankName: '',
        // BankCardNo: '',
        // TaxNo: '',
        // InvoiceTitle: '',
        // RegAddress: '',
        SysUserId: "", // 报备人
        Status: 1, // 审核状态
        NCCode: "", // NC系统编码
        AddTime: "", // 添加时间
        UserIdArr: [],

        // 联系人列表
        contactlist: [
          {
            UserName: "",
            PositionName: "",
            Tel: "",
            Email: ""
          }
        ],

        // 跟进信息
        followuplist: [
          {
            CompanyId: "",
            SysUserId: "",
            Content: "",
            Step: "",
            TaskId: "",
            FollowTime: ""
          }
        ]
      },
      SysUserlist: [], // 客户拥有者
      Companylist: [], //客户所属公司
      IndustryIds: [], // 所属行业
      // classtype: [], // 综合分类枚举
      getIndustrtList: [], // 行业分类列表
      CodeName: "客户所属公司",
      // 树状图对应数据
      normalizer1(node) {
        return {
          id: node.Id,
          label: node.ClassName,
          children: node.children
        };
      },
      // 树状图对应数据
      normalizer2(node) {
        return {
          id: node.userId,
          label: node.name,
          children: node.children
        };
      },
      provincelist: [], // 省列表
      province: "",
      citylist: [], // 市列表
      city: "",
      arealist: [], // 区列表
      newarray: [], // 处理过的数据树状图数据
      rules: {
        Name: [
          { required: true, message: "请输入客户单位名称", trigger: "blur" }
          // { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        Code: [
          { required: true, message: "请输入客户所属公司", trigger: "change" }
        ],
        CertNo: [
          { required: true, validator: checkEngNumber, trigger: "blur" }
        ],
        BusinessTypeArr: [
          {
            required: true,
            message: "请选择是否为关联方客户",
            trigger: "change"
          }
        ],
        IsRelation: [
          { required: true, message: "请选择业务报备类型", trigger: "change" }
        ]
      },
      dialogRules: {
        UserName: [
          { required: true, message: "请输入客户联系人", trigger: "blur" }
        ],
        Tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        PositionName: [
          { required: true, message: "请输入联系人职务", trigger: "blur" }
        ]
      },
      operating: {} // 操作码
    };
  },
  watch: {
    "customerform.AreaId"(newvalue, oldvalue) {
      const str = this.arealist.find(v => {
        return v.Id == newvalue;
      });
      if (!str && !!newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              this.province = select.find(v => v.Level == 1).Id;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.city = select.find(v => v.Level == 2).Id;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.customerform.AreaId = select.find(v => v.Level == 3).Id;
            } else {
              this.customerform.AreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    province(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.citylist = response.Data;
            // 判断下拉框有没有这个Id
            let isclear = this.citylist.find(v => {
              return v.Id == this.city;
            });
            if (isclear) {
            } else {
              this.city = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.city = "";
        this.customerform.AreaId = "";
        this.citylist = [];
        this.arealist = [];
      }
    },
    city(newvalue, oldavlue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.arealist = response.Data;
            // 判断
            let isclear = this.arealist.find(v => {
              return v.Id == this.customerform.AreaId;
            });
            if (isclear) {
            } else {
              this.customerform.AreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.arealist = [];
        this.customerform.AreaId = "";
      }
    }
  },
  computed: {
    ...mapGetters([
      // 'EnumerationType'
    ])
  },
  created() {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem("operating")) || {};
    // 判断是添加还是修改
    this.Id = this.$route.query.id;
    // 获取面包屑的内容
    let breadpath = JSON.parse(window.localStorage.getItem("breadpath")) || {};
    if (breadpath.router) {
      this.urlList[0] = breadpath;
    }
    if (this.Id) {
      this.isupdate = true;
      this.getCompanyInfo();
      this.getCompanyRelationList();
      // this.getCompanyContactList()
      // this.getCompanyFollowList()
      // this.getCompanyFollowEnumStep()
      this.urlList[1].name = "修改客户";
      this.CodeName = "客户编码";
    } else {
      // 获取客户拥有者默认为当前账号
      let user = JSON.parse(window.localStorage.getItem("Current"));
      this.SysUserlist = [
        {
          UserName: user.currentUser,
          Id: user.currentId
        }
      ];
      this.customerform.SysUserId = user.currentId;
      // 获取跟新人默认为当前账号
      this.customerform.followuplist[0].SysUserId = user.currentId;
      this.useroptions = [
        {
          UserName: user.currentUser,
          Id: user.currentId
        }
      ];
      // 跟进时间默认今天
      this.customerform.followuplist[0].FollowTime = new Date();
      this.isupdate = false;
      // this.SysUserMethod('')
    }
    // this.getCatagoryClassType()
    this.getCatagoryList();
    this.getAreaList();
    this.getCompanyRelationEnumRelationType();
    this.companyEnumSize();
    // this.bfCompanyLevelEnum()
    this.companyEnumLevel();
    this.companyEnumNature();
    this.companyEnumMgrRight();
    this.companyBusinessRegEnumBusinessType();
    this.companyEnumCorpType();
    this.CompanyMethod();
    this.getSysOrgListAndUserInfo();
    this.getCompanyFollowEnumStep();
    this.getRelatedAgencyTask();
  },
  methods: {
    // 获取组织关联用户信息
    getSysOrgListAndUserInfo() {
      let obj = {
        SysUserName: "",
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetSysOrgListAndUserInfoMerge(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.newarray = response.Data;
          this.upAndDown2(this.newarray);
          // console.log(this.newarray)
          // 处理数据, 默认勾选财务部所有人员
          this.defaultselect(this.newarray);
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 循环找出财务中心总经办
    defaultselect(array) {
      for (let i = 0; i < array.length; i++) {
        // 如果找到总经办
        if (array[i].orgId === 170) {
          this.customerform.UserIdArr = [];
          this.findUserId(array[i].children);
        } else {
          // 如果存下下一级,就进行回调循环
          if (array[i].children && array[i].children.length) {
            this.defaultselect(array[i].children);
          }
        }
      }
    },
    // 循环查询userId
    findUserId(array) {
      for (let i = 0; i < array.length; i++) {
        if ((array[i].userId + "").indexOf("a") === -1) {
          this.customerform.UserIdArr.push(array[i].userId);
        }
        if (array[i].children && array[i].children.length) {
          this.findUserId(array[i].children);
        }
      }
    },
    // 获取客户详情
    getCompanyInfo() {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      new Promise((resolve, reject) => {
        GetCompanyInfo(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            // 处理地址为0
            if (response.Data.AreaId === 0) {
              response.Data.AreaId = "";
            }
            // 处理业务报备类型 字符串转为数组
            if (response.Data.BusinessTypeArr) {
              response.Data.BusinessTypeArr = response.Data.BusinessTypeArr.split(
                ","
              ).map(Number);
            }
            // 处理客户拥有者为0
            if (response.Data.SysUserId == 0) {
              response.Data.SysUserId = "";
              this.SysUserMethod("");
            } else {
              // 根据Id获取列表
              this.SysUserlist = [
                {
                  UserName: response.Data.SysUserName,
                  Id: response.Data.SysUserId
                }
              ];
            }
            // if (response.Data.Code == '') {
            //   response.Data.Code = ''
            //   this.CompanyMethod('')
            // } else {
            //   // 根据Id获取列表
            //   this.SysUserlist = [{
            //     UserName: response.Data.SysUserName,
            //     Id: response.Data.SysUserId
            //   }]
            // }
            // 处理所属行业为0
            if (response.Data.IndustryId == 0) {
              response.Data.IndustryId = null;
            }
            // // 处理所属行业
            // if (response.Data.IndustryId) {
            //   this.IndustryIds = response.Data.IndustryId.split(',')
            // }
            // 处理文件
            this.filterlist = [];
            if (response.Data.CertPic) {
              var arry = response.Data.CertPic.split(";");
              for (let i = 0; i < arry.length; i++) {
                var namelist = arry[i].split(".");
                console.log(namelist);

                this.filterlist.push({
                  name: namelist[namelist.length - 1],
                  Url: arry[i],
                  visible: false
                });
              }
            }
            Object.keys(this.customerform).forEach(key => {
              this.customerform[key] = response.Data[key];
            });
            resolve();
          } else {
            reject(response.MessageContent);
          }
        });
      })
        .then(value => {
          this.getCompanyContactList();
          this.getCompanyFollowList();
          hideLoading();
        })
        .catch(err => {
          hideLoading();
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    // 获取客户关联公司列表
    getCompanyRelationList() {
      let obj = {
        CompanyId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetCompanyRelationList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.relationlist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取联系人列表数据
    getCompanyContactList() {
      let obj = {
        CompanyId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetCompanyContactList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.customerform.contactlist = response.Data;
            console.log(this.customerform);
          } else {
            this.customerform.contactlist = [
              {
                UserName: "",
                PositionName: "",
                Tel: "",
                Email: ""
              }
            ];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取跟进信息列表
    getCompanyFollowList() {
      let obj = {
        CompanyId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetCompanyFollowList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.customerform.followuplist = response.Data;
            // 处理下拉列表
            let sysUserList = [];
            let doList = [];
            for (let i = 0; i < this.customerform.followuplist.length; i++) {
              sysUserList.push({
                Id: this.customerform.followuplist[i].SysUserId,
                UserName: this.customerform.followuplist[i].SysUserName
              });
              if (this.customerform.followuplist[i].TaskId > 0) {
                doList.push({
                  Content: this.customerform.followuplist[i].TaskContent,
                  Id: this.customerform.followuplist[i].TaskId,
                  disabled: true
                });
              } else {
                this.customerform.followuplist[i].TaskId = "";
              }
            }
            if (this.toDoList.length > 0) {
              this.toDoList.concat(doList);
            } else {
              this.toDoList = doList;
            }
            console.log(this.toDoList, doList);

            this.useroptions = unique(sysUserList);
          } else {
            this.customerform.followuplist = [
              {
                CompanyId: "",
                SysUserId: "",
                Content: "",
                Step: "",
                TaskId: "",
                FollowTime: ""
              }
            ];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //处理关联待办任务是否可选
    SelectTask() {
      for (let i = 0; i < this.toDoList.length; i++) {
        for (let j = 0; j < this.customerform.followuplist.length; j++) {
          this.$set(this.toDoList[i], "disabled", false);
        }
      }
      for (let i = 0; i < this.toDoList.length; i++) {
        for (let j = 0; j < this.customerform.followuplist.length; j++) {
          if (this.customerform.followuplist[j].TaskId == this.toDoList[i].Id) {
            this.$set(this.toDoList[i], "disabled", true);
          }
        }
      }
    },
    // 获取关联关系
    getCompanyRelationEnumRelationType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetCompanyRelationEnumRelationType(qs.stringify(obj)).then(response => {
        if (response) {
          this.RelationTypelist = response;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取公司规模列表
    companyEnumSize() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      CompanyEnumSize(qs.stringify(obj)).then(response => {
        if (response) {
          this.EnumSizelist = response;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取客户级别
    bfCompanyLevelEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      BfCompanyLevelEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.LevelEnumlist = response;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取客户等级
    companyEnumLevel() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      CompanyEnumLevel(qs.stringify(obj)).then(response => {
        if (response) {
          this.EnumLevellist = response;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取公司性质
    companyEnumNature() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      CompanyEnumNature(qs.stringify(obj)).then(response => {
        if (response) {
          this.EnumNaturelist = response;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取管理执行权
    companyEnumMgrRight() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      CompanyEnumMgrRight(qs.stringify(obj)).then(response => {
        if (response) {
          this.MgrRightlist = response;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取客户跟进阶段枚举
    getCompanyFollowEnumStep() {
      if (this.followenumlist && this.followenumlist.length) {
        this.followoptions = this.followenumlist;
      } else {
        let obj = {
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetCompanyFollowEnumStep(qs.stringify(obj)).then(response => {
          if (response) {
            this.followoptions = response;
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    // 获取代办任务列表
    getRelatedAgencyTask() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetRelatedAgencyTask(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.toDoList = response.Data;
          if (this.toDoList.length > 0) {
            for (let item of this.toDoList) {
              item.disabled = false;
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取公司报备类型
    companyBusinessRegEnumBusinessType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      CompanyBusinessRegEnumBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          let array = [];
          for (let i = 0; i < response.length; i++) {
            if (response[i].value == 0) {
            } else {
              array.push(response[i]);
            }
          }
          this.BusinessTypelist = array;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取合作类型枚举
    companyEnumCorpType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      CompanyEnumCorpType(qs.stringify(obj)).then(response => {
        if (response) {
          this.EnumCorpTypelist = response;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取综合分类枚举值
    // getCatagoryClassType() {
    //   // 判断store里面是否已经有了枚举分类
    //   if (this.EnumerationType && this.EnumerationType.length) {
    //     this.classtype = this.EnumerationType
    //   }
    //   GetCatagoryClassType().then(response => {
    //     if (response) {
    //       this.classtype = response
    //       this.$store.dispatch('app/getEnumerationType', response)
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: 'error'
    //       })
    //     }
    //   })
    // },
    // 获取所属行业分类
    getCatagoryList() {
      let obj = {
        ClassName: "",
        Status: 1,
        ClassType: 1,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetCatagoryList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.getIndustrtList = response.Data;
          this.upAndDown(this.getIndustrtList);
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 删除数据的空children
    upAndDown(arr) {
      arr.forEach(obj => {
        if (obj.children.length <= 0) {
          delete obj.children;
          return;
        } else {
          this.upAndDown(obj.children);
        }
      });
    },
    // 删除数据的空children
    upAndDown2(arr) {
      arr.forEach(obj => {
        if (!obj.userId) {
          obj.userId = "a" + obj.orgId;
        }
        if (obj.children.length <= 0) {
          delete obj.children;
          return;
        } else {
          this.upAndDown2(obj.children);
        }
      });
    },
    lookinput(value, instanceId) {
      let array = copy(value);
      // let array = copy(value);
      // for (let i = 0; i < value.length; i++) {
      //   if ((value[i] + "").indexOf("a") > -1) {
      //     array.splice(i, 1);
      //   }
      // }
      this.$nextTick(() => {
        this.customerform.UserIdArr = array;
        // console.log(this.customerform.UserIdArr)
      });
    },
    // 获取地区数据
    getAreaList() {
      let obj = {
        AreaId: "",
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetAreaList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.provincelist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 搜索客户拥有者
    SysUserMethod(value) {
      let obj = {
        UserId: "",
        UserName: value,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.SysUserlist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 搜索跟进人
    SysUserSearch(value) {
      let obj = {
        UserId: "",
        UserName: value,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.useroptions = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //搜索客户所属公司
    CompanyMethod(value) {
      let obj = {
        Name: value,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        Level: -1,
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
    // 客户关联公司增删改查
    addrelation() {
      // 打开弹窗
      this.relationtitle = "添加客户关系";
      this.remoteMethod("");
      // 判断是修改页面还是添加页面
      if (this.isupdate == false) {
        // 添加页面弹窗
        this.isreplace = false; // 不替换原来的值
        this.relationVisible = true;
      } else {
        // 添加修改页面。点击保存调用接口
        this.updateadd = true; // 修改页面添加接口
        this.isreplace = false; // 不替换原来的值
        this.relationVisible = true;
        this.updateId = "";
      }
    },
    // 删除客户关联公司
    deleterelation(e, data) {
      if (this.isupdate == false) {
        this.relationlist.splice(e, 1);
      } else {
        // 调用删除接口
        let obj = {
          IdArr: data.Id,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        DelCompanyRelation(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getCompanyRelationList();
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    // 编辑客户关联公司
    updaterelation(e, i) {
      // 编辑还是添加
      console.log(e);
      if (e.RelationCompanyName) {
        this.companylist = [
          {
            Id: e.RelationCompanyId,
            Name: e.RelationCompanyName
          }
        ];
      } else {
        this.remoteMethod("");
      }
      this.relationtitle = "修改客户关系";
      if (this.isupdate == false) {
        this.isreplace = true; // 替换原来的值
        this.isreplaceindex = i; // 替换原来的值的位置
        var newdata = copy(e);
        this.relationform = {
          RelationType: newdata.RelationType,
          RelationCompanyId: newdata.RelationCompanyId
        };
        this.relationVisible = true;
      } else {
        this.isreplaceindex = i; // 替换原来的值的位置
        this.relationform = {
          RelationType: e.RelationType,
          RelationCompanyId: e.RelationCompanyId
        };
        this.updateadd = false; // 调用编辑接口
        this.updateId = e.Id; // 编辑的Id
        this.relationVisible = true;
      }
    },
    // 保存客户关联公司
    relationsave(e) {
      if (this.isupdate == false) {
        // 判断是否替换原来的值
        if (this.isreplace == false) {
          this.relationlist.push({
            RelationType: e.RelationType,
            RelationCompanyId: e.RelationCompanyId,
            RelationCompanyName: this.$refs.searchselect.selectedLabel
          });
          this.relationVisible = false;
        } else {
          e.RelationCompanyName = this.$refs.searchselect.selectedLabel;
          this.relationlist.splice(this.isreplaceindex, 1, e);
          this.relationVisible = false;
        }
      } else {
        // 判断是调用添加接口还是修改接口
        if (this.updateadd) {
          // 调用添加接口
          let obj = {
            CompanyId: this.Id,
            AddCompanyRelationList: [
              {
                RelationType: e.RelationType,
                RelationCompanyId: e.RelationCompanyId
              }
            ],
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          AddCompanyRelation(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.getCompanyRelationList();
              this.relationVisible = false;
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
        } else {
          // 调用编辑接口, 编辑时,要把所有的关联公司都一起提交
          this.relationlist.splice(this.isreplaceindex, 1, {
            Id: this.updateId,
            RelationType: e.RelationType,
            RelationCompanyId: e.RelationCompanyId
          });
          let obj = {
            CompanyId: this.Id,
            AddCompanyRelationList: this.relationlist,
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          AddCompanyRelation(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getCompanyRelationList();
              this.relationVisible = false;
            } else {
              this.getCompanyRelationList();
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
        }
      }
    },

    // 客户联系人信息操作
    deletecontac(e, data) {
      // 表格删除
      if (this.isupdate == false) {
        this.contactlist.splice(e, 1);
      } else {
        // 调用删除接口
        let obj = {
          IdArr: data.Id,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        DeleteCompanyContact(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getCompanyContactList();
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    // 弹框式添加联系人
    addcontac(e) {
      // 打开新的弹窗
      this.linknametitle = "添加客户联系人";
      if (this.isupdate == false) {
        // 添加的操作
        this.isreplace = false; // 不替换原来的值
        this.linknameVisible = true;
      } else {
        // 编辑页面时的操作 店家保存调用保存接口
        this.updateadd = true; // 修改页面添加接口
        this.isreplace = false; // 不替换原来的值
        this.linknameVisible = true;
        this.updateId = "";
      }
      // this.contactlist.push({
      //   CompanyId: '',
      //   UserName: '',
      //   PositionName: '',
      //   Tel: '',
      //   Email: ''
      // })
      // AddCompanyContact(qs.stringify(obj)).then(response => {
      //   if (response.IsSuccess) {
      //     this.$message({
      //       message: '客户联系人保存成功',
      //       type: 'success'
      //     })
      //   } else {
      //     this.$message({
      //       message: response.MessageContent,
      //       type: 'error'
      //     })
      //   }
      // })
    },
    // 编辑按钮
    updatecontac(e, i) {
      // 编辑还是添加
      this.linknametitle = "修改客户联系人";
      if (this.isupdate == false) {
        this.isreplace = true; // 替换原来的值
        this.isreplaceindex = i; // 替换原来的值的位置
        var newdata = copy(e);
        this.linknameform = {
          UserName: newdata.UserName,
          PositionName: newdata.PositionName,
          Tel: newdata.Tel,
          Email: newdata.Email
        };
        this.linknameVisible = true;
      } else {
        // 编辑页面，点击保存后调用编辑接口
        var newdata = copy(e);
        this.linknameform = {
          UserName: newdata.UserName,
          PositionName: newdata.PositionName,
          Tel: newdata.Tel,
          Email: newdata.Email
        };
        this.updateadd = false; // 调用编辑接口
        this.updateId = e.Id; // 编辑的Id
        this.linknameVisible = true;
      }
    },
    // 客户联系人保存
    linknamesave(e) {
      // 新增表单验证
      this.$refs.linknameform.validate(v => {
        if (v) {
          if (this.isupdate == false) {
            // 判断是否替换原来的值
            if (this.isreplace == false) {
              this.contactlist.push({
                UserName: e.UserName,
                PositionName: e.PositionName,
                Tel: e.Tel,
                Email: e.Email
              });
              this.linknameVisible = false;
            } else {
              this.contactlist.splice(this.isreplaceindex, 1, e);
              this.linknameVisible = false;
            }
          } else {
            // 编辑页面，判断是添加还是编辑
            if (this.updateadd) {
              // 添加接口
              let obj = {
                CompanyId: this.Id,
                UserName: e.UserName,
                PositionName: e.PositionName,
                Tel: e.Tel,
                Email: e.Email,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              AddCompanyContact(qs.stringify(obj)).then(response => {
                if (response.IsSuccess) {
                  this.$message({
                    message: "客户联系人保存成功",
                    type: "success"
                  });
                  this.getCompanyContactList();
                  this.linknameVisible = false;
                } else {
                  this.$message({
                    message: response.MessageContent,
                    type: "error"
                  });
                }
              });
            } else {
              // 修改接口
              let obj = {
                Id: this.updateId,
                CompanyId: this.Id,
                UserName: e.UserName,
                PositionName: e.PositionName,
                Tel: e.Tel,
                Email: e.Email,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              EditCompanyContact(qs.stringify(obj)).then(response => {
                if (response.IsSuccess) {
                  this.$message({
                    message: "客户联系人修改成功",
                    type: "success"
                  });
                  this.getCompanyContactList();
                  this.linknameVisible = false;
                } else {
                  this.$message({
                    message: response.MessageContent,
                    type: "error"
                  });
                }
              });
            }
          }
        }
      });
    },
    // 关闭时的回调
    closedialog() {
      this.linknameform = {
        UserName: "",
        PositionName: "",
        Tel: "",
        Email: ""
      };
      this.relationform = {
        RelationType: "",
        RelationCompanyId: ""
      };
      this.followupform = {
        SysUserId: "",
        SysUserName: "",
        Content: "",
        Step: "",
        TaskId: "",
        FollowTime: ""
      };
      this.followupVisible = false;
    },
    // 1.6版本添加联系人
    addContact() {
      this.customerform.contactlist.push({
        UserName: "",
        PositionName: "",
        Tel: "",
        Email: ""
      });
      this.$nextTick(() => {
        let refdata = "contact" + (this.customerform.contactlist.length - 1);
        this.$refs[refdata][0].$el.scrollIntoView({
          // 滚动到指定节点
          block: "center", // 值有start,center,end，nearest，当前显示在视图区域中间
          behavior: "smooth" // 值有auto、instant,smooth，缓动动画（当前是慢速的）
        });
      });
    },
    // 删除联系人
    deleteContact(i, item) {
      this.customerform.contactlist.splice(i, 1);
    },

    // 客户跟进信息
    // 添加客户跟进信息
    addfollowup() {
      // 打开弹窗
      this.followuptitle = "添加客户跟进信息";
      this.followupform = {
        SysUserId: "",
        Content: "",
        Step: "",
        TaskId: "",
        FollowTime: "",
        SysUserName: ""
      };
      this.updateadd = true;
      this.updateId = "";
      this.followupVisible = true;
    },
    // 编辑客户跟进信息
    updatefollowup(e) {
      this.followuptitle = "编辑客户跟进信息";
      this.followupform = {
        SysUserId: e.SysUserId,
        SysUserName: e.SysUserName,
        Content: e.Content,
        Step: e.Step,
        TaskId: e.TaskId,
        FollowTime: e.FollowTime,
        TaskContent: e.TaskContent
      };
      this.updateadd = false;
      this.updateId = e.Id;
      this.followupVisible = true;
    },
    // 删除客户跟进信息
    deletefollowup(i, e) {
      // 调用接口删除
      let obj = {
        IdArr: e.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      DeleteCompanyFollow(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getCompanyFollowList();
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 保存客户跟进信息
    savedialog(e) {
      console.log(e);
      if (this.updateadd) {
        let obj = {
          CompanyId: this.Id,
          SysUserId: e.SysUserId,
          Step: e.Step,
          TaskId: e.TaskId,
          FollowTime: e.FollowTime,
          Content: e.Content,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        AddCompanyFollow(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.getCompanyFollowList();
            this.followupVisible = false;
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        let obj = {
          Id: this.updateId,
          CompanyId: this.Id,
          SysUserId: e.SysUserId,
          Step: e.Step,
          TaskId: e.TaskId,
          FollowTime: e.FollowTime,
          Content: e.Content,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        EditCompanyFollow(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getCompanyFollowList();
            this.followupVisible = false;
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    // 1.6版本添加跟进人
    addFllowUpPerson() {
      let user = JSON.parse(window.localStorage.getItem("Current"));
      this.customerform.followuplist.push({
        CompanyId: "",
        SysUserId: user.currentId,
        Content: "",
        Step: "",
        TaskId: "",
        FollowTime: new Date()
      });
      this.$nextTick(() => {
        let refdata = "fllowup" + (this.customerform.followuplist.length - 1);
        this.$refs[refdata][0].$el.scrollIntoView({
          // 滚动到指定节点
          block: "center", // 值有start,center,end，nearest，当前显示在视图区域中间
          behavior: "smooth" // 值有auto、instant,smooth，缓动动画（当前是慢速的）
        });
      });
    },
    // 删除跟进信息
    deleteFllowUpPerson(i, item) {
      this.customerform.followuplist.splice(i, 1);
    },

    // 保存
    onSubmit() {
      this.$refs.customerform.validate((v, object) => {
        if (v) {
          let obj = {};
          obj.AddCompanyDtoInfo = copy(this.customerform);
          obj.AddCompanyRelationList = this.relationlist;
          // obj.AddCompanyContactDtoList = this.contactlist
          // 处理联系人
          obj.AddCompanyContactDtoList = this.customerform.contactlist;
          // 省市区上传数据处理：如果没有选择区就填充市，如果没有市就填充省
          obj.AddCompanyDtoInfo.AreaId =
            this.customerform.AreaId || this.city || this.province;
          // 处理业务类型报备
          let BusinessTypeArr = copy(this.customerform.BusinessTypeArr);
          if (
            this.customerform.BusinessTypeArr &&
            this.customerform.BusinessTypeArr.length
          ) {
            obj.BusinessTypeArr = BusinessTypeArr.join(",");
          } else {
            obj.BusinessTypeArr = "";
          }
          // if (this.customerform.AreaId) {
          //   // 不处理
          // } else {
          //   // 判断区有没有值
          //   if (this.city) {
          //     obj.AddCompanyDtoInfo.AreaId = this.city
          //   } else {
          //     // 判断
          //   }
          // }
          // 处理业务类型报备
          if (
            this.customerform.BusinessTypeArr &&
            this.customerform.BusinessTypeArr.length
          ) {
            obj.AddCompanyDtoInfo.BusinessTypeArr = BusinessTypeArr.join(",");
          } else {
            obj.AddCompanyDtoInfo.BusinessTypeArr = "";
          }
          // // 处理所属行业
          // if (this.IndustryIds && this.IndustryIds.length) {
          //   obj.AddCompanyDtoInfo.IndustryId = this.IndustryIds.join(',')
          // } else {
          //   obj.AddCompanyDtoInfo.IndustryId = ''
          // }

          // 上传文件数据处理
          var fils = this.filterlist.map(v => {
            return v.Url;
          });
          obj.AddCompanyDtoInfo.CertPic = fils.join(";");
          if (this.customerform.UserIdArr.length > 0) {
            obj.UserId = this.customerform.UserIdArr.join(",");
          }
          obj.menuid = this.operating.MenuId;
          obj.operationcode = this.operating.OperationCode;

          // // 新增判断是否有客户联系人
          // if (!(obj.AddCompanyContactDtoList && obj.AddCompanyContactDtoList.length)) {
          //   this.$message({
          //     message: '请填写客户联系人信息',
          //     type: 'error'
          //   })
          //   this.$refs['customLink'].scrollIntoView({　　// 滚动到指定节点
          //     block: 'center',　　　　　// 值有start,center,end，nearest，当前显示在视图区域中间
          //     behavior: 'smooth'　　　　// 值有auto、instant,smooth，缓动动画（当前是慢速的）
          //   })
          //   return
          // }
          showLoading();
          new Promise((resolve, reject) => {
            AddCompany(obj).then(response => {
              if (response.IsSuccess) {
                resolve(response.Data.Id);
              } else {
                reject(response.MessageContent);
              }
            });
          })
            .then(value => {
              // 处理跟进信息
              let fllowObj = {
                CompanyId: value,
                addCompanyFollowList: this.customerform.followuplist,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              return new Promise((resolve, reject) => {
                BatchAddCompanyFollow(qs.stringify(fllowObj)).then(response => {
                  if (response.IsSuccess) {
                    this.$message({
                      message: "客户添加成功",
                      type: "success"
                    });
                    hideLoading();
                    this.$router.go(-1);
                  } else {
                    this.$message({
                      message: "客户添加成功! 跟进信息添加失败",
                      type: "error"
                    });
                    this.$message({
                      message: response.MessageContent,
                      type: "error"
                    });
                    hideLoading();
                    this.$router.go(-1);
                  }
                });
              });
            })
            .catch(err => {
              hideLoading();
              this.$message({
                message: err,
                type: "error"
              });
            });
        } else {
          console.log(object);
          this.$message({
            message: "请填写完表单",
            type: "error"
          });
          for (const i in object) {
            if (this.$refs[i].$el) {
              this.$refs[i].$el.scrollIntoView({
                // 滚动到指定节点
                block: "center", // 值有start,center,end，nearest，当前显示在视图区域中间
                behavior: "smooth" // 值有auto、instant,smooth，缓动动画（当前是慢速的）
              });
              break;
            }
          }
        }
      });
    },
    // 修改
    updateform() {
      this.$refs.customerform.validate((v, object) => {
        if (v) {
          let obj = copy(this.customerform);
          // 省市区上传数据处理：如果没有选择区就填充市，如果没有市就填充省
          obj.AreaId = this.customerform.AreaId || this.city || this.province;
          // 处理业务类型报备
          let BusinessTypeArr = copy(this.customerform.BusinessTypeArr);
          if (
            this.customerform.BusinessTypeArr &&
            this.customerform.BusinessTypeArr.length
          ) {
            obj.BusinessTypeArr = BusinessTypeArr.join(",");
          } else {
            obj.BusinessTypeArr = "";
          }
          // // 处理所属行业
          // if (this.IndustryIds && this.IndustryIds.length) {
          //   obj.IndustryId = this.IndustryIds.join(',')
          // } else {
          //   obj.IndustryId = ''
          // }
          // 上传文件数据处理
          var fils = this.filterlist.map(v => {
            return v.Url;
          });
          obj.CertPic = fils.join(";");

          obj.Id = this.Id;
          // if (this.customerform.UserIdArr.length > 0) {
          //   obj.UserId = this.customerform.UserIdArr.join(',')
          // }
          obj.menuid = this.operating.MenuId;
          obj.operationcode = this.operating.OperationCode;
          // // 新增判断是否有客户联系人
          // if (!(this.contactlist && this.contactlist.length)) {
          //   this.$message({
          //     message: '请选择客户联系人',
          //     type: 'error'
          //   })
          //   this.$refs['customLink'].scrollIntoView({　　// 滚动到指定节点
          //     block: 'center',　　　　　// 值有start,center,end，nearest，当前显示在视图区域中间
          //     behavior: 'smooth'　　　　// 值有auto、instant,smooth，缓动动画（当前是慢速的）
          //   })
          //   return
          // }
          showLoading();
          new Promise((resolve, reject) => {
            EditCompanyInfo(qs.stringify(obj)).then(response => {
              if (response.IsSuccess) {
                resolve(this.Id);
              } else {
                reject(response.MessageContent);
              }
            });
          })
            .then(value => {
              // 客户跟进信息
              let followObj = {
                CompanyId: this.Id,
                addCompanyFollowList: this.customerform.followuplist,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              return new Promise((resolve, reject) => {
                BatchAddCompanyFollow(qs.stringify(followObj)).then(
                  response => {
                    if (response.IsSuccess) {
                      resolve();
                    } else {
                      reject(response.MessageContent);
                    }
                  }
                );
              });
            })
            .then(value => {
              // 客户联系人
              let contactObj = {
                CompanyId: this.Id,
                AddCompanyContactList: this.customerform.contactlist,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              return new Promise((resolve, reject) => {
                BatchAddCompanyContact(qs.stringify(contactObj)).then(
                  response => {
                    if (response.IsSuccess) {
                      this.$message({
                        message: "修改成功",
                        type: "success"
                      });
                      hideLoading();
                      this.$router.go(-1);
                    } else {
                      reject(response.MessageContent);
                    }
                  }
                );
              });
            })
            .catch(err => {
              hideLoading();
              this.$message({
                message: err,
                type: "error"
              });
            });
        } else {
          this.$message({
            message: "请填写完表单",
            type: "error"
          });
          for (const i in object) {
            if (this.$refs[i].$el) {
              this.$refs[i].$el.scrollIntoView({
                // 滚动到指定节点
                block: "center", // 值有start,center,end，nearest，当前显示在视图区域中间
                behavior: "smooth" // 值有auto、instant,smooth，缓动动画（当前是慢速的）
              });
              break;
            }
          }
        }
      });
    },
    // 预览
    watch(e) {
      if (e.name == "doc" || e.name == "docx") {
        window.open(
          `https://view.officeapps.live.com/op/view.aspx?src=` + e.Url
        );
      } else {
        window.open(e.Url);
      }
    },
    // 下载
    down(e) {
      window.open(e.Url);
    },
    // 删除
    deletefile(i) {
      this.filterlist.splice(i, 1);
    },
    // 上传文件
    uploadfile(e, index) {
      var uploader;
      this.fileloading = true;
      const files = e.target.files[0];
      var path = process.env.VUE_APP_BASE_API_UPLOAD;
      if (files) {
        var ext = files.name
          .slice(files.name.lastIndexOf(".") + 1)
          .toLowerCase();
        if (
          ext !== "doc" &&
          ext !== "docx" &&
          ext !== "pdf" &&
          ext !== "png" &&
          ext !== "jpg" &&
          ext !== "xls" &&
          ext !== "xlsx"
        ) {
          this.$message({
            message: "不支持该格式",
            type: "warning"
          });
          this.fileloading = false;
          e.target.value = [];
          return false;
        }
        if (files.size > 50 * 1024 * 1024) {
          this.$message({
            message: "文件大小超过最大限制",
            type: "warning"
          });
          this.fileloading = false;
          return;
        }
        if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "pdf" ||
          ext == "xls" ||
          ext == "xlsx"
        ) {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), 2 * 1024 * 1024);
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              this.fileloading = false;
              const obj = {
                name: ext,
                Url: uploader.urlResult.VideoUrl,
                visible: false
              };
              if (index == undefined) {
                this.filterlist.push(obj);
              } else {
                this.filterlist.splice(index, 1, obj);
              }
            }
            this.$refs.upload.value = null;
          });
        } else {
          // 图片上传
          console.log("上传图片");
          let datas = new FormData();
          datas.append("file", files);
          datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
          axios
            .post(path, datas)
            .then(res => {
              if (res.data.State) {
                const obj1 = {
                  name: ext,
                  Url: res.data.ImageUrl,
                  visible: false
                };
                if (index == undefined) {
                  this.filterlist.push(obj1);
                } else {
                  this.filterlist.splice(index, 1, obj1);
                }
              }
              this.fileloading = false;
            })
            .catch(() => {
              this.fileloading = false;
            });
        }
      } else {
        this.fileloading = false;
      }
    },
    // 选择所属行业 vue-tree-select 事件
    selectIndustryId() {},
    // 可能无用，已禁止搜索
    remoteMethod(queryString) {
      // if (queryString == '') {
      //   this.companylist = []
      //   return
      // }
      let obj = {
        Name: queryString,
        SysUserName: "",
        ContactName: "",
        EndDate: "",
        StartDate: "",
        Type: -1,
        PageIndex: 1,
        PageSize: 100,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      this.selectloading = true;
      setTimeout(() => {
        GetCompanyPageList(qs.stringify(obj)).then(response => {
          this.selectloading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.companylist = response.Data;
            } else {
              this.companylist = [];
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.update-customer-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .form-content {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
    .customerform {
      .form-title {
        font-size: $f16;
        color: $erp333;
        line-height: 16px;
        position: relative;
        padding-left: 12px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        > .operate {
          font-size: $f14;
          color: $erpplaceholder;
          .svg-icon {
            color: #fff;
            font-size: $f16;
            margin-right: 8px;
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
          width: 100%;
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
              height: 38px;
              line-height: 38px;
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
        // 时间选择器样式
        &.datetime {
          .el-form-item__content {
            .el-date-editor {
              width: 100%;
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
            > span {
              cursor: pointer;
              > .svg-icon {
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
      // 循环的样式
      .form-cont {
        padding-bottom: 16px;
        margin-bottom: 40px;
        border-bottom: 1px solid $erpBK;
        &:last-child {
          border-bottom: none;
        }
        .contact-list {
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
          // // 底部操作按钮
          // .operate-btn {
          //   position: absolute;
          //   right: 0;
          //   bottom: 40px;
          //   display: flex;
          // }
          // .btn {
          //   cursor: pointer;
          //   margin-left: 64px;
          //   font-size: $f14;
          //   color: $erpplaceholder;
          // }
          // 底部操作按钮
          .operate-btn {
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
      // 关联关系
      .el-row.relation {
        position: relative;
        // .operate {
        //   display: flex;
        //   position: absolute;
        //   right: 0;
        //   bottom: 24px;
        //   .btn {
        //     cursor: pointer;
        //     margin-left: 64px;
        //     font-size: $f14;
        //     color: $erpplaceholder;
        //   }
        // }
        // 底部操作按钮
        .operate-btn {
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
              }
              > span {
                font-size: $f14;
                color: #fff;
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
</style>
