import Taro from '@tarojs/taro';
import api from './api';
import login from './init';

// const token ='34C8368881F90B6F932CC0603A3489E9C579053CF498211F69E6845E288B26499C0EAE459AC213594D44232B3219920E5C862D6B3789C827D08749BDFFAEF12A30619DCB1AE43FD14C55CD65A5CCBD40D1F347FB40D0EBECEAD32F14B1BE2A37419F922DAB9C031AAEEAE217BC7393440056BE3CADBBD7ED9996FC316CB4ECEA'
export default async function http(apiKey, parmas ,contentType='application/json') {
   
  
    // let smsServe =  'https://api-app-v1-test.ssiid.com'  
    let smsServe =  Taro.getStorageSync('society-app-server')   
    return await Taro.request({
        header: {
            'content-type': contentType,
            // 'Authorization': token,
        },
        method: api[apiKey].type,
        url: smsServe + api[apiKey].url,
        data: parmas,
        // mode:'no-cors',
    })
    .then(res=>{
        const {statusCode, data} = res;

        if (statusCode===200) {
            return data
        }
        Taro.showToast({title: data.message||'服务请求异常', icon: 'none',})

        return Promise.reject({message: data.message || '服务请求异常'})
    }).catch(err=>{
        Taro.showToast({title: '服务请求异常',icon: 'none'})
        return Promise.reject(err)
    })

}
