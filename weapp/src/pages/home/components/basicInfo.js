/* eslint-disable react/jsx-indent-props */
import Taro, { Component } from '@tarojs/taro'
import { View ,Picker} from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtToast  } from 'taro-ui'
import { connect } from '@tarojs/redux';

import '../../../app.styl'

@connect(state => {
  return {...state}
})


export default class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      toastText: '请输入内容'
    }
  }
  
  handleChange(name, value) {
    this.props.dispatch({type: 'home/handleChange',payload: {name,value}});
  }
  onChange(current) {
    if(!this.props.home.telephoneNumber) {
      this.setState({ isOpened: true, toastText: '请输入电话' })
      return
    }
    if(!this.props.home.gender || this.props.home.gender==='请选择') {
      this.setState({ isOpened: true, toastText: '请选择性别' })
      return
    }

    let strRegex = /^(13|14|15|17|18)\d{9}$/;
    if(!strRegex.test(this.props.home.telephoneNumber)){
      Taro.showToast({
        title: '手机号码输入有误!',
        icon: 'none'
      })
      return
    }

    
    if (current===0) return
    this.props.dispatch({type: 'home/onChange', payload:{current}});
  }
  onChangePicker  (e,key,arrkey) {
    const value =arrkey?this.props.home[arrkey][e.detail.value]:e.detail.value
    const name =key
    this.props.dispatch({type:`home/handleChange`,payload: {name,value}});
  }
  toastClose(){
    this.setState({ isOpened: false, toastText: '' })
  }

  render () {
    return (
      <View className='basic-info'>
            <AtToast isOpened={this.state.isOpened} text={this.state.toastText} duration={1000} onClose={()=>this.toastClose()}></AtToast>
            <View style='padding: 100rpx 80rpx;text-align: center;'>
              <AtForm>
                <AtInput
                  className='pl40'
                  disabled
                  name='userName'
                  title='姓名'
                  type='text'
                  placeholder='请输入姓名'
                  value={this.props.home.userName}
                  onChange={this.handleChange.bind(this, 'userName')}
                />
                <AtInput
                  className='pl40'
                  disabled
                  maxLength='18'
                  name='idNumber'
                  title='身份证号码'
                  type='idcard'
                  placeholder='请输入身份证号码'
                  value={this.props.home.idNumber}
                  onChange={this.handleChange.bind(this, 'idNumber')}
                />
                <AtInput
                  className='pl40'
                  name='telephoneNumber'
                  title='电话'
                  error={!this.props.home.telephoneNumber}
                  type='phone'
                  placeholder='请输入电话'
                  value={this.props.home.telephoneNumber}
                  onChange={this.handleChange.bind(this, 'telephoneNumber')}
                />
                <Picker className='bb1' mode='selector' range={this.props.home.genderArr} onChange={(e) => this.onChangePicker(e, 'gender', 'genderArr')}>
                  <View className='picker'>
                    <View className="picker-title">性别</View>
                    <View className="flex-1 ac">{this.props.home.gender || ''}</View>
                  </View>
                </Picker>
                <Picker className='bb1' mode='selector' range={this.props.home.national} onChange={(e) => this.onChangePicker(e, 'nationality', 'national')}>
                  <View className='picker'>
                    <View className="picker-title">民族</View>
                    <View className="flex-1 ac">{this.props.home.nationality || ''}</View>
                  </View>
                </Picker>
              </AtForm>
              <View style='padding: 20px 0px;text-align: center;'> <AtButton type='primary' onClick={()=>this.onChange(2)}  full>下一步</AtButton></View>
            </View>
       </View>
    )
  }
}
