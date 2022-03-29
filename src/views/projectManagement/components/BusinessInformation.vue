<!-- 业务信息窗口 -->
<template>
  <div>
    <div class="babel" v-if="isSys">
      <div class="title-name">项目指派人员</div>
      <div class="babel-container">
        <el-row class="follow-row">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">人员名称</div>
              <div class="content-detail" v-if="ProjectDetail.AssignName">{{ProjectDetail.AssignName}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="babel">
      <div class="title-name">基本信息</div>
      <div class="babel-container">
        <el-row class="follow-row">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">项目名称</div>
              <div class="content-detail" v-if="ProjectDetail.Name">{{ProjectDetail.Name}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">项目金额</div>
              <div class="content-detail" v-if="ProjectDetail.Account">{{ProjectDetail.Account}}元</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">所属客户</div>
              <div class="content-detail" v-if="ProjectDetail.CompanyName">{{ProjectDetail.CompanyName}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">项目业务类型</div>
              <div class="content-detail" v-if="ProjectDetail.BusinessTypeText">{{ProjectDetail.BusinessTypeText}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">风险金比例</div>
              <div class="content-detail">{{ProjectDetail.RiskScale}}%</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">是否招投标</div>
              <div class="content-detail" v-if="ProjectDetail.Tender">{{ProjectDetail.Tender | Tender}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">人均管理费</div>
              <div class="content-detail" v-if="ProjectDetail.MgrFee">{{ProjectDetail.MgrFee}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">项目优先级</div>
              <div class="content-detail">{{ProjectDetail.Priority | Priority}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">发票类型</div>
              <div class="content-detail">{{ProjectDetail.InvoiceTypeText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">履约保证金</div>
              <div class="content-detail" v-if="ProjectDetail.Bond">{{ProjectDetail.Bond}}元</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">项目跟单员</div>
              <div class="content-detail" v-if="ProjectDetail.OwnerName">{{ProjectDetail.OwnerName}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">人均管理费</div>
              <div class="content-detail">{{ProjectDetail.MgrFeeText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">参保情况</div>
              <div class="content-detail">{{ProjectDetail.SiTypeText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">风险承担方</div>
              <div class="content-detail">{{ProjectDetail.UndertakerText}}</div>
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">风险承担方</div>
              <div class="content-detail">{{ProjectDetail.UndertakerText}}</div>
            </div>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">是否需招聘</div>
              <div class="content-detail">{{ProjectDetail.Recruit | Assist}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">是否垫资</div>
              <div class="content-detail">{{ProjectDetail.Advance | Assist}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">管理费单价</div>
              <div class="content-detail">{{ProjectDetail.MgrPrice}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">首次签订协议时间</div>
              <div class="content-detail">{{ProjectDetail.FirstSign | Time}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">协议执行年度</div>
              <div class="content-detail">{{ProjectDetail.YearthText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">营销模式</div>
              <div class="content-detail">{{ProjectDetail.MarketType | MarketType}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">岗位</div>
              <div class="content-detail">{{ProjectDetail.PositionName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">首月人数</div>
              <div class="content-detail">{{ProjectDetail.FirstMonthNum}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">首月收入</div>
              <div class="content-detail">{{ProjectDetail.FirstMonthIncome}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">首月管理费</div>
              <div class="content-detail">{{ProjectDetail.FirstMonthMgrFee}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-if="ProjectDetail.Assist===1">
            <div class="content">
              <div class="content-label">分公司</div>
              <div class="content-detail"><span v-if="ProjectDetail.Assists" v-for="(item, index) in ProjectDetail.Assists" :key="index">{{item.OrgName}} </span> </div>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="content">
              <div class="content-label">项目详细描述</div>
              <div class="content-detail" v-if="ProjectDetail.Description">{{ProjectDetail.Description}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="content">
              <div class="content-label">项目关键说明</div>
              <div class="content-detail" v-if="ProjectDetail.Special">{{ProjectDetail.Special}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="babel">
      <div class="title-name">项目成员信息</div>
      <div class="babel-container">
        <el-table class="erp-table" :data="ProjectDetail.newMembers" style="width: 100%">
          <el-table-column align="center" prop="CommissionerName" label="人员名称">
          </el-table-column>
          <el-table-column align="center" prop="TypeText" label="人员角色">
          </el-table-column>
          <el-table-column align="center" prop="Remark" label="服务地区">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="babel" v-if="Contacts.length > 0">
      <div class="title-name">项目联系人</div>
      <div class="babel-Contacts" v-for="(item,index) in Contacts" :key="index">
        <el-row class="follow-row">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">项目联系人</div>
              <div class="content-detail">{{item.UserName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">联系人职务</div>
              <div class="content-detail">{{item.PositionName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">联系电话</div>
              <div class="content-detail">{{item.Tel}}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="content">
              <div class="content-label">备注</div>
              <div class="content-detail">{{item.Remark}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row class="follow-row">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">项目单位名称</div>
              <div class="content-detail">{{item.CompanyName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">类型</div>
              <div class="content-detail">{{item.NatureText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">行业</div>
              <div class="content-detail">{{item.IndustryName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">地址</div>
              <div class="content-detail">{{item.Addr}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="babel" v-if="Outsource && (BusinessType == '1'|| BusinessType == '2' || BusinessType == '3')">
      <div class="title-name">业务信息</div>
      <div class="babel-container">
        <el-row class="follow-row">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">参保险种</div>
              <div class="content-detail" v-if="Outsource.InsuranceText">{{Outsource.InsuranceText}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">管理费</div>
              <div class="content-detail" v-if="Outsource.MgrFee">{{Outsource.MgrFee}}元</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">协议期限</div>
              <div class="content-detail" v-if="Outsource.CoordinateStart && Outsource.CoordinateEnd">{{Outsource.CoordinateStart | Time}} —— {{Outsource.CoordinateEnd | Time}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">结算日期</div>
              <div class="content-detail" v-if="Outsource.SalaryDay">{{Outsource.SalaryDay | Time}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">发票要求</div>
              <div class="content-detail" v-if="Outsource.InvoiceDemand">{{Outsource.InvoiceDemand | InvoiceDemand}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">税金</div>
              <div class="content-detail" v-if="Outsource.Tax">{{Outsource.Tax}}元</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">员工合同年限</div>
              <div class="content-detail" v-if="Outsource.StaffContract">{{Outsource.StaffContract | Time}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">客户公司地址</div>
              <div class="content-detail">{{provinceName}} {{cityName}} {{AreaIdName}}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="content">
              <div class="content-label">岗位要求</div>
              <div class="content-detail" v-if="Outsource.Description">{{Outsource.Description}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <div v-if="ProjectRecruitList.length > 0">
      <div v-for="(item,index) in ProjectRecruitList" :key="index">
        <div class="babel">
          <div class="title-name">招聘业务信息</div>
          <div class="babel-container">
            <el-row class="follow-row">
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">招聘岗位</div>
                  <div class="content-detail" v-if="item.PositionName">{{item.PositionName}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">岗位人数</div>
                  <div class="content-detail" v-if="item.NeedNum">{{item.NeedNum}}人</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">管理费</div>
                  <div class="content-detail" v-if="item.MgrFee">{{item.MgrFee}}元</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">上岗地址</div>
                  <div class="content-detail" v-if="item.AreaId">{{item.provinceName}} {{item.cityName}} {{item.AreaIdName}} {{item.Address}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">上班时间</div>
                  <div class="content-detail" v-if="item.WorkTime">{{item.WorkTime | Time}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">到岗时间</div>
                  <div class="content-detail" v-if="item.OnBoardTime">{{item.OnBoardTime | Time}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">倒班时间</div>
                  <div class="content-detail" v-if="item.ChangeTime">{{item.ChangeTime}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">休息时间</div>
                  <div class="content-detail" v-if="item.RestTime">{{item.RestTime}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="content">
                  <div class="content-label">岗位要求</div>
                  <div class="content-detail" v-if="item.Skills">{{item.Skills}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="content">
                  <div class="content-label">工作内容及职责</div>
                  <div class="content-detail" v-if="item.Description">{{item.Description}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="title2-name">福利待遇</div>
          <div class="babel-container">
            <el-row class="follow-row">
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">试用期薪资</div>
                  <div class="content-detail" v-if="item.SalaryTry">{{item.SalaryTry}}元</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">试用期限</div>
                  <div class="content-detail" v-if="item.TryTime">{{item.TryTime}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">综合薪资</div>
                  <div class="content-detail" v-if="item.Salary">{{item.Salary}}元</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">五险一金</div>
                  <div class="content-detail" v-if="item.SiFund">{{item.SiFund}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">是否包吃包住</div>
                  <div class="content-detail" v-if="item.LiveEat">{{item.LiveEat}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">培训薪资</div>
                  <div class="content-detail" v-if="item.TrainSalary">{{item.TrainSalary}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">岗位补贴</div>
                  <div class="content-detail" v-if="item.PostSupport">{{item.PostSupport}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">加班补贴</div>
                  <div class="content-detail" v-if="item.OverTimeSupport">{{item.OverTimeSupport}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">全勤奖</div>
                  <div class="content-detail" v-if="item.FullTudy">{{item.FullTudy}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">提成说明</div>
                  <div class="content-detail" v-if="item.Commision">{{item.Commision}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">其他补贴/福利</div>
                  <div class="content-detail" v-if="item.OtherWelfare">{{item.OtherWelfare}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">晋升空间</div>
                  <div class="content-detail" v-if="item.Promotion">{{item.Promotion}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="content">
                  <div class="content-label">应聘者需要提供的资料</div>
                  <div class="content-detail" v-if="item.NeedMaterial">{{item.NeedMaterial}}</div>
                  <div class="content-detail" v-else>--</div>
                </div>
              </el-col>

            </el-row>
          </div>
        </div>
      </div>
      <div class="babel">

      </div>
    </div> -->
    <div class="babel" v-if="communicationList.length > 0">
      <div class="title-name">项目沟通记录</div>
      <div class="babel-container">
        <el-row class="follow-row" v-for="(item,index) in communicationList" :key="index">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">沟通人</div>
              <div class="content-detail" v-if="item.SysUserName">{{item.SysUserName}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">跟进时间</div>
              <div class="content-detail" v-if="item.FollowTime">{{item.FollowTime | Time}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="content">
              <div class="content-label">沟通阶段</div>
              <div class="content-detail" v-if="item.ProgressText">{{item.ProgressText}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="content">
              <div class="content-label">沟通内容</div>
              <div class="content-detail" v-if="item.Content">{{item.Content}}</div>
              <div class="content-detail" v-else>--</div>
            </div>
          </el-col>

        </el-row>
      </div>
    </div>
    <div class="babel" v-if="AttachList.length > 0">
      <div class="title-name">客户资料附件</div>
      <div class="babel-File">
        <div class="upload" v-for="(item,index) in AttachList" :key="index">
          <div :title="item.name" class="files" @mouseenter="fileShow(index)" @mouseleave="filenoShow(index)">
            <span class="filestype">{{item.isWOD}}</span>
            <p>{{item.name}}</p>
            <div v-show="item.optionShow" class="option-button">
              <a @click="preview(item)">
                <svg-icon icon-class="replace" class-name="svg-a" />预览
              </a>
              <a @click="downloadFile(item)">
                <svg-icon icon-class="download" class-name="svg-a" />下载
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" titlename="预览附件" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { GetProject, GetProjectRecruit, GetProjectFollowList, GetYearthEnum } from '@/api/projectManagement.js'
import { showLoading, hideLoading, MenuIdDate } from '@/utils/CustomValidation.js'
import { GetAreaList } from '@/api/Public.js'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  props: [],
  components: {
    PreviewFile
  },
  filters: {
    Priority (value) {
      if (value == 0) {
        return '低'
      } else if (value == 1) {
        return '中'
      } else if (value == 2) {
        return '高'
      }
    },
    Assist (value) {
      if (value === 0) {
        return '否'
      } else {
        return '是'
      }
    },
    MarketType (value) {
      if (value === 0) {
        return '全员营销'
      } else {
        return '专职营销'
      }
    },
  },
  data () {
    return {
      BusinessType: '',
      Id: '',
      Outsource: {},
      ProjectDetail: {},
      provinceName: '',
      cityName: '',
      AreaIdName: '',
      ProjectRecruitList: [],
      communicationList: [],
      AttachList: [],
      isImg: 1,
      iframeShow: false,
      previewFileUrl: '',
      Contacts: [],//联系人
      isSys: false, // 是否展示项目指派人员
      Yearth: '',

      operating: {}
    }
  },
  created () {
    this.$nextTick(() => {
      // 获取操作operating
      this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      // 判断是否显示项目指派人员
      if (this.$route.query.isSys) {
        this.isSys = true
      }
      this.Id = this.$route.query.Id
      this.getDetail(this.Id)
    })
  },
  methods: {
    getDetail (Id) {
      let obj = {
        Id: Id,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      GetProject(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          // 处理项目关联的人员
          if (response.Data.Members && response.Data.Members.length) {
            let arry = []
            let data = {}
            for (let i = 0; i < response.Data.Members.length; i++) {
              var ai = response.Data.Members[i]
              if (!data[ai.Commissioner]) {
                arry.push(ai)
                data[ai.Commissioner] = ai
              } else {
                for (let j = 0; j < arry.length; j++) {
                  var dj = arry[j]
                  if (dj.Commissioner == ai.Commissioner) {
                    dj.TypeText = ai.TypeText + ',' + dj.TypeText
                    dj.Remark = ai.Remark + ',' + dj.Remark
                    break
                  }
                }
              }
            }
            for (let i = 0; i < arry.length; i++) {
              arry[i].Remark = [...new Set(arry[i].Remark.split(','))]
            }
            response.Data.newMembers = arry

            console.log(arry);
          } else {
            response.Data.newMembers = []
          }
          this.ProjectDetail = response.Data
          this.BusinessType = this.ProjectDetail.BusinessType
          if (this.ProjectDetail.Outsource) {
            this.Outsource = this.ProjectDetail.Outsource
          }



          if (this.ProjectDetail.AttachUrl) {
            let arr = []
            arr = this.ProjectDetail.AttachUrl.split(';')
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].indexOf('.') > -1) {
                this.AttachList.push({
                  name: arr[i].slice(arr[i].lastIndexOf('/') + 1, arr[i].lastIndexOf('.')),
                  Url: arr[i],
                  isWOD: arr[i].slice(arr[i].lastIndexOf('.') + 1).toUpperCase(),
                  optionShow: false
                })
              }
            }
          }
          if (this.Outsource && this.Outsource.AreaId) {
            let obj = {
              AreaId: this.Outsource.AreaId,
              menuid: MenuIdDate(),
              operationcode: '1'
            }
            GetAreaList(qs.stringify(obj)).then(response => {
              if (response.IsSuccess) {
                let select = response.Data.filter(v => {
                  return v.isselect
                })
                if (select.find(v => v.Level == 1) !== undefined) {
                  this.provinceName = select.find(v => v.Level == 1).Name
                }
                if (select.find(v => v.Level == 2) !== undefined) {
                  this.cityName = select.find(v => v.Level == 2).Name
                }
                if (select.find(v => v.Level == 3) !== undefined) {
                  this.AreaIdName = select.find(v => v.Level == 3).Name
                } else {
                  this.AreaIdName = ''
                }
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: 'error'
                })
              }
            })
          }
          if (this.ProjectDetail.Contacts && this.ProjectDetail.Contacts.length > 0) {
            this.Contacts = this.ProjectDetail.Contacts
          }
          console.log(this.BusinessType)
          if (this.BusinessType > 0 && this.BusinessType < 6) {
            this.getRecruit(Id)
          }
          this.getFollowList(Id)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    getRecruit (Id) {
      let obj1 = {
        ProjectId: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectRecruit(qs.stringify(obj1)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectRecruitList = response.Data
            for (let i = 0; i < this.ProjectRecruitList.length; i++) {
              // if (this.ProjectRecruitList[i].TryTime) {
              //   this.ProjectRecruitList[i].TryTime = this.ProjectRecruitList[i].TryTime.replace(',', ' —— ')
              // }

              if (this.ProjectRecruitList[i].AreaId) {
                let obj = {
                  AreaId: this.ProjectRecruitList[i].AreaId,
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                GetAreaList(qs.stringify(obj)).then(response => {
                  if (response.IsSuccess) {
                    let select = response.Data.filter(v => {
                      return v.isselect
                    })
                    if (select.find(v => v.Level == 1) !== undefined) {
                      this.$set(this.ProjectRecruitList[i], 'provinceName', select.find(v => v.Level == 1).Name)
                    }
                    if (select.find(v => v.Level == 2) !== undefined) {
                      this.$set(this.ProjectRecruitList[i], 'cityName', select.find(v => v.Level == 2).Name)
                    }
                    if (select.find(v => v.Level == 3) !== undefined) {
                      this.$set(this.ProjectRecruitList[i], 'AreaIdName', select.find(v => v.Level == 3).Name)
                    } else {
                      this.ProjectRecruitList[i].AreaIdName = ''
                    }
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                })
              }
            }
          }
        }
      })
    },
    getFollowList (Id) {
      let obj = {
        ProjectId: Id,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectFollowList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.communicationList = response.Data
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 预览
    preview (data) {
      if (data.Url) {
        const ext = data.Url.slice(data.Url.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = data.Url
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + data.Url
        } else {
          this.isImg = 1
          this.previewFileUrl = data.Url
        }
        this.iframeShow = true
      } else {
        this.iframeShow = false
        this.$message({
          message: '该员工合同没有上传附件',
          type: 'error'
        })
      }
    },
    //下载文件
    downloadFile (data) {
      if (data.Url) {
        window.open(data.Url)
      } else {
        this.$message({
          message: '该合同没有上传合同文件',
          type: 'error'
        })
      }
    },
    // 移入文件显示操作
    fileShow (index) {
      this.AttachList[index].optionShow = true
    },
    // 移出文件隐藏操作
    filenoShow (index) {
      this.AttachList[index].optionShow = false
    },
    closeFileShow (val) {
      this.iframeShow = val
    }
  }
}
</script>
<style lang="scss" scoped>
.babel {
  margin: 20px;
}
.title2-name {
  font-size: $f16;
  color: $erp333;
  position: relative;
  padding-left: 12px;
  line-height: 16px;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 24px;
}
/deep/ .upload {
  position: relative;
  height: 120px;
  float: left;
  margin-right: 24px;
  margin-bottom: 20px;
  img {
    position: absolute;
    left: 0;
    top: 0;
  }
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 120px;
    opacity: 0;
    cursor: pointer;
    &::-webkit-file-upload-button {
      height: 0;
    }
  }
  .files {
    width: 160px;
    height: 120px;
    background: #f0f4fa;
    border-radius: 8px;
    text-align: center;
    position: relative;
    float: left;
    .filestype {
      display: inline-block;
      width: 56px;
      height: 32px;
      background: #1588f8;
      font-size: 14px;
      color: #fff;
      border-radius: 8px;
      text-align: center;
      line-height: 32px;
      position: absolute;
      left: 0;
      top: 0;
    }
    p {
      width: 110px;
      position: absolute;
      top: 38%;
      left: 50%;
      font-size: 14px;
      line-height: 18px;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
      text-align: center;
    }
    .option-button {
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #909198;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      a {
        width: 50%;
        display: inline-block;
        line-height: 30px;
        text-align: center;
        height: 30px;
        font-size: 14px;
        color: #fff;
        vertical-align: top;
        .svg-a {
          margin-right: 10px;
          font-size: 14px;
        }
        &:hover {
          color: #1588f8;
        }
      }
    }
  }
}
/deep/ .babel-File {
  margin-right: 24px;
  padding-bottom: 16px;
  border-bottom: none;
}
/deep/ .graytable {
  .el-table__header-wrapper {
    border-radius: 8px 8px 0 0 !important;
    .has-gutter {
      th {
        background-color: $tableHeader !important;
        color: $erp333 !important;
      }
    }
  }
  .el-table__body-wrapper {
    border-radius: 0 0 8px 8px !important;
    border-left: 1px solid $tableHeader !important;
    border-right: 1px solid $tableHeader !important;
    border-bottom: 1px solid $tableHeader !important;
  }

  // 表格取消线条
  td {
    border-bottom: 1px solid $tableHeader !important;
    border-right: 1px solid $tableHeader !important;
  }
}
</style>