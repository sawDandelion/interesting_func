/* eslint-disable react/jsx-indent-props */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';

import SuccessPng from "../../assets/images/success.png"
import FailPng from "../../assets/images/fail.png"

@connect(state => {
  return { ...state }
})

export default class SubmitTip extends Component {

  config = {
    navigationBarTitleText: ''
  }
  componentDidMount() {
    if(!this.props.home.type) {
      setTimeout(() => {
        Taro.navigateBack({ delta: 1 })
      }, 2000);
    } else {
      setTimeout(() => {
        Taro.reLaunch({
          url: '../index/index',
        })
      }, 1000);
    }
  }

  render () {
    return (
      <View className='submitTip'>
        <View style="width:100%;text-align:center;margin-top: 80px">
          <Image
            style='width: 100px;height: 100px;'
            src={this.props.home.type?SuccessPng:FailPng}
          />
          <View>{this.props.home.type?'提交成功':'提交失败'}</View>
          <View style="margin-top: 40px">{this.props.home.type?'':'请检查您的网络是否通畅'}</View>
        </View>
      </View>
    )
  }
}
