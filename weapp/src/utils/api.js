// const Url=process.env.TARO_ENV === 'h5'?'/em/v2.0':'/em/v2.0'
const Url='/em/v2.0'

const api={
    getUserInfo : {
        type: "POST",
        url: Url+"/h5/public/api/wechat/getUserInfo"
        // 获取用户用户信息
    },
    checkLogin:{
        type:'POST',
        url:Url+"/h5/public/api/userInfo/checkLogin",
        // 页面入口条件校验
    },
    insertRegistration:{
        type:'POST',
        url:Url+"/h5/public/api/userInfo/insertRegistration",
        // 页面基本信息与就业信息登记 
    },
    getCountry:{
        type:'GET',
        url:Url+"/h5/public/api/country/list",
        // 国家 
    },
    getAppletUserInfo:{
        type:'GET',
        url:Url+"/h5/public/api/wechat/getAppletUserInfo",
        // 获取unionid
    },
    getUserInfoByUnionId:{
        type:'GET',
        url:Url+"/h5/public/api/userInfo/getUserInfoByUnionId",
        // 获取已登记信息
    }
}
export default  api
