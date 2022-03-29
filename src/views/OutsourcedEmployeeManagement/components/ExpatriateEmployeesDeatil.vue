<!-- 外派员工详情-->
<template>
  <div class="expatriate-employees-deatil-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="detail-content">
      <ul class="employesstab">
        <li class="tablist" :class="{active: tabindex==item.index}" v-for="(item, index) in tablist" :key="index" @click="choosetab(item)">{{item.value}}</li>
      </ul>

      <!-- 基本信息 -->
      <div v-show="tabindex==0">
        <div class="babel" v-if="leaveform.Id">
          <div class="title-name">离职办理记录</div>
          <div class="babel-container">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <!-- <div class="content">
                  <div class="content-label">离职项目</div>
                  <div class="content-detail">{{leaveform.BankAccount}}</div>
                </div> -->
                <div class="content">
                  <div class="content-label">离职时间</div>
                  <div class="content-detail">{{leaveform.LeaveTime | Time}}</div>
                </div>
                <div class="content">
                  <div class="content-label">离职签订状态</div>
                  <div class="content-detail">{{leaveform.LeaveAgree | LeaveAgree}}</div>
                </div>
                <div class="content">
                  <div class="content-label">离职协议附件</div>
                  <div class="content-detail">
                    <div class="file-cont" v-if="leavefile.Url">
                      <div class="img-box-list" @mouseenter="leavefile.visible=!leavefile.visible" @mouseleave="leavefile.visible=!leavefile.visible">
                        <!-- 上传文件成功后展示 -->
                        <div class="img-box">
                          <span class="filetype">{{leavefile.name}}</span>
                          <div class="filename" :title="leavefile.Url">{{leavefile.Url}}</div>
                        </div>
                        <div class="img-box-hover" v-show="leavefile.visible==true">
                          <div class="btn" @click="watch(leavefile)">
                            <svg-icon icon-class="replace" class-name="svg-a" />
                            <span>预览</span>
                          </div>
                          <div class="btn" @click="down(leavefile)">
                            <svg-icon icon-class="del" class-name="svg-a" />
                            <span>下载</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">离职原因</div>
                  <div class="content-detail">{{leaveform.LeaveReason}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="babel">
          <div class="title-name">员工基本信息</div>
          <div class="babel-container dashed">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">员工姓名</div>
                  <div class="content-detail">{{employeesform.UserName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">身份证号码</div>
                  <div class="content-detail">{{employeesform.IdCode}}</div>
                </div>
                <div class="content">
                  <div class="content-label">员工编码</div>
                  <div class="content-detail">{{employeesform.Code}}</div>
                </div>
                <div class="content">
                  <div class="content-label">员工性别</div>
                  <div class="content-detail">{{employeesform.Sex | Sex}}</div>
                </div>
                <div class="content">
                  <div class="content-label">员工状态</div>
                  <div class="content-detail">{{employeesform.Status | Status}}</div>
                </div>
                <div class="content">
                  <div class="content-label">员工类型</div>
                  <div class="content-detail">{{employeesform.TypeText}}</div>
                </div>
                <div class="content">
                  <div class="content-label">出生日期</div>
                  <div class="content-detail">{{employeesform.Birthday | Birthday}}</div>
                </div>
                <div class="content">
                  <div class="content-label">民族</div>
                  <div class="content-detail">{{NationName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">是否退伍军人</div>
                  <div class="content-detail">{{employeesform.ArmyMan | ArmyMan}}</div>
                </div>
                <div class="content">
                  <div class="content-label">婚姻状态</div>
                  <div class="content-detail">{{employeesform.MarriedText}}</div>
                </div>
                <div class="content">
                  <div class="content-label">政治面貌</div>
                  <div class="content-detail">{{employeesform.Politics}}</div>
                </div>
                <div class="content">
                  <div class="content-label">电子邮箱</div>
                  <div class="content-detail">{{employeesform.Email}}</div>
                </div>
                <div class="content">
                  <div class="content-label">联系电话</div>
                  <div class="content-detail">{{employeesform.Mobile}}</div>
                </div>
                <div class="content">
                  <div class="content-label">紧急联系人</div>
                  <div class="content-detail">{{employeesform.EmergencyPerson}}</div>
                </div>
                <div class="content">
                  <div class="content-label">紧急联系电话</div>
                  <div class="content-detail">{{employeesform.EmergencyTel}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="img-box" v-if="imageUrl">
                  <img :src="imageUrl" alt="" class="image" @click="watchphoto(imageUrl)">
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="img-box" v-if="cardUrl">
                  <img :src="cardUrl" alt="" class="image cursor-pointer" v-if="isimage && cardUrl" @click="watchphoto(cardUrl)">
                  <div v-if="!isimage && cardUrl" class="photo-con" @mouseenter="imgvisible=!imgvisible" @mouseleave="imgvisible=!imgvisible">
                    <div class="filetype">pdf</div>
                    <span>身份证复印件</span>
                    <div class="img-box-hover" v-show="imgvisible">
                      <div class="btn" @click="watchcard(cardUrl)">
                        <svg-icon icon-class="replace" class-name="svg-a" />
                        <span>预览</span>
                      </div>
                      <div class="btn" @click="downcard(cardUrl)">
                        <svg-icon icon-class="del" class-name="svg-a" />
                        <span>下载</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">健康体检状态</div>
                  <div class="content-detail">{{employeesform.HealthyExamText}}</div>
                </div>
                <div class="content">
                  <div class="content-label">籍贯</div>
                  <div class="content-detail">{{OriginAreaName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">身份证地址</div>
                  <div class="content-detail">{{RegAreaName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">居住</div>
                  <div class="content-detail">{{AreaName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">户籍地</div>
                  <div class="content-detail">{{ResidenceAreaName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">人员补贴属性</div>
                  <div class="content-detail">
                    <span v-if="employeesform.Peasant" style="margin-right:10px;">非农业人口(农民工)</span>
                    <span v-if="employeesform.Disabled" style="margin-right:10px;">残疾人</span>
                    <span v-if="employeesform.Poor" style="margin-right:10px;">建档立卡贫困户</span>
                    <span v-if="employeesform.Reset" style="margin-right:10px;">40/50失业重新安置</span>
                    <span v-if="employeesform.CityLostWork" style="margin-right:10px;">城镇登记失业人员</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="babel-container">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">工资银行卡账号</div>
                  <div class="content-detail">{{employeesform.BankAccount}}</div>
                </div>
                <div class="content">
                  <div class="content-label">工资卡开户行</div>
                  <div class="content-detail">{{BankName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">工资卡户主</div>
                  <div class="content-detail">{{employeesform.BankOwner}}</div>
                </div>
                <div class="content">
                  <div class="content-label">工资账户类型</div>
                  <div class="content-detail">{{employeesform.BankAccountType | BankAccountType}}</div>
                </div>
                <div class="content">
                  <div class="content-label">工资卡开户支行</div>
                  <div class="content-detail">{{employeesform.BankBranch}}</div>
                </div>
                <div class="content">
                  <div class="content-label">公积金账号</div>
                  <div class="content-detail">{{employeesform.FundAccount}}</div>
                </div>
                <div class="content">
                  <div class="content-label">医保账号</div>
                  <div class="content-detail">{{employeesform.MedicalAccount}}</div>
                </div>
                <div class="content">
                  <div class="content-label">医保打款账号</div>
                  <div class="content-detail">{{MedicalName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">社保账号</div>
                  <div class="content-detail">{{employeesform.SiAccount}}</div>
                </div>
                <div class="content">
                  <div class="content-label">社保制卡进度</div>
                  <div class="content-detail">{{employeesform.SiProgressText}}</div>
                </div>
                <div class="content">
                  <div class="content-label">社保参保地</div>
                  <div class="content-detail">{{SiAreaName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">社保打款账号</div>
                  <div class="content-detail">{{InsuranceName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">公积金打款账号</div>
                  <div class="content-detail">{{FundName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">公积金参保地</div>
                  <div class="content-detail">{{FundAreaName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">医保参保地</div>
                  <div class="content-detail">{{MedicalAreaName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">工资打款账号</div>
                  <div class="content-detail">{{BfBankName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">缴纳社保</div>
                  <div class="content-detail">{{employeesform.SiStatus | SiStatus}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height: 45px">
                <div class="content">
                  <div class="content-label" v-if="employeesform.SiStatus===2">社保停缴起始年月</div>
                  <div class="content-label" v-if="employeesform.SiStatus===1">社保缴纳起始年月</div>
                  <div class="content-detail" v-if="employeesform.SiStartYear">{{employeesform.SiStartYear}}年{{employeesform.SiStartMonth}}月</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">缴纳公积金</div>
                  <div class="content-detail">{{employeesform.FundStatus | SiStatus}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height: 45px">
                <div class="content">
                  <div class="content-label" v-if="employeesform.FundStatus===2">公积金停缴起始年月</div>
                  <div class="content-label" v-if="employeesform.FundStatus===1">公积金缴纳起始年月</div>
                  <div class="content-detail" v-if="employeesform.FundStartYear">{{employeesform.FundStartYear}}年{{employeesform.FundStartMonth}}月</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">缴纳医保</div>
                  <div class="content-detail">{{employeesform.MedicalStatus | SiStatus}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height: 45px">
                <div class="content">
                  <div class="content-label" v-if="employeesform.MedicalStatus===2">医保停缴起始年月</div>
                  <div class="content-label" v-if="employeesform.MedicalStatus===1">医保缴纳起始年月</div>
                  <div class="content-detail" v-if="employeesform.MedicalStartYear">{{employeesform.MedicalStartYear}}年{{employeesform.MedicalStartMonth}}月</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="title-name">健康状况</div>
          <div class="babel-container">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">视力</div>
                  <div class="content-detail">{{employeesform.Eye | Eye}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">听力</div>
                  <div class="content-detail">{{employeesform.Listen | Eye}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">是否曾被认定为工伤或职业病或持有残疾人证明</div>
                  <div class="content-detail">{{employeesform.Diseases | ArmyMan}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">是否被劳动能力鉴定委员会委员会鉴定为具有伤残等级</div>
                  <div class="content-detail">{{employeesform.Disability | ArmyMan}}&nbsp;&nbsp;&nbsp;{{employeesform.DisabilityLevel}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">是否从事过井下、高空、高温、特别繁重体力劳动以及有毒有害工种</div>
                  <div class="content-detail">{{employeesform.BadWork | ArmyMan}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">是否有传染性疾病</div>
                  <div class="content-detail">{{employeesform.Transmit | ArmyMan}}&nbsp;&nbsp;&nbsp;{{employeesform.TransmitName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="content">
                  <div class="content-label">最近6个月内接受的医学治疗及医学检查</div>
                  <div class="content-detail">{{employeesform.MedicalCheck}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="title-name" v-if="edformlist && edformlist.length">教育背景</div>
          <div class="babel-container" v-if="edformlist && edformlist.length">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">最高学历</div>
                  <div class="content-detail">{{employeesform.DiplomaText}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">最高学位</div>
                  <div class="content-detail">{{employeesform.DegreeText}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row v-for="(item, index) in edformlist" :key="index">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">毕业学校</div>
                  <div class="content-detail">{{item.SchoolName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">毕业年月</div>
                  <div class="content-detail"><span v-if="item.StartYear">{{item.StartYear}}年{{item.StartMonth}}月 - {{item.EndYear}}年{{item.EndMonth}}月</span></div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">专业</div>
                  <div class="content-detail">{{item.Major}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">学习形式</div>
                  <div class="content-detail">{{item.Form | Form}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="title-name" v-if="historyformlist && historyformlist.length">历史工作经历</div>
          <div class="babel-container" v-if="historyformlist && historyformlist.length">
            <el-row v-for="(item, index) in historyformlist" :key="index">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">工作单位</div>
                  <div class="content-detail">{{item.CompanyName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">起止时间</div>
                  <div class="content-detail"><span v-if="item.StartYear">{{item.StartYear}}年{{item.StartMonth}}月 - {{item.EndYear}}年{{item.EndMonth}}月</span></div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">职务</div>
                  <div class="content-detail">{{item.PositionName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">职务</div>
                  <div class="content-detail">{{item.Prove}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">证明人联系电话</div>
                  <div class="content-detail">{{item.ProveTel}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="title-name" v-if="familyformlist && familyformlist.length">家庭成员</div>
          <div class="babel-container" v-if="familyformlist && familyformlist.length">
            <el-row v-for="(item, index) in familyformlist" :key="index">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">姓名</div>
                  <div class="content-detail">{{item.UserName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">与本人关系</div>
                  <div class="content-detail">{{item.Relation}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">工作单位</div>
                  <div class="content-detail">{{item.CompanyName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">职位</div>
                  <div class="content-detail">{{item.PositionName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">联系电弧</div>
                  <div class="content-detail">{{item.Tel}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="title-name">入职就业情况</div>
          <div class="babel-container">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">原单位离职证明状态</div>
                  <div class="content-detail">{{employeesform.LastQuitCert | LastQuitCert}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">入职公司</div>
                  <div class="content-detail">{{employeesform.BfCompanyName}}</div>
                </div>
              </el-col>
            </el-row>
            <div class="line" v-if="ProjectStaffPageList.length > 0"></div>
            <div v-if="ProjectStaffPageList.length > 0">
              <div v-for="(item,index) in ProjectStaffPageList" :key="index" class="jobform-row">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="content">
                      <div class="content-label">用工公司</div>
                      <div class="content-detail">{{item.CompanyName}}</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="content">
                      <div class="content-label">入职时间</div>
                      <div class="content-detail">{{item.EntryTime | Birthday}}</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="content">
                      <div class="content-label">工作地</div>
                      <div class="content-detail">{{item.workprovinceName}} {{item.workcityName}} {{item.workareaName}} {{item.Address}}</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="content">
                      <div class="content-label">就职项目</div>
                      <div class="content-detail">{{item.ProjectName}}</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="content">
                      <div class="content-label">工作岗位</div>
                      <div class="content-detail">{{item.PositionName}}</div>
                    </div>
                  </el-col>
                </el-row>
                <div class="line"></div>
              </div>
            </div>

          </div>
          <div class="title-name" v-if="ProjectStaffLogList.length > 0">项目离职信息</div>
          <div class="babel-container" v-if="ProjectStaffLogList.length > 0">
            <div v-for="(item,index) in ProjectStaffLogList" :key="index" class="jobform-row">
              <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="content">
                    <div class="content-label">离职用工公司</div>
                    <div class="content-detail">{{item.CompanyName}}</div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="content">
                    <div class="content-label">离职项目</div>
                    <div class="content-detail">{{item.ProjectName}}</div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="content">
                    <div class="content-label">离职时间</div>
                    <div class="content-detail">{{item.LeaveTime | Time}}</div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="content">
                    <div class="content-label">离职岗位</div>
                    <div class="content-detail">{{item.PositionName}}</div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="content">
                    <div class="content-label">离职原因</div>
                    <div class="content-detail">{{item.LeaveReason}}</div>
                  </div>
                </el-col>
              </el-row>
              <div class="line"></div>
            </div>
          </div>
          <div class="title-name">个税计算</div>
          <div class="babel-container">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">个税计算标准</div>
                  <div class="content-detail">{{PersonalTaxRuleName}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="babel">
          <div class="title-name" v-if="filterlist && filterlist.length > 0">附件</div>
          <div class="babel-container" v-if="filterlist && filterlist.length > 0">
            <div class="file-cont" v-loading="fileloading">
              <div class="img-box-list" v-for="(item, index) in filterlist" :key="index" @mouseenter="item.visible=!item.visible" @mouseleave="item.visible=!item.visible">
                <!-- 上传文件成功后展示 -->
                <div class="img-box">
                  <span class="filetype">{{item.name}}</span>
                  <div class="filename" :title="item.Url">{{item.Url}}</div>
                </div>
                <div class="img-box-hover" v-show="item.visible==true">
                  <div class="btn" @click="watch(item)">
                    <svg-icon icon-class="replace" class-name="svg-a" />
                    <span>预览</span>
                  </div>
                  <div class="btn" @click="down(item)">
                    <svg-icon icon-class="del" class-name="svg-a" />
                    <span>下载</span>
                  </div>
                  <!-- <div class="btn">
                    <input type="file" accept=".doc,.docx,.pdf,.png,.jpg" name="" id="" @change="uploadfile($event, index)">
                    <svg-icon icon-class="money" />
                    <span>重新上传</span>
                  </div>
                  <div class="btn" @click="deletefile(index)">
                    <svg-icon icon-class="money" />
                    <span>删除</span>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 薪资信息 -->
      <div v-show="tabindex==1">
        <div class="babel">
          <div class="title-name">工资基本信息</div>
          <div class="babel-container">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">基本工资</div>
                  <div class="content-detail">{{SalayRuleDetail.BaseSalary | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">工作形式</div>
                  <div class="content-detail">{{SalayRuleDetail.WorkType | WorkType}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">岗位工资</div>
                  <div class="content-detail">{{SalayRuleDetail.PostSalary | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">绩效工资</div>
                  <div class="content-detail">{{SalayRuleDetail.PerformSalary | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">日常加班工资/小时</div>
                  <div class="content-detail">{{SalayRuleDetail.UsualOverTime | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">节假日加班工资/小时</div>
                  <div class="content-detail">{{SalayRuleDetail.HolidayOverTime | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">计时/计件工资</div>
                  <div class="content-detail">{{SalayRuleDetail.UnitSalary | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">房补</div>
                  <div class="content-detail">{{SalayRuleDetail.HouseSupport |BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">餐补</div>
                  <div class="content-detail">{{SalayRuleDetail.MealSupport | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">交通补</div>
                  <div class="content-detail">{{SalayRuleDetail.TrafficSupport | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">通讯补</div>
                  <div class="content-detail">{{SalayRuleDetail.CommSupport | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">高温补</div>
                  <div class="content-detail">{{SalayRuleDetail.HighTempSupport | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">出差补贴</div>
                  <div class="content-detail">{{SalayRuleDetail.TravelSupport | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">工会费用代扣</div>
                  <div class="content-detail">{{SalayRuleDetail.UnionFee | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">其他补贴</div>
                  <div class="content-detail">{{SalayRuleDetail.OtherSupport | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="title-name">社保计算规则</div>
          <div class="babel-container">
            <el-row class="bottom-line">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">养老缴纳基数</div>
                  <div class="content-detail">{{SIRuleDetail.PensionBase | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
                <div class="content">
                  <div class="content-label">养老缴纳计算方式</div>
                  <div class="content-detail">{{SIRuleDetail.PensionType | formula}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label w196">基本养老保险比例（企业部分）</div>
                  <div class="content-detail">{{SIRuleDetail.PensionCompany | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.PensionType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.PensionType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
                <div class="content">
                  <div class="content-label w196">基本养老保险比例（个人部分）</div>
                  <div class="content-detail">{{SIRuleDetail.PensionPersonal | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.PensionType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.PensionType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="bottom-line">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">失业保险缴纳基数</div>
                  <div class="content-detail">{{SIRuleDetail.UnemployBase | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
                <div class="content">
                  <div class="content-label">失业保险缴纳计算方式</div>
                  <div class="content-detail">{{SIRuleDetail.UnemployType | formula}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label w196">失业保险比例（企业部分）</div>
                  <div class="content-detail">{{SIRuleDetail.UnemployCompany | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.UnemployType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.UnemployType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
                <div class="content">
                  <div class="content-label w196">失业保险比例（个人部分）</div>
                  <div class="content-detail">{{SIRuleDetail.UnemployPersonal | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.UnemployType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.UnemployType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="bottom-line">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">工商保险缴纳基数</div>
                  <div class="content-detail">{{SIRuleDetail.InjuryBase | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
                <div class="content">
                  <div class="content-label">工商保险缴纳计算方式</div>
                  <div class="content-detail">{{SIRuleDetail.InjuryType | formula}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label w196">工伤保险比例（企业部分）</div>
                  <div class="content-detail">{{SIRuleDetail.InjuryCompany | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.InjuryType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.InjuryType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
                <div class="content">
                  <div class="content-label w196">工伤保险比例（个人部分）</div>
                  <div class="content-detail">{{SIRuleDetail.InjuryPersonal |Companydigital}}
                    <svg-icon v-if="SIRuleDetail.InjuryType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.InjuryType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="bottom-line">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">医疗保险缴纳基数</div>
                  <div class="content-detail">{{SIRuleDetail.MedicalBase | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
                <div class="content">
                  <div class="content-label">医疗保险缴纳计算方式</div>
                  <div class="content-detail">{{SIRuleDetail.MedicalType | formula}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label w196">医疗保险比例（企业部分）</div>
                  <div class="content-detail">{{SIRuleDetail.MedicalCompany | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.MedicalType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.MedicalType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
                <div class="content">
                  <div class="content-label w196">医疗保险比例（个人部分）</div>
                  <div class="content-detail">{{SIRuleDetail.MedicalPersonal | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.MedicalType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.MedicalType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="bottom-line">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">生育保险缴纳基数</div>
                  <div class="content-detail">{{SIRuleDetail.BirthBase | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
                <div class="content">
                  <div class="content-label">生育保险缴纳计算方式</div>
                  <div class="content-detail">{{SIRuleDetail.BirthType | formula}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label w196">生育保险比例（企业部分）</div>
                  <div class="content-detail">{{SIRuleDetail.BirthCompany | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.BirthType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.BirthType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
                <div class="content">
                  <div class="content-label w196">生育保险比例（个人部分）</div>
                  <div class="content-detail">{{SIRuleDetail.BirthPersonal | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.BirthType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.BirthType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="bottom-line">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">大病医疗缴纳基数</div>
                  <div class="content-detail">{{SIRuleDetail.BigMedicalBase | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
                <div class="content">
                  <div class="content-label">大病医疗缴纳计算方式</div>
                  <div class="content-detail">{{SIRuleDetail.BigMedicalType | formula}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label w196">大病医疗保险（企业部分）</div>
                  <div class="content-detail">{{SIRuleDetail.BigMedicalCompany | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.BigMedicalType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.BigMedicalType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
                <div class="content">
                  <div class="content-label w196">大病医疗保险（个人部分）</div>
                  <div class="content-detail">{{SIRuleDetail.BigMedicalPersonal | Companydigital}}
                    <svg-icon v-if="SIRuleDetail.BigMedicalType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="SIRuleDetail.BigMedicalType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="title-name">公积金计算规则</div>
          <div class="babel-container">
            <el-row class="bottom-line">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">缴纳基数</div>
                  <div class="content-detail">{{FundRuleDetail.FundBase | BIDMoney}}
                    <!-- <svg-icon slot="suffix" icon-class="money" class-name="way" /> -->
                  </div>
                </div>
                <div class="content">
                  <div class="content-label">公积金计算方式</div>
                  <div class="content-detail">{{FundRuleDetail.FundType | formula}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label w196">公积金缴纳比例（企业部分）</div>
                  <div class="content-detail">{{FundRuleDetail.FundCompany | Companydigital}}
                    <svg-icon v-if="FundRuleDetail.FundType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="FundRuleDetail.FundType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
                <div class="content">
                  <div class="content-label w196">公积金缴纳比例（个人部分）</div>
                  <div class="content-detail">{{FundRuleDetail.FundPersonal | Companydigital}}
                    <svg-icon v-if="FundRuleDetail.FundType==0" slot="suffix" icon-class="baifen" class-name="way" />
                    <svg-icon v-if="FundRuleDetail.FundType==1" slot="suffix" icon-class="money" class-name="way" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 员工沟通记录 -->
    <div :class="[buttonShow?'hiddenbutton':'buttonRight-name']">
      <a class="icon1" @click="showContent"><i class="el-icon-arrow-left"></i><span>员工沟通记录</span></a>
    </div>
    <div :class="[buttonShow ? 'content-rights':'contenthidden-right']">
      <div class="button-name">
        <a class="icon2" @click="hiddenContent"><i class="el-icon-arrow-right"></i></a>
      </div>
      <div class="record-content">
        <div class="title-name">员工沟通记录</div>
        <div class="erpscroll">
          <div class="record-box" v-for="(item, index) in porjectlist" :key="index">
            <div class="schedule">
              <div class="ring"></div>
              <div class="harp-line"></div>
            </div>
            <div class="record-con">
              <div class="record-time">{{item.AddTime | YYMMddhhmmssTime}}</div>
              <div class="alteration">
                <div class="alt-name">
                  <span>{{item.SysUserName}}</span>
                </div>
                <div class="alt-detail" :class="clickIdx==0?'shows':''" @click="shows">沟通内容：{{item.Content}}</div>
              </div>
              <div class="alteration" style="margin-left:50px" v-if="item.AttachUrl">
                <div class="alt-detail" @click="AttachUrlClick(item.AttachUrl)">沟通附件：<span>{{item.AttachName}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination background :current-page="currentPage" @current-change="handleCurrentChange" :pager-count="5" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>

<script>
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import { GetBfBankPageList, GetBfBankInfo } from "@/api/FinancialManagement";
import {
  GetBfInsuranceFundPageList,
  GetBfInsuranceFundInfo
} from "@/api/CompensationServiceManagement";
import {
  GetStaffInfo,
  GetStaffHistoryInfo,
  GetStaffFund,
  GetStaffSalary,
  GetStaffSi,
  GetStaffEduList,
  GetStaffWorkExpList,
  GetStaffFamilyList,
  GetStaffCommunicationPageList
} from "@/api/OutsourcedEmployeeManagement.js";
import { GetAreaList, GetCatagoryList } from "@/api/Public.js";
import { GetPersonalTaxRuleList } from "@/api/BusinessSet.js";
import {
  GetProjectStaffLogList,
  GetProjectStaffPageList
} from "@/api/projectManagement.js";
import {
  uuid,
  showLoading,
  hideLoading,
  copy,
  MenuIdDate
} from "@/utils/CustomValidation";
import qs from "qs";
import filters from "@/utils/filters";
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  filters: {
    Status(value) {
      if (value === 0) {
        return "待入职";
      } else if (value === 1) {
        return "在职";
      } else if (value === 2) {
        return "离职";
      } else if (value === 3) {
        return "待岗";
      } else if (value === 4) {
        return "潜在人才";
      }
    },
    ArmyMan(value) {
      if (value === 0) {
        return "否";
      } else if (value === 1) {
        return "是";
      } else {
        return "";
      }
    },
    LeaveAgree(value) {
      if (value == 0) {
        return "未签订";
      } else if (value == 1) {
        return "已签订";
      } else {
        return "无";
      }
    },
    formula(value) {
      if (value == 0) {
        return "百分比";
      } else if (value == 1) {
        return "固定值";
      } else {
        return "无";
      }
    },
    WorkType(value) {
      let msg = "";
      switch (value) {
        case 0:
          msg = "固定工资";
          break;
        case 1:
          msg = "计时";
          break;
        case 2:
          msg = "计件";
          break;
        default:
          msg = "无";
      }
      return msg;
    },
    LastQuitCert(value) {
      if (value == 0) {
        return "未提交";
      } else if (value == 1) {
        return "已提交";
      } else {
        return "无";
      }
    },
    SiStatus(value) {
      if (value === 0) {
        return "无需缴交";
      } else if (value === 1) {
        return "需要缴纳";
      } else if (value === 2) {
        return "已停缴";
      } else {
        return "无";
      }
    },
    Form(value) {
      if (value === 0) {
        return "全日制";
      } else {
        return "非全日制";
      }
    },
    Eye(value) {
      if (value === 0) {
        return "良好";
      } else if (value === 1) {
        return "辅助";
      } else {
        return "无";
      }
    },
    BankAccountType(value) {
      if (value === 0) {
        return "工资卡";
      } else if (value === 1) {
        return "存折";
      }
    },
    Companydigital(value) {
      if (value >= 0) {
        return value;
      } else {
        return "无";
      }
    }
  },
  data() {
    return {
      urlList: [
        {
          name: "外派员工管理",
          router: "/OutsourcedEmployeeManagement/ExpatriateManagement"
        },
        {
          name: "员工详情",
          router: ""
        }
      ],
      Id: "",
      tablist: [
        {
          index: 0,
          value: "员工信息录入"
        },
        {
          index: 1,
          value: "薪资待遇规则设置"
        }
      ],
      ProjectStaffLogList: [],
      ProjectStaffPageList: [],
      AttachUrlLength: 0,
      tabindex: 0,
      imageUrl: "",
      cardUrl: "",
      isimage: false,
      imgvisible: false,
      fileloading: false,
      filterlist: [],
      OriginAreaName: "", // 籍贯
      RegAreaName: "", // 身份证地址
      AreaName: "", // 居住地址
      ResidenceAreaName: "", // 户籍地
      SiAreaName: "", // 社保参保地
      FundAreaName: "", // 公积金参保地
      MedicalAreaName: "", // 医保参保地
      WorkAreaName: "", // 工作地
      NationName: "", // 民族
      PersonalTaxRuleName: "", // 个税计算规则
      InsuranceName: "", // 社保打款账号
      FundName: "", // 公积金打款账号
      BfBankName: "", // 工资打款账号
      MedicalName: "", //医保打款账号
      BankName: "", // 工资开户行
      employeesform: {},
      currentPage: 1,
      clickIdx: 0,
      total: 0,
      porjectlist: [],
      buttonShow: false,
      CompanyName: "", // 用工单位
      ProjectName: "", // 就职项目
      SalayRuleDetail: {}, // 工资计算规则
      SIRuleDetail: {}, // 社保计算规则
      FundRuleDetail: {}, // 公积金计算规则
      jobformlist: [], //就职项目列表
      PRojectDetail: [], //离职项目列表
      leavetype: false, // 是否离职
      leavefile: {}, // 离职文件
      leaveform: {}, // 离职信息

      edformlist: [],
      historyformlist: [],
      familyformlist: [],

      // 预览样式
      isImg: 1,
      iframeShow: false,
      previewFileUrl: "",
      titlename: "附件预览"
    };
  },
  created() {
    this.Id = this.$route.query.id;
    // 获取面包屑
    let breadpath = JSON.parse(window.localStorage.getItem("breadpath")) || {};

    if (breadpath.router) {
      this.urlList[0] = breadpath;
    }
    // 判断是离职人员还是在职人员
    this.leavetype = this.$route.query.type;
    if (this.leavetype) {
      this.getStaffHistoryInfo();
    } else {
      this.getStaffInfo();
      this.getStaffFund();
      this.getStaffSalary();
      this.getStaffSi();
    }
    this.getStaffEduList();
    this.getStaffWorkExpList();
    this.getStaffFamilyList();
    this.GetProjectStaffPageList();
    this.GetProjectStaffLogList();
  },
  watch: {
    // 监听籍贯
    "employeesform.OriginAreaId"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = "";
            var cityName = "";
            var AreaName = "";
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name;
            }
            this.OriginAreaName =
              provinceName + " " + cityName + " " + AreaName;
          } else {
          }
        });
      }
    },
    // 身份证
    "employeesform.RegAreaId"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = "";
            var cityName = "";
            var AreaName = "";
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name;
            }
            this.RegAreaName =
              provinceName +
              " " +
              cityName +
              " " +
              AreaName +
              " " +
              this.employeesform.RegAddress;
          } else {
          }
        });
      }
    },
    // 居住地
    "employeesform.AreaId"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = "";
            var cityName = "";
            var AreaName = "";
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name;
            }
            this.AreaName =
              provinceName +
              " " +
              cityName +
              " " +
              AreaName +
              " " +
              this.employeesform.Address;
          } else {
          }
        });
      }
    },
    // 户籍地
    "employeesform.ResidenceAreaId"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = "";
            var cityName = "";
            var AreaName = "";
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name;
            }
            this.ResidenceAreaName =
              provinceName + " " + cityName + " " + AreaName;
          } else {
          }
        });
      }
    },
    // 社保参保地
    "employeesform.SiAreaId"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = "";
            var cityName = "";
            var AreaName = "";
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name;
            }
            this.SiAreaName = provinceName + " " + cityName + " " + AreaName;
          }
        });
      }
    },
    // 公积金参保地
    "employeesform.FundAreaId"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = "";
            var cityName = "";
            var AreaName = "";
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name;
            }
            this.FundAreaName = provinceName + " " + cityName + " " + AreaName;
          }
        });
      }
    },
    // 医保参保地
    "employeesform.MedicalAreaId"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = "";
            var cityName = "";
            var AreaName = "";
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name;
            }
            this.MedicalAreaName =
              provinceName + " " + cityName + " " + AreaName;
          }
        });
      }
    },
    // 工作地
    "employeesform.WorkAreaId"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var provinceName = "";
            var cityName = "";
            var AreaName = "";
            var select = response.Data.filter(v => {
              return v.isselect;
            });
            if (select.find(v => v.Level == 1) !== undefined) {
              provinceName = select.find(v => v.Level == 1).Name;
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              cityName = select.find(v => v.Level == 2).Name;
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              AreaName = select.find(v => v.Level == 3).Name;
            }
            // this.WorkAreaName = provinceName + ' ' + cityName + ' ' + AreaName + ' ' + this.employeesform.WorkAddress
          } else {
          }
        });
      }
    },
    // 民族
    "employeesform.Nation"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          ClassName: "",
          Status: 1,
          ClassType: 4,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetCatagoryList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.find(response.Data, newvalue);
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    // 个税计算规则
    "employeesform.PersonalTaxRuleId"(newvalue, oldvalue) {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetPersonalTaxRuleList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          let data = response.Data.find(v => {
            return v.Id == newvalue;
          });
          if (data) {
            this.PersonalTaxRuleName = data.RuleName;
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
  methods: {
    GetProjectStaffLogList() {
      let obj = {
        ProjectId: 0,
        StaffId: this.Id,
        Director: 0,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectStaffLogList(obj).then(res => {
        if (res.IsSuccess && res.Data.length > 0) {
          this.ProjectStaffLogList = res.Data;
          console.log(this.ProjectStaffLogList);
        } else {
          this.ProjectStaffLogList = [];
        }
      });
    },
    //获取员工信息列表
    GetProjectStaffPageList() {
      let obj = {
        ProjectId: 0,
        StaffId: this.Id,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectStaffPageList(obj).then(res => {
        if (res.IsSuccess && res.Data.length > 0) {
          this.ProjectStaffPageList = res.Data;
        }
        console.log(this.ProjectStaffPageList);
      });
    },
    shows() {
      this.clickIdx++;
      if (this.clickIdx % 2 == 1) {
        this.clickIdx = 1;
      } else {
        this.clickIdx = 0;
      }
    },
    GetStaffCommunicationPageList() {
      let obj = {
        StaffId: this.Id,
        PageIndex: 1,
        PageSize: 10,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      GetStaffCommunicationPageList(obj).then(res => {
        hideLoading();
        if (res.IsSuccess && res.Data) {
          if (res.Data.length > 0) {
            this.porjectlist = res.Data;
            this.porjectlist.forEach(data => {
              if (data.AttachUrl) {
                data.AttachName = data.AttachUrl.split("/")[data.AttachUrl.split("/").length - 1];
              }
            });
          }
        }
      });
    },
    // 选择页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProjectLogsPageList();
    },
    showContent() {
      this.GetStaffCommunicationPageList();
      this.buttonShow = true;
    },
    hiddenContent() {
      this.buttonShow = false;
    },
    // 获取外包员工信息
    getStaffInfo() {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      GetStaffInfo(qs.stringify(obj)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          if (response.Data) {
            // 处理头像数据
            if (response.Data.Photo) {
              this.imageUrl = response.Data.Photo;
            }
            // 处理身份证数据
            if (response.Data.IdCodeUrl) {
              this.cardUrl = response.Data.IdCodeUrl;
              // 判断是图片还是pdf
              var name = response.Data.IdCodeUrl.split(".");
              if (name[name.length - 1].toLowerCase() == "pdf") {
                this.isimage = false;
              } else {
                this.isimage = true;
              }
            }
            // 处理工资卡开户行
            if (response.Data.BankName) {
              let obj1 = {
                ClassName: "",
                Status: 1,
                ClassType: 5,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              GetCatagoryList(qs.stringify(obj1)).then(res => {
                if (res.IsSuccess) {
                  if (res.Data) {
                    let data =
                      res.Data.find(v => {
                        return v.Id === response.Data.BankName;
                      }) || {};
                    this.BankName = data.ClassName;
                  }
                } else {
                  this.$message({
                    message: res.MessageContent,
                    type: "error"
                  });
                }
              });
            }

            //入职项目
            if (
              response.Data.ProjectIds &&
              response.Data.ProjectIds.length > 0
            ) {
              this.jobformlist = response.Data.ProjectIds;
              for (let i = 0; i < this.jobformlist.length; i++) {
                let obj = {
                  AreaId: this.jobformlist[i].AreaId,
                  menuid: MenuIdDate(),
                  operationcode: "1"
                };
                GetAreaList(qs.stringify(obj)).then(response => {
                  if (response.IsSuccess) {
                    var select = response.Data.filter(v => {
                      return v.isselect;
                    });
                    if (select.find(v => v.Level == 1) !== undefined) {
                      this.jobformlist[i].workprovinceName = select.find(
                        v => v.Level == 1
                      ).Name;
                    }
                    if (select.find(v => v.Level == 2) !== undefined) {
                      this.jobformlist[i].workcityName = select.find(
                        v => v.Level == 2
                      ).Name;
                    }
                    if (select.find(v => v.Level == 3) !== undefined) {
                      this.jobformlist[i].workareaName = select.find(
                        v => v.Level == 3
                      ).Name;
                    }
                  }
                });
              }
            } else {
              this.jobformlist = [];
            }
            // 社保打款账号
            if (response.Data.InsuranceId) {
              let obj = {
                Id: response.Data.InsuranceId,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              GetBfInsuranceFundInfo(qs.stringify(obj)).then(res => {
                if (res.IsSuccess) {
                  this.InsuranceName =
                    (res.Data.BfCompanyName || "") + " - " + res.Data.Account;
                } else {
                  this.$message({
                    message: res.MessageContent,
                    type: "error"
                  });
                }
              });
            } else {
              this.InsuranceName = "";
            }

            // 公积金打款账号
            if (response.Data.FundId) {
              let obj = {
                Id: response.Data.FundId,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              GetBfInsuranceFundInfo(qs.stringify(obj)).then(res => {
                if (res.IsSuccess) {
                  this.FundName =
                    (res.Data.BfCompanyName || "") + " - " + res.Data.Account;
                } else {
                  this.$message({
                    message: res.MessageContent,
                    type: "error"
                  });
                }
              });
            } else {
              this.FundName = "";
            }
            //医保打款账号
            if (response.Data.MedicalId) {
              let obj = {
                Id: response.Data.MedicalId,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              GetBfInsuranceFundInfo(qs.stringify(obj)).then(res => {
                if (res.IsSuccess) {
                  this.MedicalName =
                    (res.Data.BfCompanyName || "") + " - " + res.Data.Account;
                } else {
                  this.$message({
                    message: res.MessageContent,
                    type: "error"
                  });
                }
              });
            } else {
              this.MedicalName = "";
            }
            // 工资账号
            if (response.Data.BfBankId) {
              let obj = {
                Id: response.Data.BfBankId,
                menuid: MenuIdDate(),
                operationcode: "1"
              };
              GetBfBankInfo(qs.stringify(obj)).then(res => {
                if (res.IsSuccess) {
                  this.BfBankName =
                    res.Data.BfCompanyName +
                    "-" +
                    res.Data.BankName +
                    "-" +
                    res.Data.Account;
                } else {
                  this.$message({
                    message: res.MessageContent,
                    type: "error"
                  });
                }
              });
            } else {
              this.BfBankName = "";
            }
            //获取离职项目信息
            if (response.Data.ProjectLeaves) {
              this.PRojectDetail = response.Data.ProjectLeaves;
            }
            // 处理附件
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
            // 处理用工单位
            // if (response.Data.CompanyIds) {
            //   let namearray = []
            //   let array = response.Data.CompanyIds.split(',')
            //   for (let i = 0; i < array.length; i++) {
            //     namearray.push(array[i].split('__')[1])
            //   }
            //   this.CompanyName = namearray.join(', ')
            //   let obj = {
            //     companyIds: response.Data.CompanyIds,
            //     menuid: MenuIdDate(),
            //     operationcode: '1'
            //   }
            // } else {
            //   this.CompanyName = ''
            // }
            this.employeesform = response.Data;
            console.log(this.employeesform)
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取公积金缴纳信息
    getStaffFund() {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffFund(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // 判断是否已经添加成功了公积金缴纳信息
            if (response.Data.StaffId) {
              this.isupdateFundRule = true;
            } else {
              this.isupdateFundRule = false;
            }
            // 判断是否重新入职
            if (this.isentry) {
            } else {
              this.FundRuleDetail = response.Data;
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
    // 获取工资标准信息
    getStaffSalary() {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffSalary(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // this.SalayRuleDetail = response.Data
            // 判断是否已经添加了工资
            if (response.Data.StaffId) {
              this.isupdateSalayRule = true;
            } else {
              this.isupdateSalayRule = false;
            }
            if (this.isentry) {
            } else {
              this.SalayRuleDetail = response.Data;
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
    // 获取社保计算规则
    getStaffSi() {
      let obj = {
        StaffId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffSi(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            // this.SIRuleDetail = response.Data
            // 判断是否已经添加了社保计算规则
            if (response.Data.StaffId) {
              this.isupdateSIRule = true;
            } else {
              this.isupdateSIRule = false;
            }
            // 判断是否重新入职
            if (this.isentry) {
            } else {
              this.SIRuleDetail = response.Data;
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
    // 获取离职员工信息
    getStaffHistoryInfo() {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffHistoryInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            if (response.Data.GetStaffHistoryInfo) {
              this.employeesform = response.Data.GetStaffHistoryInfo;
            }
            if (response.Data.GetStaffLeaveInfo) {
              // 处理文件数据
              this.leavefile = {};
              if (response.Data.GetStaffLeaveInfo.AgreeUrl) {
                var namearry = response.Data.GetStaffLeaveInfo.AgreeUrl.split(
                  "."
                );
                (this.leavefile.name = namearry[namearry.length - 1]),
                  (this.leavefile.Url =
                    response.Data.GetStaffLeaveInfo.AgreeUrl),
                  this.$set(this.leavefile, "visible", false);
              }
              // 处理头像数据
              if (response.Data.GetStaffLeaveInfo.Photo) {
                this.imageUrl = response.Data.GetStaffLeaveInfo.Photo;
              }
              // 处理身份证数据
              if (response.Data.GetStaffLeaveInfo.IdCodeUrl) {
                this.cardUrl = response.Data.GetStaffLeaveInfo.IdCodeUrl;
                // 判断是图片还是pdf
                var name = response.Data.GetStaffLeaveInfo.IdCodeUrl.split(".");
                if (name[name.length - 1].toLowerCase() == "pdf") {
                  this.isimage = false;
                } else {
                  this.isimage = true;
                }
              }
              this.leaveform = response.Data.GetStaffLeaveInfo;
            }
            // 获取公积金缴纳信息
            if (response.Data.GetStaffFundHistoryInfo) {
              this.FundRuleDetail = response.Data.GetStaffFundHistoryInfo;
            }
            // 获取社保计算规则
            if (response.Data.GetStaffSiHistoryInfo) {
              this.SIRuleDetail = response.Data.GetStaffSiHistoryInfo;
            }
            // 获取工资标准信息
            if (response.Data.GetStaffSalaryHistoryInfo) {
              this.SalayRuleDetail = response.Data.GetStaffSalaryHistoryInfo;
            }
          }
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
    find(arry, value) {
      for (let i = 0; i < arry.length; i++) {
        // if (arry[i].children && arry[i].children.length) {
        //   this.find(arry[i].children, value)
        // } else {
        //   console.log(arry[i].Id);
        if (arry[i].Id == value) {
          this.NationName = arry[i].ClassName;
        }
        // }
      }
    },
    // 选择展示内容
    choosetab(e) {
      this.tabindex = e.index;
    },
    // 身份证预览
    watchcard(e) {
      if (e) {
        const ext = e.slice(e.lastIndexOf(".") + 1).toLowerCase();
        console.log(e);
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = e;
        } else if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "xlsx" ||
          ext == "xls"
        ) {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" + e;
        } else {
          this.isImg = 1;
          this.previewFileUrl = e;
        }
        this.iframeShow = true;
      }
    },
    // 下载身份证
    downcard(e) {
      window.open(e);
    },
    // 预览
    watch(e) {
      // if (e.name == 'doc' || e.name == 'docx'){
      //   window.open(`https://view.officeapps.live.com/op/view.aspx?src=`+e.Url)
      // } else {
      //   window.open(e.Url)
      // }
      console.log(e);
      if (e.name == "pdf") {
        this.isImg = 2;
        this.previewFileUrl = e.Url;
      } else if (e.name == "doc" || e.name == "docx") {
        this.isImg = 3;
        this.previewFileUrl =
          "https://view.officeapps.live.com/op/view.aspx?src=" + e.Url;
      } else {
        this.isImg = 1;
        this.previewFileUrl = e.Url;
      }
      this.iframeShow = true;
    },
    // 下载
    down(e) {
      window.open(e.Url);
    },
    closeFileShow(val) {
      this.iframeShow = val;
    },
    // 查看图片
    watchphoto(e) {
      this.isImg = 1;
      this.previewFileUrl = e;
      this.iframeShow = true;
    },
    //下载沟通附件事件
    AttachUrlClick(url) {
      if (url) {
        window.open(url);
      } else {
        this.$message({
          message: "暂无文件下载",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.expatriate-employees-deatil-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .detail-content {
    background-color: #fff;
    margin-left: 24px;
    border-radius: 8px 0px 0px 8px;
    padding: 40px;
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
        cursor: pointer;
        &.active {
          background-color: #e0edff;
          color: $erpcolor;
        }
      }
    }
    .babel {
      .title-name {
        font-size: $f16;
        line-height: 16px;
        color: $erp333;
        font-weight: 700;
        position: relative;
        padding-left: 12px;
        margin-bottom: 24px;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          width: 4px;
          height: 16px;
          background-color: $erpcolor;
        }
      }
      .babel-container {
        border-bottom: 1px solid $erpBK;
        margin-bottom: 24px;
        &.dashed {
          border-bottom: 1px dashed $erpBK;
        }
        .el-row.bottom-line {
          border-bottom: 1px solid $erpBK;
          margin-top: 24px;
          &:last-child {
            border-bottom: none;
          }
        }
        .content {
          display: flex;
          margin-bottom: 24px;
          .content-label {
            font-size: $f14;
            color: $erp333;
            font-weight: 700;
            width: 140px;
            text-align: right;
            &.w196 {
              width: 196px;
            }
          }
          .content-detail {
            font-size: $f14;
            color: $erp999;
            flex: 1;
            padding-left: 12px;
          }
        }
        .img-box {
          max-width: 177px;
          max-height: 247.8px;
          height: 247.8px;
          background-color: #f0f4fa;
          margin-bottom: 24px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          .image {
            width: 100%;
            height: 100%;
            display: block;
          }
          .photo-con {
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
                font-size: $f14;
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
                > span {
                  padding-left: 4px;
                }
              }
            }
          }
        }
      }
      // 附件样式
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
              line-height: 30px;
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
    }
  }
  .buttonRight-name {
    position: fixed;
    right: 0;
    top: 30%;
    background: #8e9298;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    transform: all 2s;
    z-index: 99;
    .icon1 {
      width: 40px;
      height: 120px;
      color: #fff;
      font-size: 14px;
      display: inline-block;
      i {
        font-size: 16px;
        line-height: 120px;
        vertical-align: top;
      }
      span {
        color: #fff;
        font-size: 14px;
        width: 20px;
        display: inline-block;
        line-height: 15px;
        margin-top: 14px;
      }
    }
  }
  .hiddenbutton {
    display: none;
  }
  .button-name {
    position: absolute;
    top: 34%;
    right: 0;
    width: 24px;
    background: #8e9298;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    transition: all 1s;
  }
  .contenthidden-right {
    position: fixed;
    right: -40%;
    top: 20%;
    width: 400px;
    opacity: 0;
  }
  .content-rights {
    position: fixed;
    right: 0;
    top: 20%;
    width: 400px;
    opacity: 1;
    transition: all 1s;
    z-index: 99;
    max-height: 70%;
    box-shadow: 2px 1px 15px #ccc;
    .title-name {
      font-size: $f16;
      color: $erp333;
      position: relative;
      padding-left: 12px;
      line-height: 16px;
      font-weight: 700;
      margin-bottom: 24px;
      &::after {
        content: "";
        width: 4px;
        height: 16px;
        background-color: $erpcolor;
        position: absolute;
        left: 0;
      }
    }
    .button-name {
      background: #8e9298;
      position: absolute;
      left: -24px;
      top: 34%;
      .icon2 {
        width: 24px;
        height: 120px;
        color: #fff;
        display: inline-block;
        font-size: 14px;
        text-align: center;
        i {
          font-size: 16px;
          line-height: 120px;
        }
      }
    }
    .record-content {
      padding: 24px;
      background-color: $erinputbgc;
      border-radius: 8px;
      height: calc(100vh - 400px);
      .erpscroll {
        overflow-y: auto;
        height: calc(100vh - 520px);
      }
      .record-box {
        display: flex;
        .schedule {
          width: 16px;
          .ring {
            width: 16px;
            height: 16px;
            border-radius: 8px;
            background-color: #fff;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              width: 8px;
              height: 8px;
              border-radius: 4px;
              background-color: $erpcolor;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .harp-line {
            width: 2px;
            height: calc(100% - 16px);
            background-color: $erpcolor;
            margin-left: 7px;
          }
        }
        .record-con {
          flex: 1;
          padding-left: 16px;
          .record-time {
            line-height: 14px;
            font-size: $f14;
            color: $erp333;
            font-weight: 700;
          }
          .alteration {
            display: flex;
            align-items: center;
            padding: 10px 0;
            .alt-name {
              font-size: $f14;
              line-height: 14px;
              background-color: rgba(21, 136, 248, 0.1);
              padding: 5px 10px;
              border-radius: 8px;
              height: 24px;
              > span {
                color: $erpcolor;
                font-size: $f14;
              }
            }
            .shows {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .alt-detail {
              flex: 1;
              padding-left: 16px;
              font-size: $f14;
              color: $erp999;
              cursor: pointer;
              span {
                color: #1588f8;
              }
            }
          }
        }
        .el-pagination {
          margin-top: 10px;
          text-align: center;
        }
      }
    }
    .footer-button {
      text-align: center;
      background: #ffffff;
      padding-bottom: 20px;
    }
  }
}
.line {
  width: 80%;
  // height: 1px;
  border-bottom: 1px dashed #e5e5e5;
}
.jobform-row {
  margin-top: 20px;
  &:nth-last-child(1) .line {
    display: none;
  }
}
</style>