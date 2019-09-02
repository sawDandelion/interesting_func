import Taro from '@tarojs/taro';

export default function login(){
    let  smsServe 
    Taro.login().then(res=>{
        Taro.setStorageSync("code",res.code)  
    })
     Taro.request(
        {url:'https://config-web.ssiid.com/control-center/configuration/web/V2?d=society-miniprogram-online-v1-test'}
    ).then(res=>{
        smsServe=res.data['society-app-server']
        Taro.setStorageSync('society-app-server',smsServe)
    })
}
