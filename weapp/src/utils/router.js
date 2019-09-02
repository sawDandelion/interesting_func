import Taro from '@tarojs/taro'
import { parseUrlData } from './tool'

export function navigateTo(url, obj) {
    url = '/pages/' + url
    if (obj) url += parseUrlData(obj)
    Taro.navigateTo({ url })
}

export  function redirectTo(url) {
    url ='/pages/'+url
    Taro.redirectTo( url)
}

export function navigateBack(delta = 1) {
    Taro.navigateBack({ delta })

}

export function switchTab(url) {
    url = '/pages/' + url
    Taro.switchTab(url)
}
