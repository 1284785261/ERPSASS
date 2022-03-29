<!-- 添加人才信息 -->
<template>
  <div class="add-information-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="Information" label-position="top" :model="Information" :rules="rules" label-width="140px" class="Information">
        <div class="form-title">基本信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="UserName" label="员工姓名" prop="UserName">
                <el-input v-model="Information.UserName"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="Information.Sex">
                  <!-- <el-radio :label="null">未知</el-radio> -->
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="民族">
                <el-select v-model="Information.Nation" filterable placeholder="选择民族">
                  <el-option :label="item.ClassName" :value="item.Id" v-for="(item, i) in Nationlist" :key="999 + i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="IdCode" label="身份证号码">
                <el-input v-model="Information.IdCode" @input="changeidentity(Information.IdCode)"></el-input>
              </el-form-item>
              <!-- <el-form-item label="招聘渠道">
                <el-select
                  v-model="Information.recruitmentChannel"
                  @change="selectRecruitmentChannel(recruitmentDatas)"
                >
                  <el-option
                    v-for="item in recruitmentDatas"
                    :key="item.Id"
                    :value="item.ChannelName"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="出生日期" class="datetime">
                <el-date-picker v-model="Information.Birthday" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="健康体检状态">
                <el-radio-group v-model="Information.HealthyExam">
                  <el-radio :label="item.value" v-for="(item, index) in StaffEnumHealthyExam" :key="index">{{item.describe}}</el-radio>
                </el-radio-group>
              </el-form-item> -->
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="upload">
              <el-form-item label="个人照片" class="upload" v-loading="photoloading">
                <div class="photo-box" v-show="!imageUrl">
                  <input type="file" @change="uploadphoto" accept="image/png,image/jpeg" />
                  <div class="photo-con">
                    <svg-icon icon-class="money" />
                    <span>上传个人照片 （二寸照）</span>
                  </div>
                  <!-- <img :src="imageUrl" :alt="imageUrl"> -->
                </div>
                <div class="photo-box" v-show="imageUrl">
                  <input type="file" @change="uploadphoto" />
                  <img :src="imageUrl" :alt="imageUrl" accept="image/png,image/jpeg" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="联系电话" prop="Mobile">
                <el-input v-model="Information.Mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="婚姻状态">
                <el-radio-group v-model="Information.Married">
                  <el-radio :label="item.value" v-for="(item, index) in StaffEnumMarried" :key="index">{{ item.describe }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="紧急联系人">
                <el-input v-model="Information.EmergencyPerson"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="政治面貌">
                <!-- <el-input v-model="Information.Politics" placeholder="请输入政治面貌"></el-input> -->
                <el-select v-model="Information.Politics" filterable placeholder="选择政治面貌">
                  <el-option label="党员" value="党员"></el-option>
                  <el-option label="团员" value="团员"></el-option>
                  <el-option label="群众" value="群众"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="健康体检状态">
                <el-radio-group v-model="Information.HealthyExam">
                  <el-radio :label="item.value" v-for="(item, index) in StaffEnumHealthyExam" :key="index">{{ item.describe }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="紧急联系电话">
                <el-input v-model="Information.EmergencyTel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="渠道类型" prop="ChannelType">
                <el-select v-model="Information.ChannelType" filterable remote clearable placeholder="请查询或下拉选择渠道类型" class="select-input" @change="SelectChange(Information.ChannelType)" :remote-method="GetChannelTypeList">
                  <el-option v-for="item in ChannelTypeList" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="Information.ChannelType == 0">
              <el-form-item label="渠道名称">
                <el-select v-model="Information.RecruitChannelId" filterable remote clearable placeholder="请查询或下拉选择渠道类型" class="select-input">
                  <el-option v-for="item in ChannelNameList" :key="item.Id" :label="item.ChannelName" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="计算机水平">
                <el-input v-model="Information.Computer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="英语水平">
                <el-input v-model="Information.ForignLang"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="个人爱好及特长" class="text">
                <el-input type="textarea" :rows="6" v-model="Information.Interest" maxlength="500" show-word-limit></el-input>
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
                <el-select v-model="Information.OriginAreaId" filterable placeholder="选择区县" key="3" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in nativearealist" :key="index"></el-option>
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
                <el-select v-model="Information.RegAreaId" filterable placeholder="选择区县" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in identityarealist" :key="index"></el-option>
                </el-select>
                <el-input v-model="Information.RegAddress" placeholder="请输入详情地址" clearable></el-input>
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
                <el-select v-model="Information.AreaId" filterable placeholder="选择区县" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in placearealist" :key="index"></el-option>
                </el-select>
                <el-input v-model="Information.Address" placeholder="请输入详细地址" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 教育背景列表 -->
        <div class="form-title">
          教育背景
          <div class="operate cursor-pointer" @click="addeducate()">
            <svg-icon icon-class="add" class="add" />
            <span>添加教育经历</span>
          </div>
        </div>
        <div class="form-cont">
          <el-row :gutter="64" v-if="edformlist.length">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="最高学历">
                <el-select disabled v-model="Information.Diploma" filterable placeholder="选择最高学历" clearable>
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in StaffEnumDiploma" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="最高学位">
                <el-select disabled v-model="Information.Degree" filterable placeholder="选择最高学位" clearable>
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
                    <el-radio :label="item.value" v-for="(item, index) in StaffEduEnumForm" :key="index">{{ item.describe }}</el-radio>
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
        <div class="form-title">
          历史工作经历
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
        <div class="form-title">
          主要家庭成员
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

        <!-- 附件 -->
        <div class="form-title">附件</div>
        <div class="tip">
          上传员工信息附件，包括离职证明，学历证书，健康证明等，上传格式为PNG、JPG、Word、PDF、XLS
        </div>
        <div class="file-cont" v-loading="fileloading">
          <div class="img-box-list" v-if="filterlist.length != 0" v-for="(item, index) in filterlist" :key="index" @mouseenter="item.visible = !item.visible" @mouseleave="item.visible = !item.visible">
            <!-- 上传文件成功后展示 -->
            <div class="img-box">
              <span class="filetype">{{ item.name }}</span>
              <div class="filename" :title="item.Url">{{ item.Url }}</div>
            </div>
            <div class="img-box-hover" v-show="item.visible == true">
              <!-- <div class="btn" @click="watch(item)">
                <svg-icon icon-class="money" />
                <span>预览</span>
              </div>
              <div class="btn" @click="down(item)">
                <svg-icon icon-class="money" />
                <span>下载</span>
              </div> -->
              <div class="btn">
                <input type="file" accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx" name="" id="" @change="uploadfile($event, index)" />
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
            <input type="file" ref="upload" accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx" name="" id="" @change="uploadfile" />
            <div class="img-box">
              <img src="@/assets/down.png" alt="" />
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <el-button class="erpbtn" size="small" @click="cancel">取消</el-button>
      <el-button class="erpbtn" size="small" @click="onSubmit" v-if="!isupdate">直接保存</el-button>
      <el-button class="erpbtn" size="small" @click="upSubmit" v-if="isupdate">修改</el-button>
    </div>
    <div class="dialog">
      <!-- 教育经历弹框 -->
      <el-dialog :close-on-click-modal="false" :title="edtitle" :visible.sync="eddialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <el-form :model="edcondata" label-position="top" :rules="rules" ref="edcondata" label-width="100px" class="operateform">
          <el-form-item label="学历" class="select">
            <el-select v-model="edcondata.Diploma" filterable placeholder="选择学历" clearable>
              <el-option :label="item.describe" :value="item.value" v-for="(item, index) in StaffEduEnumDiploma" :key="index + item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学位" class="select">
            <el-select v-model="edcondata.Degree" filterable placeholder="选择学位" clearable>
              <el-option :label="item.describe" :value="item.value" v-for="(item, index) in StaffEduEnumDegree" :key="item.describe + index"></el-option>
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
              <el-radio :label="item.value" v-for="(item, index) in StaffEduEnumForm" :key="index">{{ item.describe }}</el-radio>
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
    </div>
  </div>
</template>

<script>
import { GetRecruitChannelEnumType } from "@/api/RecruitmentManagement.js";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import {
  GetCatagoryList,
  GetStaffEnum,
  GetAreaList,
  GetRecruitChannelPageList
} from "@/api/Public.js";
import {
  DeleteStaffEdu,
  GetStaffEduEnum,
  DeleteStaffFamily,
  EditStaffFamily,
  AddStaffFamily,
  DeleteStaffWorkExp,
  AddStaffWorkExp,
  EditStaffWorkExp,
  EditStaffEdu,
  AddStaffEdu,
  GetStaffEduList,
  GetStaffWorkExpList,
  AddStaff,
  EditStaff,
  GetStaffInfo,
  GetStaffFamilyList
} from "@/api/OutsourcedEmployeeManagement.js";
import {
  MenuIdDate,
  uuid,
  showLoading,
  hideLoading,
  copy
} from "@/utils/CustomValidation";
import axios from "axios";
import qs from "qs";
export default {
  components: {
    BreadCrumb
  },
  data() {
    function isCnNewID(cid) {
      var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //加权因子
      var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; //校验码
      if (/^\d{17}\d|x$/i.test(cid)) {
        var sum = 0,
          idx;
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
    var validateIdCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份证号不能为空"));
      } else {
        if (isCnNewID(value)) {
          callback();
        } else {
          callback(new Error("请输入合法的身份证"));
        }
      }
    };
    var validateMobile = (rule, value, callback) => {
      let regexp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!value) {
        return callback(new Error("联系电话不能为空"));
      } else {
        if (regexp.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的联系电话"));
        }
      }
    };
    return {
      urlList: [
        {
          name: "人才信息管理",
          router: "/RecruitmentManagement/InformationManagement"
        },
        {
          name: "录入人才",
          router: ""
        }
      ],
      Id: 0,
      ChannelId: 0,
      recruitmentDatas: [],
      PageIndex: 1,
      PageSize: 20,
      isupdate: false,
      Nationlist: [], // 民族列表
      StaffEnumMarried: [], // 婚姻状态
      StaffEnumDiploma: [], // 最高学历
      StaffEnumDegree: [], // 最高学位
      ChannelTypeList: [], //渠道类型列表
      ChannelNameList: [], //渠道名称列表
      StaffEnumHealthyExam: [], // 健康体检状态
      StaffEnumSiProgress: [], // 社保制卡进度
      StaffEnumStatus: [], // 员工状态
      StaffEnumType: [], // 员工类型

      // 籍贯
      nativeprovince: "",
      nativecity: "",
      nativeprovincelist: [],
      nativecitylist: [],
      nativearealist: [],

      // 身份证地址
      identityprovince: "",
      identitycity: "",
      identityprovincelist: [],
      identitycitylist: [],
      identityarealist: [],

      // 户籍地
      censusprovince: "",
      censuscity: "",
      censusprovincelist: [],
      censuscitylist: [],
      censusarealist: [],

      // 居住地
      placeprovince: "",
      placecity: "",
      placeprovincelist: [],
      placecitylist: [],
      placearealist: [],

      updateId: "",
      isadd: false,
      // 教育背景
      edtitle: "",
      edcondata: {},
      edformlist: [],
      eddialogVisible: false,
      StaffEduEnumDiploma: [], // 教育学历列表
      StaffEduEnumDegree: [], // 教育学位类型
      StaffEduEnumForm: [], // 教育学习形式

      historytitle: "",
      historydialogVisible: false, // 历史工作经历弹框
      historycondata: {}, // 历史工作经历对象
      historyformlist: [], // 工作经历列表

      familytitle: "",
      familydialogVisible: false, // 家庭成员弹框
      familycondata: {},
      familyformlist: [], // 家庭成员列表

      Information: {
        UserName: "", // 用户姓名
        Sex: "", // 性别 0. 女士 1. 先生
        Birthday: "", // 出生日期
        Married: "", // 婚姻状态 (枚举)
        Photo: "", // 个人相片
        Nation: "", // 民族
        recruitmentChannel: "", //招聘渠道
        Politics: "", // 政治面貌
        ArmyMan: "", // 是否退伍军人 0.否 1.是
        Diploma: "", // 最高学历（枚举）
        Degree: "", // 最高学位（枚举）
        Email: "", // 电子邮箱
        Mobile: "", // 联系电话
        EmergencyPerson: "", // 紧急联系人
        EmergencyTel: "", // 紧急联系电话
        ChannelType: 1, //渠道类型
        RecruitChannelId: "", //渠道名称
        OriginAreaId: "", // 籍贯
        ResidenceAreaId: "", // 户籍地
        RegAreaId: "", // 身份证地址
        RegAddress: "", // 身份证详细地址
        AreaId: "", // 居住地
        Address: "", // 居住地详细地址
        IdCode: "", // 身份证号码
        HealthyExam: "", // 健康体检状态（枚举）
        LastQuitCert: "", // 上家单位离职证明状态
        BfCompanyId: "", // 入职公司(锦绣内部公司)
        CompanyId: "", // 入职所在公司（客户公司）
        ProjectId: "", // 入职所在项目
        WorkAreaId: "", // 工作地
        Position: "", // 工作岗位
        JoinTime: "", // 入职时间
        BankName: "", // 工资卡开户银行
        BankBranch: "", // 工资卡开户支行
        BankAccount: "", // 工资卡银行账号
        BankOwner: "", // 工资卡户主
        SiProgress: "", // 社保制卡进度（枚举）
        SiAccount: "", // 社保账号
        SiAreaId: "", // 参保地
        FundAccount: "", // 公积金账号
        BfBankId: "", // 工资打款账号(表BfBank的Id)
        InsuranceId: "", // 社保打款账号（表InsuranceFund的Id）
        FundId: "", // 公积金打款账号（表InsuranceFund的Id）
        StaffSalaryId: "", // 工资发放标准
        StaffSiId: "", // 社保缴纳标准
        StaffFundId: "", // 公积金缴纳标准
        Status: "", // 员工状态（枚举）
        Remark: "", // 备注
        AttachmentUrl: "", // 其它电子档附件
        RecruitResumeId: "", // 简历编号（来自招聘中心）
        SysUserId: "", // 操作人（录入人）
        SysUserName: "", // 操作人（录入人）名称
        UpdateTime: "", // 更新时间
        AddTime: "", // 入库登记时间
        // test: [], // 人员属性补贴
        Poor: "",
        Disabled: "",
        Peasant: "",
        Reset: "",
        CityLostWork: "",
        Heigh: "",
        Computer: "",
        ForignLang: "",
        Interest: "",
        SiStatus: 0, // 社保缴交状态
        FundStatus: 0 //
      },
      photoloading: false,
      imageUrl: "", // 图片上传成功样式
      action: "", // 图片上传地址

      filterlist: [],
      fileloading: false,

      rules: {
        UserName: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ],
        IdCode: [
          { required: true, validator: validateIdCard, trigger: "blur" }
        ],
        Mobile: [
          { required: true, validator: validateMobile, trigger: "blur" }
        ],
        ChannelType: [
          {
            required: true,
            message: "请选择渠道类型",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    // 籍贯省变化
    nativeprovince(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.nativecitylist = response.Data;
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.nativecitylist.find(v => {
              return v.Id == this.nativecity;
            });
            if (isclear) {
            } else {
              this.nativecity = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.nativecity = "";
        this.Information.OriginAreaId = "";
        this.nativecitylist = [];
        this.nativearealist = [];
      }
    },
    // 籍贯市变化
    nativecity(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.nativearealist = response.Data;
            let isclear = this.nativearealist.find(v => {
              return v.Id == this.Information.OriginAreaId;
            });
            if (isclear) {
            } else {
              this.Information.OriginAreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.nativearealist = [];
        this.Information.OriginAreaId = "";
      }
    },
    // 籍贯反推
    "Information.OriginAreaId"(newvalue, oldvalue) {
      const str = this.nativearealist.find(v => {
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
              this.nativeprovince = select.find(v => v.Level == 1).Id;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.nativecity = select.find(v => v.Level == 2).Id;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.Information.OriginAreaId = select.find(v => v.Level == 3).Id;
            } else {
              this.Information.OriginAreaId = "";
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
    // // 户籍省变化
    // censusprovince (newvalue, oldvalue) {
    //   if (newvalue) {
    //     let obj = {
    //       AreaId: '',
    //       ParentId: newvalue
    //     }
    //     GetAreaList(qs.stringify(obj)).then(response => {
    //       if (response.IsSuccess) {
    //         this.censuscitylist = response.Data
    //         // 判断如果下拉里面没有这个Id就清空子集选项
    //         let isclear = this.censuscitylist.find(v => {
    //           return v.Id == this.censuscity
    //         })
    //         if (isclear) {
    //         } else {
    //           this.censuscity = ''
    //         }
    //       } else {
    //         this.$message({
    //           message: response.MessageContent,
    //           type: 'error'
    //         })
    //       }
    //     })
    //   } else {
    //     this.censuscity = ''
    //     this.censuscitylist = []
    //     this.Information.ResidenceAreaId = ''
    //     this.censusarealist = []
    //   }
    // },
    // // 户籍市变化
    // censuscity (newvalue, oldvalue) {
    //   if (newvalue) {
    //     let obj = {
    //       AreaId: '',
    //       ParentId: newvalue
    //     }
    //     GetAreaList(qs.stringify(obj)).then(response => {
    //       if (response.IsSuccess) {
    //         this.censusarealist = response.Data
    //         let isclear = this.censusarealist.find(v => {
    //           return v.Id == this.Information.ResidenceAreaId
    //         })
    //         if (isclear) {
    //         } else {
    //           this.Information.ResidenceAreaId = ''
    //         }
    //       } else {
    //         this.$message({
    //           message: response.MessageContent,
    //           type: 'error'
    //         })
    //       }
    //     })
    //   } else {
    //     this.censusarealist = []
    //     this.Information.ResidenceAreaId = ''
    //   }
    // },
    // // 户籍反推
    // "Information.ResidenceAreaId" (newvalue, oldvalue) {
    //   const str = this.censusarealist.find(v => {
    //     return v.Id == newvalue
    //   })
    //   if (!str && !!newvalue) {
    //     let obj = {
    //       AreaId: newvalue
    //     }
    //     GetAreaList(qs.stringify(obj)).then(response => {
    //       if (response.IsSuccess) {
    //         var select = response.Data.filter(v => {
    //           return v.isselect
    //         })
    //         if (select.find(v => v.Level == 1) !== undefined) {
    //           this.censusprovince = select.find(v => v.Level == 1).Id
    //         }
    //         if (select.find(v => v.Level == 2) !== undefined) {
    //           this.censuscity = select.find(v => v.Level == 2).Id
    //         }
    //         if (select.find(v => v.Level == 3) !== undefined) {
    //           this.Information.ResidenceAreaId = select.find(v => v.Level == 3).Id
    //         } else {
    //           this.Information.ResidenceAreaId = ''
    //         }
    //       } else {
    //         this.$message({
    //           message: response.MessageContent,
    //           type: 'error'
    //         })
    //       }
    //     })
    //   }
    // },
    // 身份证省变化
    identityprovince(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.identitycitylist = response.Data;
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.identitycitylist.find(v => {
              return v.Id == this.identitycity;
            });
            if (isclear) {
            } else {
              this.identitycity = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.identitycity = "";
        this.identitycitylist = [];
        this.Information.RegAreaId = "";
        this.identityarealist = [];
      }
    },
    // 身份证市变化
    identitycity(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.identityarealist = response.Data;
            let isclear = this.identityarealist.find(v => {
              return v.Id == this.Information.RegAreaId;
            });
            if (isclear) {
            } else {
              this.Information.RegAreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.identityarealist = [];
        this.Information.RegAreaId = "";
      }
    },
    // 身份证反推
    "Information.RegAreaId"(newvalue, oldvalue) {
      const str = this.identityarealist.find(v => {
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
              this.identityprovince = select.find(v => v.Level == 1).Id;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.identitycity = select.find(v => v.Level == 2).Id;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.Information.RegAreaId = select.find(v => v.Level == 3).Id;
            } else {
              this.Information.RegAreaId = "";
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
    // 居住地省变化
    placeprovince(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.placecitylist = response.Data;
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.placecitylist.find(v => {
              return v.Id == this.placecity;
            });
            if (isclear) {
            } else {
              this.placecity = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.placecity = "";
        this.placecitylist = [];
        this.Information.AreaId = "";
        this.placearealist = [];
      }
    },
    // 居住地市变化
    placecity(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.placearealist = response.Data;
            let isclear = this.placearealist.find(v => {
              return v.Id == this.Information.AreaId;
            });
            if (isclear) {
            } else {
              this.Information.AreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.placearealist = [];
        this.Information.AreaId = "";
      }
    },
    // 反推居住地
    "Information.AreaId"(newvalue, oldvalue) {
      const str = this.placearealist.find(v => {
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
              this.placeprovince = select.find(v => v.Level == 1).Id;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.placecity = select.find(v => v.Level == 2).Id;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.Information.AreaId = select.find(v => v.Level == 3).Id;
            } else {
              this.Information.AreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    }
  },
  created() {
    this.Id = this.$route.query.id;
    if (this.Id) {
      this.isupdate = true;
      this.GetRecruitChannelPageList();
      this.getStaffEduList();
      this.getStaffFamilyList();
      this.getStaffWorkExpList();
      this.getStaffInfo();
      // this.modificationDiploma()
    } else {
      this.isupdate = false;
    }
    this.getCatagoryList();
    this.getStaffEnum();
    this.getAreaList();
    this.GetChannelTypeList();
    this.getStaffEduEnum();
    this.$nextTick(v => {
      this.action = process.env.VUE_APP_BASE_API_UPLOAD;
    });
  },
  methods: {
    //获取渠道类型列表
    GetChannelTypeList() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetRecruitChannelEnumType(qs.stringify(obj)).then(response => {
        this.ChannelTypeList = response.reverse();
      });
    },
    SelectChange(e) {
      this.Information.RecruitChannelId = "";
      let obj = {
        ChannelName: "",
        Contacts: "",
        Tel: "",
        ChannelType: e,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize,
        Sign: "",
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetRecruitChannelPageList(obj).then(res => {
        this.ChannelNameList = res.Data;
      });
    },
    GetRecruitChannelPageList() {
      let obj = {
        ChannelName: "",
        Contacts: "",
        Tel: "",
        ChannelType: 0,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize,
        Sign: "",
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetRecruitChannelPageList(obj).then(res => {
        this.ChannelNameList = res.Data;
      });
    },
    // //选择招聘渠道
    // selectRecruitmentChannel(e) {
    //   for (var i in e) {
    //     if (e[i].ChannelName == this.Information.ChannelName) {
    //       this.ChannelId = e[i].Id;
    //     }
    //   }
    //   console.log(this.ChannelId);
    // },
    // 获取外包员工信息
    getStaffInfo() {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      GetStaffInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // 处理头像数据
            if (response.Data.Photo) {
              this.imageUrl = response.Data.Photo;
            }
            // 籍贯
            if (response.Data.OriginAreaId === 0) {
              response.Data.OriginAreaId = "";
            }
            // 户籍地
            if (response.Data.ResidenceAreaId === 0) {
              response.Data.ResidenceAreaId = "";
            }
            // 身份证
            if (response.Data.RegAreaId === 0) {
              response.Data.RegAreaId = "";
            }
            // 居住地
            if (response.Data.AreaId === 0) {
              response.Data.AreaId = "";
            }
            // 毕业年月
            if (response.Data.GraduatedYear) {
              this.graduate = new Date(
                response.Data.GraduatedYear,
                response.Data.GraduatedMonth - 1
              );
            }
            // 处理入职时间
            if (!response.Data.JoinTime) {
              response.Data.JoinTime = "";
            }

            // // 处理社保 公积金时间
            // if (response.Data.SiStartYear && response.Data.SiStartMonth) {
            //   this.socialtime = new Date(response.Data.SiStartYear, response.Data.SiStartMonth - 1)
            // }
            // if (response.Data.FundStartYear && response.Data.FundStartMonth) {
            //   this.accumulationtime = new Date(response.Data.FundStartYear, response.Data.FundStartMonth - 1)
            // }
            // // 用工单位
            // if (response.Data.CompanyId) {
            //   console.log(response.Data.CompanyId);
            //   this.Companylist = [{
            //     Name: response.Data.CompanyName,
            //     Id: response.Data.CompanyId
            //   }]
            // } else {
            //   response.Data.CompanyId = ''
            //   this.CompanyMethod('')
            // }
            // // 入职公司
            // if (response.Data.BfCompanyId) {
            //   this.BfCompanylist = [{
            //     Name: response.Data.BfCompanyName,
            //     Id: response.Data.BfCompanyId
            //   }]
            // } else {
            //   response.Data.BfCompanyId = ''
            //   this.BfCompanyMethod('')
            // }

            // 处理文件
            this.filterlist = [];
            if (response.Data.AttachmentUrl) {
              var arry = response.Data.AttachmentUrl.split(";");
              for (let i = 0; i < arry.length; i++) {
                var namelist = arry[i].split(".");
                this.filterlist.push({
                  name: namelist[namelist.length - 1],
                  Url: arry[i],
                  visible: false
                });
              }
            }
            this.Information = response.Data;
            // this.projectMethod('')
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
        hideLoading();
      });
    },
    // 获取一级地区
    getAreaList() {
      let obj = {
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetAreaList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.nativeprovincelist = response.Data;
          this.censusprovincelist = response.Data;
          this.identityprovincelist = response.Data;
          this.placeprovincelist = response.Data;
          this.insuredprovincelist = response.Data;
          this.workprovincelist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取外包员工信息枚举
    getStaffEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffEnum(qs.stringify(obj)).then(response => {
        if (response) {
          console.log(response.StaffEnumDiploma);
          this.StaffEnumMarried = response.StaffEnumMarried;
          this.StaffEnumDiploma = response.StaffEnumDiploma;
          this.StaffEnumDegree = response.StaffEnumDegree;
          this.StaffEnumHealthyExam = response.StaffEnumHealthyExam;
          this.StaffEnumSiProgress = response.StaffEnumSiProgress;
          this.StaffEnumStatus = response.StaffEnumStatus;
          this.StaffEnumType = response.StaffEnumType;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取民族列表
    getCatagoryList() {
      let obj1 = {
        ClassName: "",
        Status: 1,
        ClassType: 4,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetCatagoryList(qs.stringify(obj1)).then(response => {
        if (response.IsSuccess) {
          this.Nationlist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取教育信息列表
    getStaffEduList() {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffEduList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              if (
                response.Data[i].StartYear !== "" &&
                response.Data[i].StartMonth !== "" &&
                response.Data[i].EndYear !== "" &&
                response.Data[i].EndMonth !== ""
              ) {
                response.Data[i].graduate = [
                  new Date(
                    response.Data[i].StartYear,
                    response.Data[i].StartMonth + 1
                  ),
                  new Date(
                    response.Data[i].EndYear,
                    response.Data[i].EndMonth + 1
                  )
                ];
              }
            }
            this.edformlist = response.Data;
          } else {
            this.edformlist = [];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取家庭成员列表
    getStaffFamilyList() {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffFamilyList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.familyformlist = response.Data;
          } else {
            this.familyformlist = [];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取外包员工工作经历列表
    getStaffWorkExpList() {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffWorkExpList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              if (
                response.Data[i].StartYear !== "" &&
                response.Data[i].StartMonth !== "" &&
                response.Data[i].EndYear !== "" &&
                response.Data[i].EndMonth !== ""
              ) {
                response.Data[i].Time = [
                  new Date(
                    response.Data[i].StartYear,
                    response.Data[i].StartMonth + 1
                  ),
                  new Date(
                    response.Data[i].EndYear,
                    response.Data[i].EndMonth + 1
                  )
                ];
              }
            }
            this.historyformlist = response.Data;
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取外包员工教育信息枚举
    getStaffEduEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffEduEnum(qs.stringify(obj)).then(response => {
        if (response) {
          console.log(response);
          this.StaffEduEnumDiploma = response.StaffEduEnumDiploma;
          this.StaffEduEnumDegree = response.StaffEduEnumDegree;
          this.StaffEduEnumForm = response.StaffEduEnumForm;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    modificationDiploma() {
      console.log(this.edformlist);
      console.log(this.StaffEduEnumDiploma);
    },

    // 关闭教育经历弹框
    closedialog() {},
    // 添加教育背景
    addeducate() {
      this.edtitle = "添加教育经历";
      this.edcondata = {
        SchoolName: "",
        Major: "",
        Diploma: "",
        Degree: "",
        Form: "",
        graduate: ""
      };
      this.isadd = true;
      this.updateId = "";
      this.eddialogVisible = true;
    },
    // 编辑教育经历
    updateed(e, i) {
      this.edtitle = "修改教育经历";
      this.edcondata = copy(e);
      this.isadd = false;
      if (this.Id) {
        this.updateId = e.Id;
      } else {
        this.updateId = i;
      }
      this.eddialogVisible = true;
    },
    // 保存教育经历
    saveed() {
      // 判断是修改还是添加
      // 判断是否是最高
      this.Information.Diploma = this.edcondata.Diploma;
      this.Information.Degree = this.edcondata.Degree;
      for (let i = 0; i < this.edformlist.length; i++) {
        if (this.edcondata.Diploma > this.edformlist[i].Diploma) {
          this.Information.Diploma = this.edcondata.Diploma;
        }
        if (this.edcondata.Degree > this.edformlist[i].Degree) {
          this.Information.Degree = this.edcondata.Degree;
        }
      }
      // 处理数据
      if (this.edcondata.graduate) {
        this.edcondata.StartYear = this.edcondata.graduate[0].getFullYear();
        this.edcondata.StartMonth = this.edcondata.graduate[0].getMonth() + 1;
        this.edcondata.EndYear = this.edcondata.graduate[1].getFullYear();
        this.edcondata.EndMonth = this.edcondata.graduate[1].getMonth() + 1;
      } else {
        this.edcondata.StartYear = "";
        this.edcondata.StartMonth = "";
        this.edcondata.EndYear = "";
        this.edcondata.EndMonth = "";
      }
      if (this.Id) {
        // 修改
        if (this.isadd) {
          // 添加教育经历
          let obj = {
            AddStaffEduList: [
              {
                StaffId: this.Id,
                Diploma: this.edcondata.Diploma,
                Degree: this.edcondata.Degree,
                SchoolName: this.edcondata.SchoolName,
                Major: this.edcondata.Major,
                Form: this.edcondata.Form,
                StartYear: this.edcondata.StartYear,
                StartMonth: this.edcondata.StartMonth,
                EndYear: this.edcondata.EndYear,
                EndMonth: this.edcondata.EndMonth
              }
            ],
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          AddStaffEdu(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.getStaffEduList();
              this.eddialogVisible = false;
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
            operationcode: "1"
          };
          EditStaffEdu(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getStaffEduList();
              this.eddialogVisible = false;
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
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
          EndMonth: this.edcondata.EndMonth
        });
        if (this.isadd) {
          this.edformlist.push(data);
          console.log(this.edformlist);
          this.eddialogVisible = false;
        } else {
          this.edformlist.splice(this.updateId, 1, data);
          this.eddialogVisible = false;
        }
      }
    },
    // 删除教育经历
    deleteed(e, i) {
      if (this.Id) {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        DeleteStaffEdu(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getStaffEduList();
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.edformlist.splice(i, 1);
      }
    },

    // 添加历史工作经历
    addwork() {
      this.historytitle = "添加历史工作经历";
      this.historycondata = {
        CompanyName: "",
        PositionName: "",
        Prove: "",
        ProveTel: "",
        Time: ""
      };
      this.isadd = true;
      this.updateId = "";
      this.historydialogVisible = true;
    },
    // 保存工作经历
    savework() {
      // 处理数据
      if (this.historycondata.Time) {
        this.historycondata.StartYear = this.historycondata.Time[0].getFullYear();
        this.historycondata.StartMonth =
          this.historycondata.Time[0].getMonth() + 1;
        this.historycondata.EndYear = this.historycondata.Time[1].getFullYear();
        this.historycondata.EndMonth =
          this.historycondata.Time[1].getMonth() + 1;
      } else {
        this.historycondata.StartYear = "";
        this.historycondata.StartMonth = "";
        this.historycondata.EndYear = "";
        this.historycondata.EndMonth = "";
      }
      // 判断是修改还是添加
      if (this.Id) {
        // 修改
        if (this.isadd) {
          let obj = {
            AddStaffWorkExpList: [
              {
                StaffId: this.Id,
                CompanyName: this.historycondata.CompanyName,
                PositionName: this.historycondata.PositionName,
                Prove: this.historycondata.Prove,
                ProveTel: this.historycondata.ProveTel,
                StartYear: this.historycondata.StartYear,
                StartMonth: this.historycondata.StartMonth,
                EndYear: this.historycondata.EndYear,
                EndMonth: this.historycondata.EndMonth
              }
            ],
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          AddStaffWorkExp(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.getStaffWorkExpList();
              this.historydialogVisible = false;
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
            operationcode: "1"
          };
          EditStaffWorkExp(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getStaffWorkExpList();
              this.historydialogVisible = false;
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
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
          EndMonth: this.historycondata.EndMonth
        });
        if (this.isadd) {
          this.historyformlist.push(data);
          this.historydialogVisible = false;
        } else {
          this.historyformlist.splice(this.updateId, 1, data);
          this.historydialogVisible = false;
        }
      }
    },
    // 修改历史工作经历
    updatework(e, i) {
      this.historytitle = "修改历史工作经历";
      this.historycondata = copy(e);
      this.isadd = false;
      if (this.Id) {
        this.updateId = e.Id;
      } else {
        this.updateId = i;
      }
      this.historydialogVisible = true;
    },
    // 删除历史工作经历
    deletework(e, i) {
      if (this.Id) {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        DeleteStaffWorkExp(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getStaffWorkExpList();
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.historyformlist.splice(i, 1);
      }
    },

    // 添加家庭成员
    addfamily() {
      this.familytitle = "添加家庭成员";
      this.familycondata = {
        UserName: "",
        Age: "",
        Relation: "",
        CompanyName: "",
        PositionName: "",
        Tel: ""
      };
      this.isadd = true;
      this.updateId = "";
      this.familydialogVisible = true;
    },
    // 保存家庭成员
    savefamily() {
      if (this.Id) {
        // 修改
        if (this.isadd) {
          let obj = {
            AddStaffFamilyList: [
              {
                StaffId: this.Id,
                UserName: this.familycondata.UserName,
                Age: this.familycondata.Age,
                Relation: this.familycondata.Relation,
                CompanyName: this.familycondata.CompanyName,
                PositionName: this.familycondata.PositionName,
                Tel: this.familycondata.Tel
              }
            ],
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          console.log(obj);
          AddStaffFamily(obj).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.getStaffFamilyList();
              this.familydialogVisible = false;
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
            StaffId: this.Id,
            UserName: this.familycondata.UserName,
            Age: this.familycondata.Age,
            Relation: this.familycondata.Relation,
            CompanyName: this.familycondata.CompanyName,
            PositionName: this.familycondata.PositionName,
            Tel: this.familycondata.Tel,
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          EditStaffFamily(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getStaffFamilyList();
              this.familydialogVisible = false;
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
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
          Tel: this.familycondata.Tel
        });
        if (this.isadd) {
          this.familyformlist.push(data);
          this.familydialogVisible = false;
        } else {
          this.familyformlist.splice(this.updateId, 1, data);
          this.familydialogVisible = false;
        }
      }
    },
    // 修改家庭成员
    updatefamily(e, i) {
      this.familytitle = "修改家庭成员";
      this.familycondata = copy(e);
      this.isadd = false;
      if (this.Id) {
        this.updateId = e.Id;
      } else {
        this.updateId = i;
      }
      this.familydialogVisible = true;
    },
    // 删除家庭成员
    deletefamily(e, i) {
      if (this.Id) {
        let obj = {
          IdArr: e.Id,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        DeleteStaffFamily(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getStaffFamilyList();
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.familyformlist.splice(i, 1);
      }
    },

    // 性别识别
    changeidentity(e) {
      var IdCard = e + "";
      if (IdCard.length === 18) {
        var birth =
          IdCard.substring(6, 10) +
          "-" +
          IdCard.substring(10, 12) +
          "-" +
          IdCard.substring(12, 14);
        this.Information.Birthday = new Date(birth);
        if (parseInt(IdCard.substr(16, 1)) % 2 == 1) {
          var sex = 1; // 男
        } else {
          var sex = 0; // 女
        }
        this.Information.Sex = sex;
        console.log(birth);
        console.log(sex);
      }
    },
    // 头像上传成事件
    uploadphoto(e) {
      this.photoloading = true;
      var uploader;
      const files = e.target.files[0];
      var path = this.action;
      if (files) {
        var ext = files.name
          .slice(files.name.lastIndexOf(".") + 1)
          .toLowerCase();
        if (ext !== "png" && ext !== "jpg") {
          this.$message({
            message: "不支持该格式",
            type: "warning"
          });
          this.photoloading = false;
          e.target.value = [];
          return false;
        }
        let datas = new FormData();
        datas.append("file", files);
        datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
        axios
          .post(path, datas)
          .then(res => {
            if (res.data.State) {
              this.imageUrl = res.data.ImageUrl;
            }
            this.photoloading = false;
            e.target.value = [];
          })
          .catch(() => {
            this.photoloading = false;
            e.target.value = [];
          });
      }
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
            this.fileloading = false;
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
      }
    },

    // 取消
    cancel() {
      this.$router.go(-1);
    },
    // 保存
    onSubmit() {
      this.$refs.Information.validate((v, object) => {
        if (v) {
          let obj = copy(this.Information);
          // 是否上传头像
          if (this.imageUrl) {
            obj.Photo = this.imageUrl;
          }
          // 籍贯地址处理
          obj.OriginAreaId =
            this.Information.OriginAreaId ||
            this.nativecity ||
            this.nativeprovince;
          // 身份证地址
          obj.RegAreaId =
            this.Information.RegAreaId ||
            this.identitycity ||
            this.identityprovince;
          // // 户籍地处理
          // obj.ResidenceAreaId = this.Information.ResidenceAreaId || this.censuscity || this.censusprovince
          // 居住地
          obj.AreaId =
            this.Information.AreaId || this.placecity || this.placeprovince;
          if (this.edformlist && this.edformlist.length) {
            obj.AddStaffEduList = this.edformlist;
          } else {
            obj.AddStaffEduList = [];
          }
          if (this.historyformlist && this.historyformlist.length) {
            obj.AddStaffWorkExpList = this.historyformlist;
          } else {
            obj.AddStaffWorkExpList = [];
          }
          if (this.familyformlist && this.familyformlist.length) {
            obj.AddStaffFamilyList = this.familyformlist;
          } else {
            obj.AddStaffFamilyList = [];
          }
          // 附件上传处理
          var fils = this.filterlist.map(v => {
            return v.Url;
          });
          obj.AttachmentUrl = fils.join(";");
          obj.AddScene = 1;
          const operating = JSON.parse(localStorage.getItem("operating")) || {};
          obj.menuid = operating.MenuId;
          obj.operationcode = operating.OperationCode;
          console.log(obj);
          showLoading();
          AddStaff(qs.stringify(obj)).then(response => {
            hideLoading();
            if (response.IsSuccess) {
              this.$message({
                message: "添加成功!",
                type: "success"
              });
              this.$router.go(-1);
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
        } else {
          for (const i in object) {
            this.$refs[i].$el.scrollIntoView({
              // 滚动到指定节点
              block: "center", // 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: "smooth" // 值有auto、instant,smooth，缓动动画（当前是慢速的）
            });
            break;
          }
        }
      });
    },
    // 修改
    upSubmit() {
      this.$refs.Information.validate((v, object) => {
        if (v) {
          let obj = copy(this.Information);
          // 是否上传头像
          if (this.imageUrl) {
            obj.Photo = this.imageUrl;
          }
          // 籍贯地址处理
          obj.OriginAreaId =
            this.Information.OriginAreaId ||
            this.nativecity ||
            this.nativeprovince;
          // 身份证地址
          obj.RegAreaId =
            this.Information.RegAreaId ||
            this.identitycity ||
            this.identityprovince;
          // // 户籍地处理
          // obj.ResidenceAreaId = this.Information.ResidenceAreaId || this.censuscity || this.censusprovince
          // 居住地
          obj.AreaId =
            this.Information.AreaId || this.placecity || this.placeprovince;
          var fils = this.filterlist.map(v => {
            return v.Url;
          });
          obj.AttachmentUrl = fils.join(";");
          const operating = JSON.parse(localStorage.getItem("operating")) || {};
          obj.menuid = operating.MenuId;
          obj.operationcode = operating.OperationCode;
          obj.AddScene = 1;
          EditStaff(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: "修改成功!",
                type: "success"
              });
              this.$router.go(-1);
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
        } else {
          for (const i in object) {
            this.$refs[i].$el.scrollIntoView({
              // 滚动到指定节点
              block: "center", // 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: "smooth" // 值有auto、instant,smooth，缓动动画（当前是慢速的）
            });
            break;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.add-information-container /deep/ {
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
    .Information {
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
          .el-input__inner {
            background-color: $erinputbgc;
          }
          .el-select {
            width: 100%;
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
            max-width: 280px;
            > .el-radio-group {
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
                top: 50%;
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
      }
      // 循环的样式
      .form-cont {
        padding-bottom: 16px;
        margin-bottom: 40px;
        border-bottom: 1px solid $erpBK;
        &:last-child {
          border-bottom: none;
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