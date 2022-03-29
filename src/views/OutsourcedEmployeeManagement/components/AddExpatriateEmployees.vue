<!--外派员工添加修改 -->
<template>
  <div class="add-expatriate-employees-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="employeesform" label-position="top" :model="employeesform" :rules="rules" label-width="140px" class="employeesform">
        <ul class="employesstab">
          <li class="tablist" :class="{active: tabindex==item.index}" v-for="(item, index) in tablist" :key="index">{{item.value}}</li>
        </ul>

        <!-- 基本信息 -->
        <div v-show="tabindex==0">
          <div class="form-title">员工基本信息</div>
          <div class="form-cont">
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="UserName" label="员工姓名" prop="UserName">
                  <el-input v-model="employeesform.UserName"></el-input>
                </el-form-item>
                <el-form-item ref="IdCode" label="身份证号码" prop="IdCode">
                  <el-input v-model="employeesform.IdCode" @input="changeidentity(employeesform.IdCode)"></el-input>
                </el-form-item>
                <el-form-item label="员工类型">
                  <el-select ref="searchselect" v-model="employeesform.Type" filterable clearable placeholder="搜索选择员工类型">
                    <el-option v-for="item in StaffEnumType" :key="item.value" :label="item.describe" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="employeesform.Sex">
                    <!-- <el-radio :label="null">未知</el-radio> -->
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="员工状态" v-show="employeesform.Status === 0 || employeesform.Status === 1">
                  <el-radio-group v-model="employeesform.Status">
                    <!-- <el-radio :label="null">未知</el-radio> -->
                    <el-radio :label="0">待入职</el-radio>
                    <el-radio :label="1">在职</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="身高">
                  <el-input v-model="employeesform.Heigh"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" class="datetime">
                  <el-date-picker v-model="employeesform.Birthday" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="民族" style="margin-top:40px;">
                  <el-select v-model="employeesform.Nation" filterable placeholder="选择民族">
                    <el-option :label="item.ClassName" :value="item.Id" v-for="(item, i) in Nationlist" :key="item.Id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否退伍军人">
                  <el-radio-group v-model="employeesform.ArmyMan">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="婚姻状态">
                  <el-radio-group v-model="employeesform.Married">
                    <el-radio :label="item.value" v-for="(item, index) in StaffEnumMarried" :key="index">{{item.describe}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="upload">
                <el-form-item label="重要附件" class="upload" v-loading="photoloading">
                  <div class="photo-box" v-show="!imageUrl">
                    <input type="file" @change="uploadphoto" accept="image/png,image/jpeg">
                    <div class="photo-con">
                      <svg-icon icon-class="Uploadimage" />
                      <span>上传个人照片 （二寸照）</span>
                    </div>
                    <!-- <img :src="imageUrl" :alt="imageUrl"> -->
                  </div>
                  <div class="photo-box" v-show="imageUrl">
                    <input type="file" @change="uploadphoto">
                    <img :src="imageUrl" :alt="imageUrl" accept="image/png,image/jpeg">
                  </div>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="upload">
                <el-form-item label=" " class="upload" v-loading="cardloading">
                  <div class="photo-box" v-show="!cardUrl">
                    <input type="file" @change="uploadcard" accept="image/png,image/jpeg,application/pdf">
                    <div class="photo-con">
                      <svg-icon icon-class="Uploadpapers" />
                      <span>上传身份证复印件</span>
                    </div>
                    <!-- <img :src="imageUrl" :alt="imageUrl"> -->
                  </div>
                  <div class="photo-box" v-show="cardUrl">
                    <input type="file" v-if="isimage" @change="uploadcard" accept="image/png,image/jpeg,application/pdf">
                    <img :src="cardUrl" v-if="isimage" :alt="cardUrl">
                    <div class="photo-con" v-else @mouseenter="imgvisible=!imgvisible" @mouseleave="imgvisible=!imgvisible">
                      <div class="filetype">pdf</div>
                      <span>身份证复印件</span>
                      <div class="img-box-hover" v-show="imgvisible">
                        <div class="btn">
                          <input type="file" accept=".pdf,.png,.jpg" name="" id="" @change="uploadcard($event)">
                          <svg-icon icon-class="replace" class-name="svg-a" />
                          <span>重新上传</span>
                        </div>
                        <div class="btn" @click="watch(cardUrl)">
                          <svg-icon icon-class="replace" class-name="svg-a" />
                          <span>预览</span>
                        </div>
                        <div class="btn" @click="deletecard()">
                          <svg-icon icon-class="del" class-name="svg-a" />
                          <span>删除</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="政治面貌">
                  <el-select v-model="employeesform.Politics" filterable placeholder="选择政治面貌">
                    <el-option label="党员" value="党员"></el-option>
                    <el-option label="团员" value="团员"></el-option>
                    <el-option label="群众" value="群众"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="Mobile" label="联系电话" prop="Mobile">
                  <el-input v-model="employeesform.Mobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="电子邮箱">
                  <el-input v-model="employeesform.Email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="紧急联系人">
                  <el-input v-model="employeesform.EmergencyPerson"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="紧急联系人关系??">
                  <el-select v-model="employeesform.Sex" filterable placeholder="选择紧急联系人关系">
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in provincelist" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="健康体检状态">
                  <el-radio-group v-model="employeesform.HealthyExam">
                    <el-radio :label="item.value" v-for="(item, index) in StaffEnumHealthyExam" :key="index">{{item.describe}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="紧急联系电话">
                  <el-input v-model="employeesform.EmergencyTel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                <el-form-item label="人员补贴属性">
                  <el-checkbox key="1" v-model="employeesform.Peasant">非农业人口(农民工)</el-checkbox>
                  <el-checkbox key="2" v-model="employeesform.Disabled">残疾人</el-checkbox>
                  <el-checkbox key="3" v-model="employeesform.Poor">建档立卡贫困户</el-checkbox>
                  <el-checkbox key="4" v-model="employeesform.Reset">40/50失业重新安置</el-checkbox>
                  <el-checkbox key="5" v-model="employeesform.CityLostWork">城镇登记失业人员</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="计算机水平">
                  <el-input v-model="employeesform.Computer"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="英语水平">
                  <el-input v-model="employeesform.ForignLang"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="个人爱好及特长" class="text">
                  <el-input type="textarea" :rows="6" v-model="employeesform.Interest" maxlength="500" show-word-limit></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </div>

          <!-- 地址 -->
          <div class="form-cont">
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="籍贯" class="path">
                  <el-select v-model="nativeprovince" filterable placeholder="选择省份" key="1" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in nativeprovincelist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="nativecity" filterable placeholder="选择城市" key="2" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in nativecitylist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="employeesform.OriginAreaId" filterable placeholder="选择区县" key="3" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in nativearealist" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="户籍地" class="path">
                  <el-select v-model="censusprovince" filterable placeholder="选择省份" key="4" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in censusprovincelist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="censuscity" filterable placeholder="选择城市" key="5" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in censuscitylist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="employeesform.ResidenceAreaId" filterable placeholder="选择区县" key="6" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in censusarealist" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="身份证地址" class="path">
                  <el-select v-model="identityprovince" filterable placeholder="选择省份" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in identityprovincelist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="identitycity" filterable placeholder="选择城市" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in identitycitylist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="employeesform.RegAreaId" filterable placeholder="选择区县" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in identityarealist" :key="index"></el-option>
                  </el-select>
                  <el-input v-model="employeesform.RegAddress" placeholder="请输入详情地址" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="居住地" class="path">
                  <el-select v-model="placeprovince" filterable placeholder="选择省份" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in placeprovincelist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="placecity" filterable placeholder="选择城市" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in placecitylist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="employeesform.AreaId" filterable placeholder="选择区县" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in placearealist" :key="index"></el-option>
                  </el-select>
                  <el-input v-model="employeesform.Address" placeholder="请输入详细地址" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 健康状况 -->
          <div class="form-title">健康状况</div>
          <div class="form-cont">
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="视力">
                  <el-radio-group v-model="employeesform.Eye">
                    <el-radio :label="0">良好</el-radio>
                    <el-radio :label="1">辅助</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="听力">
                  <el-radio-group v-model="employeesform.Listen">
                    <el-radio :label="0">良好</el-radio>
                    <el-radio :label="1">辅助</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="伤残情况" class="crosswise">
                  <el-row :gutter="64">
                    <el-col>
                      <el-form-item label="是否曾被认定为工伤或职业病或持有残疾人证明" class="smallcrosswise">
                        <el-radio-group v-model="employeesform.Diseases">
                          <el-radio :label="0">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="64">
                    <el-col>
                      <el-form-item label="是否被劳动能力鉴定委员会委员会鉴定为具有伤残等级" class="smallcrosswise">
                        <el-radio-group v-model="employeesform.Disability" @change="chooseDisability">
                          <el-radio :label="0">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                        <el-input v-show="employeesform.Disability === 1" placeholder="请输入伤残等级" v-model="employeesform.DisabilityLevel" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="64">
                    <el-col>
                      <el-form-item label="是否从事过井下、高空、高温、特别繁重体力劳动以及有毒有害工种" class="smallcrosswise">
                        <el-radio-group v-model="employeesform.BadWork">
                          <el-radio :label="0">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="64">
                    <el-col>
                      <el-form-item label="是否有传染性疾病" class="smallcrosswise">
                        <el-radio-group v-model="employeesform.Transmit" @change="chooseTransmit">
                          <el-radio :label="0">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                        <el-input v-show="employeesform.Transmit === 1" placeholder="请输入传染病类型" v-model="employeesform.TransmitName" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="64">
                    <el-col>
                      <el-form-item label="最近6个月内接受的医学治疗及医学检查" class="text">
                        <el-input type="textarea" :rows="6" v-model="employeesform.MedicalCheck" maxlength="500" show-word-limit></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 社保信息 -->
          <div class="form-title" ref="manage">工资社保公积金信息</div>
          <div class="form-cont">
            <!-- 任何时候都展示 -->
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="缴纳社保" class="datetime">
                  <el-radio-group v-model="employeesform.SiStatus">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="社保缴纳起始年月" class="datetime" v-show="employeesform.SiStatus==1">
                  <el-date-picker v-model="socialtime" type="month" placeholder="选择月"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="缴纳公积金" class="datetime">
                  <el-radio-group v-model="employeesform.FundStatus">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="公积金缴纳起始年月" class="datetime" v-show="employeesform.FundStatus==1">
                  <el-date-picker v-model="accumulationtime" type="month" placeholder="选择月"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="缴纳医保" class="datetime">
                  <el-radio-group v-model="employeesform.MedicalStatus">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="医保缴纳起始年月" class="datetime" v-show="employeesform.MedicalStatus==1">
                  <el-date-picker v-model="Medicaltime" type="month" placeholder="选择月"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="BankAccount" label="工资卡银行账号" prop="BankAccount" :rules="Addrules.BankAccount" key="100">
                  <el-input v-model="employeesform.BankAccount" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="BankOwner" label="工资卡户主" prop="BankOwner" :rules="Addrules.BankOwner" key="101">
                  <el-input v-model="employeesform.BankOwner" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="BankAccountType" label="工资账户类型" prop="BankAccountType" :rules="Addrules.BankAccountType" key="106">
                  <el-select v-model="employeesform.BankAccountType" placeholder="选择工资账户类型" clearable>
                    <el-option label="工资卡" :value="0"></el-option>
                    <el-option label="存折" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="BankName" label="工资卡开户行" prop="BankName" :rules="Addrules.BankName" key="102">
                  <el-select v-model="employeesform.BankName" filterable placeholder="选择工资卡开户行" clearable>
                    <el-option :label="item.ClassName" :value="item.Id" v-for="(item, index) in BankList" :key="item.Id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="工资卡开户支行">
                  <el-input v-model="employeesform.BankBranch"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="工资打款账号">
                  <!-- <el-input v-model="employeesform.BfBankId" clearable></el-input> -->
                  <el-select ref="searchselect" v-model="employeesform.BfBankId" filterable remote clearable placeholder="搜索选择工资打款账号" :remote-method="getBfBankPageList" @clear="getBfBankPageList('')">
                    <el-option v-for="item in BfBankist" :key="item.Id" :label="item.BfCompanyName+'-'+item.BankName+'-'+item.Account" :value="item.Id">
                    </el-option>
                    <div v-if="BfBankist.length > 99" class="search-keyword">
                      <span>只显示前100条结果，请完善搜索关键字</span>
                    </div>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="社保制卡进度" class="select">
                  <el-select v-model="employeesform.SiProgress" filterable placeholder="选择社保制卡进度" clearable>
                    <el-option :label="item.describe" :value="item.value" v-for="(item, index) in StaffEnumSiProgress" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="SiAccount" label="社保账号" prop="SiAccount" :rules="Addrules.SiAccount" key="103">
                  <el-input v-model="employeesform.SiAccount" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="InsuranceId" label="所属公司社保打款账号" prop="InsuranceId" :rules="Addrules.InsuranceId" key="104">
                  <!-- <el-input v-model="employeesform.InsuranceId" clearable></el-input> -->
                  <el-select ref="searchselect" v-model="employeesform.InsuranceId" filterable remote clearable placeholder="搜索选择所属公司社保打款账号" :remote-method="GetBfInsuranceFundPageList0" @clear="GetBfInsuranceFundPageList0('')">
                    <el-option v-for="item in Insurancelist" :key="item.Id" :label="item.BfCompanyName + '-' +item.Account" :value="item.Id">
                    </el-option>
                    <div v-if="Insurancelist.length > 99" class="search-keyword">
                      <span>只显示前100条结果，请完善搜索关键字</span>
                    </div>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="FundAccount" label="公积金账号" prop="FundAccount" :rules="Addrules.FundAccount">
                  <el-input v-model="employeesform.FundAccount" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="FundId" label="所属公司公积金打款账号" prop="FundId" :rules="Addrules.FundId" key="105">
                  <!-- <el-input v-model="employeesform.FundId" clearable></el-input> -->
                  <el-select ref="searchselect" v-model="employeesform.FundId" filterable remote clearable placeholder="搜索选择所属公司公积金打款账号" :remote-method="GetBfInsuranceFundPageList1" @clear="GetBfInsuranceFundPageList1('')">
                    <el-option v-for="item in Fundlist" :key="item.Id" :label="item.BfCompanyName + '-' +item.Account" :value="item.Id">
                    </el-option>
                    <div v-if="Fundlist.length > 99" class="search-keyword">
                      <span>只显示前100条结果，请完善搜索关键字</span>
                    </div>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="MedicalAccount" label="医保账号" prop="MedicalAccount" :rules="Addrules.MedicalAccount">
                  <el-input v-model="employeesform.MedicalAccount" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item ref="MedicalId" label="所属公司医保打款账号" prop="MedicalId" :rules="Addrules.MedicalId" key="106">
                  <!-- <el-input v-model="employeesform.FundId" clearable></el-input> -->
                  <el-select ref="searchselect" v-model="employeesform.MedicalId" filterable remote clearable placeholder="搜索选择所属公司医保打款账号" :remote-method="GetBfInsuranceFundPageList2" @clear="GetBfInsuranceFundPageList2('')">
                    <el-option v-for="item in healthcarelist" :key="item.Id" :label="item.BfCompanyName + '-' +item.Account" :value="item.Id">
                    </el-option>
                    <div v-if="healthcarelist.length > 99" class="search-keyword">
                      <span>只显示前100条结果，请完善搜索关键字</span>
                    </div>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="社保参保地" class="path">
                  <el-select v-model="insuredprovince" filterable placeholder="选择省份" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in insuredprovincelist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="insuredcity" filterable placeholder="选择城市" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in insuredcitylist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="employeesform.SiAreaId" filterable placeholder="选择区县" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in insuredarealist" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="公积金参保地" class="path">
                  <el-select v-model="Fundprovince" filterable placeholder="选择省份" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in Fundprovincelist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="Fundcity" filterable placeholder="选择城市" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in Fundcitylist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="employeesform.FundAreaId" filterable placeholder="选择区县" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in Fundarealist" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="医保参保地" class="path">
                  <el-select v-model="Medicalprovince" filterable placeholder="选择省份" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in Medicalprovincelist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="Medicalcity" filterable placeholder="选择城市" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in Medicalcitylist" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="employeesform.MedicalAreaId" filterable placeholder="选择区县" clearable>
                    <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in Medicalarealist" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 教育背景列表 -->
          <div class="form-title">教育背景
            <div class="operate cursor-pointer" @click="addeducate()">
              <svg-icon icon-class="add" class="add" />
              <span>添加教育经历</span>
            </div>
          </div>
          <div class="form-cont">
            <el-row :gutter="64" v-if="edformlist.length">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="最高学历">
                  <el-select disabled v-model="employeesform.Diploma" filterable placeholder="选择最高学历" clearable>
                    <el-option :label="item.describe" :value="item.value" v-for="(item, index) in StaffEnumDiploma" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="最高学位">
                  <el-select disabled v-model="employeesform.Degree" filterable placeholder="选择最高学位" clearable>
                    <el-option :label="item.describe" :value="item.value" v-for="(item, index) in StaffEnumDegree" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-for="(item, index) in edformlist" :key="index">
              <el-row :gutter="64">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="毕业学校">
                    <el-input disabled v-model="item.SchoolName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="专业">
                    <el-input disabled v-model="item.Major" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="毕业起止年月" class="timequantum">
                    <el-date-picker disabled v-model="item.graduate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="学习形式" class="useraido">
                    <el-radio-group disabled v-model="item.Form">
                      <el-radio :label="item.value" v-for="(item, index) in StaffEduEnumForm" :key="index">{{item.describe}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col>
                  <div class="operate-btn">
                    <div class="btn" @click="updateed(item, index)">
                      <svg-icon icon-class="update" />
                      <span>编辑</span>
                    </div>
                    <div class="btn" @click="deleteed(item, index)">
                      <svg-icon icon-class="del" class-name="svg-a" />
                      <span>删除</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 历史工作经历 -->
          <div class="form-title">历史工作经历
            <div class="operate cursor-pointer" @click="addwork()">
              <svg-icon icon-class="add" class="add" />
              <span>添加工作经历</span>
            </div>
          </div>
          <div class="form-cont">
            <div v-for="(item, index) in historyformlist" :key="index">
              <el-row :gutter="64">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="工作单位">
                    <el-input disabled v-model="item.CompanyName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="起止时间" class="timequantum">
                    <el-date-picker disabled v-model="item.Time" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="职务">
                    <el-input disabled v-model="item.PositionName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="证明人">
                    <el-input disabled v-model="item.Prove" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="证明人联系方式">
                    <el-input disabled v-model="item.ProveTel" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <div class="operate-btn">
                    <div class="btn" @click="updatework(item, index)">
                      <svg-icon icon-class="update" />
                      <span>编辑</span>
                    </div>
                    <div class="btn" @click="deletework(item, index)">
                      <svg-icon icon-class="del" class-name="svg-a" />
                      <span>删除</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 主要家庭成员 -->
          <div class="form-title">主要家庭成员
            <div class="operate cursor-pointer" @click="addfamily()">
              <svg-icon icon-class="add" class="add" />
              <span>添加家庭成员</span>
            </div>
          </div>
          <div class="form-cont">
            <div v-for="(item, index) in familyformlist" :key="index">
              <el-row :gutter="64">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="姓名">
                    <el-input disabled v-model="item.UserName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="与本人关系">
                    <el-input disabled v-model="item.Relation" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="工作单位">
                    <el-input disabled v-model="item.CompanyName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="职务">
                    <el-input disabled v-model="item.PositionName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="联系电话">
                    <el-input disabled v-model="item.Tel" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <div class="operate-btn">
                    <div class="btn" @click="updatefamily(item, index)">
                      <svg-icon icon-class="update" />
                      <span>编辑</span>
                    </div>
                    <div class="btn" @click="deletefamily(item, index)">
                      <svg-icon icon-class="del" class-name="svg-a" />
                      <span>删除</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 就业情况 -->
          <div class="form-title">入职就业情况
            <div class="operate cursor-pointer" @click="addjob()">
              <svg-icon icon-class="add" class="add" />
              <span>入职就业情况</span>
            </div>
          </div>
          <!-- <div class="form-cont"> -->
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="原单位离职证明状态">
                <!-- <el-input v-model="employeesform.LastQuitCert" clearable></el-input> -->
                <el-select v-model="employeesform.LastQuitCert" filterable placeholder="选择原单位离职证明状态" clearable>
                  <el-option label="未提交" :value="0"></el-option>
                  <el-option label="已提交" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="入职公司">
                <!-- <el-input v-model="employeesform.BfCompanyId" clearable></el-input> -->
                <el-select ref="searchselect" v-model="employeesform.BfCompanyId" filterable remote clearable placeholder="搜索选择入职公司" :remote-method="BfCompanyMethod" @clear="BfCompanyMethod('')">
                  <el-option v-for="item in BfCompanylist" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                  <div v-if="BfCompanylist.length > 99" class="search-keyword">
                    <span>只显示前100条结果，请完善搜索关键字</span>
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="入职时间" class="datetime">
                <el-date-picker clearable v-model="employeesform.JoinTime" placeholder="选择年月日">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- </div> -->
          <div class="form-cont">
            <div v-for="(item, index) in jobformlist" :key="index" class="dotted">
              <el-row :gutter="64">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="用工单位">
                    <el-input disabled v-model="item.CompanyName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="就职项目">
                    <el-input disabled v-model="item.ProjectName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="入职项目时间" class="datetime">
                    <el-date-picker disabled clearable v-model="item.EntryTime" placeholder="选择年月日">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                  <el-form-item label="工作岗位">
                    <el-input disabled v-model="item.PositionName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                  <el-form-item label="工作地" class="path">
                    <el-input disabled style="width:150px;margin-right:20px;" v-model="item.workprovinceName"></el-input>
                    <el-input disabled style="width:150px;margin-right:20px;" v-model="item.workcityName"></el-input>
                    <el-input disabled style="width:150px;margin-right:20px;" v-model="item.workareaName"></el-input>
                    <el-input disabled style="100%" v-model="item.Address" placeholder="请输入详情地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <div class="operate-btn">
                    <div class="btn" @click="updatejob(item, index)">
                      <svg-icon icon-class="update" />
                      <span>编辑</span>
                    </div>
                    <div class="btn" @click="deletejob(item, index)">
                      <svg-icon icon-class="del" class-name="svg-a" />
                      <span>删除</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 个税计算规则 -->
          <div class="form-title">个税计算规则</div>
          <div class="form-cont">
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="个税计算规则">
                  <!-- <el-input v-model="employeesform.PersonalTaxRuleId"></el-input> -->
                  <el-select ref="searchselect" v-model="employeesform.PersonalTaxRuleId" filterable clearable placeholder="搜索选择个税计算规则">
                    <el-option v-for="item in TaxRulelist" :key="item.Id" :label="item.RuleName" :value="item.Id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 附件 -->
          <div class="form-title">附件</div>
          <div class="tip">上传员工信息附件，包括离职证明，学历证书，健康证明等，上传格式PNG.JPG.Word.PDF</div>
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
        </div>

        <!-- 薪资待遇规则 -->
        <div v-show="tabindex==1">
          <!-- 工资计算规则 -->
          <div class="form-title">工资计算规则</div>
          <div class="form-cont">
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="选择已有工资计算规则" class="w336">
                  <el-select ref="searchselect" v-model="SalayRule" filterable remote clearable placeholder="搜索选择工资计算规则" :remote-method="SalayRuleMethod" @clear="SalayRuleMethod('')">
                    <el-option v-for="item in SalayRulelist" :key="item.Id" :label="item.RuleName" :value="item.Id">
                    </el-option>
                    <div v-if="SalayRulelist.length > 99" class="search-keyword">
                      <span>只显示前100条结果，请完善搜索关键字</span>
                    </div>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="基本工资">
                  <el-input v-model="SalayRuleDetail.BaseSalary">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="选择客户公司">
                  <el-input v-model="SalayRuleDetail.Zip"></el-input>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="适用项目">
                  <el-input v-model="SalayRuleDetail.ProjectId"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="工作形式">
                  <el-select ref="searchselect" v-model="SalayRuleDetail.WorkType" clearable placeholder="搜索选择工作形式">
                    <el-option label="固定工资" :value="0"></el-option>
                    <el-option label="计时" :value="1"></el-option>
                    <el-option label="计件" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="岗位工资">
                  <el-input v-model="SalayRuleDetail.PostSalary">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="绩效工资">
                  <el-input v-model="SalayRuleDetail.PerformSalary">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="日常加班工资/小时">
                  <el-input v-model="SalayRuleDetail.UsualOverTime">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="节假日加班工资/小时">
                  <el-input v-model="SalayRuleDetail.HolidayOverTime">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="计时/计件工资">
                  <el-input v-model="SalayRuleDetail.UnitSalary">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="房补">
                  <el-input v-model="SalayRuleDetail.HouseSupport">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="餐补">
                  <el-input v-model="SalayRuleDetail.MealSupport">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="交通补">
                  <el-input v-model="SalayRuleDetail.TrafficSupport">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="通讯补">
                  <el-input v-model="SalayRuleDetail.CommSupport">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="高温补">
                  <el-input v-model="SalayRuleDetail.HighTempSupport">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="出差补贴">
                  <el-input v-model="SalayRuleDetail.TravelSupport">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="过节费">
                  <el-input v-model="SalayRuleDetail.Zip"></el-input>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="劳保用品费">
                  <el-input v-model="SalayRuleDetail.Zip"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="工会费用代扣">
                  <el-input v-model="SalayRuleDetail.UnionFee">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="其他补贴">
                  <el-input v-model="SalayRuleDetail.OtherSupport">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 社保计算规则 -->
          <div class="form-title">社保计算规则</div>
          <div class="form-cont">
            <el-row :gutter="16">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="社保缴纳规则" class="w336">
                  <el-select ref="searchselect" v-model="SIRule" filterable remote clearable placeholder="搜索选择社保缴纳规则" :remote-method="SIRuleMethod" @clear="SIRuleMethod('')">
                    <el-option v-for="item in SIRulelist" :key="item.Id" :label="item.RuleName" :value="item.Id">
                    </el-option>
                    <div v-if="SIRulelist.length > 99" class="search-keyword">
                      <span>只显示前100条结果，请完善搜索关键字</span>
                    </div>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="养老缴纳基数" class="w280">
                  <el-input v-model="SIRuleDetail.PensionBase" clearable>
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="养老缴纳计算方式" class="w280 ">
                  <el-radio-group v-model="SIRuleDetail.PensionType">
                    <el-radio :label="0">百分比</el-radio>
                    <el-radio :label="1">固定值</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="基本养老保险比例（企业部分）" class="w280">
                  <el-input v-model="SIRuleDetail.PensionCompany">
                    <svg-icon v-if="SIRuleDetail.PensionType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.PensionType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="基本养老保险比例（个人部分）" class="w280">
                  <el-input v-model="SIRuleDetail.PensionPersonal">
                    <svg-icon v-if="SIRuleDetail.PensionType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.PensionType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="失业保险缴纳基数" class="w280">
                  <el-input v-model="SIRuleDetail.UnemployBase">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="失业保险缴纳计算方式" class="w280">
                  <el-radio-group v-model="SIRuleDetail.UnemployType">
                    <el-radio :label="0">百分比</el-radio>
                    <el-radio :label="1">固定值</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="失业保险比例（企业部分）" class="w280">
                  <el-input v-model="SIRuleDetail.UnemployCompany">
                    <svg-icon v-if="SIRuleDetail.UnemployType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.UnemployType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="失业保险比例（个人部分）" class="w280">
                  <el-input v-model="SIRuleDetail.UnemployPersonal">
                    <svg-icon v-if="SIRuleDetail.UnemployType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.UnemployType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="工商保险缴纳基数" class="w280">
                  <el-input v-model="SIRuleDetail.InjuryBase">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="工商保险缴纳计算方式" class="w280">
                  <el-radio-group v-model="SIRuleDetail.InjuryType">
                    <el-radio :label="0">百分比</el-radio>
                    <el-radio :label="1">固定值</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="工伤保险比例（企业部分）" class="w280">
                  <el-input v-model="SIRuleDetail.InjuryCompany">
                    <svg-icon v-if="SIRuleDetail.InjuryType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.InjuryType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="工伤保险比例（个人部分）" class="w280">
                  <el-input v-model="SIRuleDetail.InjuryPersonal">
                    <svg-icon v-if="SIRuleDetail.InjuryType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.InjuryType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="医疗保险缴纳基数" class="w280">
                  <el-input v-model="SIRuleDetail.MedicalBase">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="医疗保险缴纳计算方式" class="w280">
                  <el-radio-group v-model="SIRuleDetail.MedicalType">
                    <el-radio :label="0">百分比</el-radio>
                    <el-radio :label="1">固定值</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="医疗保险比例（企业部分）" class="w280">
                  <el-input v-model="SIRuleDetail.MedicalCompany">
                    <svg-icon v-if="SIRuleDetail.MedicalType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.MedicalType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="医疗保险比例（个人部分）" class="w280">
                  <el-input v-model="SIRuleDetail.MedicalPersonal">
                    <svg-icon v-if="SIRuleDetail.MedicalType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.MedicalType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="生育保险缴纳基数" class="w280">
                  <el-input v-model="SIRuleDetail.BirthBase">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="生育保险缴纳计算方式" class="w280">
                  <el-radio-group v-model="SIRuleDetail.BirthType">
                    <el-radio :label="0">百分比</el-radio>
                    <el-radio :label="1">固定值</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="生育保险比例（企业部分）" class="w280">
                  <el-input v-model="SIRuleDetail.BirthCompany">
                    <svg-icon v-if="SIRuleDetail.BirthType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.BirthType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="生育保险比例（个人部分）" class="w280">
                  <el-input v-model="SIRuleDetail.BirthPersonal">
                    <svg-icon v-if="SIRuleDetail.BirthType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.BirthType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="大病医疗缴纳基数" class="w280">
                  <el-input v-model="SIRuleDetail.BigMedicalBase">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="大病医疗缴纳计算方式" class="w280">
                  <el-radio-group v-model="SIRuleDetail.BigMedicalType">
                    <el-radio :label="0">百分比</el-radio>
                    <el-radio :label="1">固定值</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="大病医疗保险（企业部分）" class="w280">
                  <el-input v-model="SIRuleDetail.BigMedicalCompany">
                    <svg-icon v-if="SIRuleDetail.BigMedicalType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.BigMedicalType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="大病医疗保险（个人部分）" class="w280">
                  <el-input v-model="SIRuleDetail.BigMedicalPersonal">
                    <svg-icon v-if="SIRuleDetail.BigMedicalType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.BigMedicalType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 公积金计算规则 -->
          <div class="form-title">公积金计算规则</div>
          <div class="form-cont">
            <el-row :gutter="64">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="公积金缴纳规则" class="w336">
                  <!-- <el-input v-model="employeesform.Zip"></el-input> -->
                  <el-select ref="searchselect" v-model="FundRule" filterable remote clearable placeholder="搜索选择公积金缴纳规则" :remote-method="FundRuleMethod" @clear="FundRuleMethod('')">
                    <el-option v-for="item in FundRulelist" :key="item.Id" :label="item.RuleName" :value="item.Id">
                    </el-option>
                    <div v-if="FundRulelist.length > 99" class="search-keyword">
                      <span>只显示前100条结果，请完善搜索关键字</span>
                    </div>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="缴纳基数">
                  <el-input v-model="FundRuleDetail.FundBase">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="公积金计算方式">
                  <el-radio-group v-model="FundRuleDetail.FundType">
                    <el-radio :label="0">百分比</el-radio>
                    <el-radio :label="1">固定值</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="公积金缴纳比例（企业部分）">
                  <el-input v-model="FundRuleDetail.FundCompany">
                    <svg-icon v-if="FundRuleDetail.FundType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="FundRuleDetail.FundType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="公积金缴纳比例（个人部分）">
                  <el-input v-model="FundRuleDetail.FundPersonal">
                    <svg-icon v-if="FundRuleDetail.FundType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="FundRuleDetail.FundType==1" slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

      </el-form>
    </div>
    <div class="bottom">
      <el-button class="erpbtn" size="small" @click="cancel">取消</el-button>
      <el-button class="erpbtn" v-show="tabindex==0" size="small" @click="choosetab(1)">前往设置薪资待遇</el-button>
      <el-button class="erpbtn" v-show="tabindex==1" size="small" @click="choosetab(0)">返回员工信息录入</el-button>
      <el-button class="erpbtn" size="small" @click="onSubmit" v-if="!isupdate">直接保存</el-button>
      <el-button class="erpbtn" size="small" @click="upSubmit" v-if="isupdate">修改</el-button>
    </div>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
    <div class="dialog">
      <!-- 教育经历弹框 -->
      <el-dialog :close-on-click-modal="false" :title="edtitle" :visible.sync="eddialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <el-form :model="edcondata" label-position="top" :rules="rules" ref="edcondata" label-width="100px" class="operateform">
          <el-form-item label="学历" class="select">
            <el-select v-model="edcondata.Diploma" filterable placeholder="选择学历" clearable>
              <el-option :label="item.describe" :value="item.value" v-for="(item, index) in StaffEduEnumDiploma" :key="index+item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学位" class="select">
            <el-select v-model="edcondata.Degree" filterable placeholder="选择学位" clearable>
              <el-option :label="item.describe" :value="item.value" v-for="(item, index) in StaffEduEnumDegree" :key="item.describe+index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业学校">
            <el-input v-model="edcondata.SchoolName" placeholder="请输入毕业学校" clearable></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="edcondata.Major" clearable></el-input>
          </el-form-item>
          <el-form-item label="毕业起止时间" class="timequantum">
            <el-date-picker v-model="edcondata.graduate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
          </el-form-item>
          <el-form-item label="学习形式" class="useraido">
            <el-radio-group v-model="edcondata.Form">
              <el-radio :label="item.value" v-for="(item, index) in StaffEduEnumForm" :key="index">{{item.describe}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveed(edcondata)">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 历史工作经历 -->
      <el-dialog :close-on-click-modal="false" :title="historytitle" :visible.sync="historydialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <el-form :model="historycondata" label-position="top" :rules="rules" ref="historycondata" label-width="100px" class="operateform">
          <el-form-item label="工作单位">
            <el-input v-model="historycondata.CompanyName" placeholder="请输入工作单位" clearable></el-input>
          </el-form-item>
          <el-form-item label="起止日期" class="timequantum">
            <el-date-picker v-model="historycondata.Time" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
          </el-form-item>
          <el-form-item label="职务">
            <el-input v-model="historycondata.PositionName" clearable></el-input>
          </el-form-item>
          <el-form-item label="证明人">
            <el-input v-model="historycondata.Prove" clearable></el-input>
          </el-form-item>
          <el-form-item label="证明人联系方式">
            <el-input v-model="historycondata.ProveTel" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="savework">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 家庭成员 -->
      <el-dialog :close-on-click-modal="false" :title="familytitle" :visible.sync="familydialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <el-form :model="familycondata" label-position="top" :rules="rules" ref="familycondata" label-width="100px" class="operateform">
          <el-form-item label="姓名">
            <el-input v-model="familycondata.UserName" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="与本人关系">
            <el-input v-model="familycondata.Relation" clearable></el-input>
          </el-form-item>
          <el-form-item label="工作单位">
            <el-input v-model="familycondata.CompanyName" clearable></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="familycondata.PositionName" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="familycondata.Tel" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="savefamily">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 入职就业情况 -->
      <el-dialog :close-on-click-modal="false" :title="jobtitle" :visible.sync="jobdialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <el-form :model="jobcondata" label-position="top" :rules="rules" ref="jobcondata" label-width="100px" class="operateform">
          <el-form-item label="用工单位" class="select">
            <el-select ref="searchselect" v-model="jobcondata.CompanyId" :loading="Companyloading" filterable remote clearable placeholder="搜索选择用工公司" :remote-method="CompanyMethod" @change="changeCompany" @clear="CompanyMethod('')">
              <el-option v-for="(item, index) in Companylist" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
              <div v-if="Companylist.length > 99" class="search-keyword">
                <span>只显示前100条结果，请完善搜索关键字</span>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="就职项目" class="select">
            <el-select ref="searchselect" v-model="jobcondata.ProjectId" :loading="Projectloading" filterable remote clearable placeholder="搜索选择就职项目" :remote-method="projectMethod" @change="changeProject" @clear="projectMethod('')">
              <el-option v-for="item in projectlist" :key="item.ProjectId" :label="item.ProjectName" :value="item.ProjectId">
              </el-option>
              <div v-if="projectlist.length > 99" class="search-keyword">
                <span>只显示前100条结果，请完善搜索关键字</span>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-date-picker clearable v-model="jobcondata.EntryTime" placeholder="选择年月日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作岗位">
            <el-input v-model="jobcondata.PositionName" clearable></el-input>
          </el-form-item>
          <el-form-item label="工作地">
            <el-select v-model="workprovince" filterable placeholder="选择省份" clearable>
              <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in workprovincelist" :key="index"></el-option>
            </el-select>
            <el-select v-model="workcity" filterable placeholder="选择城市" clearable>
              <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in workcitylist" :key="index"></el-option>
            </el-select>
            <el-select v-model="jobcondata.AreaId" filterable placeholder="选择区县" clearable>
              <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in workarealist" :key="index"></el-option>
            </el-select>
            <el-input v-model="jobcondata.Address" placeholder="请输入详情地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="savejob">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import Treeselect from '@riophae/vue-treeselect'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import SupperUploader from '@/utils/SupperUploader'
import { GetBfBankList, GetBfBankInfo, GetBfBankPageList } from '@/api/FinancialManagement'
import { GetBfInsuranceFundPageList, GetBfInsuranceFundInfo } from '@/api/CompensationServiceManagement'
import { GetStaffInfo, AddStaff, EditStaff, GetStaffFund, AddStaffFund, EditStaffFund, GetStaffSalary, AddStaffSalary, EditStaffSalary, GetStaffSi, AddStaffSi, EditStaffSi, GetStaffHistoryInfo, EditStaffStatus, EditStaffReEntry, GetStaffEduList, GetStaffEduEnum, EditStaffEdu, AddStaffEdu, DeleteStaffEdu, GetStaffWorkExpList, AddStaffWorkExp, EditStaffWorkExp, DeleteStaffWorkExp, AddStaffFamily, DeleteStaffFamily, EditStaffFamily, GetStaffFamilyList, } from '@/api/OutsourcedEmployeeManagement.js'
import { GetStaffEnum, GetCatagoryList, GetAreaList } from '@/api/Public.js'
import { GetPersonalTaxRuleList, GetSalayRuleList, GetSalayRule, GetSIRuleList, GetSIRule, GetFundRuleList, GetFundRule, GetBfCompanyPageList } from '@/api/BusinessSet.js'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList, AddProjectStaff, GetProject, GetProjectListByCompanyIds, DeleteProjectStaff, EditProjectStaff } from '@/api/projectManagement.js'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { uuid, showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    Treeselect,
    PreviewFile
  },
  data () {
    function isCnNewID (cid) {
      var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
      var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
      if (/^\d{17}\d|x$/i.test(cid)) {
        var sum = 0, idx;
        for (var i = 0; i < cid.length - 1; i++) {
          // 对前17位数字与权值乘积求和
          sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
        }
        // 计算模（固定算法）
        idx = sum % 11;
        // 检验第18为是否与校验码相等
        return arrValid[idx] == cid.substr(17, 1).toUpperCase();
      } else {
        return false;
      }
    }
    // 不校验,只验证位数
    function isCnNewID2 (cid) {
      var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
      var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
      let regexp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      if (regexp.test(cid)) {
        return true
      } else {
        return false;
      }
    }
    var validateIdCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'));
      } else {
        if (isCnNewID2(value)) {
          callback();
        } else {
          callback(new Error('请输入合法的身份证'))
        }
      }
    }
    var validateMobile = (rule, value, callback) => {
      let regexp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/
      if (!value) {
        return callback(new Error('联系电话不能为空'));
      } else {
        if (regexp.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确的联系电话'))
        }
      }
    }
    return {
      Id: '',
      peopleId: '', // 保存成功基本信息之后的Id
      urlList: [{
        name: '外派员工管理',
        router: '/OutsourcedEmployeeManagement/ExpatriateManagement'
      }, {
        name: '添加员工',
        router: ''
      }],
      tabindex: 0,
      tablist: [{
        index: 0,
        value: '员工信息录入'
      }, {
        index: 1,
        value: '薪资待遇规则设置'
      }],
      expIndex: 0, // 保存或修改接口成功的个数
      isupdate: false, // 是否修改
      isentry: false, // 是否重新入职
      employeesform: {
        UserName: '', // 用户姓名
        Sex: '', // 性别 0. 女士 1. 先生
        Birthday: '', // 出生日期
        Married: '', // 婚姻状态 (枚举)
        Photo: '', // 个人相片
        Nation: '', // 民族
        Politics: '', // 政治面貌
        ArmyMan: '', // 是否退伍军人 0.否 1.是
        Diploma: '', // 最高学历（枚举）
        Degree: '', // 最高学位（枚举）
        // School: '', // 毕业学校
        // Major: '', // 专业
        // GraduatedYear: '', // 毕业年份
        // GraduatedMonth: '', // 毕业月份
        Email: '', // 电子邮箱
        Mobile: '', // 联系电话
        EmergencyPerson: '', // 紧急联系人
        EmergencyTel: '', // 紧急联系电话
        OriginAreaId: '', // 籍贯
        ResidenceAreaId: '', // 户籍地
        RegAreaId: '', // 身份证地址
        RegAddress: '', // 身份证详细地址
        AreaId: '', // 居住地
        Address: '', // 居住地详细地址
        IdCode: '', // 身份证号码
        HealthyExam: '', // 健康体检状态（枚举）
        LastQuitCert: '', // 上家单位离职证明状态
        BfCompanyId: '', // 入职公司(锦绣内部公司)
        CompanyId: '', // 入职所在公司（客户公司）
        ProjectId: '', // 入职所在项目
        WorkAreaId: '', // 工作地
        Position: '', // 工作岗位
        JoinTime: '', // 入职时间
        BankName: '', // 工资卡开户银行
        BankBranch: '', // 工资卡开户支行
        BankAccount: '', // 工资卡银行账号
        BankOwner: '', // 工资卡户主
        SiProgress: '', // 社保制卡进度（枚举）
        SiAccount: '', // 社保账号
        SiAreaId: '', // 社保参保地
        FundAreaId: '',//公积金参保地
        MedicalAreaId: '',//医保参保地
        FundAccount: '', // 公积金账号
        MedicalAccount: '',//医保账号
        BfBankId: '', // 工资打款账号(表BfBank的Id)
        InsuranceId: '', // 社保打款账号（表InsuranceFund的Id）
        FundId: '', // 公积金打款账号（表InsuranceFund的Id）
        MedicalId: '',//医保打款账号
        StaffSalaryId: '', // 工资发放标准
        StaffSiId: '', // 社保缴纳标准
        StaffFundId: '', // 公积金缴纳标准
        Status: 0, // 员工状态（枚举）
        Remark: '', // 备注
        AttachmentUrl: '', // 其它电子档附件
        RecruitResumeId: '', // 简历编号（来自招聘中心）
        SysUserId: '', // 操作人（录入人）
        SysUserName: '', // 操作人（录入人）名称
        UpdateTime: '', // 更新时间
        AddTime: '', // 入库登记时间
        // test: [], // 人员属性补贴
        Poor: '',
        Disabled: '',
        Peasant: '',
        Reset: '',
        CityLostWork: '',
        Heigh: '',
        Computer: '',
        ForignLang: '',
        Interest: '',
        SiStatus: 0, // 社保缴交状态
        FundStatus: 0, //公积金缴交状态
        MedicalStatus: 0,//医保缴交状态
        Eye: '',
        Listen: '',
        Diseases: '',
        Disability: '',
        DisabilityLevel: '',
        BadWork: '',
        Transmit: '',
        TransmitName: '',
        MedicalCheck: ''
      },

      socialtime: '', // 社保起始年月
      accumulationtime: '', // 公积金起始年月
      Medicaltime: '',//医保起始年月
      // 人员属性补贴列表
      // propertylist: [{
      //   value: 0,
      //   describe: '非农业人口(农民工)'
      // }, {
      //   value: 1,
      //   describe: '残疾人'
      // }, {
      //   value: 2,
      //   describe: '建档立卡贫困户'
      // }, {
      //   value: 2,
      //   describe: '40/50失业重新安置'
      // }],

      Nationlist: [], // 民族列表
      StaffEnumMarried: [], // 婚姻状态
      StaffEnumDiploma: [], // 最高学历
      StaffEnumDegree: [], // 最高学位
      StaffEnumHealthyExam: [], // 健康体检状态
      StaffEnumSiProgress: [], // 社保制卡进度
      StaffEnumStatus: [], // 员工状态
      StaffEnumType: [], // 员工类型
      Insurancelist: [], // 社保列表
      Fundlist: [], // 公积金列表
      healthcarelist: [],//医保列表
      BfBankist: [], // 工资列表

      province: '',
      city: '',
      provincelist: [], // 省份
      citylist: [], // 市
      arealist: [], // 区县
      // 籍贯
      nativeprovince: '',
      nativecity: '',
      nativeprovincelist: [], // 省份
      nativecitylist: [], // 市
      nativearealist: [], // 区县

      // 户籍
      censusprovince: '',
      censuscity: '',
      censusprovincelist: [], // 省份
      censuscitylist: [], // 市
      censusarealist: [], // 区县

      // 身份证地址
      identityprovince: '',
      identitycity: '',
      identityprovincelist: [],
      identitycitylist: [],
      identityarealist: [],

      // 居住地
      placeprovince: '',
      placecity: '',
      placeprovincelist: [], // 省份
      placecitylist: [], // 市
      placearealist: [], // 区县

      // 社保参保地
      insuredprovince: '',
      insuredcity: '',
      insuredprovincelist: [], // 省份
      insuredcitylist: [], // 市
      insuredarealist: [], // 区县

      // 公积金参保地
      Fundprovince: '',
      Fundcity: '',
      Fundprovincelist: [], // 省份
      Fundcitylist: [], // 市
      Fundarealist: [], // 区县

      // 医保参保地
      Medicalprovince: '',
      Medicalcity: '',
      Medicalprovincelist: [], // 省份
      Medicalcitylist: [], // 市
      Medicalarealist: [], // 区县

      // 工作地
      workprovince: '',
      workcity: '',
      workprovincelist: [], // 省份
      workcitylist: [], // 市
      workarealist: [], // 区县

      graduate: '', // 毕业时间
      ProjectId: '', // 默认就职项目
      ProjectName: '', // 默认就职项目名称
      oldprojectlist: [], // 默认就职项目列表
      projectlist: [], // 就职项目列表
      TaxRulelist: [], // 个税计算规则列表
      BfCompanylist: [], // 入职公司列表
      Companylist: [], // 用工公司列表
      CompanyId: '', // 默认用工单位
      CompanyName: '', // 默认用工单位名称
      oldCompanylist: [], // 默认用工单位列表

      SalayRule: '', // 工资计算规则
      SalayRulelist: [], // 工资计算规则列表
      SalayRuleDetail: {}, // 工资计算规则
      isupdateSalayRule: false, // 是否修改工资标准信息

      SIRule: '', // 社保计算规则
      SIRulelist: [], // 社保列表
      SIRuleDetail: { // 社保计算规则
        PensionType: 0,
        MedicalType: 0,
        UnemployType: 0,
        InjuryType: 0,
        BirthType: 0,
        BigMedicalType: 0,
      },
      isupdateSIRule: false, // 是否修改社保计算规则

      FundRule: '', // 公积金计算规则
      FundRulelist: [], // 公积金列表
      FundRuleDetail: { // 公积金详情
        FundType: 0,
      },
      isupdateFundRule: false, // 是否已经修改了公积金缴纳信息


      // 上传文件
      filterlist: [],
      fileloading: false,

      photoloading: false,
      action: '', // 图片上传地址
      photodata: {
        message: "{ImageStreamName:'file',BussinessType:0}"
      },
      imageUrl: '', // 图片上传成功样式

      cardloading: false,
      cardUrl: '', // 身份证文件地址
      isimage: true, // 身份证文件
      imgvisible: false, // 图片下拉栏

      isImg: 1,
      iframeShow: false,
      previewFileUrl: '',

      // 弹框
      isadd: false, // 是否添加
      updateId: '', // 弹框修改Id

      edtitle: '添加教育经历', // 弹框名字
      eddialogVisible: false, // 教育经历弹框
      edcondata: {}, // 弹框教育经历对象
      edformlist: [], // 教育列表
      StaffEduEnumDiploma: [], // 教育学历列表
      StaffEduEnumDegree: [], // 教育学位类型
      StaffEduEnumForm: [], // 教育学习形式
      BankList: [], // 工资开户行

      historytitle: '',
      historydialogVisible: false, // 历史工作经历弹框
      historycondata: {}, // 历史工作经历对象
      historyformlist: [], // 工作经历列表

      familytitle: '',
      familydialogVisible: false, // 家庭成员弹框
      familycondata: {},
      familyformlist: [], // 家庭成员列表

      jobformlist: [], // 就职项目列表
      jobtitle: '',
      jobdialogVisible: false, // 就业弹框
      jobcondata: {},
      Companyloading: false,
      Projectloading: false,
      rules: {
        UserName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        IdCode: [
          { required: true, validator: validateIdCard, trigger: 'change' }
        ],
        Mobile: [
          { required: true, validator: validateMobile, trigger: 'change' }
        ],
      },

      Addrules: {},
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
        this.employeesform.OriginAreaId = ''
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
              return v.Id == this.employeesform.OriginAreaId
            })
            if (isclear) {
            } else {
              this.employeesform.OriginAreaId = ''
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
        this.employeesform.OriginAreaId = ''
      }
    },
    // 籍贯反推
    "employeesform.OriginAreaId" (newvalue, oldvalue) {
      const str = this.nativearealist.find(v => {
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
              this.nativeprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.nativecity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.employeesform.OriginAreaId = select.find(v => v.Level == 3).Id
            } else {
              this.employeesform.OriginAreaId = ''
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
    // 户籍省变化
    censusprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.censuscitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.censuscitylist.find(v => {
              return v.Id == this.censuscity
            })
            if (isclear) {
            } else {
              this.censuscity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.censuscity = ''
        this.censuscitylist = []
        this.employeesform.ResidenceAreaId = ''
        this.censusarealist = []
      }
    },
    // 户籍市变化
    censuscity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.censusarealist = response.Data
            let isclear = this.censusarealist.find(v => {
              return v.Id == this.employeesform.ResidenceAreaId
            })
            if (isclear) {
            } else {
              this.employeesform.ResidenceAreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.censusarealist = []
        this.employeesform.ResidenceAreaId = ''
      }
    },
    // 户籍反推
    "employeesform.ResidenceAreaId" (newvalue, oldvalue) {
      const str = this.censusarealist.find(v => {
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
              this.censusprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.censuscity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.employeesform.ResidenceAreaId = select.find(v => v.Level == 3).Id
            } else {
              this.employeesform.ResidenceAreaId = ''
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
    // 身份证省变化
    identityprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.identitycitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.identitycitylist.find(v => {
              return v.Id == this.identitycity
            })
            if (isclear) {
            } else {
              this.identitycity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.identitycity = ''
        this.identitycitylist = []
        this.employeesform.RegAreaId = ''
        this.identityarealist = []
      }
    },
    // 身份证市变化
    identitycity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.identityarealist = response.Data
            let isclear = this.identityarealist.find(v => {
              return v.Id == this.employeesform.RegAreaId
            })
            if (isclear) {
            } else {
              this.employeesform.RegAreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.identityarealist = []
        this.employeesform.RegAreaId = ''
      }
    },
    // 身份证反推
    "employeesform.RegAreaId" (newvalue, oldvalue) {
      const str = this.identityarealist.find(v => {
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
              this.identityprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.identitycity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.employeesform.RegAreaId = select.find(v => v.Level == 3).Id
            } else {
              this.employeesform.RegAreaId = ''
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
    // 居住地省变化
    placeprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.placecitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.placecitylist.find(v => {
              return v.Id == this.placecity
            })
            if (isclear) {
            } else {
              this.placecity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.placecity = ''
        this.placecitylist = []
        this.employeesform.AreaId = ''
        this.placearealist = []
      }
    },
    // 居住地市变化
    placecity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.placearealist = response.Data
            let isclear = this.placearealist.find(v => {
              return v.Id == this.employeesform.AreaId
            })
            if (isclear) {
            } else {
              this.employeesform.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.placearealist = []
        this.employeesform.AreaId = ''
      }
    },
    // 反推居住地
    "employeesform.AreaId" (newvalue, oldvalue) {
      const str = this.placearealist.find(v => {
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
              this.placeprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.placecity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.employeesform.AreaId = select.find(v => v.Level == 3).Id
            } else {
              this.employeesform.AreaId = ''
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
    // 社保参保地省变化
    insuredprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.insuredcitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.insuredcitylist.find(v => {
              return v.Id == this.insuredcity
            })
            if (isclear) {
            } else {
              this.insuredcity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.insuredcity = ''
        this.insuredcitylist = []
        this.employeesform.SiAreaId = ''
        this.insuredarealist = []
      }
    },
    // 社保参保地市变化
    insuredcity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.insuredarealist = response.Data
            let isclear = this.insuredarealist.find(v => {
              return v.Id == this.employeesform.SiAreaId
            })
            if (isclear) {
            } else {
              this.employeesform.SiAreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.insuredarealist = []
        this.employeesform.SiAreaId = ''
      }
    },
    // 反推社保参保地
    "employeesform.SiAreaId" (newvalue, oldvalue) {
      const str = this.insuredarealist.find(v => {
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
              this.insuredprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.insuredcity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.employeesform.SiAreaId = select.find(v => v.Level == 3).Id
            } else {
              this.employeesform.SiAreaId = ''
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
    // 公积金参保地省变化
    Fundprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.Fundcitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.Fundcitylist.find(v => {
              return v.Id == this.Fundcity
            })
            if (isclear) {
            } else {
              this.Fundcity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.Fundcity = ''
        this.Fundcitylist = []
        this.employeesform.FundAreaId = ''
        this.Fundarealist = []
      }
    },
    // 公积金参保地市变化
    Fundcity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.Fundarealist = response.Data
            let isclear = this.Fundarealist.find(v => {
              return v.Id == this.employeesform.FundAreaId
            })
            if (isclear) {
            } else {
              this.employeesform.FundAreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.Fundarealist = []
        this.employeesform.FundAreaId = ''
      }
    },
    // 反推公积金参保地
    "employeesform.FundAreaId" (newvalue, oldvalue) {
      const str = this.Fundarealist.find(v => {
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
              this.Fundprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.Fundcity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.employeesform.FundAreaId = select.find(v => v.Level == 3).Id
            } else {
              this.employeesform.FundAreaId = ''
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
    // 医保参保地省变化
    Medicalprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.Medicalcitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.Medicalcitylist.find(v => {
              return v.Id == this.Medicalcity
            })
            if (isclear) {
            } else {
              this.Medicalcity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.Medicalcity = ''
        this.Medicalcitylist = []
        this.employeesform.MedicalAreaId = ''
        this.Medicalarealist = []
      }
    },
    // 医保参保地市变化
    Medicalcity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.Medicalarealist = response.Data
            let isclear = this.Medicalarealist.find(v => {
              return v.Id == this.employeesform.MedicalAreaId
            })
            if (isclear) {
            } else {
              this.employeesform.MedicalAreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.Medicalarealist = []
        this.employeesform.MedicalAreaId = ''
      }
    },
    // 反推医保参保地
    "employeesform.MedicalAreaId" (newvalue, oldvalue) {
      const str = this.Medicalarealist.find(v => {
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
              this.Medicalprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.Medicalcity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.employeesform.MedicalAreaId = select.find(v => v.Level == 3).Id
            } else {
              this.employeesform.MedicalAreaId = ''
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
    // 工作地省变化
    workprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.workcitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.workcitylist.find(v => {
              return v.Id == this.workcity
            })
            if (isclear) {

            } else {
              this.workcity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.workcity = ''
        this.workcitylist = []
        this.employeesform.WorkAreaId = ''
        this.workarealist = []
      }
    },
    // 工作地市变化
    workcity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.workarealist = response.Data
            let isclear = this.workarealist.find(v => {
              return v.Id == this.jobcondata.WorkAreaId
            })
            if (isclear) {
            } else {
              this.jobcondata.WorkAreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.workarealist = []
        this.jobcondata.WorkAreaId = ''
      }
    },
    // 反推工作地
    "jobcondata.AreaId" (newvalue, oldvalue) {
      const str = this.workarealist.find(v => {
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
              this.workprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.workcity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.jobcondata.AreaId = select.find(v => v.Level == 3).Id
            } else {
              this.jobcondata.AreaId = ''
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
    // 选择计算规则
    SalayRule (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          Id: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetSalayRule(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            // this.SalayRuleDetail = response.Data
            if (response.Data) {
              // this.SalayRuleDetail.BaseSalary = response.Data.BaseSalary
              this.$set(this.SalayRuleDetail, 'BaseSalary', response.Data.BaseSalary)
              this.$set(this.SalayRuleDetail, 'WorkType', response.Data.WorkType)
              this.$set(this.SalayRuleDetail, 'PostSalary', response.Data.PostSalary)
              this.$set(this.SalayRuleDetail, 'PerformSalary', response.Data.PerformSalary)
              this.$set(this.SalayRuleDetail, 'UsualOverTime', response.Data.UsualOverTime)
              this.$set(this.SalayRuleDetail, 'HolidayOverTime', response.Data.HolidayOverTime)
              this.$set(this.SalayRuleDetail, 'UnitSalary', response.Data.UnitSalary)
              this.$set(this.SalayRuleDetail, 'HouseSupport', response.Data.HouseSupport)
              this.$set(this.SalayRuleDetail, 'MealSupport', response.Data.MealSupport)
              this.$set(this.SalayRuleDetail, 'TrafficSupport', response.Data.TrafficSupport)
              this.$set(this.SalayRuleDetail, 'CommSupport', response.Data.CommSupport)
              this.$set(this.SalayRuleDetail, 'HighTempSupport', response.Data.HighTempSupport)
              this.$set(this.SalayRuleDetail, 'TravelSupport', response.Data.TravelSupport)
              this.$set(this.SalayRuleDetail, 'UnionFee', response.Data.UnionFee)
              this.$set(this.SalayRuleDetail, 'OtherSupport', response.Data.OtherSupport)
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {

      }
    },
    // 选择社保计算规则
    SIRule (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          Id: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetSIRule(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            // this.SIRuleDetail = response.Data
            if (response.Data) {
              this.$set(this.SIRuleDetail, 'PensionBase', response.Data.PensionBase)
              this.$set(this.SIRuleDetail, 'PensionType', response.Data.PensionType)
              this.$set(this.SIRuleDetail, 'PensionCompany', response.Data.PensionCompany)
              this.$set(this.SIRuleDetail, 'PensionPersonal', response.Data.PensionPersonal)
              this.$set(this.SIRuleDetail, 'UnemployBase', response.Data.UnemployBase)
              this.$set(this.SIRuleDetail, 'UnemployType', response.Data.UnemployType)
              this.$set(this.SIRuleDetail, 'UnemployCompany', response.Data.UnemployCompany)
              this.$set(this.SIRuleDetail, 'UnemployPersonal', response.Data.UnemployPersonal)
              this.$set(this.SIRuleDetail, 'InjuryBase', response.Data.InjuryBase)
              this.$set(this.SIRuleDetail, 'InjuryType', response.Data.InjuryType)
              this.$set(this.SIRuleDetail, 'InjuryCompany', response.Data.InjuryCompany)
              this.$set(this.SIRuleDetail, 'InjuryPersonal', response.Data.InjuryPersonal)
              this.$set(this.SIRuleDetail, 'MedicalBase', response.Data.MedicalBase)
              this.$set(this.SIRuleDetail, 'MedicalType', response.Data.MedicalType)
              this.$set(this.SIRuleDetail, 'MedicalCompany', response.Data.MedicalCompany)
              this.$set(this.SIRuleDetail, 'MedicalPersonal', response.Data.MedicalPersonal)
              this.$set(this.SIRuleDetail, 'BirthBase', response.Data.BirthBase)
              this.$set(this.SIRuleDetail, 'BirthType', response.Data.BirthType)
              this.$set(this.SIRuleDetail, 'BirthCompany', response.Data.BirthCompany)
              this.$set(this.SIRuleDetail, 'BirthPersonal', response.Data.BirthPersonal)
              this.$set(this.SIRuleDetail, 'BigMedicalBase', response.Data.BigMedicalBase)
              this.$set(this.SIRuleDetail, 'BigMedicalType', response.Data.BigMedicalType)
              this.$set(this.SIRuleDetail, 'BigMedicalCompany', response.Data.BigMedicalCompany)
              this.$set(this.SIRuleDetail, 'BigMedicalPersonal', response.Data.BigMedicalPersonal)
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {

      }
    },
    FundRule (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          Id: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetFundRule(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            // this.FundRuleDetail = response.Data
            if (response.Data) {
              this.$set(this.FundRuleDetail, 'FundBase', response.Data.FundBase)
              this.$set(this.FundRuleDetail, 'FundType', response.Data.FundType)
              this.$set(this.FundRuleDetail, 'FundCompany', response.Data.FundCompany)
              this.$set(this.FundRuleDetail, 'FundPersonal', response.Data.FundPersonal)
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {

      }
    },
    // 监听接口成功个数,如果全部成功就取消加载动画
    expIndex (newvalue, oldvalue) {
      if (newvalue == 4) {
        console.log('全部成功了');
        hideLoading()
        this.$router.go(-1)
        // 作废 现在后台从数据里面调取这些值, 不需要执行关联项目操作
        // if (this.$route.query.projectId) {
        //   // 如果有项目Id就把他添加到项目里
        //   let obj = {
        //     AddProjectStaffList: [{
        //       StaffId: this.peopleId,
        //       ProjectId: this.$route.query.projectId,
        //     }]
        //   }
        //   AddProjectStaff(qs.stringify(obj)).then(response => {
        //     if (response.IsSuccess) {
        //       this.$message({
        //         message: '添加成功!',
        //         type: 'success'
        //       })
        //       this.$router.go(-1)
        //     } else {
        //       this.$message({
        //         message: response.MessageContent,
        //         type: 'error'
        //       })
        //     }
        //   })
        // } else {
        //   this.$router.go(-1)
        // }
        // // 判断是重新入职还是修改
        // if (this.isentry) {
        //   // 调用修改状态
        //   let obj = {
        //     IdArr: this.Id,
        //     Status: 0
        //   }
        //   // 改成待入职
        //   EditStaffStatus(qs.stringify(obj)).then(response => {
        //     if (response.IsSuccess) {
        //       this.$router.go(-1)
        //     } else {
        //       this.$message({
        //         message: response.MessageContent,
        //         type: 'error'
        //       })
        //     }
        //   })
        // } else {
        //   // this.$router.go(-1)
        // }
      }
    },
    // // 监听员工状态动态添加验证
    "employeesform.Status" (newvalue, oldvalue) {
      console.log(this.employeesform.Type)
      if (newvalue === 1) {
        this.Addrules.BankAccount = [{ required: true, message: '请输入工资卡银行账号', trigger: 'blur' }]
        this.Addrules.BankOwner = [{ required: true, message: '请输入工资卡户主', trigger: 'blur' }]
        this.Addrules.BankName = [{ required: true, message: '请选择工资卡开户行', trigger: 'change' }]
        this.Addrules.BankAccountType = [{ required: true, message: '请选择工资账户类型', trigger: 'change' }]
        // this.Addrules = {
        // BankAccount: [
        //   { required: true, message: '请输入工资卡银行账号', trigger: 'blur' }
        // ],
        // BankOwner: [
        //   { required: true, message: '请输入工资卡户主', trigger: 'blur' }
        // ],
        // BankName: [
        //   { required: true, message: '请选择工资卡开户行', trigger: 'change' }
        // ],
        // SiAccount: [
        //   { required: true, message: '请输入社保账号', trigger: 'blur' }
        // ],
        // InsuranceId: [
        //   { required: true, message: '请选择所属公司社保打款账号', trigger: 'change' }
        // ],
        // FundId: [
        //   { required: true, message: '请选择所属公司公积金打款账号', trigger: 'change' }
        // ],
        // BankAccountType: [
        //   { required: true, message: '请选择工资账户类型', trigger: 'change' }
        // ]
        // }
        // if (this.employeesform.Type === 5) {
        //   delete this.Addrules.SiAccount
        //   delete this.Addrules.InsuranceId
        //   delete this.Addrules.FundId
        // }
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['BankAccount', 'BankOwner', 'BankName', 'BankAccountType'])
        })
      } else {
        // this.Addrules = {}
        delete this.Addrules.BankAccount
        delete this.Addrules.BankOwner
        delete this.Addrules.BankName
        delete this.Addrules.BankAccountType
        this.$refs.employeesform.clearValidate()
      }
    },
    // 补充动态验证
    "employeesform.SiStatus" (newvalue, oldvalue) {
      if (newvalue === 1) {
        this.Addrules.SiAccount = [
          { required: true, message: '请输入社保账号', trigger: 'blur' }
        ]
        this.Addrules.InsuranceId = [
          { required: true, message: '请选择所属公司社保打款账号', trigger: 'change' }
        ]
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['SiAccount', 'InsuranceId'])
        })
      } else {
        delete this.Addrules.SiAccount
        delete this.Addrules.InsuranceId
        this.$refs.employeesform.clearValidate()
      }
    },
    "employeesform.FundStatus" (newvalue, oldvalue) {
      if (newvalue === 1) {
        this.Addrules.FundAccount = [
          { required: true, message: '请输入公积金账号', trigger: 'blur' }
        ]
        this.Addrules.FundId = [
          { required: true, message: '请选择所属公司公积金打款账号', trigger: 'change' }
        ]
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['FundAccount', 'FundId'])
        })
      } else {
        delete this.Addrules.FundAccount
        delete this.Addrules.FundId
        this.$refs.employeesform.clearValidate()
      }
    },
    "employeesform.MedicalStatus" (newvalue, oldvalue) {
      if (newvalue === 1) {
        this.Addrules.MedicalAccount = [
          { required: true, message: '请输入医保账号', trigger: 'blur' }
        ]
        this.Addrules.MedicalId = [
          { required: true, message: '请选择所属公司医保打款账号', trigger: 'change' }
        ]
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['MedicalAccount', 'MedicalId'])
        })
      } else {
        delete this.Addrules.MedicalAccount
        delete this.Addrules.MedicalId
        this.$refs.employeesform.clearValidate()
      }
    },
    // "employeesform.Type"(newvalue, oldvalue) {
    //   if (this.employeesform.Status == 1) {
    //     if (newvalue === 5) {
    //       delete this.Addrules.SiAccount
    //       delete this.Addrules.InsuranceId
    //       delete this.Addrules.FundId
    //       this.$refs.SiAccount.clearValidate()
    //       this.$refs.InsuranceId.clearValidate()
    //       this.$refs.FundId.clearValidate()
    //     } else {
    //       this.Addrules = {
    //         BankAccount: [
    //           { required: true, message: '请输入工资卡银行账号', trigger: 'blur' }
    //         ],
    //         BankOwner: [
    //           { required: true, message: '请输入工资卡户主', trigger: 'blur' }
    //         ],
    //         BankName: [
    //           { required: true, message: '请选择工资卡开户行', trigger: 'change' }
    //         ],
    //         SiAccount: [
    //           { required: true, message: '请输入社保账号', trigger: 'blur' }
    //         ],
    //         InsuranceId: [
    //           { required: true, message: '请选择所属公司社保打款账号', trigger: 'change' }
    //         ],
    //         FundId: [
    //           { required: true, message: '请选择所属公司公积金打款账号', trigger: 'change' }
    //         ],
    //         BankAccountType: [
    //           { required: true, message: '请选择工资账户类型', trigger: 'change' }
    //         ]
    //       }
    //       this.$nextTick(() => {
    //         this.$refs.employeesform.validateField(['BankAccount', 'BankOwner', 'BankName', 'SiAccount', 'InsuranceId', 'FundId', 'BankAccountType'])
    //       })
    //     }
    //   }
    // },
    "employeesform.BankAccount" (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.BankAccount.clearValidate()
      } else {
        if (this.employeesform.Status === 1) {
          this.$nextTick(() => {
            this.$refs.employeesform.validateField(['BankAccount'])
          })
        }
      }
    },
    "employeesform.BankOwner" (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.BankOwner.clearValidate()
      } else {
        if (this.employeesform.Status === 1) {
          this.$nextTick(() => {
            this.$refs.employeesform.validateField(['BankOwner'])
          })
        }
      }
    },
    "employeesform.BankName" (newvalue, oldvalue) {
      if (this.employeesform.Status === 1) {
        if (newvalue) {
          this.$refs.BankName.clearValidate()
        } else {
          this.$nextTick(() => {
            this.$refs.employeesform.validateField(['BankName'])
          })
        }
      }
    },
    "employeesform.SiAccount" (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.SiAccount.clearValidate()
      } else {
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['SiAccount'])
        })
      }
    },
    "employeesform.InsuranceId" (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.InsuranceId.clearValidate()
      } else {
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['InsuranceId'])
        })
      }
    },
    "employeesform.FundAccount" (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.FundAccount.clearValidate()
      } else {
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['FundAccount'])
        })
      }
    },
    "employeesform.FundId" (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.FundId.clearValidate()
      } else {
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['FundId'])
        })
      }
    },
    "employeesform.MedicalAccount" (newvalue, oldvalue) {
      if (newvalue) {
        console.log(newvalue)
        this.$refs.MedicalAccount.clearValidate()
      } else {
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['MedicalAccount'])
        })
      }
    },
    "employeesform.MedicalId" (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.MedicalId.clearValidate()
      } else {
        this.$nextTick(() => {
          this.$refs.employeesform.validateField(['MedicalId'])
        })
      }
    },
    "employeesform.BankAccountType" (newvalue, oldvalue) {
      if (this.employeesform.Status === 1) {
        if (newvalue) {
          this.$refs.BankAccountType.clearValidate()
        } else {
          this.$nextTick(() => {
            this.$refs.employeesform.validateField(['BankAccountType'])
          })
        }
      }
    }
  },
  created () {
    this.Id = this.$route.query.id
    // 获取面包屑
    let breadpath = JSON.parse(window.localStorage.getItem('breadpath')) || {}
    if (window.localStorage.getItem('multipleBreadpath')) {
      this.urlList = JSON.parse(window.localStorage.getItem('multipleBreadpath'))
      this.urlList.push({
        name: '入职办理',
        router: ''
      })
    } else {
      if (breadpath.router) {
        this.urlList[0] = breadpath
      }
    }

    // 判断是添加还是修改
    if (this.Id) {
      this.isupdate = true
      this.peopleId = this.Id
      // 判断是修改还是重新入职
      let entry = this.$route.query.type
      if (entry) {
        this.isentry = true
        // 重新入职
        // this.getStaffHistoryInfo()
      } else {
        this.isentry = false
      }
      this.getStaffInfo()
      this.getStaffFund()
      this.getStaffSalary()
      this.getStaffSi()
      this.getStaffEduList()
      this.getStaffWorkExpList()
      this.getStaffFamilyList()
    } else {
      this.isupdate = false
      if (!this.$route.query.projectId) {
        this.CompanyMethod('')
      }
      this.BfCompanyMethod('')
      this.GetBfInsuranceFundPageList0('')
      this.GetBfInsuranceFundPageList1('')
      this.GetBfInsuranceFundPageList2('')
      this.getBfBankPageList('')
    }
    this.getStaffEnum()
    this.getCatagoryList()
    this.getCatagoryList5()
    this.getAreaList()
    this.getPersonalTaxRuleList()
    this.SalayRuleMethod('')
    this.SIRuleMethod('')
    this.FundRuleMethod('')
    this.getStaffEduEnum()
    // this.CompanyMethod('')
    // this.projectMethod('')
    this.$nextTick(v => {
      // this.employeesform.OriginAreaId = 250
      this.action = process.env.VUE_APP_BASE_API_UPLOAD
    })
    // 项目详情页面 项目字段和客户字段再添加的时候默认值
    if (this.$route.query.projectId) {
      // 获取项目详情
      let obj = {
        Id: this.$route.query.projectId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.employeesform.Status = 1
      GetProject(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.ProjectId = response.Data.Id
          this.ProjectName = response.Data.Name
          this.oldprojectlist = [{
            ProjectName: response.Data.Name,
            ProjectId: response.Data.Id
          }]
          this.projectlist = [{
            ProjectName: response.Data.Name,
            ProjectId: response.Data.Id
          }]
          this.CompanyId = response.Data.CompanyId
          this.CompanyName = response.Data.CompanyName
          if (response.Data.CompanyId) {
            this.Companylist = [{
              Name: response.Data.CompanyName,
              Id: response.Data.CompanyId
            }]
            this.oldCompanylist = [{
              Name: response.Data.CompanyName,
              Id: response.Data.CompanyId
            }]
          } else {
            this.CompanyMethod('')
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
  mounted () {
    // 判断是否跳转到指定位置
    if (this.$route.query.gothrough) {
      this.$nextTick(() => {
        console.log(this.$refs.manage);
        this.$refs.manage.scrollIntoView({　　// 滚动到指定节点
          block: 'center',　　　　　// 值有start,center,end，nearest，当前显示在视图区域中间
          behavior: 'smooth'　　　　// 值有auto、instant,smooth，缓动动画（当前是慢速的）
        })
      })
    }
  },
  methods: {
    // 获取外包员工信息
    getStaffInfo (isedit) {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetStaffInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            console.log(!!isedit);
            if (!!!isedit) {
              // 不传值就默认false, 调用接口时替换全部数据
              if (response.Data.BankName === 0) {
                response.Data.BankName = ''
              }
              // 处理头像数据
              if (response.Data.Photo) {
                this.imageUrl = response.Data.Photo
              }
              // 处理身份证数据
              if (response.Data.IdCodeUrl) {
                this.cardUrl = response.Data.IdCodeUrl
                // 判断是图片还是pdf
                var name = response.Data.IdCodeUrl.split('.')
                if (name[name.length - 1].toLowerCase() == 'pdf') {
                  this.isimage = false
                } else {
                  this.isimage = true
                }
              }
              // 籍贯
              if (response.Data.OriginAreaId === 0) {
                response.Data.OriginAreaId = ''
              }
              // 户籍地
              if (response.Data.ResidenceAreaId === 0) {
                response.Data.ResidenceAreaId = ''
              }
              // 身份证
              if (response.Data.RegAreaId === 0) {
                response.Data.RegAreaId = ''
              }
              // 居住地
              if (response.Data.AreaId === 0) {
                response.Data.AreaId = ''
              }
              // 社保参保地
              if (response.Data.SiAreaId === 0) {
                response.Data.SiAreaId = ''
              }
              // 公积金参保地
              if (response.Data.FundAreaId === 0) {
                response.Data.FundAreaId = ''
              }
              // 医保参保地
              if (response.Data.MedicalAreaId === 0) {
                response.Data.MedicalAreaId = ''
              }
              // 工作地
              if (response.Data.WorkAreaId === 0) {
                response.Data.WorkAreaId = ''
              }
              if (response.Data.PersonalTaxRuleId === 0) {
                response.Data.PersonalTaxRuleId = ''
              }
              // 毕业年月
              if (response.Data.GraduatedYear) {
                this.graduate = new Date(response.Data.GraduatedYear, (response.Data.GraduatedMonth - 1))
              }
              // 处理多选人员属性补贴
              if (response.Data.Poor === 0 || !response.Data.Poor) {
                response.Data.Poor = false
              } else {
                response.Data.Poor = true
              }
              if (response.Data.Disabled === 0 || !response.Data.Disabled) {
                response.Data.Disabled = false
              } else {
                response.Data.Disabled = true
              }
              if (response.Data.Peasant === 0 || !response.Data.Peasant) {
                response.Data.Peasant = false
              } else {
                response.Data.Peasant = true
              }
              if (response.Data.Reset === 0 || !response.Data.Reset) {
                response.Data.Reset = false
              } else {
                response.Data.Reset = true
              }
              if (response.Data.CityLostWork === 0 || !response.Data.CityLostWork) {
                response.Data.CityLostWork = false
              } else {
                response.Data.CityLostWork = true
              }
              // 处理入职时间
              if (!response.Data.JoinTime) {
                response.Data.JoinTime = ''
              }

              // 处理社保 公积金 医保时间
              if (response.Data.SiStartYear && response.Data.SiStartMonth) {
                this.socialtime = new Date(response.Data.SiStartYear, response.Data.SiStartMonth - 1)
              }
              if (response.Data.FundStartYear && response.Data.FundStartMonth) {
                this.accumulationtime = new Date(response.Data.FundStartYear, response.Data.FundStartMonth - 1)
              }
              if (response.Data.MedicalStartYear && response.Data.MedicalStartMonth) {
                this.Medicaltime = new Date(response.Data.MedicalStartYear, response.Data.MedicalStartMonth - 1)
              }
              // // 用工单位
              // if (response.Data.CompanyIds) {
              //   this.CompanyIds = []
              //   this.Companylist = []
              //   let array = response.Data.CompanyIds.split(',')
              //   for (let i = 0; i < array.length; i++) {
              //     this.CompanyIds.push(array[i].split('__')[0])
              //     this.Companylist.push({
              //       Name: array[i].split('__')[1],
              //       Id: array[i].split('__')[0]
              //     })
              //   }
              //   console.log(response.Data.CompanyIds);
              //   this.changeCompany()
              // } else {
              //   this.CompanyIds = []
              //   this.CompanyMethod('')
              // }
              // 入职公司
              if (response.Data.BfCompanyId) {
                this.BfCompanylist = [{
                  Name: response.Data.BfCompanyName,
                  Id: response.Data.BfCompanyId
                }]
              } else {
                response.Data.BfCompanyId = ''
                this.BfCompanyMethod('')
              }
              // 社保打款账号
              if (response.Data.InsuranceId) {
                let obj = {
                  Id: response.Data.InsuranceId,
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                GetBfInsuranceFundInfo(qs.stringify(obj)).then(response => {
                  if (response.IsSuccess) {
                    this.Insurancelist = [{
                      Id: response.Data.Id,
                      Account: response.Data.Account,
                      BfCompanyName: response.Data.BfCompanyName
                    }]
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                })
              } else {
                response.Data.InsuranceId = ''
                this.GetBfInsuranceFundPageList0('')
              }
              // 工资打款账号
              if (response.Data.BfBankId) {
                let obj = {
                  Id: response.Data.BfBankId,
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                GetBfBankInfo(qs.stringify(obj)).then(response => {
                  if (response.IsSuccess) {
                    this.BfBankist = [{
                      Id: response.Data.Id,
                      Account: response.Data.Account,
                      BfCompanyName: response.Data.BfCompanyName,
                      BankName: response.Data.BankName
                    }]
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                })
              } else {
                response.Data.BfBankId = ''
                this.getBfBankPageList('')
              }
              // 公积金打款账号
              if (response.Data.FundId) {
                let obj = {
                  Id: response.Data.FundId,
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                GetBfInsuranceFundInfo(qs.stringify(obj)).then(response => {
                  if (response.IsSuccess) {
                    this.Fundlist = [{
                      Id: response.Data.Id,
                      Account: response.Data.Account,
                      BfCompanyName: response.Data.BfCompanyName
                    }]
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                })
              } else {
                response.Data.FundId = ''
                this.GetBfInsuranceFundPageList1('')
              }
              // 医保打款账号
              if (response.Data.MedicalId) {
                let obj = {
                  Id: response.Data.MedicalId,
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                GetBfInsuranceFundInfo(qs.stringify(obj)).then(response => {
                  if (response.IsSuccess) {
                    this.healthcarelist = [{
                      Id: response.Data.Id,
                      Account: response.Data.Account,
                      BfCompanyName: response.Data.BfCompanyName
                    }]
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                })
              } else {
                response.Data.MedicalId = ''
                this.GetBfInsuranceFundPageList2('')
              }

              // 处理文件
              this.filterlist = []
              if (response.Data.AttachmentUrl) {
                var arry = response.Data.AttachmentUrl.split(';')
                for (let i = 0; i < arry.length; i++) {
                  var namelist = arry[i].split('.')
                  console.log(namelist);

                  this.filterlist.push({
                    name: namelist[namelist.length - 1],
                    Url: arry[i],
                    visible: false
                  })
                }
              }
              this.employeesform = response.Data
              if (this.employeesform.Nation == '0') {
                this.employeesform.Nation = ''
              }
              // this.projectMethod('')

              // 就职项目
              if (response.Data.ProjectIds && response.Data.ProjectIds.length > 0) {
                this.jobformlist = response.Data.ProjectIds
                for (let i = 0; i < this.jobformlist.length; i++) {
                  if (this.jobformlist[i].AreaName) {
                    let array = this.jobformlist[i].AreaName.split(',')
                    if (array.length > 0) {
                      for (let j = 0; j < array.length; j++) {
                        this.$set(this.jobformlist[i], 'workprovinceName', array[1] ? array[1] : '')
                        this.$set(this.jobformlist[i], 'workcityName', array[2] ? array[2] : '')
                        this.$set(this.jobformlist[i], 'workareaName', array[3] ? array[3] : '')
                      }
                    }
                  }
                  // let obj = {
                  //   AreaId: this.jobformlist[i].AreaId,
                  //   menuid: MenuIdDate(),
                  //   operationcode: '1'
                  // }
                  // GetAreaList(qs.stringify(obj)).then(response => {
                  //   if (response.IsSuccess) {
                  //     var select = response.Data.filter(v => {
                  //       return v.isselect
                  //     })
                  //     if (select.find(v => v.Level == 1) !== undefined) {
                  //       this.jobformlist[i].workprovinceName = select.find(v => v.Level == 1).Name
                  //     }
                  //     if (select.find(v => v.Level == 2) !== undefined) {
                  //       this.jobformlist[i].workcityName = select.find(v => v.Level == 2).Name
                  //     }
                  //     if (select.find(v => v.Level == 3) !== undefined) {
                  //       this.jobformlist[i].workareaName = select.find(v => v.Level == 3).Name
                  //     }
                  //   }
                  // })
                }
                console.log(JSON.parse(JSON.stringify(this.jobformlist)))
              } else {
                this.jobformlist = []
              }

            } else {
              // 只对就职项目进行更新, 基本信息不回填
              // 就职项目
              if (response.Data.ProjectIds && response.Data.ProjectIds.length > 0) {
                this.jobformlist = response.Data.ProjectIds
                for (let i = 0; i < this.jobformlist.length; i++) {
                  let array = this.jobformlist[i].AreaName.split(',')
                  if (array.length > 0) {
                    for (let j = 0; j < array.length; j++) {
                      this.$set(this.jobformlist[i], 'workprovinceName', array[1] ? array[1] : '')
                      this.$set(this.jobformlist[i], 'workcityName', array[2] ? array[2] : '')
                      this.$set(this.jobformlist[i], 'workareaName', array[3] ? array[3] : '')
                    }
                  }
                }
              } else {
                this.jobformlist = []
              }
            }

            // 判断是否重新入职,如果是就清空就业信息
            if (this.isentry) {
              // 重新入职清空就业信息
              this.employeesform.LastQuitCert = ''
              this.employeesform.BfCompanyId = ''
              this.employeesform.CompanyId = ''
              this.employeesform.ProjectId = ''
              this.employeesform.JoinTime = ''
              this.employeesform.Position = ''
              this.employeesform.WorkAreaId = ''
              this.employeesform.WorkAddress = ''
              this.employeesform.PersonalTaxRuleId = ''
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        setTimeout(() => {
          hideLoading()
        }, 3000);
      })
    },
    // 获取离职员工信息
    // getStaffHistoryInfo() {
    //   let obj = {
    //     Id: this.Id
    //   }
    //   GetStaffHistoryInfo(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       if (response.Data) {
    //         if (response.Data.GetStaffHistoryInfo) {
    //           // 处理头像数据
    //           if (response.Data.GetStaffHistoryInfo.Photo) {
    //             this.imageUrl = response.Data.GetStaffHistoryInfo.Photo
    //           }
    //           // 处理身份证数据
    //           if (response.Data.GetStaffHistoryInfo.IdCodeUrl) {
    //             this.cardUrl = response.Data.GetStaffHistoryInfo.IdCodeUrl
    //           }
    //           // 户籍地
    //           if (response.Data.GetStaffHistoryInfo.ResidenceAreaId === 0) {
    //             response.Data.GetStaffHistoryInfo.ResidenceAreaId = ''
    //           }
    //           // 身份证
    //           if (response.Data.GetStaffHistoryInfo.RegAreaId === 0) {
    //             response.Data.GetStaffHistoryInfo.RegAreaId = ''
    //           }
    //           // 居住地
    //           if (response.Data.GetStaffHistoryInfo.AreaId === 0) {
    //             response.Data.GetStaffHistoryInfo.AreaId = ''
    //           }
    //           // 参保地
    //           if (response.Data.GetStaffHistoryInfo.SiAreaId === 0) {
    //             response.Data.GetStaffHistoryInfo.SiAreaId = ''
    //           }
    //           this.employeesform = response.Data.GetStaffHistoryInfo
    //           // 清空就业信息
    //           this.employeesform.LastQuitCert = ''
    //           this.employeesform.BfCompanyId = ''
    //           this.employeesform.CompanyId = ''
    //           this.employeesform.ProjectId = ''
    //           this.employeesform.JoinTime = ''
    //           this.employeesform.Position = ''
    //           this.employeesform.WorkAreaId = ''
    //           this.employeesform.WorkAddress = ''
    //           this.employeesform.PersonalTaxRuleId = ''
    //         }
    //       }
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: 'error'
    //       })
    //     }
    //   })
    // },
    // 获取公积金缴纳信息
    getStaffFund () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffFund(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // 判断是否已经添加成功了公积金缴纳信息
            if (response.Data.StaffId) {
              this.isupdateFundRule = true
            } else {
              this.isupdateFundRule = false
            }
            // 判断是否重新入职
            if (this.isentry) {
            } else {
              this.FundRuleDetail = response.Data
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取工资标准信息
    getStaffSalary () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffSalary(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // this.SalayRuleDetail = response.Data
            // 判断是否已经添加了工资信息
            // console.log(response.Data.StaffId);

            if (response.Data.StaffId) {
              this.isupdateSalayRule = true
            } else {
              this.isupdateSalayRule = false
            }
            if (this.isentry) {
            } else {
              this.SalayRuleDetail = response.Data
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取社保计算规则
    getStaffSi () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffSi(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // this.SIRuleDetail = response.Data
            // 判断是否已经添加了社保计算规则
            if (response.Data.StaffId) {
              this.isupdateSIRule = true
            } else {
              this.isupdateSIRule = false
            }
            // 判断是否重新入职
            if (this.isentry) {
            } else {
              this.SIRuleDetail = response.Data
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取开户行列表
    getCatagoryList5 () {
      let obj1 = {
        ClassName: '',
        Status: 1,
        ClassType: 5,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryList(qs.stringify(obj1)).then(response => {
        if (response.IsSuccess) {
          this.BankList = response.Data
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
    // 获取外包员工信息枚举
    getStaffEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.StaffEnumMarried = response.StaffEnumMarried
          this.StaffEnumDiploma = response.StaffEnumDiploma
          this.StaffEnumDegree = response.StaffEnumDegree
          this.StaffEnumHealthyExam = response.StaffEnumHealthyExam
          this.StaffEnumSiProgress = response.StaffEnumSiProgress
          this.StaffEnumStatus = response.StaffEnumStatus
          this.StaffEnumType = response.StaffEnumType
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取社保列表
    GetBfInsuranceFundPageList0 (value) {
      let obj = {
        Type: 0,
        Account: value,
        BfCompanyName: '',
        CompanyName: '',
        Institution: '',
        ContactPerson: '',
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfInsuranceFundPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.Insurancelist = response.Data
          } else {
            this.Insurancelist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取公积金列表
    GetBfInsuranceFundPageList1 (value) {
      let obj = {
        Type: 1,
        Account: value,
        BfCompanyName: '',
        CompanyName: '',
        Institution: '',
        ContactPerson: '',
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfInsuranceFundPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.Fundlist = response.Data
          } else {
            this.Fundlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取医保列表
    GetBfInsuranceFundPageList2 (value) {
      let obj = {
        Type: 2,
        Account: value,
        BfCompanyName: '',
        CompanyName: '',
        Institution: '',
        ContactPerson: '',
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfInsuranceFundPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.healthcarelist = response.Data
          } else {
            this.healthcarelist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取工资账号列表
    getBfBankPageList (value) {
      let obj = {
        Account: value,
        BfCompanyId: '',
        BfCompanyName: '',
        BankName: '',
        SysUserName: '',
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfBankPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.BfBankist = response.Data
          } else {
            this.BfBankist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 性别识别
    changeidentity (e) {
      var IdCard = e + ''
      if (IdCard.length === 18) {
        var birth = IdCard.substring(6, 10) + "-" + IdCard.substring(10, 12) + "-" + IdCard.substring(12, 14);
        this.employeesform.Birthday = new Date(birth)
        if (parseInt(IdCard.substr(16, 1)) % 2 == 1) {
          var sex = 1 // 男
        } else {
          var sex = 0 // 女
        }
        this.employeesform.Sex = sex
        console.log(birth);
        console.log(sex);
      }
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
          this.censusprovincelist = response.Data
          this.identityprovincelist = response.Data
          this.placeprovincelist = response.Data
          this.insuredprovincelist = response.Data
          this.Fundprovincelist = response.Data
          this.Medicalprovincelist = response.Data
          this.workprovincelist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取个税计算规则
    getPersonalTaxRuleList (value) {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetPersonalTaxRuleList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.TaxRulelist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },

    // 搜索查询工资计算规则
    SalayRuleMethod (value) {
      let obj = {
        RuleName: value,
        ProjectName: '',
        SysUserName: '',
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      setTimeout(() => {
        GetSalayRuleList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data) {
              this.SalayRulelist = response.Data
            } else {
              this.SalayRulelist = []
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 500);
    },
    // 搜索计算规则
    SIRuleMethod (value) {
      let obj = {
        RuleName: value,
        SysUserName: '',
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSIRuleList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.SIRulelist = response.Data
          } else {
            this.SIRulelist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索公积金缴纳标准
    FundRuleMethod (value) {
      let obj = {
        RuleName: value,
        SysUserName: '',
        Status: -1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetFundRuleList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.FundRulelist = response.Data
          } else {
            this.FundRulelist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索入职公司
    BfCompanyMethod (value) {
      let obj = {
        Name: value,
        Level: -1,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.BfCompanylist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索用工公司
    CompanyMethod (value) {
      this.Companyloading = true
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
        this.Companyloading = false
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
    // 改变用工公司
    changeCompany () {
      if (this.jobcondata.CompanyId) {
        this.jobcondata.CompanyName = this.Companylist.find(v => v.Id == this.jobcondata.CompanyId).Name
        this.projectMethod()
      } else {
        this.jobcondata.ProjectId = ''
        this.projectlist = []
        this.Companylist = []
        this.jobcondata.ProjectName = ''
        this.CompanyMethod('')
      }
    },
    //选择项目
    changeProject () {
      if (this.jobcondata.ProjectId) {
        this.jobcondata.ProjectName = this.projectlist.find(v => v.ProjectId == this.jobcondata.ProjectId).ProjectName
      }
    },
    // 搜索查询就职项目
    projectMethod (value) {
      // 当有用工单位的时候才进行搜索
      this.Projectloading = true
      if (this.jobcondata.CompanyId) {
        let obj = {
          companyIds: this.jobcondata.CompanyId,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetProjectListByCompanyIds(qs.stringify(obj)).then(response => {
          this.Projectloading = false
          if (response.IsSuccess) {
            if (response.Data) {
              this.projectlist = response.Data
            } else {
              this.projectlist = []
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
    // 获取外包员工教育信息枚举
    getStaffEduEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffEduEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.StaffEduEnumDiploma = response.StaffEduEnumDiploma
          this.StaffEduEnumDegree = response.StaffEduEnumDegree
          this.StaffEduEnumForm = response.StaffEduEnumForm
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取教育信息列表
    getStaffEduList () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffEduList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              if (response.Data[i].StartYear !== '' && response.Data[i].StartMonth !== '' && response.Data[i].EndYear !== '' && response.Data[i].EndMonth !== '') {
                response.Data[i].graduate = [new Date(response.Data[i].StartYear, response.Data[i].StartMonth - 1), new Date(response.Data[i].EndYear, response.Data[i].EndMonth - 1)]
              }
              console.log(response.Data[i].graduate);

            }
            this.edformlist = response.Data
          } else {
            this.edformlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取外包员工工作经历列表
    getStaffWorkExpList () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffWorkExpList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              if (response.Data[i].StartYear !== '' && response.Data[i].StartMonth !== '' && response.Data[i].EndYear !== '' && response.Data[i].EndMonth !== '') {
                response.Data[i].Time = [new Date(response.Data[i].StartYear, response.Data[i].StartMonth + 1), new Date(response.Data[i].EndYear, response.Data[i].EndMonth + 1)]
              }
            }
            this.historyformlist = response.Data
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取家庭成员列表
    getStaffFamilyList () {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffFamilyList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.familyformlist = response.Data
          } else {
            this.familyformlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },

    // 教育经历弹框
    // 添加教育经历
    addeducate () {
      this.edtitle = '添加教育经历'
      this.edcondata = {
        SchoolName: '',
        Major: '',
        Diploma: '',
        Degree: '',
        Form: '',
        graduate: ''
      }
      this.isadd = true
      this.updateId = ''
      this.eddialogVisible = true
    },
    // 保存教育经历
    saveed () {
      // 判断是修改还是添加
      // 判断是否是最高
      this.employeesform.Diploma = this.edcondata.Diploma
      this.employeesform.Degree = this.edcondata.Degree
      for (let i = 0; i < this.edformlist.length; i++) {
        if (this.edcondata.Diploma > this.edformlist[i].Diploma) {
          this.employeesform.Diploma = this.edcondata.Diploma
        }
        if (this.edcondata.Degree > this.edformlist[i].Degree) {
          this.employeesform.Degree = this.edcondata.Degree
        }
      }
      // 处理数据
      if (this.edcondata.graduate) {
        this.edcondata.StartYear = this.edcondata.graduate[0].getFullYear()
        this.edcondata.StartMonth = this.edcondata.graduate[0].getMonth() + 1
        this.edcondata.EndYear = this.edcondata.graduate[1].getFullYear()
        this.edcondata.EndMonth = this.edcondata.graduate[1].getMonth() + 1
      } else {
        this.edcondata.StartYear = ''
        this.edcondata.StartMonth = ''
        this.edcondata.EndYear = ''
        this.edcondata.EndMonth = ''
      }
      if (this.Id) {
        // 修改
        if (this.isadd) {
          // 添加教育经历
          let obj = {
            AddStaffEduList: [{
              StaffId: this.Id,
              Diploma: this.edcondata.Diploma,
              Degree: this.edcondata.Degree,
              SchoolName: this.edcondata.SchoolName,
              Major: this.edcondata.Major,
              Form: this.edcondata.Form,
              StartYear: this.edcondata.StartYear,
              StartMonth: this.edcondata.StartMonth,
              EndYear: this.edcondata.EndYear,
              EndMonth: this.edcondata.EndMonth,
            }],
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          AddStaffEdu(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getStaffEduList()
              this.eddialogVisible = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          let obj = {
            Id: this.updateId,
            StaffId: this.Id,
            Diploma: this.edcondata.Diploma,
            Degree: this.edcondata.Degree,
            SchoolName: this.edcondata.SchoolName,
            Major: this.edcondata.Major,
            Form: this.edcondata.Form,
            StartYear: this.edcondata.StartYear,
            StartMonth: this.edcondata.StartMonth,
            EndYear: this.edcondata.EndYear,
            EndMonth: this.edcondata.EndMonth,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          EditStaffEdu(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getStaffEduList()
              this.eddialogVisible = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      } else {
        // 添加
        console.log(this.edcondata);

        let data = copy({
          Diploma: this.edcondata.Diploma,
          Degree: this.edcondata.Degree,
          SchoolName: this.edcondata.SchoolName,
          Major: this.edcondata.Major,
          graduate: this.edcondata.graduate,
          Form: this.edcondata.Form,
          StartYear: this.edcondata.StartYear,
          StartMonth: this.edcondata.StartMonth,
          EndYear: this.edcondata.EndYear,
          EndMonth: this.edcondata.EndMonth,
        })
        if (this.isadd) {
          this.edformlist.push(data)
          this.eddialogVisible = false
        } else {
          this.edformlist.splice(this.updateId, 1, data)
          this.eddialogVisible = false
        }
      }
    },
    // 编辑教育经历
    updateed (e, i) {
      this.edtitle = '修改教育经历'
      this.edcondata = copy(e)
      this.isadd = false
      if (this.Id) {
        this.updateId = e.Id
      } else {
        this.updateId = i
      }
      this.eddialogVisible = true
    },
    // 删除教育经历
    deleteed (e, i) {
      if (this.Id) {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        DeleteStaffEdu(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getStaffEduList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.edformlist.splice(i, 1)
      }
    },
    // 关闭教育经历弹框
    closedialog () {

    },

    // 历史工作经历
    // 添加历史工作经历
    addwork () {
      this.historytitle = '添加历史工作经历'
      this.historycondata = {
        CompanyName: '',
        PositionName: '',
        Prove: '',
        ProveTel: '',
        Time: '',
      }
      this.isadd = true
      this.updateId = ''
      this.historydialogVisible = true
    },
    // 保存工作经历
    savework () {
      // 处理数据
      if (this.historycondata.Time) {
        this.historycondata.StartYear = this.historycondata.Time[0].getFullYear()
        this.historycondata.StartMonth = this.historycondata.Time[0].getMonth() + 1
        this.historycondata.EndYear = this.historycondata.Time[1].getFullYear()
        this.historycondata.EndMonth = this.historycondata.Time[1].getMonth() + 1
      } else {
        this.historycondata.StartYear = ''
        this.historycondata.StartMonth = ''
        this.historycondata.EndYear = ''
        this.historycondata.EndMonth = ''
      }
      // 判断是修改还是添加
      if (this.Id) {
        // 修改
        if (this.isadd) {
          let obj = {
            AddStaffWorkExpList: [{
              StaffId: this.Id,
              CompanyName: this.historycondata.CompanyName,
              PositionName: this.historycondata.PositionName,
              Prove: this.historycondata.Prove,
              ProveTel: this.historycondata.ProveTel,
              StartYear: this.historycondata.StartYear,
              StartMonth: this.historycondata.StartMonth,
              EndYear: this.historycondata.EndYear,
              EndMonth: this.historycondata.EndMonth,
            }],
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          AddStaffWorkExp(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getStaffWorkExpList()
              this.historydialogVisible = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          let obj = {
            Id: this.updateId,
            StaffId: this.Id,
            CompanyName: this.historycondata.CompanyName,
            PositionName: this.historycondata.PositionName,
            Prove: this.historycondata.Prove,
            ProveTel: this.historycondata.ProveTel,
            StartYear: this.historycondata.StartYear,
            StartMonth: this.historycondata.StartMonth,
            EndYear: this.historycondata.EndYear,
            EndMonth: this.historycondata.EndMonth,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          EditStaffWorkExp(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getStaffWorkExpList()
              this.historydialogVisible = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      } else {
        // 添加
        console.log(this.historycondata);

        let data = copy({
          CompanyName: this.historycondata.CompanyName,
          PositionName: this.historycondata.PositionName,
          Prove: this.historycondata.Prove,
          ProveTel: this.historycondata.ProveTel,
          Time: this.historycondata.Time,
          StartYear: this.historycondata.StartYear,
          StartMonth: this.historycondata.StartMonth,
          EndYear: this.historycondata.EndYear,
          EndMonth: this.historycondata.EndMonth,
        })
        if (this.isadd) {
          this.historyformlist.push(data)
          this.historydialogVisible = false
        } else {
          this.historyformlist.splice(this.updateId, 1, data)
          this.historydialogVisible = false
        }
      }
    },
    // 修改历史工作经历
    updatework (e, i) {
      this.historytitle = '修改历史工作经历'
      this.historycondata = copy(e)
      this.isadd = false
      if (this.Id) {
        this.updateId = e.Id
      } else {
        this.updateId = i
      }
      this.historydialogVisible = true
    },
    // 删除历史工作经历
    deletework (e, i) {
      if (this.Id) {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        DeleteStaffWorkExp(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getStaffWorkExpList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.historyformlist.splice(i, 1)
      }
    },

    // 家庭成员
    // 添加家庭成员
    addfamily () {
      this.familytitle = '添加家庭成员'
      this.familycondata = {
        UserName: '',
        Age: '',
        Relation: '',
        CompanyName: '',
        PositionName: '',
        Tel: ''
      }
      this.isadd = true
      this.updateId = ''
      this.familydialogVisible = true
    },
    // 保存家庭成员
    savefamily () {
      if (this.Id) {
        // 修改
        if (this.isadd) {
          let obj = {
            AddStaffFamilyList: [{
              StaffId: this.Id,
              UserName: this.familycondata.UserName,
              Age: this.familycondata.Age,
              Relation: this.familycondata.Relation,
              CompanyName: this.familycondata.CompanyName,
              PositionName: this.familycondata.PositionName,
              Tel: this.familycondata.Tel,
            }],
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          AddStaffFamily(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getStaffFamilyList()
              this.familydialogVisible = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          let obj = {
            Id: this.updateId,
            StaffId: this.Id,
            UserName: this.familycondata.UserName,
            Age: this.familycondata.Age,
            Relation: this.familycondata.Relation,
            CompanyName: this.familycondata.CompanyName,
            PositionName: this.familycondata.PositionName,
            Tel: this.familycondata.Tel,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          EditStaffFamily(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getStaffFamilyList()
              this.familydialogVisible = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      } else {
        // 添加
        console.log(this.familycondata);
        let data = copy({
          UserName: this.familycondata.UserName,
          Age: this.familycondata.Age,
          Relation: this.familycondata.Relation,
          CompanyName: this.familycondata.CompanyName,
          PositionName: this.familycondata.PositionName,
          Tel: this.familycondata.Tel,
        })
        if (this.isadd) {
          this.familyformlist.push(data)
          this.familydialogVisible = false
        } else {
          this.familyformlist.splice(this.updateId, 1, data)
          this.familydialogVisible = false
        }
      }
    },
    // 修改家庭成员
    updatefamily (e, i) {
      this.familytitle = '修改家庭成员'
      this.familycondata = copy(e)
      this.isadd = false
      if (this.Id) {
        this.updateId = e.Id
      } else {
        this.updateId = i
      }
      this.familydialogVisible = true
    },
    // 删除家庭成员
    deletefamily (e, i) {
      if (this.Id) {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        DeleteStaffFamily(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getStaffFamilyList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.familyformlist.splice(i, 1)
      }
    },

    // 添加就业情况
    addjob () {
      this.jobtitle = '添加入职就业情况'
      // this.jobcondata = {
      //   CompanyId: '',
      //   CompanyName: '',
      //   ProjectId: '',
      //   ProjectName: '',
      //   EntryTime: '',
      //   PositionName: '',
      //   AreaId: '',
      //   workprovinceName: '',
      //   workcityName: '',
      //   workareaName: '',
      //   Address: ''
      // }
      // 项目页面办理入职, 第一条数据默认填充当前项目
      if (this.$route.query.projectId && this.jobformlist.length === 0) {
        this.projectlist = copy(this.oldprojectlist)
        this.Companylist = copy(this.oldCompanylist)
        this.jobcondata = {
          CompanyId: JSON.parse(JSON.stringify(this.CompanyId)),
          CompanyName: JSON.parse(JSON.stringify(this.CompanyName)),
          ProjectId: JSON.parse(JSON.stringify(this.ProjectId)),
          ProjectName: JSON.parse(JSON.stringify(this.ProjectName)),
          EntryTime: '',
          PositionName: '',
          AreaId: '',
          workprovinceName: '',
          workcityName: '',
          workareaName: '',
          Address: ''
        }
      } else {
        this.jobcondata = {
          CompanyId: '',
          CompanyName: '',
          ProjectId: '',
          ProjectName: '',
          EntryTime: '',
          PositionName: '',
          AreaId: '',
          workprovinceName: '',
          workcityName: '',
          workareaName: '',
          Address: ''
        }
      }
      this.isadd = true
      this.workprovince = ''
      this.workcity = ''
      this.updateId = ''
      this.CompanyMethod()
      this.jobdialogVisible = true
    },
    // 编辑就业情况
    updatejob (e, i) {
      this.jobtitle = '修改入职就业情况'
      this.Companylist = [{
        Id: e.CompanyId,
        Name: e.CompanyName
      }]
      this.projectlist = [{
        ProjectId: e.ProjectId,
        ProjectName: e.ProjectName
      }]
      // this.CompanyMethod(e.CompanyName)
      // this.projectMethod(e.ProjectName)
      console.log(e)
      this.jobcondata = copy(e)
      this.isadd = false
      if (this.Id) {
        this.updateId = e.Id
      } else {
        this.updateId = i
      }
      this.jobdialogVisible = true
    },
    // 保存就业情况
    savejob () {
      if (this.Id) {
        // 编辑页面
        console.log(this.jobcondata)
        if (this.isadd) {
          let obj = {
            AddProjectStaffList: [{
              StaffId: this.Id,
              ProjectId: this.jobcondata.ProjectId,
              PositionName: this.jobcondata.PositionName,
              AreaId: this.jobcondata.AreaId || this.workcity || this.workprovince,
              Address: this.jobcondata.Address,
              EntryTime: this.jobcondata.EntryTime,
            }],
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          AddProjectStaff(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getStaffInfo(true)
              this.jobdialogVisible = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          let obj = {
            Id: this.updateId,
            StaffId: this.Id,
            ProjectId: this.jobcondata.ProjectId,
            PositionName: this.jobcondata.PositionName,
            AreaId: this.jobcondata.AreaId || this.workcity || this.workprovince,
            Address: this.jobcondata.Address,
            EntryTime: this.jobcondata.EntryTime,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          EditProjectStaff(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getStaffInfo(true)
              this.jobdialogVisible = false
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      } else {
        // 添加页面
        let data = copy(this.jobcondata)
        data.AreaId = this.jobcondata.AreaId || this.workcity || this.workprovince
        let obj = {
          AreaId: this.jobcondata.AreaId || this.workcity || this.workprovince,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var select = response.Data.filter(v => {
              return v.isselect
            })
            if (select.find(v => v.Level == 1) !== undefined) {
              data.workprovinceName = select.find(v => v.Level == 1).Name
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              data.workcityName = select.find(v => v.Level == 2).Name
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              data.workareaName = select.find(v => v.Level == 3).Name
            }
          }
        })
        if (this.isadd) {
          this.jobformlist.push(data)
          console.log(this.jobformlist)
          this.jobdialogVisible = false
        } else {
          this.jobformlist.splice(this.updateId, 1, data)
          this.jobdialogVisible = false
        }
      }
    },
    // 删除就业情况
    deletejob (e, i) {
      if (this.Id) {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        DeleteProjectStaff(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getStaffInfo(true)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.jobformlist.splice(i, 1)
      }
    },

    // 选择伤残等级
    chooseDisability () {
      this.employeesform.DisabilityLevel = ''
    },
    chooseTransmit () {
      this.employeesform.TransmitName = ''
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
                'name': ext,
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
                  'name': ext,
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
      }
    },
    // 头像上传成事件
    uploadphoto (e) {
      this.photoloading = true
      var uploader
      const files = e.target.files[0]
      var path = this.action
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext !== 'png' && ext !== 'jpg') {
          this.$message({
            message: '不支持该格式',
            type: 'warning'
          })
          this.photoloading = false
          e.target.value = []
          return false
        }
        // 文件大小限制
        // if (files.size > (50 * 1024 * 1024)) {
        //   this.$message({
        //     message: '文件大小超过最大限制',
        //     type: 'warning'
        //   })
        //   this.photoloading = false
        //   return
        // }
        let datas = new FormData();
        datas.append('file', files)
        datas.append('message', "{ImageStreamName:'file',BussinessType:0}");
        axios.post(path, datas).then(res => {
          if (res.data.State) {
            this.imageUrl = res.data.ImageUrl
          }
          this.photoloading = false
          e.target.value = []
        }).catch(() => {
          this.photoloading = false
          e.target.value = []
        })
      }
    },
    uploadcard (e) {
      this.cardloading = true
      var uploader
      const files = e.target.files[0]
      var path = this.action
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext !== 'png' && ext !== 'jpg' && ext !== 'pdf') {
          this.$message({
            message: '不支持该格式',
            type: 'warning'
          })
          this.cardloading = false
          e.target.value = []
          return false
        }
        // 文件大小限制
        // if (files.size > (50 * 1024 * 1024)) {
        //   this.$message({
        //     message: '文件大小超过最大限制',
        //     type: 'warning'
        //   })
        //   this.cardloading = false
        //   return
        // }
        // 判断是什么上传
        if (ext == 'pdf') {
          // 文件上传
          uploader = new SupperUploader(path, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              this.isimage = false
              this.cardUrl = uploader.urlResult.VideoUrl
              this.cardloading = false
              this.imgvisible = false
            }
            e.target.value = []
          })
        } else {
          // 图片上传
          let datas = new FormData();
          datas.append('file', files)
          datas.append('message', "{ImageStreamName:'file',BussinessType:0}");
          axios.post(path, datas).then(res => {
            if (res.data.State) {
              this.cardUrl = res.data.ImageUrl
              this.isimage = true
            }
            this.cardloading = false
            e.target.value = []
          }).catch(() => {
            this.cardloading = false
            e.target.value = []
          })
        }
      }
    },
    // 预览身份证
    watch (e) {
      if (e) {
        const ext = e.slice(e.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = e
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + e
        } else {
          this.isImg = 1
          this.previewFileUrl = e
        }
        this.iframeShow = true
      }
    },
    // 删除身份证
    deletecard (e) {
      this.cardUrl = ''
    },
    // 删除
    deletefile (i) {
      this.filterlist.splice(i, 1)
    },
    closeFileShow (val) {
      this.iframeShow = val
    },
    // 添加公积金缴纳标准
    addStaffFund () {
      let obj = this.FundRuleDetail
      obj.StaffId = this.peopleId
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      AddStaffFund(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.expIndex++
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
          hideLoading()
        }
      })
    },
    // 修改公积金缴纳标准
    editStaffFund () {
      let obj = this.FundRuleDetail
      obj.StaffId = this.peopleId
      delete obj.SysUserId
      delete obj.SysUserName
      delete obj.UpdateTime
      delete obj.AddTime
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      EditStaffFund(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.expIndex++
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
          hideLoading()
        }
      })
    },
    // 添加工资计算标准
    addStaffSalary () {
      let obj = this.SalayRuleDetail
      obj.StaffId = this.peopleId
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      AddStaffSalary(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.expIndex++
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
          hideLoading()
        }
      })
    },
    // 修改工资计算规则
    editStaffSalary () {
      let obj = this.SalayRuleDetail
      obj.StaffId = this.peopleId
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      EditStaffSalary(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.expIndex++
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
          hideLoading()
        }
      })
    },
    // 添加社保计算规则
    addStaffSi () {
      let obj = this.SIRuleDetail
      obj.StaffId = this.peopleId
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      AddStaffSi(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.expIndex++
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
          hideLoading()
        }
      })
    },
    // 修改社保计算规则
    editStaffSi () {
      let obj = this.SIRuleDetail
      obj.StaffId = this.peopleId
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      EditStaffSi(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.expIndex++
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
          hideLoading()
        }
      })
    },
    // 取消
    cancel () {
      this.$router.go(-1)
    },
    // 直接保存
    onSubmit () {
      // console.log(this.employeesform);
      this.$refs.employeesform.validate((v, object) => {
        if (v) {
          this.expIndex = 0 // 接口成功个数
          let obj = copy(this.employeesform)
          // 是否上传头像
          if (this.imageUrl) {
            obj.Photo = this.imageUrl
          }
          // 是否上传身份证
          if (this.cardUrl) {
            obj.IdCodeUrl = this.cardUrl
          }
          // 籍贯地址处理
          obj.OriginAreaId = this.employeesform.OriginAreaId || this.nativecity || this.nativeprovince
          // 户籍地处理
          obj.ResidenceAreaId = this.employeesform.ResidenceAreaId || this.censuscity || this.censusprovince
          // 身份证地址
          obj.RegAreaId = this.employeesform.RegAreaId || this.identitycity || this.identityprovince
          // 居住地
          obj.AreaId = this.employeesform.AreaId || this.placecity || this.placeprovince
          // 社保参保地
          obj.SiAreaId = this.employeesform.SiAreaId || this.insuredcity || this.insuredprovince
          // 公积金参保地
          obj.FundAreaId = this.employeesform.FundAreaId || this.Fundcity || this.Fundprovince
          // 医保参保地
          obj.MedicalAreaId = this.employeesform.MedicalAreaId || this.Medicalcity || this.Medicalprovince
          // 毕业时间处理
          if (this.graduate) {
            obj.GraduatedYear = this.graduate.getFullYear()
            obj.GraduatedMonth = this.graduate.getMonth() + 1
          }
          // 人员属性处理
          if (obj.Poor === '' || obj.Poor === false) {
            obj.Poor = 0
          } else {
            obj.Poor = 1
          }
          if (obj.Disabled === '' || obj.Disabled === false) {
            obj.Disabled = 0
          } else {
            obj.Disabled = 1
          }
          if (obj.Peasant === '' || obj.Peasant === false) {
            obj.Peasant = 0
          } else {
            obj.Peasant = 1
          }
          if (obj.Reset === '' || obj.Reset === false) {
            obj.Reset = 0
          } else {
            obj.Reset = 1
          }
          if (obj.CityLostWork === '' || obj.CityLostWork === false) {
            obj.CityLostWork = 0
          } else {
            obj.CityLostWork = 1
          }

          // 新增处理社保 公积金 起始年月
          if (this.socialtime) {
            obj.SiStartYear = this.socialtime.getFullYear()
            obj.SiStartMonth = this.socialtime.getMonth() + 1
          } else {
            obj.SiStartYear = ''
            obj.SiStartMonth = ''
          }
          if (this.accumulationtime) {
            obj.FundStartYear = this.accumulationtime.getFullYear()
            obj.FundStartMonth = this.accumulationtime.getMonth() + 1
          } else {
            obj.FundStartYear = ''
            obj.FundStartMonth = ''
          }
          if (this.Medicaltime) {
            obj.MedicalStartYear = this.Medicaltime.getFullYear()
            obj.MedicalStartMonth = this.Medicaltime.getMonth() + 1
          } else {
            obj.MedicalStartYear = ''
            obj.MedicalStartMonth = ''
          }
          console.log(this.jobformlist)
          if (this.jobformlist && this.jobformlist.length) {
            obj.ProjectIds = this.jobformlist
          }
          // 工作地
          // obj.WorkAreaId = this.employeesform.WorkAreaId || this.workcity || this.workprovince
          // 附件上传处理
          var fils = this.filterlist.map(v => {
            return v.Url
          })
          obj.AttachmentUrl = fils.join(';')
          // console.log(obj.AttachmentUrl);
          if (this.edformlist && this.edformlist.length) {
            obj.AddStaffEduList = this.edformlist
          } else {
            obj.AddStaffEduList = []
          }
          if (this.historyformlist && this.historyformlist.length) {
            obj.AddStaffWorkExpList = this.historyformlist
          } else {
            obj.AddStaffWorkExpList = []
          }
          if (this.familyformlist && this.familyformlist.length) {
            obj.AddStaffFamilyList = this.familyformlist
          } else {
            obj.AddStaffFamilyList = []
          }
          // // 处理用工单位 就职项目
          // if (this.CompanyIds.length > 0) {
          //   obj.CompanyIds = this.CompanyIds.join(',')
          // }
          // if (this.ProjectIds.length > 0) {
          //   obj.ProjectIds = this.ProjectIds.join(',')
          // }
          obj.menuid = MenuIdDate()
          obj.operationcode = '1'
          console.log(obj);
          // return
          // 判断薪酬还未设置薪资待遇,是否保存
          if (!this.SalayRuleDetail.BaseSalary) {
            this.$confirm('您还未设置薪资待遇, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              showLoading()
              AddStaff(qs.stringify(obj)).then(response => {
                if (response.IsSuccess) {
                  this.expIndex++
                  this.peopleId = response.Data.Id
                  // console.log(2222);
                  this.addStaffFund()
                  this.addStaffSalary()
                  this.addStaffSi()
                } else {
                  this.$message({
                    message: response.MessageContent,
                    type: 'error'
                  })
                  hideLoading()
                }
              })
            }).catch(() => {
              return
            })
          } else {
            showLoading()
            AddStaff(qs.stringify(obj)).then(response => {
              if (response.IsSuccess) {
                this.expIndex++
                this.peopleId = response.Data.Id
                // console.log(2222);
                this.addStaffFund()
                this.addStaffSalary()
                this.addStaffSi()
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: 'error'
                })
                hideLoading()
              }
            })
          }
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
    // 页面切换
    choosetab (e) {
      if (e == 1) {
        this.$refs.employeesform.validate((v, object) => {
          if (v) {
            this.tabindex = e
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
      } else {
        this.tabindex = e
      }
    },
    // 修改
    upSubmit () {
      this.$refs.employeesform.validate((v, object) => {
        if (v) {
          this.expIndex = 0 // 接口成功个数
          let obj = copy(this.employeesform)
          // 是否上传头像
          if (this.imageUrl) {
            obj.Photo = this.imageUrl
          }
          // 是否上传身份证
          if (this.cardUrl) {
            obj.IdCodeUrl = this.cardUrl
          }
          // 籍贯地址处理
          obj.OriginAreaId = this.employeesform.OriginAreaId || this.nativecity || this.nativeprovince
          // 户籍地处理
          obj.ResidenceAreaId = this.employeesform.ResidenceAreaId || this.censuscity || this.censusprovince
          // 身份证地址
          obj.RegAreaId = this.employeesform.RegAreaId || this.identitycity || this.identityprovince
          // 居住地
          obj.AreaId = this.employeesform.AreaId || this.placecity || this.placeprovince
          // 社保参保地
          obj.SiAreaId = this.employeesform.SiAreaId || this.insuredcity || this.insuredprovince
          // 公积金参保地
          obj.FundAreaId = this.employeesform.FundAreaId || this.Fundcity || this.Fundprovince
          // 医保参保地
          obj.MedicalAreaId = this.employeesform.MedicalAreaId || this.Medicalcity || this.Medicalprovince
          // 毕业时间处理
          if (this.graduate) {
            obj.GraduatedYear = this.graduate.getFullYear()
            obj.GraduatedMonth = this.graduate.getMonth() + 1
          }
          // 人员属性处理
          if (obj.Poor === '' || obj.Poor === false) {
            obj.Poor = 0
          } else {
            obj.Poor = 1
          }
          if (obj.Disabled === '' || obj.Disabled === false) {
            obj.Disabled = 0
          } else {
            obj.Disabled = 1
          }
          if (obj.Peasant === '' || obj.Peasant === false) {
            obj.Peasant = 0
          } else {
            obj.Peasant = 1
          }
          if (obj.Reset === '' || obj.Reset === false) {
            obj.Reset = 0
          } else {
            obj.Reset = 1
          }
          if (obj.CityLostWork === '' || obj.CityLostWork === false) {
            obj.CityLostWork = 0
          } else {
            obj.CityLostWork = 1
          }

          // 新增处理社保公 积金 起始年月
          if (this.socialtime) {
            obj.SiStartYear = this.socialtime.getFullYear()
            obj.SiStartMonth = this.socialtime.getMonth() + 1
          } else {
            obj.SiStartYear = ''
            obj.SiStartMonth = ''
          }
          if (this.accumulationtime) {
            obj.FundStartYear = this.accumulationtime.getFullYear()
            obj.FundStartMonth = this.accumulationtime.getMonth() + 1
          } else {
            obj.FundStartYear = ''
            obj.FundStartMonth = ''
          }
          if (this.Medicaltime) {
            obj.MedicalStartYear = this.Medicaltime.getFullYear()
            obj.MedicalStartMonth = this.Medicaltime.getMonth() + 1
          } else {
            obj.MedicalStartYear = ''
            obj.MedicalStartMonth = ''
          }
          // 工作地
          obj.WorkAreaId = this.employeesform.WorkAreaId || this.workcity || this.workprovince
          // 附件上传处理
          var fils = this.filterlist.map(v => {
            return v.Url
          })
          obj.AttachmentUrl = fils.join(';')
          obj.UpdateTime = ''
          obj.Id = this.Id
          // 处理用工单位 就职项目
          // if (this.CompanyIds.length > 0) {
          //   obj.CompanyIds = this.CompanyIds.join(',')
          // }
          // if (this.ProjectIds.length > 0) {
          //   obj.ProjectIds = this.ProjectIds.join(',')
          // }
          obj.menuid = MenuIdDate()
          obj.operationcode = '1'
          console.log(obj);
          if (!this.isentry) {
            showLoading()
            EditStaff(qs.stringify(obj)).then(response => {
              if (response.IsSuccess) {
                this.expIndex++
                // 判断是添加公积金还是修改公积金
                if (this.isupdateFundRule) {
                  this.editStaffFund()
                } else {
                  this.addStaffFund()
                }
                // 判断是添加工资标准还是修改工资标准
                if (this.isupdateSalayRule) {
                  this.editStaffSalary()
                } else {
                  this.addStaffSalary()
                }
                // 判断是添加社保计算还是修改社保计算
                if (this.isupdateSIRule) {
                  this.editStaffSi()
                } else {
                  this.addStaffSi()
                }
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: 'error'
                })
                hideLoading()
              }
            })
          } else {
            // 重新入职
            showLoading()
            EditStaffReEntry(qs.stringify(obj)).then(response => {
              if (response.IsSuccess) {
                this.expIndex++
                // 判断是添加公积金还是修改公积金
                if (this.isupdateFundRule) {
                  this.editStaffFund()
                } else {
                  this.addStaffFund()
                }
                // 判断是添加工资标准还是修改工资标准
                if (this.isupdateSalayRule) {
                  this.editStaffSalary()
                } else {
                  this.addStaffSalary()
                }
                // 判断是添加社保计算还是修改社保计算
                if (this.isupdateSIRule) {
                  this.editStaffSi()
                } else {
                  this.addStaffSi()
                }
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: 'error'
                })
                hideLoading()
              }
            })
          }
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
    }
  },
  beforeDestroy () {
    window.localStorage.removeItem('multipleBreadpath')
  }
}
</script>

<style lang="scss">
.add-expatriate-employees-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .form-content {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
    // margin-bottom: 80px;
    .employeesform {
      // tab分页
      .employesstab {
        margin-bottom: 40px;
        display: flex;
        height: 40px;
        border-radius: 8px;
        overflow: hidden;
        .tablist {
          flex: 1;
          line-height: 40px;
          text-align: center;
          background-color: #f5f5f5;
          color: $erp999;
          &.active {
            background-color: #e0edff;
            color: $erpcolor;
          }
        }
      }
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
      .upload.el-col {
        height: 295px;
        // margin-bottom: 75px;
      }
      // 表格样式
      .el-form-item {
        min-height: 64px;
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
          line-height: 44px;
          .el-input__inner {
            background-color: $erinputbgc;
          }
          .el-select {
            width: 100%;
          }
          > .el-radio-group {
            // max-width: 280px;
            .el-radio {
              margin-right: 74px;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
        &.w336 {
          .el-form-item__content {
            max-width: 336px;
          }
        }
        // 宽度280的样式
        &.w280 {
          height: 89px;
          .el-form-item__content {
            // max-width: 280px;
            width: 100%;
            > .el-radio-group {
              // max-width: 280px;
              .el-radio {
                margin-right: 74px;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
        // 头像身份证附件上传样式
        &.upload {
          .photo-box {
            max-width: 177px;
            height: 247px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            background-color: $erinputbgc;
            > input {
              width: 100%;
              height: 100%;
              position: absolute;
              cursor: pointer;
              opacity: 0;
              z-index: 99;
            }
            > img {
              width: 100%;
              height: 100%;
            }
            > .photo-con {
              text-align: center;
              width: 100%;
              height: 100%;
              position: relative;
              > svg {
                display: block;
                position: absolute;
                color: $erpplaceholder;
                left: 50%;
                top: 40%;
                font-size: 32px;
                transform: translate(-50%, -50%);
              }
              > span {
                display: block;
                width: 90px;
                position: absolute;
                font-size: $f14;
                line-height: 20px;
                color: $erpplaceholder;
                left: 50%;
                top: 60%;
                transform: translate(-50%, -50%);
              }
              .filetype {
                position: absolute;
                width: 56px;
                height: 34px;
                line-height: 34px;
                border-radius: 8px;
                background-color: $erpcolor;
              }
              .img-box-hover {
                position: absolute;
                width: 100%;
                display: flex;
                bottom: 0;
                height: 40px;
                line-height: 40px;
                background: rgba(0, 0, 0, 0.4);
                .btn {
                  flex: 1;
                  width: 40px;
                  position: relative;
                  color: #fff;
                  margin-left: 0;
                  cursor: pointer;
                  > input {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    position: absolute;
                    cursor: pointer;
                  }
                  > svg {
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        // 地址样式
        &.path {
          .el-form-item__content {
            max-width: 100%;
            display: flex;
            .el-select {
              max-width: 240px !important;
              margin-right: 24px;
              margin-bottom: 12px;
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
        // 时间段
        &.timequantum {
          .el-date-editor {
            width: 100%;
          }
          .el-range-separator {
            width: 10%;
          }
          .el-range-input {
            background-color: $erinputbgc;
          }
        }
        // vue-tree-input样式
        &.vue-tree {
          .el-form-item__content {
            .vue-treeselect {
              min-height: 40px;
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
            }
          }
        }
        // 健康状态横向选择
        &.crosswise {
          .el-form-item__content {
            .smallcrosswise {
              min-height: 40px;
              .el-form-item__label {
                line-height: 40px;
                padding-bottom: 0;
                width: 500px;
                margin-right: 64px;
              }
              .el-form-item__content {
                display: inline-block;
                width: 360px;
                .el-input {
                  width: 160px;
                  margin-left: 16px;
                }
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
          border-bottom: none;
        }
        .dotted {
          border-top: 1px dotted $erpBK;
          margin-top: 24px;
          padding-top: 24px;
        }
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