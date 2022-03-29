<!-- 权限页面 -->
<template>
  <div class="jurisdiction-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <!-- v2.0 -->
    <div class="tab3 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.index}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.name}}</div>
    </div>
    <!-- 功能权限 -->
    <div v-show="tabidx == 0" class="tab-box">
      <vxe-table ref="multipleTable" row-id="MenuId" v-loading="tableloading" class="vxeTable" :checkbox-config="{checkRowKeys: tableCheckRowKeys}" fit auto-resize border=none highlight-hover-row :tree-config="treeConfig" :edit-config="{trigger: 'click', mode: 'row', showStatus: true}" :data.sync="tableData" @select-change="selectChangeEvent" @select-all="selectAllEvent">
        <vxe-table-column width="80px" type="checkbox" title="" />
        <vxe-table-column tree-node field="MenuName" width="240px" title="页面权限" />
        <vxe-table-column align="left" title="操作权限">
          <template v-slot="{ row }">
            <el-checkbox v-for="(item, index) in row.Operations" :key="index" v-model="item.Status" @change="checkBtn(row, item, item.Status)">{{item.OperationName}}</el-checkbox>
          </template>
        </vxe-table-column>
        <vxe-table-column field="size" align="center" width="180px" title="操作">
          <template v-slot="{ row }">
            <span class="cursor-pointer enable" v-show="row.Enable == 0" @click="stateChange(row)">启用数据权限</span>
            <span class="cursor-pointer disable" v-show="row.Enable == 1" @click="stateChange(row)">关闭数据权限</span>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 数据权限 -->
    <div class="tab-box" v-show="tabidx == 1">
      <el-tree class="DataTree" :data="treeData" show-checkbox node-key="OrgId" :default-checked-keys="treeDefaultKeys" :props="defaultProps" @check="treeChange">
      </el-tree>
      <!-- 分组 -->
      <div class="grouping clearfix">
        <div class="select-box">
          <span class="group-name">选择权限分组</span>
          <el-select v-model="groups" multiple placeholder="请选择" class="select-input">
            <el-option v-for="item in groupData" :key="item.GroupId" :label="item.GroupName" :value="item.GroupId">
            </el-option>
          </el-select>
        </div>
        <!-- <div class="add-group" @click="Opengrouping">
          <i class="el-icon-circle-plus-outline add"></i>
          <span>新增权限分组</span>
        </div> -->
      </div>
    </div>
    <div class="bottom">
      <el-button class="erpbtn" @click="submit">保存</el-button>
    </div>
    <updataList :showAddrole="showAddrole" @closeGroup="closeGroup" :tempData="tempData" @groupSave="groupSave" :title="RoleTile"></updataList>
    <!-- <div class="jurisdiction-content">

      <div class="information-box">
        <div class="title">数据权限</div>
        <div v-loading="treeloading" class="information-content">
          <el-scrollbar wrap-class="list" wrap-style="color: red;" view-style="font-weight: bold;" view-class="view-box" :native="false">
            <el-tree :data="treeList" ref="tree" :props="defaultProps" :default-checked-keys="pitchkeys" accordion show-checkbox node-key="OrgId" highlight-current @check="checkChange" @check-change="changetrue" />
          </el-scrollbar>
        </div>
      </div>
      <div class="page-box" v-if="pageList.length > 0 ">
        <div class="title">页面权限</div>
        <div class="page-content clearfix">
          <div class="page-left">
            <el-checkbox v-if="isAdmin != '0'" v-model="isAllChecked" style="margin-bottom:8px" @change="chooseAllCheck">全选</el-checkbox>
            <ul class="page-tabs">
              <li v-for="(pageitem, pageindex) in pageList" :key="pageindex" class="page-item">
                <div class="page-item-box" :title="pageitem.OrgName" @click="clickorg(pageitem)">
                  <span class="span-icon" v-show="pageitem.isActive"></span>
                  <i class="el-icon-check" v-show="pageitem.isActive" />
                  <span>{{ pageitem.OrgName }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="page-right">
            <div class="buttons">
              <a v-for="(item,index) in buttonList" :key="index">
                <span class="span-icon" v-show="item.btnShow"></span>
                <i class="el-icon-check" v-show="item.btnShow" />
                {{item.name}}
                <span class="details-button" @click="buttonsClick(item)">详细配置</span>
              </a>
            </div>
          </div>
        </div> -->
    <!-- <div v-loading="pageloading" class="page-content">
          <el-tabs tab-position="left" class="Mytab-pane">
            <el-tab-pane :label="pageitem.OrgName" v-for="(pageitem, pageindex) in pageList" :key="pageindex" :title="pageitem.OrgName">
              <div class="buttons">
                <a v-for="(item,index) in buttonList" :key="index">
                  <span class="span-icon" v-show="item.btnShow"></span>
                  <i class="el-icon-check" v-show="item.btnShow" />
                  {{item.name}}
                  <span class="details-button" @click="buttonsClick(pageitem,item,index)">详细配置</span>
                </a>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div> -->
    <!-- </div>
    </div> -->
    <!-- <div class="save-button">
      <el-button size="mini" round @click="save">关闭</el-button>
    </div> -->
    <!-- <permissionsBox :permissionsShow="permissionsShow" :OrgId="OrgId" :tempData="tempData" :permissionsTitle="permissionsTitle" @saverole="saverole" @closePermission="closePermission"></permissionsBox> -->
  </div>
</template>

<script>
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import permissionsBox from "@/components/publicComponents/permissions-box.vue";
import {
  GetSysRolePermissionOrg,
  GetSysRolePermission,
  SetRolePermission,
  GetSysRoleMenuPermission,
  GetSysRoleDataPermission,
  SetRoleMenu,
  SetRoleData,
  AddSysGroup
} from "@/api/SystemSetting.js";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  getCookie,
  group
} from "@/utils/CustomValidation.js";
import updataList from "./UpdataList";
import qs from "qs";
export default {
  components: {
    BreadCrumb,
    updataList
    // permissionsBox
  },
  data() {
    return {
      // 数据权限
      treeList: [],
      treeloading: false,
      pageloading: false,
      urlList: [
        {
          name: "角色管理",
          router: "/SystemSetting/RoleManagement"
        },
        {
          name: "配置权限",
          router: ""
        }
      ],
      pageList: [],
      buttonList: [
        {
          Id: "1",
          name: "广西锦绣ERP",
          btnShow: true
        }
      ],
      Id: "", // 角色Id
      permissionsShow: false,
      permissionsTitle: "",
      defaultProps: {
        children: "Childs",
        label: "OrgName"
      },
      istrue: false,
      oldcheckedKey: [],
      tempData: [],
      OrgId: "",
      showAddrole: false,
      RoleTile: "新建权限分组",
      pitchkeys: [], // 默认选中
      isAdmin: 0, // 是否是管理员 1=>是管理员
      isAllChecked: false, // 是否全选

      // v2.0
      tableloading: false, // 表格加载动画
      tableData: [], // 菜单权限列表
      treeConfig: {
        // rowField:'MenuId',
        parentField: "ParentId",
        children: "Childs"
      },
      tableCheckRowKeys: [], // 默认选中复选框
      treeDefaultKeys: [], // 树状图默认选中
      treeData: [], // 树状图数据
      groupData: [], // 权限分组列表
      groups: [], // 默认分组数据
      tabidx: 0, // 分页tab
      tablist: [
        {
          index: 0,
          name: "功能权限"
        },
        {
          index: 1,
          name: "数据权限"
        }
      ]
    };
  },
  created() {
    this.Id = this.$route.query.Id;
    console.log(this.$route);
    // this.getCompanyOrgList()
    // 获取是否是管理员
    this.isAdmin = getCookie("admin");

    this.getSysRoleMenuPermission();
    this.getSysRoleDataPermission();
  },
  methods: {
    // v2.0 获取菜单列表
    getSysRoleMenuPermission() {
      let obj = {
        RoleId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      this.tableloading = true;
      GetSysRoleMenuPermission(qs.stringify(obj)).then(response => {
        this.tableloading = false;
        if (response.IsSuccess) {
          this.tableData = response.Data;
          this.tableCheckRowKeys = [];
          this.loopThrough(response.Data);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    // 循环查找
    loopThrough(array) {
      if (array && array.length) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].Childs && array[i].Childs.length) {
            for (let j = 0; j < array[i].Childs.length; j++) {
              if (array[i].Childs[j].Status) {
                this.tableCheckRowKeys.push(array[i].Childs[j].MenuId);
              }
            }
          }
        }
      }
      //   this.$refs.multipleTable.setSelection(row, flag)
      //   if (array && array.length) {
      //     for (let i = 0; i < array.length; i++) {
      //       for (let j = 0; j < array[i].Childs.length; j++) {
      //         let flag = true
      //         for (let k = 0; k < array[i].Childs[j].Operations.length; k++) {
      //           if (!array[i].Childs[j].Operations[k].Status) {
      //             flag = false
      //             break
      //           }
      //           array[i].Childs[j].Status = flag
      //           this.$refs.multipleTable.setSelection(array[i].Childs[j], flag)
      //         }
      //       }
      //     }
      //   }
    },
    // 获取数据权限
    getSysRoleDataPermission() {
      let obj = {
        RoleId: this.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetSysRoleDataPermission(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          // 数据权限
          this.treeData = response.Data.Orgs;
          // 循环查找里面Status为true的值并添加到treeDefaultKeys默认选中
          this.treeDefaultKeys = [];
          this.loopThroughTree(response.Data.Orgs);
          // 自定义分组
          this.groups = [];
          this.groupData = response.Data.Groups;
          for (let i = 0; i < this.groupData.length; i++) {
            if (this.groupData[i].Status) {
              this.groups.push(this.groupData[i].GroupId);
            }
          }
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    loopThroughTree(array) {
      if (array && array.length) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].Status) {
            this.treeDefaultKeys.push(array[i].OrgId);
          }
          if (array[i].Childs && array[i].Childs.length) {
            this.loopThroughTree(array[i].Childs);
          }
        }
      }
    },
    // 表格头部全选
    selectAllEvent({ selection, checked }) {
      if (checked) {
        for (let i = 0; i < selection.length; i++) {
          for (let j = 0; j < selection[i].Operations.length; j++) {
            selection[i].Operations[j].Status = checked;
          }
        }
      } else {
        // 勾选所有子集和子集的操作权限
        function forcheck(arr) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].Operations && arr[i].Operations.length) {
              for (let j = 0; j < arr[i].Operations.length; j++) {
                arr[i].Operations[j].Status = false;
              }
            }
            if (arr[i].Childs && arr[i].Childs.length) {
              forcheck(arr[i].Childs);
            }
          }
        }
        forcheck(this.tableData);
      }

      // if (checked) {
      //   this.checked = true
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     this.setTablelist.push(this.tableData[i])
      //   }
      // } else {
      //   this.checked = false
      //   this.setTablelist = []
      // }
    },
    // 复选框选择
    selectChangeEvent(data) {
      console.log(data);
      // 勾选所有子集和子集的操作权限
      function forcheck(obj) {
        // 勾选当前对象的操作
        if (obj.Operations && obj.Operations.length) {
          for (let i = 0; i < obj.Operations.length; i++) {
            obj.Operations[i].Status = data.checked;
          }
        }
        // 向下查找子集
        if (obj.Childs && obj.Childs.length) {
          for (let i = 0; i < obj.Childs.length; i++) {
            forcheck(obj.Childs[i]);
          }
        }
      }
      forcheck(data.row);
    },

    // 变更数据权限状态
    stateChange(data) {
      // data.Enable = !data.Enable
      //   0:关闭 1：启用
      let state = data.Enable == 0 ? 1 : 0;
      data.Enable = state;
      // 把子集的状态都改为一致
      if (data.Childs && data.Childs.length) {
        for (let i = 0; i < data.Childs.length; i++) {
          data.Childs[i].Enable = state;
        }
      }
      // 勾选父节点
      let obj = this.findFather(this.tableData, data.MenuId);
      // 父节点的状态根据所有子节点状态变更有关

      if (obj.Childs) {
        //every 一假即假   //some一真即真
        let bool = obj.Childs.some(v => {
          return v.Enable == 1;
        });
        obj.Enable = bool ? 1 : 0;
      }
    },
    // 寻找父节点
    findFather(array, id) {
      let fatherData = {};
      function forFn(arr, id, data = {}) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].MenuId == id) {
            fatherData = data;
          } else {
            forFn(arr[i].Childs, id, arr[i]);
          }
        }
      }
      forFn(array, id);
      return fatherData;
    },
    // 操作按钮事件
    checkBtn(row, data, isbol) {
      console.log(row, data, isbol);
      if (isbol) {
        row.Operations.forEach(e => {
          if (e.OperationId == data.OperationId) {
            // console.log(e);
            this.$set(e, "Status", true);
          }
        });
      } else {
        row.Operations.forEach(e => {
          if (e.OperationId == data.OperationId) {
            this.$set(e, "Status", false);
            // console.log(e);
          }
        });
      }
      // let fatherData = this.findFather(this.tableData, data.MenuId)
      // console.log(fatherData);
    },
    // 树状图节点选中
    treeChange(item, data) {
      console.log(item, data);
      // // 遍历选中的所有节点
      // for (let i = 0; i < data.checkedNodes.length; i++) {
      //   data.checkedNodes[i].Status = true
      // }
      this.treeDefaultKeys = data.checkedKeys;
      console.log(JSON.parse(JSON.stringify(this.treeData)));
    },
    // 切换tab栏
    choosetab(data) {
      this.tabidx = data.index;
    },
    // 保存
    submit() {
      // 处理功能权限数据
      let Menus = [];
      let newmap = new Map();
      let index = 0; // Menus的下标
      function forSearch(arr) {
        if (arr && arr.length) {
          // 循环菜单
          for (let i = 0; i < arr.length; i++) {
            // 定义一个空对象
            let obj = {};
            // 判断是否有菜单操作
            if (arr[i].Operations && arr[i].Operations.length) {
              let arrJ = arr[i].Operations;
              for (let j = 0; j < arrJ.length; j++) {
                // 只添加Status为true的对象
                if (arrJ[j].Status) {
                  // 如果映射表里面有这个MenuId, 就直接往对象的OperationIds添加操作id
                  if (newmap.has(arr[i].MenuId)) {
                    obj.OperationIds.push(arrJ[j].OperationId);
                  } else {
                    // 如果是第一次就先给对象加MenuId,并将OperationIds赋值为空数组
                    newmap.set(arr[i].MenuId, index);
                    obj.MenuId = arr[i].MenuId;
                    obj.Enable = arr[i].Enable;
                    obj.OperationIds = [];
                    obj.OperationIds.push(arrJ[j].OperationId);
                    // 索引自增
                    // index++
                  }
                }
              }
            }
            // 判断是否有MenuId, 如果有就添加
            if (obj.MenuId) {
              Menus.push(obj);
            }
            // 判断是否有子集
            if (arr[i].Childs && arr[i].Childs.length) {
              forSearch(arr[i].Childs);
            }
          }
        }
      }
      forSearch(this.tableData);
      console.log(this.tableData);
      let menuObj = {
        RoleId: this.Id,
        Menus: Menus
      };
      // 数据权限数据
      let DataObj = {
        RoleId: this.Id,
        OrgIds: this.treeDefaultKeys,
        GroupIds: this.groups
      };
      console.log(Menus);
      showLoading();
      new Promise((resolve, reject) => {
        this.setRoleMenu(menuObj, resolve, reject);
      })
        .then(value => {
          return new Promise((resolve, reject) => {
            this.setRoleData(DataObj, resolve, reject);
          });
        })
        .then(value => {
          hideLoading();
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.$router.go(-1);
        })
        .catch(err => {
          hideLoading();
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    // 配置菜单权限
    setRoleMenu(obj, resolve, reject) {
      obj.menuid = MenuIdDate();
      obj.operationcode = "1";
      SetRoleMenu(qs.stringify(obj)).then(res => {
        if (res.IsSuccess) {
          resolve();
        } else {
          reject(res.MessageContent);
        }
      });
    },
    // 配置数据权限
    setRoleData(obj, resolve, reject) {
      obj.menuid = MenuIdDate();
      obj.operationcode = "1";
      SetRoleData(qs.stringify(obj)).then(res => {
        if (res.IsSuccess) {
          resolve();
        } else {
          reject(res.MessageContent);
        }
      });
    },
    // // 默认选中, 循环查找子节点
    // defaultkeys(arr) {
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].Childs && arr[i].Childs.length) {
    //       this.defaultkeys(arr[i].Childs)
    //     } else if (arr[i].Status) {
    //       this.pitchkeys.push(arr[i].OrgId + '')
    //       this.oldcheckedKey.push(arr[i].OrgId)
    //       this.$set(arr[i], 'isActive', false)
    //       this.pageList.push(arr[i])
    //     }
    //   }
    // },

    // //获取组织结构数据
    // getCompanyOrgList() {
    //   this.treeloading = true
    //   let obj = {
    //     RoleId: this.Id,
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetSysRolePermissionOrg(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       this.treeList = response.Data
    //       this.defaultkeys(this.treeList)
    //       this.treeloading = false
    //       // 默认选中第一个组织
    //       console.log(this.pageList);
    //       if (this.pageList && this.pageList.length) {
    //         this.pageList[0].isActive = true
    //       }
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: response.MessageContent
    //       })
    //     }
    //   })
    // },
    // // 循环查找到选中的节点
    // defaultkeys(arr) {
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].Childs && arr[i].Childs.length) {
    //       this.defaultkeys(arr[i].Childs)
    //     }
    //     if (arr[i].Status) {
    //       this.$set(arr[i], 'isActive', false)
    //       this.pitchkeys.push(arr[i].OrgId + '')
    //       this.pageList.push(arr[i])
    //     }
    //   }
    // },
    // 节点是否选中
    changetrue(item, node, self) {
      // console.log(item, node, self)
      this.istrue = node;
    },
    // 全选
    chooseAllCheck(data) {
      for (let i = 0; i < this.pageList.length; i++) {
        this.$set(this.pageList[i], "isActive", data);
      }
    },
    checkChange(item, node) {
      console.log(item, node);
      for (let i = 0; i < node.checkedNodes.length; i++) {
        this.$set(node.checkedNodes[i], "isActive", false);
      }
      this.pageList = node.checkedNodes;
      // if (this.istrue) {
      //   var arry = node.checkedKeys.filter(v => {
      //     return !this.oldcheckedKey.includes(v)
      //   })
      //   node.checkedNodes.filter(v => {
      //     if (arry.includes(v.OrgId) && (v.Childs === null || v.Childs.length == 0)) {
      //       // const obj = {
      //       //   RoleId: this.Id,
      //       //   OrgId: v.OrgId,
      //       //   MenuId: MenuIdDate(),
      //       //   OperationCode: '1'
      //       // }
      //       this.pageloading = true
      //       // GetCompanyRoleRightsData(qs.stringify(obj)).then(response => {
      //       //   if (response.IsSuccess) {
      //       this.$set(v, 'isActive', false)
      //       this.pageList.push(v)

      //       //   } else {
      //       //     this.$message({
      //       //       type: 'error',
      //       //       message: response.MessageContent
      //       //     })
      //       //   }
      //       this.pageloading = false
      //       // })
      //     }
      //     // const data = {
      //     //   user: v
      //     // }
      //     // this.pageList.push(data)
      //   })
      // } else {
      //   var arry = this.oldcheckedKey.filter(v => {
      //     return !node.checkedKeys.includes(v)
      //   })
      //   // 要删除的数组
      //   const delarry = []
      //   for (let i = 0; i < this.pageList.length; i++) {
      //     if (arry.includes(this.pageList[i].OrgId)) {
      //       delarry.push(this.pageList[i])
      //     }
      //   }
      //   var newarry = this.pageList.filter(v => {
      //     return !delarry.includes(v)
      //   })
      //   this.pageList = newarry
      // }
      // this.oldcheckedKey = node.checkedKeys
    },
    // buttonsClick(pageitem, item, index) {
    //   const obj = {
    //     RoleId: this.Id,
    //     OrgId: pageitem.OrgId,
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetSysRolePermission(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       // console.log(response)
    //       this.tempData = response.Data
    //       this.OrgId = pageitem.OrgId
    //       this.permissionsTitle = item.name
    //       this.permissionsShow = true
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: response.MessageContent
    //       })
    //     }
    //   })
    // },
    buttonsClick(item) {
      // 判断选中了几个组织
      let chooselist = [];
      for (let i = 0; i < this.pageList.length; i++) {
        if (this.pageList[i].isActive) {
          chooselist.push(this.pageList[i]);
        }
      }
      if (chooselist.length) {
        // 选择了一个就查询详情, 否则不进行查询
        let chooseOrgId = "";
        if (chooselist.length === 1) {
          chooseOrgId = chooselist[0].OrgId;
        } else {
          chooseOrgId = "";
        }
        const obj = {
          RoleId: this.Id,
          OrgId: chooseOrgId,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        showLoading();
        GetSysRolePermission(qs.stringify(obj)).then(response => {
          hideLoading();
          if (response.IsSuccess) {
            this.tempData = response.Data;
            this.OrgId = chooseOrgId;
            this.permissionsTitle = item.name;
            // 判断是否有数据, 选择是否打开弹框
            if (response.Data && response.Data.length) {
              this.permissionsShow = true;
            } else {
              this.$message({
                type: "warning",
                message: "你无权限操作该数据, 请联系管理员!"
              });
            }
          } else {
            this.$message({
              type: "error",
              message: response.MessageContent
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择部门"
        });
      }
      console.log(chooselist);
    },
    closePermission(value) {
      this.permissionsShow = value;
    },
    saverole(data) {
      console.log(data);
      let array = [];
      let orgids = [];
      for (let i = 0; i < this.pageList.length; i++) {
        if (this.pageList[i].isActive) {
          orgids.push(this.pageList[i].OrgId);
          array.push({
            MenuOperationIds: data.join(",") || "",
            OrgId: this.pageList[i].OrgId
          });
        }
      }
      // 拆分成小数组, 循环调用
      let newArray = group(array, 10);
      let newOrgid = group(orgids, 10);
      console.log(newArray, newOrgid);
      // 创建一个promise数组
      let promiseArray = [];
      for (let i = 0; i < newArray.length; i++) {
        // 异步调用接口并将结果插入到promise数组中
        promiseArray.push(
          new Promise((resolve, reject) => {
            let obj = {
              menuid: MenuIdDate(),
              operationcode: "1",
              RoleId: this.Id,
              OrgId: newOrgid[i].join(","),
              list: newArray[i]
            };
            console.log(JSON.stringify(obj));
            SetRolePermission(qs.stringify(obj)).then(response => {
              if (response.IsSuccess) {
                resolve();
              } else {
                reject(response.MessageContent);
              }
            });
          })
        );
      }
      showLoading();
      Promise.all(promiseArray)
        .then(value => {
          this.permissionsShow = false;
          this.$message({
            type: "success",
            message: "保存权限成功!"
          });
          hideLoading();
        })
        .catch(reject => {
          this.permissionsShow = false;
          this.$message({
            type: "error",
            message: reject
          });
          hideLoading();
        });
      // 一起保存
      // let obj = {
      //   menuid: MenuIdDate(),
      //   operationcode: '1',
      //   RoleId: this.Id,
      //   OrgId: orgids.join(','),
      //   list: array
      // }
      // console.log(JSON.stringify(obj));
      // showLoading()
      // SetRolePermission(qs.stringify(obj)).then(response => {
      //   hideLoading()
      //   if (response.IsSuccess) {
      //     this.$message({
      //       type: 'success',
      //       message: '保存权限成功!'
      //     })
      //     this.permissionsShow = false
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: response.MessageContent
      //     })
      //   }
      // })

      // 因数据量太大,实行分段保存, 每20个调一次接口
    },
    // 页面权限多选
    clickorg(item) {
      console.log(item);
      // 判断是否是管理员
      console.log(this.isAdmin);
      // this.isAdmin == true 解决判断 字符串'0'时问题
      if (this.isAdmin == true) {
        item.isActive = !item.isActive;
        this.isAllChecked = this.pageList.every(v => {
          console.log(v);
          return v.isActive == true;
        });
      } else {
        console.log(111);
        this.pageList.forEach(element => {
          element.isActive = false;
        });
        item.isActive = true;
      }
    },
    //打开新增分组
    Opengrouping() {
      this.RoleTile = "添加权限分组";
      this.showAddrole = true;
    },
    // 保存添加分组
    groupSave(data) {
      data.menuid = MenuIdDate();
      data.operationcode = "1";
      showLoading();
      AddSysGroup(qs.stringify(data)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          this.$message({
            type: "success",
            message: "添加权限分组成功!"
          });
          this.showAddrole = false;
          this.getSysRoleDataPermission();
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    // 关闭添加权限窗口
    closeGroup(value) {
      this.showAddrole = value;
    }
  }
};
</script>

<style scoped lang="scss">
.jurisdiction-container {
  margin: 0 24px;

  // v2.0
  // tab页签
  .tab3 {
    padding-top: 32px;
    padding-left: 30px;
    background: #fff;
    margin-left: 0px;
    border-radius: 8px 0 0 0;
    // display: inline;

    .tab-name {
      float: left;
      min-width: 80px;
      padding: 8px 15px;
      text-align: center;
      min-width: 80px;
      font-size: $f14;
      color: $erp666;
      background-color: $erpe3e3;
      border-radius: 8px;
      cursor: pointer;

      &.active {
        color: #fff;
        background-color: $erpcolor;
      }

      margin-right: 8px;
    }

    .erpbtn {
      float: right;
      margin-right: 20px;
    }
  }
  // 表格
  .tab-box {
    background-color: #fff;
    padding: 30px;
    .enable {
      color: $erpcolor;
    }
    .disable {
      color: $erpred;
    }
  }
  // 分组
  .grouping {
    margin-top: 20px;
    .select-box {
      float: left;
      .group-name {
        font-size: 24px;
        color: $erp333;
        vertical-align: middle;
      }
      .el-select {
        margin-left: 10px;
      }
    }
    .add-group {
      float: left;
      font-size: 24px;
      color: $erpcolor;
      margin-left: 46px;
      cursor: pointer;
      .add {
        margin-right: 10px;
      }
    }
  }
  .DataTree {
    padding: 20px;
  }
  .bottom {
    margin-top: 20px;
    text-align: center;
  }
  .bread {
    // margin-left: 24px;
    margin-bottom: 24px;
  }
  // background-color: #fff;
  .jurisdiction-content {
    display: flex;
    margin-top: 50px;
    padding-bottom: 23px;
    .title {
      font-size: 16px;
      color: #333;
      font-weight: 700;
    }
    .information-box {
      min-width: 360px;
      .information-content {
        width: 100%;
        background: #fff;
        margin-top: 23px;
        border-radius: 8px;
        .el-scrollbar /deep/ {
          margin: 10px;
          .list {
            max-height: 600px;
            .el-checkbox {
              margin-right: 4px;
            }
          }
        }
      }
    }
    .page-box {
      width: calc(100% - 480px);
      margin-left: 40px;
      min-width: 560px;
      .page-content /deep/ {
        min-height: 200px;
        background: #fff;
        margin-top: 23px;
        border-radius: 8px;
        padding: 24px;
        .Mytab-pane {
          padding: 24px;
          .el-tabs__item {
            width: 184px;
            height: 48px;
            text-align: center;
            font-size: 14px;
            color: #999999;
            background: #f0f4fa;
            line-height: 48px;
            border-radius: 8px;
            margin-bottom: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .is-active {
            color: #333;
            background: #f0f4fa;
          }
          .buttons {
            background: #f0f4fa;
            padding: 25px;
            border-radius: 8px;
            a {
              width: 44%;
              height: 96px;
              display: inline-block;
              line-height: 96px;
              margin: 20px;
              min-width: 200px;
              border-radius: 8px;
              background: #fff;
              text-align: center;
              overflow: hidden;
              position: relative;
              .span-icon {
                background: #1588f8;
                width: 30px;
                height: 50px;
                display: block;
                transform: rotate(45deg);
                position: absolute;
                left: -14px;
                top: -24px;
              }
              .el-icon-check {
                position: absolute;
                left: 0;
                top: 1px;
                font-size: 14px;
                font-weight: 600;
                color: #fff;
              }
              .details-button {
                position: absolute;
                right: 5px;
                bottom: 5px;
                background: #f5f5f5;
                border: 1px solid #f5f5f5;
                color: #a3b1cc;
                display: inline-block;
                width: 64px;
                height: 24px;
                font-size: 12px;
                border-radius: 4px;
                line-height: 24px;
                cursor: pointer;
                &:hover {
                  border: 1px solid #1588f8;
                  color: #1588f8;
                }
              }
            }
          }
        }
        // 页面权限样式
        .page-left {
          float: left;
          margin-right: 40px;
          .page-item-box {
            width: 148px;
            height: 48px;
            line-height: 48px;
            background-color: #f0f4fa;
            border-radius: 8px;
            text-align: center;
            color: #999;
            font-size: 14px;
            margin-bottom: 8px;
            position: relative;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .span-icon {
              background: #1588f8;
              width: 30px;
              height: 50px;
              display: block;
              transform: rotate(45deg);
              position: absolute;
              left: -14px;
              top: -24px;
            }
            .el-icon-check {
              position: absolute;
              left: 0;
              top: 1px;
              font-size: 14px;
              font-weight: 600;
              color: #fff;
            }
          }
        }
        .page-right {
          overflow: hidden;
          position: relative;
          .buttons {
            background: #f0f4fa;
            padding: 25px;
            border-radius: 8px;
            a {
              width: 44%;
              height: 96px;
              display: inline-block;
              line-height: 96px;
              margin: 20px;
              min-width: 200px;
              border-radius: 8px;
              background: #fff;
              text-align: center;
              overflow: hidden;
              position: relative;
              .span-icon {
                background: #1588f8;
                width: 30px;
                height: 50px;
                display: block;
                transform: rotate(45deg);
                position: absolute;
                left: -14px;
                top: -24px;
              }
              .el-icon-check {
                position: absolute;
                left: 0;
                top: 1px;
                font-size: 14px;
                font-weight: 600;
                color: #fff;
              }
              .details-button {
                position: absolute;
                right: 5px;
                bottom: 5px;
                background: #f5f5f5;
                border: 1px solid #f5f5f5;
                color: #a3b1cc;
                display: inline-block;
                width: 64px;
                height: 24px;
                font-size: 12px;
                border-radius: 4px;
                line-height: 24px;
                cursor: pointer;
                &:hover {
                  border: 1px solid #1588f8;
                  color: #1588f8;
                }
              }
            }
          }
        }
      }
    }
  }
  .save-button /deep/ {
    height: 78px;
    text-align: center;
    line-height: 78px;
    margin: 0 24px;
    border-top: 1px solid #a3b1cc;
    > button {
      padding: 0;
      width: 90px;
      height: 30px;
      color: #638df8;
      border: 1px solid #638df8;
    }
  }
}
/deep/ .el-tabs--left .el-tabs__active-bar.is-left {
  display: none;
}
/deep/ .el-tabs__nav-wrap.is-left::after {
  display: none;
}
/deep/ .el-tabs--left .el-tabs__header.is-left {
  margin-right: 40px;
}
</style>