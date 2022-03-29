const getters = {
  leftRouter: state => state.app.leftRouter,
  setrouter: state => state.app.setrouter,
  classtype: state => state.systemsetting.classtype,
  menulist: state => state.systemsetting.menulist,
  companystylelist: state => state.BusinessSet.companystylelist,
  followenumlist: state => state.BusinessSet.followenumlist,
  EnumerationType: state => state.app.EnumerationType,
  detailType: state => state.CompensationServiceManagement.detailType,
}
export default getters