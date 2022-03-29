//系统各项权限弹窗
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="permissionsTitle" class="dialog-box permiss-box" append-to-body :visible.sync="showpermissions" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-collapse v-model="smallNames" @change="smallhandleChange" class="smallCollapse" accordion>
        <el-collapse-item :name="index" v-for="(itemu, index) in palitList" :key="index" class="complex-check-box">
          <template slot="title">
            <el-checkbox v-model="itemu.Status" @change="Achoose(itemu, itemu.Status)">{{ itemu.MenuName }}</el-checkbox>
          </template>
          <el-checkbox v-for="(talent, tindex) in itemu.Operations" :key="tindex" v-model="talent.Status" :indeterminate="talent.indeterminate">{{ talent.OperationName }}</el-checkbox>
          <div class="small-check-box" v-if="itemu.Childs.length > 0">
            <div v-for="(smallitem, indexT) in itemu.Childs" :key="indexT">
              <div style="display:block;height:30px;">
                <el-checkbox v-model="smallitem.Status" @change="ACchoose(itemu,smallitem, smallitem.Status)">{{ smallitem.MenuName }}</el-checkbox>
              </div>
              <div style="margin-left:24px;">
                <el-checkbox v-for="(items, indexs) in smallitem.Operations" :key="indexs" v-model="items.Status" @change="COchoose(itemu,smallitem, items.Status)" style="line-height:30px;">{{items.OperationName}}</el-checkbox>
              </div>
              <!-- <checkboxs :datas="smallitem.Childs" :item="item" :itemall="palitList[index]" @selectAll="selectAll" @selectAllFuck="selectAllFuck" /> -->
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { SetRolePermission } from '@/api/SystemSetting.js'
import checkboxs from './checkboxs'
import { MenuIdDate, showLoading, hideLoading, copy } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'permissionsBox',
  components: {
    checkboxs
  },
  props: ['permissionsShow', 'permissionsTitle', 'tempData', 'OrgId'],
  data () {
    return {
      smallNames: [],
      showpermissions: false,
      palitList: [{
        LinkUrl: "Office",
        MenuId: 38,
        MenuName: "办公管理",
        Operations: [],
        ParentId: 0,
        Status: true,
        Childs: []
      }],
      sings: true,
      MenuOperationIds: [],
      OrgIds: '',
      Id: ''
    }
  },
  watch: {
    permissionsShow (newval, oldval) {
      this.showpermissions = newval
      this.OrgIds = this.OrgId
      this.palitList = this.tempData
    }
  },
  created () {
    this.Id = this.$route.query.Id
  },
  methods: {
    smallhandleChange () {

    },
    findoperate (array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].Childs.length) {
          this.findoperate(array[i].Childs)
        } else {
          for (let j = 0; j < array[i].Operations.length; j++) {
            if (array[i].Operations[j].Status) {
              this.MenuOperationIds.push(array[i].Operations[j].Id)
            }
          }
        }
      }
    },
    dialogtrue () {
      // showLoading()
      this.MenuOperationIds = []
      this.findoperate(this.palitList)
      this.$emit('saverole', this.MenuOperationIds)
      // const obj = {
      //   RoleId: this.Id,
      //   OrgId: this.OrgIds,
      //   list: [{
      //     MenuOperationIds: this.MenuOperationIds.join(',') || '',
      //     OrgId: this.OrgIds
      //   }],
      //   menuid: MenuIdDate(),
      //   operationcode: '1'
      // }
      // SetRolePermission(qs.stringify(obj)).then(response => {
      //   hideLoading()
      //   if (response.IsSuccess) {
      //     this.$message({
      //       type: 'success',
      //       message: '保存权限成功!'
      //     })
      //     this.close()
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: response.MessageContent
      //     })
      //   }
      // })
    },
    status (arr, val) {
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].Status = val
        }
      }
    },
    // 第一级数据全选
    Achoose (e, val) {
      if (e.LinkUrl == 'Workbench') {
        if (e.Operations.length > 0) {
          e.Operations[0].Status = val
        }
      } else {
        for (let i = 0; i < e.Childs.length; i++) {
          e.Childs[i].Status = val
          if (e.Childs[i].Operations.length) {
            for (let j = 0; j < e.Childs[i].Operations.length; j++) {
              e.Childs[i].Operations[j].Status = val
            }

          }
        }
      }
    },
    // 第三级数组选择
    COchoose (item, smallitem, Status) {
      let flag = true
      for (let i = 0; i < smallitem.Operations.length; i++) {
        if (smallitem.Operations[i].Status != this.sings) {
          flag = false
          break;
        }
      }
      if (smallitem.Operations.length) {
        smallitem.Status = flag;
      } else {
        smallitem.Status = false
      }
      let flag2 = true
      for (let i = 0; i < item.Childs.length; i++) {
        if (item.Childs[i].Status != this.sings) {
          flag2 = false
          break;
        }
      }
      if (item.Childs.length) {
        item.Status = flag2;
      } else {
        item.Status = false
      }
    },
    // 第二级数组全选和反选
    ACchoose (item, pe, Status) {
      for (let i = 0; i < pe.Operations.length; i++) {
        pe.Operations[i].Status = Status
      }
      let flag = true
      for (let i = 0; i < item.Childs.length; i++) {
        if (item.Childs[i].Status != this.sings) {
          flag = false
        }
      }
      if (item.Childs.length) {
        item.Status = flag
      } else {
        item.Status = false
      }
    },
    // selectAll (data, val, item, itemAll) {
    //   const arr = []
    //   const arr2 = []
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].Status) {
    //       arr.push(data[i])
    //     } else {
    //       arr2.push(data[i])
    //     }
    //   }
    //   const index1 = this.palitList.findIndex(itemms => itemms.MenuName === item.MenuName)
    //   if (arr.length) {
    //     for (let i = 0; i < this.palitList[index1].Childs.length; i++) {
    //       if (arr.length === this.palitList[index1].Childs[i].Childs.length && arr[0].ParentId === this.palitList[index1].Childs[i].MenuId) {
    //         this.palitList[index1].Childs[i].Status = true
    //       }
    //     }
    //   }
    //   if (arr2.length) {
    //     for (let i = 0; i < this.palitList[index1].Childs.length; i++) {
    //       if (!arr2[0].Status && arr2[0].ParentId === this.palitList[index1].Childs[i].MenuId) {
    //         this.palitList[index1].Childs[i].Status = false
    //       }
    //     }
    //   }
    //   let flag = true
    //   for (let i = 0; i < this.palitList[index1].Childs.length; i++) {
    //     if (this.palitList[index1].Childs[i].Status != this.sings) {
    //       flag = false
    //       break
    //     }
    //   }
    //   if (this.palitList[index1].Childs.length) {
    //     this.palitList[index1].Status = flag
    //   } else {
    //     this.palitList[index1].Status = false
    //   }
    // },
    // selectAllFuck (data, smallitss, item, itemAll) {
    //   const arr = []
    //   const arr2 = []
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].Status) {
    //       arr.push(data[i])
    //     } else {
    //       arr2.push(data[i])
    //     }
    //   }
    //   const index1 = this.palitList.findIndex(itemms => itemms.MenuName === item.MenuName)
    //   if (arr.length) {
    //     for (let i = 0; i < this.palitList[index1].Childs.length; i++) {
    //       if (arr.length === this.palitList[index1].Childs[i].Childs.length && arr[0].ParentId === this.palitList[index1].Childs[i].MenuId) {
    //         this.palitList[index1].Childs[i].Status = true
    //       }
    //     }
    //   }
    //   if (arr2.length) {
    //     for (let i = 0; i < this.palitList[index1].Childs.length; i++) {
    //       if (!arr2[0].Status && arr2[0].ParentId === this.palitList[index1].Childs[i].MenuId) {
    //         this.palitList[index1].Childs[i].Status = false
    //       }
    //     }
    //   }
    //   let flag = true
    //   for (let i = 0; i < this.palitList[index1].Childs.length; i++) {
    //     if (this.palitList[index1].Childs[i].Status != this.sings) {
    //       flag = false
    //       break
    //     }
    //   }
    //   if (this.palitList[index1].Childs.length) {
    //     this.palitList[index1].Status = flag
    //   } else {
    //     this.palitList[index1].Status = false
    //   }
    // },
    close () {
      this.$emit('closePermission', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.permiss-box {
  /deep/ .el-dialog__body {
    max-height: 800px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      -webkit-box-shadow: inset 0 0 5px #a3b1cc;
      background: #a3b1cc;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px #a3b1cc;
      border-radius: 4px;
      background: #a3b1cc;
    }
  }
}
/deep/ .smallCollapse {
  border: none;
  .el-collapse-item__header {
    height: 16px !important;
    border: none;
    background: #f2f3f7;
    .el-checkbox__input {
      margin-left: 0 !important;
    }
  }
}
.check-box {
  margin-top: 40px;
  .el-checkbox {
    margin-bottom: 24px;
    line-height: 20px;
  }
  .el-checkbox-group {
    width: 560px;
    border: 1px solid #a3b1cc;
    border-radius: 4px;
    padding: 24px;
    .el-checkbox {
      margin-bottom: 0;
    }
  }
  .el-checkbox__label {
    color: #333;
  }
}
.complex-check-box {
  padding: 24px;
  background: #f2f3f7;
  border-radius: 6px;
  margin-bottom: 16px;
  > .el-checkbox-group {
    height: 16px;
  }
  .el-checkbox {
    float: left;
  }
  .small-check-box {
    width: 105%;
    background: #f2f3f7;
    padding: 14px;
    .el-checkbox {
      float: none;
      margin-bottom: 24px;
    }
  }
}
.el-checkbox__inner {
  width: 16px;
  height: 16px;
  &::after {
    left: 5px;
  }
}
// 折叠框
.el-collapse-item {
  width: 100%;
  margin-top: 24px;
  border-radius: 6px;
  overflow: hidden;
  .el-collapse-item__header {
    background-color: #f0f3fa;
    border: none;
    span {
      font-size: 14px;
      color: #333;
      margin-left: 24px;
    }
    .edits {
      font-size: 16px;
      margin-left: 80%;
    }
  }
  .el-collapse-item__wrap {
    padding: 24px;
    background-color: #f0f3fa;
    border: none;
    .el-collapse-item__content {
      background: #f2f3f7;
      .el-collapse {
        border: none;
      }
    }
  }
}
.operation {
  text-align: center;
}
/deep/ .el-collapse-item__content {
  padding-bottom: 0;
  overflow-y: auto;
  max-height: 300px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px #a3b1cc;
    background: #a3b1cc;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px #a3b1cc;
    border-radius: 4px;
    background: #a3b1cc;
  }
}
/deep/ .closeButton {
  position: absolute;
  left: 93%;
  top: 23px;
}
</style>