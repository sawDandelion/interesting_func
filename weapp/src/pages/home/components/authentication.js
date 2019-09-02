/* eslint-disable react/jsx-indent-props */
import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtModal, AtToast, message } from 'taro-ui'
import { connect } from '@tarojs/redux';
import Http from '../../../utils/http'
import '../../../app.styl'
import "taro-ui/dist/style/components/toast.scss";
import "taro-ui/dist/style/components/icon.scss";

@connect(state => {
  return { ...state }
})

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      endYear: '',
      toastText: '请输入内容'
    }
  }

  componentWillMount() {
    const date=new Date;
    const year = date.getFullYear();
    this.setState({
      endYear: year+'-12-31'
    })
  }

  handleChange(name, value) {
    this.props.dispatch({ type: 'home/handleChange', payload: { name, value } });
  }
  onChange(current) {
    let parmas = {
      unionId: this.props.home.unionId,
      userName: this.props.home.userName,
      idNumber: this.props.home.idNumber,
      education: this.props.home.education,
      graduationYear: this.props.home.graduationYear
    }
    if(!parmas.userName) {
      this.setState({ isOpened: true, toastText: '请输入姓名' })
      return
    }
    if(!parmas.idNumber) {
      this.setState({ isOpened: true, toastText: '请输入身份证号码' })
      return
    }

    Http('checkLogin', parmas)
      .then(res => {
        if (res.resultCode !== 0) {
          Taro.showToast({ title: res.message || '服务请求异常', icon: 'none', })
          return
        }
        this.props.dispatch({ type: 'home/handleChange', payload: { name: 'userId', value: res.data } });
        this.props.dispatch({ type: 'home/onChange', payload: { current } });
        Taro.setStorageSync('mineInfo', {userName: this.props.home.userName, idNumber:this.props.home.idNumber})
    })
  }
  onChangePicker(e, key, arrkey) {
    const value = arrkey ? this.props.home[arrkey][e.detail.value] : e.detail.value
    const name = key
    this.props.dispatch({ type: `home/handleChange`, payload: { name, value } });
  }
  toastClose(){
    this.setState({ isOpened: false, toastText: '' })
  }

  render() {
    return (
      <View className='authentication'>
        <AtToast isOpened={this.state.isOpened} text={this.state.toastText} duration={1000} onClose={()=>this.toastClose()}></AtToast>
        <View style='padding: 80rpx 80rpx 60rpx 80rpx;text-align: center;'>
          <AtForm>
            <AtInput
              disabled={this.props.home.disable}
              className='pl40'
              placeholderClass='place-holder'
              error={!this.props.home.userName}
              name='userName'
              title='姓名'
              type='text'
              placeholder='请输入姓名'
              value={this.props.home.userName}
              onChange={this.handleChange.bind(this, 'userName')}
            />
            <AtInput
              disabled={this.props.home.disable}
              className='pl40'
              error={!this.props.home.idNumber}
              maxLength='18'
              name='idNumber'
              title='身份证号码'
              type='idcard'
              placeholder='请输入身份证号码'
              value={this.props.home.idNumber}
              onChange={this.handleChange.bind(this, 'idNumber')}
            />
            <Picker disabled={this.props.home.disable} className='bb1' mode='selector' range={this.props.home.educationArr} onChange={(e) => this.onChangePicker(e, 'education', 'educationArr')}>
              <View className='picker'>
                <View className={this.props.home.disable?'ccc picker-title':'picker-title'}>学历</View>
                <View className="flex-1 ac" style={{color: this.props.home.disable ? "#ccc" : ""}}>{this.props.home.education}</View>
              </View>
            </Picker>
            <Picker disabled={this.props.home.disable} mode='date' end={this.state.endYear} onChange={(e) => this.onChangePicker(e, 'graduationYear')} fields='year'>
              <View className='picker'>
                <View className={this.props.home.disable?'ccc picker-title':'picker-title'}>毕业年度</View>
                <View className="flex-1 ac" style={{color: this.props.home.disable ? "#ccc" : ""}}>{this.props.home.graduationYear}</View>
              </View>
            </Picker>
          </AtForm>
        </View>
        <View className='article' >
          <View className='article-title'>注意：</View>
          <View className='content'>1、仅限本人填写，个人信息与微信号将会绑定；</View>
          <View className='content'>2、一个微信号只能填写一个人的信息；</View>
        </View>
        <View style='padding: 10px 50px;text-align: center;margin-bottom: 80px;'> <AtButton type='primary' onClick={() => this.onChange(1)} full>下一步</AtButton></View>

      </View>
    )
  }
}
