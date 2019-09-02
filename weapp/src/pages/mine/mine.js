/* eslint-disable react/jsx-indent-props */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux';

import "./mine.styl"

@connect(state => {
  return { ...state }
})

export default class Mine extends Component {

  config = {
    navigationBarTitleText: '个人信息'
  }
  constructor () {
    super(...arguments)
    this.state = {
      avatarUrl: 'http://img5.imgtn.bdimg.com/it/u=2712909429,2490101832&fm=26&gp=0.jpg',
      userName: '',
      idNumber: '',
      qrurl: 'https://static-app-main.ssiid.com/qrcode/taian_500px.png'
    }
  }
  
  hideIdNumber(num, index1, index2) {
      // let reg = eval(`/^(.{${index1}})(?:\\d+)(.{${index2}})$/`);
      // return num.replace(reg,"$1******$2");
      return num.replace(/^(.{6})(?:\d+)(.{3})$/,"$1******$2");
  }
  componentWillMount () {
    if(this.props.home.disable) {
      Taro.getStorage({
        key: 'userInfo',
        success: (result)=>{
          const avatarUrl = result.data.avatarUrl
          const nickName = this.props.home.userName
          const idNumber = this.hideIdNumber(this.props.home.idNumber)
          this.setState( {
            avatarUrl,
            nickName,
            idNumber
          })
        }
      });
    } else {
      Taro.getStorage({
        key: 'mineInfo',
        success: (result)=>{
          let id = this.hideIdNumber(result.data.idNumber)
          this.setState( {
            idNumber: id,
            nickName: result.data.userName
          })
        }
      });
      Taro.getStorage({
        key: 'userInfo',
        success: (result)=>{
          const avatarUrl = result.data.avatarUrl
          this.setState( {
            avatarUrl
          })
        }
      });
    }
  }

 
  render () {
    return (
      <View className='mine'>
        <View className='outside-box'>
          <View className='flex faic mb40'>
            <View className='userIcon'>
              <Image src={this.state.avatarUrl} className='img'/>
            </View>
            <View className='flex-1'>
              <View className='userName'>{this.state.nickName}</View>
              {
                this.state.idNumber?<View className='idNumber'>身份证：{this.state.idNumber}</View>:null
              }
              
            </View>
          </View>
          <View className='mb30'>
            <Image src={this.state.qrurl}  className='qrimg'/>
          </View>
          <View className='tips mb40'>
            扫描二维码下载泰安人社通App，体验更多功能
          </View>
        </View>

      </View>
    )
  }
}
