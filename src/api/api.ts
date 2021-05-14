/**
 *
 * api配置
 */

export default {
    getCardList: "/api/card/getCardList",
    getCardInfo: "/api/card/getCardInfo",
    clubBill: "/api/Club/clubBill",
    setCardDefault: "/api/card/setCardDefault",
    DelCard: "/api/card/DelCard",
    addCardType: "/api/card/addCardType",
    cashObtain: "/api/pay/Cash_withdrawal_record",
    publishCash: "/api/pay/Cash_withdrawal",
    getBill: "/api/club/clubAllBill",
    clubMember: "/api/Club/clubMember",
    getCardedUserList: "/api/card/getCardedUserList",
    billDetail: "/api/club/BillDetail",
    editGenerationOrderAmount: "/api/order/editGenerationOrderAmount",
    editCardOrderAmount: "api/order/editCardOrderAmount",
    getUserCardInfo: "api/card/getUserCardInfo",
    createUserCard: "/api/card/createUserCard",
    updateUserCard: "/api/card/updateUserCard",
    refundUserCard: "/api/card/refundUserCard",
    cardManage: "/api/card/cardManage",
    clubDetail: "/api/club/clubDetail",
    signOutClub: "/api/Club/signOutClub",
    dealOrderRecharge: "api/card/dealOrderRecharge",
    setPermission: "/api/club/setPermission",
    getPermission: "/api/club/getPermission",
    getClubIdentityStatus: "/api/user/getClubIdentityStatus",
    activityMemberList: "/Api/ActivityMember/list",
    getActivityOPtions: "/api/activity/getOption",
    createMixedActivity: "/api/activity/createMixedActivity",
    getDefaultMixedActivityData: "/api/activity/getDefaultMixedActivityData",
    updateMixedActivity: "/api/activity/updateMixedActivity",
    getActivtyConfigScene: "/api/Activity/getActivtyConfigScene",
    searchVenues: "/api/Venues/searchVenues", // 搜索场馆
    mixedActivtyAssignPeople: "/api/ActivityMember/mixedActivtyAssignPeople",
    recordInfo: "/Api/user/recordInfo", // 战绩详情
    record: "/Api/bookkeeping/record", // 总资产 详情
    setClubMoney: "/Api/club/setClubMoney", // 总资产 资金 金额
    editClubType: "/Api/bookkeeping/editClubType", // 总资产 其他 金额
    deleteBookKeep: "/Api/club/deleteBookKeep", // 总资产 删除场地卡
    getClubInfo: "/Api/club/getClubInfo", // 总资产 首页饼图
    updateName: "/api/activity/setApplyName",
    moneyDetail: "api/club/getWithdrawalBalance",
    apply: "/Api/ActivityMember/registeredMembers",
    getTeamName: "/api/activity/getTeamName", // 获得对抗赛的名字
    setShowBannerName: "/api/club/setShowBannerName", // 会员分类是否可见（仅用户）
    bankCardList: "/Api/BankCard/index",
    getTeamList: "api/team/getSortTeam",
    saveTeamList: "api/team/setSortTeam",
    activitySettle: "/api/activity/activitySettle", // 判断活动是否可以活动消耗
  
    venueUploadImg: "/api/files/upload", // 场馆 上传图片
    venueDraft: "/api/Venues/draft", // 场馆 保存场馆草稿
    venueApply: "/api/Venues/apply", // 场馆 入驻
    venueAuditInformation: "/api/Venues/auditInformation", // 场馆 审核信息
    /**
     * 创建分类
     * @param {string} name --类别名称
     * @param {number} clubId --俱乐部id
     */
    createBanner: "/api/club/createBanner",
    /**
     * 更新分类
     * @param {Array} bannerList --分类列表
     */
    updateBanner: "/api/club/updateBanner",
    /**
     * 获取分类列表
     * @param {number} clubId --俱乐部id
     */
    getBanner: "/api/club/getBanner",
    /**
     * 获取分类列表
     * @param {number} bannerId --类别id
     */
    deleteBanner: "/api/club/deleteBanner",
    /**
     * 查询成员名称
     * @param {number} $bannerId -类别id
     * @param {number} $clubId -俱乐部id
     * @param {number} $type:1、活跃次数排序 2、活跃倒叙排序 3、分类正序排序 4、分类倒叙排序 5、字母默认排序
     * @param {string} $name:名字搜索
     * @param {boolean} $identityStatus:管理员是否在最上面
     * @return {Array}
     */
    getBannerMember: "/api/club/getBannerMember",
    /**
     * 查询成员名称
     * @param {Array} $userIds -用户id组
     * @param {number} $bannerId -分类id
     * @param {number} $clubId -俱乐部id
     * @return {Array}
     */
    setBannerMember: "/api/club/setBannerMember",
    /**
     * 查询成员名称
     * @param {number} $clubId -俱乐部id
     * @return {Array}
     */
    getImportInfo: "/api/club/getImportInfo",
    /**
     * 录入原始数据充值卡
     * @param {number} $clubId -俱乐部id
     * @param {string} $users -用户id组
     * @param {number} $type -type=1 年卡 type=2 充值卡
     * @param {number} $amount -金额
     */
    setImportInfo: "/api/club/setImportInfo",
    // test:'/'
  };
  