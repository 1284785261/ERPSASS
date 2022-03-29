import axios from 'axios'
var SupperUploader = function (uploadUrl, file, guid, cutSize) {
  this.file = file
  // 文件大小
  this.fileSize = file.size
  // 文件类型
  this.fileType = file.type
  // 文件路径
  this.fileName = file.name
  // guid
  this.guid = guid
  // 分片大小
  this.cutSize = cutSize,
    // 已上传
    this.upedSize = 0
  // 开始位置
  this.startIndex = 0
  // 结束位置
  this.endIndex = 0
  // 序号
  this.indexr = 0
  // 上传路径
  this.uploadUrl = uploadUrl
  // 合并结果
  this.merged = false
  // 返回结果
  this.urlResult = {}
}
SupperUploader.prototype = {
  UploadFun: function (uploadCallBack) {
    var thisobj = this
    axios.post(thisobj.uploadUrl, thisobj.CutFileFun(), {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      if (res.data.State) {
        thisobj.urlResult = res.data.Video
        thisobj.upedSize += thisobj.cutSize
        if (thisobj.upedSize > thisobj.fileSize) { thisobj.upedSize = thisobj.fileSize }
        thisobj.indexr += 1
        // 执行回调函数
        uploadCallBack()
        // 继续调用上传
        if (thisobj.upedSize == thisobj.fileSize) {
          thisobj.merged = true
          // layer.msg("已成功上传！");
          return 1111
        } else {
          thisobj.UploadFun(uploadCallBack)
        }
      } else {
        // layer.msg(res.Description);
      }
    })
  },
  CutFileFun: function () {
    var param = {}
    if (this.upedSize < this.fileSize) {
      this.startIndex = this.upedSize
      this.endIndex = this.startIndex + this.cutSize
      if (this.endIndex > this.fileSize) {
        this.endIndex = this.fileSize
      }
      param = new FormData()
      var currentData = this.file.slice(this.startIndex, this.endIndex)
      param.append('file', currentData)
      var Merg = 0
      if (this.fileSize == this.endIndex) {
        Merg = 1
      } else {
        Merg = 0
      }
      param.append('message', '{BussinessType:5,Video:{Index:' + this.indexr + ',FileName:"' + this.fileName + '",Guid:"' + this.guid + '",IsMerge:' + Merg + '}}')
      // formData.append("file", currentData['size']);
      // formData.append("index", this.indexr);
      // formData.append("FileName", this.fileName);
      // formData.append("guid", this.guid);
      // formData.append("ismerge", this.fileSize == this.endIndex);
    }
    return param
  }
}
export default SupperUploader
